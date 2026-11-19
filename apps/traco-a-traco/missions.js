/* ============================================================
   Traço a Traço — banco de missões (v3: método de construção)

   Cada desenho segue o método clássico de tutorial:
     grande  → formas grandes (esqueleto, traço leve)
     media   → formas médias (membros, volumes)
     pequena → formas pequenas (mãos, pés, acessórios)
     detalhe → contorno firme + rosto + detalhes
     sombra  → hachuras e sombra no chão
     cor     → pintura (vai por baixo das linhas)

   Sistema de coordenadas fixo: 600 x 600.

   Tipos de guia:
     {t:'line',   x1,y1,x2,y2}
     {t:'circle', cx,cy,r}
     {t:'ellipse',cx,cy,rx,ry, rot?}          rot em graus
     {t:'rect',   x,y,w,h}
     {t:'poly',   pts:[[x,y]...], closed?}
     {t:'curve',  x1,y1,cx,cy,x2,y2}          quadrática
     {t:'star',   cx,cy,r, points?, inner?}
     {t:'path',   d:'M.. L.. Q.. C.. Z'}      caminho SVG (absoluto)
   ============================================================ */

const CATEGORIES = [
  { key: 'futebol', label: 'Futebol',         emoji: '⚽' },
  { key: 'times',   label: 'Times e escudos', emoji: '🛡️' },
  { key: 'outros',  label: 'Outros desenhos', emoji: '🎨' },
];

