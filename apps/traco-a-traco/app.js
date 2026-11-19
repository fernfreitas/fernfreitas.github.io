/* ============================================================
   Traço a Traço — engine principal (v3: método de construção)
   ============================================================ */

const STORE_KEY = 'traco_a_traco_v1';
const CANVAS_SIZE = 600;

/* ---------- Fases do método ---------- */
const PHASES = {
  grande:  { label: 'Formas grandes',  emoji: '🔵', color: '#3d8bff', tool: { color: '#c9c3e6', size: 4 } },
  media:   { label: 'Formas médias',   emoji: '🟣', color: '#7c4dff', tool: { color: '#c9c3e6', size: 4 } },
  pequena: { label: 'Formas pequenas', emoji: '🟢', color: '#22c1a6', tool: { color: '#c9c3e6', size: 4 } },
  detalhe: { label: 'Detalhes',        emoji: '✏️', color: '#1e1b3a', tool: { color: '#1e1b3a', size: 6 } },
  sombra:  { label: 'Sombra',          emoji: '🌗', color: '#8a86a8', tool: { color: '#9a95b8', size: 5 } },
  cor:     { label: 'Cor',             emoji: '🎨', color: '#ff5ea8', tool: { color: '#ffb800', size: 18 }, under: true },
};

/* ---------- Estado persistente ---------- */
const defaultState = () => ({ points: 0, stars: 0, cleared: {}, gallery: [] });
let state = load();

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return Object.assign(defaultState(), JSON.parse(raw));
  } catch (e) { /* ignora */ }
  return defaultState();
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
}

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const VALID_IDS = new Set(MISSIONS.map(m => m.id));
function totalCleared() {
  return Object.keys(state.cleared).filter(id => VALID_IDS.has(id)).length;
}

/* ---------- Navegação de telas ---------- */
function goTo(name) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  $('#screen-' + name).classList.add('active');
  if (name === 'home') renderHome();
  if (name === 'gallery') renderGallery();
}
$$('[data-go]').forEach(btn => btn.addEventListener('click', () => goTo(btn.dataset.go)));

/* ============================================================
   HOME — menu de desenhos por categoria
   ============================================================ */
function renderHome() {
  $('#hud-points').textContent = state.points;
  $('#hud-stars').textContent = state.stars;

  const done = totalCleared();
  const pct = Math.round((done / MISSIONS.length) * 100);
  $('#progress-fill').style.width = pct + '%';
  $('#progress-label').textContent = `${done} de ${MISSIONS.length} desenhos concluídos`;

  const trail = $('#mission-trail');
  trail.innerHTML = '';
  let n = 0;
  CATEGORIES.forEach(catDef => {
    const items = MISSIONS
      .map((m, i) => ({ m, i }))
      .filter(x => x.m.cat === catDef.key);
    if (!items.length) return;

    const head = document.createElement('div');
    head.className = 'cat-head';
    head.innerHTML = `<span class="cat-emoji">${catDef.emoji}</span> ${catDef.label}`;
    trail.appendChild(head);

    items.forEach(({ m, i }) => {
      const cleared = !!state.cleared[m.id];
      const node = document.createElement('div');
      node.className = 'mission-node' + (cleared ? ' done' : '');
      node.style.animationDelay = (n++ * 0.03) + 's';

      const diffDots = '●'.repeat(m.diff) + `<span class="off">${'●'.repeat(3 - m.diff)}</span>`;
      node.innerHTML = `
        <div class="node-emoji">${m.emoji}</div>
        <div class="node-body">
          <p class="node-title">${m.title}</p>
          <p class="node-sub">${cleared ? 'Feito! Desenhe de novo 🔁' : m.hint}</p>
          <div class="node-diff">Dificuldade: ${diffDots}</div>
        </div>
        <span class="node-state">${cleared ? '✅' : '▶️'}</span>`;

      node.addEventListener('click', () => startMission(i));
      trail.appendChild(node);
    });
  });
}

/* ============================================================
   MOTOR DE DESENHO
   ============================================================ */
const canvas = $('#board');
const ctx = canvas.getContext('2d');

