/* Conteúdo do site. Fonte: kit-behance-v11 (BEHANCE_textos.md) + página pública vimeo.com/fernstorm.
   Títulos no padrão "Cliente — Peça". Para trocar texto, vídeo ou ordem, é só mexer aqui. */
window.FF_DATA = {

  /* Os 6 prêmios da prévia do kit. "n" = projeto que o prêmio abre. */
  awards: [
    { award: 'Cannes Lions 2025',       cat: 'Grand Prix, Sustainable Development Goals', project: 'The Amazon Greenventory · Natura', n: 1 },
    { award: 'International Emmy 2021', cat: 'Nominee, Arts Programming',                 project: 'AmarElo · Netflix', n: 2 },
    { award: 'Academy Awards 2016',     cat: 'Film nominated, Best Animated Feature',     project: 'O Menino e o Mundo · soundtrack video', n: 7 },
    { award: 'MTV VMB 2011',            cat: 'Video of the Year',                         project: 'Emicida · Então Toma', n: 5 },
    { award: 'KAIA IFF Türkiye 2025',   cat: 'Best Documentary Direction',                project: 'Seu Estilo, Seu Impacto', n: 8 },
    { award: 'Wave Festival',           cat: 'Bronze, Branded Content',                   project: 'Vivo Game Changers', n: 9 }
  ],

  /* item.type: vimeo | youtube | file (vídeo local) | image | link (capa + botão que abre em outra aba) */
  heroMusic: '',   // 19/11: o export novo já traz a mix (Five to One); 'assets/hero/hero_music.mp3' era a trilha da versão anterior
    // trilha de base da abertura (arquivo próprio ou licenciado); vazio = só o som dos filmes
  hero: [   // montagem V01 exportada em 19/11 22h37 (4:42), mapeada pela timeline do Premiere em 20/11; n: 0 = sem página no site, botão some
    {"until":6.88,"n":7,"item":0,"title":"O Menino e o Mundo","credit":"Soundtrack video · film nominated for the Academy Awards 2016","cta":"▶ Watch"},
    {"until":12.05,"n":1,"item":0,"title":"Natura — The Amazon Greenventory","credit":"Case film · Cannes Lions 2025, Grand Prix SDG · Editor","cta":"▶ Watch the case film"},
    {"until":14.01,"n":11,"item":0,"title":"MC Guimê & Emicida — País do Futebol","credit":"Music video · Editor","cta":"▶ Watch"},
    {"until":22.02,"n":1,"item":0,"title":"Natura — The Amazon Greenventory","credit":"Case film · Cannes Lions 2025, Grand Prix SDG · Editor","cta":"▶ Watch the case film"},
    {"until":28.4,"n":10,"item":3,"title":"Avon — Afrofuturo","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":30.2,"n":10,"item":1,"title":"Kia — Cerato","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":42.54,"n":11,"item":0,"title":"MC Guimê & Emicida — País do Futebol","credit":"Music video · Editor","cta":"▶ Watch"},
    {"until":58.89,"n":3,"item":0,"title":"Volt — Air_Silva","credit":"Case film & documentary · Cannes Lions 2026 · Edit, motion, sound, color & AI","cta":"▶ Watch the case film"},
    {"until":60.98,"n":2,"item":0,"title":"Netflix — AmarElo: É Tudo Pra Ontem","credit":"Documentary · International Emmy 2021 nominee · Editor","cta":"▶ Watch"},
    {"until":64.56,"n":9,"item":0,"title":"Vivo — Game Changers","credit":"Documentary series · Wave Festival, Bronze","cta":"▶ Watch"},
    {"until":66.36,"n":10,"item":0,"title":"Honda — PCX","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":67.28,"n":11,"item":1,"title":"Don L — Na Batida da Procura Perfeita","credit":"Music video · Editor","cta":"▶ Watch"},
    {"until":69.32,"n":11,"item":2,"title":"Xenia França — Pra Que Me Chamas?","credit":"Music video · Editor","cta":"▶ Watch"},
    {"until":70.11,"n":11,"item":1,"title":"Don L — Na Batida da Procura Perfeita","credit":"Music video · Editor","cta":"▶ Watch"},
    {"until":73.61,"n":11,"item":2,"title":"Xenia França — Pra Que Me Chamas?","credit":"Music video · Editor","cta":"▶ Watch"},
    {"until":74.87,"n":11,"item":1,"title":"Don L — Na Batida da Procura Perfeita","credit":"Music video · Editor","cta":"▶ Watch"},
    {"until":76.37,"n":0,"item":0,"title":"Outback — Brasilidades","credit":"Commercial","cta":""},
    {"until":76.95,"n":11,"item":1,"title":"Don L — Na Batida da Procura Perfeita","credit":"Music video · Editor","cta":"▶ Watch"},
    {"until":78.2,"n":0,"item":0,"title":"Lurdez da Luz — Ziriguidum","credit":"Music video","cta":""},
    {"until":87.67,"n":11,"item":2,"title":"Xenia França — Pra Que Me Chamas?","credit":"Music video · Editor","cta":"▶ Watch"},
    {"until":90.47,"n":11,"item":1,"title":"Don L — Na Batida da Procura Perfeita","credit":"Music video · Editor","cta":"▶ Watch"},
    {"until":95.34,"n":10,"item":7,"title":"Leite Moça — Lei de Moça","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":96.1,"n":10,"item":6,"title":"Riachuelo","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":97.26,"n":10,"item":7,"title":"Leite Moça — Lei de Moça","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":98.47,"n":10,"item":6,"title":"Riachuelo","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":100.35,"n":10,"item":7,"title":"Leite Moça — Lei de Moça","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":101.39,"n":10,"item":6,"title":"Riachuelo","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":102.1,"n":10,"item":7,"title":"Leite Moça — Lei de Moça","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":103.64,"n":10,"item":6,"title":"Riachuelo","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":104.98,"n":10,"item":7,"title":"Leite Moça — Lei de Moça","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":105.94,"n":10,"item":6,"title":"Riachuelo","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":108.07,"n":10,"item":7,"title":"Leite Moça — Lei de Moça","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":136.3,"n":6,"item":0,"title":"Negredo feat. Mano Brown — Linha do Tiro","credit":"Music video","cta":"▶ Watch"},
    {"until":137.72,"n":11,"item":0,"title":"MC Guimê & Emicida — País do Futebol","credit":"Music video · Editor","cta":"▶ Watch"},
    {"until":146.48,"n":6,"item":0,"title":"Negredo feat. Mano Brown — Linha do Tiro","credit":"Music video","cta":"▶ Watch"},
    {"until":164.04,"n":5,"item":0,"title":"Emicida — Então Toma","credit":"Music video · MTV VMB 2011, Video of the Year","cta":"▶ Watch"},
    {"until":165.83,"n":11,"item":3,"title":"Garena Free Fire — T.R.A.P.: I’m on Fire","credit":"Music video · Editor","cta":"▶ Watch"},
    {"until":167.46,"n":6,"item":0,"title":"Negredo feat. Mano Brown — Linha do Tiro","credit":"Music video","cta":"▶ Watch"},
    {"until":168.59,"n":8,"item":0,"title":"Seu Estilo, Seu Impacto","credit":"Documentary · Kaia IFF Türkiye 2025, Best Documentary Direction","cta":"▶ Watch the trailer"},
    {"until":169.25,"n":10,"item":5,"title":"Lux","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":171.05,"n":8,"item":0,"title":"Seu Estilo, Seu Impacto","credit":"Documentary · Kaia IFF Türkiye 2025, Best Documentary Direction","cta":"▶ Watch the trailer"},
    {"until":174.26,"n":2,"item":0,"title":"Netflix — AmarElo: É Tudo Pra Ontem","credit":"Documentary · International Emmy 2021 nominee · Editor","cta":"▶ Watch"},
    {"until":177.3,"n":10,"item":2,"title":"Brastemp — Certezas","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":178.55,"n":1,"item":0,"title":"Natura — The Amazon Greenventory","credit":"Case film · Cannes Lions 2025, Grand Prix SDG · Editor","cta":"▶ Watch the case film"},
    {"until":179.22,"n":7,"item":0,"title":"O Menino e o Mundo","credit":"Soundtrack video · film nominated for the Academy Awards 2016","cta":"▶ Watch"},
    {"until":180.06,"n":8,"item":0,"title":"Seu Estilo, Seu Impacto","credit":"Documentary · Kaia IFF Türkiye 2025, Best Documentary Direction","cta":"▶ Watch the trailer"},
    {"until":182.01,"n":7,"item":0,"title":"O Menino e o Mundo","credit":"Soundtrack video · film nominated for the Academy Awards 2016","cta":"▶ Watch"},
    {"until":183.14,"n":11,"item":3,"title":"Garena Free Fire — T.R.A.P.: I’m on Fire","credit":"Music video · Editor","cta":"▶ Watch"},
    {"until":184.06,"n":7,"item":0,"title":"O Menino e o Mundo","credit":"Soundtrack video · film nominated for the Academy Awards 2016","cta":"▶ Watch"},
    {"until":184.69,"n":3,"item":0,"title":"Volt — Air_Silva","credit":"Case film & documentary · Cannes Lions 2026 · Edit, motion, sound, color & AI","cta":"▶ Watch the case film"},
    {"until":186.19,"n":10,"item":2,"title":"Brastemp — Certezas","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":191.65,"n":0,"item":0,"title":"Lurdez da Luz — Ziriguidum","credit":"Music video","cta":""},
    {"until":192.61,"n":0,"item":0,"title":"OWERÁ — Xondaro Ka'aguy Reguá","credit":"Music video","cta":""},
    {"until":193.44,"n":10,"item":6,"title":"Riachuelo","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":194.65,"n":0,"item":0,"title":"Outback — Brasilidades","credit":"Commercial","cta":""},
    {"until":195.44,"n":5,"item":0,"title":"Emicida — Então Toma","credit":"Music video · MTV VMB 2011, Video of the Year","cta":"▶ Watch"},
    {"until":196.45,"n":11,"item":4,"title":"Família 7 Velas — Clack Bum!","credit":"Music video (official)","cta":"▶ Watch"},
    {"until":197.91,"n":0,"item":0,"title":"OWERÁ — Xondaro Ka'aguy Reguá","credit":"Music video","cta":""},
    {"until":203.16,"n":0,"item":0,"title":"Carlos Motta","credit":"Documentary","cta":""},
    {"until":204.37,"n":0,"item":0,"title":"OWERÁ — Xondaro Ka'aguy Reguá","credit":"Music video","cta":""},
    {"until":208.42,"n":11,"item":4,"title":"Família 7 Velas — Clack Bum!","credit":"Music video (official)","cta":"▶ Watch"},
    {"until":209.17,"n":0,"item":0,"title":"OWERÁ — Xondaro Ka'aguy Reguá","credit":"Music video","cta":""},
    {"until":214.42,"n":0,"item":0,"title":"Lurdez da Luz — Ziriguidum","credit":"Music video","cta":""},
    {"until":215.67,"n":10,"item":8,"title":"Olympikus — Libere a Brincadeira","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":220.64,"n":0,"item":0,"title":"Lurdez da Luz — Ziriguidum","credit":"Music video","cta":""},
    {"until":226.18,"n":4,"item":0,"title":"AI Lab — generated shots","credit":"Generative AI · Seedance & Wan","cta":"▶ See the AI Lab"},
    {"until":231.06,"n":10,"item":8,"title":"Olympikus — Libere a Brincadeira","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":232.27,"n":10,"item":9,"title":"Facebook — More Together","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":234.73,"n":11,"item":4,"title":"Família 7 Velas — Clack Bum!","credit":"Music video (official)","cta":"▶ Watch"},
    {"until":238.78,"n":0,"item":0,"title":"Lurdez da Luz — Ziriguidum","credit":"Music video","cta":""},
    {"until":242.53,"n":10,"item":8,"title":"Olympikus — Libere a Brincadeira","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":254.88,"n":10,"item":10,"title":"YouTube Shorts — #DaUmGame","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":256.38,"n":11,"item":4,"title":"Família 7 Velas — Clack Bum!","credit":"Music video (official)","cta":"▶ Watch"},
    {"until":257.63,"n":10,"item":10,"title":"YouTube Shorts — #DaUmGame","credit":"Commercial · Editor","cta":"▶ Watch the spot"},
    {"until":259.34,"n":0,"item":0,"title":"Lurdez da Luz — Ziriguidum","credit":"Music video","cta":""},
    {"until":266.73,"n":11,"item":4,"title":"Família 7 Velas — Clack Bum!","credit":"Music video (official)","cta":"▶ Watch"},
    {"until":267.93,"n":0,"item":0,"title":"Carlos Motta","credit":"Documentary","cta":""},
    {"until":269.81,"n":0,"item":0,"title":"Lurdez da Luz — Ziriguidum","credit":"Music video","cta":""},
    {"until":9999,"n":10,"item":10,"title":"YouTube Shorts — #DaUmGame","credit":"Commercial · Editor","cta":"▶ Watch the spot"}
  ],
  projects: [
    {
      n: 1, cat: 'cases', cover: 'assets/covers/01_greenventory.jpg',
      title: 'Natura — The Amazon Greenventory',
      kind: 'Case film', role: 'Editor', with: 'Africa Creative (DDB)', year: '2025',
      award: 'Cannes Lions 2025 · Grand Prix, SDG',
      items: [{ type: 'vimeo', id: '1115603278', label: 'Natura — The Amazon Greenventory', dur: '2:15' }],
      desc: [
        'Natura and Africa Creative mapped a stretch of the Amazon with drones and AI to show what the standing forest is worth. I edited the case film that tells the whole project in 2 minutes 15 seconds: the problem, the method and the result, clear on first viewing.',
        'The project won the Sustainable Development Goals Grand Prix at Cannes Lions 2025.'
      ],
      credits: 'Client: Natura · Agency: Africa Creative (DDB) · Editor: Fernando Faria Freitas',
      links: [{ label: 'Vimeo', href: 'https://vimeo.com/1115603278' }]
    },
    {
      n: 2, cat: 'documentaries', cover: 'assets/covers/02_amarelo_netflix.jpg',
      title: 'Netflix — AmarElo: É Tudo Pra Ontem',
      kind: 'Documentary', role: 'Editor · structure, archive & finishing', with: 'LabFantasma · dir. Fred Ouro Preto', year: '2020',
      award: 'International Emmy 2021 · Nominee',
      items: [
        { type: 'vimeo', id: '503183790', label: 'Netflix — AmarElo: É Tudo Pra Ontem', sub: 'Trailer', dur: '1:50' },
        { type: 'youtube', id: 'FQ9hCN0ZYSg', label: 'Official trailer', sub: 'Netflix Brasil · YouTube' }
      ],
      desc: [
        'Emicida’s documentary about the making of the AmarElo album and his concert at São Paulo’s Theatro Municipal, told against a hundred years of Black Brazilian culture.',
        'I was brought in for the final month, after four months of editing, to find the film’s shape. I connected the blocks into a single through-line, dug up rare archive of early samba and other key historical images, animated the stills, polished the sound and also cut the concert film, AmarElo – Ao Vivo.',
        'The documentary was nominated for the International Emmy Award in Arts Programming in 2021.'
      ],
      credits: 'Netflix · A LabFantasma film · Director: Fred Ouro Preto · Producer: Evandro Fióti · Research: Felipe Choco · Editor: Fernando Freitas',
      links: [
        { label: 'Netflix', href: 'https://www.netflix.com/title/81306298' },
        { label: 'Vimeo', href: 'https://vimeo.com/503183790' }
      ]
    },
    {
      n: 3, cat: 'cases', cover: 'assets/covers/03_case_films_africa.jpg',
      title: 'Africa Creative — Case Films (Air_Silva · Greenventory)',
      kind: 'Case films', role: 'Edit, motion, sound, color & AI', with: 'Volt · Natura', year: '2025–2026',
      award: 'Cannes Lions 2025 & 2026',
      items: [
        { type: 'file', src: 'assets/local-only/airsilva_case_720.mp4', poster: 'assets/ailab/airsilva_2.jpg', label: 'Volt — Air_Silva', sub: 'Case film', dur: '2:13' },
        { type: 'vimeo', id: '1115603278', label: 'Natura — The Amazon Greenventory', sub: 'Case film · Grand Prix SDG', dur: '2:15' },
        { type: 'file', src: 'assets/local-only/motion_silva_ai.mp4', poster: 'assets/ailab/motion_silva_ai_poster.jpg', label: 'Leônidas — motion & AI', sub: 'Motion · AI · silent', dur: '0:12' }   // item 0 tem de ser o case film: o "Watch the case film" do hero abre o item 0
      ],
      desc: [
        'Two case films for Cannes Lions, made with Africa Creative.',
        'Air_Silva · Volt (Cannes Lions 2026). When Nike launched Brazil’s kit with a basketball star, Volt answered with another flying icon: Leônidas da Silva, the forgotten legend of the bicycle kick. A jersey line, a documentary and a travelling exhibition. Here my part went well beyond the edit: I contributed to the creative and the research, used AI throughout, and did all the motion, sound and color on both the case film and the documentary.',
        'The Amazon Greenventory · Natura (Cannes Lions 2025, Grand Prix SDG). Editor of the case film.'
      ],
      credits: 'Agency: Africa Creative · Air_Silva creatives: Thiago Monteiro and team · Air_Silva case film & documentary: edit, motion, sound & color by Fernando Freitas · Greenventory case film: editor Fernando Freitas',
      links: [{ label: 'Greenventory on Vimeo', href: 'https://vimeo.com/1115603278' }]
    },
    {
      n: 4, cat: 'cases', cover: 'assets/covers/04_um_take_novos_planos_ia.jpg',
      title: 'One Take, New Cameras — AI on Real Footage',
      kind: 'AI on real footage', role: 'Editor & AI director', with: 'Unreleased music video', year: '2026',
      award: '',
      items: [
        { type: 'file', src: 'assets/ailab/vitoria_relight.mp4', poster: 'assets/ailab/vitoria_relight.jpg', loop: true, label: 'Relight · midday to golden hour', sub: 'Left: phone take · right: relit with AI · silent demo', dur: '0:05' },
        { type: 'file', src: 'assets/ailab/vitoria_roses.mp4', poster: 'assets/ailab/vitoria_roses.jpg', loop: true, label: 'A column that blooms', sub: 'Left: phone take · right: roses added with AI · silent demo', dur: '0:04' },
        { type: 'file', src: 'assets/ailab/onetake_original_x_ai.mp4', poster: 'assets/ailab/onetake_original_x_ai_poster.jpg', loop: true, label: 'Original × new cameras', sub: 'Left: phone take · right: AI camera · silent demo', dur: '0:22' },
        { type: 'image', src: 'assets/ailab/onetake_take_1.jpg', label: 'Take 1 · Garden walk', sub: 'Original, then 3 new angles' },
        { type: 'image', src: 'assets/ailab/onetake_take_2.jpg', label: 'Take 2 · Running', sub: 'Original, then 2 new angles' },
        { type: 'image', src: 'assets/ailab/onetake_take_3.jpg', label: 'Take 3 · Crosswalk', sub: 'Original, then 2 new angles' },
        { type: 'image', src: 'assets/ailab/onetake_take_4.jpg', label: 'Take 4 · Garden chair', sub: 'Original, then 2 new angles' }
      ],
      desc: [
        'A music video shot on a phone in Paris, one take per moment. No crane, no drone, no second camera.',
        'From each take I generated new camera angles: aerial, from behind, ground level, macro. The performance, the face and the timing stay the ones that were actually filmed; only the camera moves. 4 phone takes became 9 new shots, and then the edit chose, timed and graded them into the cut.',
        'Every shot started as a free test frame, went to the director for approval and was tested at 480p. Only approved shots went up in resolution.',
        'The video is still unreleased, so this page shows demos only. The full cut comes after the release.'
      ],
      credits: 'Edit & AI direction: Fernando Freitas · Artist and director credited after the release · Adobe Premiere Pro, DaVinci Resolve, Seedance 2.5',
      links: []
    },
    {
      n: 5, cat: 'music-videos', cover: 'assets/covers/05_emicida_entao_toma.jpg',
      title: 'Emicida — Então Toma',
      kind: 'Music video', role: 'Sound design & additional editing', with: 'dir. Fred Ouro Preto', year: '2011',
      award: 'MTV VMB 2011 · Video of the Year',
      /* O dono do vídeo não permite embed fora do YouTube (testado em 13/nov): abre em outra aba. */
      items: [{ type: 'link', href: 'https://www.youtube.com/watch?v=7QnXzVjck6M', cta: '▶ Watch on YouTube', label: 'Emicida — Então Toma', sub: 'Official video · YouTube' }],
      desc: [
        'Official music video for Emicida’s “Então Toma”. I created the sound design and helped cut it.',
        'It won Video of the Year at MTV’s Video Music Brasil 2011, the night Emicida was also named Artist of the Year.'
      ],
      credits: 'Artist: Emicida · Director: Fred Ouro Preto · Sound design & additional editing: Fernando Freitas',
      links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=7QnXzVjck6M' }]
    },
    {
      n: 6, cat: 'direction', cover: 'assets/covers/06_negredo_linha_do_tiro.jpg',
      title: 'Negredo feat. Mano Brown — Linha do Tiro',
      kind: 'Music video', role: 'Director, editor & post-production', with: '', year: '2017',
      award: '',
      items: [{ type: 'youtube', id: '7Dc5cKI9Sqo', label: 'Negredo feat. Mano Brown — Linha do Tiro', sub: 'Official video · YouTube', dur: '4:15' }],
      desc: [
        'Official music video for Negredo’s “Linha do Tiro”, featuring Mano Brown (2017).',
        'I directed it, edited it and did all the post-production.'
      ],
      credits: 'Artist: Negredo feat. Mano Brown · Direction, edit & post-production: Fernando Freitas · Screenplay: Renata Rodrigues · Production: Diolanda Lopes · Cinematography: Fernando Lima, Lúcio Almeida, Juliano Chiqueto · Audio: Fernando Lauletta · Colorist: Ricardo Herling',
      links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=7Dc5cKI9Sqo' }]
    },
    {
      n: 7, cat: 'music-videos', cover: 'assets/covers/07_menino_e_o_mundo.jpg',
      title: 'Emicida — Aos Olhos de uma Criança (O Menino e o Mundo)',
      kind: 'Soundtrack video', role: 'Editor', with: 'Film by Alê Abreu', year: '2014',
      award: 'Film nominated · Academy Awards 2016',
      items: [{ type: 'vimeo', id: '230524152', label: 'Emicida — Aos Olhos de uma Criança', dur: '3:39' }],
      desc: [
        'Official music video for “Aos Olhos de uma Criança”, Emicida’s song for the soundtrack of Alê Abreu’s animated feature Boy and the World (O Menino e o Mundo).',
        'I edited the video from the film’s own animation, building a new rhythmic piece around the song.',
        'The film was nominated for Best Animated Feature at the 88th Academy Awards.'
      ],
      credits: 'Song: Emicida · Animation: from the film by Alê Abreu · Music-video editor: Fernando Freitas',
      links: [{ label: 'Vimeo', href: 'https://vimeo.com/230524152' }]
    },
    {
      n: 8, cat: 'documentaries', cover: 'assets/covers/08_seu_estilo_seu_impacto.jpg',
      title: 'Seu Estilo, Seu Impacto — Documentary & Trailer',
      kind: 'Fashion documentary', role: 'Documentary & trailer editor', with: '', year: '2024',
      award: 'KAIA IFF Türkiye 2025 · Best Documentary Direction',
      items: [{ type: 'vimeo', id: '1121859316', label: 'Seu Estilo, Seu Impacto', sub: 'Trailer', dur: '1:00' }],
      desc: [
        'A documentary about fashion as both art and industry, and about its environmental cost: the sector is responsible for up to 8% of global pollution.',
        'I edited the film and its trailer in a single week, in close partnership with the director, structuring the story around its characters and the “small big gestures” they set against fast fashion.',
        'The film won Best Documentary Direction at the KAIA International Film Festival (Türkiye) in 2025.'
      ],
      credits: 'Documentary & trailer editor: Fernando Freitas',
      links: [{ label: 'Vimeo', href: 'https://vimeo.com/1121859316' }]
    },
    {
      n: 9, cat: 'documentaries', cover: 'assets/covers/09_vivo_game_changers.jpg',
      title: 'Vivo — Game Changers',
      kind: 'Branded documentary', role: 'Editor', with: 'Ginga · VICE', year: '2017',
      award: 'Wave Festival · Bronze, Branded Content',
      items: [{ type: 'vimeo', id: '228494574', label: 'Vivo — Game Changers', sub: 'Documentary cut', dur: '26:07' }],
      desc: [
        'A branded documentary series for Vivo about the people building Brazil’s games industry: pro players, YouTubers, developers and students.',
        'I edited the 26-minute documentary cut.',
        'The series won Bronze in Branded Content at Wave Festival.'
      ],
      credits: 'Client: Vivo · Agency: Ginga · Production: VICE · Editor: Fernando Freitas',
      links: [{ label: 'Vimeo', href: 'https://vimeo.com/228494574' }]
    },
    {
      n: 10, cat: 'advertising', cover: 'assets/covers/10_commercial_selects.jpg',
      title: 'Commercials — Selected Spots',
      kind: 'Advertising', role: 'Editor', with: 'Honda · Kia · Avon · Brastemp · Olympikus +', year: '2018–2023',
      award: '',
      items: [
        { type: 'vimeo', id: '340554982', label: 'Honda — PCX: Você no Ritmo da Cidade', sub: 'F.biz · Paranoid · dir. Gotacx', dur: '0:30' },
        { type: 'vimeo', id: '366602926', label: 'Kia — Cerato', sub: 'Mixer', dur: '1:00' },
        { type: 'vimeo', id: '349801727', label: 'Brastemp — Certezas', sub: 'FCB Brasil', dur: '0:30' },
        { type: 'vimeo', id: '302102330', label: 'Avon — Afrofuturo', sub: 'J. Walter Thompson Brasil, Mutato & Icherry · Conspiração Filmes · creative direction: MOOC', dur: '1:01' },
        { type: 'vimeo', id: '278561998', label: 'Avon — Color Trend', sub: 'J. Walter Thompson Brasil', dur: '0:56' },
        { type: 'vimeo', id: '826732930', label: 'Lux', sub: 'Gripe · Santa Transmedia', dur: '0:30' },
        { type: 'vimeo', id: '826733811', label: 'Riachuelo', sub: 'Gripe · Santa Transmedia', dur: '0:30' },
        { type: 'vimeo', id: '299111488', label: 'Leite Moça — Lei de Moça', sub: 'FCB Brasil · dir. Rodrigo Resende', dur: '1:00' },
        { type: 'vimeo', id: '296058639', label: 'Olympikus — Libere a Brincadeira', sub: 'J. Walter Thompson Brasil · Delicatessen Filmes · dir. Nixon Freire', dur: '3:34' },
        { type: 'vimeo', id: '826281229', label: 'Facebook — More Together', sub: 'dir. Thati Almeida', dur: '0:53' },
        { type: 'vimeo', id: '826282530', label: 'YouTube Shorts — #DaUmGame', sub: 'dir. Thati Almeida', dur: '0:59' }
      ],
      desc: ['Spots I edited for brands in Brazil. Agency, production company and director are listed per spot.'],
      credits: 'Editor: Fernando Freitas',
      links: [{ label: 'All on Vimeo', href: 'https://vimeo.com/fernstorm' }]
    },
    {
      n: 11, cat: 'music-videos', cover: 'assets/covers/11_music_video_selects.jpg',
      title: 'Music Videos — Selected Work',
      kind: 'Music videos', role: 'Editor', with: 'MC Guimê & Emicida · Don L · Xenia França · T.R.A.P.', year: '2013–2026',
      award: '',
      items: [
        { type: 'vimeo', id: '89919818', label: 'MC Guimê & Emicida — País do Futebol', sub: '2013', dur: '4:26' },
        { type: 'vimeo', id: '826274696', label: 'Don L — Na Batida da Procura Perfeita', sub: 'dir. Aisha Mbikila', dur: '4:27' },
        { type: 'vimeo', id: '296058871', label: 'Xenia França — Pra Que Me Chamas?', sub: '', dur: '6:14' },
        { type: 'vimeo', id: '1152083262', label: 'Garena Free Fire — T.R.A.P.: I’m on Fire', sub: 'feat. BJRNCK, Awich, Krawk, Faruz Feet · Vetor Zero · 2026', dur: '2:48' },
        { type: 'file', src: 'assets/local-only/familia_7_velas_clack_bum.mp4', poster: 'assets/covers/13_familia_7_velas.jpg', label: 'Família 7 Velas — Clack Bum!', sub: 'Music video (official)', dur: '3:45' },
        { type: 'file', src: 'assets/local-only/malokero_sin_city.mp4', poster: 'assets/covers/14_malokero_sin_city.jpg', label: 'Malokero Anônimo — Sin City', sub: 'Music video (official)', dur: '2:42' }
      ],
      desc: [
        'Music videos that helped shape Brazilian pop culture.',
        'MC Guimê & Emicida, “País do Futebol” (2013): released ahead of the 2014 World Cup, with Neymar in the cast, it became the tournament’s unofficial anthem in Brazil. It was one of the first Brazilian music videos to pass a million views in a single day, and is now well past 100 million.'
      ],
      credits: 'T.R.A.P. “I’m on Fire”: produced at Vetor Zero, editor Fernando Freitas · Other videos: editor Fernando Freitas',
      links: [{ label: 'All on Vimeo', href: 'https://vimeo.com/fernstorm' }]
    },
    {
      n: 12, cat: 'other', cover: 'assets/covers/12_assombramento_hq.jpg',
      title: 'ASSOMBRAMENTO — Graphic Novel',
      kind: 'Comics', role: 'Script & art', with: 'After Afonso Arinos · adapted by Daniela Prado', year: '2026',
      award: '',
      items: [{ type: 'pages', dir: 'assets/hq/', langs: { en: 'assets/hq/en/', es: 'assets/hq/es/', fr: 'assets/hq/fr/' }, count: 14, label: 'ASSOMBRAMENTO', sub: 'Preview · first 14 of 67 pages · in English, Spanish or French' }],
      buy: 'https://www.amazon.com.br/dp/B0HS2WDVT1',   // Kindle (PT), na Amazon desde 17/11/2026 (ASIN B0HS2WDVT1)
      desc: [
        'A 67-page black-and-white graphic novel adapting “Assombramento”, a short story by Afonso Arinos (1868–1916). Born in Paracatu, Minas Gerais, Arinos was a precursor of Guimarães Rosa and a pioneer of sertanejo writing in Brazil. The story is set among cattle drovers in the sertão, the Brazilian backcountry.',
        'The book was launched in February 2026 in Paracatu, Arinos’s hometown, funded by the city and distributed in its schools.',
        'I wrote the comic script and drew every page in Photoshop, first on a Huion H320M tablet and, from the middle of the book on, on an iPad Pro 2026. The text adaptation is by Daniela Prado, president of the Academia de Letras do Noroeste de Minas, who conceived and directed the project.',
        'Since November 2026 the book is also out as a Kindle ebook, in Portuguese, on Amazon.'
      ],
      credits: 'Concept, direction & text adaptation: Daniela Prado, President of the Academia de Letras do Noroeste de Minas · Script & art: Fernando Freitas · Cover design & graphic project: Samuel Sousa Lopes · Proofreading: Ana Carolina Campos de Carvalho · Launched in Paracatu (MG), February 2026, with support from the City of Paracatu',
      links: [{ label: 'See the project on Behance', href: 'https://www.behance.net/gallery/258404677/ASSOMBRAMENTO-Graphic-Novel' }]
    },
    {
      n: 13, cat: 'documentaries', cover: 'assets/ailab/motion_silva_ai_poster.jpg',
      title: 'Leônidas Silva — AI motion (Air_Silva)',
      kind: 'Documentary · motion & AI', role: 'Motion, AI & editing', with: 'Volt · Africa Creative', year: '2026',
      award: '',
      items: [{ type: 'file', src: 'assets/local-only/motion_silva_ai.mp4', poster: 'assets/ailab/motion_silva_ai_poster.jpg', label: 'Leônidas — motion & AI', sub: 'Motion · AI · silent', dur: '0:12' }],
      buy: '',
      desc: ['Motion and AI-generated sequence from the Air_Silva documentary work.'],
      credits: '',
      links: []
    },
    {
      n: 14, cat: 'direction', cover: 'assets/covers/14_shawlin_coracao.jpg',
      title: 'Shawlin — Coração',
      kind: 'Music video', role: 'Director & editor', with: 'Shawlin', year: '2011',
      award: '',
      items: [{ type: 'youtube', id: 'U7MI1iaNMG0', label: 'Shawlin — Coração', sub: 'Official video · YouTube' }],
      buy: '',
      desc: [],
      credits: '',
      links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=U7MI1iaNMG0' }]
    },
    {
      n: 15, cat: 'documentaries', cover: 'assets/covers/15_carlos_motta.jpg',
      title: 'Carlos Motta — Nas Ondas da Vida',
      kind: 'Documentary', role: 'Editor', with: '', year: '',
      award: '',
      items: [{ type: 'file', src: 'assets/docs/carlos_motta_doc.mp4', poster: 'assets/covers/15_carlos_motta.jpg', label: 'Carlos Motta — Nas Ondas da Vida', sub: 'Documentary · full film', dur: '31:15' }],
      buy: '',
      desc: ['A documentary about Carlos Motta, the Brazilian furniture designer, and the two lives that shaped his work: surfing and wood.'],
      credits: 'Editor: Fernando Freitas',
      links: []
    },
    {
      n: 16, cat: 'direction', cover: 'assets/covers/13_familia_7_velas.jpg',
      title: 'Família 7 Velas — Clack Bum!',
      kind: 'Music video', role: 'Director & editor', with: '', year: '',
      award: '',
      items: [{ type: 'file', src: 'assets/local-only/familia_7_velas_clack_bum.mp4', poster: 'assets/covers/13_familia_7_velas.jpg', label: 'Família 7 Velas — Clack Bum!', sub: 'Music video (official)', dur: '3:45' }],
      buy: '',
      desc: ['Official music video for Família 7 Velas, “Clack Bum!”.'],
      credits: 'Direction & edit: Fernando Freitas',
      links: []
    }
  ]
};
