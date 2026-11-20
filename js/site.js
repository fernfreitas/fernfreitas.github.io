/* Fernando Freitas — site v3 (protótipo local). Sem build: scripts clássicos, abre também por file://.
   O conteúdo vem de js/data.js. */
(function () {
  'use strict';

  const D = window.FF_DATA;
  const root = document.documentElement;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const h = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };
  const pad2 = n => String(n).padStart(2, '0');
  const byN = n => D.projects.find(p => p.n === Number(n));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Pele ---------- */
  const THEME = { fff: '#020202', storm: '#0C0D10' };
  function setSkin(skin, save) {
    root.dataset.skin = skin;
    $$('[data-set-skin]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setSkin === skin)));
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = THEME[skin];
    if (save) { try { localStorage.setItem('ff-skin', skin); } catch (e) { /* sem storage: só não lembra */ } }
  }
  $$('[data-set-skin]').forEach(b => b.addEventListener('click', () => setSkin(b.dataset.setSkin, true)));
  setSkin(root.dataset.skin === 'storm' ? 'storm' : 'fff', false);

  /* ---------- Prévias em vídeo: tocam quando o card está na tela ---------- */
  const prevIO = reduceMotion ? null : new IntersectionObserver(entries => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        const p = v.play(); if (p && p.catch) p.catch(() => {});
      } else if (!v.paused) v.pause();
    });
  }, { threshold: .3 });
  function prevVideo(src) {
    const v = h('video', 'prev');
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'none';
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
    v.tabIndex = -1;
    v.dataset.src = src;
    v.addEventListener('playing', () => v.classList.add('is-on'), { once: true });
    if (prevIO) prevIO.observe(v);
    return v;
  }

  /* ---------- Prêmios ---------- */
  const awards = $('#awards');
  D.awards.forEach(a => {
    const li = h('li');
    const b = h('button');
    b.type = 'button';
    b.dataset.open = a.n;
    b.append(h('span', 'aw-name', a.award), h('span', 'aw-cat', a.cat), h('span', 'aw-proj', a.project));
    li.append(b);
    awards.append(li);
  });

  /* ---------- Grade de projetos ---------- */
  const grid = $('#grid');
  /* 20/11 (tarde): ordem pedida — publicidade, cases, documentário, séries, clipes, dirigidos por mim; no fim IA e a HQ.
     Cada comercial e cada clipe é um card (sem a lista repetida embaixo). Gracinha vai para séries; 7 Velas só em "Directed by me". */
  const CATS = [['advertising', 'Advertising'], ['cases', 'Cases'], ['documentaries', 'Documentaries'], ['series', 'Series'], ['music-videos', 'Music videos'], ['direction', 'Directed by me'], ['ai', 'AI'], ['comics', 'Graphic novel']];
  const catIdx = c => { const i = CATS.findIndex(x => x[0] === c); return i < 0 ? 99 : i; };
  const gridList = [];
  D.projects.forEach(p => {
    if (p.n === 10 || p.n === 11 || p.n === 18) p.items.forEach((it, i) => {   // 18: cases, um card por filme
      if (it.id === 'velas') return;
      const serie = p.n === 10 && i === 0;
      gridList.push({ n: p.n, item: i, spot: true, cat: serie ? 'series' : p.cat, cover: 'assets/thumbs/' + it.id + '.jpg', prev: it.noprev ? '' : 'assets/prev/' + it.id + '.mp4', title: it.label,
        kind: serie ? 'Visual album' : p.n === 10 ? 'Commercial' : p.n === 18 ? 'Case film' : 'Music video', role: p.n === 18 ? 'Editor & motion' : 'Editor', with: serie ? 'Disney+ · 2021 · co-edited' : it.sub, year: '', award: '', items: [it] });
    });
    else if (p.cat === 'ai') return;   // AI Lab: seis cards escolhidos pelo Fernando (20/11), montados abaixo
    else gridList.push(p);
  });
  // AI Lab: 3 do Air_Silva (logo na camisa ×2, foto em 360°) e 3 da Vitória (estátuas, parede, luz). Clicar abre o trecho maior.
  [[3, 'silva_a1', 'Air_Silva'], [3, 'silva_a2', 'Air_Silva'], [3, 'silva_360', 'Air_Silva'],
   [17, 'folle_alive2', 'Folle de Toi'], [4, 'vitoria_roses', 'One Take, New Cameras'], [4, 'vitoria_relight', 'One Take, New Cameras']].forEach(([n, f, w]) => {
    const P = byN(n), i = P.items.findIndex(it => (it.src || '').includes('/' + f + '.mp4')), it = P.items[i];
    if (it) gridList.push({ n, item: i, spot: true, cat: 'ai', cover: it.poster, prev: it.src, title: it.label, kind: 'AI on real footage', role: '', with: w, year: '', award: '', items: [it] });
  });
  gridList.forEach((p, i) => { p.ord = i; });
  gridList.sort((a, b) => catIdx(a.cat) - catIdx(b.cat) || a.ord - b.ord);
  let lastCat = null;
  const labGrid = $('#labGrid'), hqGrid = $('#hqGrid');
  gridList.forEach(p => {
    const grid = (p.cat === 'ai' && labGrid) || (p.cat === 'comics' && hqGrid) || $('#grid');   // IA vai para o AI Lab; a HQ fica por último, antes das infos
    if (p.cat !== lastCat && p.cat !== 'ai') {
      lastCat = p.cat;
      const sec = document.createElement('li');
      sec.className = 'grid-sec';
      sec.textContent = (CATS.find(x => x[0] === p.cat) || [0, 'Other'])[1];
      grid.append(sec);
    }
    const li = h('li');
    const b = h('button', 'card');
    b.type = 'button';
    b.dataset.open = p.n;
    if (p.spot) { b.dataset.item = p.item; b.classList.add('card--spot'); }

    const fig = h('span', 'card-img');
    const img = new Image();
    img.alt = '';
    img.width = 1616; img.height = 1264;
    img.decoding = 'async';
    img.loading = p.n > 3 ? 'lazy' : 'eager';
    img.src = p.cover;
    const hasVideo = p.items.some(i => i.type !== 'image' && i.type !== 'pages');
    fig.append(img);
    if (p.spot) { if (p.prev) fig.append(prevVideo(p.prev)); }   // vídeo só no YouTube: fica a capa
    else if (p.n !== 12) fig.append(prevVideo('assets/prev/p' + pad2(p.n) + ({ 17: 'b', 5: 'c', 3: 'd', 13: 'e', 14: 'b' }[p.n] || '') + '.mp4'));   // 17b: prévia refeita sem a pintura (nome novo fura o cache) · 12 (HQ) não tem prévia em vídeo; a do 14 (Shawlin) entrou em 20/11
    fig.append(h('span', 'card-play', hasVideo ? '▶ Play' : 'View'));

    const cap = h('span', 'card-cap');
    const title = h('span', 'card-title');
    if (!p.spot) title.append(h('span', 'card-n', pad2(p.n)));
    title.append(document.createTextNode(p.title));
    cap.append(title, h('span', 'card-meta', [p.kind, p.role, p.with, p.year].filter(Boolean).join(' · ')));
    if (p.award) cap.append(h('span', 'card-award', p.award));

    b.append(fig, cap);
    li.append(b);
    grid.append(li);
  });

  /* ---------- AI Lab: miniaturas das pranchas ---------- */
  const boards = $('#labBoards');
  const oneTake = byN(4);
  if (boards && oneTake) {
    oneTake.items.forEach((it, i) => {
      if (it.type !== 'image') return;
      const b = h('button');
      b.type = 'button';
      b.dataset.open = 4;
      b.dataset.item = i;
      b.setAttribute('aria-label', it.sub + ': ' + it.label);
      const img = new Image();
      img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; img.src = it.src;
      b.append(img);
      boards.append(b);
    });
  }

  /* ---------- Hero ---------- */
  const hero = $('#reel');
  const heroVideo = $('#heroVideo');
  const heroToggle = $('#heroToggle');
  const ruler = $('.hero-ruler');
  let heroVisible = true;
  let heroWanted = !reduceMotion;   // o que o visitante quer: tocando ou parado

  function syncHeroBtn() {
    const playing = !heroVideo.paused;
    heroToggle.textContent = playing ? 'Pause' : 'Play';
    heroToggle.setAttribute('aria-label', playing ? 'Pause the background film' : 'Play the background film');
  }
  function playHero() { const p = heroVideo.play(); if (p && p.catch) p.catch(syncHeroBtn); }
  heroVideo.addEventListener('play', syncHeroBtn);
  heroVideo.addEventListener('pause', syncHeroBtn);
  heroToggle.addEventListener('click', () => {
    heroWanted = heroVideo.paused;
    if (heroWanted) playHero(); else heroVideo.pause();
  });
  if (reduceMotion) heroVideo.pause();
  syncHeroBtn();
  /* O filme nunca para: se o navegador pausar (troca de aba, economia de energia, fim do arquivo), volta a tocar. */
  let heroDucked = false;
  const introRodando = () => document.documentElement.classList.contains('intro-on') && !window.ffIntroDone;
  function keepHero() { if (introRodando() && !heroVideo.muted) return;   // destravado com som no clique da abertura: espera ela acabar
    if (heroWanted && heroVideo.paused && !document.hidden) playHero(); }
  heroVideo.addEventListener('pause', () => setTimeout(keepHero, 250));
  heroVideo.addEventListener('ended', () => { heroVideo.currentTime = 0; keepHero(); });
  document.addEventListener('visibilitychange', keepHero);
  /* Depois da abertura com a marca (index.html), o filme recomeça do início, com o título certo. */
  document.addEventListener('ff:intro-done', () => {
    try { heroVideo.currentTime = 0; } catch (e) { /* ainda sem metadados */ }
    if (heroWanted) playHero();
  });
  setInterval(keepHero, 2000);

  /* Som (19/11, pedido dele): o site abre COM som e o visitante escolhe desligar.
     Se o navegador barrar som antes de qualquer gesto, o filme segue mudo só até o primeiro clique, toque ou tecla
     em qualquer lugar da página, e aí o som liga sozinho. Quem desligou fica desligado só nesta visita (20/11).
     Trilha de base opcional em FF_DATA.heroMusic. */
  const heroSound = $('#heroSound');
  const music = D.heroMusic ? new Audio(D.heroMusic) : null;
  if (music) { music.loop = true; music.volume = .55; music.preload = 'none'; }
  let soundWanted = true;
  try { soundWanted = sessionStorage.getItem('ff-sound') !== 'off'; } catch (e) { /* sem armazenamento: segue com som */ }   // 20/11: só vale nesta visita; toda visita nova abre com som
  function syncMusic() {
    if (!music) return;
    if (!heroVideo.muted && !heroVideo.paused) {
      if (Math.abs(music.currentTime - heroVideo.currentTime) > .35) music.currentTime = heroVideo.currentTime;   // a trilha anda junto com o filme
      const p = music.play(); if (p && p.catch) p.catch(() => {});
    }
    else music.pause();
  }
  function showSound() {
    const on = !heroVideo.muted;
    const waiting = soundWanted && !on;                 // quer som, o navegador ainda não deixou
    heroSound.textContent = on ? 'Sound on' : (waiting ? 'Tap for sound' : 'Sound off');
    heroSound.setAttribute('aria-pressed', String(on));
    heroSound.setAttribute('aria-label', on ? 'Turn the film sound off' : 'Turn the film sound on');
    heroSound.classList.toggle('is-waiting', waiting);
  }
  function setSound(on) {
    heroVideo.volume = music ? .7 : 1;
    if (!on) { heroVideo.muted = true; showSound(); syncMusic(); return; }
    heroVideo.muted = false;
    heroWanted = true;
    const p = heroVideo.play();
    if (p && p.catch) p.catch(() => { heroVideo.muted = true; playHero(); showSound(); syncMusic(); portaDeSom(); });   // barrado: volta mudo e abre a porta
    showSound(); syncMusic();
  }
  function remember(on) { try { sessionStorage.setItem('ff-sound', on ? 'on' : 'off'); localStorage.removeItem('ff-sound'); } catch (e) { /* tudo bem */ } }
  heroSound.addEventListener('click', () => {
    const on = heroVideo.muted;
    soundWanted = on; remember(on); setSound(on);
    if (window.ffTrack) window.ffTrack('hero_sound', { on, film: $('#heroTitle').textContent });
  });
  /* Primeiro gesto na página (inclusive o que pula a abertura) liga o som que o visitante ainda não recusou. */
  const GESTOS = ['pointerdown', 'keydown', 'touchend'];
  function primeiroGesto(ev) {
    if (ev.target && ev.target.closest && ev.target.closest('#heroSound')) return;   // o botão decide sozinho
    if (document.documentElement.classList.contains('intro-on') && !window.ffIntroDone) {   // clique que solta a abertura com som:
      if (window.ffSoundGesture) window.ffSoundGesture();                                   // só destrava o filme, que liga no fim dela
      return;
    }
    if (soundWanted && heroVideo.muted && !heroDucked) setSound(true);
    if (!heroVideo.muted || !soundWanted) GESTOS.forEach(t => window.removeEventListener(t, primeiroGesto, true));
  }
  GESTOS.forEach(t => window.addEventListener(t, primeiroGesto, { capture: true, passive: true }));
  /* Destrava o som DENTRO do gesto do visitante (Safari exige que cada vídeo/áudio receba o play no próprio clique).
     Chamado pela porta da abertura (index.html) e pela porta abaixo. */
  window.ffSoundGesture = function () {
    if (!soundWanted) return;
    /* 20/11: o filme recebe o play COM som dentro do clique e fica parado atrás da abertura (não volta a ser mudo:
       no Safari/iPhone, tirar o mudo fora do clique pausa o vídeo). No fim da abertura ele começa já com som. */
    try { heroVideo.muted = false; const p = heroVideo.play(); if (p && p.catch) p.catch(() => {}); if (introRodando()) heroVideo.pause(); } catch (e) {}
    if (music) { try { const q = music.play(); music.pause(); if (q && q.catch) q.catch(() => {}); } catch (e) {} }
  };
  /* Sem a abertura (link com #, "reduzir movimento") e com o som barrado: a mesma porta "Enter · Sound on", por cima do site. */
  let porta = null;
  function portaDeSom() {
    return;   // sem botão de entrar (pedido dele, 19/11): o som liga no primeiro gesto, ver primeiroGesto
    if (porta || !soundWanted || document.documentElement.classList.contains('intro-on')) return;
    porta = document.createElement('div');
    porta.className = 'sound-gate';
    porta.innerHTML = '<button type="button" class="intro-gate"><span class="intro-gate-k">Enter</span><span class="intro-gate-s">Sound on ♪</span></button>';
    const entrar = () => { if (!porta) return; porta.remove(); porta = null; setSound(true); };
    porta.addEventListener('click', entrar);
    porta.addEventListener('keydown', ev => { if (/^(Enter| |Escape)$/.test(ev.key)) entrar(); });
    document.body.appendChild(porta);
    try { porta.querySelector('button').focus({ preventScroll: true }); } catch (e) {}
  }
  function abrirComSom() { if (soundWanted) setSound(true); else showSound(); }
  if (window.ffIntroDone || !document.documentElement.classList.contains('intro-on')) abrirComSom();
  else document.addEventListener('ff:intro-done', abrirComSom, { once: true });
  showSound();
  heroVideo.addEventListener('play', syncMusic);
  heroVideo.addEventListener('pause', syncMusic);
  heroVideo.addEventListener('seeked', syncMusic);   // o filme voltou ao início: a trilha volta junto

  /* 20/11: no trecho do Xondaro, os louros dos festivais passam em corte seco, como os logos dos clientes. */
  const laurelBox = h('div', 'hero-laurels');
  laurelBox.setAttribute('role', 'img');
  laurelBox.setAttribute('aria-label', 'Festival selections and awards for the Xondaro Ka\u2019aguy Reguá music video');
  laurelBox.hidden = true;
  const laurelImgs = (D.laurels || []).map(src => { const im = new Image(); im.decoding = 'async'; im.alt = ''; im.dataset.src = src; laurelBox.append(im); return im; });
  const heroNow = $('.hero-now');
  if (heroNow) heroNow.prepend(laurelBox);
  let laurelK = -1, laurelT = 0;
  function laurelStep() {
    if (!laurelImgs.length) return;
    if (laurelK >= 0) laurelImgs[laurelK].classList.remove('on');
    laurelK = (laurelK + 1) % laurelImgs.length;
    laurelImgs[laurelK].classList.add('on');
  }
  function laurelsOn(on) {
    if (!laurelImgs.length || on === !laurelBox.hidden) return;
    laurelBox.hidden = !on;
    clearInterval(laurelT);
    if (!on) return;
    laurelImgs.forEach(im => { if (!im.src) im.src = im.dataset.src; });
    laurelStep();
    if (!reduceMotion) laurelT = setInterval(laurelStep, 8000 / 24);   // 8 quadros cada: dá para ler o nome
  }

  /* O select da abertura passa por vários filmes: título, crédito e botão acompanham o trecho. */
  let heroCue = null;
  heroVideo.addEventListener('timeupdate', () => {
    const c = (D.hero || []).find(x => heroVideo.currentTime < x.until);
    if (!c || c === heroCue) return;
    heroCue = c;
    root.dataset.tone = String((D.hero || []).indexOf(c) % 7);   // azul, amarelo, vermelho, ciano, rosa, laranja, verde-limão: troca a cada filme
    $('#heroTitle').textContent = c.title;
    $('#heroCredit').textContent = c.credit;
    const b = $('#heroOpen');
    b.textContent = c.cta;
    b.dataset.open = c.n;
    b.dataset.item = c.item || 0;
    b.hidden = !c.n;   // trecho sem página no site
    laurelsOn(!!c.laurels);
  });

  /* 20/11: a cor de destaque também troca a cada seleção (passar o mouse, focar ou tocar num item): azul, vermelho, amarelo. */
  (() => {
    const SEQ = ['0', '2', '1'], SEL = '.card, .awards button, .nav a, .lab-fig, .lab-boards button, .p-list button';
    let last = null, k = SEQ.indexOf(root.dataset.tone || '0');
    const pick = e => {
      const t = e.target.closest && e.target.closest(SEL);
      if (!t || t === last || t.closest('#info')) return;   // 20/11: na seção Info a cor fica quieta
      last = t;
      k = (k + 1) % SEQ.length;
      root.dataset.tone = SEQ[k];
    };
    document.addEventListener('pointerover', pick, { passive: true });
    document.addEventListener('focusin', pick);
  })();

  /* Pele B: o raio é a agulha da timeline e anda com o filme. */
  function needle() {
    if (heroVisible && root.dataset.skin === 'storm' && heroVideo.duration) {
      ruler.style.setProperty('--p', (heroVideo.currentTime / heroVideo.duration).toFixed(4));
    }
    requestAnimationFrame(needle);
  }
  requestAnimationFrame(needle);

  /* ---------- Cabeçalho: sólido depois do hero + seção ativa no menu ---------- */
  const top = $('#top');
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      heroVisible = e.isIntersecting;
      top.classList.toggle('is-solid', !e.isIntersecting);
    });
  }, { rootMargin: '-150px 0px 0px 0px' }).observe(hero);

  const links = $$('.nav a');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => {
        const on = a.getAttribute('href') === '#' + e.target.id;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-42% 0px -56% 0px' });
  ['reel', 'works', 'ailab', 'info'].forEach(id => spy.observe(document.getElementById(id)));

  /* Loops do AI Lab: carregam e tocam só quando estão na tela. */
  const labVids = $$('.lab-v');
  const labOn = new Set();
  function playLab(v) { if (!v.src) v.src = v.dataset.src; const p = v.play(); if (p && p.catch) p.catch(() => {}); }
  if (!reduceMotion) {
    const labIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { labOn.add(e.target); playLab(e.target); }
        else { labOn.delete(e.target); e.target.pause(); }
      });
    }, { threshold: .25 });
    labVids.forEach(v => labIO.observe(v));
  }

  /* ---------- Idioma da HQ: francês para quem tem o navegador em francês, espanhol em espanhol, senão inglês ---------- */
  let hqLang = (() => { const n = (navigator.language || '').toLowerCase(); return n.startsWith('pt') ? 'pt' : n.startsWith('fr') ? 'fr' : n.startsWith('es') ? 'es' : 'en'; })();
  function setHqLang(l) {
    if (!['en', 'es', 'fr', 'pt'].includes(l)) return;
    hqLang = l;
    $$('.is-hq').forEach(w => w.dispatchEvent(new Event('ff-hq-lang')));
    try { if (cur && cur.i18n && dlg.open) fillText(cur); } catch (e) {}   // na carga, a ficha ainda não existe
  }

  /* ---------- Sobre: EN / ES ---------- */
  function setLang(lang) {
    $$('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $$('[data-lang-panel]').forEach(p => { p.hidden = p.dataset.langPanel !== lang; });
    setHqLang(lang);   // a HQ acompanha o idioma escolhido
    if (window.ffI18n) window.ffI18n(lang);   // 20/11: o site todo troca junto
    try { localStorage.setItem('ffLang', lang); } catch (e) {}
  }
  $$('[data-lang]').forEach(b => b.addEventListener('click', () => {
    setLang(b.dataset.lang);
    if (window.ffTrack) window.ffTrack('about_lang', { lang: b.dataset.lang });
  }));
  { let l = null; try { l = localStorage.getItem('ffLang'); } catch (e) {}
    if (!['en', 'pt', 'es'].includes(l)) { const n = (navigator.language || '').toLowerCase(); l = n.startsWith('pt') ? 'pt' : n.startsWith('es') ? 'es' : 'en'; }
    if (l !== 'en') setLang(l); }

  /* ---------- Player ---------- */
  const dlg = $('#player');
  const stage = $('#pStage');
  const proto = $('#pProto');
  const list = $('#pList');
  let cur = null;
  let curItem = 0;
  let opener = null;

  function mount(i) {
    curItem = i;
    const it = cur.items[i];
    if (window.ffTrack) window.ffTrack('play_item', { work: pad2(cur.n), item: it.label || '', kind: it.type });
    stage.textContent = '';
    /* 20/11: filme com louros de festival mostra todos eles na ficha. */
    const lau = $('#pLaurels');
    if (lau) {
      lau.textContent = '';
      lau.hidden = !it.laurels;
      clearInterval(window.ffLauT);
      if (it.laurels) {
        /* um por vez, em corte seco, como os logos dos clientes (pedido dele) */
        const ims = (D.laurels || []).map(src => { const im = new Image(); im.alt = ''; im.decoding = 'async'; im.width = 640; im.height = 430; im.src = src; lau.append(im); return im; });
        let k = 0;
        if (ims[0]) ims[0].classList.add('on');
        if (!reduceMotion && ims.length > 1) window.ffLauT = setInterval(() => { ims[k].classList.remove('on'); k = (k + 1) % ims.length; ims[k].classList.add('on'); }, 8000 / 24);
      }
    }
    let node;
    if (it.type === 'vimeo') {
      node = h('iframe');
      node.src = 'https://player.vimeo.com/video/' + it.id + '?autoplay=1&title=0&byline=0&portrait=0&dnt=1&color=' +
        (root.dataset.skin === 'storm' ? 'ffd21f' : '5408ff');
      node.allow = 'autoplay; fullscreen; picture-in-picture';
      node.title = it.label;
    } else if (it.type === 'youtube') {
      node = h('iframe');
      node.referrerPolicy = 'strict-origin-when-cross-origin';
      node.src = 'https://www.youtube-nocookie.com/embed/' + it.id + '?autoplay=1&rel=0&playsinline=1';
      node.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
      node.title = it.label;
    } else if (it.type === 'file') {
      node = h('video');
      node.controls = true;
      node.playsInline = true;
      node.autoplay = true;
      if (it.loop) { node.loop = true; node.muted = true; }
      if (it.poster) node.poster = it.poster;
      node.src = it.src;
    } else if (it.type === 'pages') {
      /* HQ (19/11): páginas no idioma do visitante (inglês, espanhol ou francês), com troca ali mesmo. */
      const wrap = h('div', 'stage-pages-wrap');
      const pages = h('div', 'stage-pages');
      pages.tabIndex = 0;
      pages.setAttribute('aria-label', it.label + ', ' + it.count + ' pages. Scroll sideways to read.');
      pages.addEventListener('contextmenu', e => e.preventDefault());
      const dirFor = l => (it.langs && it.langs[l]) || it.dir;
      for (let k = 1; k <= it.count; k++) {
        const pg = new Image();
        pg.alt = 'Page ' + k; pg.draggable = false; pg.decoding = 'async';
        pg.loading = k > 3 ? 'lazy' : 'eager';
        pg.width = 960; pg.height = 1280;
        pg.dataset.k = pad2(k);
        pg.src = dirFor(hqLang) + 'p' + pad2(k) + '.jpg';
        pages.append(pg);
      }
      wrap.append(pages);
      if (it.langs) {
        const bar = h('div', 'hq-langs');
        bar.setAttribute('role', 'group'); bar.setAttribute('aria-label', 'Comic language');
        const NAMES = { en: 'English', es: 'Español', fr: 'Français', pt: 'Português' };
        Object.keys(it.langs).forEach(l => {
          const b = h('button', '', NAMES[l] || l.toUpperCase());
          b.type = 'button'; b.dataset.hqLang = l; b.lang = l;
          b.addEventListener('click', () => { setHqLang(l); if (window.ffTrack) window.ffTrack('hq_lang', { lang: l }); });
          bar.append(b);
        });
        /* 20/11: tela cheia (pedido dele). iPhone não tem fullscreen de elemento: cai num modo que cobre a tela. */
        const fs = h('button', 'hq-fs', '⛶ Full screen');
        fs.type = 'button';
        fs.addEventListener('click', () => {
          const on = document.fullscreenElement || document.webkitFullscreenElement || wrap.classList.contains('is-full');
          if (on) {
            if (document.fullscreenElement) document.exitFullscreen(); else if (document.webkitFullscreenElement) document.webkitExitFullscreen();
            wrap.classList.remove('is-full');
          } else if (wrap.requestFullscreen) wrap.requestFullscreen().catch(() => wrap.classList.add('is-full'));
          else if (wrap.webkitRequestFullscreen) wrap.webkitRequestFullscreen();
          else wrap.classList.add('is-full');
          if (window.ffTrack) window.ffTrack('hq_fullscreen', {});
          setTimeout(label, 300);
        });
        const label = () => { fs.textContent = (document.fullscreenElement || document.webkitFullscreenElement || wrap.classList.contains('is-full')) ? '✕ Exit full screen' : '⛶ Full screen'; };
        document.addEventListener('fullscreenchange', label); document.addEventListener('webkitfullscreenchange', label);
        bar.append(fs);
        wrap.append(bar);
      }
      wrap.addEventListener('ff-hq-lang', () => {
        pages.querySelectorAll('img').forEach(pg => { pg.src = dirFor(hqLang) + 'p' + pg.dataset.k + '.jpg'; });
        wrap.querySelectorAll('[data-hq-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.hqLang === hqLang)));
        pages.lang = hqLang;
      });
      wrap.classList.add('is-hq');
      node = wrap;
      setTimeout(() => wrap.dispatchEvent(new Event('ff-hq-lang')), 0);
    } else if (it.type === 'link') {
      node = h('div', 'stage-link');
      const bg = new Image();
      bg.alt = ''; bg.src = cur.cover;
      const a = h('a', 'btn btn-solid', (it.cta || 'Open') + ' ↗');
      a.href = it.href; a.target = '_blank'; a.rel = 'noopener';
      node.append(bg, a);
    } else {
      node = new Image();
      node.alt = it.label;
      node.src = it.src;
    }
    stage.append(node);
    proto.hidden = !it.proto;
    proto.textContent = it.proto || '';
    $$('button', list).forEach((b, k) => b.setAttribute('aria-current', String(k === i)));
  }

  /* Textos do projeto. 20/11: projeto com `i18n` (a HQ) troca o texto junto com o idioma escolhido nas páginas. */
  function fillText(p) {
    const tr = (p.i18n && p.i18n[hqLang]) || null;
    const T = Object.assign({}, p, tr || {});
    $('#pKind').textContent = T.kind;
    $('#pTitle').textContent = T.title;
    $('#pMeta').textContent = [T.role, T.with, T.year].filter(Boolean).join(' · ');
    const desc = $('#pDesc');
    desc.textContent = '';
    T.desc.forEach(t => desc.append(h('p', '', t)));
    $('#pCredits').textContent = T.credits || '';
    const linksBox = $('#pLinks');
    linksBox.textContent = '';
    (T.buy ? [{ label: T.buyLabel || 'Buy on Amazon', href: T.buy, solid: true }] : []).concat(T.links || []).forEach(l => {
      const a = h('a', 'btn ' + (l.solid ? 'btn-solid' : 'btn-ghost'), l.label + ' ↗');
      a.href = l.href; a.target = '_blank'; a.rel = 'noopener';
      linksBox.append(a);
    });
    [$('#pKind'), $('#pTitle'), $('#pMeta'), desc, $('#pCredits'), linksBox].forEach(el => { if (tr) el.lang = hqLang; else el.removeAttribute('lang'); });
  }

  function openProject(n, item) {
    const p = byN(n);
    if (!p) return;
    cur = p;
    if (window.ffTrack) window.ffTrack('open_work', { work: pad2(p.n), title: p.title });
    $('#pCount').textContent = pad2(p.n) + ' / ' + pad2(D.projects.length);
    $('#pAward').textContent = p.award || '';

    list.textContent = '';
    if (p.items.length > 1) {
      p.items.forEach((it, i) => {
        const li = h('li');
        const b = h('button');
        b.type = 'button';
        b.append(h('span', 'pl-label', it.label));
        if (it.dur) b.append(h('span', 'pl-dur', it.dur));
        if (it.sub) b.append(h('span', 'pl-sub', it.sub));
        b.addEventListener('click', () => { mount(i); dlg.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });
        li.append(b);
        list.append(li);
      });
    }

    fillText(p);

    if (!dlg.open) {
      opener = document.activeElement;
      heroDucked = !heroVideo.muted;   // o filme da abertura segue rodando atrás, só fica mudo enquanto o player está aberto
      heroVideo.muted = true; syncMusic();
      labVids.forEach(v => v.pause());
      dlg.showModal();
    }
    mount(Math.min(item || 0, p.items.length - 1));
    dlg.scrollTop = 0;
  }

  function step(d) {
    const i = D.projects.indexOf(cur);
    const next = D.projects[(i + d + D.projects.length) % D.projects.length];
    openProject(next.n, 0);
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-open]');
    if (t) openProject(t.dataset.open, Number(t.dataset.item) || 0);
  });
  $('#pClose').addEventListener('click', () => dlg.close());
  $('#pPrev').addEventListener('click', () => step(-1));
  $('#pNext').addEventListener('click', () => step(1));
  dlg.addEventListener('close', () => {
    if (dlg.open) return;            // o evento chega atrasado: se já reabriu, não limpa o que acabou de montar
    stage.textContent = '';          // tira o iframe/vídeo: para o som
    clearInterval(window.ffLauT);
    cur = null;
    if (heroDucked) { heroVideo.muted = false; heroDucked = false; }
    if (heroWanted) playHero();
    syncMusic();
    labOn.forEach(playLab);
    if (opener && opener.focus) opener.focus();
  });

  /* Link direto para um projeto: index.html#work-3 abre o projeto 03. */
  const deep = /^#work-(\d+)$/.exec(location.hash);
  if (deep && byN(deep[1])) openProject(deep[1], 0);

  /* 20/11: logos parados ao lado do FFF, corte seco a cada 5 quadros a 24 fps (~208 ms), em loop. */
  (() => {
    const logos = document.querySelectorAll('.clients-slot img'); if (logos.length < 2) return;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0, t = 0;
    const step = () => { logos[i].classList.remove('on'); i = (i + 1) % logos.length; logos[i].classList.add('on'); };
    const run = () => { clearInterval(t); if (!document.hidden) t = setInterval(step, 5000 / 24); };
    document.addEventListener('visibilitychange', run); run();
  })();

  /* 20/11: o logo fica em cima do "Corte Seco · AI Director", colado à direita do FFF. */
  (() => {
    const top = document.querySelector('.top'), cl = document.querySelector('.clients');
    const logo = document.querySelector('.brand-fff .fff-logo'), sub = document.querySelector('.brand-fff .brand-sub');
    if (!top || !cl || !logo) return;
    const place = () => {
      const t = top.getBoundingClientRect(), l = logo.getBoundingClientRect();
      if (!l.width) return;
      const s = sub && sub.offsetParent ? sub.getBoundingClientRect() : null;
      const x = l.right - t.left + 14;
      const h = Math.round(l.height * .78);
      const w = s ? Math.max(70, Math.min(150, s.right - l.right - 14)) : Math.round(h * 2.5);
      cl.style.setProperty('--cl-x', x + 'px');
      cl.style.setProperty('--cl-y', (l.bottom - t.top - h) + 'px');
      cl.style.setProperty('--cl-h', h + 'px');
      cl.style.setProperty('--cl-w', w + 'px');
    };
    place();
    if (window.ResizeObserver) new ResizeObserver(place).observe(logo);
    addEventListener('resize', place);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  })();

  /* 20/11: "Fernando Freitas · Corte Seco" fica; a última palavra troca em corte seco (habilidades). */
  (() => {
    const el = document.querySelector('.brand-skill'); if (!el) return;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const SK = ['AI Director', 'Motion', 'Color grading', 'Design', 'Finishing', 'Post-production', 'Senior Editor', 'Trailers', 'Sound design', 'Illustration', 'Creative Director'];
    let i = 0, t = 0;
    const run = () => { clearInterval(t); if (!document.hidden) t = setInterval(() => { i = (i + 1) % SK.length; el.textContent = SK[i]; }, 1500); };
    document.addEventListener('visibilitychange', run); run();
  })();
})();
