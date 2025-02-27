document.addEventListener('DOMContentLoaded', function() {

    // Ранговые категории
    const armorRanks = {
        "Отмычка": "rank-gray",
        "Новичок": "rank-green",
        "Сталкер": "rank-blue",
        "Ветеран": "rank-purple",
        "Мастер": "rank-red"
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
            { id: "weapon2", name: "АК-15", image: "images/weapon/ak15.webp", rank: "Мастер", resources: { ryzhiy_paporotnik: 1220, veshestvo_07270: 4939, psi_mayachok: 1292, gamma_fragment: 1215, kvantovaya_batareya: 1011 } }
        ]
    };

    // DOM-элементы
    const armorPresetsContainer = document.getElementById('armor-presets');
    const weaponPresetsContainer = document.getElementById('weapon-presets');
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
            summary.textContent = rank;
            summary.classList.add(armorRanks[rank]); // Добавляем цвет ранга
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
        const selectedPresets = { armor: [], weapons: [] };
        const totalResources = {};

        document.querySelectorAll('#armor-presets input:checked').forEach(checkbox => {
            selectedPresets.armor.push(checkbox.value);
        });
        document.querySelectorAll('#weapon-presets input:checked').forEach(checkbox => {
            selectedPresets.weapons.push(checkbox.value);
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
});
