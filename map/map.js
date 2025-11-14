document.addEventListener('DOMContentLoaded', () => {
  const el = {
    mapSelect: document.getElementById('mapSelect'),
    mapCanvas: document.getElementById('mapCanvas'),
    mapFrame: document.getElementById('mapFrame'),
    mapImage: document.getElementById('mapImage'),
    markersLayer: document.getElementById('markersLayer'),
    zoomInBtn: document.getElementById('zoomInBtn'),
    zoomOutBtn: document.getElementById('zoomOutBtn'),
    zoomResetBtn: document.getElementById('zoomResetBtn'),
    zoomValue: document.getElementById('zoomValue'),
    toast: document.getElementById('toast')
  };
  el.tilesLayer = null;

  const DEFAULT_ZOOM = 1.48;
  const LIMITS = { maxZoom: 3.5, minZoom: 0.68 };
  const PIN_SCALE = 0.68;
  const TILE_SEAM = 0.5;

  const MARKER_ICONS = {
    bandit:  { src: 'images/icons/marker-bandit.webp',  w: 41, h: 44, alt: 'Бандиты' },
    stalker: { src: 'images/icons/marker-stalker.webp', w: 43, h: 41, alt: 'Сталкеры' },
    any:     { src: 'images/icons/marker-any.webp',     w: 44, h: 42, alt: 'Все' }
  };

  const MAPS = [
  {
    id: 'south',
    name: 'Южная часть зоны',
    src: 'images/maps/map-south-2x.png',
    width: 2742,
    height: 3999,
    tiles: {
      tileSize: 192,
      levels: [
        {
          z: 2,
          cols: 15,
          rows: 21,
          url: (x, y) => `images/maps/South/2x/2-${x}-${y}.jpg`
        }
      ]
    }
  },
  { id: 'north',   name: 'Северная часть зоны', src: 'images/maps/map-north.png',   width: 1372, height: 2000 },
  { id: 'lyubech', name: 'Любеч-3',             src: 'images/maps/map-lyubech.png', width: 1372, height: 2000 }
];

  const IMG_PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="80">
      <rect width="100%" height="100%" rx="8" ry="8" fill="#1b1d21"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            font-family="Montserrat, Arial" font-size="11" fill="#b8bdc9">Нет изображения</text>
    </svg>
  `);

  const MARKERS = [
    // Эхо прошлого — Сталкеры
    {
      id: 'q-echo-past-stalker',
      title: 'Эхо прошлого',
      loc: 'south',
      faction: 'stalker',
      x: 1295, y: 3372,
      preview: 'images/quests/echo-past/echo-past.jpg',
      desc: 'На Болотах я нашёл очень старый ПДА, на котором имя владельца — Борода.',
      rewards: [{ img: 'images/items/pp2000-yakor-blue.webp', label: 'ПП‑2000 «Якорь»', rarity: 'rare' },
      { img: 'images/items/ammo-545-sbp.webp', label: 'Ящик 5.45 СБП' },
      { img: 'images/items/ammo-556-sbp.webp', label: 'Ящик 5.56 СБП' },
      { img: 'images/items/ammo-762-sbp.webp', label: 'Ящик 7.62 СБП' },
      { img: 'images/items/pouch-medic.webp', label: 'Подсумок с военными аптечками' },
      { img: 'images/items/tonic-arni.webp', label: 'Тоник Арни' }
      ],
      money: 1500,
      reputation: 30,
      guideUrl: '../guides/echo-past.html'
    },
    // Эхо прошлого — Бандиты
    {
      id: 'q-echo-past-bandit',
      title: 'Эхо прошлого',
      loc: 'south',
      faction: 'bandit',
      x: 888, y: 3145,
      preview: 'images/quests/echo-past/echo-past.jpg',
      desc: 'На Болотах я нашёл очень старый ПДА, на котором имя владельца — Борода.',
      rewards: [{ img: 'images/items/pp2000-yakor-blue.webp', label: 'ПП‑2000 «Якорь»', rarity: 'rare' },
      { img: 'images/items/ammo-545-sbp.webp', label: 'Ящик 5.45 СБП' },
      { img: 'images/items/ammo-556-sbp.webp', label: 'Ящик 5.56 СБП' },
      { img: 'images/items/ammo-762-sbp.webp', label: 'Ящик 7.62 СБП' },
      { img: 'images/items/pouch-medic.webp', label: 'Подсумок с военными аптечками' },
      { img: 'images/items/tonic-arni.webp', label: 'Тоник Арни' }
    ],
      money: 1500,
      reputation: 30,
      guideUrl: '../guides/echo-past.html'
    },
    // Упырь — Сталкеры
    {
      id: 'q-upyr-stalker',
      title: 'Упырь',
      loc: 'south',
      faction: 'stalker',
      x: 1298, y: 3583,
      preview: 'images/quests/upyr/upyr.jpg',
      desc: 'В лагерь принесли труп сталкера с множеством ран.',
      rewards: [
        { img: 'images/items/domestic-mre.webp', label: 'Отечественный ИРП ×4' },
        { img: 'images/items/clarinol.webp',     label: 'Кларинол ×2' },
        { img: 'images/items/ammo-545-sbp.webp', label: 'Ящик 5.45 СБП' },
        { img: 'images/items/ammo-556-sbp.webp', label: 'Ящик 5.56 СБП' },
        { img: 'images/items/ammo-762-sbp.webp', label: 'Ящик 7.62 СБП' }
      ],
      money: 6000,
      reputation: 140,
      guideUrl: '../guides/upyr.html'
    },
    // Упырь — Бандиты
    {
      id: 'q-upyr-bandit',
      title: 'Упырь',
      loc: 'south',
      faction: 'bandit',
      x: 627, y: 3136,
      preview: 'images/quests/upyr/upyr.jpg',
      desc: 'В лагерь принесли труп бандита с множеством ран.',
      rewards: [
        { img: 'images/items/domestic-mre.webp', label: 'Отечественный ИРП ×4' },
        { img: 'images/items/clarinol.webp',     label: 'Кларинол ×2' },
        { img: 'images/items/ammo-545-sbp.webp', label: 'Ящик 5.45 СБП' },
        { img: 'images/items/ammo-556-sbp.webp', label: 'Ящик 5.56 СБП' },
        { img: 'images/items/ammo-762-sbp.webp', label: 'Ящик 7.62 СБП' }
      ],
      money: 6000,
      reputation: 140,
      guideUrl: '../guides/upyr.html'
    },
    // Покойся с миром — Сталкеры
    {
      id: 'q-rest-in-peace-stalker',
      title: 'Покойся с миром',
      loc: 'south',
      faction: 'stalker',
      x: 1305, y: 3596,
      preview: 'images/quests/pokoysya-s-mirom/pokoysya-s-mirom.jpg',
      desc: 'Заядлые картежники Шулер и Грэм попросили найти их товарища по кличке Чип.',
      rewards: [
        { img: 'images/items/old-shovel.png',         label: 'Старая лопата', rarity: 'rare' },
        { img: 'images/items/energy-zhiden-extra.webp', label: 'Энергетик "Жидень EXTRA" ×2' },
        { img: 'images/items/tonic-arni.webp',          label: 'Тоник "Арни" ×2' },
        { img: 'images/items/desperol.webp',            label: 'Десперол ×3' }
      ],
      money: 10000,
      reputation: 200,
      guideUrl: '../guides/pokoysya-s-mirom.html'
    },
    // Естественный отбор — Сталкеры
    {
      id: 'q-natural-selection-stalker',
      title: 'Естественный отбор',
      loc: 'south',
      faction: 'stalker',
      x: 1316, y: 3587,
      preview: 'images/quests/estestvennyj-otbor/cover.jpg',
      desc: 'Я купил у Синяка координаты места с залежами артефактов.',
      rewards: [
        { img: 'images/items/desperol.webp',          label: 'Десперол', qty: 2 },
        { img: 'images/items/boevoi-goroh.webp',      label: 'Боевой горох' },
        { img: 'images/items/pouch-medic.webp',       label: 'Подсумок с военными аптечками' },
        { img: 'images/items/ammo-545-sbp.webp',      label: 'Ящик 5.45 СБП' },
        { img: 'images/items/ammo-556-sbp.webp',      label: 'Ящик 5.56 СБП' },
        { img: 'images/items/ammo-762-sbp.webp',      label: 'Ящик 7.62 СБП' }
      ],
      money: 5000,
      reputation: 120,
      guideUrl: '../guides/estestvennyj-otbor.html'
    },
    // Травник — Бандиты
    {
      id: 'q-travnik-bandit',
      title: 'Травник',
      loc: 'south',
      faction: 'bandit',
      x: 609, y: 3149,
      preview: 'images/quests/travnik/travnik.jpg',
      desc: 'Я познакомился с бандитом по кличке Клифа. Он предложил мне поучаствовать в обносе одной обжитой хижины на севере Болот.',
      rewards: [
        { img: 'images/items/trinket-particle.png', label: 'Брелок «Частица»' },
        { img: 'images/items/pouch-medic-guide.webp', label: 'Подсумок с аптечками проводника' },
        { img: 'images/items/boevoi-goroh.webp', label: 'Боевой горох', qty: 2 }
      ],
      money: 5300,
      reputation: 115,
      guideUrl: '../guides/travnik.html'
    },
    // Комар — Бандиты
    {
      id: 'q-komar-bandit',
      title: 'Комар',
      loc: 'south',
      faction: 'bandit',
      x: 607, y: 3138,
      preview: 'images/quests/komar/komar.jpg',
      desc: 'Бандит по кличке Комар попросил меня отомстить за своего приятеля Ваньку Жёлудя, которого задрали кабаны.',
      rewards: [
        { img: 'images/items/ammo-545-sbp.webp', label: 'Ящик 5.45 СБП' },
        { img: 'images/items/ammo-556-sbp.webp', label: 'Ящик 5.56 СБП' },
        { img: 'images/items/ammo-762-sbp.webp', label: 'Ящик 7.62 СБП' },
        { img: 'images/items/pouch-medic.webp', label: 'Подсумок с военными аптечками', qty: 2 },
        { img: 'images/items/domestic-mre.webp', label: 'Отечественный ИРП', qty: 2 },
        { img: 'images/items/neyrotonic.webp', label: 'Нейротоник', qty: 2 }
      ],
      money: 10000,
      reputation: 220,
      guideUrl: '../guides/komar.html'
    },
    // Посылка Фримена - Бандиты
    {
      id: 'q-freeman-parcel-bandit',
      title: 'Посылка Фримена',
      loc: 'south',
      faction: 'bandit',
      x: 617, y: 3144,
      preview: 'images/quests/posylka-freemena/posylka-freemena.jpg',
      desc: 'Бандит по кличке Варг задумал подмять под себя сталкерского торговца Фримена.',
      rewards: [
        { img: 'images/items/aks-74u.webp', label: 'АКС-74У Варга' },
        { img: 'images/items/neyrotonic.webp', label: 'Нейротоник' },
        { img: 'images/items/clarinol.webp', label: 'Кларинол', qty: 2 },
        { img: 'images/items/tonic-arni.webp', label: 'Тоник Арни', qty: 3 }
      ],
      money: 6000,
      reputation: 140,
      guideUrl: '../guides/posylka-freemena.html'
    },
    // Судьба - Бандиты
    {
      id: 'q-sudba-bandit',
      title: 'Судьба',
      loc: 'south',
      faction: 'bandit',
      x: 947, y: 3332,
      preview: 'images/quests/sudba/sudba.jpg',
      desc: 'Я спас новичка от стаи гончих. Стоит с ним поговорить на базе.',
      rewards: [
        { img: 'images/items/sig-shepota.webp',        label: 'Сиг «Шепота»', rarity: 'veteran' },
        { img: 'images/items/token-ice.png',          label: 'Жетон Льда' },
        { img: 'images/items/art-batareika.webp',      label: 'Артефакт «Батарейка»' },
        { img: 'images/items/art-ulitka.webp',         label: 'Артефакт «Улитка»' },
        { img: 'images/items/pouch-medic-science.webp',label: 'Подсумок с аптечками ученых', qty: 3 },
        { img: 'images/items/bag-ap-556.webp',         label: 'Сумка бронебойных 5.56 мм',   qty: 2 }
      ],
      money: 55000,
      guideUrl: '../guides/sudba.html'
    },
    // Документация — Бандиты
    {
      id: 'q-dokumentaciya-bandit',
      title: 'Документация',
      loc: 'south',
      faction: 'bandit',
      x: 1310, y: 2748,
      preview: 'images/quests/dokumentaciya/cover.jpg',
      desc: 'Познакомился в лагере с бандитом по кличке Гном.',
      rewards: [
        { img: 'images/items/energy-zhiden-extra.webp', label: 'Энергетик "Жидень EXTRA"' },
        { img: 'images/items/tonic-arni.webp',    label: 'Тоник Арни', qty: 2 },
        { img: 'images/items/ammo-545-sbp.webp',  label: 'Ящик 5.45 СБП' },
        { img: 'images/items/ammo-556-sbp.webp',  label: 'Ящик 5.56 СБП' },
        { img: 'images/items/ammo-762-sbp.webp',  label: 'Ящик 7.62 СБП' }
      ],
      money: 1000,
      reputation: 25,
      guideUrl: '../guides/dokumentaciya.html'
    },
    // Безопасность превыше всего (Моряк) — Бандиты
    {
      id: 'q-bezopasnost-moryak-bandit',
      title: 'Безопасность превыше всего',
      loc: 'south',
      faction: 'bandit',
      x: 1328, y: 2744,
      preview: 'images/quests/bezopasnost/cover.jpg',
      desc: 'Бандит с Обочины по кличке Моряк хочет устроить гоп-стоп одному из блаженных.',
      rewards: [
        { img: 'images/items/pouch-medic.webp',         label: 'Подсумок с военными аптечками', qty: 2 },
        { img: 'images/items/american-mre.webp',        label: 'Американский ИРП', qty: 10 },
        { img: 'images/items/clarinol.webp',            label: 'Кларинол', qty: 2 },
        { img: 'images/items/boevoi-goroh.webp',        label: 'Боевой горох', qty: 2 }
      ],
      money: 6500,
      reputation: 130,
      guideUrl: '../guides/bezopasnost.html'
    },
    // Мертвецы не рассказывают сказки — Бандиты
    {
      id: 'q-mertvetsy-skazki-bandit',
      title: 'Мертвецы не рассказывают сказки',
      loc: 'south',
      faction: 'bandit',
      x: 1313, y: 2735,
      preview: 'images/quests/mertvetsy/cover.jpg',
      desc: 'Некий Решала попросил меня помочь с устранением группы "неправильных" бандитов, что грабят и убивают еще зеленых братков.',
      rewards: [
        { img: 'images/items/walther.webp',        label: 'Walther «Иудей»', rarity: 'stalker' }
      ],
      money: 10000,
      reputation: 75,
      guideUrl: '../guides/mertvetsy.html'
    },
    // Почтальон — Бандиты
    {
      id: 'q-pochtalyon-bandit',
      title: 'Почтальон',
      loc: 'south',
      faction: 'bandit',
      x: 1301, y: 2744,
      preview: 'images/quests/pochtalyon/cover.jpg',
      desc: 'Ровный поручил мне доставить два конверта, красный для Мишки и синий для Форекса.',
      rewards: [
        { img: 'images/items/desperol.webp',               label: 'Десперол' },
        { img: 'images/items/energy-zhiden-extra.webp',    label: 'Энергетик "Жидень EXTRA"', qty: 2 },
        { img: 'images/items/tonic-arni.webp',             label: 'Тоник "Арни"',             qty: 2 }
      ],
      money: 2000,
      reputation: 45,
      guideUrl: '../guides/pochtalyon.html'
    },
    // Торговые дела — Бандиты
    {
      id: 'q-torgovye-dela-bandit',
      title: 'Торговые дела',
      loc: 'south',
      faction: 'bandit',
      x: 1323, y: 2742,
      preview: 'images/quests/torgovye-dela/cover.jpg',
      desc: 'Зубастый не хочет со мной разговаривать, пока Мент не замолвит за меня слово.',
      rewards: [
        { img: 'images/items/pouch-medic.webp',   label: 'Подсумок с военными аптечками', qty: 2 },
        { img: 'images/items/ammo-545-sbp.webp',  label: 'Ящик 5.45 СБП' },
        { img: 'images/items/ammo-556-sbp.webp',  label: 'Ящик 5.56 СБП' },
        { img: 'images/items/ammo-762-sbp.webp',  label: 'Ящик 7.62 СБП' },
        { img: 'images/items/desperol.webp',      label: 'Десперол', qty: 2 },
        { img: 'images/items/american-mre.webp',  label: 'Американский ИРП', qty: 2 }
      ],
      money: 7000,
      reputation: 170,
      guideUrl: '../guides/torgovye-dela.html'
    },
    // Нычка мертвеца — Бандиты
    {
      id: 'q-nychka-mertveca-bandit',
      title: 'Нычка мертвеца',
      loc: 'south',
      faction: 'bandit',
      x: 1290, y: 2742,
      preview: 'images/quests/nychka-mertveca/cover.jpg',
      desc: 'Я приобрел координаты нычки одного жмура. Нужно проверить их.',
      rewards: [
        { img: 'images/items/art-cibulya.webp',                 label: 'Цибуля' },
        { img: 'images/items/art-prizrachnyj-kristall.webp',    label: 'Призрачный кристалл' },
        { img: 'images/items/bag-exp-762.webp',                 label: 'Сумка экспансивных патронов 7.62' },
        { img: 'images/items/bag-exp-545.webp',                 label: 'Сумка экспансивных патронов 5.45', qty: 2 },
        { img: 'images/items/bag-exp-556.webp',                 label: 'Сумка экспансивных патронов 5.56' },
        { img: 'images/items/pouch-medic.webp',                 label: 'Подсумок с военными аптечками', qty: 2 },
        { img: 'images/items/pouch-medic-guide.webp',           label: 'Подсумок с аптечками проводника' },
        { img: 'images/items/pouch-medic-science.webp',         label: 'Подсумок с аптечками ученых' },
        { img: 'images/items/srachnik.webp',                    label: 'Срачник', qty: 15 },
        { img: 'images/items/copper-wire-remnants.webp',        label: 'Остатки медной проволоки', qty: 10 },
        { img: 'images/items/koren-vonyuchka.webp',             label: 'Корень-вонючка', qty: 20 }
      ],
      guideUrl: '../guides/nychka-mertveca.html'
    },
    // Беспредел — Бандиты
    {
      id: 'q-bespredel-bandit',
      title: 'Беспредел',
      loc: 'south',
      faction: 'bandit',
      x: 836, y: 2229,
      preview: 'images/quests/bespredel/cover.jpg',
      desc: 'Бандит Могол удивлен, что никто из его банды не явился в назначенный час на сходку.',
      rewards: [
        { img: 'images/items/bag-ap-762.webp',        label: 'Сумка бронебойных 7.62 мм' },
        { img: 'images/items/bag-556.webp',           label: 'Сумка патронов 5.56 мм' },
        { img: 'images/items/bag-545.webp',           label: 'Сумка патронов 5.45 мм' },
        { img: 'images/items/ammo-9mm.webp',          label: 'Патрон 9 мм', qty: 170 },
        { img: 'images/items/tonic-arni.webp',        label: 'Тоник "Арни"', qty: 3 },
        { img: 'images/items/energy-zhiden-extra.webp', label: 'Энергетик "Жидень EXTRA"', qty: 3 },
        { img: 'images/items/epinefrin.webp',         label: 'Эпинефрин', qty: 3 },
        { img: 'images/items/radioprotector-1.webp',  label: 'Радиопротектор первого класса', qty: 5 },
        { img: 'images/items/pouch-medic-science.webp', label: 'Подсумок с аптечками ученых', qty: 2 }
      ],
      money: 56250,
      reputation: 80,
      guideUrl: '../guides/bespredel.html'
    },
    // Должок — Бандиты
    {
      id: 'q-dolzhok-bandit',
      title: 'Должок',
      loc: 'south',
      faction: 'bandit',
      x: 806, y: 2151,
      preview: 'images/quests/dolzhok/cover.jpg',
      desc: 'В одном из подвалов на «Колосе» я нашёл труп.',
      rewards: [
        { img: 'images/items/energy-zhiden-extra.webp', label: 'Энергетик "Жидень EXTRA"', qty: 5 },
        { img: 'images/items/zalivnoe.webp',            label: 'Заливное', qty: 4 },
        { img: 'images/items/desperol.webp',            label: 'Десперол', qty: 2 },
        { img: 'images/items/ammo-545-sbp.webp',        label: 'Ящик 5.45 СБП', qty: 2 },
        { img: 'images/items/ammo-556-sbp.webp',        label: 'Ящик 5.56 СБП', qty: 2 },
        { img: 'images/items/ammo-762-sbp.webp',        label: 'Ящик 7.62 СБП', qty: 2 }
      ],
      money: 10000,
      reputation: 245,
      guideUrl: '../guides/dolzhok.html'
    },
    // Дела бандитские — Бандиты
    {
      id: 'q-dela-banditskie-bandit',
      title: 'Дела бандитские',
      loc: 'south',
      faction: 'bandit',
      x: 1323, y: 2115,
      preview: 'images/quests/dela-banditskie/cover.jpg',
      desc: 'Бандит по прозвищу Варяг попросил меня найти тайник.',
      rewards: [
        { img: 'images/items/podarok-varyaga.webp', label: 'Подарок Варяга', rarity: 'stalker' },
        { img: 'images/items/volchi-slezy.webp', label: 'Волчьи слёзы' },
        { img: 'images/items/holodec-kopytom.webp', label: 'Холодец "Копытом по лицу"', qty: 5 },
        { img: 'images/items/neyrotonic.webp', label: 'Нейротоник', qty: 3 },
        { img: 'images/items/desperol.webp', label: 'Десперол', qty: 4 },
        { img: 'images/items/clarinol.webp', label: 'Кларинол', qty: 3 }
      ],
      money: 10000,
      reputation: 380,
      guideUrl: '../guides/dela-banditskie.html'
    }
      ];

  let state = { currentMapId: 'south', zoom: DEFAULT_ZOOM, minZoom: 0.3 };
  let tilesState = { level: null };

  function initMapSelect() {
    el.mapSelect.innerHTML = MAPS.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
    el.mapSelect.value = state.currentMapId;
    el.mapSelect.addEventListener('change', () => {
      state.currentMapId = el.mapSelect.value;
      renderMap(true);
      showToast(`Карта: ${getMapById(state.currentMapId).name}`);
    });
  }
  function getMapById(id){ return MAPS.find(m => m.id === id) || MAPS[0]; }

  function renderMap(resetView=false){
    const map = getMapById(state.currentMapId);

    el.mapFrame.dataset.baseW = map.width;
    el.mapFrame.dataset.baseH = map.height;

    el.mapFrame.style.setProperty('--frame-w', map.width * state.zoom + 'px');
    el.mapFrame.style.setProperty('--frame-h', map.height * state.zoom + 'px');

    el.mapFrame.classList.add('loading');
    el.mapImage.classList.remove('error');
    el.mapImage.alt = `Карта: ${map.name}`;
    el.mapImage.src = map.src;
    el.mapImage.onload = () => el.mapFrame.classList.remove('loading');
    el.mapImage.onerror = () => { el.mapFrame.classList.remove('loading'); el.mapImage.classList.add('error'); };

    setupTilesLayer();
    recalcMinZoom();

    if (resetView){
      const startZoom = Math.max(DEFAULT_ZOOM, state.minZoom);
      setZoom(startZoom, getCanvasCenterAnchor());
      centerCanvas();
    } else {
      setZoom(clamp(state.zoom, state.minZoom, LIMITS.maxZoom), getCanvasCenterAnchor());
    }

    const markers = MARKERS.filter(q => q.loc === state.currentMapId);
    el.markersLayer.innerHTML = '';
    markers.forEach(q => el.markersLayer.appendChild(createMarkerEl(q, map)));

    updateTiles(true);
    updateOpenPopovers();
  }

  function createMarkerEl(q, map){
    const left = (q.x / map.width * 100) + '%';
    const top = (q.y / map.height * 100) + '%';

    const marker = document.createElement('button');
    marker.className = `marker marker--${q.faction || 'any'}`;
    marker.type = 'button';
    marker.setAttribute('aria-label', q.title);
    marker.style.left = left;
    marker.style.top  = top;

    const icon = MARKER_ICONS[q.faction] || MARKER_ICONS.any;
    const w = Math.round(icon.w * PIN_SCALE);
    const h = Math.round(icon.h * PIN_SCALE);

    marker.innerHTML = `
      <span class="pin">
        <img class="pin-img" src="${icon.src}" alt="Метка — ${escapeHtml(icon.alt)}"
             width="${w}" height="${h}" draggable="false" />
      </span>
      <div class="popover" role="dialog" aria-label="${escapeHtml(q.title)}">
        <div class="q-grid">
          <div class="q-left">
            <img class="q-thumb-xl" src="${q.preview || IMG_PLACEHOLDER}" alt="Превью — ${escapeHtml(q.title)}" />
            <div class="q-title-l">${escapeHtml(q.title)}</div>
            ${buildFactionBadge(q)}
            ${buildStatsInline(q)}
          </div>
          <div class="q-right">
            <div class="q-desc-box">
              <div class="q-desc">${escapeHtml(q.desc)}</div>
            </div>
            ${buildRewardsLarge(q)}
            <div class="q-actions">
              <a href="${q.guideUrl}" class="btn btn-primary inline" title="Открыть гайд">
                <i class="fa-solid fa-book-open"></i> Гайд по прохождению
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    marker.querySelector('.pin-img').addEventListener('error', () => { marker.classList.add('pin-fallback'); }, { once:true });
    marker.querySelectorAll('.q-thumb-xl, .rw-large img').forEach(im => {
      im.addEventListener('error', () => { im.src = IMG_PLACEHOLDER; }, { once:true });
    });

    marker.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const active = marker.classList.toggle('active');
      if (active){
        document.querySelectorAll('.marker.active').forEach(m => { if (m !== marker) { m.classList.remove('active'); } });
        scrollMarkerIntoView(marker);
        requestAnimationFrame(() => positionPopover(marker));
      }
    });

    return marker;
  }

  function buildFactionBadge(q){
    const txt = q.faction === 'bandit' ? 'Бандиты'
            : q.faction === 'stalker' ? 'Сталкеры'
            : 'Все';
    const cls = q.faction === 'bandit' ? 'badge--bandit'
            : q.faction === 'stalker' ? 'badge--stalker'
            : 'badge--any';
    return `<div class="q-badges"><span class="q-badge ${cls}">${txt}</span></div>`;
  }

  function buildStatsInline(q){
    const chips = [];
    if (isFinite(q.money)) chips.push(`<span class="stat-badge money"><i class="fa-solid fa-ruble-sign"></i> ${formatRubles(q.money)}</span>`);
    if (isFinite(q.reputation)) chips.push(`<span class="stat-badge rep"><i class="fa-solid fa-medal"></i> +${formatInt(q.reputation)}</span>`);
    return chips.length ? `<div class="q-stats-inline">${chips.join('')}</div>` : '';
  }

  function buildRewardsLarge(q){
  const list = [
    ...(q.rewardsVar || []),
    ...(q.rewards || [])
  ];
  if (!list.length) return '';

  return `
    <div class="rw-panel-large">
      <div class="rw-label">НАГРАДА</div>
      <div class="rw-gallery grid-2">
        ${list.map(r => {
          const { name, qty } = parseLabelQty(r);
          return `
            <span class="rw-large compact ${r.rarity ? `rarity-${escapeClass(r.rarity)}` : ''}">
              <img src="${r.img || IMG_PLACEHOLDER}" alt="Награда" />
              <span class="lbl">${escapeHtml(name || '')}</span>
              ${qty ? `<span class="qty">×${escapeHtml(qty)}</span>` : ''}
            </span>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

  /* Центрирование метки при открытии */
  function scrollMarkerIntoView(marker){
    const c = el.mapCanvas.getBoundingClientRect();
    const m = marker.getBoundingClientRect();
    const out = m.left < c.left || m.right > c.right || m.top < c.top || m.bottom > c.bottom;
    if (out) marker.scrollIntoView({ block:'center', inline:'center', behavior:'smooth' });
  }

  function positionPopover(marker){
    const pop = marker.querySelector('.popover');
    if (!pop) return;

    pop.style.transform = 'translateX(-50%)';
    pop.style.width = '';
    pop.style.maxHeight = '';
    pop.classList.remove('scrollable');
    pop.removeAttribute('data-pos');

    const cr = el.mapCanvas.getBoundingClientRect();
    const mr = marker.getBoundingClientRect();
    const pad = 8;

    const availableW = Math.max(0, cr.width - pad*2);
    const maxW = 560;
    if (availableW > 0) pop.style.width = Math.min(maxW, availableW) + 'px';

    const qGrid = pop.querySelector('.q-grid');
    if (qGrid){
      if (availableW < 520) qGrid.style.gridTemplateColumns = '1fr';
      else qGrid.style.gridTemplateColumns = '';
    }

    let pr = pop.getBoundingClientRect();
    let dx = 0;
    if (pr.left < cr.left + pad) dx = (cr.left + pad) - pr.left;
    else if (pr.right > cr.right - pad) dx = (cr.right - pad) - pr.right;
    if (Math.abs(dx) > 0.5){
      pop.style.transform = `translateX(calc(-50% + ${dx}px))`;
    }

    const spaceAbove = (mr.top - cr.top) - 12;
    const spaceBelow = (cr.bottom - mr.bottom) - 12;
    const naturalH = pop.scrollHeight;

    const placeBelow = (spaceAbove < naturalH && spaceBelow > spaceAbove);
    if (placeBelow) pop.setAttribute('data-pos', 'below');

    const availableH = Math.max(150, (placeBelow ? spaceBelow : spaceAbove) - 8);
    if (naturalH > availableH) {
      pop.classList.add('scrollable');
      pop.style.maxHeight = availableH + 'px';
    }
  }

  /* === ТАЙЛЫ ============================================================ */

  function setupTilesLayer(){
    if (el.tilesLayer) { el.tilesLayer.remove(); el.tilesLayer = null; tilesState.level = null; }
    const map = getMapById(state.currentMapId);
    if (!map.tiles){ el.mapImage.style.display = ''; return; }

    el.mapImage.style.display = 'none';
    const layer = document.createElement('div');
    layer.className = 'tiles-layer';
    el.mapFrame.insertBefore(layer, el.markersLayer);
    el.tilesLayer = layer;
  }

  function pickBestTileLevel(map){
    const t = map.tiles;
    if (!t?.levels?.length) return null;
    const dpr = window.devicePixelRatio || 1;
    const want = state.zoom * dpr;

    const baseCols1 = Math.ceil(map.width  / t.tileSize);
    const baseRows1 = Math.ceil(map.height / t.tileSize);

    const levels = t.levels.map(l => {
      const fx = l.cols / baseCols1;
      const fy = l.rows / baseRows1;
      return { l, eff: Math.min(fx, fy) };
    }).sort((a,b) => a.eff - b.eff);

    let best = levels[0].l;
    for (const it of levels){
      if (it.eff >= want) { best = it.l; break; }
      best = it.l;
    }
    return best;
  }

  function getBaseUnit(map, lvl){
    const t = map.tiles;
    const baseCols1 = Math.ceil(map.width  / t.tileSize);
    const baseRows1 = Math.ceil(map.height / t.tileSize);
    const unitW = (t.tileSize * baseCols1) / lvl.cols;
    const unitH = (t.tileSize * baseRows1) / lvl.rows;
    return { unitW, unitH };
  }

  function updateTiles(force=false){
    const map = getMapById(state.currentMapId);
    if (!el.tilesLayer || !map.tiles) return;

    const lvl = pickBestTileLevel(map);
    if (!lvl) return;

    if (force || !tilesState.level || tilesState.level.z !== lvl.z){
      tilesState.level = lvl;
      el.tilesLayer.innerHTML = '';
    }

    const { unitW, unitH } = getBaseUnit(map, lvl);

    const usableCols = Math.ceil(map.width  / unitW);
    const usableRows = Math.ceil(map.height / unitH);

    // видимая область в координатах карты
    const r = el.mapCanvas.getBoundingClientRect();
    const leftBase = el.mapCanvas.scrollLeft / state.zoom;
    const topBase  = el.mapCanvas.scrollTop  / state.zoom;
    const viewBaseW = r.width  / state.zoom;
    const viewBaseH = r.height / state.zoom;

    // диапазон тайлов + буфер
    const buf = 1;
    const c0 = Math.max(0, Math.floor(leftBase / unitW) - buf);
    const r0 = Math.max(0, Math.floor(topBase  / unitH) - buf);
    const c1 = Math.min(usableCols - 1, Math.floor((leftBase + viewBaseW) / unitW) + buf);
    const r1 = Math.min(usableRows - 1, Math.floor((topBase  + viewBaseH) / unitH) + buf);

    const needed = new Set();

    for (let row = r0; row <= r1; row++){
      for (let col = c0; col <= c1; col++){
        const key = `${lvl.z}:${row}:${col}`;
        needed.add(key);

        let img = el.tilesLayer.querySelector(`img.tile[data-key="${key}"]`);
        if (!img){
          img = new Image();
          img.className = 'tile';
          img.decoding = 'async';
          img.loading = 'eager';
          img.dataset.key = key;
          img.alt = '';
          img.src = lvl.url(col, row);
          el.tilesLayer.appendChild(img);
        }

        // базовая позиция/размер тайла
        let x = col * unitW * state.zoom;
        let y = row * unitH * state.zoom;
        let w = unitW * state.zoom;
        let h = unitH * state.zoom;

        // перекрытие внутренних стыков
        const isLastCol = col === usableCols - 1;
        const isLastRow = row === usableRows - 1;
        const sL = (col > 0) ? TILE_SEAM : 0;
        const sT = (row > 0) ? TILE_SEAM : 0;
        const sR = !isLastCol ? TILE_SEAM : 0;
        const sB = !isLastRow ? TILE_SEAM : 0;

        x -= sL; y -= sT;
        w += sL + sR;
        h += sT + sB;

        img.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        img.style.width  = w + 'px';
        img.style.height = h + 'px';
      }
    }

    el.tilesLayer.querySelectorAll('img.tile').forEach(im => {
      if (!needed.has(im.dataset.key)) im.remove();
    });
  }

  function updateOpenPopovers(){
    document.querySelectorAll('.marker.active, .marker:focus-within, .marker:hover')
      .forEach(positionPopover);
  }

  function recalcMinZoom(){
    const map = getMapById(state.currentMapId);
    const fitW = el.mapCanvas.clientWidth / map.width;
    const fitH = el.mapCanvas.clientHeight / map.height;
    state.minZoom = Math.min(fitW, fitH) || 0.3;
  }

  function setZoom(newZoom, anchor){
    const map = getMapById(state.currentMapId);
    const r = el.mapCanvas.getBoundingClientRect();

    const prev = state.zoom;
    const cw = map.width * prev;
    const ch = map.height * prev;

    const ax = anchor?.clientX ?? (r.left + r.width/2);
    const ay = anchor?.clientY ?? (r.top + r.height/2);
    const relX = (el.mapCanvas.scrollLeft + (ax - r.left)) / Math.max(1, cw);
    const relY = (el.mapCanvas.scrollTop  + (ay - r.top))  / Math.max(1, ch);

    // Используем Math.max, чтобы выбрать наибольшее из двух минимальных значений
    const lowerBound = Math.max(state.minZoom, LIMITS.minZoom);
    state.zoom = clamp(newZoom, lowerBound, LIMITS.maxZoom); // <--- Измененная логика

    const nw = map.width * state.zoom;
    const nh = map.height * state.zoom;

    el.mapFrame.style.setProperty('--frame-w', nw + 'px');
    el.mapFrame.style.setProperty('--frame-h', nh + 'px');
    el.zoomValue.textContent = Math.round(state.zoom * 100) + '%';

    const sl = relX * nw - (ax - r.left);
    const st = relY * nh - (ay - r.top);
    el.mapCanvas.scrollLeft = clamp(sl, 0, Math.max(0, nw - r.width));
    el.mapCanvas.scrollTop  = clamp(st, 0, Math.max(0, nh - r.height));

    el.mapCanvas.classList.toggle('pannable', state.zoom > state.minZoom + 1e-3);

    updateOpenPopovers();
    updateTiles();
  }

  function centerCanvas(){
    const map = getMapById(state.currentMapId);
    const cw = map.width * state.zoom;
    const ch = map.height * state.zoom;
    const r = el.mapCanvas.getBoundingClientRect();
    el.mapCanvas.scrollLeft = Math.max(0, (cw - r.width)/2);
    el.mapCanvas.scrollTop  = Math.max(0, (ch - r.height)/2);
  }

  /* Кнопки масштаба */
  el.zoomInBtn.addEventListener('click', () => setZoom(state.zoom * 1.2, getCanvasCenterAnchor()));
  el.zoomOutBtn.addEventListener('click', () => setZoom(state.zoom / 1.2, getCanvasCenterAnchor()));
  el.zoomResetBtn.addEventListener('click', () => {
    recalcMinZoom();
    setZoom(Math.max(DEFAULT_ZOOM, state.minZoom), getCanvasCenterAnchor());
    centerCanvas();
  });

  function getCanvasCenterAnchor(){
    const r = el.mapCanvas.getBoundingClientRect();
    return { clientX: r.left + r.width/2, clientY: r.top + r.height/2 };
  }

  /* Зум колесом */
  el.mapCanvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const scale = e.deltaY > 0 ? 1/1.1 : 1.1;
    setZoom(state.zoom * scale, { clientX: e.clientX, clientY: e.clientY });
  }, { passive:false });

  /* Перетаскивание */
  let dragActive=false, dragStart={x:0,y:0,sx:0,sy:0};
  el.mapCanvas.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.marker') || e.target.closest('.popover')) return;
    if (e.pointerType === 'touch') {
      const activeMarker = document.querySelector('.marker.active');
      if (activeMarker) {
        activeMarker.classList.remove('active');
        return;
      }
    }
    if (state.zoom <= state.minZoom + 1e-3) return;
    if (e.button !== 0) return;
    el.mapCanvas.setPointerCapture(e.pointerId);
    dragActive = true;
    dragStart = { x:e.clientX, y:e.clientY, sx:el.mapCanvas.scrollLeft, sy:el.mapCanvas.scrollTop };
    el.mapCanvas.classList.add('dragging');
  });
  el.mapCanvas.addEventListener('pointermove', (e) => {
    if (!dragActive || el._pinch) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    el.mapCanvas.scrollLeft = clamp(dragStart.sx - dx, 0, el.mapFrame.clientWidth - el.mapCanvas.clientWidth);
    el.mapCanvas.scrollTop  = clamp(dragStart.sy - dy, 0, el.mapFrame.clientHeight - el.mapCanvas.clientHeight);
  });
  ['pointerup','pointercancel','pointerleave'].forEach(t => el.mapCanvas.addEventListener(t, () => {
    dragActive=false; el.mapCanvas.classList.remove('dragging');
  }));

  /* Pinch‑zoom */
  const pointers = new Map();

