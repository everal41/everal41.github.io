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
        "Ветка 7.62 глушителей": "rank-orange", "Ветка 7.62 глушителей на отдачу": "rank-orange", "Ветка 7.62 надульников на разброс": "rank-orange", "Ветка сбалансированных 7.62 надульников": "rank-orange", "Ветка 7.62 надульников на гориз. отдачу": "rank-orange", "Ветка 7.62 надульников на отдачу": "rank-orange",
        "Ветка 5.56 глушителей": "rank-orange", "Ветка 5.56 надульников на разброс": "rank-orange", "Ветка сбалансированных 5.56 надульников": "rank-orange",
        "Ветка 5.45 глушителей": "rank-orange", "Ветка 5.45 надульников на разброс": "rank-orange", "Ветка сбалансированных 5.45 надульников": "rank-orange",
        "Ветка сбалансированных 9 мм надульников": "rank-orange", "Ветка 9 мм надульников на разброс": "rank-orange", "Ветка 9 мм глушителей": "rank-orange",
        "Ветка надульника на АШ-12": "rank-orange", "Ветка глушителя на АШ-12": "rank-orange",
        "Ствол на D-Eagle": "rank-orange"
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
        "Удлиненный ствол D-Eagle": "#BF5BAD"
    };

    // Пресеты брони и оружия с рангами
    const presetsData = {
        armor: [
            { id: "armor1", name: "Поношенный «Центурион»", image: "images/armor/centurion.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 496, veshestvo_07270: 2569, psi_mayachok: 525, gamma_fragment: 475, kvantovaya_batareya: 548 } },
            { id: "armor2", name: "Бронескелет «Центурион»", image: "images/armor/centurion.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 901, veshestvo_07270: 4671, psi_mayachok: 955, gamma_fragment: 864, kvantovaya_batareya: 996 } },
            { id: "armor3", name: "Поношенный «Зверобой»", image: "images/armor/furryeb.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1381, veshestvo_07270: 1743, psi_mayachok: 862, gamma_fragment: 564 } },
            { id: "armor4", name: "Экзоброня «Зверобой»", image: "images/armor/furryeb.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 2511, veshestvo_07270: 3170, psi_mayachok: 1568, gamma_fragment: 1026 } },
            { id: "armor5", name: "Поношенный «Туз/Мул»", image: "images/armor/tuz.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 708, veshestvo_07270: 1835, psi_mayachok: 750, gamma_fragment: 594, kvantovaya_batareya: 391 } },
            { id: "armor6", name: "Экзоскелет «Туз/Мул»", image: "images/armor/tuz.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1287, veshestvo_07270: 3337, psi_mayachok: 1364, gamma_fragment: 1080, kvantovaya_batareya: 711 } },
            { id: "armor7", name: "Сверхтяжелый бронекостюм", image: "images/armor/banka.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1755, veshestvo_07270: 9099, psi_mayachok: 1859, gamma_fragment: 1683, kvantovaya_batareya: 1940 } },
            { id: "armor8", name: "Бронекостюм «Авангард»", image: "images/armor/avangard.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 2508, veshestvo_07270: 6499, psi_mayachok: 2656, gamma_fragment: 2104, kvantovaya_batareya: 1386 } },
            { id: "armor9", name: "Поношенный АО-6 «Кочевник»", image: "images/armor/aoshka.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 850, veshestvo_07270: 1560, psi_mayachok: 637, gamma_fragment: 743, kvantovaya_batareya: 333 } },
            { id: "armor10", name: "УКАЗ АО-6 «Кочевник»", image: "images/armor/aoshka.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1545, veshestvo_07270: 2836, psi_mayachok: 1159, gamma_fragment: 1350, kvantovaya_batareya: 605 } },
            { id: "armor11", name: "Бронекостюм «Скиф-4/4б»", image: "images/armor/skif4.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 602, veshestvo_07270: 2202, psi_mayachok: 637, gamma_fragment: 505, kvantovaya_batareya: 489 } },
            { id: "armor12", name: "Бронекостюм «Скиф-5»", image: "images/armor/skuf.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1094, veshestvo_07270: 4004, psi_mayachok: 1159, gamma_fragment: 918, kvantovaya_batareya: 889 } },
            { id: "armor13", name: "Бронекостюм «Каратель»", image: "images/armor/karatel.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 2132, veshestvo_07270: 7799, psi_mayachok: 2258, gamma_fragment: 1788, kvantovaya_batareya: 1732 } },
            { id: "armor14", name: "Экзокостюм «Гончий»", image: "images/armor/kust.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 2132, veshestvo_07270: 7799, psi_mayachok: 2258, gamma_fragment: 1788, kvantovaya_batareya: 1732 } },
            { id: "armor15", name: "Поношенный комбинезон «Сатурн»", image: "images/armor/paket.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 920, veshestvo_07270: 918, psi_mayachok: 975, gamma_fragment: 1129 } },
            { id: "armor16", name: "Комбинезон «Сатурн»", image: "images/armor/paket.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1674, veshestvo_07270: 1668, psi_mayachok: 1773, gamma_fragment: 2052 } },
            { id: "armor17", name: "Комбинезон «Пересвет»", image: "images/armor/peresvet.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 3260, veshestvo_07270: 3250, psi_mayachok: 3453, gamma_fragment: 3997 } },
            { id: "armor18", name: "Поношенный «Легионер»", image: "images/armor/legioner.webp", rank: "Ветеран", resources: { severny_moh: 417, durman_kamen: 582, ostatki_akkumulyatora: 175, beta_fragment: 73 } },
            { id: "armor19", name: "Тяжелый бронекостюм «Легионер»", image: "images/armor/legioner.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 203, veshestvo_07270: 1082, psi_mayachok: 215, gamma_fragment: 207 } },
            { id: "armor20", name: "Поврежденный «Центурион»", image: "images/armor/centurion.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 370, veshestvo_07270: 1968, psi_mayachok: 392, gamma_fragment: 376 } },
            { id: "armor21", name: "Поношенный защитный костюм «Ош»", image: "images/armor/osh.webp", rank: "Ветеран", resources: { severny_moh: 856, durman_kamen: 284, ostatki_akkumulyatora: 212, beta_fragment: 60 } },
            { id: "armor22", name: "Защитный костюм «Ош»", image: "images/armor/osh.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 417, veshestvo_07270: 527, psi_mayachok: 261, gamma_fragment: 171 } },
            { id: "armor23", name: "Экзоброня «Егерь»", image: "images/armor/eger.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 759, veshestvo_07270: 959, psi_mayachok: 474, gamma_fragment: 310 } },
            { id: "armor24", name: "Tяжелый бронекостюм «Громила/Восход»", image: "images/armor/gromila.webp", rank: "Ветеран", resources: { severny_moh: 549, durman_kamen: 373, ostatki_akkumulyatora: 230, beta_fragment: 79 } },
            { id: "armor25", name: "Поношенная «Масть/Самсон»", image: "images/armor/mast.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 268, veshestvo_07270: 693, psi_mayachok: 283, gamma_fragment: 224 } },
            { id: "armor26", name: "Экзоскелет «Масть/Самсон»", image: "images/armor/mast.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 487, veshestvo_07270: 1261, psi_mayachok: 515, gamma_fragment: 408 } },
            { id: "armor27", name: "Поношенный АО-4 «Рейдер»", image: "images/armor/ao4.webp", rank: "Ветеран", resources: { severny_moh: 659, durman_kamen: 299, ostatki_akkumulyatora: 184, beta_fragment: 95 } },
            { id: "armor28", name: "УКАЗ АО-4 «Рейдер»", image: "images/armor/ao4.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 321, veshestvo_07270: 555, psi_mayachok: 227, gamma_fragment: 269 } },
            { id: "armor29", name: "УКАЗ АО-5 «Пилигрим»", image: "images/armor/ao5.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 584, veshestvo_07270: 1009, psi_mayachok: 412, gamma_fragment: 490 } },
            { id: "armor30", name: "Поношенный «Пахан/Скиф-2м»", image: "images/armor/pahan.webp", rank: "Ветеран", resources: { severny_moh: 483, durman_kamen: 508, ostatki_akkumulyatora: 203, beta_fragment: 70 } },
            { id: "armor31", name: "Бронекостюм «Пахан/Скиф-2м»", image: "images/armor/pahan.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 235, veshestvo_07270: 943, psi_mayachok: 249, gamma_fragment: 198 } },
            { id: "armor32", name: "Поношенный «Скиф-4/4б»", image: "images/armor/skif4.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 428, veshestvo_07270: 1715, psi_mayachok: 454, gamma_fragment: 359 } },
            { id: "armor33", name: "Поношенный комбинезон «Жнец/Уран»", image: "images/armor/znec.webp", rank: "Ветеран", resources: { severny_moh: 571, durman_kamen: 149, ostatki_akkumulyatora: 240, beta_fragment: 121 } },
            { id: "armor34", name: "Комбинезон «Жнец/Уран»", image: "images/armor/znec.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 278, veshestvo_07270: 277, psi_mayachok: 295, gamma_fragment: 341 } },
            { id: "armor35", name: "КИМ-122 «Аметист»", image: "images/armor/ametist.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 366, veshestvo_07270: 365, psi_mayachok: 388, gamma_fragment: 449 } },
            { id: "armor36", name: "Поврежденный комбинезон «Сатурн»", image: "images/armor/paket.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 506, veshestvo_07270: 505, psi_mayachok: 536, gamma_fragment: 621 } },
            { id: "armor37", name: "Поношенный бронекостюм «Гоплит»", image: "images/armor/goplit.webp", rank: "Сталкер", resources: { romashka: 89, rassolnik: 90, radioperedatchik: 46, alfa_fragment: 16 } },
            { id: "armor38", name: "Бронекостюм «Гоплит»", image: "images/armor/goplit.webp", rank: "Сталкер", resources: { romashka: 161, rassolnik: 163, radioperedatchik: 83, alfa_fragment: 30 } },
            { id: "armor39", name: "Поношенный защитный костюм «Ворса»", image: "images/armor/vorsa.webp", rank: "Сталкер", resources: { romashka: 182, rassolnik: 44, radioperedatchik: 55, alfa_fragment: 14 } },
            { id: "armor40", name: "Защитный костюм «Ворса»", image: "images/armor/vorsa.webp", rank: "Сталкер", resources: { romashka: 331, rassolnik: 80, radioperedatchik: 100, alfa_fragment: 25 } },
            { id: "armor41", name: "Поношенный бронекостюм «Пересмешник/Сокол»", image: "images/armor/peresm.webp", rank: "Сталкер", resources: { romashka: 103, rassolnik: 79, radioperedatchik: 53, alfa_fragment: 16 } },
            { id: "armor42", name: "Поношенный тяжелый бронекостюм «Громила/Восход»", image: "images/armor/gromila.webp", rank: "Сталкер", resources: { romashka: 212, rassolnik: 105, radioperedatchik: 109, alfa_fragment: 32 } },
            { id: "armor43", name: "Бронекостюм «Пересмешник/Сокол»", image: "images/armor/peresm.webp", rank: "Сталкер", resources: { romashka: 187, rassolnik: 143, radioperedatchik: 96, alfa_fragment: 29 } },
            { id: "armor44", name: "Поношенный костюм АО-3 «Искатель»", image: "images/armor/ao3.webp", rank: "Сталкер", resources: { romashka: 140, rassolnik: 46, radioperedatchik: 48, alfa_fragment: 21 } },
            { id: "armor45", name: "Костюм АО-3 «Искатель»", image: "images/armor/ao3.webp", rank: "Сталкер", resources: { romashka: 254, rassolnik: 84, radioperedatchik: 87, alfa_fragment: 39 } },
            { id: "armor46", name: "Поношенный КИМ-99М «Малахит»", image: "images/armor/kim.webp", rank: "Сталкер", resources: { romashka: 121, rassolnik: 23, radioperedatchik: 62, alfa_fragment: 27 } },
            { id: "armor47", name: "КИМ-99М «Малахит»", image: "images/armor/kim.webp", rank: "Сталкер", resources: { romashka: 221, rassolnik: 42, radioperedatchik: 113, alfa_fragment: 49 } },
            { id: "armor48", name: "КИМ-113 «Иолит/Изумруд/Топаз»", image: "images/armor/iolit.webp", rank: "Сталкер", resources: { severny_moh: 929, durman_kamen: 243, ostatki_akkumulyatora: 390, beta_fragment: 196 } },
            { id: "armor49", name: "Костюм «Скаут»»", image: "images/armor/scout.webp", rank: "Новичок", resources: { koren_vonyuchka: 58, srachnik: 72 } },
            { id: "armor50", name: "Бронекостюм «Червь/Комбат-5М»", image: "images/armor/worm.webp", rank: "Новичок", resources: { koren_vonyuchka: 43, srachnik: 52, mednaya_provoloka: 36 } },
            { id: "armor51", name: "Бронекостюм «Страйкер»", image: "images/armor/striker.webp", rank: "Новичок", resources: { koren_vonyuchka: 78, srachnik: 95, mednaya_provoloka: 65 } },
            { id: "armor52", name: "Защитный костюм «Псарь»", image: "images/armor/psar.webp", rank: "Новичок", resources: { koren_vonyuchka: 118, srachnik: 35 } },
            { id: "armor53", name: "Поношенный костюм «Траппер»", image: "images/armor/trapper.webp", rank: "Новичок", resources: { koren_vonyuchka: 87, srachnik: 26, mednaya_provoloka: 36 } },
            { id: "armor54", name: "Костюм «Траппер»", image: "images/armor/trapper.webp", rank: "Новичок", resources: { koren_vonyuchka: 157, srachnik: 48, mednaya_provoloka: 65 } },
            { id: "armor55", name: "Костюм АО-1 «Бродяга»", image: "images/armor/ao1.webp", rank: "Новичок", resources: { koren_vonyuchka: 106, srachnik: 43 } },
            { id: "armor56", name: "Поношенный АО-2 «Странник»", image: "images/armor/ao2.webp", rank: "Новичок", resources: { koren_vonyuchka: 69, srachnik: 28, mednaya_provoloka: 47 } },
            { id: "armor57", name: "Костюм АО-2 «Странник»", image: "images/armor/ao2.webp", rank: "Новичок", resources: { koren_vonyuchka: 126, srachnik: 51, mednaya_provoloka: 86 } },
            { id: "armor58", name: "Бандитский костюм/Аврора с противогазом", image: "images/armor/bksp.webp", rank: "Новичок", resources: { koren_vonyuchka: 70, srachnik: 64 } },
            { id: "armor59", name: "Поношенный «Клептоман/Грибник»", image: "images/armor/kleptoman.webp", rank: "Новичок", resources: { koren_vonyuchka: 50, srachnik: 44, mednaya_provoloka: 41 } },
            { id: "armor60", name: "Костюм «Клептоман/Грибник»", image: "images/armor/kleptoman.webp", rank: "Новичок", resources: { koren_vonyuchka: 91, srachnik: 80, mednaya_provoloka: 75 } },
            { id: "armor61", name: "Бандитский костюм с баллонами/Аврора-Б", image: "images/armor/bksb.webp", rank: "Новичок", resources: { koren_vonyuchka: 176 } },
            { id: "armor62", name: "Поношенный КИМ-99 «Янтарь»", image: "images/armor/yantar.webp", rank: "Новичок", resources: { koren_vonyuchka: 87, mednaya_provoloka: 72 } },
            { id: "armor63", name: "КИМ-99 «Янтарь»", image: "images/armor/yantar.webp", rank: "Новичок", resources: { koren_vonyuchka: 157, mednaya_provoloka: 130 } },
            { id: "armor64", name: "Куртка с бронежилетом", image: "images/armor/ksb.webp", rank: "Отмычка", resources: { green_plesen: 20, bolotny_kamen: 42 } },
            { id: "armor65", name: "Маскировочный костюм «Смородина»", image: "images/armor/smorodina.webp", rank: "Отмычка", resources: { green_plesen: 28, bolotny_kamen: 59 } },
            { id: "armor66", name: "Плащ", image: "images/armor/coat.webp", rank: "Отмычка", resources: { green_plesen: 40, bolotny_kamen: 21 } },
            { id: "armor67", name: "Охотничий плащ", image: "images/armor/hcoat.webp", rank: "Отмычка", resources: { green_plesen: 56, bolotny_kamen: 29 } },
            { id: "armor68", name: "ЗК-1 «Отмычка»", image: "images/armor/zk1.webp", rank: "Отмычка", resources: { green_plesen: 37, bolotny_kamen: 26 } },
            { id: "armor69", name: "Бандитский костюм/Комбинезон «Аврора»", image: "images/armor/bandcost.webp", rank: "Отмычка", resources: { green_plesen: 44, bolotny_kamen: 69 } },
            { id: "armor70", name: "ИП-4м", image: "images/armor/ip4m.webp", rank: "Отмычка", resources: { green_plesen: 82 } }
        ],
        weapons: [
            { id: "weapon1", name: "А-545", image: "images/weapon/545.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1220, veshestvo_07270: 4939, psi_mayachok: 1534, gamma_fragment: 1023, kvantovaya_batareya: 1011 } },
            { id: "weapon2", name: "АМБ-17", image: "images/weapon/amb.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1220, veshestvo_07270: 4939, psi_mayachok: 1534, gamma_fragment: 1023, kvantovaya_batareya: 1011 } },
            { id: "weapon3", name: "АК-15", image: "images/weapon/ak15.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1220, veshestvo_07270: 4939, psi_mayachok: 1292, gamma_fragment: 1215, kvantovaya_batareya: 1011 } },
            { id: "weapon4", name: "АШ-12", image: "images/weapon/ash.webp", rank: "Мастер", resources: { gorkolistnik: 2043, limb: 2114, lambda_fragment: 382, anomalnaya_batareya: 68, limboplazma: 31 } },
            { id: "weapon5", name: "FN F2000 Tactical", image: "images/weapon/fnt.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1220, veshestvo_07270: 4939, psi_mayachok: 1292, gamma_fragment: 1215, kvantovaya_batareya: 1011 } },
            { id: "weapon6", name: "СР-3М", image: "images/weapon/cp3m.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1044, veshestvo_07270: 4234, psi_mayachok: 1312, gamma_fragment: 888, kvantovaya_batareya: 867 } },
            { id: "weapon7", name: "ППК-20", image: "images/weapon/ppk.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1044, veshestvo_07270: 4234, psi_mayachok: 1312, gamma_fragment: 888, kvantovaya_batareya: 867 } },
            { id: "weapon8", name: "TDI KRISS Vector", image: "images/weapon/vector.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1044, veshestvo_07270: 4234, psi_mayachok: 1105, gamma_fragment: 1054, kvantovaya_batareya: 867 } },
            { id: "weapon9", name: "ПКП «Печенег»", image: "images/weapon/pkp.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1152, veshestvo_07270: 4390, psi_mayachok: 1220, gamma_fragment: 966, kvantovaya_batareya: 899 } },
            { id: "weapon10", name: "L96A1", image: "images/weapon/l96.webp", rank: "Мастер", resources: { veshestvo_07270: 4763, psi_mayachok: 1295, gamma_fragment: 1040, kvantovaya_batareya: 1016 } },
            { id: "weapon11", name: "СВД-М", image: "images/weapon/svdm.webp", rank: "Мастер", resources: { veshestvo_07270: 4763, psi_mayachok: 1295, gamma_fragment: 1040, kvantovaya_batareya: 1016 } },
            { id: "weapon12", name: "ВССК «Выхлоп»", image: "images/weapon/vssk.webp", rank: "Мастер", resources: { limb: 2348, lambda_fragment: 402, anomalnaya_batareya: 73, limboplazma: 15 } },
            { id: "weapon13", name: "Mk 14 EBR", image: "images/weapon/ebr.webp", rank: "Мастер", resources: { veshestvo_07270: 4763, psi_mayachok: 1295, gamma_fragment: 1040, kvantovaya_batareya: 1016 } },
            { id: "weapon14", name: "ВСС-М «Винторез»", image: "images/weapon/vssm.webp", rank: "Мастер", resources: { veshestvo_07270: 4763, psi_mayachok: 1476, gamma_fragment: 999, kvantovaya_batareya: 975 } },
            { id: "weapon15", name: "ОЦ-33 «Пернач»", image: "images/weapon/pernach.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 943, veshestvo_07270: 2444, psi_mayachok: 1469, gamma_fragment: 1163, kvantovaya_batareya: 490 } },
            { id: "weapon16", name: "Desert Eagle Mark XIX", image: "images/weapon/deagle.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 943, veshestvo_07270: 2444, psi_mayachok: 1469, gamma_fragment: 1163, kvantovaya_batareya: 490 } },
            { id: "weapon17", name: "РШ-12", image: "images/weapon/rsh.webp", rank: "Мастер", resources: { gorkolistnik: 1487, limb: 1310, lambda_fragment: 387, anomalnaya_batareya: 40, limboplazma: 15 } },
            { id: "weapon18", name: "Кукри", image: "images/weapon/kukri.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 635, psi_mayachok: 449, gamma_fragment: 533, kvantovaya_batareya: 234 } },
            { id: "weapon19", name: "Антитеррор", image: "images/weapon/anti.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 960, veshestvo_07270: 1040, psi_mayachok: 450, gamma_fragment: 320, kvantovaya_batareya: 350 } },
            { id: "weapon20", name: "Тактическая катана", image: "images/weapon/katana.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 960, veshestvo_07270: 1040, psi_mayachok: 450, gamma_fragment: 320, kvantovaya_batareya: 350 } },
            { id: "weapon21", name: "АН-94М «Абакан»", image: "images/weapon/abakan.webp", rank: "Ветеран", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 450, beta_fragment: 125 } },
            { id: "weapon22", name: "АЕК-971", image: "images/weapon/aek.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 586, veshestvo_07270: 2373, psi_mayachok: 737, gamma_fragment: 492, kvantovaya_batareya: 486 } },
            { id: "weapon23", name: "АКМ «Тишина»", image: "images/weapon/akmt.webp", rank: "Ветеран", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 450, beta_fragment: 125 } },
            { id: "weapon24", name: "АС «Вал»", image: "images/weapon/val.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 586, veshestvo_07270: 2373, psi_mayachok: 737, gamma_fragment: 492, kvantovaya_batareya: 486 } },
            { id: "weapon25", name: "ВСС «Винторез»", image: "images/weapon/vss.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 564, veshestvo_07270: 2288, psi_mayachok: 709, gamma_fragment: 480, kvantovaya_batareya: 469 } },
            { id: "weapon26", name: "АК-103", image: "images/weapon/103.webp", rank: "Ветеран", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 450, beta_fragment: 125 } },
            { id: "weapon27", name: "ОЦ-14 «Гроза»", image: "images/weapon/groza.webp", rank: "Ветеран", resources: { gorkolistnik: 982, limb: 1015, lambda_fragment: 184, anomalnaya_batareya: 33, limboplazma: 14 } },
            { id: "weapon28", name: "АК-203", image: "images/weapon/203.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 586, veshestvo_07270: 2373, psi_mayachok: 737, gamma_fragment: 492, kvantovaya_batareya: 486 } },
            { id: "weapon29", name: "РПД", image: "images/weapon/rpd.webp", rank: "Ветеран", resources: { severny_moh: 764, durman_kamen: 804, ostatki_akkumulyatora: 321, beta_fragment: 111 } },
            { id: "weapon30", name: "РПК-74", image: "images/weapon/rpk74.webp", rank: "Ветеран", resources: { severny_moh: 764, durman_kamen: 804, ostatki_akkumulyatora: 321, beta_fragment: 111 } },
            { id: "weapon31", name: "Поношенный ПКП", image: "images/weapon/pkp.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 553, veshestvo_07270: 2109, psi_mayachok: 586, gamma_fragment: 464, kvantovaya_batareya: 432 } },
            { id: "weapon32", name: "Поношенная HK G3A1", image: "images/weapon/phk.webp", rank: "Ветеран", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 450, beta_fragment: 125 } },
            { id: "weapon33", name: "HK G3A1", image: "images/weapon/hk.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 586, veshestvo_07270: 2373, psi_mayachok: 621, gamma_fragment: 584, kvantovaya_batareya: 486 } },
            { id: "weapon34", name: "SIG SG 550", image: "images/weapon/sig.webp", rank: "Ветеран", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 364, beta_fragment: 155 } },
            { id: "weapon35", name: "L86A1", image: "images/weapon/l86a1.webp", rank: "Ветеран", resources: { severny_moh: 908, durman_kamen: 941, ostatki_akkumulyatora: 381, beta_fragment: 163 } },
            { id: "weapon36", name: "HK G36C", image: "images/weapon/g36c.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 586, veshestvo_07270: 2373, psi_mayachok: 621, gamma_fragment: 584, kvantovaya_batareya: 486 } },
            { id: "weapon37", name: "M4A1 CQC", image: "images/weapon/cqc.webp", rank: "Ветеран", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 364, beta_fragment: 155 } },
            { id: "weapon38", name: "L85A1", image: "images/weapon/l85a1.webp", rank: "Ветеран", resources: { severny_moh: 867, durman_kamen: 899, ostatki_akkumulyatora: 364, beta_fragment: 155 } },
            { id: "weapon39", name: "FN F2000", image: "images/weapon/f2000.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 586, veshestvo_07270: 2373, psi_mayachok: 621, gamma_fragment: 584, kvantovaya_batareya: 486 } },
            { id: "weapon40", name: "СР-2М «Вереск»", image: "images/weapon/veresk.webp", rank: "Ветеран", resources: { severny_moh: 770, durman_kamen: 799, ostatki_akkumulyatora: 400, beta_fragment: 111 } },
            { id: "weapon41", name: "СР-3 «Вихрь»", image: "images/weapon/vihr.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 501, veshestvo_07270: 2034, psi_mayachok: 630, gamma_fragment: 426, kvantovaya_batareya: 416 } },
            { id: "weapon42", name: "ПП-19-01 «Витязь»", image: "images/weapon/pp19.webp", rank: "Ветеран", resources: { severny_moh: 770, durman_kamen: 799, ostatki_akkumulyatora: 400, beta_fragment: 111 } },
            { id: "weapon43", name: "«Витязь-СН»", image: "images/weapon/vityaz.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 501, veshestvo_07270: 2034, psi_mayachok: 630, gamma_fragment: 426, kvantovaya_batareya: 416 } },
            { id: "weapon44", name: "ПП-19 «Бизон-2-01»", image: "images/weapon/bizon.webp", rank: "Ветеран", resources: { severny_moh: 770, durman_kamen: 799, ostatki_akkumulyatora: 400, beta_fragment: 111 } },
            { id: "weapon45", name: "FN P90", image: "images/weapon/p90.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 501, veshestvo_07270: 2034, psi_mayachok: 531, gamma_fragment: 506, kvantovaya_batareya: 416 } },
            { id: "weapon46", name: "HK UMP45", image: "images/weapon/ump45.webp", rank: "Ветеран", resources: { severny_moh: 770, durman_kamen: 799, ostatki_akkumulyatora: 323, beta_fragment: 138 } },
            { id: "weapon47", name: "Beretta Mx4 Storm", image: "images/weapon/mx4.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 501, veshestvo_07270: 2034, psi_mayachok: 531, gamma_fragment: 506, kvantovaya_batareya: 416 } },
            { id: "weapon48", name: "HK MP5", image: "images/weapon/mp5.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 501, veshestvo_07270: 2034, psi_mayachok: 531, gamma_fragment: 506, kvantovaya_batareya: 416 } },
            { id: "weapon49", name: "Поношенная M40A5", image: "images/weapon/m40a5.webp", rank: "Ветеран", resources: { durman_kamen: 983, ostatki_akkumulyatora: 419, beta_fragment: 144 } },
            { id: "weapon50", name: "M40A5", image: "images/weapon/m40a5.webp", rank: "Ветеран", resources: { veshestvo_07270: 2288, psi_mayachok: 622, gamma_fragment: 500, kvantovaya_batareya: 488 } },
            { id: "weapon51", name: "СВД", image: "images/weapon/svd.webp", rank: "Ветеран", resources: { durman_kamen: 983, ostatki_akkumulyatora: 419, beta_fragment: 144 } },
            { id: "weapon52", name: "СВД-С", image: "images/weapon/svds.webp", rank: "Ветеран", resources: { veshestvo_07270: 2288, psi_mayachok: 622, gamma_fragment: 500, kvantovaya_batareya: 488 } },
            { id: "weapon53", name: "СВУ", image: "images/weapon/svu.webp", rank: "Ветеран", resources: { veshestvo_07270: 2288, psi_mayachok: 622, gamma_fragment: 500, kvantovaya_batareya: 488 } },
            { id: "weapon54", name: "МЦ-558", image: "images/weapon/mc558.webp", rank: "Ветеран", resources: { limb: 1128, lambda_fragment: 193, anomalnaya_batareya: 35, limboplazma: 14 } },
            { id: "weapon55", name: "M1A", image: "images/weapon/m1a.webp", rank: "Ветеран", resources: { durman_kamen: 983, ostatki_akkumulyatora: 419, beta_fragment: 144 } },
            { id: "weapon56", name: "M1A FA", image: "images/weapon/m1afa.webp", rank: "Ветеран", resources: { veshestvo_07270: 2288, psi_mayachok: 622, gamma_fragment: 500, kvantovaya_batareya: 488 } },
            { id: "weapon57", name: "Сайга-12К", image: "images/weapon/saiga.webp", rank: "Ветеран", resources: { severny_moh: 1613, ostatki_akkumulyatora: 428, beta_fragment: 233 } },
            { id: "weapon58", name: "Protecta", image: "images/weapon/protecta.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 1066, psi_mayachok: 713, gamma_fragment: 894 } },
            { id: "weapon59", name: "Beretta 92FS", image: "images/weapon/92fs.webp", rank: "Ветеран", resources: { severny_moh: 294, durman_kamen: 200, ostatki_akkumulyatora: 171, beta_fragment: 59 } },
            { id: "weapon60", name: "Glock 17", image: "images/weapon/glock17.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 235, veshestvo_07270: 609, psi_mayachok: 344, gamma_fragment: 272 } },
            { id: "weapon61", name: "Beretta 93R", image: "images/weapon/93r.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 235, veshestvo_07270: 609, psi_mayachok: 344, gamma_fragment: 272 } },
            { id: "weapon62", name: "SW1911", image: "images/weapon/1911.webp", rank: "Ветеран", resources: { severny_moh: 294, durman_kamen: 200, ostatki_akkumulyatora: 171, beta_fragment: 59 } },
            { id: "weapon63", name: "Desert Eagle Mark VII", image: "images/weapon/deagle.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 235, veshestvo_07270: 609, psi_mayachok: 344, gamma_fragment: 272 } },
            { id: "weapon64", name: "Поношенный Colt Python", image: "images/weapon/python.webp", rank: "Ветеран", resources: { severny_moh: 294, durman_kamen: 200, ostatki_akkumulyatora: 171, beta_fragment: 59 } },
            { id: "weapon65", name: "Colt Python", image: "images/weapon/python.webp", rank: "Ветеран", resources: { gorkolistnik: 391, limb: 333, lambda_fragment: 100, limboplazma: 6 } },
            { id: "weapon66", name: "Охотничий мачете", image: "images/weapon/hmachet.webp", rank: "Ветеран", resources: { severny_moh: 370, ostatki_akkumulyatora: 98, beta_fragment: 53 } },
            { id: "weapon67", name: "Мачете Survival SP8 Ontario", image: "images/weapon/sp8.webp", rank: "Ветеран", resources: { ryzhiy_paporotnik: 305, psi_mayachok: 215, gamma_fragment: 256, kvantovaya_batareya: 112 } },
            { id: "weapon68", name: "ОЦ-04", image: "images/weapon/oc04.webp", rank: "Ветеран", resources: { severny_moh: 590, durman_kamen: 380, ostatki_akkumulyatora: 168, beta_fragment: 135 } },
            { id: "weapon69", name: "Штык-нож M9", image: "images/weapon/knifem9.webp", rank: "Ветеран", resources: { severny_moh: 630, durman_kamen: 340, ostatki_akkumulyatora: 218, beta_fragment: 108 } },
            { id: "weapon70", name: "АН-94 «Абакан»", image: "images/weapon/ah94.webp", rank: "Сталкер", resources: { romashka: 220, rassolnik: 166, radioperedatchik: 140, alfa_fragment: 34 } },
            { id: "weapon71", name: "АКМ", image: "images/weapon/akm.webp", rank: "Сталкер", resources: { romashka: 220, rassolnik: 166, radioperedatchik: 140, alfa_fragment: 34 } },
            { id: "weapon72", name: "Поношенный SIG SG 550", image: "images/weapon/sig.webp", rank: "Сталкер", resources: { romashka: 220, rassolnik: 166, radioperedatchik: 113, alfa_fragment: 42 } },
            { id: "weapon73", name: "Поношенная L86A1", image: "images/weapon/l86a1.webp", rank: "Сталкер", resources: { romashka: 201, rassolnik: 153, radioperedatchik: 103, alfa_fragment: 31 } },
            { id: "weapon74", name: "M4A1", image: "images/weapon/m4a1.webp", rank: "Сталкер", resources: { romashka: 220, rassolnik: 166, radioperedatchik: 113, alfa_fragment: 42 } },
            { id: "weapon75", name: "Поношенная L85A1", image: "images/weapon/pl85a1.webp", rank: "Сталкер", resources: { romashka: 220, rassolnik: 166, radioperedatchik: 113, alfa_fragment: 42 } },
            { id: "weapon76", name: "ПП-2000", image: "images/weapon/2000.webp", rank: "Сталкер", resources: { romashka: 182, rassolnik: 137, radioperedatchik: 116, alfa_fragment: 28 } },
            { id: "weapon77", name: "АЕК-919К «Каштан»", image: "images/weapon/919k.webp", rank: "Сталкер", resources: { romashka: 182, rassolnik: 137, radioperedatchik: 116, alfa_fragment: 28 } },
            { id: "weapon78", name: "Spectre M4", image: "images/weapon/spectrem4.webp", rank: "Сталкер", resources: { romashka: 182, rassolnik: 137, radioperedatchik: 93, alfa_fragment: 35 } },
            { id: "weapon79", name: "Winchester M70", image: "images/weapon/m70.webp", rank: "Сталкер", resources: { rassolnik: 169, radioperedatchik: 121, alfa_fragment: 36 } },
            { id: "weapon80", name: "СВТ-40", image: "images/weapon/cbt40.webp", rank: "Сталкер", resources: { rassolnik: 169, radioperedatchik: 121, alfa_fragment: 36 } },
            { id: "weapon81", name: "СКС-Т", image: "images/weapon/skst.webp", rank: "Сталкер", resources: { rassolnik: 169, radioperedatchik: 121, alfa_fragment: 36 } },
            { id: "weapon82", name: "Franchi SPAS-12", image: "images/weapon/spas.webp", rank: "Сталкер", resources: { romashka: 268, radioperedatchik: 87, alfa_fragment: 41 } },
            { id: "weapon83", name: "МР-153", image: "images/weapon/153.webp", rank: "Сталкер", resources: { severny_moh: 783, ostatki_akkumulyatora: 207, beta_fragment: 113 } },
            { id: "weapon84", name: "Mauser C96", image: "images/weapon/c96.webp", rank: "Сталкер", resources: { koren_vonyuchka: 31, srachnik: 19 } },
            { id: "weapon85", name: "Форт-12", image: "images/weapon/fort.webp", rank: "Сталкер", resources: { koren_vonyuchka: 75, srachnik: 46, mednaya_provoloka: 77 } },
            { id: "weapon86", name: "Walther P99", image: "images/weapon/p99.webp", rank: "Сталкер", resources: { koren_vonyuchka: 75, srachnik: 46, mednaya_provoloka: 77 } },
            { id: "weapon87", name: "Browning Hi-Power", image: "images/weapon/power.webp", rank: "Сталкер", resources: { koren_vonyuchka: 75, srachnik: 46, mednaya_provoloka: 77 } },
            { id: "weapon88", name: "Охотничий нож", image: "images/weapon/hunterk.webp", rank: "Сталкер", resources: { koren_vonyuchka: 81, mednaya_provoloka: 45 } },
            { id: "weapon89", name: "Тактический нож Ka-Bar BKR3", image: "images/weapon/bkr3.webp", rank: "Сталкер", resources: { romashka: 125, radioperedatchik: 41, alfa_fragment: 19 } },
            { id: "weapon90", name: "Glock Feldmesser 78", image: "images/weapon/gf78.webp", rank: "Сталкер", resources: { koren_vonyuchka: 125, srachnik: 101, mednaya_provoloka: 40 } },
            { id: "weapon91", name: "Монтировка", image: "images/weapon/crowbar.webp", rank: "Сталкер", resources: { koren_vonyuchka: 125, srachnik: 90, mednaya_provoloka: 49 } },
            { id: "weapon92", name: "АКС чистильщика", image: "images/weapon/aks.webp", rank: "Новичок", resources: { koren_vonyuchka: 38, srachnik: 29 } },
            { id: "weapon93", name: "АКС-74", image: "images/weapon/aks.webp", rank: "Новичок", resources: { green_plesen: 33, bolotny_kamen: 42 } },
            { id: "weapon94", name: "АК-74М", image: "images/weapon/74m.webp", rank: "Новичок", resources: { koren_vonyuchka: 41, srachnik: 38, mednaya_provoloka: 40 } },
            { id: "weapon95", name: "M16A2", image: "images/weapon/16a2.webp", rank: "Новичок", resources: { green_plesen: 33, bolotny_kamen: 42 } },
            { id: "weapon96", name: "M16A3", image: "images/weapon/16a3.webp", rank: "Новичок", resources: { koren_vonyuchka: 41, srachnik: 38, mednaya_provoloka: 40 } },
            { id: "weapon97", name: "ПП-91 «Кедр»", image: "images/weapon/kedr.webp", rank: "Новичок", resources: { green_plesen: 29, bolotny_kamen: 38 } },
            { id: "weapon98", name: "«Гепард»", image: "images/weapon/gepard.webp", rank: "Новичок", resources: { koren_vonyuchka: 58, srachnik: 53, mednaya_provoloka: 57 } },
            { id: "weapon99", name: "Vz.68 Scorpion", image: "images/weapon/scorp.webp", rank: "Новичок", resources: { green_plesen: 29, bolotny_kamen: 38 } },
            { id: "weapon100", name: "IMI Uzi", image: "images/weapon/uzi.webp", rank: "Новичок", resources: { koren_vonyuchka: 58, srachnik: 53, mednaya_provoloka: 57 } },
            { id: "weapon101", name: "Винтовка Мосина", image: "images/weapon/mosin.webp", rank: "Новичок", resources: { bolotny_kamen: 64 } },
            { id: "weapon102", name: "Поношенный Winchester M70", image: "images/weapon/m70.webp", rank: "Новичок", resources: { srachnik: 73, mednaya_provoloka: 66 } },
            { id: "weapon103", name: "СКТ-40", image: "images/weapon/skt40.webp", rank: "Новичок", resources: { srachnik: 73, mednaya_provoloka: 66 } },
            { id: "weapon104", name: "СКС", image: "images/weapon/sks.webp", rank: "Новичок", resources: { srachnik: 73, mednaya_provoloka: 66 } },
            { id: "weapon105", name: "Shorty 590", image: "images/weapon/590.webp", rank: "Новичок", resources: { green_plesen: 93 } },
            { id: "weapon106", name: "ТОЗ-34", image: "images/weapon/toz.webp", rank: "Новичок", resources: { koren_vonyuchka: 96 } },
            { id: "weapon107", name: "МР-133", image: "images/weapon/133.webp", rank: "Новичок", resources: { koren_vonyuchka: 136, mednaya_provoloka: 75 } },
            { id: "weapon108", name: "Mossberg 590A1", image: "images/weapon/590a1.webp", rank: "Новичок", resources: { koren_vonyuchka: 136, mednaya_provoloka: 75 } },
            { id: "weapon109", name: "ТТ", image: "images/weapon/tt.webp", rank: "Новичок", resources: { green_plesen: 11, bolotny_kamen: 12 } },
            { id: "weapon110", name: "Нож 6Х9", image: "images/weapon/6x9.webp", rank: "Новичок", resources: { green_plesen: 32 } },
            { id: "weapon111", name: "КО-1", image: "images/weapon/ko1.webp", rank: "Новичок", resources: { green_plesen: 6, bolotny_kamen: 3 } },
            { id: "weapon112", name: "Молоток", image: "images/weapon/hammer.webp", rank: "Новичок", resources: { green_plesen: 4, bolotny_kamen: 5 } }
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
            // АШ-12 надульник
            { id: "attachment59", name: "ДТК АШ-12", image: "images/attachment/dtkash.webp", rank: "Ветка надульника на АШ-12", resources: { ryzhiy_paporotnik: 610, veshestvo_07270: 900, psi_mayachok: 460, gamma_fragment: 124, kvantovaya_batareya: 198 } },
            { id: "attachment60", name: "Рукоятка для ОЦ-14 «Гроза»", image: "images/attachment/rukgroza.webp", rank: "Ветка надульника на АШ-12", resources: { ryzhiy_paporotnik: 149, veshestvo_07270: 359, psi_mayachok: 129, gamma_fragment: 136 } },
            { id: "attachment61", name: "SPRV 7.62", image: "images/attachment/venom.webp", rank: "Ветка надульника на АШ-12", resources: { severny_moh: 87, durman_kamen: 59, ostatki_akkumulyatora: 73, beta_fragment: 13 } },
            { id: "attachment62", name: "Spikes Tactical Dynacomp", image: "images/attachment/venom.webp", rank: "Ветка надульника на АШ-12", resources: { romashka: 29, rassolnik: 14, radioperedatchik: 30, alfa_fragment: 4 } },
            { id: "attachment63", name: "Пламегаситель AKademia Тьма", image: "images/attachment/venom.webp", rank: "Ветка надульника на АШ-12", resources: { koren_vonyuchka: 18, srachnik: 11, mednaya_provoloka: 30 } },
            // АШ-12 глушитель
            { id: "attachment64", name: "Глушитель АШ-12/МЦ-558", image: "images/attachment/sash.webp", rank: "Ветка глушителя на АШ-12", resources: { ryzhiy_paporotnik: 615, veshestvo_07270: 875, psi_mayachok: 450, gamma_fragment: 121, kvantovaya_batareya: 193 } },
            { id: "attachment65", name: "Глушитель для ОЦ-14 «Гроза»", image: "images/attachment/sgroza.webp", rank: "Ветка глушителя на АШ-12", resources: { veshestvo_07270: 185, psi_mayachok: 151, gamma_fragment: 60 } },
            { id: "attachment66", name: "ПБС-1", image: "images/attachment/atg.webp", rank: "Ветка глушителя на АШ-12", resources: { durman_kamen: 123, ostatki_akkumulyatora: 152, beta_fragment: 26 } },
            // Ствол на дигл
            { id: "attachment67", name: "Удлиненный ствол D-Eagle", image: "images/attachment/lgdeagle.webp", rank: "Ствол на D-Eagle", resources: { ryzhiy_paporotnik: 289, veshestvo_07270: 870, psi_mayachok: 276, gamma_fragment: 135 } },
        ]
    };

    // DOM-элементы
    const armorPresetsContainer = document.getElementById('armor-presets');
    const weaponPresetsContainer = document.getElementById('weapon-presets');
    const containerPresetsContainer = document.getElementById('container-presets');
    const attachmentPresetsContainer = document.getElementById('attachment-presets');
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
        const selectedPresets = { armor: [], weapons: [], containers: [], backpacks: [], attachments: [] };
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
    renderRankedPresets(attachmentPresetsContainer, presetsData.attachments)
});
