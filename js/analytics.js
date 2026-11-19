/* Medição de visitas com consentimento (RGPD + LSSI, Espanha).
   Nada do Google Analytics nem do Microsoft Clarity carrega antes de o visitante clicar em "Accept".
   Sem IDs preenchidos, não aparece aviso e nada é medido.

   Para ligar: criar a propriedade no Google Analytics 4 (ID "G-XXXXXXXXXX") e o projeto no
   Microsoft Clarity (ID de ~10 letras, em Settings → Setup) e colar abaixo. */
(function () {
  'use strict';

  var CFG = {
    ga4: '',        // ex.: 'G-ABC123XYZ9'
    clarity: ''     // ex.: 'k3x9p2m8qa'
  };

  var KEY = 'ff-consent';                 // 'yes' | 'no', guardado só no navegador do visitante
  var active = !!(CFG.ga4 || CFG.clarity);
  var loaded = false;
  var queue = [];

  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* sem storage: vale só nesta visita */ } }

  function send(name, params) {
    if (window.gtag && CFG.ga4) window.gtag('event', name, params || {});
    if (window.clarity && CFG.clarity) {
      window.clarity('event', name);
      if (params && params.work) window.clarity('set', 'work', String(params.work));
    }
  }

  function load() {
    if (loaded || !active) return;
    loaded = true;
    if (CFG.ga4) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      window.gtag('js', new Date());
      window.gtag('config', CFG.ga4, { cookie_expires: 34128000, allow_google_signals: false, allow_ad_personalization_signals: false });   // cookies de 13 meses, sem sinais de anúncio
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CFG.ga4);
      document.head.appendChild(s);
    }
    if (CFG.clarity) {
      window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
      var c = document.createElement('script');
      c.async = true;
      c.src = 'https://www.clarity.ms/tag/' + encodeURIComponent(CFG.clarity);
      document.head.appendChild(c);
      window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
    }
    queue.splice(0).forEach(function (e) { send(e[0], e[1]); });
  }

  /* Chamado pelo site.js nos momentos que interessam (projeto aberto, vídeo tocado, som, idioma). */
  window.ffTrack = function (name, params) {
    if (!active || getChoice() !== 'yes') return;
    if (!loaded) { queue.push([name, params]); return; }
    send(name, params);
  };

  /* ---------- Aviso de cookies ---------- */
  var bar = null;
  var ES = (navigator.language || '').toLowerCase().indexOf('es') === 0;   // mesmo critério do "About" (site.js)

  function closeBar() { if (bar) { bar.remove(); bar = null; } }

  /* Retirou o consentimento: apaga os cookies de medição deste site (os de terceiros ficam com o navegador). */
  function clearCookies() {
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (!/^(_ga|_gid|_gat|_cl)/.test(name)) return;
      ['', location.hostname, '.' + location.hostname].forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  function choose(v) {
    setChoice(v);
    closeBar();
    if (v === 'no') clearCookies();
    if (v === 'yes') load();
    else if (loaded) location.reload();   // retirou o consentimento: recarrega sem as ferramentas
  }

  function showBar() {
    if (!active || bar) return;
    bar = document.createElement('div');
    bar.className = 'consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookies');
    bar.setAttribute('lang', ES ? 'es' : 'en');
    bar.innerHTML = ES ?
      '<p><strong>¿Cookies?</strong> Soy Fernando Freitas y me gustaría usar cookies de análisis (Google Analytics y Microsoft Clarity) para saber qué trabajos se ven y cómo se recorre el sitio. Solo se cargan si aceptas. <a href="privacy.html#es">Privacidad y cookies</a></p>' +
      '<details><summary>Detalles</summary>' +
      '<p>Quién: Fernando Freitas, València (<a href="mailto:frn.freit@gmail.com">frn.freit@gmail.com</a>). Qué: páginas y proyectos vistos, vídeos reproducidos, clics, desplazamiento, dispositivo, ubicación aproximada y grabaciones de sesión con los campos de texto ocultos. Herramientas: Google Analytics 4 (Google Ireland) y Microsoft Clarity (Microsoft Ireland); las cookies duran hasta 13 meses y los datos pueden tratarse en EE. UU. bajo el Marco de Privacidad de Datos UE–EE. UU. Sin tu consentimiento no se mide nada: las tipografías vienen de Bunny Fonts (UE) sin cookies, y el reproductor de Vimeo o YouTube solo se carga cuando abres una película alojada allí (Vimeo con “do not track”, YouTube en modo de privacidad mejorada). Puedes cambiar de opinión cuando quieras en “Cookie settings”, al pie de la página.</p>' +
      '</details>' +
      '<div class="consent-actions">' +
      '<button type="button" class="btn btn-solid" data-consent="no">Rechazar</button>' +
      '<button type="button" class="btn btn-solid" data-consent="yes">Aceptar</button>' +
      '</div>'
    :
      '<p><strong>Cookies?</strong> I’m Fernando Freitas and I’d like to use analytics cookies (Google Analytics and Microsoft Clarity) to see which work gets watched and how people move around the site. They only load if you accept. <a href="privacy.html">Privacy &amp; cookies</a></p>' +
      '<details><summary>Details</summary>' +
      '<p>Who: Fernando Freitas, València (<a href="mailto:frn.freit@gmail.com">frn.freit@gmail.com</a>). What: pages and projects viewed, videos played, clicks, scroll, device, approximate location, and session recordings with text fields masked. Tools: Google Analytics 4 (Google Ireland) and Microsoft Clarity (Microsoft Ireland); cookies last up to 13 months, and data may be processed in the US under the EU–US Data Privacy Framework. Without your consent nothing is measured: fonts come from Bunny Fonts (EU) without cookies, and the Vimeo or YouTube player only loads when you open a film hosted there (Vimeo with “do not track”, YouTube in privacy-enhanced mode). Change your mind any time with “Cookie settings” at the bottom of the page.</p>' +
      '<p lang="es">Uso cookies de análisis (Google Analytics y Microsoft Clarity) solo si aceptas. Puedes cambiar de opinión en “Cookie settings”, al pie de la página. Más información en <a href="privacy.html#es">Privacidad y cookies</a>.</p>' +
      '</details>' +
      '<div class="consent-actions">' +
      '<button type="button" class="btn btn-solid" data-consent="no">Reject</button>' +   // mesmo peso visual que o Accept (guia da AEPD)
      '<button type="button" class="btn btn-solid" data-consent="yes">Accept</button>' +
      '</div>';
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]');
      if (b) choose(b.dataset.consent);
    });
    document.body.appendChild(bar);
  }

  function boot() {
    var settings = document.getElementById('cookieSettings');
    if (settings) {
      settings.hidden = !active;
      settings.addEventListener('click', showBar);
    }
    var c = getChoice();
    if (c === 'yes') load();
    else if (c === 'no') clearCookies();   // de novo após recarregar: um envio atrasado pode ter regravado algum
    else showBar();

    /* Cliques para fora (e-mail, LinkedIn, Vimeo, Behance, Instagram, links de projeto). */
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (/^mailto:/i.test(href)) window.ffTrack('contact_email', { place: a.closest('section, dialog, footer') ? (a.closest('section, dialog, footer').id || 'player') : '' });
      else if (/^https?:/i.test(href) && a.host !== location.host) window.ffTrack('outbound', { host: a.host.replace(/^www\./, ''), url: href });
    });

    /* Seções vistas (Reel, Works, AI Lab, Info), uma vez por visita. */
    if ('IntersectionObserver' in window) {
      var seen = {};
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting && !seen[en.target.id]) { seen[en.target.id] = 1; window.ffTrack('section_view', { section: en.target.id }); }
        });
      }, { threshold: 0.35 });
      ['reel', 'works', 'ailab', 'info'].forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
