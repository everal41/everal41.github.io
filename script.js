document.addEventListener('DOMContentLoaded', function() { // Обертка для DOMContentLoaded

    // Данные о пресетах (ВАШИ ДАННЫЕ)
    const presetsData = {
        armor: [
            { id: "armor1", name: "Бронескелет «Центурион»", image: "images/centurion.webp", resources: { ryzhiy_paporotnik: 901, veshestvo_07270: 4671, psi_mayachok: 955, gamma_fragment: 864, kvantovaya_batareya: 996 } },
            { id: "armor2", name: "Экзоброня «Зверобой»", image: "images/furryeb.webp", resources: { ryzhiy_paporotnik: 2511, veshestvo_07270: 3170, psi_mayachok: 1568, gamma_fragment: 1026 } },
            { id: "armor3", name: "Экзоскелет «Туз/Мул»", image: "images/tuz.webp", resources: { ryzhiy_paporotnik: 1287, veshestvo_07270: 3337, psi_mayachok: 1364, gamma_fragment: 1080, kvantovaya_batareya: 711 } },
            { id: "armor4", name: "Сверхтяжелый бронекостюм", image: "images/banka.webp", resources: { ryzhiy_paporotnik: 1755, veshestvo_07270: 9099, psi_mayachok: 1859, gamma_fragment: 1683, kvantovaya_batareya: 1940 } },
            { id: "armor5", name: "Бронекостюм «Авангард»", image: "images/avangard.webp", resources: { ryzhiy_paporotnik: 2508, veshestvo_07270: 6499, psi_mayachok: 2656, gamma_fragment: 2104, kvantovaya_batareya: 1386 } },
            { id: "armor6", name: "УКАЗ АО-6 «Кочевник»", image: "images/aoshka.webp", resources: { ryzhiy_paporotnik: 1545, veshestvo_07270: 2836, psi_mayachok: 1159, gamma_fragment: 1350, kvantovaya_batareya: 605 } },
            { id: "armor7", name: "Бронекостюм «Скиф-5»", image: "images/skuf.webp", resources: { ryzhiy_paporotnik: 1094, veshestvo_07270: 4004, psi_mayachok: 1159, gamma_fragment: 918, kvantovaya_batareya: 889 } },
            { id: "armor8", name: "Экзокостюм «Гончий»", image: "images/kust.webp", resources: { ryzhiy_paporotnik: 2132, veshestvo_07270: 7799, psi_mayachok: 2258, gamma_fragment: 1788, kvantovaya_batareya: 1732 } },
            { id: "armor9", name: "Бронекостюм «Каратель»", image: "images/karatel.webp", resources: { ryzhiy_paporotnik: 2132, veshestvo_07270: 7799, psi_mayachok: 2258, gamma_fragment: 1788, kvantovaya_batareya: 1732 } },
            { id: "armor10", name: "Комбинезон «Сатурн»", image: "images/paket.webp", resources: { ryzhiy_paporotnik: 1674, veshestvo_07270: 1668, psi_mayachok: 1773, gamma_fragment: 2052 } },
            { id: "armor11", name: "Комбинезон «Пересвет»", image: "images/peresvet.webp", resources: { ryzhiy_paporotnik: 3260, veshestvo_07270: 3250, psi_mayachok: 3453, gamma_fragment: 3997 } }
        ],
        weapons: [
            { id: "weapon1", name: "А-545", image: "images/545.webp", resources: { ryzhiy_paporotnik: 1220, veshestvo_07270: 4939, psi_mayachok: 1534, gamma_fragment: 1023, kvantovaya_batareya: 1011 } },
            { id: "weapon2", name: "АК-15", image: "images/ak15.webp", resources: { ryzhiy_paporotnik: 1220, veshestvo_07270: 4939, psi_mayachok: 1292, gamma_fragment: 1215, kvantovaya_batareya: 1011 } },
            { id: "weapon3", name: "АМБ-17", image: "images/amb.webp", resources: { ryzhiy_paporotnik: 1220, veshestvo_07270: 4939, psi_mayachok: 1534, gamma_fragment: 1023, kvantovaya_batareya: 1011 } },
            { id: "weapon4", name: "АШ-12", image: "images/ash.webp", resources: { gorkolistnik: 2043, limb: 2114, lambda_fragment: 382, anomalnaya_batareya: 68, limboplazma: 31 } },
            { id: "weapon5", name: "FN F2000 Tactical", image: "images/fnt.webp", resources: { ryzhiy_paporotnik: 1220, veshestvo_07270: 4939, psi_mayachok: 1292, gamma_fragment: 1215, kvantovaya_batareya: 1011 } }
        ]
    };

    // Элементы DOM
    const armorPresetsList = document.getElementById('armor-presets');
    const weaponPresetsList = document.getElementById('weapon-presets');
    const calculateBtn = document.getElementById('calculateBtn');
    const couponBtn = document.getElementById('couponBtn'); // Кнопка купона
    const couponSelect = document.getElementById('couponSelect'); // Селект с процентами
    let discount = 1; // Скидка по умолчанию (1 = без скидки)

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

    function renderPresets() {
        presetsData.armor.forEach(preset => {
            armorPresetsList.appendChild(createPresetElement(preset));
        });
        presetsData.weapons.forEach(preset => {
            weaponPresetsList.appendChild(createPresetElement(preset));
        });
    }

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
                // Применяем скидку ПЕРЕД установкой значения
                inputElement.value = Math.max(0, Math.round((totalResources[resId] || 0) * discount)); // Округляем и не допускаем отрицательных значений
            }
        });
        calculate(); // Добавил вызов calculate() после обновления значений
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

    // Обработчик для кнопки купона
    couponBtn.addEventListener('click', function() {
        const selectedDiscount = parseFloat(couponSelect.value); // Получаем значение из селекта
        if (!isNaN(selectedDiscount)) {  // Проверяем, что выбрано число
            discount = selectedDiscount;
            updateResourcesInput(); // Обновляем значения с учетом скидки
        }
    });


    calculateBtn.addEventListener('click', calculate); // calculate вызываем отдельно

    renderPresets();
});