el.mapCanvas.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'touch') {
    el.mapCanvas.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, {x: e.clientX, y: e.clientY});

    if (pointers.size === 2) {
      const [p1, p2] = getTwoPoints();
      el._pinch = {
        dist: distance(p1, p2),
        zoom: state.zoom,
        cx: (p1.x + p2.x) / 2,
        cy: (p1.y + p2.y) / 2
      };
    }
  }
});

el.mapCanvas.addEventListener('pointermove', (e) => {
  if (e.pointerType === 'touch' && pointers.has(e.pointerId)) {
    pointers.set(e.pointerId, {x: e.clientX, y: e.clientY});

    if (pointers.size === 2 && el._pinch) {
      const [p1, p2] = getTwoPoints();

      const distNow = distance(p1, p2);
      const scale   = distNow / el._pinch.dist;
      const newZoom = el._pinch.zoom * scale;
      const center = { clientX: el._pinch.cx, clientY: el._pinch.cy };

      setZoom(newZoom, center);
    }
  }
}, { passive: false });

['pointerup', 'pointercancel', 'pointerleave'].forEach(t =>
  el.mapCanvas.addEventListener(t, (e) => {
    if (pointers.has(e.pointerId)) pointers.delete(e.pointerId);

    if (pointers.size < 2) {
      el._pinch = null;
    }
  })
);

