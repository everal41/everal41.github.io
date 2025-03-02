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

    // DOM-элементы
    const startLevelSelect = document.getElementById('start-level');
    const endLevelSelect = document.getElementById('end-level');
    const currentAttemptInput = document.getElementById('current-attempt');
    const calculateBtn = document.getElementById('calculate-sharpening');
    const errorMessage = document.querySelector('.error-message');

    // Поля вывода ресурсов
    const cheapPartsTotal = document.querySelector('.cheap-parts-total');
    const cheapPartsGuaranteed = document.querySelector('.cheap-parts-guaranteed');
    const cheapToolsTotal = document.querySelector('.cheap-tools-total');
    const cheapToolsGuaranteed = document.querySelector('.cheap-tools-guaranteed');
    const standardPartsTotal = document.querySelector('.standard-parts-total');
    const standardPartsGuaranteed = document.querySelector('.standard-parts-guaranteed');
    const standardToolsTotal = document.querySelector('.standard-tools-total');
    const standardToolsGuaranteed = document.querySelector('.standard-tools-guaranteed');
    const advancedPartsTotal = document.querySelector('.advanced-parts-total');
    const advancedPartsGuaranteed = document.querySelector('.advanced-parts-guaranteed');
    const advancedToolsTotal = document.querySelector('.advanced-tools-total');
    const advancedToolsGuaranteed = document.querySelector('.advanced-tools-guaranteed');

        // Поля вывода стоимости
        const totalCostSpan = document.querySelector('.total-cost');
        const guaranteedCostSpan = document.querySelector('.guaranteed-cost');
    
        //Поля ввода цен
        const cheapPartPriceInput = document.getElementById('cheap-part-price');
        const cheapToolPriceInput = document.getElementById('cheap-tool-price');
        const standardPartPriceInput = document.getElementById('standard-part-price');
        const standardToolPriceInput = document.getElementById('standard-tool-price');
        const advancedPartPriceInput = document.getElementById('advanced-part-price');
        const advancedToolPriceInput = document.getElementById('advanced-tool-price');
    
        // Константы
        const attemptsToGuarantee = [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70]; // Индекс = уровень заточки
        const totalResources = {
            "1-5": { parts: 15, tools: 15 },
            "6-10": { parts: 100, tools: 100 },
            "11-15": { parts: 475, tools: 255 }
        };
    
        // Функции
    
        function getTier(level) {
            if (level >= 1 && level <= 5) return "1-5";
            if (level >= 6 && level <= 10) return "6-10";
            if (level >= 11 && level <= 15) return "11-15";
            return null; // Или другое значение по умолчанию
        }
    
        function updateMaxValue() {
            const startLevel = parseInt(startLevelSelect.value);  // Приводим к числу
            if (startLevel >= 0 && startLevel < 15) {
                currentAttemptInput.max = attemptsToGuarantee[startLevel + 1] - 1;
            } else {
                currentAttemptInput.max = 0;
            }
            currentAttemptInput.value = 0; // Сбрасываем попытку только при изменении уровня
        }
    
         function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
    
        function hideError() {
            errorMessage.style.display = 'none';
        }
    
        function calculateSharpening() {
            hideError(); // Скрываем предыдущие ошибки
    
            const startLevel = parseInt(startLevelSelect.value);
            const endLevel = parseInt(endLevelSelect.value);
            const currentAttempt = parseInt(currentAttemptInput.value);
    
            // Валидация
            if (endLevel <= startLevel) {
                showError("Конечный уровень должен быть больше начального.");
                return;
            }
            if (currentAttempt < 0 || currentAttempt >= attemptsToGuarantee[startLevel + 1]) {
                showError("Некорректная текущая попытка.");
                return;
            }
    
            //Считываем цены
            const prices = {
                cheapPart: parseInt(cheapPartPriceInput.value) || 0, //Если не введено, то 0
                cheapTool: parseInt(cheapToolPriceInput.value) || 0,
                standardPart: parseInt(standardPartPriceInput.value) || 0,
                standardTool: parseInt(standardToolPriceInput.value) || 0,
                advancedPart: parseInt(advancedPartPriceInput.value) || 0,
                advancedTool: parseInt(advancedToolPriceInput.value) || 0,
            }
    
            let totalCheapParts = 0, totalCheapTools = 0;
            let totalStandardParts = 0, totalStandardTools = 0;
            let totalAdvancedParts = 0, totalAdvancedTools = 0;
    
            let guaranteedCheapParts = 0, guaranteedCheapTools = 0;
            let guaranteedStandardParts = 0, guaranteedStandardTools = 0;
            let guaranteedAdvancedParts = 0, guaranteedAdvancedTools = 0;
    
            // Общее количество
            for (let level = startLevel + 1; level <= endLevel; level++) {
                const tier = getTier(level);
                const attempts = attemptsToGuarantee[level];
                const partsPerAttempt = (tier === "11-15") ? 2 : 1;
    
                if (tier === "1-5") {
                    totalCheapParts += attempts * partsPerAttempt;
                    totalCheapTools += attempts;
                } else if (tier === "6-10") {
                    totalStandardParts += attempts * partsPerAttempt;
                    totalStandardTools += attempts;
                } else if (tier === "11-15") {
                    totalAdvancedParts += attempts * partsPerAttempt;
                    totalAdvancedTools += attempts;
                }
            }
    
            // До гаранта
            const guaranteedAttempts = attemptsToGuarantee[startLevel + 1] - currentAttempt;
            const guaranteedTier = getTier(startLevel + 1);
            const guaranteedPartsPerAttempt = (guaranteedTier === "11-15") ? 2 : 1;
    
            if (guaranteedTier === "1-5") {
                guaranteedCheapParts = guaranteedAttempts * guaranteedPartsPerAttempt;
                guaranteedCheapTools = guaranteedAttempts;
            } else if (guaranteedTier === "6-10") {
                guaranteedStandardParts = guaranteedAttempts * guaranteedPartsPerAttempt;
                guaranteedStandardTools = guaranteedAttempts;
            } else if (guaranteedTier === "11-15") {
                guaranteedAdvancedParts = guaranteedAttempts * guaranteedPartsPerAttempt;
                guaranteedAdvancedTools = guaranteedAttempts;
            }
    
            // Обновляем DOM
            cheapPartsTotal.textContent = totalCheapParts;
            cheapPartsGuaranteed.textContent = guaranteedCheapParts;
            cheapToolsTotal.textContent = totalCheapTools;
            cheapToolsGuaranteed.textContent = guaranteedCheapTools;
    
            standardPartsTotal.textContent = totalStandardParts;
            standardPartsGuaranteed.textContent = guaranteedStandardParts;
            standardToolsTotal.textContent = totalStandardTools;
            standardToolsGuaranteed.textContent = guaranteedStandardTools;
    
            advancedPartsTotal.textContent = totalAdvancedParts;
            advancedPartsGuaranteed.textContent = guaranteedAdvancedParts;
            advancedToolsTotal.textContent = totalAdvancedTools;
            advancedToolsGuaranteed.textContent = guaranteedAdvancedTools;
    
    
            //Расчет стоимости
            const totalCost = totalCheapParts * prices.cheapPart + totalCheapTools * prices.cheapTool +
                              totalStandardParts * prices.standardPart + totalStandardTools * prices.standardTool +
                              totalAdvancedParts * prices.advancedPart + totalAdvancedTools * prices.advancedTool;
    
            const guaranteedCost = guaranteedCheapParts * prices.cheapPart + guaranteedCheapTools * prices.cheapTool +
                                   guaranteedStandardParts * prices.standardPart + guaranteedStandardTools * prices.standardTool +
                                   guaranteedAdvancedParts * prices.advancedPart + guaranteedAdvancedTools * prices.advancedTool;
    
            totalCostSpan.textContent = totalCost;
            guaranteedCostSpan.textContent = guaranteedCost;
    
        }

    
        // Обработчики событий
        startLevelSelect.addEventListener('change', updateMaxValue);
        endLevelSelect.addEventListener('change', updateMaxValue);
        calculateBtn.addEventListener('click', calculateSharpening);
    
        // Инициализация
        updateMaxValue(); // При загрузке страницы
    });