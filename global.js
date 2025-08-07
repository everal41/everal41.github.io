// =================================================================
// StalMath: global.js
// Скрипты, работающие на ВСЕХ страницах сайта
// =================================================================

/**
 * Инициализирует функционал модальных окон на странице.
 * Использует data-атрибуты для универсальности.
 */
function setupModalToggles() {
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.modal .close-button');

    function openModal(modal) {
        if (modal) modal.style.display = 'block';
    }

    function closeModal(modal) {
        if (modal) modal.style.display = 'none';
    }

    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });
}

// Запускаем общие функции, когда страница загружена
document.addEventListener('DOMContentLoaded', () => {
    setupModalToggles();
});