function getTwoPoints() {
  const it = pointers.values();
  const a = it.next().value;
  const b = it.next().value;
  return [a, b];
}

function distance(a, b) {
  const dx = a.x - b.x, dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.marker')) {
      document.querySelectorAll('.marker.active').forEach(m => { m.classList.remove('active'); m.style.zIndex = ''; });
    }
  });

  /* События для перепозиционирования поповеров + тайлов */
  el.mapCanvas.addEventListener('scroll', () => { updateOpenPopovers(); updateTiles(); });
  window.addEventListener('resize', () => {
    recalcMinZoom();
    setZoom(Math.max(state.zoom,state.minZoom), getCanvasCenterAnchor());
    updateOpenPopovers();
    updateTiles();
  });
  window.addEventListener('orientationchange', () => { updateOpenPopovers(); updateTiles(); });

  /* Утилиты */
  function clamp(v,min,max){ return Math.max(min, Math.min(max,v)); }
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function escapeClass(s){ return String(s).replace(/[^a-z0-9_-]/gi,''); }
  function formatInt(n){ return Number(n).toFixed(0); }
  function formatRubles(n){ return new Intl.NumberFormat('ru-RU').format(Number(n)); }
  function showToast(text){ if(!el.toast) return; el.toast.textContent=text; el.toast.hidden=false; clearTimeout(showToast._t); showToast._t=setTimeout(()=>{el.toast.hidden=true},1800); }

  initMapSelect();
  renderMap(true);
});