const MISSIONS = [

  /* ============ BOLA DE FUTEBOL ============ */
  {
    id: 'bola', title: 'Bola de futebol', emoji: '⚽', cat: 'futebol', diff: 1, points: 60,
    hint: 'Círculo, gomos, sombra e cor — o método completo.',
    steps: [
      { phase: 'grande', text: 'Traço leve! Um círculo bem grande, girando o braço todo.',
        guides: [{ t: 'circle', cx: 300, cy: 310, r: 170 }] },
      { phase: 'media', text: 'O pentágono do meio — cinco lados, sem pressa.',
        guides: [{ t: 'poly', closed: true, pts: [[300, 248], [359, 291], [336, 360], [264, 360], [241, 291]] }] },
      { phase: 'media', text: 'Do canto do pentágono, uma linha pra borda. São cinco.',
        guides: [
          { t: 'line', x1: 300, y1: 248, x2: 300, y2: 140 },
          { t: 'line', x1: 359, y1: 291, x2: 462, y2: 257 },
          { t: 'line', x1: 336, y1: 360, x2: 400, y2: 450 },
          { t: 'line', x1: 264, y1: 360, x2: 200, y2: 450 },
          { t: 'line', x1: 241, y1: 291, x2: 138, y2: 257 }] },
      { phase: 'pequena', text: 'Na ponta de cada linha, dois tracinhos seguindo a borda.',
        guides: [
          { t: 'line', x1: 300, y1: 140, x2: 252, y2: 150 },
          { t: 'line', x1: 300, y1: 140, x2: 348, y2: 150 },
          { t: 'line', x1: 462, y1: 257, x2: 447, y2: 215 },
          { t: 'line', x1: 462, y1: 257, x2: 468, y2: 300 },
          { t: 'line', x1: 400, y1: 450, x2: 367, y2: 472 },
          { t: 'line', x1: 400, y1: 450, x2: 433, y2: 427 },
          { t: 'line', x1: 200, y1: 450, x2: 233, y2: 472 },
          { t: 'line', x1: 200, y1: 450, x2: 167, y2: 427 },
          { t: 'line', x1: 138, y1: 257, x2: 153, y2: 215 },
          { t: 'line', x1: 138, y1: 257, x2: 132, y2: 295 }] },
      { phase: 'detalhe', text: 'Agora com força: contorne o círculo por cima do traço leve e faça o brilho.',
        guides: [
          { t: 'circle', cx: 300, cy: 310, r: 170 },
          { t: 'curve', x1: 212, y1: 208, cx: 238, cy: 172, x2: 278, y2: 158 }] },
      { phase: 'sombra', text: 'Sombra: hachuras na parte de baixo da bola e no chão.',
        guides: [
          { t: 'line', x1: 388, y1: 430, x2: 362, y2: 452 },
          { t: 'line', x1: 412, y1: 402, x2: 386, y2: 428 },
          { t: 'line', x1: 430, y1: 370, x2: 406, y2: 398 },
          { t: 'ellipse', cx: 300, cy: 516, rx: 140, ry: 16 }] },
      { phase: 'cor', suggest: '#1e1b3a', text: 'Pinte o pentágono do meio e os cantinhos da borda.',
        guides: [] },
    ]
  },

  /* ============ JOGADOR CHUTANDO ============ */
  {
    id: 'jogador', title: 'Jogador chutando', emoji: '🏃', cat: 'futebol', diff: 3, points: 150,
    hint: 'Esqueleto de bolhas → tubos → uniforme → chute!',
    steps: [
      { phase: 'grande', text: 'Traço leve! O esqueleto: bolha da cabeça, do peito e do quadril.',
        guides: [
          { t: 'circle', cx: 310, cy: 150, r: 48 },
          { t: 'ellipse', cx: 285, cy: 258, rx: 58, ry: 66 },
          { t: 'ellipse', cx: 265, cy: 345, rx: 48, ry: 36 }] },
      { phase: 'media', text: 'Linhas de ação: braços abertos, uma perna firme e a outra chutando.',
        guides: [
          { t: 'line', x1: 240, y1: 220, x2: 200, y2: 275 },
          { t: 'line', x1: 200, y1: 275, x2: 185, y2: 330 },
          { t: 'line', x1: 330, y1: 218, x2: 378, y2: 250 },
          { t: 'line', x1: 378, y1: 250, x2: 405, y2: 205 },
          { t: 'line', x1: 245, y1: 355, x2: 230, y2: 430 },
          { t: 'line', x1: 230, y1: 430, x2: 222, y2: 485 },
          { t: 'line', x1: 285, y1: 352, x2: 355, y2: 400 },
          { t: 'line', x1: 355, y1: 400, x2: 432, y2: 428 }] },
      { phase: 'media', text: 'Engorde os braços e pernas com tubos em volta das linhas.',
        guides: [
          { t: 'ellipse', cx: 220, cy: 248, rx: 40, ry: 13, rot: 126 },
          { t: 'ellipse', cx: 193, cy: 303, rx: 34, ry: 13, rot: 105 },
          { t: 'ellipse', cx: 354, cy: 234, rx: 35, ry: 13, rot: 34 },
          { t: 'ellipse', cx: 392, cy: 228, rx: 32, ry: 13, rot: -59 },
          { t: 'ellipse', cx: 238, cy: 393, rx: 45, ry: 16, rot: 101 },
          { t: 'ellipse', cx: 226, cy: 458, rx: 34, ry: 15, rot: 98 },
          { t: 'ellipse', cx: 320, cy: 376, rx: 49, ry: 17, rot: 34 },
          { t: 'ellipse', cx: 394, cy: 414, rx: 47, ry: 15, rot: 20 }] },
      { phase: 'pequena', text: 'A bola na frente do pé, as mãos e as chuteiras.',
        guides: [
          { t: 'circle', cx: 512, cy: 455, r: 40 },
          { t: 'circle', cx: 185, cy: 330, r: 12 },
          { t: 'circle', cx: 405, cy: 205, r: 12 },
          { t: 'path', d: 'M224 482 L196 494 Q188 502 198 508 L232 506 Q238 505 236 494 Z' },
          { t: 'path', d: 'M428 420 L462 432 Q472 440 464 448 L430 447 Q422 445 424 432 Z' }] },
      { phase: 'detalhe', text: 'O rosto olhando pra bola e o cabelo bagunçado do craque.',
        guides: [
          { t: 'circle', cx: 312, cy: 142, r: 4 },
          { t: 'circle', cx: 338, cy: 144, r: 4 },
          { t: 'curve', x1: 318, y1: 166, cx: 330, cy: 174, x2: 342, y2: 162 },
          { t: 'path', d: 'M266 128 Q290 95 330 102 Q352 106 356 126' },
          { t: 'circle', cx: 268, cy: 152, r: 9 }] },
      { phase: 'detalhe', text: 'Contorno firme: camisa, calção e o número 10 no peito.',
        guides: [
          { t: 'path', d: 'M242 212 C230 260 235 295 252 302 L322 304 C342 296 344 250 334 212 C305 198 270 198 242 212 Z' },
          { t: 'path', d: 'M228 318 C222 360 228 372 244 374 L296 376 C310 372 308 345 300 320 Z' },
          { t: 'line', x1: 262, y1: 245, x2: 262, y2: 285 },
          { t: 'line', x1: 252, y1: 254, x2: 262, y2: 245 },
          { t: 'ellipse', cx: 295, cy: 265, rx: 16, ry: 22 }] },
      { phase: 'sombra', text: 'Linhas de movimento atrás do chute e sombra no chão.',
        guides: [
          { t: 'curve', x1: 462, y1: 480, cx: 450, cy: 462, x2: 458, y2: 444 },
          { t: 'curve', x1: 448, y1: 492, cx: 432, cy: 470, x2: 442, y2: 448 },
          { t: 'curve', x1: 470, y1: 404, cx: 482, cy: 396, x2: 492, y2: 400 },
          { t: 'ellipse', cx: 330, cy: 528, rx: 150, ry: 16 },
          { t: 'ellipse', cx: 512, cy: 512, rx: 52, ry: 10 }] },
      { phase: 'cor', suggest: '#3d8bff', text: 'Pinte a camisa e o calção com as cores do seu time!',
        guides: [] },
    ]
  },

  /* ============ GOLEIRO ============ */
  {
    id: 'goleiro', title: 'Goleiro voando', emoji: '🧤', cat: 'futebol', diff: 3, points: 150,
    hint: 'Braços esticados pra defender lá no ângulo.',
    steps: [
      { phase: 'grande', text: 'Traço leve! Esqueleto: bolha da cabeça, do peito e do quadril.',
        guides: [
          { t: 'circle', cx: 300, cy: 190, r: 46 },
          { t: 'ellipse', cx: 300, cy: 295, rx: 60, ry: 68 },
          { t: 'ellipse', cx: 300, cy: 385, rx: 50, ry: 36 }] },
      { phase: 'media', text: 'Linhas de ação: braços lá no alto e pernas abertas.',
        guides: [
          { t: 'line', x1: 260, y1: 248, x2: 232, y2: 180 },
          { t: 'line', x1: 232, y1: 180, x2: 228, y2: 118 },
          { t: 'line', x1: 340, y1: 248, x2: 368, y2: 180 },
          { t: 'line', x1: 368, y1: 180, x2: 372, y2: 118 },
          { t: 'line', x1: 272, y1: 400, x2: 252, y2: 462 },
          { t: 'line', x1: 252, y1: 462, x2: 246, y2: 515 },
          { t: 'line', x1: 328, y1: 400, x2: 348, y2: 462 },
          { t: 'line', x1: 348, y1: 462, x2: 354, y2: 515 }] },
      { phase: 'media', text: 'Tubos nos braços e nas pernas, por cima das linhas.',
        guides: [
          { t: 'ellipse', cx: 246, cy: 214, rx: 43, ry: 13, rot: 68 },
          { t: 'ellipse', cx: 230, cy: 149, rx: 37, ry: 12, rot: 86 },
          { t: 'ellipse', cx: 354, cy: 214, rx: 43, ry: 13, rot: 112 },
          { t: 'ellipse', cx: 370, cy: 149, rx: 37, ry: 12, rot: 94 },
          { t: 'ellipse', cx: 262, cy: 431, rx: 39, ry: 16, rot: 108 },
          { t: 'ellipse', cx: 249, cy: 489, rx: 32, ry: 14, rot: 97 },
          { t: 'ellipse', cx: 338, cy: 431, rx: 39, ry: 16, rot: 72 },
          { t: 'ellipse', cx: 351, cy: 489, rx: 32, ry: 14, rot: 83 }] },
      { phase: 'pequena', text: 'A bola quase escapando lá em cima, as luvas e as chuteiras.',
        guides: [
          { t: 'circle', cx: 300, cy: 78, r: 36 },
          { t: 'circle', cx: 226, cy: 100, r: 18 },
          { t: 'circle', cx: 374, cy: 100, r: 18 },
          { t: 'circle', cx: 212, cy: 112, r: 6 },
          { t: 'circle', cx: 388, cy: 112, r: 6 },
          { t: 'path', d: 'M248 512 L218 524 Q210 532 220 538 L254 536 Q260 534 258 524 Z' },
          { t: 'path', d: 'M352 512 L382 524 Q390 532 380 538 L346 536 Q340 534 342 524 Z' }] },
      { phase: 'detalhe', text: 'O rosto concentrado e o boné de goleiro.',
        guides: [
          { t: 'circle', cx: 288, cy: 182, r: 4 },
          { t: 'circle', cx: 316, cy: 182, r: 4 },
          { t: 'curve', x1: 290, y1: 206, cx: 302, cy: 214, x2: 316, y2: 204 },
          { t: 'curve', x1: 262, y1: 168, cx: 300, cy: 150, x2: 338, y2: 168 },
          { t: 'circle', cx: 300, cy: 142, r: 5 }] },
      { phase: 'detalhe', text: 'Contorno firme: camisa de manga longa, calção e o número 1.',
        guides: [
          { t: 'path', d: 'M245 240 C232 300 238 330 258 338 L342 338 C362 330 368 300 355 240 C320 226 280 226 245 240 Z' },
          { t: 'path', d: 'M255 355 C250 398 256 410 272 412 L328 412 C344 410 350 398 345 355 Z' },
          { t: 'line', x1: 300, y1: 282, x2: 300, y2: 320 },
          { t: 'line', x1: 290, y1: 291, x2: 300, y2: 282 }] },
      { phase: 'sombra', text: 'Tracinhos de impacto na bola e sombra no chão.',
        guides: [
          { t: 'line', x1: 258, y1: 42, x2: 272, y2: 56 },
          { t: 'line', x1: 300, y1: 26, x2: 300, y2: 42 },
          { t: 'line', x1: 342, y1: 42, x2: 328, y2: 56 },
          { t: 'line', x1: 238, y1: 322, x2: 226, y2: 336 },
          { t: 'line', x1: 244, y1: 340, x2: 232, y2: 354 },
          { t: 'ellipse', cx: 300, cy: 552, rx: 160, ry: 14 }] },
      { phase: 'cor', suggest: '#22c1a6', text: 'Goleiro usa cor diferente do time — pinte bem chamativo!',
        guides: [] },
    ]
  },

  /* ============ TROFÉU ============ */
  {
    id: 'trofeu', title: 'Troféu de campeão', emoji: '🏆', cat: 'futebol', diff: 2, points: 90,
    hint: 'A taça que todo time quer levantar.',
    steps: [
      { phase: 'grande', text: 'Traço leve! A boca da taça (oval) e o corpo em U.',
        guides: [
          { t: 'ellipse', cx: 300, cy: 172, rx: 130, ry: 26 },
          { t: 'path', d: 'M170 172 C176 300 235 352 300 352 C365 352 424 300 430 172' }] },
      { phase: 'media', text: 'A haste que desce e a base embaixo.',
        guides: [
          { t: 'line', x1: 286, y1: 352, x2: 280, y2: 415 },
          { t: 'line', x1: 314, y1: 352, x2: 320, y2: 415 },
          { t: 'ellipse', cx: 300, cy: 428, rx: 42, ry: 15 },
          { t: 'rect', x: 206, y: 438, w: 188, h: 12 },
          { t: 'rect', x: 222, y: 450, w: 156, h: 34 }] },
      { phase: 'media', text: 'As duas alças, uma de cada lado, bem curvadas.',
        guides: [
          { t: 'path', d: 'M172 195 C88 208 96 296 188 306' },
          { t: 'path', d: 'M428 195 C512 208 504 296 412 306' }] },
      { phase: 'pequena', text: 'A estrela de campeão na taça e a plaquinha na base.',
        guides: [
          { t: 'star', cx: 300, cy: 252, r: 36 },
          { t: 'rect', x: 244, y: 458, w: 112, h: 20 }] },
      { phase: 'detalhe', text: 'Contorno firme na taça toda e um risco de brilho.',
        guides: [
          { t: 'path', d: 'M170 172 C176 300 235 352 300 352 C365 352 424 300 430 172' },
          { t: 'curve', x1: 228, y1: 215, cx: 222, cy: 270, x2: 244, y2: 315 }] },
      { phase: 'sombra', text: 'Hachuras do lado direito da taça e sombra no chão.',
        guides: [
          { t: 'line', x1: 370, y1: 220, x2: 352, y2: 250 },
          { t: 'line', x1: 382, y1: 245, x2: 362, y2: 277 },
          { t: 'line', x1: 388, y1: 272, x2: 368, y2: 300 },
          { t: 'ellipse', cx: 300, cy: 512, rx: 150, ry: 14 }] },
      { phase: 'cor', suggest: '#ffb800', text: 'Dourado! Pinte a taça inteira de campeão.',
        guides: [] },
    ]
  },

  /* ============ CAMISA 10 ============ */
  {
    id: 'camisa', title: 'Camisa 10', emoji: '👕', cat: 'times', diff: 1, points: 70,
    hint: 'A camisa do craque, com o número 10.',
    steps: [
      { phase: 'grande', text: 'Traço leve! Um retângulo grandão: o corpo da camisa.',
        guides: [{ t: 'rect', x: 190, y: 190, w: 220, h: 270 }] },
      { phase: 'media', text: 'As mangas saindo dos ombros, uma de cada lado.',
        guides: [
          { t: 'poly', closed: true, pts: [[190, 200], [105, 235], [125, 305], [190, 270]] },
          { t: 'poly', closed: true, pts: [[410, 200], [495, 235], [475, 305], [410, 270]] }] },
      { phase: 'media', text: 'A gola em V no meio do colarinho.',
        guides: [
          { t: 'poly', closed: false, pts: [[262, 190], [300, 235], [338, 190]] },
          { t: 'curve', x1: 262, y1: 190, cx: 300, cy: 172, x2: 338, y2: 190 }] },
      { phase: 'pequena', text: 'A barrinha das mangas e a barra de baixo.',
        guides: [
          { t: 'line', x1: 118, y1: 296, x2: 186, y2: 262 },
          { t: 'line', x1: 482, y1: 296, x2: 414, y2: 262 },
          { t: 'line', x1: 196, y1: 430, x2: 404, y2: 430 }] },
      { phase: 'detalhe', text: 'O número 10 gigante, bem no meio.',
        guides: [
          { t: 'line', x1: 262, y1: 300, x2: 262, y2: 380 },
          { t: 'line', x1: 248, y1: 314, x2: 262, y2: 300 },
          { t: 'ellipse', cx: 322, cy: 340, rx: 28, ry: 42 }] },
      { phase: 'sombra', text: 'Hachuras embaixo da manga e as dobrinhas do tecido.',
        guides: [
          { t: 'line', x1: 196, y1: 280, x2: 210, y2: 300 },
          { t: 'line', x1: 194, y1: 302, x2: 208, y2: 322 },
          { t: 'line', x1: 196, y1: 324, x2: 210, y2: 344 },
          { t: 'curve', x1: 210, y1: 430, cx: 220, cy: 418, x2: 232, y2: 430 },
          { t: 'curve', x1: 368, y1: 430, cx: 378, cy: 418, x2: 390, y2: 430 }] },
      { phase: 'cor', suggest: '#ff5ea8', text: 'Pinte com as cores do seu time do coração!',
        guides: [] },
    ]
  },

  /* ============ ESCUDO ============ */
  {
    id: 'escudo', title: 'Escudo do time', emoji: '🛡️', cat: 'times', diff: 2, points: 100,
    hint: 'O brasão completo, com faixa, estrela e bola.',
    steps: [
      { phase: 'grande', text: 'Traço leve! A forma do escudo: curva em cima, ponta embaixo.',
        guides: [{ t: 'path', d: 'M150 150 Q300 110 450 150 L450 300 Q450 420 300 500 Q150 420 150 300 Z' }] },
      { phase: 'media', text: 'A moldura: o mesmo escudo, menorzinho, por dentro.',
        guides: [{ t: 'path', d: 'M175 172 Q300 138 425 172 L425 298 Q425 400 300 470 Q175 400 175 298 Z' }] },
      { phase: 'media', text: 'A faixa atravessando o meio do escudo.',
        guides: [
          { t: 'line', x1: 175, y1: 260, x2: 425, y2: 260 },
          { t: 'line', x1: 175, y1: 318, x2: 425, y2: 318 }] },
      { phase: 'pequena', text: 'A estrela em cima e a bolinha embaixo da faixa.',
        guides: [
          { t: 'star', cx: 300, cy: 205, r: 34 },
          { t: 'circle', cx: 300, cy: 395, r: 30 },
          { t: 'poly', closed: true, pts: [[300, 381], [313, 391], [308, 406], [292, 406], [287, 391]] }] },
      { phase: 'detalhe', text: 'Contorno firme no escudo e escreva a sigla do time na faixa.',
        guides: [
          { t: 'path', d: 'M150 150 Q300 110 450 150 L450 300 Q450 420 300 500 Q150 420 150 300 Z' },
          { t: 'line', x1: 225, y1: 296, x2: 375, y2: 296 }] },
      { phase: 'sombra', text: 'Hachuras no lado esquerdo e sombra embaixo da bolinha.',
        guides: [
          { t: 'line', x1: 192, y1: 260, x2: 206, y2: 282 },
          { t: 'line', x1: 190, y1: 290, x2: 204, y2: 312 },
          { t: 'line', x1: 192, y1: 320, x2: 206, y2: 342 },
          { t: 'line', x1: 196, y1: 350, x2: 210, y2: 372 },
          { t: 'curve', x1: 272, y1: 412, cx: 300, cy: 424, x2: 328, y2: 412 }] },
      { phase: 'cor', suggest: '#ff5ea8', text: 'Pinte cada metade com uma cor do seu time.',
        guides: [] },
    ]
  },

  /* ============ FOGUETE ============ */
  {
    id: 'foguete', title: 'Foguete', emoji: '🚀', cat: 'outros', diff: 2, points: 110,
    hint: 'Corpo oval, aletas curvas e fogo na decolagem.',
    steps: [
      { phase: 'grande', text: 'Traço leve! Um oval bem alto: o corpo do foguete.',
        guides: [{ t: 'ellipse', cx: 300, cy: 290, rx: 78, ry: 150 }] },
      { phase: 'media', text: 'O bico pontudo em cima e as aletas curvadas embaixo.',
        guides: [
          { t: 'path', d: 'M243 180 Q300 84 357 180' },
          { t: 'path', d: 'M232 352 C196 392 190 446 200 468 Q238 442 252 414 Z' },
          { t: 'path', d: 'M368 352 C404 392 410 446 400 468 Q362 442 348 414 Z' }] },
      { phase: 'media', text: 'A janela redonda grande e a base arredondada.',
        guides: [
          { t: 'circle', cx: 300, cy: 240, r: 36 },
          { t: 'circle', cx: 300, cy: 240, r: 24 },
          { t: 'path', d: 'M242 400 Q300 432 358 400' }] },
      { phase: 'pequena', text: 'Janelinha extra, antena no topo e os rebites.',
        guides: [
          { t: 'circle', cx: 300, cy: 330, r: 16 },
          { t: 'line', x1: 300, y1: 116, x2: 300, y2: 82 },
          { t: 'circle', cx: 300, cy: 76, r: 7 },
          { t: 'circle', cx: 262, cy: 296, r: 4 },
          { t: 'circle', cx: 338, cy: 296, r: 4 }] },
      { phase: 'detalhe', text: 'Contorno firme no foguete e a listra do bico.',
        guides: [
          { t: 'ellipse', cx: 300, cy: 290, rx: 78, ry: 150 },
          { t: 'curve', x1: 252, y1: 186, cx: 300, cy: 152, x2: 348, y2: 186 }] },
      { phase: 'sombra', text: 'O fogo saindo, a fumaça e hachuras no lado direito.',
        guides: [
          { t: 'path', d: 'M272 432 Q284 482 300 514 Q316 482 328 432' },
          { t: 'path', d: 'M286 432 Q300 462 314 432' },
          { t: 'circle', cx: 262, cy: 470, r: 12 },
          { t: 'circle', cx: 340, cy: 478, r: 10 },
          { t: 'circle', cx: 300, cy: 532, r: 14 },
          { t: 'line', x1: 354, y1: 300, x2: 344, y2: 330 },
          { t: 'line', x1: 360, y1: 332, x2: 350, y2: 362 }] },
      { phase: 'cor', suggest: '#ff6b3d', text: 'Pinte o bico, as aletas e o fogo bem quente!',
        guides: [] },
    ]
  },
];

if (typeof module !== 'undefined') module.exports = { MISSIONS, CATEGORIES };
