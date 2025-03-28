// Модальное окно "О сайте"
const aboutModal = document.getElementById('about-modal');
const openAboutModalBtn = document.getElementById('open-about');
const closeAboutModalBtn = document.querySelector('#about-modal .close-button'); // Селектор по ID и классу


// Модальное окно "Контакты"
const contactsModal = document.getElementById('contacts-modal');
const openContactsModalBtn = document.getElementById('open-contacts');
const closeContactsModalBtn = document.querySelector('#contacts-modal .close-button'); // и здесь


// Функции открытия и закрытия (общие, используем параметр)
function openModal(modalElement) {
    modalElement.style.display = 'block';
}

function closeModal(modalElement) {
    modalElement.style.display = 'none';
}

// Обработчики событий для "О сайте"
openAboutModalBtn.addEventListener('click', () => openModal(aboutModal));
closeAboutModalBtn.addEventListener('click', () => closeModal(aboutModal));

// Обработчики событий для "Контакты"
openContactsModalBtn.addEventListener('click', () => openModal(contactsModal));
closeContactsModalBtn.addEventListener('click', () => closeModal(contactsModal));

// Закрытие при клике вне окна (общее)
window.addEventListener('click', (event) => {
    if (event.target === aboutModal) {
        closeModal(aboutModal);
    }
    if (event.target === contactsModal) {
        closeModal(contactsModal);
    }
});