const draw = {
  missionIndex: 0,
  stepIndex: 0,
  strokes: [],        // {color, size, erase, under, step, pts:[[x,y]]}
  current: null,
  color: '#1e1b3a',
  size: 7,
  erasing: false,
  showGuide: true,
  guidePhase: 0,
};

const PALETTE = ['#1e1b3a', '#c9c3e6', '#ff5ea8', '#7c4dff', '#22c1a6', '#ffb800', '#ff6b3d', '#3d8bff'];

function buildPalette() {
  const row = $('#color-row');
  row.innerHTML = '';
  PALETTE.forEach(c => {
    const sw = document.createElement('div');
    sw.className = 'swatch';
    sw.dataset.color = c;
    sw.style.background = c;
    sw.addEventListener('click', () => setBrush(c, draw.size));
    row.appendChild(sw);
  });
}

function setBrush(color, size) {
  draw.color = color;
  draw.size = size;
  draw.erasing = false;
  $('#tool-eraser').classList.remove('active');
  $('#tool-brush').classList.add('active');
  $('#brush-size').value = size;
  $$('.swatch').forEach(s => s.classList.toggle('active', s.dataset.color === color));
}

function curPhase() {
  const step = MISSIONS[draw.missionIndex].steps[draw.stepIndex];
  return PHASES[step.phase] || PHASES.detalhe;
}

function startMission(index) {
  draw.missionIndex = index;
  draw.stepIndex = 0;
  draw.strokes = [];
  draw.current = null;
  draw.showGuide = true;
  const m = MISSIONS[index];
  $('#draw-mission-name').textContent = `${m.emoji} ${m.title}`;
  $('#draw-points').textContent = state.points;
  buildStepDots();
  loadStep(true);
  goTo('draw');
}

function buildStepDots() {
  const holder = $('#step-dots');
  holder.innerHTML = '';
  MISSIONS[draw.missionIndex].steps.forEach(() => {
    const d = document.createElement('span');
    d.className = 'dot';
    holder.appendChild(d);
  });
  updateStepDots();
}
function updateStepDots() {
  $$('#step-dots .dot').forEach((d, i) => {
    d.classList.toggle('active', i === draw.stepIndex);
    d.classList.toggle('done', i < draw.stepIndex);
  });
}

function loadStep(first) {
  const m = MISSIONS[draw.missionIndex];
  const step = m.steps[draw.stepIndex];
  const ph = PHASES[step.phase] || PHASES.detalhe;

  $('#step-emoji').textContent = step.emoji || ph.emoji;
  $('#step-counter').textContent = `Passo ${draw.stepIndex + 1} de ${m.steps.length}`;
  const chip = $('#phase-chip');
  chip.textContent = ph.label;
  chip.style.background = ph.color;
  $('#step-instruction').textContent = step.text;
  updateStepDots();

  // pincel automático da fase (o usuário pode trocar depois)
  setBrush(step.suggest || ph.tool.color, ph.tool.size);

  // avisa quando muda de fase
  const prev = m.steps[draw.stepIndex - 1];
  if (!first && (!prev || prev.phase !== step.phase)) {
    toast(`${ph.emoji} Fase nova: ${ph.label}!`);
  }

  const last = draw.stepIndex === m.steps.length - 1;
  const btn = $('#btn-next-step');
  btn.textContent = last ? '🎉 Publicar desenho' : 'Próximo passo →';
  render();
}

/* ---------- Traçado compartilhado (canvas + replay) ---------- */
function strokeOnCtx(c2, st, upto) {
  const pts = st.pts;
  const n = (upto === undefined) ? pts.length : Math.min(upto, pts.length);
  if (n === 0) return;
  c2.save();
  c2.lineJoin = 'round';
  c2.lineCap = 'round';
  c2.strokeStyle = st.color;
  c2.lineWidth = st.size;
  if (st.erase) c2.globalCompositeOperation = 'destination-out';
  c2.beginPath();
  c2.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < n; i++) {
    const p = pts[i], pp = pts[i - 1];
    c2.quadraticCurveTo(pp[0], pp[1], (p[0] + pp[0]) / 2, (p[1] + pp[1]) / 2);
  }
  c2.stroke();
  c2.restore();
}