// Быстрый пробник координат (клик по карте -> X/Y в пикселях 1372x2000)
window.enableMapCoordProbe = (on = true) => {
  const canvas = document.getElementById('mapCanvas');
  const frame = document.getElementById('mapFrame');
  const baseW = Number(frame?.dataset?.baseW || 1372);
  const baseH = Number(frame?.dataset?.baseH || 2000);

  const handler = (e) => {
    const r = frame.getBoundingClientRect();
    const relX = (e.clientX - r.left) / r.width;
    const relY = (e.clientY - r.top) / r.height;
    const X = Math.round(relX * baseW);
    const Y = Math.round(relY * baseH);
    console.log(`Marker coords: x:${X}, y:${Y}   // относ. ${baseW}x${baseH}`);
  };

  if (on) {
    canvas.style.cursor = 'crosshair';
    canvas.addEventListener('click', handler);
    console.info('Пробник координат: включен (enableMapCoordProbe(false) — выключить)');
  } else {
    canvas.style.cursor = '';
    canvas.removeEventListener('click', handler);
    console.info('Пробник координат: выключен');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const toggles = {
    any:     document.querySelector('.map-legend .chip-any'),
    stalker: document.querySelector('.map-legend .chip-stalker'),
    bandit:  document.querySelector('.map-legend .chip-bandit')
  };
  const visible = { any: true, stalker: true, bandit: true };

  const apply = (faction) => {
    document.querySelectorAll(`.marker--${faction}`).forEach(m => {
      m.style.display = visible[faction] ? '' : 'none';
    });
    toggles[faction]?.classList.toggle('off', !visible[faction]);
  };

  Object.entries(toggles).forEach(([f, node]) => {
    if (!node) return;
    node.setAttribute('role','button');
    node.setAttribute('aria-pressed','true');
    node.tabIndex = 0;
    const toggle = () => { visible[f] = !visible[f]; apply(f); };
    node.addEventListener('click', toggle);
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
});

function parseLabelQty(r){
  let qty = r?.qty;
  let name = String(r?.label ?? '');
  if (!qty && name){
    const m = name.match(/[×x]\s*(\d+)\s*$/i);
    if (m){
      qty = m[1];
      name = name.replace(m[0], '').trim();
    }
  }
  return { name, qty };
}
