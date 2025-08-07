// =================================================================
// StalMath: calculator.js
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- ПРОВЕРКА ДАННЫХ ---
    if (typeof presetsData === 'undefined' || typeof resourceCosts === 'undefined' || typeof rankIcons === 'undefined' || typeof armorRanks === 'undefined' || typeof itemNameColors === 'undefined') {
        console.error("Критическая ошибка: Файл data.js не загружен или содержит синтаксическую ошибку!");
        alert("Не удалось загрузить данные. Пожалуйста, проверьте консоль (F12) и убедитесь, что файл data.js подключен правильно и не содержит ошибок.");
        return;
    }

    // --- DOM-ЭЛЕМЕНТЫ ---
    const calculatorForm = document.getElementById('calculatorForm');
    const presetsContainer = document.querySelector('.presets-container');
    const totalCoinsDisplay = document.getElementById('totalCoinsDisplay');
    const couponApplyBlock = document.getElementById('couponApplyBlock');
    const resetBtn = document.getElementById('resetBtn');

    // --- ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ---
    const groupBy = (array, key) => array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
    }, {});

    // --- ФУНКЦИИ ГЕНЕРАЦИИ ИНТЕРФЕЙСА ---
    function createPresetItem(item) {
        const listItem = document.createElement('li');
        listItem.className = 'preset-item';
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = item.id;
        checkbox.dataset.resources = JSON.stringify(item.resources);
        checkbox.dataset.name = item.name;
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.name;
        image.loading = 'lazy';
        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name;
        if (itemNameColors && itemNameColors[item.name]) {
            nameSpan.style.color = itemNameColors[item.name];
        }
        label.append(checkbox, image, nameSpan);
        listItem.append(label);
        return listItem;
    }

    function populateAllPresets() {
        for (const categoryKey in presetsData) {
            const container = document.getElementById(`${categoryKey}-presets`);
            if (!container) continue;
            const items = presetsData[categoryKey];
            const groupedByRank = groupBy(items, 'rank');
            for (const rankName in groupedByRank) {
                const details = document.createElement('details');
                const summary = document.createElement('summary');
                const iconPath = rankIcons[rankName];
                if (iconPath) {
                    const img = document.createElement('img');
                    img.src = iconPath;
                    img.alt = `Иконка для ${rankName}`;
                    img.classList.add('preset-section-image');
                    img.loading = 'lazy';
                    summary.appendChild(img);
                }
                const rankSpan = document.createElement('span');
                rankSpan.textContent = rankName;
                if (armorRanks && armorRanks[rankName]) {
                    rankSpan.className = armorRanks[rankName];
                }
                summary.appendChild(rankSpan);
                const presetList = document.createElement('ul');
                presetList.className = 'preset-list';
                groupedByRank[rankName].forEach(item => {
                    presetList.appendChild(createPresetItem(item));
                });
                details.append(summary, presetList);
                container.appendChild(details);
            }
        }
    }
    
    // --- НОВАЯ ЛОГИКА КАЛЬКУЛЯТОРА ---

    /** Обновляет ВСЕ: UI купонов, поля ввода и итоговую стоимость. */
    function masterRecalculate() {
        // 1. Обновляем UI купонов на основе выбранных пресетов
        const checkedPresets = updateCouponUI();
        
        // 2. Получаем скидки из обновленного UI
        const discounts = getDiscountsFromUI();
        
        // 3. Собираем ресурсы с пресетов и применяем к ним скидки
        const resources = calculateDiscountedResources(checkedPresets, discounts);
        
        // 4. Отображаем итоговое количество ресурсов в полях
        updateResourceInputs(resources);
        
        // 5. Считаем финальную стоимость и выводим на экран
        calculateAndDisplayTotalCost(resources);
    }
    
    /** Обновляет UI купонов и возвращает список отмеченных пресетов. */
    function updateCouponUI() {
        const checkedPresets = Array.from(presetsContainer.querySelectorAll('input[type="checkbox"]:checked'));
        const existingDiscounts = getDiscountsFromUI();
        couponApplyBlock.innerHTML = '';

        if (checkedPresets.length > 0) {
            checkedPresets.forEach(checkbox => {
                const presetId = checkbox.id;
                const presetName = checkbox.dataset.name;

                const row = document.createElement('div');
                row.className = 'coupon-item-row';
                
                const label = document.createElement('label');
                label.textContent = presetName;
                label.title = presetName;

                const select = document.createElement('select');
                select.className = 'coupon-discount-select';
                select.dataset.presetId = presetId;
                
                const options = [
                    { value: 1,    text: 'Без скидки' },
                    { value: 0.9,  text: 'Скидка 10%' },
                    { value: 0.85, text: 'Скидка 15%' },
                    { value: 0.8,  text: 'Скидка 20%' },
                    { value: 0.75, text: 'Скидка 25%' },
                    { value: 0.7,  text: 'Скидка 30%' },
                    { value: 0.5,  text: 'Скидка 50%' },
                    { value: 0.25, text: 'Скидка 75%' },
                    { value: 0.01, text: 'Скидка 99%' }
                ];
                options.forEach(opt => select.add(new Option(opt.text, opt.value)));
                
                if (existingDiscounts[presetId]) {
                    select.value = existingDiscounts[presetId];
                }

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-preset-btn';
                removeBtn.innerHTML = '&times;'; // Крестик
                removeBtn.title = `Убрать ${presetName}`;
                removeBtn.dataset.presetId = presetId;

                row.append(label, select, removeBtn);
                couponApplyBlock.appendChild(row);
            });
        }
        return checkedPresets;
    }

    /** Собирает данные о скидках из UI. */
    function getDiscountsFromUI() {
        const discountSelectors = couponApplyBlock.querySelectorAll('.coupon-discount-select');
        const discounts = {};
        discountSelectors.forEach(select => {
            discounts[select.dataset.presetId] = parseFloat(select.value);
        });
        return discounts;
    }

    /** Считает итоговое количество ресурсов с учетом скидок. */
    function calculateDiscountedResources(checkedPresets, discounts) {
        const totalResources = {};
        checkedPresets.forEach(checkbox => {
            const resources = JSON.parse(checkbox.dataset.resources);
            const discountMultiplier = discounts[checkbox.id] || 1;
            
            for (const resName in resources) {
                const discountedAmount = Math.ceil(resources[resName] * discountMultiplier);
                totalResources[resName] = (totalResources[resName] || 0) + discountedAmount;
            }
        });
        return totalResources;
    }

    /** Обновляет числовые поля ввода. */
    function updateResourceInputs(resources) {
        calculatorForm.querySelectorAll('input[type="number"]').forEach(input => {
            input.value = resources[input.id] || 0;
        });
    }

    /** Считает финальную стоимость из полей ввода. */
    function calculateAndDisplayTotalCost() {
        let totalCost = 0;
        const allInputs = calculatorForm.querySelectorAll('input[type="number"]');
        let hasValues = false;

        allInputs.forEach(input => {
            const amount = parseInt(input.value, 10) || 0;
            if (amount > 0) hasValues = true;
            const cost = resourceCosts[input.id] || 0;
            totalCost += amount * cost;
        });

        if (!hasValues) {
            totalCoinsDisplay.textContent = "Выберите предметы или введите ресурсы";
        } else {
            totalCoinsDisplay.textContent = `Итоговая стоимость: ${Math.round(totalCost).toLocaleString('ru-RU')} монет`;
        }
    }
    
    /** Сбрасывает все. */
    function resetAll() {
        presetsContainer.querySelectorAll('input[type="checkbox"]:checked').forEach(c => { c.checked = false; });
        couponApplyBlock.innerHTML = '';
        updateResourceInputs({}); // Очищаем все поля
        calculateAndDisplayTotalCost();
    }

    // --- ОБРАБОТЧИКИ СОБЫТИЙ ---

    // 1. Изменение пресетов (чекбоксы)
    presetsContainer.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            masterRecalculate();
        }
    });

    // 2. Взаимодействие с блоком купонов (скидки и удаление)
    couponApplyBlock.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-preset-btn')) {
            const presetId = event.target.dataset.presetId;
            const checkbox = document.getElementById(presetId);
            if (checkbox) {
                checkbox.checked = false;
                masterRecalculate();
            }
        }
    });

    couponApplyBlock.addEventListener('change', (event) => {
         if (event.target.classList.contains('coupon-discount-select')) {
            masterRecalculate();
        }
    });
    
    // 3. Ручной ввод в поля (теперь не сбрасывает пресеты)
    calculatorForm.addEventListener('input', (event) => {
        if (event.target.type === 'number') {
            // Просто пересчитываем стоимость на основе текущих значений в полях
            calculateAndDisplayTotalCost();
        }
    });

    // 4. Кнопка сброса
    resetBtn.addEventListener('click', resetAll);

    // --- ИНИЦИАЛИЗАЦИЯ ---
    populateAllPresets();
});