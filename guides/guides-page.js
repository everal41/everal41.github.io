document.addEventListener('DOMContentLoaded', () => {
  const GUIDES = [
  {
    id: 'legenda-zony',
    title: 'Легенда Зоны',
    description: 'Помогите Коле Колбаскину найти след легендарного сталкера Зрячего. Небольшая цепочка заданий с походами по вражеским локациям.',
    image: 'images/quests/legenda-zony/cover.jpg',
    url: 'quests/legenda-zony.html',
    category: 'quest',
    faction: 'stalker',
    location: 'bar',
    tags: [],
    keywords: ['коля', 'колбаскин', 'зрячий', 'абакан', 'легенда', 'диггер', 'путь дураков', 'волк', 'шкатулка', 'блокнот', 'мёртвый город', 'свалка'],
    date: '2025-12-20',
    status: 'published'
  },
  {
    id: 'shpionomaniya',
    title: 'Шпиономания',
    description: 'Помогите Цефе разобраться с подозрениями: опросите сталкеров, расшифруйте записку и решите судьбу Цефалона. Выбор: сдать или защитить Цефу.',
    image: 'images/quests/shpionomaniya/cover.jpg',
    url: 'quests/shpionomaniya.html',
    category: 'quest',
    faction: 'stalker',
    location: 'chernie-ivy',
    tags: [],
    keywords: ['цефа', 'цефалон', 'кувалда', 'рыло', 'змей', 'шпион', 'санитары', 'бар', 'чёрные ивы', 'черные ивы', 'батарейка', 'записка', 'троица'],
    date: '2025-12-19',
    status: 'published'
  },
  {
    id: 'otchayanie-stalker',
    title: 'Отчаяние (Сталкеры)',
    description: 'Помогите блаженному Горькому справиться с кошмарами. Получите координаты нычки.',
    image: 'images/quests/otchayanie/cover-stalker.jpg',
    url: 'quests/otchayanie-stalker.html',
    category: 'quest',
    faction: 'stalker',
    location: 'chernie-ivy',
    tags: ['beginner'],
    keywords: ['горький', 'шаман', 'блаженный', 'нычка', 'кошмары', 'чёрные ивы', 'черные ивы', 'каа', 'тайник', 'скорлупа'],
    date: '2025-12-19',
    status: 'published'
  },
  {
    id: 'gadanie-na-snezhnoj-kuche',
    title: 'Гадание на снежной куче',
    description: 'Новогодний квест от Связующего: разгадайте все 40 загадок и получите подарки. Все местоположения объектов для снежков.',
    image: 'images/quests/gadanie-na-snezhnoj-kuche/cover.jpg',
    url: 'quests/gadanie-na-snezhnoj-kuche.html',
    category: 'quest',
    faction: 'event',
    location: null,
    tags: [],
    keywords: ['связующий', 'снеговик', 'ёлка', 'новый год', 'ивент', 'загадки', 'снежки', 'подарки', 'гадание', 'снежная куча', 'праздник', 'зима', 'ny2026', 'кастомизация'],
    date: '2025-12-19',
    status: 'published'
  },
  {
    id: 'rubi-rubi-stalker',
    title: 'Руби, руби! (Сталкеры)',
    description: 'Помогите Рубаке с кулинарными изысками: соберите ингредиенты для его блюд. Бонус — Рубака станет торговцем расходниками на базе диггеров.',
    image: 'images/quests/rubi-rubi/cover-stalker.jpg',
    url: 'quests/rubi-rubi-stalker.html',
    category: 'quest',
    faction: 'stalker',
    location: 'obochina',
    tags: ['beginner'],
    keywords: ['рубака', 'старьёвщик', 'еда', 'готовка', 'печень', 'мясо', 'кабан', 'шавки', 'диггеры', 'жаркое'],
    date: '2025-12-17',
    status: 'published'
  },
  {
    id: 'opasnye-mysli',
    title: 'Опасные мысли',
    description: 'Найдите труп возле кладбища и соберите все отрывки дневника. Награда — брелок "Дневник Бунтаря".',
    image: 'images/quests/opasnye-mysli/cover.jpg',
    url: 'quests/opasnye-mysli.html',
    category: 'quest',
    faction: 'stalker',
    location: 'obochina',
    tags: ['beginner'],
    keywords: ['бунтарь', 'дневник', 'брелок', 'труп', 'кладбище', 'записки', 'опасные мысли'],
    date: '2025-12-16',
    status: 'published'
  },
  {
    id: 'perekupshchik',
    title: 'Перекупщик',
    description: 'Помогите торговцу Шурпе наладить отношения с Перекупщиком и разобраться с блаженным Китом. Выбор: сдать Шурпу Санитарам или нет.',
    image: 'images/quests/perekupshchik/cover.jpg',
    url: 'quests/perekupshchik.html',
    category: 'quest',
    faction: 'stalker',
    location: 'obochina',
    tags: [],
    keywords: ['шурпа', 'перекупщик', 'кит', 'ахав', 'санитары', 'торговец', 'поставщик', 'военные', 'форт-12', 'магазин'],
    date: '2025-12-16',
    status: 'published'
  },
  {
    id: 'sonnaya-istoriya',
    title: 'Сонная история',
    description: 'Помогите странному сталкеру Гностику с его снами: найдите сонник, купите ружьё и соберите грибы.',
    image: 'images/quests/sonnaya-istoriya/cover.jpg',
    url: 'quests/sonnaya-istoriya.html',
    category: 'quest',
    faction: 'stalker',
    location: 'obochina',
    tags: [],
    keywords: ['гностик', 'сон', 'сонник', 'боб', 'ружьё', 'грибы', 'кисель', 'артефакт', 'осознанный сон', 'чёрные ивы'],
    date: '2025-12-16',
    status: 'published'
  },
  {
    id: 'to-chto-doktor-propisal',
    title: 'То, что Доктор прописал',
    description: 'Продайте "особые пилюли" доктора Вертейко командирам сталкерских аванпостов. Правильные ответы для убеждения каждого командира.',
    image: 'images/quests/to-chto-doktor-propisal/cover.jpg',
    url: 'quests/to-chto-doktor-propisal.html',
    category: 'quest',
    faction: 'stalker',
    location: 'obochina',
    tags: ['beginner'],
    keywords: ['доктор', 'вертейко', 'пилюли', 'плацебо', 'таблетки', 'аванпост', 'командир', 'продать', 'волшебное лекарство'],
    date: '2025-12-15',
    status: 'published'
  },
  {
    id: 'torgovye-dela-stalker',
    title: 'Торговые дела (Сталкеры)',
    description: 'Кучер не хочет разговаривать, пока Секундант не замолвит за вас слово. Длинная цепочка заданий с разведкой, штурмом и поиском посылки.',
    image: 'images/quests/torgovye-dela/cover-stalker.jpg',
    url: 'quests/torgovye-dela-stalker.html',
    category: 'quest',
    faction: 'stalker',
    location: 'obochina',
    tags: [],
    keywords: ['кучер', 'секундант', 'ковбой', 'стрекоза', 'крикет', 'ковыль', 'петля', 'десятник', 'торговля', 'прапор', 'посылка', 'торговые дела'],
    date: '2025-12-15',
    status: 'published'
  },
  {
    id: 'shershe-lya-fam',
    title: 'Шерше ля Фам',
    description: 'На Обочине встретьте Правдина и помогите оправдать пленника. Выбор: убить или пощадить Казанову.',
    image: 'images/quests/shershe-lya-fam/cover.jpg',
    url: 'quests/shershe-lya-fam.html',
    category: 'quest',
    faction: 'stalker',
    location: 'obochina',
    tags: [],
    keywords: ['правдин', 'казанова', 'сохатый', 'гривцов', 'лёлька', 'lelka', 'пленник', 'письмо', 'измена', 'шерше ля фам', 'cherchez la femme'],
    date: '2025-12-12',
    status: 'published'
  },
  {
    id: 'pochtalyon-stalker',
    title: 'Почтальон',
    description: 'Штиблет поручил доставить два конверта: красный для Бура и синий для Клопа.',
    image: 'images/quests/pochtalyon-stalker/cover.jpg',
    url: 'quests/pochtalyon-stalker.html',
    category: 'quest',
    faction: 'stalker',
    location: 'obochina',
    tags: ['beginner'],
    keywords: ['штиблет', 'бур', 'клоп', 'конверт', 'доставка', 'почта', 'почтальон', 'пожарная часть'],
    date: '2025-12-11',
    status: 'published'
  },
  {
    id: 'posylka-freemena-stalker',
    title: 'Посылка Фримена',
    description: 'Гайд по нелинейному квесту от торговца Фримена. Все варианты диалогов для получения Тактического или Кустарного АКС-74У.',
    image: 'images/quests/posylka-freemena/freemen.jpg',
    url: 'quests/posylka-freemena-stalker.html',
    category: 'quest',
    faction: 'stalker',
    location: 'bolota',
    tags: ['beginner'],
    keywords: ['фримен', 'freeman', 'светлый', 'варг', 'акс', 'aks', 'ставка атамана', 'торговец'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'echo-past-stalker',
    title: 'Эхо прошлого',
    description: 'На Болотах найден старый ПДА с именем владельца — Борода. Квест доступен для обеих фракций.',
    image: 'images/quests/echo-past/echo-past.jpg',
    url: 'quests/echo-past.html',
    category: 'quest',
    faction: 'both',
    location: 'bolota',
    tags: ['beginner'],
    keywords: ['борода', 'пда', 'pda', 'старый пда', 'эхо'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'upyr-stalker',
    title: 'Упырь',
    description: 'В лагерь принесли труп сталкера с множеством ран.',
    image: 'images/quests/upyr/upyr.jpg',
    url: 'quests/upyr.html',
    category: 'quest',
    faction: 'both',
    location: 'bolota',
    tags: ['beginner'],
    keywords: ['упырь', 'расследование', 'мутант'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'pokoysya-s-mirom',
    title: 'Покойся с миром',
    description: 'Заядлые картежники Шулер и Грэм попросили найти их товарища по кличке Чип. Награда — уникальная Старая лопата.',
    image: 'images/quests/pokoysya-s-mirom/pokoysya-s-mirom.jpg',
    url: 'quests/pokoysya-s-mirom.html',
    category: 'quest',
    faction: 'stalker',
    location: 'bolota',
    tags: ['beginner'],
    keywords: ['шулер', 'грэм', 'чип', 'картежники', 'лопата', 'старая лопата', 'карты'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'estestvennyj-otbor',
    title: 'Естественный отбор',
    description: 'Купленные у Синяка координаты залежей артефактов. Проверьте, не обман ли это.',
    image: 'images/quests/estestvennyj-otbor/cover.jpg',
    url: 'quests/estestvennyj-otbor.html',
    category: 'quest',
    faction: 'stalker',
    location: 'bolota',
    tags: ['beginner'],
    keywords: ['синяк', 'артефакты', 'координаты', 'залежи', 'арты'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'travnik',
    title: 'Травник',
    description: 'Бандит Клифа предлагает обнести обжитую хижину на севере Болот. Награда — брелок «Частица».',
    image: 'images/quests/travnik/travnik.jpg',
    url: 'quests/travnik.html',
    category: 'quest',
    faction: 'bandit',
    location: 'bolota',
    tags: ['beginner'],
    keywords: ['клифа', 'хижина', 'частица', 'брелок', 'травник', 'обнос'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'komar',
    title: 'Комар',
    description: 'Бандит Комар просит отомстить за своего приятеля Ваньку Жёлудя, которого задрали кабаны.',
    image: 'images/quests/komar/komar.jpg',
    url: 'quests/komar.html',
    category: 'quest',
    faction: 'bandit',
    location: 'bolota',
    tags: ['beginner'],
    keywords: ['комар', 'ванька', 'жёлудь', 'желудь', 'кабаны', 'месть'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'posylka-freemena-bandit',
    title: 'Посылка Фримена (Бандиты)',
    description: 'Бандит Варг задумал подмять под себя сталкерского торговца Фримена.',
    image: 'images/quests/posylka-freemena/posylka-freemena.jpg',
    url: 'quests/posylka-freemena.html',
    category: 'quest',
    faction: 'bandit',
    location: 'bolota',
    tags: [],
    keywords: ['варг', 'фримен', 'freeman', 'торговец', 'посылка', 'бандитская версия'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'sudba',
    title: 'Судьба',
    description: 'Спасите новичка от стаи гончих и поговорите с ним на базе. Награда — легендарный Сиг «Шепота».',
    image: 'images/quests/sudba/sudba.jpg',
    url: 'quests/sudba.html',
    category: 'quest',
    faction: 'bandit',
    location: 'bolota',
    tags: ['advanced'],
    keywords: ['лёд', 'лед', 'led', 'ice', 'шепота', 'сиг', 'sig', 'гончие', 'новичок', 'жетон льда'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'dokumentaciya',
    title: 'Документация',
    description: 'Познакомьтесь с бандитом по кличке Гном на Обочине. Простой квест для начала.',
    image: 'images/quests/dokumentaciya/cover.jpg',
    url: 'quests/dokumentaciya.html',
    category: 'quest',
    faction: 'bandit',
    location: 'obochina',
    tags: ['beginner'],
    keywords: ['гном', 'документы', 'обочина', 'знакомство'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'bezopasnost',
    title: 'Безопасность превыше всего',
    description: 'Бандит Моряк с Обочины хочет устроить гоп-стоп одному из блаженных.',
    image: 'images/quests/bezopasnost/cover.jpg',
    url: 'quests/bezopasnost.html',
    category: 'quest',
    faction: 'bandit',
    location: 'obochina',
    tags: [],
    keywords: ['моряк', 'блаженный', 'гоп-стоп', 'ограбление', 'безопасность'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'mertvetsy',
    title: 'Мертвецы не рассказывают сказки',
    description: 'Решала просит помочь с устранением группы «неправильных» бандитов. Награда — Walther «Иудей».',
    image: 'images/quests/mertvetsy/cover.jpg',
    url: 'quests/mertvetsy.html',
    category: 'quest',
    faction: 'bandit',
    location: 'obochina',
    tags: [],
    keywords: ['решала', 'walther', 'вальтер', 'иудей', 'мертвецы', 'устранение', 'неправильные'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'pochtalyon',
    title: 'Почтальон',
    description: 'Ровный поручил доставить два конверта: красный для Мишки и синий для Форекса.',
    image: 'images/quests/pochtalyon/cover.jpg',
    url: 'quests/pochtalyon.html',
    category: 'quest',
    faction: 'bandit',
    location: 'obochina',
    tags: ['beginner'],
    keywords: ['ровный', 'мишка', 'форекс', 'конверт', 'доставка', 'почта'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'torgovye-dela',
    title: 'Торговые дела',
    description: 'Зубастый не хочет разговаривать, пока Мент не замолвит за вас слово.',
    image: 'images/quests/torgovye-dela/cover.jpg',
    url: 'quests/torgovye-dela.html',
    category: 'quest',
    faction: 'bandit',
    location: 'obochina',
    tags: [],
    keywords: ['зубастый', 'мент', 'торговля', 'слово', 'рекомендация'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'nychka-mertveca',
    title: 'Нычка мертвеца',
    description: 'Приобретённые координаты нычки одного жмура. Проверьте их и заберите добычу.',
    image: 'images/quests/nychka-mertveca/cover.jpg',
    url: 'quests/nychka-mertveca.html',
    category: 'quest',
    faction: 'bandit',
    location: 'obochina',
    tags: [],
    keywords: ['нычка', 'тайник', 'жмур', 'мертвец', 'координаты', 'схрон'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'bespredel',
    title: 'Беспредел',
    description: 'Бандит Могол удивлён, что никто из его банды не явился на сходку. Расследуйте, что произошло.',
    image: 'images/quests/bespredel/cover.jpg',
    url: 'quests/bespredel.html',
    category: 'quest',
    faction: 'bandit',
    location: 'kolos',
    tags: ['advanced'],
    keywords: ['могол', 'банда', 'сходка', 'расследование', 'беспредел', 'колос'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'dolzhok',
    title: 'Должок',
    description: 'В одном из подвалов на «Колосе» найден труп. Узнайте, что произошло.',
    image: 'images/quests/dolzhok/cover.jpg',
    url: 'quests/dolzhok.html',
    category: 'quest',
    faction: 'bandit',
    location: 'kolos',
    tags: [],
    keywords: ['подвал', 'труп', 'колос', 'долг', 'должник'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'dela-banditskie',
    title: 'Дела бандитские',
    description: 'Бандит Варяг попросил найти тайник. Награда — уникальный Подарок Варяга.',
    image: 'images/quests/dela-banditskie/cover.jpg',
    url: 'quests/dela-banditskie.html',
    category: 'quest',
    faction: 'bandit',
    location: 'svalka',
    tags: ['advanced'],
    keywords: ['варяг', 'тайник', 'подарок', 'янтарь', 'волчьи слёзы'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'rubi-rubi',
    title: 'Руби, руби!',
    description: 'Познакомьтесь с Рубакой — странным мужиком, готовящим еду из местной живности.',
    image: 'images/quests/rubi-rubi/cover.jpg',
    url: 'quests/rubi-rubi.html',
    category: 'quest',
    faction: 'bandit',
    location: 'obochina',
    tags: [],
    keywords: ['рубака', 'еда', 'готовка', 'живность', 'мутанты', 'жаркое'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'otchayanie',
    title: 'Отчаяние',
    description: 'Получите координаты нычки от измученного кошмарами блаженного на Колосе.',
    image: 'images/quests/otchayanie/cover.jpg',
    url: 'quests/otchayanie.html',
    category: 'quest',
    faction: 'bandit',
    location: 'kolos',
    tags: ['beginner'],
    keywords: ['блаженный', 'кошмары', 'нычка', 'координаты', 'скорлупа'],
    date: '2025-12-03',
    status: 'published'
  },
  {
    id: 'armor-review',
    title: 'Обзор всех бронекостюмов',
    description: 'Подробный разбор всей брони в игре — от научных до боевых комбинезонов. Оптимальные сборки и советы по применению.',
    image: '../images/guides/armor-review/armor-guide-header.jpg',
    url: '../guide-armor-review.html',
    category: 'equipment',
    tags: [],
    keywords: ['броня', 'armor', 'костюм', 'комбинезон', 'защита', 'сева', 'экзо', 'научный', 'боевой', 'страж', 'берилл', 'скаут'],
    date: '2025-08-01',
    status: 'published'
  },
  {
    id: 'debug-screen',
    title: 'Экран отладки: как понять, что сервера лагают',
    description: 'Разбираемся в значениях экрана отладки. Учимся читать пинг, FPS и определять причину лагов.',
    image: 'images/debug-screen/debug-screen.jpg',
    url: '#',
    category: 'tech',
    tags: [],
    keywords: ['debug', 'дебаг', 'отладка', 'пинг', 'ping', 'fps', 'лаги', 'фризы', 'сервер', 'производительность'],
    date: null,
    status: 'soon'
  },
  {
    id: 'graphics-settings',
    title: 'Оптимальные настройки графики',
    description: 'Подробный разбор всех графических настроек игры. Баланс между качеством картинки и производительностью.',
    image: '../images/guides/graphics-settings.jpg',
    url: '#',
    category: 'tech',
    tags: [],
    keywords: ['графика', 'настройки', 'settings', 'качество', 'текстуры', 'тени', 'shadows', 'оптимизация'],
    date: null,
    status: 'soon'
  },
  {
    id: 'fps-optimization',
    title: 'Оптимизация FPS и устранение фризов',
    description: 'Советы по увеличению производительности игры. Решение проблем с фризами и вылетами.',
    image: '../images/guides/fps-optimization.jpg',
    url: '#',
    category: 'tech',
    tags: [],
    keywords: ['fps', 'фпс', 'фризы', 'freeze', 'вылеты', 'crash', 'оптимизация', 'производительность', 'лаги'],
    date: null,
    status: 'soon'
  },
  {
    id: 'custom-radio',
    title: 'Кастомные сборники Радио',
    description: 'Подборка уникальных радиостанций для вашей игры. От классики S.T.A.L.K.E.R. до современного рока.',
    image: 'images/custom-radio/radio.jpg',
    url: '../guide-custom-radio.html',
    category: 'misc',
    tags: [],
    keywords: ['радио', 'radio', 'музыка', 'music', 'станции', 'кастом', 'сталкер', 'stalker', 'рок', 'rock'],
    date: '2025-08-01',
    status: 'published'
  },
  {
    id: 'currency-farm',
    title: 'Все способы фарма валюты',
    description: 'Полное руководство по заработку в STALCRAFT. От фарма спотов для новичков до торговли на аукционе.',
    image: 'images/currency-farm/currency-farm.jpg',
    url: '#',
    category: 'misc',
    tags: [],
    keywords: ['фарм', 'farm', 'деньги', 'рубли', 'заработок', 'аукцион', 'торговля', 'споты', 'валюта', 'рубли'],
    date: null,
    status: 'soon'
  },
  {
    id: 'story-guide',
    title: 'Прохождение сюжета на 100%',
    description: 'Гайд по основной сюжетной линии с разбором всех наград и скрытых достижений.',
    image: 'images/story-guide/story-guide.jpg',
    url: '#',
    category: 'misc',
    tags: [],
    keywords: ['сюжет', 'story', 'прохождение', 'walkthrough', 'достижения', 'achievements', '100%', 'полное'],
    date: null,
    status: 'soon'
  }
  ];

  const elements = {
    grid: document.getElementById('guidesGrid'),
    searchInput: document.getElementById('searchInput'),
    searchClear: document.getElementById('searchClear'),
    filterTabs: document.querySelectorAll('.filter-tab'),
    sortSelect: document.getElementById('sortSelect'),
    viewBtns: document.querySelectorAll('.view-btn'),
    activeFilters: document.getElementById('activeFilters'),
    filterChips: document.getElementById('filterChips'),
    clearFilters: document.getElementById('clearFilters'),
    emptyState: document.getElementById('emptyState'),
    resetSearch: document.getElementById('resetSearch'),
    secondaryFilters: document.getElementById('secondaryFilters'),
    factionBtns: document.querySelectorAll('.chip-btn[data-faction]'),
    locationFilter: document.getElementById('locationFilter'),
    totalGuides: document.getElementById('totalGuides'),
    questGuides: document.getElementById('questGuides'),
    publishedGuides: document.getElementById('publishedGuides')
  };

  const state = {
    search: '',
    category: 'all',
    faction: 'all',
    location: 'all',
    sort: 'newest',
    view: 'grid'
  };

  const CATEGORY_LABELS = { quest: 'Квесты', equipment: 'Снаряжение', tech: 'Технические', misc: 'Разное' };
  const CATEGORY_ICONS = { quest: 'fa-scroll', equipment: 'fa-shield-halved', tech: 'fa-gear', misc: 'fa-puzzle-piece' };
  const FACTION_LABELS = { stalker: 'Сталкеры', bandit: 'Бандиты', both: 'Обе фракции', event: 'Ивент' };
  const LOCATION_LABELS = { bolota: 'Болота', obochina: 'Обочина', kolos: 'Колос', 'chernie-ivy': 'Черные Ивы', svalka: 'Свалка' };
  const TAG_LABELS = { beginner: 'Новичкам', advanced: 'Продвинутый', stalker: 'Сталкеры', bandit: 'Бандиты', both: 'Обе фракции' };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const updateStats = () => {
    const published = GUIDES.filter(g => g.status === 'published');
    elements.totalGuides.textContent = GUIDES.length;
    elements.questGuides.textContent = GUIDES.filter(g => g.category === 'quest').length;
    elements.publishedGuides.textContent = published.length;
    document.querySelector('[data-count="all"]').textContent = GUIDES.length;
    document.querySelector('[data-count="quest"]').textContent = GUIDES.filter(g => g.category === 'quest').length;
    document.querySelector('[data-count="equipment"]').textContent = GUIDES.filter(g => g.category === 'equipment').length;
    document.querySelector('[data-count="tech"]').textContent = GUIDES.filter(g => g.category === 'tech').length;
    document.querySelector('[data-count="misc"]').textContent = GUIDES.filter(g => g.category === 'misc').length;
  };

  const createGuideCard = (guide) => {
    const isDisabled = guide.status === 'soon';
    const card = document.createElement('a');
    card.href = guide.url;
    card.className = `guide-card${isDisabled ? ' disabled' : ''}`;
    card.dataset.category = guide.category;
    card.dataset.id = guide.id;
    if (guide.faction) card.dataset.faction = guide.faction;
    if (guide.location) card.dataset.location = guide.location;
    if (isDisabled) {
      card.setAttribute('aria-disabled', 'true');
      card.tabIndex = -1;
    }
    const displayTags = guide.tags.filter(t => !['stalker', 'bandit', 'both'].includes(t));
    const tagsHtml = displayTags.map(tag => `<span class="card-tag tag-${tag}">${TAG_LABELS[tag] || tag}</span>`).join('');
    const dateHtml = guide.date ? `<span class="card-date"><i class="fa-regular fa-calendar"></i>${formatDate(guide.date)}</span>` : '';
    const statusBadge = guide.status === 'soon' ? `<span class="card-status"><i class="fa-solid fa-clock"></i>Скоро</span>` : '';
    let factionBadge = '';
    if (guide.category === 'quest' && guide.faction) {
      const factionClass = guide.faction === 'both' ? 'faction-any' : `faction-${guide.faction}`;
      const factionIcon = {
        stalker: 'fa-shield-halved',
        bandit: 'fa-skull',
        both: 'fa-users',
        event: 'fa-snowflake'
      }[guide.faction] || 'fa-users';
      factionBadge = `<span class="card-faction ${factionClass}"><i class="fa-solid ${factionIcon}"></i>${FACTION_LABELS[guide.faction]}</span>`;
    }
    let locationBadge = '';
    if (guide.category === 'quest' && guide.location) {
      locationBadge = `<span class="card-location"><i class="fa-solid fa-location-dot"></i>${LOCATION_LABELS[guide.location]}</span>`;
    }
    card.innerHTML = `
      <div class="card-image">
        <img src="${guide.image}" alt="${guide.title}" loading="lazy" />
        <div class="card-badges">
          <div class="card-badges-left">
            <span class="card-category cat-${guide.category}"><i class="fa-solid ${CATEGORY_ICONS[guide.category]}"></i>${CATEGORY_LABELS[guide.category]}</span>
            ${factionBadge}
          </div>
          ${statusBadge}
        </div>
        ${locationBadge}
      </div>
      <div class="card-content">
        <h3 class="card-title">${guide.title}</h3>
        <p class="card-description">${guide.description}</p>
        ${tagsHtml ? `<div class="card-tags">${tagsHtml}</div>` : ''}
        <div class="card-meta">
          ${dateHtml}
          <span class="card-action">${isDisabled ? 'Скоро' : 'Читать'} <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>`;
    const img = card.querySelector('img');
    img.addEventListener('error', () => {
      img.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect width="100%" height="100%" fill="#18181b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" fill="#71717a">Изображение недоступно</text></svg>`);
    });
    return card;
  };

  const filterAndSort = () => {
    let filtered = [...GUIDES];
    if (state.search.trim()) {
      const query = state.search.toLowerCase().trim();
      filtered = filtered.filter(g => {
        return g.title.toLowerCase().includes(query) ||
          g.description.toLowerCase().includes(query) ||
          g.tags.some(t => TAG_LABELS[t]?.toLowerCase().includes(query)) ||
          (g.location && LOCATION_LABELS[g.location]?.toLowerCase().includes(query)) ||
          (g.keywords && g.keywords.some(kw => kw.toLowerCase().includes(query))) ||
          CATEGORY_LABELS[g.category]?.toLowerCase().includes(query) ||
          (g.faction && FACTION_LABELS[g.faction]?.toLowerCase().includes(query));
      });
    }
    if (state.category !== 'all') {
      filtered = filtered.filter(g => g.category === state.category);
    }
    if (state.faction !== 'all') {
      filtered = filtered.filter(g => {
        if (g.category !== 'quest') return true;
        return g.faction === state.faction || g.faction === 'both';
      });
    }
    if (state.location !== 'all') {
      filtered = filtered.filter(g => {
        if (!g.location) return state.category !== 'quest';
        return g.location === state.location;
      });
    }
    filtered.sort((a, b) => {
      if (a.status === 'soon' && b.status !== 'soon') return 1;
      if (a.status !== 'soon' && b.status === 'soon') return -1;
      switch (state.sort) {
        case 'newest':
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(a.date) - new Date(b.date);
        case 'az': return a.title.localeCompare(b.title, 'ru');
        case 'za': return b.title.localeCompare(a.title, 'ru');
        default: return 0;
      }
    });
    return filtered;
  };

  const render = () => {
    const filtered = filterAndSort();
    elements.grid.innerHTML = '';
    if (filtered.length === 0) {
      elements.emptyState.hidden = false;
      elements.grid.hidden = true;
    } else {
      elements.emptyState.hidden = true;
      elements.grid.hidden = false;
      filtered.forEach((guide, index) => {
        const card = createGuideCard(guide);
        card.style.animationDelay = `${Math.min(index * 0.02, 0.22)}s`;
        elements.grid.appendChild(card);
      });
    }
    elements.secondaryFilters.hidden = state.category !== 'quest';
    updateActiveFilters();
  };

  const updateActiveFilters = () => {
    const chips = [];
    if (state.search.trim()) {
      chips.push({ type: 'search', label: `Поиск: "${state.search}"`, clear: () => { state.search = ''; elements.searchInput.value = ''; elements.searchClear.hidden = true; }});
    }
    if (state.category !== 'all') {
      chips.push({ type: 'category', label: CATEGORY_LABELS[state.category], clear: () => { state.category = 'all'; elements.filterTabs.forEach(t => { t.classList.toggle('active', t.dataset.category === 'all'); t.setAttribute('aria-selected', t.dataset.category === 'all'); }); }});
    }
    if (state.faction !== 'all') {
      chips.push({ type: 'faction', label: FACTION_LABELS[state.faction], clear: () => { state.faction = 'all'; elements.factionBtns.forEach(b => { b.classList.toggle('active', b.dataset.faction === 'all'); }); }});
    }
    if (state.location !== 'all') {
      chips.push({ type: 'location', label: LOCATION_LABELS[state.location], clear: () => { state.location = 'all'; elements.locationFilter.value = 'all'; }});
    }
    if (chips.length > 0) {
      elements.activeFilters.hidden = false;
      elements.filterChips.innerHTML = chips.map(chip => `<span class="filter-chip" data-type="${chip.type}">${chip.label}<button aria-label="Удалить фильтр"><i class="fa-solid fa-xmark"></i></button></span>`).join('');
      elements.filterChips.querySelectorAll('.filter-chip button').forEach((btn, i) => {
        btn.addEventListener('click', () => { chips[i].clear(); render(); });
      });
    } else {
      elements.activeFilters.hidden = true;
    }
  };

  elements.searchInput.addEventListener('input', (e) => {
    state.search = e.target.value;
    elements.searchClear.hidden = !state.search;
    render();
  });

  elements.searchClear.addEventListener('click', () => {
    state.search = '';
    elements.searchInput.value = '';
    elements.searchClear.hidden = true;
    elements.searchInput.focus();
    render();
  });

  elements.filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      state.category = tab.dataset.category;
      if (state.category !== 'quest') {
        state.faction = 'all';
        state.location = 'all';
        elements.factionBtns.forEach(b => b.classList.toggle('active', b.dataset.faction === 'all'));
        elements.locationFilter.value = 'all';
      }
      elements.filterTabs.forEach(t => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab);
      });
      render();
    });
  });

  elements.factionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.faction = btn.dataset.faction;
      elements.factionBtns.forEach(b => b.classList.toggle('active', b === btn));
      render();
    });
  });

  elements.locationFilter?.addEventListener('change', (e) => {
    state.location = e.target.value;
    render();
  });

  elements.sortSelect.addEventListener('change', (e) => {
    state.sort = e.target.value;
    render();
  });

  elements.viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.view = btn.dataset.view;
      elements.viewBtns.forEach(b => b.classList.toggle('active', b === btn));
      elements.grid.classList.toggle('view-list', state.view === 'list');
    });
  });

  const resetAllFilters = () => {
    state.search = '';
    state.category = 'all';
    state.faction = 'all';
    state.location = 'all';
    state.sort = 'newest';
    elements.searchInput.value = '';
    elements.searchClear.hidden = true;
    elements.sortSelect.value = 'newest';
    elements.locationFilter.value = 'all';
    elements.filterTabs.forEach(t => {
      t.classList.toggle('active', t.dataset.category === 'all');
      t.setAttribute('aria-selected', t.dataset.category === 'all');
    });
    elements.factionBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.faction === 'all');
    });
    render();
  };

  elements.clearFilters?.addEventListener('click', resetAllFilters);
  elements.resetSearch?.addEventListener('click', resetAllFilters);

  const controlsObserver = new IntersectionObserver(
    ([e]) => { document.querySelector('.guides-controls')?.classList.toggle('scrolled', e.intersectionRatio < 1); },
    { threshold: [1], rootMargin: '-65px 0px 0px 0px' }
  );

  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'height:1px;margin-top:-1px';
  document.querySelector('.guides-hero')?.appendChild(sentinel);
  controlsObserver.observe(sentinel);

  const copyBtn = document.getElementById('copyNickBtn');
  const nickEl = document.getElementById('gameNick');
  if (copyBtn && nickEl) {
    copyBtn.addEventListener('click', async () => {
      const nick = nickEl.textContent.trim();
      const icon = copyBtn.querySelector('i');
      try {
        await navigator.clipboard.writeText(nick);
        icon.className = 'fa-solid fa-check';
        copyBtn.classList.add('copied');
        setTimeout(() => { icon.className = 'fa-regular fa-copy'; copyBtn.classList.remove('copied'); }, 2000);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = nick;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        icon.className = 'fa-solid fa-check';
        copyBtn.classList.add('copied');
        setTimeout(() => { icon.className = 'fa-regular fa-copy'; copyBtn.classList.remove('copied'); }, 2000);
      }
    });
  }

  updateStats();
  render();
});
