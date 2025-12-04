function setupThemeToggle() {
  const btn = document.getElementById('themeToggleBtn');
  const btnMobile = document.getElementById('themeToggleBtnMobile');
  const root = document.documentElement;
  const key = 'stalmath_theme';
  const apply = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(key, theme);
    const icon = theme === 'dark' ? 'fa-moon' : 'fa-sun';
    [btn, btnMobile].forEach(b => { const i = b?.querySelector('i'); if (i) i.className = `fa-solid ${icon}`; });
  };
  apply(localStorage.getItem(key) || 'dark');
  const toggle = () => apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  btn?.addEventListener('click', toggle);
  btnMobile?.addEventListener('click', toggle);
}

function setupMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;
  const open = () => { menu.classList.add('open'); toggle.setAttribute('aria-expanded', 'true'); menu.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; };
  const close = () => { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
  toggle.addEventListener('click', () => menu.classList.contains('open') ? close() : open());
  menu.addEventListener('click', (e) => { if (e.target.matches('[data-close]') || e.target.classList.contains('mobile-overlay')) close(); });
  menu.querySelectorAll('a, button[data-modal-target]').forEach(el => el.addEventListener('click', () => setTimeout(close, 50)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) close(); });
}

function setupModals() {
  let activeModal = null, previousFocus = null;
  const trapFocus = (e) => {
    if (e.key !== 'Tab' || !activeModal) return;
    const focusable = activeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  const openModal = (modal) => {
    if (!modal) return;
    previousFocus = document.activeElement;
    activeModal = modal;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus();
    modal.addEventListener('keydown', trapFocus);
  };
  const closeModal = (modal) => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modal.removeEventListener('keydown', trapFocus);
    previousFocus?.focus();
    activeModal = null;
  };
  document.querySelectorAll('[data-modal-target]').forEach(trigger => trigger.addEventListener('click', (e) => { e.preventDefault(); openModal(document.querySelector(trigger.dataset.modalTarget)); }));
  document.querySelectorAll('.modal .close-button, .modal-close').forEach(btn => btn.addEventListener('click', () => closeModal(btn.closest('.modal'))));
  document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); }));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && activeModal) closeModal(activeModal); });
}

function setupDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dropdown => {
    dropdown.querySelector('.dropdown-trigger')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      dropdowns.forEach(d => d.classList.remove('open'));
      if (!isOpen) { dropdown.classList.add('open'); dropdown.querySelector('.dropdown-trigger')?.setAttribute('aria-expanded', 'true'); }
      else { dropdown.querySelector('.dropdown-trigger')?.setAttribute('aria-expanded', 'false'); }
    });
  });
  document.addEventListener('click', () => dropdowns.forEach(d => { d.classList.remove('open'); d.querySelector('.dropdown-trigger')?.setAttribute('aria-expanded', 'false'); }));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') dropdowns.forEach(d => { d.classList.remove('open'); d.querySelector('.dropdown-trigger')?.setAttribute('aria-expanded', 'false'); }); });
}

function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  setTimeout(() => toast.hidden = true, duration);
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.replaceState(null, '', targetId); }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => { setupThemeToggle(); setupMobileMenu(); setupModals(); setupDropdowns(); setupSmoothScroll(); });
window.StalMath = { showToast };