/* ---------- Renderização do canvas ---------- */
function render() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const m = MISSIONS[draw.missionIndex];
  const step = m.steps[draw.stepIndex];
  const ph = PHASES[step.phase] || PHASES.detalhe;

  // guias dos passos anteriores: bem fraquinhas, embaixo de tudo
  if (draw.showGuide) {
    for (let s = 0; s < draw.stepIndex; s++) {
      drawGuides(m.steps[s].guides, { color: 'rgba(124,77,255,0.13)', dash: false, width: 3 });
    }
  }

  // tinta do usuário: primeiro a COR (por baixo), depois as linhas
  const unders = [], lines = [];
  draw.strokes.forEach(st => (st.under ? unders : lines).push(st));
  if (draw.current) (draw.current.under ? unders : lines).push(draw.current);
  unders.forEach(st => strokeOnCtx(ctx, st));
  lines.forEach(st => strokeOnCtx(ctx, st));

  // guia do passo atual: tracejada, na cor da fase, POR CIMA
  if (draw.showGuide) {
    drawGuides(step.guides, { color: ph.color, dash: true, width: 3.5, markers: true });
  }

  // papel pontilhado por trás de tudo
  ctx.save();
  ctx.globalCompositeOperation = 'destination-over';
  ctx.fillStyle = '#efeaff';
  for (let x = 40; x < CANVAS_SIZE; x += 40) {
    for (let y = 40; y < CANVAS_SIZE; y += 40) {
      ctx.beginPath(); ctx.arc(x, y, 1.3, 0, Math.PI * 2); ctx.fill();
    }
  }
  ctx.restore();
}

