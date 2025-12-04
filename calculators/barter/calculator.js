// =================================================================
// StalMath: calculator.js (v2)
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- ПРОВЕРКА ДАННЫХ ---
    if (typeof presetsData === 'undefined' || typeof resourceCosts === 'undefined' || typeof rankIcons === 'undefined' || typeof armorRanks === 'undefined' || typeof itemNameColors === 'undefined') {
        console.error("Критическая ошибка: Файл data.js не загружен или содержит синтаксическую ошибку!");
        alert("Не удалось загрузить данные. Проверьте консоль (F12) и корректность data.js.");
        return;
    }

    // --- DOM-ЭЛЕМЕНТЫ ---
    const calculatorForm = document.getElementById('calculatorForm');
    const presetsContainer = document.querySelector('.presets-container');
    const totalCoinsDisplay = document.getElementById('totalCoinsDisplay');
    const couponApplyBlock = document.getElementById('couponApplyBlock');
    const resetBtn = document.getElementById('resetBtn');

    // Новые элементы UI
    const presetSearch = document.getElementById('presetSearch');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const expandAllBtn = document.getElementById('expandAllBtn');
    const collapseAllBtn = document.getElementById('collapseAllBtn');
    const discountAllSelect = document.getElementById('discountAllSelect');
    const clearSelectedBtn = document.getElementById('clearSelectedBtn');
    const shareBtn = document.getElementById('shareBtn');

    const STORAGE_KEY = 'stalmath_calc_state_v1';

    // --- ВСПОМОГАТЕЛЬНОЕ ---
    const groupBy = (array, key) => array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
    }, {});

    function showToast(msg, timeout = 1800) {
        const box = document.getElementById('toast');
        if (!box) return;
        box.textContent = msg;
        box.hidden = false;
        clearTimeout(box._t);
        box._t = setTimeout(() => { box.hidden = true; }, timeout);
    }

    // --- ГЕНЕРАЦИЯ ИНТЕРФЕЙСА ---
    function createPresetItem(item) {
        const listItem = document.createElement('li');
        listItem.className = 'preset-item';
        listItem.dataset.nameLower = item.name.toLowerCase();

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

    // --- ЭНХАНС ЧИСЛОВЫХ ПОЛЕЙ ---
    function enhanceNumberInputs() {
        const inputs = calculatorForm.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            if (input.closest('.number-control')) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'number-control';

            const minus = document.createElement('button');
            minus.type = 'button';
            minus.className = 'step-btn';
            minus.setAttribute('aria-label', 'Уменьшить');
            minus.textContent = '−';

            const plus = document.createElement('button');
            plus.type = 'button';
            plus.className = 'step-btn';
            plus.setAttribute('aria-label', 'Увеличить');
            plus.textContent = '+';

            input.parentNode.insertBefore(wrapper, input);
            wrapper.append(minus, input, plus);
        });
    }

    // --- ЛОГИКА КАЛЬКУЛЯТОРА ---
    function masterRecalculate() {
        const checkedPresets = updateCouponUI();
        const discounts = getDiscountsFromUI();
        const resources = calculateDiscountedResources(checkedPresets, discounts);
        updateResourceInputs(resources);
        calculateAndDisplayTotalCost();
        saveState(); // авто-сохранение
    }

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
                removeBtn.innerHTML = '&times;';
                removeBtn.title = `Убрать ${presetName}`;
                removeBtn.dataset.presetId = presetId;

                row.append(label, select, removeBtn);
                couponApplyBlock.appendChild(row);
            });
        }
        return checkedPresets;
    }

    function getDiscountsFromUI() {
        const discountSelectors = couponApplyBlock.querySelectorAll('.coupon-discount-select');
        const discounts = {};
        discountSelectors.forEach(select => {
            discounts[select.dataset.presetId] = parseFloat(select.value);
        });
        return discounts;
    }

    function calculateDiscountedResources(checkedPresets, discounts) {
        const totalResources = {};
        checkedPresets.forEach(checkbox => {
            const resources = JSON.parse(checkbox.dataset.resources);
            const discountMultiplier = discounts[checkbox.id] || 1;
            for (const resName in resources) {
                const amount = resources[resName];
                const discountedAmount = Math.ceil(amount * discountMultiplier);
                totalResources[resName] = (totalResources[resName] || 0) + discountedAmount;
            }
        });
        return totalResources;
    }

    function updateResourceInputs(resources) {
        calculatorForm.querySelectorAll('input[type="number"]').forEach(input => {
            input.value = resources[input.id] || 0;
        });
    }

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
            totalCoinsDisplay.innerHTML = 'Выберите предметы или введите ресурсы';
        } else {
            totalCoinsDisplay.innerHTML = `<i class="fa-solid fa-coins" style="color: var(--coin)"></i> Итоговая стоимость: ${Math.round(totalCost).toLocaleString('ru-RU')} монет`;
        }
    }

    function resetAll() {
        presetsContainer.querySelectorAll('input[type="checkbox"]:checked').forEach(c => { c.checked = false; });
        couponApplyBlock.innerHTML = '';
        updateResourceInputs({});
        calculateAndDisplayTotalCost();
        saveState();
    }

    // --- ПОИСК ПО ПРЕСЕТАМ ---
    function filterPresets(query) {
        const q = query.trim().toLowerCase();
        const rankDetails = presetsContainer.querySelectorAll('details > ul.preset-list');

        rankDetails.forEach(list => {
            const items = list.querySelectorAll('li.preset-item');
            let visibleCount = 0;

            items.forEach(li => {
                const match = !q || li.dataset.nameLower.includes(q);
                li.style.display = match ? '' : 'none';
                if (match) visibleCount++;
            });

            const details = list.parentElement; // <details>
            if (details && details.tagName === 'DETAILS') {
                // скрыть ветку ранга, если нет видимых элементов
                details.style.display = visibleCount ? '' : 'none';
            }
        });
    }

    // --- СОХРАНЕНИЕ/ВОССТАНОВЛЕНИЕ СОСТОЯНИЯ ---
    function getSelectedPresetIds() {
        return Array.from(presetsContainer.querySelectorAll('input[type="checkbox"]:checked')).map(c => c.id);
    }

    function saveState() {
        const state = {
            selected: getSelectedPresetIds(),
            discounts: getDiscountsFromUI(),
            inputs: Object.fromEntries(Array.from(calculatorForm.querySelectorAll('input[type="number"]')).map(i => [i.id, i.value])),
            search: presetSearch?.value || ''
        };
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
    }

    function restoreState() {
        // 1) URL-ссылка вида ?p=id1,id2,id3
        const params = new URLSearchParams(location.search);
        const p = params.get('p');
        if (p) {
            const ids = p.split(',').filter(Boolean);
            ids.forEach(id => {
                const cb = document.getElementById(id);
                if (cb) cb.checked = true;
            });
            masterRecalculate();
            return;
        }

        // 2) LocalStorage
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const state = JSON.parse(raw);
            (state.selected || []).forEach(id => {
                const cb = document.getElementById(id);
                if (cb) cb.checked = true;
            });
            masterRecalculate(); // создаст UI купонов

            // восстановление скидок
            const discountSelectors = couponApplyBlock.querySelectorAll('.coupon-discount-select');
            discountSelectors.forEach(sel => {
                const v = state.discounts?.[sel.dataset.presetId];
                if (v) sel.value = v;
            });

            // восстановление чисел
            if (state.inputs) {
                Object.entries(state.inputs).forEach(([id, val]) => {
                    const input = document.getElementById(id);
                    if (input) input.value = val;
                });
                calculateAndDisplayTotalCost();
            }

            if (presetSearch && state.search) {
                presetSearch.value = state.search;
                filterPresets(presetSearch.value);
            }
        } catch (e) {}
    }

    // --- ОБРАБОТЧИКИ ---
    // Пресеты
    presetsContainer.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            masterRecalculate();
        }
    });

    // Блок купонов
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

    // Ручной ввод в поля
    calculatorForm.addEventListener('input', (event) => {
        if (event.target.type === 'number') {
            calculateAndDisplayTotalCost();
            saveState();
        }
    });

    // Степперы
    calculatorForm.addEventListener('click', (e) => {
        const btn = e.target.closest('.step-btn');
        if (!btn) return;
        const input = btn.parentElement.querySelector('input[type="number"]');
        if (!input) return;
        const stepBase = 1;
        const mod = (e.shiftKey ? 10 : e.ctrlKey ? 5 : 1);
        const delta = btn.textContent.trim() === '+' ? stepBase * mod : -stepBase * mod;
        const current = parseInt(input.value, 10) || 0;
        const next = Math.max(0, current + delta);
        input.value = next;
        calculateAndDisplayTotalCost();
        saveState();
    });

    // Сброс
    resetBtn.addEventListener('click', () => {
        resetAll();
        showToast('Сброшено');
    });

    // Поиск
    presetSearch?.addEventListener('input', () => {
        filterPresets(presetSearch.value);
        saveState();
    });
    clearSearchBtn?.addEventListener('click', () => {
        if (!presetSearch) return;
        presetSearch.value = '';
        filterPresets('');
        saveState();
    });

    // Развернуть/свернуть всё
    expandAllBtn?.addEventListener('click', () => {
        document.querySelectorAll('.presets-container details').forEach(d => d.open = true);
    });
    collapseAllBtn?.addEventListener('click', () => {
        document.querySelectorAll('.presets-container details').forEach(d => d.open = false);
    });

    // Скидка для всех
    discountAllSelect?.addEventListener('change', () => {
        const v = discountAllSelect.value;
        if (!v) return;
        couponApplyBlock.querySelectorAll('.coupon-discount-select').forEach(sel => sel.value = v);
        masterRecalculate();
        showToast('Скидка применена ко всем');
        discountAllSelect.value = '';
    });

    // Очистить выбранные
    clearSelectedBtn?.addEventListener('click', () => {
        presetsContainer.querySelectorAll('input[type="checkbox"]:checked').forEach(c => c.checked = false);
        masterRecalculate();
        showToast('Выбранные пресеты сняты');
    });

    // Поделиться
    shareBtn?.addEventListener('click', async () => {
        const ids = getSelectedPresetIds();
        const url = new URL(location.href);
        if (ids.length) url.searchParams.set('p', ids.join(','));
        else url.searchParams.delete('p');

        try {
            await navigator.clipboard.writeText(url.toString());
            showToast('Ссылка скопирована');
        } catch (e) {
            showToast('Не удалось скопировать ссылку');
        }
    });

    // --- ИНИЦИАЛИЗАЦИЯ ---
    populateAllPresets();
    // Закрыть все верхнеуровневые категории по умолчанию
document.querySelectorAll('.presets-container > details.preset-category[open]')
  .forEach(d => d.removeAttribute('open'));
    enhanceNumberInputs();
    restoreState();
    // стартовый пересчёт, если ничего не восстановилось
    if (!couponApplyBlock.childElementCount) calculateAndDisplayTotalCost();
});
