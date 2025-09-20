(() => {
  document.addEventListener('DOMContentLoaded', () => {
    setupCalcDropdown();
    setupCopyNick();
  });

  function setupCalcDropdown() {
    const dd = document.getElementById('calcDropdown');
    if (!dd) return;
    const btn = dd.querySelector('#calcMenuBtn');
    const menu = dd.querySelector('#calcMenu');
    const items = Array.from(menu?.querySelectorAll('.dropdown-item')) || [];

    let open = false;
    let currentIndex = -1;

    const openMenu = () => {
      if (open) return;
      open = true;
      dd.classList.add('open');
      btn?.setAttribute('aria-expanded', 'true');
    };
    const closeMenu = (returnFocus = false) => {
      if (!open) return;
      open = false;
      dd.classList.remove('open');
      btn?.setAttribute('aria-expanded', 'false');
      currentIndex = -1;
      if (returnFocus) btn?.focus();
    };
    const toggleMenu = () => (open ? closeMenu() : openMenu());

    // Клик по кнопке
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Клавиатура на кнопке
    btn?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMenu();
        currentIndex = 0; items[currentIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        openMenu();
        currentIndex = items.length - 1; items[currentIndex]?.focus();
      } else if (e.key === 'Escape') {
        closeMenu(true);
      }
    });

    // Навигация внутри меню
    menu?.addEventListener('keydown', (e) => {
      if (!open) return;
      const last = items.length - 1;
      if (e.key === 'Escape') {
        e.preventDefault(); closeMenu(true);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault(); currentIndex = (currentIndex + 1) % items.length; items[currentIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault(); currentIndex = (currentIndex - 1 + items.length) % items.length; items[currentIndex]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault(); currentIndex = 0; items[currentIndex]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault(); currentIndex = last; items[currentIndex]?.focus();
      } else if (e.key === 'Tab') {
        closeMenu();
      }
    });

    // Закрытие по клику вне
    document.addEventListener('click', (e) => {
      if (!open) return;
      if (!dd.contains(e.target)) closeMenu();
    });

    // Сервисные закрытия
    window.addEventListener('blur', () => closeMenu());
    window.addEventListener('resize', () => closeMenu());
  }

  // Копирование ника из модалки контактов
  function setupCopyNick() {
    const btn = document.getElementById('copyNickBtn');
    const nickEl = document.getElementById('gameNick');
    if (!btn || !nickEl) return;

    btn.addEventListener('click', async (e) => {
      e.preventDefault();

      const text = (nickEl.textContent || '').trim();
      if (!text) return;

      const icon = btn.querySelector('i');
      const label = btn.querySelector('span');
      const prevIcon = icon?.className || 'fa-regular fa-copy';
      const prevText = label?.textContent || 'Копировать';

      const setState = (iconCls, txt, cls) => {
        if (icon) icon.className = iconCls;
        if (label) label.textContent = txt;
        btn.classList.remove('copied', 'error');
        if (cls) btn.classList.add(cls);
      };
      const restore = () => {
        if (icon) icon.className = prevIcon;
        if (label) label.textContent = prevText;
        btn.classList.remove('copied', 'error');
      };

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          if (!fallbackCopy(text)) throw new Error('Clipboard API not available');
        }
        setState('fa-solid fa-check', 'Скопировано', 'copied');
        setTimeout(restore, 1400);
      } catch (err) {
        console.error('Не удалось скопировать ник:', err);
        setState('fa-solid fa-xmark', 'Ошибка', 'error');
        setTimeout(restore, 1600);

      }
    });
  }

  // Фолбэк для копирования
  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    ta.style.pointerEvents = 'none';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
    return ok;
  }

  // Простой тост
  function showToast(text) {
    const toast = document.getElementById('toast');
    if (!toast) { console.info(text); return; }
    toast.textContent = text;
    toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { toast.hidden = true; }, 1800);
  }
})();
