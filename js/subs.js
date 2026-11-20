/* Legendas do filme da abertura (20/11). Seguem o idioma do site (EN / PT / ES).
   Cada linha: a, b = segundos no filme · src = idioma da fala · o = fala original · en/pt/es = traduções.
   burn = o próprio filme já traz essa legenda na imagem (não repete no mesmo idioma).
   Versos em iorubá e guarani: a legenda avisa o idioma; preenchendo "o" (original) e en/pt/es,
   aparecem as duas linhas, original e tradução. Não inventar texto: só entra o que o Fernando confirmar. */
(function () {
  var v = document.getElementById('heroVideo'), box = document.getElementById('heroSub');
  if (!v || !box) return;
  var NAME = {
    yo: { en: 'In Yoruba', pt: 'Em iorubá', es: 'En yoruba' },
    gn: { en: '♪ In Guarani Mbya (Tupi-Guarani)', pt: '♪ Em guarani mbya (tronco tupi)', es: '♪ En guaraní mbya (familia tupí)' }
  };
  var C = [
    { a: 6.9, b: 12.0, src: 'en', o: '…made it possible to map an Amazon area of a size never before achieved.',
      pt: '…permitiu mapear uma área da Amazônia de um tamanho nunca antes alcançado.', es: '…permitió mapear un área de la Amazonia de un tamaño nunca antes alcanzado.' },
    { a: 14.05, b: 18.1, src: 'en', o: 'We commit to purchasing 100% of the community’s production.',
      pt: 'Assumimos o compromisso de comprar 100% da produção da comunidade.', es: 'Nos comprometemos a comprar el 100 % de la producción de la comunidad.' },
    { a: 18.15, b: 21.4, src: 'en', o: '…empowered local communities to become entrepreneurs.',
      pt: '…deu às comunidades locais condições de empreender.', es: '…dio a las comunidades locales las herramientas para emprender.' },
    /* Avon Afrofuturo: fala em iorubá. Tradução = a legenda oficial em português do próprio filme. Texto em iorubá ("o") = tradução feita a partir da legenda, NÃO transcrição da fala; Fernando vai conferir (20/11). */
    { a: 22.05, b: 26.45, src: 'yo', o: 'Àwọn ènìyàn mi gòkè, wọ́n ṣe rere, wọ́n sì pọ̀ sí i.', pt: 'Meu povo ascendeu, prosperou, se multiplicou.', en: 'My people rose, prospered, multiplied.', es: 'Mi pueblo ascendió, prosperó, se multiplicó.' },
    { a: 26.5, b: 28.05, src: 'yo', o: 'A jẹ́ ọ̀pọ̀lọpọ̀ gẹ́gẹ́ bí a ṣe jẹ́ ẹnìkọ̀ọ̀kan.', pt: 'Somos tão plurais quanto individuais.', en: 'We are as plural as we are individual.', es: 'Somos tan plurales como individuales.' },
    { a: 30.25, b: 33.5, src: 'pt', o: 'Outras músicas já contam a minha realidade, mas essa eu acho que resume a total…',
      en: 'Other songs already tell my reality, but this one, I think, sums it all up…', es: 'Otras canciones ya cuentan mi realidad, pero esta creo que la resume entera…' },
    { a: 42.6, b: 45.1, src: 'en', burn: 1, o: 'Presenting Air Silva.', pt: 'Apresentando: Air Silva.', es: 'Presentamos Air Silva.' },
    { a: 45.2, b: 51.3, src: 'en', burn: 1, o: 'This is the bicycle kick, one of the most challenging and iconic moves in football.',
      pt: 'Esta é a bicicleta, uma das jogadas mais difíceis e icônicas do futebol.', es: 'Esta es la chilena, una de las jugadas más difíciles e icónicas del fútbol.' },
    { a: 51.95, b: 56.2, src: 'en', burn: 1, o: '…a forgotten Brazilian legend who made the bicycle kick famous worldwide.',
      pt: '…uma lenda brasileira esquecida que tornou a bicicleta famosa no mundo todo.', es: '…una leyenda brasileña olvidada que hizo famosa la chilena en todo el mundo.' },
    { a: 61.0, b: 65.4, src: 'pt', o: 'Aqui no Brasil é brincadeira de nível hard, né?',
      en: 'Here in Brazil it’s a game on hard mode, right?', es: 'Aquí en Brasil es un juego en modo difícil, ¿no?' },
    { a: 146.2, b: 149.6, src: 'pt', o: 'Mas assim, tô aqui, tô na tua casa, tá legal,',
      en: 'Look, I’m here, I’m in your house, fine,', es: 'A ver, estoy aquí, estoy en tu casa, vale,' },
    { a: 149.6, b: 153.4, src: 'pt', o: 'sei que você já é crescido, sabe o que faz, mas…',
      en: 'I know you’re a grown-up, you know what you’re doing, but…', es: 'sé que ya eres mayor, sabes lo que haces, pero…' },
    { a: 156.35, b: 160.4, src: 'pt', o: 'não é de bom tom você ter uma pessoa amarrada na sala da tua casa.',
      en: 'it’s not good manners to keep someone tied up in your living room.', es: 'no es de buen gusto tener a una persona atada en el salón de tu casa.' },
    { a: 160.6, b: 162.5, src: 'pt', o: 'O que significa isso?', en: 'What does this mean?', es: '¿Qué significa esto?' },
    { a: 171.1, b: 174.2, src: 'pt', burn: 1, o: 'O Movimento Negro continuará lutando!',
      en: 'The Black Movement will keep fighting!', es: '¡El Movimiento Negro seguirá luchando!' },
    { a: 174.55, b: 177.2, src: 'pt', o: 'Tipo ter certeza do amor da sua vida.',
      en: 'Like being sure about the love of your life.', es: 'Como tener la certeza del amor de tu vida.' },
    { a: 183.25, b: 185.4, src: 'en', burn: 1, o: '…with its own icons.', pt: '…com seus próprios ícones.', es: '…con sus propios iconos.' },
    /* OWERÁ — Xondaro Ka’aguy Reguá: verso em guarani. Sentido conferido na legenda oficial do clipe (PT/EN), dito com outras palavras. Texto em guarani ("o") = tradução feita a partir da legenda, NÃO a letra cantada; Fernando vai conferir (20/11). */
    { a: 189.4, b: 190.7, src: 'gn', o: 'Oipe’a nhandeyvy…', pt: 'Tomaram as nossas terras…', en: 'They took our land…', es: 'Tomaron nuestras tierras…' },
    { a: 190.7, b: 193.3, src: 'gn', o: 'Orevy pe ka’aguy ma imarã e’ỹ va’e.', pt: 'Para nós, a floresta sempre foi sagrada.', en: 'To us, the forest was always sacred.', es: 'Para nosotros, el bosque siempre fue sagrado.' },
    { a: 196.0, b: 197.8, src: 'gn', o: 'Ha’e gui jurua kuery ou vy, Nhanderu ojapo va’ekue omokanhy.', pt: 'Aí o branco chegou e destruiu o que Deus criou.', en: 'Then the white man came and destroyed what God had made.', es: 'Entonces llegó el blanco y destruyó lo que Dios creó.' },
    { a: 197.85, b: 200.4, src: 'pt', o: 'Não conseguiria de maneira alguma fazer propaganda…',
      en: 'There is no way I could ever do advertising…', es: 'No podría de ninguna manera hacer publicidad…' },
    { a: 202.65, b: 204.3, src: 'pt', o: 'Ele é global sendo local.', en: 'He is global by being local.', es: 'Es global siendo local.' },
    { a: 216.35, b: 217.6, src: 'pt', o: 'E pra fechar…', en: 'And to wrap it up…', es: 'Y para cerrar…' }
  ];
  var cur = null, curLang = '';
  function line(cls, txt) { var s = document.createElement('span'); s.className = cls; s.textContent = txt; box.appendChild(s); }
  function draw() {
    var t = v.currentTime, lang = document.documentElement.lang || 'en', c = null;
    if (lang !== 'pt' && lang !== 'es') lang = 'en';
    for (var i = 0; i < C.length; i++) if (t >= C[i].a && t < C[i].b) { c = C[i]; break; }
    if (c === cur && lang === curLang) return;
    cur = c; curLang = lang;
    box.textContent = '';
    if (!c) { box.hidden = true; return; }
    if (NAME[c.src]) {   // verso em outra língua: avisa qual é; original e tradução juntos quando houver
      line('hero-sub-lang', NAME[c.src][lang]);
      if (c.o) line('hero-sub-orig', c.o);
      if (c[lang]) line('hero-sub-tr', c[lang]);
    } else if (c.src === lang) {
      if (c.burn) { box.hidden = true; return; }
      line('hero-sub-tr', c.o);
    } else line('hero-sub-tr', c[lang] || c.o);
    box.hidden = false;
  }
  v.addEventListener('timeupdate', draw);
  v.addEventListener('seeked', draw);
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