document.addEventListener('DOMContentLoaded', function() {

    // Ранговые категории
    const armorRanks = {
        "Отмычка": "rank-gray",
        "Новичок": "rank-green",
        "Сталкер": "rank-blue",
        "Ветеран": "rank-purple",
        "Мастер": "rank-red",
        "Контейнеры": "rank-orange",
        "Рюкзаки": "rank-orange",
        "Ветка 7.62 глушителей": "rank-darkolivegreen", "Ветка 7.62 глушителей на отдачу": "rank-darkolivegreen", "Ветка 7.62 надульников на разброс": "rank-darkolivegreen", "Ветка сбалансированных 7.62 надульников": "rank-darkolivegreen", "Ветка 7.62 надульников на гориз. отдачу": "rank-darkolivegreen", "Ветка 7.62 надульников на отдачу": "rank-darkolivegreen",
        "Ветка 5.56 глушителей": "rank-yellow", "Ветка 5.56 надульников на разброс": "rank-yellow", "Ветка сбалансированных 5.56 надульников": "rank-yellow",
        "Ветка 5.45 глушителей": "rank-green", "Ветка 5.45 надульников на разброс": "rank-green", "Ветка сбалансированных 5.45 надульников": "rank-green",
        "Ветка сбалансированных 9 мм надульников": "rank-yellowlight", "Ветка 9 мм надульников на разброс": "rank-yellowlight", "Ветка 9 мм глушителей": "rank-yellowlight", "Ствол на D-Eagle": "rank-yellowlight",
        "Ветка надульника на АШ-12": "rank-mustard", "Ветка глушителя на АШ-12": "rank-mustard",
        "Ветка А-545": "rank-green",
        "Ветка FN F2000 Tactical": "rank-yellow",
        "Ветка АК-15": "rank-darkolivegreen",
        "Ветка ПКП": "rank-darkolivegreen",
        "Ветка L96A1": "rank-darkolivegreen",
        "Ветка СВД-М": "rank-darkolivegreen",
        "Ветка Mk 14 EBR": "rank-darkolivegreen",
        "Ветка АМБ-17": "rank-brown",
        "Ветка СР-3М": "rank-brown",
        "Ветка ВСС-М «Винторез»": "rank-brown",
        "Ветка ППК-20": "rank-yellowlight",
        "Ветка TDI KRISS Vector": "rank-yellowlight",
        "Ветка ОЦ-33 «Пернач»": "rank-yellowlight",
        "Ветка Desert Eagle Mark XIX": "rank-yellowlight",
        "Ветка АШ-12": "rank-mustard",
        "Ветка ВССК «Выхлоп»": "rank-mustard",
        "Ветка РШ-12": "rank-mustard",
        "Дробовики": "rank-red",
        "Ветка Кукри": "rank-silver",
        "Ножи": "rank-silver",
        "Сюжетные": "rank-green",
        "Ветка Центуриона": "rank-red",
        "Ветка Зверобоя": "rank-red",
        "Ветка Экзоскелета": "rank-red",
        "Ветка Скифа": "rank-green",
        "Ветка АО": "rank-green",
        "Ветка Сатурна": "rank-blue",
        "Фракционная броня": "rank-orange",
        "9 мм Магазины": "rank-yellowlight",
        "7.62 Магазины": "rank-darkolivegreen",
        "Ветка Барабана G3/M1A": "rank-darkolivegreen",
        "Ветка 7.62 эргомагов": "rank-darkolivegreen",
        "Ветка 5.56 эргомагов": "rank-yellow",
        "Ветка 60-патронника 5.56": "rank-yellow",
        "Ветка Увеличенного магазина для ВСС/Вал": "rank-brown",
        "Ветка Увеличенного магазина АШ-12": "rank-mustard",
        "Ветка 60-патронника 5.45": "rank-green",
        "Ветка 5.45 эргомагов": "rank-green",
        "Магазины для дробовиков": "rank-red",
        "Цевья": "rank-orange",
        "Крепления": "rank-orange",
        "Ветка ЛЦУ": "rank-orange",
        "Ветка рукояток на отдачу": "rank-orange",
        "Ветка снайперских рукояток": "rank-orange",
        "Ветка эргономичных рукояток": "rank-orange",
        "Подствольные гранатометы": "rank-orange",
        "ПНВ": "rank-orange",
        "Детекторы": "rank-orange",
        "Металлоискатели": "rank-orange",
        "Оптические прицелы": "rank-orange",
        "Коллиматорные прицелы": "rank-orange",
        "Краски": "rank-gray",
        "Прочее": "rank-gray",
    };

    // Цвета для названий контейнеров (объект, а не классы)
    const containerNameColors = {
        "Контейнер «Улей»": "#EA9D9E",
        "Контейнер «Берлога-6»": "#EA9D9E",
        "Контейнер «Кокон»": "#BF5BAD",
        "Контейнер «Добытчик»": "#BF5BAD",
        "Контейнер «Берлога-4»": "#9F9FED",
        "«КЗС-5»": "#9F9FED",
        "«КЗС-4»": "#9F9FED",
        "«КЗС-3»": "#9F9FED",
        "«КЗС-2»": "#9DEB9D",
        "Контейнер «КЗС-1»": "#9DEB9D"
    };

    const backpackNameColors = {
        "Рюкзак «Hellboy»": "#9F9FED",
        "Штурмовой рюкзак Tri-Zip": "#9F9FED",
        "Рюкзак MBSS": "#9DEB9D",
        "Рюкзак Errand Junior": "#9DEB9D",
        "Спортивная сумка": "#9DEB9D",
        "Сумка-трансформер": "#EEEEEE"
    };

    const attachmentNameColors = {
        "SIG Sauer SRD762Ti": "#BF5BAD",
        "Глушитель SCAR-SD": "#9F9FED",
        "CMMG SV Brake 7.62x51": "#9F9FED",
        "Пламегаситель Noveske KX3": "#9DEB9D",
        "VG6 EPSILON 762 Muzzle Brake": "#BF5BAD",
        "Keeno Arms SHREWD 7.62x51": "#9F9FED",
        "Odin Works ATLAS 7.62x51": "#BF5BAD",
        "SureFire Pro Comp 7.62x51": "#9F9FED",
        "Precision Armament M11 Severe Duty 7.62x51": "#9F9FED",
        "Resistance Armament Compensator": "#9DEB9D",
        "Venom Tactical Antidote": "#BF5BAD",
        "SPRV 7.62": "#9F9FED",
        "Spikes Tactical Dynacomp": "#9F9FED",
        "Пламегаситель AKademia Тьма": "#9DEB9D",
        "Jmac Customs RDC 4C 7.62": "#BF5BAD",
        "ДТК «Косой»": "#9F9FED",
        "АКМЛ": "#9F9FED",
        "ДТК-2": "#9DEB9D",
        "Глушитель KAC Style QD": "#BF5BAD",
        "Глушитель SureFire SOCOM556-RC2": "#9F9FED",
        "Diamondhead Compensator": "#9F9FED",
        "VG6 EPSILON 556 Muzzle Brake": "#BF5BAD",
        "HK BLITZ 5.56": "#9F9FED",
        "Bulletec ST-6012": "#BF5BAD",
        "AlienTech 5.56": "#9F9FED",
        "Hera Arms CC Compensator": "#9F9FED",
        "Имкас ПСУЗВ–11ТМ.12": "#BF5BAD",
        "ПБС-4": "#9F9FED",
        "ДТК «Вихрь»": "#9F9FED",
        "Глушитель АТГ": "#BF5BAD",
        "ПБС-1": "#9F9FED",
        "ДТК Цитадель 5.45": "#BF5BAD",
        "SPRV MBR Jet": "#9F9FED",
        "Jmac Customs RDC 4C 5.45": "#BF5BAD",
        "PWS CQB 74": "#9F9FED",
        "ДТК-1": "#9F9FED",
        "GE-OCTO Gunethics": "#BF5BAD",
        "Hi-Point Razor": "#9F9FED",
        "3 Port Mini Compensator": "#9F9FED",
        "VR-09": "#9DEB9D",
        "Удлиненный ствол 9 мм": "#BF5BAD",
        "Custom Guns Doncaster": "#9F9FED",
        "Пламегаситель LoneWolf": "#9F9FED",
        "MICRO BADGER": "#9DEB9D",
        "Глушитель Osprey": "#BF5BAD",
        "Глушитель С.К.О.С. МДУ SUPRA K-8 Integral": "#9F9FED",
        "ДТК АШ-12": "#EA9D9E",
        "Рукоятка для ОЦ-14 «Гроза»": "#BF5BAD",
        "Глушитель АШ-12/МЦ-558": "#EA9D9E",
        "Глушитель для ОЦ-14 «Гроза»": "#BF5BAD",
        "Удлиненный ствол D-Eagle": "#BF5BAD",
        "АКС-74": "#9DEB9D",
        "АК-74М": "#9DEB9D",
        "АН-94 «Абакан»": "#9F9FED",
        "АН-94М «Абакан»": "#BF5BAD",
        "АЕК-971": "#BF5BAD",
        "А-545": "#EA9D9E",
        "FN F2000 Tactical": "#EA9D9E",
        "FN F2000": "#BF5BAD",
        "HK G36C": "#BF5BAD",
        "SIG SG 550": "#BF5BAD",
        "L86A1": "#BF5BAD",
        "M4A1 CQC": "#BF5BAD",
        "L85A1": "#BF5BAD",
        "Поношенный SIG SG 550": "#9F9FED",
        "Поношенная L86A1": "#9F9FED",
        "M4A1": "#9F9FED",
        "Поношенная L85A1": "#9F9FED",
        "M16A3": "#9DEB9D",
        "M16A2": "#9DEB9D",
        "АКМ": "#9F9FED",
        "АК-15": "#EA9D9E",
        "АК-203": "#BF5BAD",
        "АК-103": "#BF5BAD",
        "HK G3A1": "#BF5BAD",
        "Поношенная HK G3A1": "#BF5BAD",
        "ПКП «Печенег»": "#EA9D9E",
        "Поношенный ПКП": "#BF5BAD",
        "РПД": "#BF5BAD",
        "РПК-74": "#BF5BAD",
        "L96A1": "#EA9D9E",
        "M40A5": "#BF5BAD",
        "Поношенная M40A5": "#BF5BAD",
        "Winchester M70": "#9F9FED",
        "Поношенный Winchester M70": "#9DEB9D",
        "Винтовка Мосина": "#9DEB9D",
        "СВД-М": "#EA9D9E",
        "СВД-С": "#BF5BAD",
        "СВУ": "#BF5BAD",
        "СВД": "#BF5BAD",
        "СВТ-40": "#9F9FED",
        "СКТ-40": "#9DEB9D",
        "Mk 14 EBR": "#EA9D9E",
        "M1A FA": "#BF5BAD",
        "M1A": "#BF5BAD",
        "СКС-Т": "#9F9FED",
        "СКС": "#9DEB9D",
        "АМБ-17": "#EA9D9E",
        "АС «Вал»": "#BF5BAD",
        "АКМ «Тишина»": "#BF5BAD",
        "СР-3М": "#EA9D9E",
        "СР-3 «Вихрь»": "#BF5BAD",
        "СР-2М «Вереск»": "#BF5BAD",
        "ПП-2000": "#9F9FED",
        "«Гепард»": "#9DEB9D",
        "ПП-91 «Кедр»": "#9DEB9D",
        "ВСС-М «Винторез»": "#EA9D9E",
        "ВСС «Винторез»": "#BF5BAD",
        "ППК-20": "#EA9D9E",
        "«Витязь-СН»": "#BF5BAD",
        "ПП-19-01 «Витязь»": "#BF5BAD",
        "АЕК-919К «Каштан»": "#9F9FED",
        "TDI KRISS Vector": "#EA9D9E",
        "FN P90": "#BF5BAD",
        "Beretta Mx4 Storm": "#BF5BAD",
        "HK MP5": "#BF5BAD",
        "ПП-19 «Бизон-2-01»": "#BF5BAD",
        "HK UMP45": "#BF5BAD",
        "Spectre M4": "#9F9FED",
        "Vz.68 Scorpion": "#9DEB9D",
        "IMI Uzi": "#9DEB9D",
        "ОЦ-33 «Пернач»": "#EA9D9E",
        "Glock 17": "#BF5BAD",
        "Beretta 93R": "#BF5BAD",
        "Beretta 92FS": "#BF5BAD",
        "Форт-12": "#9F9FED",
        "Walther P99": "#9F9FED",
        "Mauser C96": "#9F9FED",
        "ТТ": "#9DEB9D",
        "Desert Eagle Mark XIX": "#EA9D9E",
        "Desert Eagle Mark VII": "#BF5BAD",
        "SW1911": "#BF5BAD",
        "Browning Hi-Power": "#9F9FED",
        "АШ-12": "#EA9D9E",
        "ОЦ-14 «Гроза»": "#BF5BAD",
        "ВССК «Выхлоп»": "#EA9D9E",
        "МЦ-558": "#BF5BAD",
        "РШ-12": "#EA9D9E",
        "Colt Python": "#BF5BAD",
        "Поношенный Colt Python": "#BF5BAD",
        "Protecta": "#BF5BAD",
        "Сайга-12К": "#BF5BAD",
        "МР-153": "#9F9FED",
        "Franchi SPAS-12": "#9F9FED",
        "МР-133": "#9DEB9D",
        "Mossberg 590A1": "#9DEB9D",
        "ТОЗ-34": "#9DEB9D",
        "Shorty 590": "#9DEB9D",
        "Кукри": "#EA9D9E",
        "Мачете Survival SP8 Ontario": "#BF5BAD",
        "Охотничий мачете": "#BF5BAD",
        "Тактический нож Ka-Bar BKR3": "#9F9FED",
        "Охотничий нож": "#9F9FED",
        "Нож 6Х9": "#9DEB9D",
        "Антитеррор": "#EA9D9E",
        "Тактическая катана": "#EA9D9E",
        "ОЦ-04": "#BF5BAD",
        "Штык-нож M9": "#BF5BAD",
        "Glock Feldmesser 78": "#9F9FED",
        "Монтировка": "#9F9FED",
        "КО-1": "#9DEB9D",
        "Молоток": "#9DEB9D",
        "АКС чистильщика": "#9DEB9D",
        "Бронескелет «Центурион»": "#EA9D9E",
        "Тяжелый бронекостюм «Легионер»": "#BF5BAD",
        "Бронекостюм «Гоплит»": "#BF5BAD",
        "Бронекостюм «Страйкер»": "#9F9FED",
        "Бронекостюм «Червь/Комбат-5М»": "#9DEB9D",
        "Костюм «Скаут»": "#9DEB9D",
        "Экзоброня «Зверобой»": "#EA9D9E",
        "Экзоброня «Егерь»": "#BF5BAD",
        "Защитный костюм «Ош»": "#BF5BAD",
        "Защитный костюм «Ворса»": "#9F9FED",
        "Костюм «Траппер»": "#9DEB9D",
        "Защитный костюм «Псарь»": "#9DEB9D",
        "Экзоскелет «Туз/Мул»": "#EA9D9E",
        "Экзоскелет «Масть/Самсон»": "#BF5BAD",
        "Tяжелый бронекостюм «Громила/Восход»": "#BF5BAD",
        "Бронекостюм «Пересмешник/Сокол»": "#9F9FED",
        "Костюм «Клептоман/Грибник»": "#9DEB9D",
        "Бандитский костюм/Аврора с противогазом": "#9DEB9D",
        "Бронекостюм «Скиф-5»": "#EA9D9E",
        "Бронекостюм «Скиф-4»": "#BF5BAD",
        "Бронекостюм «Пахан/Скиф-2м»": "#BF5BAD",
        "УКАЗ АО-6 «Кочевник»": "#EA9D9E",
        "УКАЗ АО-5 «Пилигрим»": "#BF5BAD",
        "УКАЗ АО-4 «Рейдер»": "#BF5BAD",
        "Костюм АО-3 «Искатель»": "#9F9FED",
        "Костюм АО-2 «Странник»": "#9DEB9D",
        "ИП-4м": "#e6e6e6",
        "Комбинезон «Сатурн»": "#EA9D9E",
        "Комбинезон «Жнец/Уран»": "#BF5BAD",
        "КИМ-99М «Малахит»": "#BF5BAD",
        "КИМ-99 «Янтарь»": "#9F9FED",
        "Бандитский костюм с баллонами/Аврора-Б": "#9DEB9D",
        "Сверхтяжелый бронекостюм": "#EA9D9E",
        "Бронекостюм «Авангард»": "#EA9D9E",
        "Бронекостюм «Каратель»": "#EA9D9E",
        "Экзокостюм «Гончий»": "#EA9D9E",
        "Комбинезон «Пересвет»": "#EA9D9E",
    };

    const magNameColors = {
        "Увеличенный магазин Beretta": "#9F9FED",
        "Барабанный магазин X-5": "#9F9FED",
        "Увеличенный магазин Colt": "#9F9FED",
        "Увеличенный магазин Browning": "#9F9FED",
        "Увеличенный магазин Форт-12": "#9DEB9D",
        "Увеличенный магазин «Кобра»": "#BF5BAD",
        "Барабанный магазин G3/M1A": "#EA9D9E",
        "Магазин 7.62 пластиковый": "#BF5BAD",
        "Магазин 7.62 бакелитовый": "#9F9FED",
        "Магазин 5.45 PMAG, черный": "#9F9FED",
        "Магазин Magpul PMAG 7.62x39": "#BF5BAD",
        "Магазин АКМ десантный": "#BF5BAD",
        "Магазин PMAG GEN2 M2 MOE": "#BF5BAD",
        "Магазин 5.56 Pufgun, черный": "#BF5BAD",
        "Магазин 5.56 NATO PMAG, черный": "#9F9FED",
        "Магазин 5.56 NATO STANAG": "#9F9FED",
        "Магазин 5.56 NATO STANAG (20 пт.)": "#9DEB9D",
        "Магазин 5.56 NATO STANAG (60 пт.)": "#BF5BAD",
        "Магазин EMAG": "#BF5BAD",
        "Магазин 5.56 NATO STANAG (45 пт.)": "#BF5BAD",
        "Увеличенный магазин для ВСС/Вал": "#BF5BAD",
        "Магазин эргономичный для ВСС/Вал": "#BF5BAD",
        "Увеличенный магазин АШ-12": "#EA9D9E",
        "Увеличенный магазин ОЦ-14": "#BF5BAD",
        "Магазин 5.45": "#BF5BAD",
        "Магазин 5.45 пластиковый": "#BF5BAD",
        "Магазин 5.45 бакелитовый": "#9F9FED",
        "Магазин MAG SG545": "#BF5BAD",
        "Магазин 5.45 «Вафля»": "#BF5BAD",
        "Удлинитель магазина МР-133/МР-153": "#9DEB9D",
    };

    const forendNameColors = {
        "Цевье для Сайга-12К": "#BF5BAD",
    };

    const bracketNameColors = {
        "Боковой кронштейн с планкой Пикатинни": "#9F9FED",
        "Повышающая RIS-планка": "#9F9FED",
        "Направляющая RIS для дробовиков": "#9DEB9D",
        "Планка с базой Пикатинни": "#9DEB9D",
    };

    const otherNameColors = {
        "Тактический блок Зенит «Перст-3»": "#BF5BAD",
        "HQ ISSUE Low-Profile Laser Sight (красный лазер)": "#9F9FED",
        "Лазерный целеуказатель «Клещ-2ПС»": "#9F9FED",
        "HQ ISSUE Mini Laser Sight (зеленый лазер)": "#9DEB9D",
        "РК-1": "#BF5BAD",
        "РК-0": "#9F9FED",
        "Вертикальная рукоятка ANG4": "#9F9FED",
        "РК-5": "#9DEB9D",
        "Magpul RVG": "#BF5BAD",
        "Вертикальная рукоятка Tapco": "#9F9FED",
        "Тактическая рукоятка KAC Vertical Foregrip": "#9F9FED",
        "Рукоять переноса огня FMA DARK EARTH": "#9DEB9D",
        "Тактическая рукоятка Fortis SHIFT Vertical, черная": "#BF5BAD",
        "FX PTKB FAB Defense": "#9F9FED",
        "Тактическая рукоятка Magpul AFG": "#9F9FED",
        "Тактическая рукоятка FMA TD Grip": "#9DEB9D",
        "ГП-25 «Костер»": "#BF5BAD",
        "M203": "#BF5BAD",
    };

    const deviceNameColors = {
        "Штурмовой ПНВ (синий/белый/зеленый)": "#EA9D9E",
        "Штурмовой ПНВ": "#BF5BAD",
        "Штурмовой ПНВ ": "#9F9FED",
        "Детектор узкого диапазона «Свеча»": "#9DEB9D",
        "СН-1 «Блин»": "#e6e6e6",
        "СН-1у «Блинчик»": "#e6e6e6",
    };

    const sightNameColors = {
        "Прицел оптический Trijicon AccuPoint": "#BF5BAD",
        "Прицел оптический Trijicon ACOG": "#9F9FED",
        "Прицел оптический Elcan": "#9F9FED",
        "Прицел оптический ПОСП": "#9F9FED",
        "Прицел оптический ПСО": "#9F9FED",
        "Прицел оптический Elcan M145": "#9F9FED",
        "Прицел оптический Барс": "#9F9FED",
        "Прицел оптический Пилад 3.5х20": "#9F9FED",
        "Прицел оптический 1П77": "#9DEB9D",
        "Прицел оптический Trijicon ACOG ": "#9DEB9D",
        "Прицел оптический ПСО ": "#9DEB9D",
        "Прицел оптический Leupold": "#9DEB9D",
        "Прицел оптический SUSAT": "#9DEB9D",
        "Прицел оптический «Тюльпан»": "#9DEB9D",
        "Прицел оптический ПУ на боковой кронштейн": "#e6e6e6",
        "Прицел оптический ПУ для СВТ": "#e6e6e6",
        "Прицел коллиматорный «Bering OPTICS»": "#9F9FED",
        "Прицел коллиматорный Vortex": "#9F9FED",
        "Прицел коллиматорный Trijicon": "#9F9FED",
        "Прицел коллиматорный Sig Sauer": "#9F9FED",
        "Прицел коллиматорный «ПК-АС»": "#9F9FED",
        "Прицел коллиматорный Trijicon ": "#9DEB9D",
        "Прицел коллиматорный BSA Reflex": "#9DEB9D",
        "Прицел широкоугольный «Ракурс»": "#9DEB9D",
        "Прицел коллиматорный LaRue": "#9DEB9D",
        "Прицел коллиматорный «Валдай»": "#9DEB9D",
        "Прицел коллиматорный «Кобра»": "#9DEB9D",
        "Прицел коллиматорный EoTech": "#9DEB9D",
    };

    const skinNameColors = {
        "«Лимб»": "#e6e6e6",
    };

    const skanNameColors = {
        "Детектор широкого диапазона САК-1": "#9DEB9D",
    };

    // Пресеты брони и оружия с рангами
    const presetsData = {
        armor: [
            { id: "armor1", name: "Бронескелет «Центурион»", image: "images/armor/centurion.webp", rank: "Ветка Центуриона", resources: { ryzhiy_paporotnik: 1186, veshestvo_07270: 4610, psi_mayachok: 1346, gamma_fragment: 1066, kvantovaya_batareya: 1638 } },
            { id: "armor2", name: "Тяжелый бронекостюм «Легионер»", image: "images/armor/legioner.webp", rank: "Ветка Центуриона", resources: { ryzhiy_paporotnik: 570, veshestvo_07270: 2214, psi_mayachok: 646, gamma_fragment: 512, kvantovaya_batareya: 787 } },
            { id: "armor3", name: "Бронекостюм «Гоплит»", image: "images/armor/goplit.webp", rank: "Ветка Центуриона", resources: { severny_moh: 871, durman_kamen: 1217, ostatki_akkumulyatora: 366, beta_fragment: 153 } },
            { id: "armor4", name: "Бронекостюм «Страйкер»", image: "images/armor/striker.webp", rank: "Ветка Центуриона", resources: { romashka: 206, rassolnik: 209, radioperedatchik: 106, alfa_fragment: 38 } },
            { id: "armor5", name: "Бронекостюм «Червь/Комбат-5М»", image: "images/armor/worm.webp", rank: "Ветка Центуриона", resources: { koren_vonyuchka: 67, srachnik: 81, mednaya_provoloka: 55 } },
            { id: "armor6", name: "Костюм «Скаут»", image: "images/armor/scout.webp", rank: "Ветка Центуриона", resources: { green_plesen: 27, bolotny_kamen: 57 } },
            { id: "armor7", name: "Экзоброня «Зверобой»", image: "images/armor/furryeb.webp", rank: "Ветка Зверобоя", resources: { ryzhiy_paporotnik: 3303, veshestvo_07270: 4171, psi_mayachok: 2063, gamma_fragment: 1350 } },
            { id: "armor8", name: "Экзоброня «Егерь»", image: "images/armor/eger.webp", rank: "Ветка Зверобоя", resources: { ryzhiy_paporotnik: 1587, veshestvo_07270: 2004, psi_mayachok: 991, gamma_fragment: 649 } },
            { id: "armor9", name: "Защитный костюм «Ош»", image: "images/armor/osh.webp", rank: "Ветка Зверобоя", resources: { severny_moh: 1788, durman_kamen: 593, ostatki_akkumulyatora: 443, beta_fragment: 126 } },
            { id: "armor10", name: "Защитный костюм «Ворса»", image: "images/armor/vorsa.webp", rank: "Ветка Зверобоя", resources: { romashka: 423, rassolnik: 102, radioperedatchik: 128, alfa_fragment: 32 } },
            { id: "armor11", name: "Костюм «Траппер»", image: "images/armor/trapper.webp", rank: "Ветка Зверобоя", resources: { koren_vonyuchka: 134, srachnik: 41, mednaya_provoloka: 55 } },
            { id: "armor12", name: "Защитный костюм «Псарь»", image: "images/armor/psar.webp", rank: "Ветка Зверобоя", resources: { green_plesen: 55, bolotny_kamen: 28 } },
            { id: "armor13", name: "Экзоскелет «Туз/Мул»", image: "images/armor/tuz.webp", rank: "Ветка Экзоскелета", resources: { ryzhiy_paporotnik: 1609, veshestvo_07270: 4171, psi_mayachok: 1705, gamma_fragment: 1350, kvantovaya_batareya: 1123 } },
            { id: "armor14", name: "Экзоскелет «Масть/Самсон»", image: "images/armor/mast.webp", rank: "Ветка Экзоскелета", resources: { ryzhiy_paporotnik: 773, veshestvo_07270: 2004, psi_mayachok: 819, gamma_fragment: 649, kvantovaya_batareya: 540 } },
            { id: "armor15", name: "Tяжелый бронекостюм «Громила/Восход»", image: "images/armor/gromila.webp", rank: "Ветка Экзоскелета", resources: { severny_moh: 1146, durman_kamen: 780, ostatki_akkumulyatora: 481, beta_fragment: 166 } },
            { id: "armor16", name: "Бронекостюм «Пересмешник/Сокол»", image: "images/armor/peresm.webp", rank: "Ветка Экзоскелета", resources: { romashka: 239, rassolnik: 182, radioperedatchik: 122, alfa_fragment: 37 } },
            { id: "armor17", name: "Костюм «Клептоман/Грибник»", image: "images/armor/kleptoman.webp", rank: "Ветка Экзоскелета", resources: { koren_vonyuchka: 78, srachnik: 68, mednaya_provoloka: 64 } },
            { id: "armor18", name: "Бандитский костюм/Аврора с противогазом", image: "images/armor/bksp.webp", rank: "Ветка Экзоскелета", resources: { green_plesen: 33, bolotny_kamen: 51 } },
            { id: "armor19", name: "Бронекостюм «Скиф-5»", image: "images/armor/skuf.webp", rank: "Ветка Скифа", resources: { ryzhiy_paporotnik: 1525, veshestvo_07270: 5269, psi_mayachok: 1615, gamma_fragment: 1279, kvantovaya_batareya: 1030 } },
            { id: "armor20", name: "Бронекостюм «Скиф-4»", image: "images/armor/skif4.webp", rank: "Ветка Скифа", resources: { ryzhiy_paporotnik: 732, veshestvo_07270: 2531, psi_mayachok: 776, gamma_fragment: 614, kvantovaya_batareya: 495 } },
            { id: "armor21", name: "Бронекостюм «Пахан/Скиф-2м»", image: "images/armor/pahan.webp", rank: "Ветка Скифа", resources: { severny_moh: 1009, durman_kamen: 1061, ostatki_akkumulyatora: 423, beta_fragment: 146 } },
            { id: "armor22", name: "Бронекостюм «Пересмешник/Сокол»", image: "images/armor/peresm.webp", rank: "Ветка Скифа", resources: { romashka: 239, rassolnik: 182, radioperedatchik: 122, alfa_fragment: 37 } },
            { id: "armor23", name: "Костюм «Клептоман/Грибник»", image: "images/armor/kleptoman.webp", rank: "Ветка Скифа", resources: { koren_vonyuchka: 78, srachnik: 68, mednaya_provoloka: 64 } },
            { id: "armor24", name: "Бандитский костюм/Аврора с противогазом", image: "images/armor/bksp.webp", rank: "Ветка Скифа", resources: { green_plesen: 33, bolotny_kamen: 51 } },
            { id: "armor25", name: "УКАЗ АО-6 «Кочевник»", image: "images/armor/aoshka.webp", rank: "Ветка АО", resources: { ryzhiy_paporotnik: 2202, veshestvo_07270: 3512, psi_mayachok: 1435, gamma_fragment: 1848, kvantovaya_batareya: 749 } },
            { id: "armor26", name: "УКАЗ АО-5 «Пилигрим»", image: "images/armor/ao5.webp", rank: "Ветка АО", resources: { ryzhiy_paporotnik: 1058, veshestvo_07270: 1687, psi_mayachok: 690, gamma_fragment: 887, kvantovaya_batareya: 360 } },
            { id: "armor27", name: "УКАЗ АО-4 «Рейдер»", image: "images/armor/ao4.webp", rank: "Ветка АО", resources: { severny_moh: 1376, durman_kamen: 624, ostatki_akkumulyatora: 385, beta_fragment: 199 } },
            { id: "armor28", name: "Костюм АО-3 «Искатель»", image: "images/armor/ao3.webp", rank: "Ветка АО", resources: { romashka: 325, rassolnik: 107, radioperedatchik: 111, alfa_fragment: 50 } },
            { id: "armor29", name: "Костюм АО-2 «Странник»", image: "images/armor/ao2.webp", rank: "Ветка АО", resources: { koren_vonyuchka: 107, srachnik: 44, mednaya_provoloka: 73 } },
            { id: "armor30", name: "ИП-4м", image: "images/armor/ip4m.webp", rank: "Ветка АО", resources: { green_plesen: 82 } },
            { id: "armor31", name: "Комбинезон «Сатурн»", image: "images/armor/paket.webp", rank: "Ветка Сатурна", resources: { ryzhiy_paporotnik: 2202, veshestvo_07270: 2195, psi_mayachok: 2333, gamma_fragment: 2700 } },
            { id: "armor32", name: "Комбинезон «Жнец/Уран»", image: "images/armor/znec.webp", rank: "Ветка Сатурна", resources: { ryzhiy_paporotnik: 1058, veshestvo_07270: 1055, psi_mayachok: 1120, gamma_fragment: 1297 } },
            { id: "armor33", name: "КИМ-99М «Малахит»", image: "images/armor/kim.webp", rank: "Ветка Сатурна", resources: { severny_moh: 1192, durman_kamen: 312, ostatki_akkumulyatora: 500, beta_fragment: 252 } },
            { id: "armor34", name: "КИМ-99 «Янтарь»", image: "images/armor/yantar.webp", rank: "Ветка Сатурна", resources: { romashka: 282, rassolnik: 54, radioperedatchik: 145, alfa_fragment: 63 } },
            { id: "armor35", name: "Бандитский костюм с баллонами/Аврора-Б", image: "images/armor/bksb.webp", rank: "Ветка Сатурна", resources: { koren_vonyuchka: 134, mednaya_provoloka: 111 } },
            { id: "armor36", name: "ИП-4м", image: "images/armor/ip4m.webp", rank: "Ветка Сатурна", resources: { green_plesen: 82 } },
            { id: "armor37", name: "Сверхтяжелый бронекостюм", image: "images/armor/banka.webp", rank: "Фракционная броня", resources: { ryzhiy_paporotnik: 1755, veshestvo_07270: 9099, psi_mayachok: 1859, gamma_fragment: 1683, kvantovaya_batareya: 1940 } },
            { id: "armor38", name: "Бронекостюм «Авангард»", image: "images/armor/avangard.webp", rank: "Фракционная броня", resources: { ryzhiy_paporotnik: 2508, veshestvo_07270: 6499, psi_mayachok: 2656, gamma_fragment: 2104, kvantovaya_batareya: 1386 } },
            { id: "armor39", name: "Бронекостюм «Каратель»", image: "images/armor/karatel.webp", rank: "Фракционная броня", resources: { ryzhiy_paporotnik: 2132, veshestvo_07270: 7799, psi_mayachok: 2258, gamma_fragment: 1788, kvantovaya_batareya: 1732 } },
            { id: "armor40", name: "Экзокостюм «Гончий»", image: "images/armor/kust.webp", rank: "Фракционная броня", resources: { ryzhiy_paporotnik: 2132, veshestvo_07270: 7799, psi_mayachok: 2258, gamma_fragment: 1788, kvantovaya_batareya: 1732 } },
            { id: "armor41", name: "Комбинезон «Пересвет»", image: "images/armor/peresvet.webp", rank: "Фракционная броня", resources: { ryzhiy_paporotnik: 3260, veshestvo_07270: 3250, psi_mayachok: 3453, gamma_fragment: 3997 } },
        ],
        weapons: [
            { id: "weapon1", name: "А-545", image: "images/weapon/545.webp", rank: "Ветка А-545", resources: { ryzhiy_paporotnik: 1220, veshestvo_07270: 4939, psi_mayachok: 1534, gamma_fragment: 1023, kvantovaya_batareya: 1011 } },
            { id: "weapon2", name: "FN F2000 Tactical", image: "images/weapon/fnt.webp", rank: "Ветка FN F2000 Tactical", resources: { ryzhiy_paporotnik: 1220, veshestvo_07270: 4939, psi_mayachok: 1292, gamma_fragment: 1215, kvantovaya_batareya: 1011 } },
            { id: "weapon3", name: "АК-15", image: "images/weapon/ak15.webp", rank: "Ветка АК-15", resources: { ryzhiy_paporotnik: 1220, veshestvo_07270: 4939, psi_mayachok: 1292, gamma_fragment: 1215, kvantovaya_batareya: 1011 } },
            { id: "weapon4", name: "ПКП «Печенег»", image: "images/weapon/pkp.webp", rank: "Ветка ПКП", resources: { ryzhiy_paporotnik: 1152, veshestvo_07270: 4390, psi_mayachok: 1220, gamma_fragment: 966, kvantovaya_batareya: 899 } },
            { id: "weapon5", name: "L96A1", image: "images/weapon/l96.webp", rank: "Ветка L96A1", resources: { veshestvo_07270: 4763, psi_mayachok: 1295, gamma_fragment: 1040, kvantovaya_batareya: 1016 } },
            { id: "weapon6", name: "СВД-М", image: "images/weapon/svdm.webp", rank: "Ветка СВД-М", resources: { veshestvo_07270: 4763, psi_mayachok: 1295, gamma_fragment: 1040, kvantovaya_batareya: 1016 } },
            { id: "weapon7", name: "Mk 14 EBR", image: "images/weapon/ebr.webp", rank: "Ветка Mk 14 EBR", resources: { veshestvo_07270: 4763, psi_mayachok: 1295, gamma_fragment: 1040, kvantovaya_batareya: 1016 } },
            { id: "weapon8", name: "АМБ-17", image: "images/weapon/amb.webp", rank: "Ветка АМБ-17", resources: { ryzhiy_paporotnik: 1220, veshestvo_07270: 4939, psi_mayachok: 1534, gamma_fragment: 1023, kvantovaya_batareya: 1011 } },
            { id: "weapon9", name: "СР-3М", image: "images/weapon/cp3m.webp", rank: "Ветка СР-3М", resources: { ryzhiy_paporotnik: 1044, veshestvo_07270: 4234, psi_mayachok: 1312, gamma_fragment: 888, kvantovaya_batareya: 867 } },
            { id: "weapon10", name: "ВСС-М «Винторез»", image: "images/weapon/vssm.webp", rank: "Ветка ВСС-М «Винторез»", resources: { veshestvo_07270: 4763, psi_mayachok: 1476, gamma_fragment: 999, kvantovaya_batareya: 975 } },
            { id: "weapon11", name: "ППК-20", image: "images/weapon/ppk.webp", rank: "Ветка ППК-20", resources: { ryzhiy_paporotnik: 1044, veshestvo_07270: 4234, psi_mayachok: 1312, gamma_fragment: 888, kvantovaya_batareya: 867 } },
            { id: "weapon12", name: "TDI KRISS Vector", image: "images/weapon/vector.webp", rank: "Ветка TDI KRISS Vector", resources: { ryzhiy_paporotnik: 1044, veshestvo_07270: 4234, psi_mayachok: 1105, gamma_fragment: 1054, kvantovaya_batareya: 867 } },
            { id: "weapon13", name: "ОЦ-33 «Пернач»", image: "images/weapon/pernach.webp", rank: "Ветка ОЦ-33 «Пернач»", resources: { ryzhiy_paporotnik: 943, veshestvo_07270: 2444, psi_mayachok: 1469, gamma_fragment: 1163, kvantovaya_batareya: 490 } },
            { id: "weapon14", name: "Desert Eagle Mark XIX", image: "images/weapon/deagle.webp", rank: "Ветка Desert Eagle Mark XIX", resources: { ryzhiy_paporotnik: 943, veshestvo_07270: 2444, psi_mayachok: 1469, gamma_fragment: 1163, kvantovaya_batareya: 490 } },
            { id: "weapon15", name: "АШ-12", image: "images/weapon/ash.webp", rank: "Ветка АШ-12", resources: { gorkolistnik: 2043, limb: 2114, lambda_fragment: 382, anomalnaya_batareya: 68, limboplazma: 31 } },
            { id: "weapon16", name: "ВССК «Выхлоп»", image: "images/weapon/vssk.webp", rank: "Ветка ВССК «Выхлоп»", resources: { limb: 2348, lambda_fragment: 402, anomalnaya_batareya: 73, limboplazma: 15 } },
            { id: "weapon17", name: "РШ-12", image: "images/weapon/rsh.webp", rank: "Ветка РШ-12", resources: { gorkolistnik: 1487, limb: 1310, lambda_fragment: 387, anomalnaya_batareya: 40, limboplazma: 15 } },
            { id: "weapon18", name: "Кукри", image: "images/weapon/kukri.webp", rank: "Ветка Кукри", resources: { ryzhiy_paporotnik: 635, psi_mayachok: 449, gamma_fragment: 533, kvantovaya_batareya: 234 } },
            { id: "weapon19", name: "Антитеррор", image: "images/weapon/anti.webp", rank: "Ножи", resources: { ryzhiy_paporotnik: 960, veshestvo_07270: 1040, psi_mayachok: 450, gamma_fragment: 320, kvantovaya_batareya: 350 } },
            { id: "weapon20", name: "Тактическая катана", image: "images/weapon/katana.webp", rank: "Ножи", resources: { ryzhiy_paporotnik: 960, veshestvo_07270: 1040, psi_mayachok: 450, gamma_fragment: 320, kvantovaya_batareya: 350 } },
            { id: "weapon21", name: "АЕК-971", image: "images/weapon/aek.webp", rank: "Ветка А-545", resources: { ryzhiy_paporotnik: 586, veshestvo_07270: 2373, psi_mayachok: 737, gamma_fragment: 492, kvantovaya_batareya: 486 } },
            { id: "weapon22", name: "АН-94М «Абакан»", image: "images/weapon/abakan.webp", rank: "Ветка А-545", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 450, beta_fragment: 125 } },
            { id: "weapon23", name: "АС «Вал»", image: "images/weapon/val.webp", rank: "Ветка АМБ-17", resources: { ryzhiy_paporotnik: 586, veshestvo_07270: 2373, psi_mayachok: 737, gamma_fragment: 492, kvantovaya_batareya: 486 } },
            { id: "weapon24", name: "АКМ «Тишина»", image: "images/weapon/akmt.webp", rank: "Ветка АМБ-17", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 450, beta_fragment: 125 } },
            { id: "weapon25", name: "ВСС «Винторез»", image: "images/weapon/vss.webp", rank: "Ветка ВСС-М «Винторез»", resources: { ryzhiy_paporotnik: 564, veshestvo_07270: 2288, psi_mayachok: 709, gamma_fragment: 480, kvantovaya_batareya: 469 } },
            { id: "weapon26", name: "АК-203", image: "images/weapon/203.webp", rank: "Ветка АК-15", resources: { ryzhiy_paporotnik: 586, veshestvo_07270: 2373, psi_mayachok: 737, gamma_fragment: 492, kvantovaya_batareya: 486 } },
            { id: "weapon27", name: "АК-103", image: "images/weapon/103.webp", rank: "Ветка АК-15", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 450, beta_fragment: 125 } },
            { id: "weapon28", name: "ОЦ-14 «Гроза»", image: "images/weapon/groza.webp", rank: "Ветка АШ-12", resources: { gorkolistnik: 982, limb: 1015, lambda_fragment: 184, anomalnaya_batareya: 33, limboplazma: 14 } },
            { id: "weapon29", name: "Поношенный ПКП", image: "images/weapon/pkp.webp", rank: "Ветка ПКП", resources: { ryzhiy_paporotnik: 553, veshestvo_07270: 2109, psi_mayachok: 586, gamma_fragment: 464, kvantovaya_batareya: 432 } },
            { id: "weapon30", name: "РПД", image: "images/weapon/rpd.webp", rank: "Ветка ПКП", resources: { severny_moh: 764, durman_kamen: 804, ostatki_akkumulyatora: 321, beta_fragment: 111 } },
            { id: "weapon31", name: "РПК-74", image: "images/weapon/rpk74.webp", rank: "Ветка ПКП", resources: { severny_moh: 764, durman_kamen: 804, ostatki_akkumulyatora: 321, beta_fragment: 111 } },
            { id: "weapon32", name: "HK G3A1", image: "images/weapon/hk.webp", rank: "Ветка АК-15", resources: { ryzhiy_paporotnik: 586, veshestvo_07270: 2373, psi_mayachok: 621, gamma_fragment: 584, kvantovaya_batareya: 486 } },
            { id: "weapon33", name: "Поношенная HK G3A1", image: "images/weapon/phk.webp", rank: "Ветка АК-15", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 450, beta_fragment: 125 } },
            { id: "weapon34", name: "FN F2000", image: "images/weapon/f2000.webp", rank: "Ветка FN F2000 Tactical", resources: { ryzhiy_paporotnik: 586, veshestvo_07270: 2373, psi_mayachok: 621, gamma_fragment: 584, kvantovaya_batareya: 486 } },
            { id: "weapon35", name: "HK G36C", image: "images/weapon/g36c.webp", rank: "Ветка FN F2000 Tactical", resources: { ryzhiy_paporotnik: 586, veshestvo_07270: 2373, psi_mayachok: 621, gamma_fragment: 584, kvantovaya_batareya: 486 } },
            { id: "weapon36", name: "SIG SG 550", image: "images/weapon/sig.webp", rank: "Ветка FN F2000 Tactical", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 364, beta_fragment: 155 } },
            { id: "weapon37", name: "L86A1", image: "images/weapon/l86a1.webp", rank: "Ветка FN F2000 Tactical", resources: { severny_moh: 908, durman_kamen: 941, ostatki_akkumulyatora: 381, beta_fragment: 163 } },
            { id: "weapon38", name: "M4A1 CQC", image: "images/weapon/cqc.webp", rank: "Ветка FN F2000 Tactical", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 364, beta_fragment: 155 } },
            { id: "weapon39", name: "L85A1", image: "images/weapon/l85a1.webp", rank: "Ветка FN F2000 Tactical", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 364, beta_fragment: 155 } },
            { id: "weapon40", name: "СР-3 «Вихрь»", image: "images/weapon/vihr.webp", rank: "Ветка СР-3М", resources: { ryzhiy_paporotnik: 501, veshestvo_07270: 2034, psi_mayachok: 630, gamma_fragment: 426, kvantovaya_batareya: 416 } },
            { id: "weapon41", name: "СР-2М «Вереск»", image: "images/weapon/veresk.webp", rank: "Ветка СР-3М", resources: { severny_moh: 770, durman_kamen: 799, ostatki_akkumulyatora: 400, beta_fragment: 111 } },
            { id: "weapon42", name: "«Витязь-СН»", image: "images/weapon/vityaz.webp", rank: "Ветка ППК-20", resources: { ryzhiy_paporotnik: 501, veshestvo_07270: 2034, psi_mayachok: 630, gamma_fragment: 426, kvantovaya_batareya: 416 } },
            { id: "weapon43", name: "ПП-19-01 «Витязь»", image: "images/weapon/pp19.webp", rank: "Ветка ППК-20", resources: { severny_moh: 770, durman_kamen: 799, ostatki_akkumulyatora: 400, beta_fragment: 111 } },
            { id: "weapon44", name: "FN P90", image: "images/weapon/p90.webp", rank: "Ветка TDI KRISS Vector", resources: { ryzhiy_paporotnik: 501, veshestvo_07270: 2034, psi_mayachok: 531, gamma_fragment: 506, kvantovaya_batareya: 416 } },
            { id: "weapon45", name: "Beretta Mx4 Storm", image: "images/weapon/mx4.webp", rank: "Ветка TDI KRISS Vector", resources: { ryzhiy_paporotnik: 501, veshestvo_07270: 2034, psi_mayachok: 531, gamma_fragment: 506, kvantovaya_batareya: 416 } },
            { id: "weapon46", name: "HK MP5", image: "images/weapon/mp5.webp", rank: "Ветка TDI KRISS Vector", resources: { ryzhiy_paporotnik: 501, veshestvo_07270: 2034, psi_mayachok: 531, gamma_fragment: 506, kvantovaya_batareya: 416 } },
            { id: "weapon47", name: "ПП-19 «Бизон-2-01»", image: "images/weapon/bizon.webp", rank: "Ветка TDI KRISS Vector", resources: { severny_moh: 770, durman_kamen: 799, ostatki_akkumulyatora: 400, beta_fragment: 111 } },
            { id: "weapon48", name: "HK UMP45", image: "images/weapon/ump45.webp", rank: "Ветка TDI KRISS Vector", resources: { severny_moh: 770, durman_kamen: 799, ostatki_akkumulyatora: 323, beta_fragment: 138 } },
            { id: "weapon49", name: "M40A5", image: "images/weapon/m40a5.webp", rank: "Ветка L96A1", resources: { veshestvo_07270: 2288, psi_mayachok: 622, gamma_fragment: 500, kvantovaya_batareya: 488 } },
            { id: "weapon50", name: "Поношенная M40A5", image: "images/weapon/m40a5.webp", rank: "Ветка L96A1", resources: { durman_kamen: 983, ostatki_akkumulyatora: 419, beta_fragment: 144 } },
            { id: "weapon51", name: "СВД-С", image: "images/weapon/svds.webp", rank: "Ветка СВД-М", resources: { veshestvo_07270: 2288, psi_mayachok: 622, gamma_fragment: 500, kvantovaya_batareya: 488 } },
            { id: "weapon52", name: "СВУ", image: "images/weapon/svu.webp", rank: "Ветка СВД-М", resources: { veshestvo_07270: 2288, psi_mayachok: 622, gamma_fragment: 500, kvantovaya_batareya: 488 } },
            { id: "weapon53", name: "СВД", image: "images/weapon/svd.webp", rank: "Ветка СВД-М", resources: { durman_kamen: 983, ostatki_akkumulyatora: 419, beta_fragment: 144 } },
            { id: "weapon54", name: "МЦ-558", image: "images/weapon/mc558.webp", rank: "Ветка ВССК «Выхлоп»", resources: { limb: 1128, lambda_fragment: 193, anomalnaya_batareya: 35, limboplazma: 14 } },
            { id: "weapon55", name: "M1A FA", image: "images/weapon/m1afa.webp", rank: "Ветка Mk 14 EBR", resources: { veshestvo_07270: 2288, psi_mayachok: 622, gamma_fragment: 500, kvantovaya_batareya: 488 } },
            { id: "weapon56", name: "M1A", image: "images/weapon/m1a.webp", rank: "Ветка Mk 14 EBR", resources: { durman_kamen: 983, ostatki_akkumulyatora: 419, beta_fragment: 144 } },
            { id: "weapon57", name: "Protecta", image: "images/weapon/protecta.webp", rank: "Дробовики", resources: { ryzhiy_paporotnik: 1066, psi_mayachok: 713, gamma_fragment: 894 } },
            { id: "weapon58", name: "Сайга-12К", image: "images/weapon/saiga.webp", rank: "Дробовики", resources: { severny_moh: 1613, ostatki_akkumulyatora: 428, beta_fragment: 233 } },
            { id: "weapon59", name: "Glock 17", image: "images/weapon/glock17.webp", rank: "Ветка ОЦ-33 «Пернач»", resources: { ryzhiy_paporotnik: 235, veshestvo_07270: 609, psi_mayachok: 344, gamma_fragment: 272 } },
            { id: "weapon60", name: "Beretta 93R", image: "images/weapon/93r.webp", rank: "Ветка ОЦ-33 «Пернач»", resources: { ryzhiy_paporotnik: 235, veshestvo_07270: 609, psi_mayachok: 344, gamma_fragment: 272 } },
            { id: "weapon61", name: "Beretta 92FS", image: "images/weapon/92fs.webp", rank: "Ветка ОЦ-33 «Пернач»", resources: { severny_moh: 294, durman_kamen: 200, ostatki_akkumulyatora: 171, beta_fragment: 59 } },
            { id: "weapon62", name: "Desert Eagle Mark VII", image: "images/weapon/deagle.webp", rank: "Ветка Desert Eagle Mark XIX", resources: { ryzhiy_paporotnik: 235, veshestvo_07270: 609, psi_mayachok: 344, gamma_fragment: 272 } },
            { id: "weapon63", name: "SW1911", image: "images/weapon/1911.webp", rank: "Ветка Desert Eagle Mark XIX", resources: { severny_moh: 294, durman_kamen: 200, ostatki_akkumulyatora: 171, beta_fragment: 59 } },
            { id: "weapon64", name: "Colt Python", image: "images/weapon/python.webp", rank: "Ветка РШ-12", resources: { gorkolistnik: 391, limb: 333, lambda_fragment: 100, limboplazma: 6 } },
            { id: "weapon65", name: "Поношенный Colt Python", image: "images/weapon/python.webp", rank: "Ветка РШ-12", resources: { severny_moh: 294, durman_kamen: 200, ostatki_akkumulyatora: 171, beta_fragment: 59 } },
            { id: "weapon66", name: "Мачете Survival SP8 Ontario", image: "images/weapon/sp8.webp", rank: "Ветка Кукри", resources: { ryzhiy_paporotnik: 305, psi_mayachok: 215, gamma_fragment: 256, kvantovaya_batareya: 112 } },
            { id: "weapon67", name: "Охотничий мачете", image: "images/weapon/hmachet.webp", rank: "Ветка Кукри", resources: { severny_moh: 370, ostatki_akkumulyatora: 98, beta_fragment: 53 } },
            { id: "weapon68", name: "ОЦ-04", image: "images/weapon/oc04.webp", rank: "Ножи", resources: { severny_moh: 590, durman_kamen: 380, ostatki_akkumulyatora: 168, beta_fragment: 135 } },
            { id: "weapon69", name: "Штык-нож M9", image: "images/weapon/knifem9.webp", rank: "Ножи", resources: { severny_moh: 630, durman_kamen: 340, ostatki_akkumulyatora: 218, beta_fragment: 108 } },
            { id: "weapon70", name: "АН-94 «Абакан»", image: "images/weapon/ah94.webp", rank: "Ветка А-545", resources: { romashka: 220, rassolnik: 166, radioperedatchik: 140, alfa_fragment: 34 } },
            { id: "weapon71", name: "АКМ", image: "images/weapon/akm.webp", rank: "Ветка АК-15", resources: { romashka: 220, rassolnik: 166, radioperedatchik: 140, alfa_fragment: 34 } },
            { id: "weapon72", name: "Поношенный SIG SG 550", image: "images/weapon/sig.webp", rank: "Ветка FN F2000 Tactical", resources: { romashka: 220, rassolnik: 166, radioperedatchik: 113, alfa_fragment: 42 } },
            { id: "weapon73", name: "Поношенная L86A1", image: "images/weapon/l86a1.webp", rank: "Ветка FN F2000 Tactical", resources: { romashka: 201, rassolnik: 153, radioperedatchik: 103, alfa_fragment: 31 } },
            { id: "weapon74", name: "M4A1", image: "images/weapon/m4a1.webp", rank: "Ветка FN F2000 Tactical", resources: { romashka: 220, rassolnik: 166, radioperedatchik: 113, alfa_fragment: 42 } },
            { id: "weapon75", name: "Поношенная L85A1", image: "images/weapon/pl85a1.webp", rank: "Ветка FN F2000 Tactical", resources: { romashka: 220, rassolnik: 166, radioperedatchik: 113, alfa_fragment: 42 } },
            { id: "weapon76", name: "ПП-2000", image: "images/weapon/2000.webp", rank: "Ветка СР-3М", resources: { romashka: 182, rassolnik: 137, radioperedatchik: 116, alfa_fragment: 28 } },
            { id: "weapon77", name: "АЕК-919К «Каштан»", image: "images/weapon/919k.webp", rank: "Ветка ППК-20", resources: { romashka: 182, rassolnik: 137, radioperedatchik: 116, alfa_fragment: 28 } },
            { id: "weapon78", name: "Spectre M4", image: "images/weapon/spectrem4.webp", rank: "Ветка TDI KRISS Vector", resources: { romashka: 182, rassolnik: 137, radioperedatchik: 93, alfa_fragment: 35 } },
            { id: "weapon79", name: "Winchester M70", image: "images/weapon/m70.webp", rank: "Ветка L96A1", resources: { rassolnik: 169, radioperedatchik: 121, alfa_fragment: 36 } },
            { id: "weapon80", name: "СВТ-40", image: "images/weapon/cbt40.webp", rank: "Ветка СВД-М", resources: { rassolnik: 169, radioperedatchik: 121, alfa_fragment: 36 } },
            { id: "weapon81", name: "СКС-Т", image: "images/weapon/skst.webp", rank: "Ветка Mk 14 EBR", resources: { rassolnik: 169, radioperedatchik: 121, alfa_fragment: 36 } },
            { id: "weapon82", name: "МР-153", image: "images/weapon/153.webp", rank: "Дробовики", resources: { severny_moh: 883, ostatki_akkumulyatora: 234, beta_fragment: 128 } },
            { id: "weapon83", name: "Franchi SPAS-12", image: "images/weapon/spas.webp", rank: "Дробовики", resources: { romashka: 338, radioperedatchik: 110, alfa_fragment: 52 } },
            { id: "weapon84", name: "Форт-12", image: "images/weapon/fort.webp", rank: "Ветка ОЦ-33 «Пернач»", resources: { koren_vonyuchka: 75, srachnik: 46, mednaya_provoloka: 77 } },
            { id: "weapon85", name: "Walther P99", image: "images/weapon/p99.webp", rank: "Ветка ОЦ-33 «Пернач»", resources: { koren_vonyuchka: 75, srachnik: 46, mednaya_provoloka: 77 } },
            { id: "weapon86", name: "Mauser C96", image: "images/weapon/c96.webp", rank: "Ветка ОЦ-33 «Пернач»", resources: { koren_vonyuchka: 31, srachnik: 19 } },
            { id: "weapon87", name: "Browning Hi-Power", image: "images/weapon/power.webp", rank: "Ветка Desert Eagle Mark XIX", resources: { koren_vonyuchka: 75, srachnik: 46, mednaya_provoloka: 77 } },
            { id: "weapon88", name: "Тактический нож Ka-Bar BKR3", image: "images/weapon/bkr3.webp", rank: "Ветка Кукри", resources: { romashka: 125, radioperedatchik: 41, alfa_fragment: 19 } },
            { id: "weapon89", name: "Охотничий нож", image: "images/weapon/hunterk.webp", rank: "Ветка Кукри", resources: { koren_vonyuchka: 81, mednaya_provoloka: 45 } },
            { id: "weapon90", name: "Glock Feldmesser 78", image: "images/weapon/gf78.webp", rank: "Ножи", resources: { koren_vonyuchka: 125, srachnik: 101, mednaya_provoloka: 40 } },
            { id: "weapon91", name: "Монтировка", image: "images/weapon/crowbar.webp", rank: "Ножи", resources: { koren_vonyuchka: 125, srachnik: 90, mednaya_provoloka: 49 } },
            { id: "weapon92", name: "АКС чистильщика", image: "images/weapon/aks.webp", rank: "Сюжетные", resources: { koren_vonyuchka: 38, srachnik: 29 } },
            { id: "weapon93", name: "АК-74М", image: "images/weapon/74m.webp", rank: "Ветка А-545", resources: { koren_vonyuchka: 41, srachnik: 38, mednaya_provoloka: 40 } },
            { id: "weapon94", name: "АКС-74", image: "images/weapon/aks.webp", rank: "Ветка А-545", resources: { green_plesen: 33, bolotny_kamen: 42 } },
            { id: "weapon95", name: "M16A3", image: "images/weapon/16a3.webp", rank: "Ветка FN F2000 Tactical", resources: { koren_vonyuchka: 41, srachnik: 38, mednaya_provoloka: 40 } },
            { id: "weapon96", name: "M16A2", image: "images/weapon/16a2.webp", rank: "Ветка FN F2000 Tactical", resources: { green_plesen: 33, bolotny_kamen: 42 } },
            { id: "weapon97", name: "«Гепард»", image: "images/weapon/gepard.webp", rank: "Ветка СР-3М", resources: { koren_vonyuchka: 58, srachnik: 53, mednaya_provoloka: 57 } },
            { id: "weapon98", name: "ПП-91 «Кедр»", image: "images/weapon/kedr.webp", rank: "Ветка СР-3М", resources: { green_plesen: 29, bolotny_kamen: 38 } },
            { id: "weapon99", name: "IMI Uzi", image: "images/weapon/uzi.webp", rank: "Ветка TDI KRISS Vector", resources: { koren_vonyuchka: 58, srachnik: 53, mednaya_provoloka: 57 } },
            { id: "weapon100", name: "Vz.68 Scorpion", image: "images/weapon/scorp.webp", rank: "Ветка TDI KRISS Vector", resources: { green_plesen: 29, bolotny_kamen: 38 } },
            { id: "weapon101", name: "Поношенный Winchester M70", image: "images/weapon/m70.webp", rank: "Ветка L96A1", resources: { srachnik: 73, mednaya_provoloka: 66 } },
            { id: "weapon102", name: "Винтовка Мосина", image: "images/weapon/mosin.webp", rank: "Ветка L96A1", resources: { bolotny_kamen: 64 } },
            { id: "weapon103", name: "СКТ-40", image: "images/weapon/skt40.webp", rank: "Ветка СВД-М", resources: { srachnik: 73, mednaya_provoloka: 66 } },
            { id: "weapon104", name: "СКС", image: "images/weapon/sks.webp", rank: "Ветка Mk 14 EBR", resources: { srachnik: 73, mednaya_provoloka: 66 } },
            { id: "weapon105", name: "МР-133", image: "images/weapon/133.webp", rank: "Дробовики", resources: { koren_vonyuchka: 136, mednaya_provoloka: 75 } },
            { id: "weapon106", name: "Mossberg 590A1", image: "images/weapon/590a1.webp", rank: "Дробовики", resources: { koren_vonyuchka: 136, mednaya_provoloka: 75 } },
            { id: "weapon107", name: "ТОЗ-34", image: "images/weapon/toz.webp", rank: "Дробовики", resources: { koren_vonyuchka: 114 } },
            { id: "weapon108", name: "Shorty 590", image: "images/weapon/590.webp", rank: "Дробовики", resources: { green_plesen: 93 } },
            { id: "weapon109", name: "ТТ", image: "images/weapon/tt.webp", rank: "Ветка ОЦ-33 «Пернач»", resources: { green_plesen: 11, bolotny_kamen: 12 } },
            { id: "weapon110", name: "Нож 6Х9", image: "images/weapon/6x9.webp", rank: "Ветка Кукри", resources: { green_plesen: 32 } },
            { id: "weapon111", name: "КО-1", image: "images/weapon/ko1.webp", rank: "Ножи", resources: { green_plesen: 6, bolotny_kamen: 3 } },
            { id: "weapon112", name: "Молоток", image: "images/weapon/hammer.webp", rank: "Ножи", resources: { green_plesen: 4, bolotny_kamen: 5 } },
            { id: "weapon113", name: "АК-74М", image: "images/weapon/74m.webp", rank: "Ветка АК-15", resources: { koren_vonyuchka: 41, srachnik: 38, mednaya_provoloka: 40 } },
            { id: "weapon114", name: "АКС-74", image: "images/weapon/aks.webp", rank: "Ветка АК-15", resources: { green_plesen: 33, bolotny_kamen: 42 } },
            { id: "weapon115", name: "АКМ", image: "images/weapon/akm.webp", rank: "Ветка АМБ-17", resources: { romashka: 220, rassolnik: 166, radioperedatchik: 140, alfa_fragment: 34 } },
            { id: "weapon116", name: "АК-74М", image: "images/weapon/74m.webp", rank: "Ветка АМБ-17", resources: { koren_vonyuchka: 41, srachnik: 38, mednaya_provoloka: 40 } },
            { id: "weapon117", name: "АКС-74", image: "images/weapon/aks.webp", rank: "Ветка АМБ-17", resources: { green_plesen: 33, bolotny_kamen: 42 } },
            { id: "weapon118", name: "АКМ", image: "images/weapon/akm.webp", rank: "Ветка ПКП", resources: { romashka: 220, rassolnik: 166, radioperedatchik: 140, alfa_fragment: 34 } },
            { id: "weapon119", name: "АК-74М", image: "images/weapon/74m.webp", rank: "Ветка ПКП", resources: { koren_vonyuchka: 41, srachnik: 38, mednaya_provoloka: 40 } },
            { id: "weapon120", name: "АКС-74", image: "images/weapon/aks.webp", rank: "Ветка ПКП", resources: { green_plesen: 33, bolotny_kamen: 42 } },
            { id: "weapon121", name: "Винтовка Мосина", image: "images/weapon/mosin.webp", rank: "Ветка СВД-М", resources: { bolotny_kamen: 64 } },
            { id: "weapon122", name: "Винтовка Мосина", image: "images/weapon/mosin.webp", rank: "Ветка Mk 14 EBR", resources: { bolotny_kamen: 64 } },
            { id: "weapon123", name: "АКМ «Тишина»", image: "images/weapon/akmt.webp", rank: "Ветка ВСС-М «Винторез»", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 450, beta_fragment: 125 } },
            { id: "weapon124", name: "АКМ", image: "images/weapon/akm.webp", rank: "Ветка ВСС-М «Винторез»", resources: { romashka: 220, rassolnik: 166, radioperedatchik: 140, alfa_fragment: 34 } },
            { id: "weapon125", name: "АК-74М", image: "images/weapon/74m.webp", rank: "Ветка ВСС-М «Винторез»", resources: { koren_vonyuchka: 41, srachnik: 38, mednaya_provoloka: 40 } },
            { id: "weapon126", name: "АКС-74", image: "images/weapon/aks.webp", rank: "Ветка ВСС-М «Винторез»", resources: { green_plesen: 33, bolotny_kamen: 42 } },
            { id: "weapon127", name: "«Гепард»", image: "images/weapon/gepard.webp", rank: "Ветка ППК-20", resources: { koren_vonyuchka: 58, srachnik: 53, mednaya_provoloka: 57 } },
            { id: "weapon128", name: "ПП-91 «Кедр»", image: "images/weapon/kedr.webp", rank: "Ветка ППК-20", resources: { green_plesen: 29, bolotny_kamen: 38 } },
            { id: "weapon129", name: "АЕК-919К «Каштан»", image: "images/weapon/919k.webp", rank: "Ветка TDI KRISS Vector", resources: { romashka: 182, rassolnik: 137, radioperedatchik: 116, alfa_fragment: 28 } },
            { id: "weapon130", name: "«Гепард»", image: "images/weapon/gepard.webp", rank: "Ветка TDI KRISS Vector", resources: { koren_vonyuchka: 58, srachnik: 53, mednaya_provoloka: 57 } },
            { id: "weapon131", name: "ПП-91 «Кедр»", image: "images/weapon/kedr.webp", rank: "Ветка TDI KRISS Vector", resources: { green_plesen: 29, bolotny_kamen: 38 } },
            { id: "weapon132", name: "Mauser C96", image: "images/weapon/c96.webp", rank: "Ветка Desert Eagle Mark XIX", resources: { koren_vonyuchka: 31, srachnik: 19 } },
            { id: "weapon133", name: "ТТ", image: "images/weapon/tt.webp", rank: "Ветка Desert Eagle Mark XIX", resources: { green_plesen: 11, bolotny_kamen: 12 } },
            { id: "weapon134", name: "АК-103", image: "images/weapon/103.webp", rank: "Ветка АШ-12", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 450, beta_fragment: 125 } },
            { id: "weapon135", name: "АКМ", image: "images/weapon/akm.webp", rank: "Ветка АШ-12", resources: { romashka: 220, rassolnik: 166, radioperedatchik: 140, alfa_fragment: 34 } },
            { id: "weapon136", name: "АК-74М", image: "images/weapon/74m.webp", rank: "Ветка АШ-12", resources: { koren_vonyuchka: 41, srachnik: 38, mednaya_provoloka: 40 } },
            { id: "weapon137", name: "АКС-74", image: "images/weapon/aks.webp", rank: "Ветка АШ-12", resources: { green_plesen: 33, bolotny_kamen: 42 } },
            { id: "weapon138", name: "СВД", image: "images/weapon/svd.webp", rank: "Ветка ВССК «Выхлоп»", resources: { durman_kamen: 983, ostatki_akkumulyatora: 419, beta_fragment: 144 } },
            { id: "weapon139", name: "СВТ-40", image: "images/weapon/cbt40.webp", rank: "Ветка ВССК «Выхлоп»", resources: { rassolnik: 169, radioperedatchik: 121, alfa_fragment: 36 } },
            { id: "weapon140", name: "СКТ-40", image: "images/weapon/skt40.webp", rank: "Ветка ВССК «Выхлоп»", resources: { srachnik: 73, mednaya_provoloka: 66 } },
            { id: "weapon141", name: "Винтовка Мосина", image: "images/weapon/mosin.webp", rank: "Ветка ВССК «Выхлоп»", resources: { bolotny_kamen: 64 } },
            { id: "weapon142", name: "Browning Hi-Power", image: "images/weapon/power.webp", rank: "Ветка РШ-12", resources: { koren_vonyuchka: 75, srachnik: 46, mednaya_provoloka: 77 } },
            { id: "weapon143", name: "Mauser C96", image: "images/weapon/c96.webp", rank: "Ветка РШ-12", resources: { koren_vonyuchka: 31, srachnik: 19 } },
            { id: "weapon144", name: "ТТ", image: "images/weapon/tt.webp", rank: "Ветка РШ-12", resources: { green_plesen: 11, bolotny_kamen: 12 } },
        ],
        containers: [
            { id: "container1", name: "Контейнер «Улей»", image: "images/container/hive.webp", rank: "Контейнеры", resources: { ryzhiy_paporotnik: 565, veshestvo_07270: 1465, psi_mayachok: 599, gamma_fragment: 738, kvantovaya_batareya: 312 } },
            { id: "container2", name: "Контейнер «Берлога-6»", image: "images/container/ber6.webp", rank: "Контейнеры", resources: { ryzhiy_paporotnik: 643, veshestvo_07270: 1667, psi_mayachok: 681, gamma_fragment: 839, kvantovaya_batareya: 355 } },
            { id: "container3", name: "Контейнер «Кокон»", image: "images/container/cocoon.webp", rank: "Контейнеры", resources: { ryzhiy_paporotnik: 397, veshestvo_07270: 1028, psi_mayachok: 420, gamma_fragment: 514 } },
            { id: "container4", name: "Контейнер «Добытчик»", image: "images/container/forager.webp", rank: "Контейнеры", resources: { gorkolistnik: 609, limb: 537, lambda_fragment: 165, limboplazma: 17 } },
            { id: "container5", name: "Контейнер «Берлога-4»", image: "images/container/ber4.webp", rank: "Контейнеры", resources: { romashka: 123, rassolnik: 61, radioperedatchik: 63, alfa_fragment: 29 } },
            { id: "container6", name: "«КЗС-5»", image: "images/container/kzs5.webp", rank: "Контейнеры", resources: { romashka: 54, rassolnik: 26, radioperedatchik: 28, alfa_fragment: 13 } },
            { id: "container7", name: "«КЗС-4»", image: "images/container/kzs4.webp", rank: "Контейнеры", resources: { romashka: 69, rassolnik: 34, radioperedatchik: 35, alfa_fragment: 16 } },
            { id: "container8", name: "«КЗС-3»", image: "images/container/kzs3.webp", rank: "Контейнеры", resources: { romashka: 66, rassolnik: 33, radioperedatchik: 49 } },
            { id: "container9", name: "«КЗС-2»", image: "images/container/kzs2.webp", rank: "Контейнеры", resources: { koren_vonyuchka: 25, srachnik: 15, mednaya_provoloka: 30 } },
            { id: "container10", name: "Контейнер «КЗС-1»", image: "images/container/kzs1.webp", rank: "Контейнеры", resources: { koren_vonyuchka: 44, srachnik: 27 } }
        ],
        backpacks: [
            { id: "backpack1", name: "Рюкзак «Hellboy»", image: "images/backpack/hellboy.webp", rank: "Рюкзаки", resources: { romashka: 103, rassolnik: 34, radioperedatchik: 29 } },
            { id: "backpack2", name: "Штурмовой рюкзак Tri-Zip", image: "images/backpack/zip.webp", rank: "Рюкзаки", resources: { romashka: 103, rassolnik: 34, radioperedatchik: 29 } },
            { id: "backpack3", name: "Рюкзак MBSS", image: "images/backpack/mbss.webp", rank: "Рюкзаки", resources: { koren_vonyuchka: 39, srachnik: 16, mednaya_provoloka: 18 } },
            { id: "backpack4", name: "Рюкзак Errand Junior", image: "images/backpack/errand.webp", rank: "Рюкзаки", resources: { koren_vonyuchka: 38, srachnik: 15 } },
            { id: "backpack5", name: "Спортивная сумка", image: "images/backpack/sports.webp", rank: "Рюкзаки", resources: { koren_vonyuchka: 38, srachnik: 15 } },
            { id: "backpack6", name: "Сумка-трансформер", image: "images/backpack/transformer.webp", rank: "Рюкзаки", resources: { green_plesen: 18, bolotny_kamen: 13 } }
        ],
        attachments: [
            // 7.62 глушаки
            { id: "attachment1", name: "SIG Sauer SRD762Ti", image: "images/attachment/srd762.webp", rank: "Ветка 7.62 глушителей", resources: { veshestvo_07270: 185, psi_mayachok: 151, gamma_fragment: 60 } },
            { id: "attachment2", name: "Глушитель SCAR-SD", image: "images/attachment/scarsd.webp", rank: "Ветка 7.62 глушителей", resources: { durman_kamen: 74, ostatki_akkumulyatora: 91, beta_fragment: 16 } },
            { id: "attachment3", name: "CMMG SV Brake 7.62x51", image: "images/attachment/cmmg762.webp", rank: "Ветка 7.62 глушителей", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment4", name: "Пламегаситель Noveske KX3", image: "images/attachment/noveske.webp", rank: "Ветка 7.62 глушителей", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // 7.62 разброс
            { id: "attachment5", name: "VG6 EPSILON 762 Muzzle Brake", image: "images/attachment/vg6762.webp", rank: "Ветка 7.62 надульников на разброс", resources: { ryzhiy_paporotnik: 57, veshestvo_07270: 148, psi_mayachok: 121, gamma_fragment: 48 } },
            { id: "attachment6", name: "Keeno Arms SHREWD 7.62x51", image: "images/attachment/cmmg762.webp", rank: "Ветка 7.62 надульников на разброс", resources: { severny_moh: 87, durman_kamen: 59, ostatki_akkumulyatora: 73, beta_fragment: 13 } },
            { id: "attachment7", name: "CMMG SV Brake 7.62x51", image: "images/attachment/cmmg762.webp", rank: "Ветка 7.62 надульников на разброс", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment8", name: "Пламегаситель Noveske KX3", image: "images/attachment/noveske.webp", rank: "Ветка 7.62 надульников на разброс", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // 7.62 баланс
            { id: "attachment9", name: "Odin Works ATLAS 7.62x51", image: "images/attachment/atlas762.webp", rank: "Ветка сбалансированных 7.62 надульников", resources: { ryzhiy_paporotnik: 57, veshestvo_07270: 148, psi_mayachok: 121, gamma_fragment: 48 } },
            { id: "attachment10", name: "SureFire Pro Comp 7.62x51", image: "images/attachment/atlas762.webp", rank: "Ветка сбалансированных 7.62 надульников", resources: { severny_moh: 87, durman_kamen: 59, ostatki_akkumulyatora: 73, beta_fragment: 13 } },
            { id: "attachment11", name: "Precision Armament M11 Severe Duty 7.62x51", image: "images/attachment/atlas762.webp", rank: "Ветка сбалансированных 7.62 надульников", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment12", name: "Resistance Armament Compensator", image: "images/attachment/atlas762.webp", rank: "Ветка сбалансированных 7.62 надульников", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // 7.62 горизонталка
            { id: "attachment13", name: "Venom Tactical Antidote", image: "images/attachment/venom.webp", rank: "Ветка 7.62 надульников на гориз. отдачу", resources: { ryzhiy_paporotnik: 57, veshestvo_07270: 148, psi_mayachok: 121, gamma_fragment: 48 } },
            { id: "attachment14", name: "SPRV 7.62", image: "images/attachment/venom.webp", rank: "Ветка 7.62 надульников на гориз. отдачу", resources: { severny_moh: 87, durman_kamen: 59, ostatki_akkumulyatora: 73, beta_fragment: 13 } },
            { id: "attachment15", name: "Spikes Tactical Dynacomp", image: "images/attachment/venom.webp", rank: "Ветка 7.62 надульников на гориз. отдачу", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment16", name: "Пламегаситель AKademia Тьма", image: "images/attachment/venom.webp", rank: "Ветка 7.62 надульников на гориз. отдачу", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // 7.62 отдача
            { id: "attachment17", name: "Jmac Customs RDC 4C 7.62", image: "images/attachment/rdc762.webp", rank: "Ветка 7.62 надульников на отдачу", resources: { ryzhiy_paporotnik: 57, veshestvo_07270: 148, psi_mayachok: 121, gamma_fragment: 48 } },
            { id: "attachment18", name: "ДТК «Косой»", image: "images/attachment/akml.webp", rank: "Ветка 7.62 надульников на отдачу", resources: { severny_moh: 87, durman_kamen: 59, ostatki_akkumulyatora: 73, beta_fragment: 13 } },
            { id: "attachment19", name: "АКМЛ", image: "images/attachment/akml.webp", rank: "Ветка 7.62 надульников на отдачу", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment20", name: "ДТК-2", image: "images/attachment/dtk2.webp", rank: "Ветка 7.62 надульников на отдачу", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // 7.62 глушаки на отдачу
            { id: "attachment21", name: "Глушитель АТГ", image: "images/attachment/atg.webp", rank: "Ветка 7.62 глушителей на отдачу", resources: { veshestvo_07270: 185, psi_mayachok: 151, gamma_fragment: 60 } },
            { id: "attachment22", name: "ПБС-1", image: "images/attachment/atg.webp", rank: "Ветка 7.62 глушителей на отдачу", resources: { durman_kamen: 123, ostatki_akkumulyatora: 152, beta_fragment: 26 } },
            // 5.56 глушаки
            { id: "attachment23", name: "Глушитель KAC Style QD", image: "images/attachment/kacqd.webp", rank: "Ветка 5.56 глушителей", resources: { veshestvo_07270: 185, psi_mayachok: 151, gamma_fragment: 60 } },
            { id: "attachment24", name: "Глушитель SureFire SOCOM556-RC2", image: "images/attachment/socom556.webp", rank: "Ветка 5.56 глушителей", resources: { durman_kamen: 74, ostatki_akkumulyatora: 91, beta_fragment: 16 } },
            { id: "attachment25", name: "Diamondhead Compensator", image: "images/attachment/diamond.webp", rank: "Ветка 5.56 глушителей", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment26", name: "Пламегаситель Noveske KX3", image: "images/attachment/noveske.webp", rank: "Ветка 5.56 глушителей", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // 5.56 разброс
            { id: "attachment27", name: "VG6 EPSILON 556 Muzzle Brake", image: "images/attachment/vg6556.webp", rank: "Ветка 5.56 надульников на разброс", resources: { ryzhiy_paporotnik: 57, veshestvo_07270: 148, psi_mayachok: 121, gamma_fragment: 48 } },
            { id: "attachment28", name: "HK BLITZ 5.56", image: "images/attachment/diamond.webp", rank: "Ветка 5.56 надульников на разброс", resources: { severny_moh: 87, durman_kamen: 59, ostatki_akkumulyatora: 73, beta_fragment: 13 } },
            { id: "attachment29", name: "Diamondhead Compensator", image: "images/attachment/diamond.webp", rank: "Ветка 5.56 надульников на разброс", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment30", name: "Пламегаситель Noveske KX3", image: "images/attachment/noveske.webp", rank: "Ветка 5.56 надульников на разброс", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // 5.56 баланс
            { id: "attachment31", name: "Bulletec ST-6012", image: "images/attachment/bulletec.webp", rank: "Ветка сбалансированных 5.56 надульников", resources: { ryzhiy_paporotnik: 57, veshestvo_07270: 148, psi_mayachok: 121, gamma_fragment: 48 } },
            { id: "attachment32", name: "AlienTech 5.56", image: "images/attachment/bulletec.webp", rank: "Ветка сбалансированных 5.56 надульников", resources: { severny_moh: 87, durman_kamen: 59, ostatki_akkumulyatora: 73, beta_fragment: 13 } },
            { id: "attachment33", name: "Hera Arms CC Compensator", image: "images/attachment/bulletec.webp", rank: "Ветка сбалансированных 5.56 надульников", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment34", name: "Resistance Armament Compensator", image: "images/attachment/atlas762.webp", rank: "Ветка сбалансированных 5.56 надульников", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // 5.45 глушаки
            { id: "attachment35", name: "Имкас ПСУЗВ–11ТМ.12", image: "images/attachment/imkas.webp", rank: "Ветка 5.45 глушителей", resources: { veshestvo_07270: 185, psi_mayachok: 151, gamma_fragment: 60 } },
            { id: "attachment36", name: "ПБС-4", image: "images/attachment/pbs.webp", rank: "Ветка 5.45 глушителей", resources: { durman_kamen: 74, ostatki_akkumulyatora: 91, beta_fragment: 16 } },
            { id: "attachment37", name: "ДТК «Вихрь»", image: "images/attachment/dtkvihr.webp", rank: "Ветка 5.45 глушителей", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment38", name: "Пламегаситель AKademia Тьма", image: "images/attachment/venom.webp", rank: "Ветка 5.45 глушителей", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // 5.45 разброс
            { id: "attachment39", name: "ДТК Цитадель 5.45", image: "images/attachment/dtk545.webp", rank: "Ветка 5.45 надульников на разброс", resources: { ryzhiy_paporotnik: 57, veshestvo_07270: 148, psi_mayachok: 121, gamma_fragment: 48 } },
            { id: "attachment40", name: "SPRV MBR Jet", image: "images/attachment/dtkvihr.webp", rank: "Ветка 5.45 надульников на разброс", resources: { severny_moh: 87, durman_kamen: 59, ostatki_akkumulyatora: 73, beta_fragment: 13 } },
            { id: "attachment41", name: "ДТК «Вихрь»", image: "images/attachment/dtkvihr.webp", rank: "Ветка 5.45 надульников на разброс", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment42", name: "Пламегаситель AKademia Тьма", image: "images/attachment/venom.webp", rank: "Ветка 5.45 надульников на разброс", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // 5.45 баланс
            { id: "attachment43", name: "Jmac Customs RDC 4C 5.45", image: "images/attachment/dtk2.webp", rank: "Ветка сбалансированных 5.45 надульников", resources: { ryzhiy_paporotnik: 57, veshestvo_07270: 148, psi_mayachok: 121, gamma_fragment: 48 } },
            { id: "attachment44", name: "PWS CQB 74", image: "images/attachment/dtk2.webp", rank: "Ветка сбалансированных 5.45 надульников", resources: { severny_moh: 87, durman_kamen: 59, ostatki_akkumulyatora: 73, beta_fragment: 13 } },
            { id: "attachment45", name: "ДТК-1", image: "images/attachment/dtk2.webp", rank: "Ветка сбалансированных 5.45 надульников", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment46", name: "ДТК-2", image: "images/attachment/dtk2.webp", rank: "Ветка сбалансированных 5.45 надульников", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // 9 мм баланс
            { id: "attachment47", name: "GE-OCTO Gunethics", image: "images/attachment/octo.webp", rank: "Ветка сбалансированных 9 мм надульников", resources: { ryzhiy_paporotnik: 57, veshestvo_07270: 148, psi_mayachok: 121, gamma_fragment: 48 } },
            { id: "attachment48", name: "Hi-Point Razor", image: "images/attachment/razor.webp", rank: "Ветка сбалансированных 9 мм надульников", resources: { severny_moh: 87, durman_kamen: 59, ostatki_akkumulyatora: 73, beta_fragment: 13 } },
            { id: "attachment49", name: "3 Port Mini Compensator", image: "images/attachment/octo.webp", rank: "Ветка сбалансированных 9 мм надульников", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment50", name: "VR-09", image: "images/attachment/octo.webp", rank: "Ветка сбалансированных 9 мм надульников", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // 9 мм разброс
            { id: "attachment51", name: "Удлиненный ствол 9 мм", image: "images/attachment/long9.webp", rank: "Ветка 9 мм надульников на разброс", resources: { ryzhiy_paporotnik: 57, veshestvo_07270: 148, psi_mayachok: 121, gamma_fragment: 48 } },
            { id: "attachment52", name: "Custom Guns Doncaster", image: "images/attachment/customg.webp", rank: "Ветка 9 мм надульников на разброс", resources: { severny_moh: 87, durman_kamen: 59, ostatki_akkumulyatora: 73, beta_fragment: 13 } },
            { id: "attachment53", name: "Пламегаситель LoneWolf", image: "images/attachment/customg.webp", rank: "Ветка 9 мм надульников на разброс", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment54", name: "MICRO BADGER", image: "images/attachment/customg.webp", rank: "Ветка 9 мм надульников на разброс", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // 9 мм глушители
            { id: "attachment55", name: "Глушитель Osprey", image: "images/attachment/osprey.webp", rank: "Ветка 9 мм глушителей", resources: { veshestvo_07270: 185, psi_mayachok: 151, gamma_fragment: 60 } },
            { id: "attachment56", name: "Глушитель С.К.О.С. МДУ SUPRA K-8 Integral", image: "images/attachment/supra.webp", rank: "Ветка 9 мм глушителей", resources: { durman_kamen: 74, ostatki_akkumulyatora: 91, beta_fragment: 16 } },
            { id: "attachment57", name: "Пламегаситель LoneWolf", image: "images/attachment/customg.webp", rank: "Ветка 9 мм глушителей", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment58", name: "MICRO BADGER", image: "images/attachment/customg.webp", rank: "Ветка 9 мм глушителей", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // Ствол на дигл
            { id: "attachment59", name: "Удлиненный ствол D-Eagle", image: "images/attachment/lgdeagle.webp", rank: "Ствол на D-Eagle", resources: { ryzhiy_paporotnik: 289, veshestvo_07270: 870, psi_mayachok: 276, gamma_fragment: 135 } },
            // АШ-12 надульник
            { id: "attachment60", name: "ДТК АШ-12", image: "images/attachment/dtkash.webp", rank: "Ветка надульника на АШ-12", resources: { ryzhiy_paporotnik: 610, veshestvo_07270: 900, psi_mayachok: 460, gamma_fragment: 124, kvantovaya_batareya: 198 } },
            { id: "attachment61", name: "Рукоятка для ОЦ-14 «Гроза»", image: "images/attachment/rukgroza.webp", rank: "Ветка надульника на АШ-12", resources: { ryzhiy_paporotnik: 149, veshestvo_07270: 359, psi_mayachok: 129, gamma_fragment: 136 } },
            { id: "attachment62", name: "SPRV 7.62", image: "images/attachment/venom.webp", rank: "Ветка надульника на АШ-12", resources: { severny_moh: 87, durman_kamen: 59, ostatki_akkumulyatora: 73, beta_fragment: 13 } },
            { id: "attachment63", name: "Spikes Tactical Dynacomp", image: "images/attachment/venom.webp", rank: "Ветка надульника на АШ-12", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment64", name: "Пламегаситель AKademia Тьма", image: "images/attachment/venom.webp", rank: "Ветка надульника на АШ-12", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // АШ-12 глушитель
            { id: "attachment65", name: "Глушитель АШ-12/МЦ-558", image: "images/attachment/sash.webp", rank: "Ветка глушителя на АШ-12", resources: { ryzhiy_paporotnik: 615, veshestvo_07270: 875, psi_mayachok: 450, gamma_fragment: 121, kvantovaya_batareya: 193 } },
            { id: "attachment66", name: "Глушитель для ОЦ-14 «Гроза»", image: "images/attachment/sgroza.webp", rank: "Ветка глушителя на АШ-12", resources: { veshestvo_07270: 185, psi_mayachok: 151, gamma_fragment: 60 } },
            { id: "attachment67", name: "ПБС-1", image: "images/attachment/atg.webp", rank: "Ветка глушителя на АШ-12", resources: { durman_kamen: 123, ostatki_akkumulyatora: 152, beta_fragment: 26 } }
        ],
        mags: [
            // 9 мм магазины
            { id: "mag1", name: "Увеличенный магазин Beretta", image: "images/mag/magBeretta.webp", rank: "9 мм Магазины", resources: { romashka: 38, rassolnik: 9, radioperedatchik: 10, alfa_fragment: 3 } },
            { id: "mag2", name: "Барабанный магазин X-5", image: "images/mag/magX5.webp", rank: "9 мм Магазины", resources: { romashka: 56, rassolnik: 14, radioperedatchik: 14 } },
            { id: "mag3", name: "Увеличенный магазин Colt", image: "images/mag/magColt.webp", rank: "9 мм Магазины", resources: { romashka: 56, rassolnik: 14, radioperedatchik: 14 } },
            { id: "mag4", name: "Увеличенный магазин Browning", image: "images/mag/magBrowning.webp", rank: "9 мм Магазины", resources: { koren_vonyuchka: 19, srachnik: 6, mednaya_provoloka: 8 } },
            { id: "mag5", name: "Увеличенный магазин Форт-12", image: "images/mag/magFort.webp", rank: "9 мм Магазины", resources: { koren_vonyuchka: 19, srachnik: 6, mednaya_provoloka: 8 } },
            // 7.62 магазины
            { id: "mag6", name: "Увеличенный магазин «Кобра»", image: "images/mag/magKobra.webp", rank: "7.62 Магазины", resources: { ryzhiy_paporotnik: 259, veshestvo_07270: 335, psi_mayachok: 137, gamma_fragment: 109 } },
            // Барабанный магазин G3/M1A
            { id: "mag7", name: "Барабанный магазин G3/M1A", image: "images/mag/magG3.webp", rank: "Ветка Барабана G3/M1A", resources: { ryzhiy_paporotnik: 293, veshestvo_07270: 403, psi_mayachok: 165, gamma_fragment: 131, kvantovaya_batareya: 86 } },
            { id: "mag8", name: "Магазин 7.62 пластиковый", image: "images/mag/magPlastic762.webp", rank: "Ветка Барабана G3/M1A", resources: { severny_moh: 275, durman_kamen: 94, ostatki_akkumulyatora: 58, beta_fragment: 20 } },
            { id: "mag9", name: "Магазин 7.62 бакелитовый", image: "images/mag/magBakelite762.webp", rank: "Ветка Барабана G3/M1A", resources: { romashka: 38, rassolnik: 9, radioperedatchik: 10, alfa_fragment: 3 } },
            { id: "mag10", name: "Магазин 5.45 PMAG, черный", image: "images/mag/PMAG545.webp", rank: "Ветка Барабана G3/M1A", resources: { romashka: 56, rassolnik: 14, radioperedatchik: 14 } },
            // Ветка эргомагов 7.62
            { id: "mag11", name: "Магазин Magpul PMAG 7.62x39", image: "images/mag/PMAG762.webp", rank: "Ветка 7.62 эргомагов", resources: { ryzhiy_paporotnik: 154, veshestvo_07270: 199, psi_mayachok: 81, gamma_fragment: 64 } },
            { id: "mag12", name: "Магазин АКМ десантный", image: "images/mag/PMAG762.webp", rank: "Ветка 7.62 эргомагов", resources: { severny_moh: 329, durman_kamen: 112, ostatki_akkumulyatora: 69, beta_fragment: 24 } },
            { id: "mag13", name: "Магазин 5.45 PMAG, черный", image: "images/mag/PMAG545.webp", rank: "Ветка 7.62 эргомагов", resources: { romashka: 56, rassolnik: 14, radioperedatchik: 14 } },
            // Ветка эргомагов 5.56
            { id: "mag14", name: "Магазин PMAG GEN2 M2 MOE", image: "images/mag/PMAG556.webp", rank: "Ветка 5.56 эргомагов", resources: { ryzhiy_paporotnik: 154, veshestvo_07270: 199, psi_mayachok: 81, gamma_fragment: 64 } },
            { id: "mag15", name: "Магазин 5.56 Pufgun, черный", image: "images/mag/PMAG556.webp", rank: "Ветка 5.56 эргомагов", resources: { severny_moh: 275, durman_kamen: 94, ostatki_akkumulyatora: 58, beta_fragment: 20 } },
            { id: "mag16", name: "Магазин 5.56 NATO PMAG, черный", image: "images/mag/PMAGNATO556.webp", rank: "Ветка 5.56 эргомагов", resources: { romashka: 38, rassolnik: 9, radioperedatchik: 10, alfa_fragment: 3 } },
            { id: "mag17", name: "Магазин 5.56 NATO STANAG", image: "images/mag/magSTANAG.webp", rank: "Ветка 5.56 эргомагов", resources: { romashka: 56, rassolnik: 14, radioperedatchik: 14 } },
            { id: "mag18", name: "Магазин 5.56 NATO STANAG (20 пт.)", image: "images/mag/magSTANAG20.webp", rank: "Ветка 5.56 эргомагов", resources: { koren_vonyuchka: 19, srachnik: 6, mednaya_provoloka: 8 } },
            // Ветка барабана 5.56
            { id: "mag19", name: "Магазин 5.56 NATO STANAG (60 пт.)", image: "images/mag/magNATO556.webp", rank: "Ветка 60-патронника 5.56", resources: { ryzhiy_paporotnik: 154, veshestvo_07270: 199, psi_mayachok: 81, gamma_fragment: 64 } },
            { id: "mag20", name: "Магазин EMAG", image: "images/mag/EMAG.webp", rank: "Ветка 60-патронника 5.56", resources: { severny_moh: 275, durman_kamen: 94, ostatki_akkumulyatora: 58, beta_fragment: 20 } },
            { id: "mag21", name: "Магазин 5.56 NATO STANAG (45 пт.)", image: "images/mag/mag45STANAG.webp", rank: "Ветка 60-патронника 5.56", resources: { severny_moh: 275, durman_kamen: 94, ostatki_akkumulyatora: 58, beta_fragment: 20 } },
            { id: "mag22", name: "Магазин 5.56 NATO PMAG, черный", image: "images/mag/PMAGNATO556.webp", rank: "Ветка 60-патронника 5.56", resources: { romashka: 38, rassolnik: 9, radioperedatchik: 10, alfa_fragment: 3 } },
            { id: "mag23", name: "Магазин 5.56 NATO STANAG", image: "images/mag/magSTANAG.webp", rank: "Ветка 60-патронника 5.56", resources: { romashka: 56, rassolnik: 14, radioperedatchik: 14 } },
            { id: "mag24", name: "Магазин 5.56 NATO STANAG (20 пт.)", image: "images/mag/magSTANAG20.webp", rank: "Ветка 60-патронника 5.56", resources: { koren_vonyuchka: 19, srachnik: 6, mednaya_provoloka: 8 } },
            // Ветка увел. 9.39
            { id: "mag25", name: "Увеличенный магазин для ВСС/Вал", image: "images/mag/magVSS.webp", rank: "Ветка Увеличенного магазина для ВСС/Вал", resources: { ryzhiy_paporotnik: 170, veshestvo_07270: 234, psi_mayachok: 96, gamma_fragment: 76, kvantovaya_batareya: 50 } },
            { id: "mag26", name: "Магазин эргономичный для ВСС/Вал", image: "images/mag/magErgoVSS.webp", rank: "Ветка Увеличенного магазина для ВСС/Вал", resources: { ryzhiy_paporotnik: 154, veshestvo_07270: 199, psi_mayachok: 81, gamma_fragment: 64 } },
            { id: "mag27", name: "Магазин 7.62 пластиковый", image: "images/mag/magPlastic762.webp", rank: "Ветка Увеличенного магазина для ВСС/Вал", resources: { severny_moh: 275, durman_kamen: 94, ostatki_akkumulyatora: 58, beta_fragment: 20 } },
            { id: "mag28", name: "Магазин 7.62 бакелитовый", image: "images/mag/magBakelite762.webp", rank: "Ветка Увеличенного магазина для ВСС/Вал", resources: { romashka: 38, rassolnik: 9, radioperedatchik: 10, alfa_fragment: 3 } },
            { id: "mag29", name: "Магазин 5.45 PMAG, черный", image: "images/mag/PMAG545.webp", rank: "Ветка Увеличенного магазина для ВСС/Вал", resources: { romashka: 56, rassolnik: 14, radioperedatchik: 14 } },
            // Ветка увел. 12.7 АШ-12
            { id: "mag30", name: "Увеличенный магазин АШ-12", image: "images/mag/magASH.webp", rank: "Ветка Увеличенного магазина АШ-12", resources: { ryzhiy_paporotnik: 170, veshestvo_07270: 234, psi_mayachok: 96, gamma_fragment: 76, kvantovaya_batareya: 50 } },
            { id: "mag31", name: "Увеличенный магазин ОЦ-14", image: "images/mag/magGroza.webp", rank: "Ветка Увеличенного магазина АШ-12", resources: { ryzhiy_paporotnik: 154, veshestvo_07270: 199, psi_mayachok: 81, gamma_fragment: 64 } },
            { id: "mag32", name: "Магазин 7.62 пластиковый", image: "images/mag/magPlastic762.webp", rank: "Ветка Увеличенного магазина АШ-12", resources: { severny_moh: 275, durman_kamen: 94, ostatki_akkumulyatora: 58, beta_fragment: 20 } },
            { id: "mag33", name: "Магазин 7.62 бакелитовый", image: "images/mag/magBakelite762.webp", rank: "Ветка Увеличенного магазина АШ-12", resources: { romashka: 38, rassolnik: 9, radioperedatchik: 10, alfa_fragment: 3 } },
            { id: "mag34", name: "Магазин 5.45 PMAG, черный", image: "images/mag/PMAG545.webp", rank: "Ветка Увеличенного магазина АШ-12", resources: { romashka: 56, rassolnik: 14, radioperedatchik: 14 } },
            // Ветка барабана 5.45
            { id: "mag35", name: "Магазин 5.45", image: "images/mag/mag545.webp", rank: "Ветка 60-патронника 5.45", resources: { ryzhiy_paporotnik: 154, veshestvo_07270: 199, psi_mayachok: 81, gamma_fragment: 64 } },
            { id: "mag36", name: "Магазин 5.45 пластиковый", image: "images/mag/magPlastic545.webp", rank: "Ветка 60-патронника 5.45", resources: { severny_moh: 275, durman_kamen: 94, ostatki_akkumulyatora: 58, beta_fragment: 20 } },
            { id: "mag37", name: "Магазин 5.45 бакелитовый", image: "images/mag/magBakelite545.webp", rank: "Ветка 60-патронника 5.45", resources: { romashka: 38, rassolnik: 9, radioperedatchik: 10, alfa_fragment: 3 } },
            { id: "mag38", name: "Магазин 5.45 PMAG, черный", image: "images/mag/PMAG545.webp", rank: "Ветка 60-патронника 5.45", resources: { romashka: 56, rassolnik: 14, radioperedatchik: 14 } },
            // Ветка эргомагов 5.45
            { id: "mag39", name: "Магазин MAG SG545", image: "images/mag/PMAG545.webp", rank: "Ветка 5.45 эргомагов", resources: { ryzhiy_paporotnik: 154, veshestvo_07270: 199, psi_mayachok: 81, gamma_fragment: 64 } },
            { id: "mag40", name: "Магазин 5.45 «Вафля»", image: "images/mag/PMAG545.webp", rank: "Ветка 5.45 эргомагов", resources: { severny_moh: 329, durman_kamen: 112, ostatki_akkumulyatora: 69, beta_fragment: 24 } },
            { id: "mag41", name: "Магазин 5.45 PMAG, черный", image: "images/mag/PMAG545.webp", rank: "Ветка 5.45 эргомагов", resources: { romashka: 56, rassolnik: 14, radioperedatchik: 14 } },
            // Магазины для дробовиков
            { id: "mag42", name: "Удлинитель магазина МР-133/МР-153", image: "images/mag/magShotgun.webp", rank: "Магазины для дробовиков", resources: { romashka: 56, rassolnik: 14, radioperedatchik: 14 } }
        ],
        forends: [
            { id: "forend1", name: "Цевье для Сайга-12К", image: "images/forend/forendSaiga.webp", rank: "Цевья", resources: { severny_moh: 372, ostatki_akkumulyatora: 99, beta_fragment: 54 } },
        ],
        brackets: [
            { id: "bracket1", name: "Боковой кронштейн с планкой Пикатинни", image: "images/brackets/picatinnyrail.webp", rank: "Крепления", resources: { romashka: 30, rassolnik: 23, radioperedatchik: 18 } },
            { id: "bracket2", name: "Повышающая RIS-планка", image: "images/brackets/ris.webp", rank: "Крепления", resources: { romashka: 30, rassolnik: 23, radioperedatchik: 18 } },
            { id: "bracket3", name: "Направляющая RIS для дробовиков", image: "images/brackets/risShotgun.webp", rank: "Крепления", resources: { koren_vonyuchka: 31, mednaya_provoloka: 17 } },
            { id: "bracket4", name: "Планка с базой Пикатинни", image: "images/brackets/pikatini.webp", rank: "Крепления", resources: { koren_vonyuchka: 26 } },
        ],
        others: [
            // ЛЦУ
            { id: "other1", name: "Тактический блок Зенит «Перст-3»", image: "images/others/perst3.webp", rank: "Ветка ЛЦУ", resources: { ryzhiy_paporotnik: 46, veshestvo_07270: 120, psi_mayachok: 49, gamma_fragment: 60 } },
            { id: "other2", name: "HQ ISSUE Low-Profile Laser Sight (красный лазер)", image: "images/others/hqissue.webp", rank: "Ветка ЛЦУ", resources: { severny_moh: 71, durman_kamen: 48, ostatki_akkumulyatora: 30, beta_fragment: 16 } },
            { id: "other3", name: "Лазерный целеуказатель «Клещ-2ПС»", image: "images/others/kleshch.webp", rank: "Ветка ЛЦУ", resources: { romashka: 24, rassolnik: 12, radioperedatchik: 12, alfa_fragment: 6 } },
            { id: "other4", name: "HQ ISSUE Mini Laser Sight (зеленый лазер)", image: "images/others/hqmini.webp", rank: "Ветка ЛЦУ", resources: { koren_vonyuchka: 16, srachnik: 10, mednaya_provoloka: 16 } },
            // Ветка рукояток на отдачу
            { id: "other5", name: "РК-1", image: "images/others/rk1.webp", rank: "Ветка рукояток на отдачу", resources: { ryzhiy_paporotnik: 46, veshestvo_07270: 120, psi_mayachok: 76, gamma_fragment: 39 } },
            { id: "other6", name: "РК-0", image: "images/others/rk0.webp", rank: "Ветка рукояток на отдачу", resources: { severny_moh: 71, durman_kamen: 48, ostatki_akkumulyatora: 46, beta_fragment: 10 } },
            { id: "other7", name: "Вертикальная рукоятка ANG4", image: "images/others/ang4.webp", rank: "Ветка рукояток на отдачу", resources: { romashka: 24, rassolnik: 12, radioperedatchik: 19, alfa_fragment: 4 } },
            { id: "other8", name: "РК-5", image: "images/others/rk5.webp", rank: "Ветка рукояток на отдачу", resources: { koren_vonyuchka: 15, srachnik: 9, mednaya_provoloka: 18 } },
            // Ветка снайперских рукояток
            { id: "other9", name: "Magpul RVG", image: "images/others/magpulrvg.webp", rank: "Ветка снайперских рукояток", resources: { ryzhiy_paporotnik: 46, veshestvo_07270: 120, psi_mayachok: 76, gamma_fragment: 39 } },
            { id: "other10", name: "Вертикальная рукоятка Tapco", image: "images/others/magpulrvg.webp", rank: "Ветка снайперских рукояток", resources: { severny_moh: 71, durman_kamen: 48, ostatki_akkumulyatora: 46, beta_fragment: 10 } },
            { id: "other11", name: "Тактическая рукоятка KAC Vertical Foregrip", image: "images/others/VerticalForegrip.webp", rank: "Ветка снайперских рукояток", resources: { romashka: 24, rassolnik: 12, radioperedatchik: 19, alfa_fragment: 4 } },
            { id: "other12", name: "Рукоять переноса огня FMA DARK EARTH", image: "images/others/FMA.webp", rank: "Ветка снайперских рукояток", resources: { koren_vonyuchka: 15, srachnik: 9, mednaya_provoloka: 18 } },
            // Ветка эргономичных рукояток
            { id: "other13", name: "Тактическая рукоятка Fortis SHIFT Vertical, черная", image: "images/others/shift.webp", rank: "Ветка эргономичных рукояток", resources: { ryzhiy_paporotnik: 46, veshestvo_07270: 120, psi_mayachok: 76, gamma_fragment: 39 } },
            { id: "other14", name: "FX PTKB FAB Defense", image: "images/others/pktb.webp", rank: "Ветка эргономичных рукояток", resources: { severny_moh: 71, durman_kamen: 48, ostatki_akkumulyatora: 46, beta_fragment: 10 } },
            { id: "other15", name: "Тактическая рукоятка Magpul AFG", image: "images/others/pktb.webp", rank: "Ветка эргономичных рукояток", resources: { romashka: 24, rassolnik: 12, radioperedatchik: 19, alfa_fragment: 4 } },
            { id: "other16", name: "Тактическая рукоятка FMA TD Grip", image: "images/others/FMATDGrip.webp", rank: "Ветка эргономичных рукояток", resources: { koren_vonyuchka: 15, srachnik: 9, mednaya_provoloka: 18 } },
            // Подствольные гранатометы
            { id: "other17", name: "ГП-25 «Костер»", image: "images/others/koster.webp", rank: "Подствольные гранатометы", resources: { ryzhiy_paporotnik: 78, veshestvo_07270: 202, psi_mayachok: 128, gamma_fragment: 66 } },
            { id: "other18", name: "M203", image: "images/others/m203.webp", rank: "Подствольные гранатометы", resources: { ryzhiy_paporotnik: 78, veshestvo_07270: 202, psi_mayachok: 128, gamma_fragment: 66 } },
        ],
        devices: [
            { id: "device1", name: "Штурмовой ПНВ (синий/белый/зеленый)", image: "images/devices/AssaultNVG.webp", rank: "ПНВ", resources: { ryzhiy_paporotnik: 263, veshestvo_07270: 1414, psi_mayachok: 578, gamma_fragment: 221, kvantovaya_batareya: 145 } },
            { id: "device2", name: "Штурмовой ПНВ", image: "images/devices/AssaultNVG.webp", rank: "ПНВ", resources: { severny_moh: 156, durman_kamen: 206, ostatki_akkumulyatora: 127, beta_fragment: 23 } },
            { id: "device3", name: "Штурмовой ПНВ ", image: "images/devices/AssaultNVG.webp", rank: "ПНВ", resources: { koren_vonyuchka: 12, srachnik: 7, mednaya_provoloka: 21 } },
            { id: "device4", name: "Детектор узкого диапазона «Свеча»", image: "images/devices/candle.webp", rank: "Детекторы", resources: { romashka: 28, rassolnik: 14, radioperedatchik: 29 } },
            { id: "device5", name: "СН-1 «Блин»", image: "images/devices/pancake.webp", rank: "Металлоискатели", resources: { koren_vonyuchka: 36, srachnik: 22 } },
            { id: "device6", name: "СН-1у «Блинчик»", image: "images/devices/minipancake.webp", rank: "Металлоискатели", resources: { koren_vonyuchka: 13, srachnik: 8 } },
        ],
        sights: [
            { id: "sight1", name: "Прицел оптический Trijicon AccuPoint", image: "images/sights/AccuPoint.webp", rank: "Оптические прицелы", resources: { severny_moh: 118, durman_kamen: 124, ostatki_akkumulyatora: 49, beta_fragment: 17 } },
            { id: "sight2", name: "Прицел оптический Trijicon ACOG", image: "images/sights/acog.webp", rank: "Оптические прицелы", resources: { romashka: 45, rassolnik: 35, radioperedatchik: 23, alfa_fragment: 7 } },
            { id: "sight3", name: "Прицел оптический Elcan", image: "images/sights/elcan.webp", rank: "Оптические прицелы", resources: { romashka: 45, rassolnik: 35, radioperedatchik: 23, alfa_fragment: 7 } },
            { id: "sight4", name: "Прицел оптический ПОСП", image: "images/sights/posp.webp", rank: "Оптические прицелы", resources: { romashka: 33, rassolnik: 25, radioperedatchik: 17, alfa_fragment: 5 } },
            { id: "sight5", name: "Прицел оптический ПСО", image: "images/sights/pso.webp", rank: "Оптические прицелы", resources: { romashka: 33, rassolnik: 25, radioperedatchik: 17, alfa_fragment: 5 } },
            { id: "sight6", name: "Прицел оптический Elcan", image: "images/sights/elcansand.webp", rank: "Оптические прицелы", resources: { romashka: 33, rassolnik: 25, radioperedatchik: 17, alfa_fragment: 5 } },
            { id: "sight7", name: "Прицел оптический Барс", image: "images/sights/bars.webp", rank: "Оптические прицелы", resources: { romashka: 33, rassolnik: 25, radioperedatchik: 17, alfa_fragment: 5 } },
            { id: "sight8", name: "Прицел оптический Пилад 3.5х20", image: "images/sights/pilad.webp", rank: "Оптические прицелы", resources: { koren_vonyuchka: 29, srachnik: 25, mednaya_provoloka: 24 } },
            { id: "sight9", name: "Прицел оптический Elcan M145", image: "images/sights/m145.webp", rank: "Оптические прицелы", resources: { koren_vonyuchka: 29, srachnik: 25, mednaya_provoloka: 24 } },
            { id: "sight10", name: "Прицел оптический 1П77", image: "images/sights/1p77.webp", rank: "Оптические прицелы", resources: { koren_vonyuchka: 21, srachnik: 18, mednaya_provoloka: 17 } },
            { id: "sight11", name: "Прицел оптический Trijicon ACOG ", image: "images/sights/triacog.webp", rank: "Оптические прицелы", resources: { koren_vonyuchka: 21, srachnik: 18, mednaya_provoloka: 17 } },
            { id: "sight12", name: "Прицел оптический ПСО ", image: "images/sights/opso.webp", rank: "Оптические прицелы", resources: { koren_vonyuchka: 15, srachnik: 13, mednaya_provoloka: 13 } },
            { id: "sight13", name: "Прицел оптический Leupold", image: "images/sights/leupold.webp", rank: "Оптические прицелы", resources: { koren_vonyuchka: 15, srachnik: 13, mednaya_provoloka: 13 } },
            { id: "sight14", name: "Прицел оптический SUSAT", image: "images/sights/susat.webp", rank: "Оптические прицелы", resources: { koren_vonyuchka: 11, srachnik: 10, mednaya_provoloka: 9 } },
            { id: "sight15", name: "Прицел оптический «Тюльпан»", image: "images/sights/tulip.webp", rank: "Оптические прицелы", resources: { koren_vonyuchka: 11, srachnik: 10 } },
            { id: "sight16", name: "Прицел оптический ПУ на боковой кронштейн", image: "images/sights/mosscope.webp", rank: "Оптические прицелы", resources: { green_plesen: 6, bolotny_kamen: 9 } },
            { id: "sight17", name: "Прицел оптический ПУ для СВТ", image: "images/sights/pusvt.webp", rank: "Оптические прицелы", resources: { green_plesen: 6, bolotny_kamen: 9 } },
            { id: "sight18", name: "Прицел коллиматорный «Bering OPTICS»", image: "images/sights/bering.webp", rank: "Коллиматорные прицелы", resources: { romashka: 61, rassolnik: 47, radioperedatchik: 31, alfa_fragment: 9 } },
            { id: "sight19", name: "Прицел коллиматорный Vortex", image: "images/sights/kvortex.webp", rank: "Коллиматорные прицелы", resources: { romashka: 61, rassolnik: 47, radioperedatchik: 31, alfa_fragment: 9 } },
            { id: "sight20", name: "Прицел коллиматорный Vortex", image: "images/sights/vortex.webp", rank: "Коллиматорные прицелы", resources: { romashka: 61, rassolnik: 47, radioperedatchik: 31, alfa_fragment: 9 } },
            { id: "sight21", name: "Прицел коллиматорный Trijicon", image: "images/sights/trijicon.webp", rank: "Коллиматорные прицелы", resources: { romashka: 61, rassolnik: 47, radioperedatchik: 31, alfa_fragment: 9 } },
            { id: "sight22", name: "Прицел коллиматорный Sig Sauer", image: "images/sights/SigSauer.webp", rank: "Коллиматорные прицелы", resources: { romashka: 32, rassolnik: 23, radioperedatchik: 17 } },
            { id: "sight23", name: "Прицел коллиматорный «ПК-АС»", image: "images/sights/pkas.webp", rank: "Коллиматорные прицелы", resources: { romashka: 32, rassolnik: 23, radioperedatchik: 17 } },
            { id: "sight24", name: "Прицел коллиматорный Trijicon ", image: "images/sights/trij.webp", rank: "Коллиматорные прицелы", resources: { koren_vonyuchka: 15, srachnik: 13, mednaya_provoloka: 13 } },
            { id: "sight25", name: "Прицел коллиматорный Trijicon ", image: "images/sights/tri.webp", rank: "Коллиматорные прицелы", resources: { koren_vonyuchka: 15, srachnik: 13, mednaya_provoloka: 13 } },
            { id: "sight26", name: "Прицел коллиматорный BSA Reflex", image: "images/sights/reflex.webp", rank: "Коллиматорные прицелы", resources: { koren_vonyuchka: 11, srachnik: 10, mednaya_provoloka: 9 } },
            { id: "sight27", name: "Прицел широкоугольный «Ракурс»", image: "images/sights/rakurs.webp", rank: "Коллиматорные прицелы", resources: { koren_vonyuchka: 11, srachnik: 10, mednaya_provoloka: 9 } },
            { id: "sight28", name: "Прицел коллиматорный LaRue", image: "images/sights/LaRue.webp", rank: "Коллиматорные прицелы", resources: { koren_vonyuchka: 11, srachnik: 10, mednaya_provoloka: 9 } },
            { id: "sight29", name: "Прицел коллиматорный «Валдай»", image: "images/sights/valdai.webp", rank: "Коллиматорные прицелы", resources: { koren_vonyuchka: 11, srachnik: 10 } },
            { id: "sight30", name: "Прицел коллиматорный «Кобра»", image: "images/sights/kobra.webp", rank: "Коллиматорные прицелы", resources: { koren_vonyuchka: 11, srachnik: 10 } },
            { id: "sight31", name: "Прицел коллиматорный EoTech", image: "images/sights/EoTech.webp", rank: "Коллиматорные прицелы", resources: { koren_vonyuchka: 11, srachnik: 10 } },
            { id: "sight32", name: "Прицел коллиматорный EoTech", image: "images/sights/EoTechB.webp", rank: "Коллиматорные прицелы", resources: { koren_vonyuchka: 11, srachnik: 10 } }
        ],
        skins: [
            { id: "skin1", name: "«Лимб»", image: "images/skins/limb.webp", rank: "Краски", resources: { limb: 2500 } },
        ],
        skans: [
            { id: "skan1", name: "Детектор широкого диапазона САК-1", image: "images/skans/sak.webp", rank: "Прочее", resources: { romashka: 28, rassolnik: 14, radioperedatchik: 29 } },
        ]
    };

    // DOM-элементы
    const armorPresetsContainer = document.getElementById('armor-presets');
    const weaponPresetsContainer = document.getElementById('weapon-presets');
    const containerPresetsContainer = document.getElementById('container-presets');
    const attachmentPresetsContainer = document.getElementById('attachment-presets');
    const magPresetsContainer = document.getElementById('mag-presets');
    const forendPresetsContainer = document.getElementById('forend-presets');
    const bracketPresetsContainer = document.getElementById('bracket-presets');
    const otherPresetsContainer = document.getElementById('other-presets');
    const devicePresetsContainer = document.getElementById('device-presets');
    const sightPresetsContainer = document.getElementById('sight-presets');
    const skinPresetsContainer = document.getElementById('skin-presets');
    const skanPresetsContainer = document.getElementById('skan-presets');
    const calculateBtn = document.getElementById('calculateBtn');
    const couponBtn = document.getElementById('couponBtn');
    const couponSelect = document.getElementById('couponSelect');
    let discount = 1; // Скидка по умолчанию (1 = без скидки)

    // Создание элементов для пресетов рангов
    function renderRankedPresets(container, data) {
        const rankGroups = {};
    
        // Группировка предметов по рангам
        data.forEach(preset => {
            if (!rankGroups[preset.rank]) {
                rankGroups[preset.rank] = [];
            }
            rankGroups[preset.rank].push(preset);
        });
    
        // Создание структурированных списков
        for (const rank in rankGroups) {
            const details = document.createElement('details');
            const summary = document.createElement('summary');
    
            //  Добавляем изображение, если это ветка контейнеров
            if (rank === "Контейнеры") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/container/hive.webp"; //  Путь к изображению
                img.alt = "Изображение контейнеры";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Рюкзаки") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/backpack/hellboy.webp"; //  Путь к изображению
                img.alt = "Изображение рюкзака";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 7.62 глушителей") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/srd762.webp"; //  Путь к изображению
                img.alt = "Изображение глушителя";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 7.62 глушителей на отдачу") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/atg.webp"; //  Путь к изображению
                img.alt = "Изображение глушителя";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 7.62 надульников на разброс") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/vg6762.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка сбалансированных 7.62 надульников") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/atlas762.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 7.62 надульников на гориз. отдачу") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/venom.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 7.62 надульников на отдачу") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/rdc762.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 5.56 глушителей") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/kacqd.webp"; //  Путь к изображению
                img.alt = "Изображение глушителя";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 5.56 надульников на разброс") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/vg6556.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка сбалансированных 5.56 надульников") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/bulletec.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 5.45 глушителей") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/imkas.webp"; //  Путь к изображению
                img.alt = "Изображение глушителя";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 5.45 надульников на разброс") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/dtk545.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка сбалансированных 5.45 надульников") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/dtk2.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка сбалансированных 9 мм надульников") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/octo.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 9 мм надульников на разброс") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/long9.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 9 мм глушителей") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/osprey.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка надульника на АШ-12") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/dtkash.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка глушителя на АШ-12") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/sash.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ствол на D-Eagle") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/attachment/lgdeagle.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка А-545") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/545.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка FN F2000 Tactical") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/fnt.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка АК-15") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/ak15.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка ПКП") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/pkp.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка L96A1") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/l96.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка СВД-М") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/svdm.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка Mk 14 EBR") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/ebr.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка АМБ-17") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/amb.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка СР-3М") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/cp3m.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка ВСС-М «Винторез»") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/vssm.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка ППК-20") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/ppk.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка TDI KRISS Vector") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/vector.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка ОЦ-33 «Пернач»") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/pernach.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка Desert Eagle Mark XIX") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/deagle.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка АШ-12") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/ash.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка ВССК «Выхлоп»") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/vssk.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка РШ-12") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/rsh.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Дробовики") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/protecta.webp"; //  Путь к изображению
                img.alt = "Изображение надульника";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка Кукри") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/kukri.webp"; //  Путь к изображению
                img.alt = "Изображение оружия";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ножи") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/anti.webp"; //  Путь к изображению
                img.alt = "Изображение оружия";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Сюжетные") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/weapon/aks.webp"; //  Путь к изображению
                img.alt = "Изображение оружия";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка Центуриона") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/armor/centurion.webp"; //  Путь к изображению
                img.alt = "Изображение брони";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка Зверобоя") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/armor/furryeb.webp"; //  Путь к изображению
                img.alt = "Изображение брони";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка Экзоскелета") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/armor/tuz.webp"; //  Путь к изображению
                img.alt = "Изображение брони";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка Скифа") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/armor/skuf.webp"; //  Путь к изображению
                img.alt = "Изображение брони";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка АО") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/armor/aoshka.webp"; //  Путь к изображению
                img.alt = "Изображение брони";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка Сатурна") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/armor/paket.webp"; //  Путь к изображению
                img.alt = "Изображение брони";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Фракционная броня") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/armor/kust.webp"; //  Путь к изображению
                img.alt = "Изображение брони";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "9 мм Магазины") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/mag/magBeretta.webp"; //  Путь к изображению
                img.alt = "Изображение магазина";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "7.62 Магазины") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/mag/magKobra.webp"; //  Путь к изображению
                img.alt = "Изображение магазина";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка Барабана G3/M1A") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/mag/magG3.webp"; //  Путь к изображению
                img.alt = "Изображение магазина";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 7.62 эргомагов") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/mag/PMAG762.webp"; //  Путь к изображению
                img.alt = "Изображение магазина";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 5.56 эргомагов") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/mag/PMAG556.webp"; //  Путь к изображению
                img.alt = "Изображение магазина";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 60-патронника 5.56") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/mag/magNATO556.webp"; //  Путь к изображению
                img.alt = "Изображение магазина";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка Увеличенного магазина для ВСС/Вал") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/mag/magVSS.webp"; //  Путь к изображению
                img.alt = "Изображение магазина";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка Увеличенного магазина АШ-12") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/mag/magASH.webp"; //  Путь к изображению
                img.alt = "Изображение магазина";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 60-патронника 5.45") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/mag/mag545.webp"; //  Путь к изображению
                img.alt = "Изображение магазина";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка 5.45 эргомагов") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/mag/PMAG545.webp"; //  Путь к изображению
                img.alt = "Изображение магазина";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Магазины для дробовиков") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/mag/magShotgun.webp"; //  Путь к изображению
                img.alt = "Изображение магазина";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Цевья") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/forend/forendSaiga.webp"; //  Путь к изображению
                img.alt = "Изображение цевья";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Крепления") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/brackets/picatinnyrail.webp"; //  Путь к изображению
                img.alt = "Изображение крепления";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка ЛЦУ") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/others/perst3.webp"; //  Путь к изображению
                img.alt = "Изображение крепления";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка рукояток на отдачу") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/others/rk1.webp"; //  Путь к изображению
                img.alt = "Изображение крепления";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка снайперских рукояток") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/others/magpulrvg.webp"; //  Путь к изображению
                img.alt = "Изображение крепления";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Ветка эргономичных рукояток") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/others/shift.webp"; //  Путь к изображению
                img.alt = "Изображение крепления";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Подствольные гранатометы") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/others/koster.webp"; //  Путь к изображению
                img.alt = "Изображение крепления";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "ПНВ") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/devices/AssaultNVG.webp"; //  Путь к изображению
                img.alt = "Изображение ПНВ";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Детекторы") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/devices/candle.webp"; //  Путь к изображению
                img.alt = "Изображение ПНВ";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Металлоискатели") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/devices/pancake.webp"; //  Путь к изображению
                img.alt = "Изображение ПНВ";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Оптические прицелы") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/sights/AccuPoint.webp"; //  Путь к изображению
                img.alt = "Изображение прицела";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Коллиматорные прицелы") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/sights/vortex.webp"; //  Путь к изображению
                img.alt = "Изображение прицела";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Краски") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/skins/limb.webp"; //  Путь к изображению
                img.alt = "Изображение краски";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }

            if (rank === "Прочее") {  //  Или другое условие, если у вас будет несколько веток с картинками
                const img = document.createElement('img');
                img.src = "images/skans/sak.webp"; //  Путь к изображению
                img.alt = "Изображение прочего";
                img.classList.add('preset-section-image'); //  Используем тот же класс для стилей
                summary.appendChild(img);
            }
    
            const rankSpan = document.createElement('span'); // Добавляем span для текста ранга
            rankSpan.textContent = rank;
            rankSpan.classList.add(armorRanks[rank]);
            summary.appendChild(rankSpan);
    
    
            details.appendChild(summary);
    
            const list = document.createElement('ul');
            list.classList.add('preset-list');
    
            rankGroups[rank].forEach(preset => {
                list.appendChild(createPresetElement(preset));
            });
    
            details.appendChild(list);
            container.appendChild(details);
        }
    }

    // Создание элемента пресета
    function createPresetElement(preset) {
        const listItem = document.createElement('li');
        listItem.classList.add('preset-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = preset.id;
        checkbox.value = preset.id;

        const img = document.createElement('img');
        img.src = preset.image;
        img.alt = preset.name;

        const label = document.createElement('label');
        label.htmlFor = preset.id;
        label.textContent = preset.name;

        // Добавляем цвет для названия контейнера, если он есть
        if (containerNameColors[preset.name]) {
            label.style.color = containerNameColors[preset.name];
        }

        if (backpackNameColors[preset.name]) {
            label.style.color = backpackNameColors[preset.name];
        }

        if (attachmentNameColors[preset.name]) {
            label.style.color = attachmentNameColors[preset.name];
        }

        if (magNameColors[preset.name]) {
            label.style.color = magNameColors[preset.name];
        }

        if (forendNameColors[preset.name]) {
            label.style.color = forendNameColors[preset.name];
        }

        if (bracketNameColors[preset.name]) {
            label.style.color = bracketNameColors[preset.name];
        }

        if (otherNameColors[preset.name]) {
            label.style.color = otherNameColors[preset.name];
        }

        if (deviceNameColors[preset.name]) {
            label.style.color = deviceNameColors[preset.name];
        }

        if (sightNameColors[preset.name]) {
            label.style.color = sightNameColors[preset.name];
        }

        if (skinNameColors[preset.name]) {
            label.style.color = skinNameColors[preset.name];
        }

        if (skanNameColors[preset.name]) {
            label.style.color = skanNameColors[preset.name];
        }

        listItem.appendChild(checkbox);
        listItem.appendChild(img);
        listItem.appendChild(label);

        listItem.addEventListener('click', (event) => {
            if (event.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
            }
            updateResourcesInput();
        });

        return listItem;
    }

    // Обновление ресурсов при выборе пресетов
    function updateResourcesInput() {
        const selectedPresets = { armor: [], weapons: [], containers: [], backpacks: [], attachments: [], mags: [], forends: [], brackets: [], others: [], devices: [], sights:[], skins: [], skans: [] };
        const totalResources = {};

        document.querySelectorAll('#armor-presets input:checked').forEach(checkbox => {
            selectedPresets.armor.push(checkbox.value);
        });
        document.querySelectorAll('#weapon-presets input:checked').forEach(checkbox => {
            selectedPresets.weapons.push(checkbox.value);
        });
        document.querySelectorAll('#container-presets input:checked').forEach(checkbox => {
            selectedPresets.containers.push(checkbox.value);
        });
        document.querySelectorAll('#container-presets input:checked').forEach(checkbox => {
            selectedPresets.backpacks.push(checkbox.value);
        });
        document.querySelectorAll('#attachment-presets input:checked').forEach(checkbox => {
            selectedPresets.attachments.push(checkbox.value);
        });
        document.querySelectorAll('#mag-presets input:checked').forEach(checkbox => {
            selectedPresets.mags.push(checkbox.value);
        });
        document.querySelectorAll('#forend-presets input:checked').forEach(checkbox => {
            selectedPresets.forends.push(checkbox.value);
        });
        document.querySelectorAll('#bracket-presets input:checked').forEach(checkbox => {
            selectedPresets.brackets.push(checkbox.value);
        });
        document.querySelectorAll('#other-presets input:checked').forEach(checkbox => {
            selectedPresets.others.push(checkbox.value);
        });
        document.querySelectorAll('#device-presets input:checked').forEach(checkbox => {
            selectedPresets.devices.push(checkbox.value);
        });
        document.querySelectorAll('#sight-presets input:checked').forEach(checkbox => {
            selectedPresets.sights.push(checkbox.value);
        });
        document.querySelectorAll('#skin-presets input:checked').forEach(checkbox => {
            selectedPresets.skins.push(checkbox.value);
        });
        document.querySelectorAll('#skan-presets input:checked').forEach(checkbox => {
            selectedPresets.skans.push(checkbox.value);
        });

        function addResources(presets, type) {
            presets.forEach(presetId => {
                const preset = presetsData[type].find(p => p.id === presetId);
                if (preset) {
                    for (const res in preset.resources) {
                        totalResources[res] = (totalResources[res] || 0) + preset.resources[res];
                    }
                }
            });
        }

        addResources(selectedPresets.armor, 'armor');
        addResources(selectedPresets.weapons, 'weapons');
        addResources(selectedPresets.containers, 'containers');
        addResources(selectedPresets.backpacks, 'backpacks');
        addResources(selectedPresets.attachments, 'attachments');
        addResources(selectedPresets.mags, 'mags');
        addResources(selectedPresets.forends, 'forends');
        addResources(selectedPresets.brackets, 'brackets');
        addResources(selectedPresets.others, 'others');
        addResources(selectedPresets.devices, 'devices');
        addResources(selectedPresets.sights, 'sights');
        addResources(selectedPresets.skins, 'skins');
        addResources(selectedPresets.skans, 'skans');

        const allResourceIds = getAllResourceIds();
        allResourceIds.forEach(resId => {
            const inputElement = document.getElementById(resId);
            if (inputElement) {
                inputElement.value = Math.max(0, Math.round((totalResources[resId] || 0) * discount));
            }
        });
        calculate();
    }

    function getAllResourceIds() {
        const ids = new Set();
        for (const category in presetsData) {
            presetsData[category].forEach(preset => {
                for (const resId in preset.resources) {
                    ids.add(resId);
                }
            });
        }
        document.querySelectorAll('#calculatorForm input[type="number"]').forEach(input => {
            ids.add(input.id);
        });
        return Array.from(ids);
    }

    function calculate() {
        // Получение значений всех ресурсов
        const bolotny_kamen = parseInt(document.getElementById('bolotny_kamen').value) || 0;
        const green_plesen = parseInt(document.getElementById('green_plesen').value) || 0;
        const koren_vonyuchka = parseInt(document.getElementById('koren_vonyuchka').value) || 0;
        const srachnik = parseInt(document.getElementById('srachnik').value) || 0;
        const mednaya_provoloka = parseInt(document.getElementById('mednaya_provoloka').value) || 0;

        // Бар
        const romashka = parseInt(document.getElementById('romashka').value) || 0;
        const radioperedatchik = parseInt(document.getElementById('radioperedatchik').value) || 0;
        const rassolnik = parseInt(document.getElementById('rassolnik').value) || 0;
        const alfa_fragment = parseInt(document.getElementById('alfa_fragment').value) || 0;

        // Полесское/ПД
        const beta_fragment = parseInt(document.getElementById('beta_fragment').value) || 0;
        const durman_kamen = parseInt(document.getElementById('durman_kamen').value) || 0;
        const severny_moh = parseInt(document.getElementById('severny_moh').value) || 0;
        const ostatki_akkumulyatora = parseInt(document.getElementById('ostatki_akkumulyatora').value) || 0;

        // Север
        const gamma_fragment = parseInt(document.getElementById('gamma_fragment').value) || 0;
        const veshestvo_07270 = parseInt(document.getElementById('veshestvo_07270').value) || 0;
        const ryzhiy_paporotnik = parseInt(document.getElementById('ryzhiy_paporotnik').value) || 0;
        const psi_mayachok = parseInt(document.getElementById('psi_mayachok').value) || 0;
        const kvantovaya_batareya = parseInt(document.getElementById('kvantovaya_batareya').value) || 0;

        // Любеч-3
        const limb = parseInt(document.getElementById('limb').value) || 0;
        const gorkolistnik = parseInt(document.getElementById('gorkolistnik').value) || 0;
        const lambda_fragment = parseInt(document.getElementById('lambda_fragment').value) || 0;
        const limboplazma = parseInt(document.getElementById('limboplazma').value) || 0;
        const anomalnaya_batareya = parseInt(document.getElementById('anomalnaya_batareya').value) || 0;

        // Рассчёт общей стоимости
        let totalCoins = 0;

        // Болота
        totalCoins += bolotny_kamen * 2;
        totalCoins += green_plesen * 1;

        // Обочина
        totalCoins += koren_vonyuchka * 3;
        totalCoins += srachnik * 4;
        totalCoins += mednaya_provoloka * 4;

        // Бар
        totalCoins += romashka * 4;
        totalCoins += radioperedatchik * 4;
        totalCoins += rassolnik * 6;
        totalCoins += alfa_fragment * 21;

        // Полесское/ПД
        totalCoins += beta_fragment * 40;
        totalCoins += durman_kamen * 8;
        totalCoins += severny_moh * 5;
        totalCoins += ostatki_akkumulyatora * 7;

        // Север
        totalCoins += gamma_fragment * 66;
        totalCoins += veshestvo_07270 * 8;
        totalCoins += ryzhiy_paporotnik * 10;
        totalCoins += psi_mayachok * 7;
        totalCoins += kvantovaya_batareya * 42;

        // Любеч-3
        totalCoins += limb * 15;
        totalCoins += gorkolistnik * 12;
        totalCoins += lambda_fragment * 86;
        totalCoins += limboplazma * 200;
        totalCoins += anomalnaya_batareya * 240;
    
        // Отображение общей стоимости на странице
        document.getElementById('totalCoinsDisplay').innerText = 'Общая стоимость: ' + totalCoins + ' монет';
    }

    // Применение купонов
    couponBtn.addEventListener('click', function() {
        const selectedDiscount = parseFloat(couponSelect.value);
        if (!isNaN(selectedDiscount)) {
            discount = selectedDiscount;
            updateResourcesInput();
        }
    });

    calculateBtn.addEventListener('click', calculate);

    // Рендер пресетов с разделением по рангам
    renderRankedPresets(armorPresetsContainer, presetsData.armor);
    renderRankedPresets(weaponPresetsContainer, presetsData.weapons);
    renderRankedPresets(containerPresetsContainer, presetsData.containers);
    renderRankedPresets(containerPresetsContainer, presetsData.backpacks);
    renderRankedPresets(attachmentPresetsContainer, presetsData.attachments);
    renderRankedPresets(magPresetsContainer, presetsData.mags);
    renderRankedPresets(forendPresetsContainer, presetsData.forends);
    renderRankedPresets(bracketPresetsContainer, presetsData.brackets);
    renderRankedPresets(otherPresetsContainer, presetsData.others);
    renderRankedPresets(devicePresetsContainer, presetsData.devices);
    renderRankedPresets(sightPresetsContainer, presetsData.sights);
    renderRankedPresets(skinPresetsContainer, presetsData.skins);
    renderRankedPresets(skanPresetsContainer, presetsData.skans);
});