function drawGuides(guides, opt) {
  if (!guides || !guides.length) return;
  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = opt.color;
  ctx.lineWidth = opt.width;
  ctx.globalAlpha = opt.dash ? 0.9 : 1;
  if (opt.dash) {
    ctx.setLineDash([11, 9]);
    ctx.lineDashOffset = -draw.guidePhase;
  }
  ctx.beginPath();
  guides.forEach(g => tracePath(g));
  ctx.stroke();

  // bolinha de "comece aqui" (com anel branco pra aparecer sobre a tinta)
  if (opt.markers) {
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
    guides.forEach(g => {
      const s = startPoint(g);
      if (!s) return;
      ctx.beginPath(); ctx.arc(s[0], s[1], 6.5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff'; ctx.fill();
      ctx.beginPath(); ctx.arc(s[0], s[1], 4.5, 0, Math.PI * 2);
      ctx.fillStyle = opt.color; ctx.fill();
    });
  }
  ctx.restore();
}

function tracePath(g) {
  switch (g.t) {
    case 'line':
      ctx.moveTo(g.x1, g.y1); ctx.lineTo(g.x2, g.y2); break;
    case 'rect':
      ctx.moveTo(g.x, g.y);
      ctx.lineTo(g.x + g.w, g.y); ctx.lineTo(g.x + g.w, g.y + g.h);
      ctx.lineTo(g.x, g.y + g.h); ctx.closePath(); break;
    case 'circle':
      ctx.moveTo(g.cx + g.r, g.cy);
      ctx.arc(g.cx, g.cy, g.r, 0, Math.PI * 2); break;
    case 'ellipse': {
      const rot = (g.rot || 0) * Math.PI / 180;
      // moveTo no início da elipse pra não ligar com a forma anterior
      ctx.moveTo(g.cx + g.rx * Math.cos(rot), g.cy + g.rx * Math.sin(rot));
      ctx.ellipse(g.cx, g.cy, g.rx, g.ry, rot, 0, Math.PI * 2); break;
    }
    case 'poly':
      g.pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
      if (g.closed) ctx.closePath();
      break;
    case 'curve':
      ctx.moveTo(g.x1, g.y1); ctx.quadraticCurveTo(g.cx, g.cy, g.x2, g.y2); break;
    case 'star': {
      const pts = g.points || 5;
      const rOut = g.r, rIn = g.inner || g.r * 0.42;
      for (let i = 0; i < pts * 2; i++) {
        const ang = -Math.PI / 2 + i * Math.PI / pts;
        const rr = (i % 2) ? rIn : rOut;
        const x = g.cx + rr * Math.cos(ang), y = g.cy + rr * Math.sin(ang);
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.closePath();
      break;
    }
    case 'path': {
      const tok = g.d.match(/[a-zA-Z]|-?[\d.]+/g) || [];
      let i = 0, cmd = 'M';
      const num = () => parseFloat(tok[i++]);
      while (i < tok.length) {
        if (/[a-zA-Z]/.test(tok[i])) {
          cmd = tok[i++];
          if (cmd === 'Z' || cmd === 'z') { ctx.closePath(); continue; }
        }
        if (cmd === 'M') { ctx.moveTo(num(), num()); cmd = 'L'; }
        else if (cmd === 'L') { ctx.lineTo(num(), num()); }
        else if (cmd === 'Q') { const a = num(), b = num(); ctx.quadraticCurveTo(a, b, num(), num()); }
        else if (cmd === 'C') { const a = num(), b = num(), c = num(), d = num(); ctx.bezierCurveTo(a, b, c, d, num(), num()); }
        else break;
      }
      break;
    }
  }
}

function startPoint(g) {
  switch (g.t) {
    case 'line': return [g.x1, g.y1];
    case 'rect': return [g.x, g.y];
    case 'circle': return [g.cx + g.r, g.cy];
    case 'ellipse': return null;
    case 'poly': return g.pts[0];
    case 'curve': return [g.x1, g.y1];
    case 'star': return [g.cx, g.cy - g.r];
    case 'path': {
      const m = g.d.match(/M\s*(-?[\d.]+)[ ,]+(-?[\d.]+)/);
      return m ? [+m[1], +m[2]] : null;
    }
  }
  return null;
}

/* ---------- animação do tracejado ---------- */
function tick() {
  if ($('#screen-draw').classList.contains('active') && draw.showGuide) {
    draw.guidePhase = (draw.guidePhase + 0.6) % 40;
    render();
  }
  requestAnimationFrame(tick);
}

/* ---------- Entrada do ponteiro ---------- */
function canvasPoint(e) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width * CANVAS_SIZE;
  const y = (e.clientY - rect.top) / rect.height * CANVAS_SIZE;
  return [x, y];
}
let drawing = false;
canvas.addEventListener('pointerdown', e => {
  drawing = true;
  try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
  draw.current = {
    color: draw.color, size: draw.size, erase: draw.erasing,
    under: !!curPhase().under, step: draw.stepIndex,
    pts: [canvasPoint(e)],
  };
  render();
});
canvas.addEventListener('pointermove', e => {
  if (!drawing) return;
  draw.current.pts.push(canvasPoint(e));
  render();
});
function endStroke() {
  if (!drawing) return;
  drawing = false;
  if (draw.current && draw.current.pts.length) draw.strokes.push(draw.current);
  draw.current = null;
  render();
}
canvas.addEventListener('pointerup', endStroke);
canvas.addEventListener('pointercancel', endStroke);
canvas.addEventListener('pointerleave', endStroke);

/* ---------- Ferramentas ---------- */
$('#tool-brush').addEventListener('click', () => {
  draw.erasing = false;
  $('#tool-brush').classList.add('active');
  $('#tool-eraser').classList.remove('active');
});
$('#tool-eraser').addEventListener('click', () => {
  draw.erasing = true;
  $('#tool-eraser').classList.add('active');
  $('#tool-brush').classList.remove('active');
});
$('#brush-size').addEventListener('input', e => { draw.size = +e.target.value; });
$('#tool-undo').addEventListener('click', () => { draw.strokes.pop(); render(); });
$('#tool-clear').addEventListener('click', () => {
  if (draw.strokes.length && !confirm('Limpar tudo o que você desenhou?')) return;
  draw.strokes = []; render();
});
$('#btn-toggle-guide').addEventListener('click', () => {
  draw.showGuide = !draw.showGuide;
  $('#btn-toggle-guide').classList.toggle('hidden-guide', !draw.showGuide);
  $('#btn-toggle-guide').textContent = draw.showGuide ? '👁️ Guia' : '🙈 Guia';
  render();
});
$('#btn-back').addEventListener('click', () => {
  if (draw.strokes.length && !confirm('Sair da missão? Seu desenho não será salvo.')) return;
  goTo('home');
});

/* ---------- Avançar passo / publicar ---------- */
$('#btn-next-step').addEventListener('click', () => {
  const m = MISSIONS[draw.missionIndex];
  const last = draw.stepIndex === m.steps.length - 1;
  if (!last) {
    draw.stepIndex++;
    loadStep();
  } else {
    finishMission();
  }
});

/* ============================================================
   CONCLUSÃO — publica, pontua, comemora
   ============================================================ */
function finishMission() {
  const m = MISSIONS[draw.missionIndex];
  const firstTime = !state.cleared[m.id];

  const thumb = flattenToImage();
  const anim = compactStrokes(draw.strokes);

  // estrelas: desenhou em quantos passos?
  const stepsWithInk = new Set(draw.strokes.map(s => s.step)).size;
  const ratio = stepsWithInk / m.steps.length;
  const earnedStars = ratio >= 0.99 ? 3 : ratio >= 0.6 ? 2 : 1;
  const gained = firstTime ? m.points : Math.round(m.points * 0.3);

  state.points += gained;
  if (firstTime) {
    state.stars += earnedStars;
    state.cleared[m.id] = { stars: earnedStars, at: Date.now() };
  }
  state.gallery.unshift({
    id: 'g' + Date.now(), missionId: m.id, title: m.title, emoji: m.emoji,
    img: thumb, anim, at: Date.now(), stars: earnedStars,
  });
  if (state.gallery.length > 40) state.gallery.length = 40;
  save();

  showReward(m, earnedStars, gained, anim, firstTime);
}

function flattenToImage() {
  // só a arte: fundo branco + cor por baixo + linhas (sem guia, sem pontilhado)
  const out = document.createElement('canvas');
  out.width = CANVAS_SIZE; out.height = CANVAS_SIZE;
  const octx = out.getContext('2d');
  octx.fillStyle = '#ffffff';
  octx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  draw.strokes.filter(s => s.under).forEach(st => strokeOnCtx(octx, st));
  draw.strokes.filter(s => !s.under).forEach(st => strokeOnCtx(octx, st));
  return out.toDataURL('image/png');
}

function compactStrokes(strokes) {
  return strokes.map(st => ({
    c: st.color, s: st.size,
    e: st.erase ? 1 : 0, u: st.under ? 1 : 0,
    p: st.pts.map(pt => [Math.round(pt[0]), Math.round(pt[1])]),
  }));
}

/* ============================================================
   REPLAY — o desenho se desenha sozinho
   ============================================================ */
function playReplay(cv, anim, onDone) {
  if (cv._replayId) cancelAnimationFrame(cv._replayId);
  cv.classList.remove('wiggle');
  const cctx = cv.getContext('2d');

  const mkLayer = () => {
    const l = document.createElement('canvas');
    l.width = CANVAS_SIZE; l.height = CANVAS_SIZE;
    return l;
  };
  const underL = mkLayer(), lineL = mkLayer();
  const uctx = underL.getContext('2d'), lctx = lineL.getContext('2d');

  const strokes = (anim || []).map(a => ({
    color: a.c, size: a.s, erase: !!a.e, under: !!a.u, pts: a.p,
  }));
  const totalPts = strokes.reduce((acc, s) => acc + s.pts.length, 0);
  if (!totalPts) { compose(); return; }

  const duration = Math.max(1400, Math.min(3200, 400 + totalPts * 4));
  const start = performance.now();

  function compose() {
    cctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    cctx.fillStyle = '#ffffff';
    cctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    cctx.drawImage(underL, 0, 0);
    cctx.drawImage(lineL, 0, 0);
  }

  function frame(now) {
    const prog = Math.min(1, (now - start) / duration);
    const target = Math.floor(prog * totalPts);

    uctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    lctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    let used = 0;
    for (const st of strokes) {
      if (used >= target) break;
      const take = Math.min(st.pts.length, target - used);
      strokeOnCtx(st.under ? uctx : lctx, st, take);
      used += take;
    }
    compose();

    if (prog < 1) {
      cv._replayId = requestAnimationFrame(frame);
    } else {
      cv._replayId = null;
      cv.classList.add('wiggle');
      setTimeout(() => cv.classList.remove('wiggle'), 900);
      if (onDone) onDone();
    }
  }
  cv._replayId = requestAnimationFrame(frame);
}

/* ---------- Modal de recompensa ---------- */
function showReward(m, stars, gained, anim, firstTime) {
  $('#reward-badge').textContent = firstTime ? '🏆' : '🔁';
  $('#reward-title').textContent = firstTime ? 'Missão concluída!' : 'Desenho publicado!';
  $('#reward-stars').innerHTML =
    '⭐'.repeat(stars) + `<span class="dim">${'⭐'.repeat(3 - stars)}</span>`;
  $('#reward-points').textContent = gained;
  $('#reward-modal').classList.add('show');
  burstConfetti($('#reward-confetti'), 90);
  setTimeout(() => playReplay($('#reward-canvas'), anim), 350);
}
$('#reward-continue').addEventListener('click', () => {
  $('#reward-modal').classList.remove('show');
  goTo('home');
});
$('#reward-gallery').addEventListener('click', () => {
  $('#reward-modal').classList.remove('show');
  goTo('gallery');
});

/* ============================================================
   GALERIA
   ============================================================ */
function renderGallery() {
  const grid = $('#gallery-grid');
  const empty = $('#gallery-empty');
  grid.innerHTML = '';
  if (!state.gallery.length) {
    empty.classList.add('show');
    grid.style.display = 'none';
    return;
  }
  empty.classList.remove('show');
  grid.style.display = 'grid';
  state.gallery.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.style.animationDelay = (i * 0.04) + 's';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}" />
      <div class="gc-meta">
        <p class="gc-title">${item.emoji} ${item.title}</p>
        <p class="gc-date">${'⭐'.repeat(item.stars)} · ${formatDate(item.at)}</p>
      </div>`;
    card.addEventListener('click', () => openViewer(item));
    grid.appendChild(card);
  });
}

let viewingId = null;
function openViewer(item) {
  viewingId = item.id;
  const img = $('#view-image');
  const cv = $('#view-canvas');
  if (item.anim && item.anim.length) {
    img.style.display = 'none';
    cv.style.display = 'block';
    setTimeout(() => playReplay(cv, item.anim), 200);
  } else {
    cv.style.display = 'none';
    img.style.display = 'block';
    img.src = item.img;
  }
  $('#view-title').textContent = `${item.emoji} ${item.title}`;
  $('#view-date').textContent = `${'⭐'.repeat(item.stars)} · ${formatDate(item.at)}`;
  $('#view-modal').classList.add('show');
}
$('#view-close').addEventListener('click', () => $('#view-modal').classList.remove('show'));
$('#view-delete').addEventListener('click', () => {
  if (!confirm('Apagar este desenho da galeria?')) return;
  state.gallery = state.gallery.filter(g => g.id !== viewingId);
  save();
  $('#view-modal').classList.remove('show');
  renderGallery();
});

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

/* ============================================================
   CONFETE + TOAST
   ============================================================ */
const CONFETTI_COLORS = ['#ff5ea8', '#7c4dff', '#22c1a6', '#ffb800', '#ff6b3d', '#3d8bff'];
function burstConfetti(layer, count) {
  layer.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + '%';
    c.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    c.style.animationDuration = (1.6 + Math.random() * 1.4) + 's';
    c.style.animationDelay = (Math.random() * 0.4) + 's';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    layer.appendChild(c);
  }
  setTimeout(() => { layer.innerHTML = ''; }, 3400);
}

let toastTimer = null;
function toast(msg) {
  let el = $('.toast');
  if (!el) { el = document.createElement('div'); el.className = 'toast'; document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ============================================================
   INIT
   ============================================================ */
buildPalette();
setBrush('#1e1b3a', 7);
renderHome();
requestAnimationFrame(tick);
