// =================================================================
// StalMath: global.js (v2)
// Скрипты, работающие на ВСЕХ страницах сайта
// =================================================================

function trapFocus(modal) {
    const focusable = modal.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return () => {};
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleTab(e) {
        if (e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    }
    modal.addEventListener('keydown', handleTab);
    return () => modal.removeEventListener('keydown', handleTab);
}

function setupModalToggles() {
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.modal .close-button');

    let currentModal = null;
    let releaseTrap = null;
    let prevActive = null;

    function openModal(modal) {
        if (!modal) return;
        currentModal = modal;
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        prevActive = document.activeElement;
        const focusTarget = modal.querySelector('[autofocus]') || modal.querySelector('button, a, input, select, textarea') || modal;
        focusTarget && focusTarget.focus();

        releaseTrap = trapFocus(modal);

        function onKey(e) {
            if (e.key === 'Escape') closeModal(modal);
        }
        modal._keyHandler = onKey;
        document.addEventListener('keydown', onKey);
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (releaseTrap) releaseTrap();
        releaseTrap = null;

        document.removeEventListener('keydown', modal._keyHandler);
        modal._keyHandler = null;

        if (prevActive) try { prevActive.focus(); } catch(e) {}
        currentModal = null;
    }

    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => closeModal(button.closest('.modal')));
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });
}

function setupThemeToggle() {
    const btn = document.getElementById('themeToggleBtn');
    const root = document.documentElement;
    const key = 'stalmath_theme';
    function apply(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem(key, theme);
        const icon = btn?.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        }
    }
    const saved = localStorage.getItem(key);
    if (saved) apply(saved);
    else apply('dark');

    btn?.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') || 'dark';
        apply(current === 'dark' ? 'light' : 'dark');
    });
}

function setupMobileAsideToggle() {
    const btn = document.getElementById('togglePresetsBtn');
    const aside = document.querySelector('.left-block');
    btn?.addEventListener('click', () => {
        aside?.classList.toggle('open');
    });

    // Закрыть по клику вне
    document.addEventListener('click', (e) => {
        if (!aside?.classList.contains('open')) return;
        const within = e.target === aside || aside.contains(e.target) || e.target === btn;
        if (!within) aside.classList.remove('open');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupModalToggles();
    setupThemeToggle();
    setupMobileAsideToggle();
});
