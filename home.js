document.addEventListener('DOMContentLoaded', () => {
  // Кол-во обновлений: длина компактного списка главной или полного списка на странице changelog
  const updatesCountEl = document.getElementById('updatesCount');
  const updatesItems = document.querySelectorAll('.changelog .ch-item, #updatesList li');
  const updatesNum = updatesItems.length;
  if (updatesCountEl) updatesCountEl.setAttribute('data-to', String(updatesNum));

  // Счётчики (анимация при появлении)
  const counters = document.querySelectorAll('.count-up[data-to]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const to = parseInt(el.dataset.to, 10) || 0;
      const dur = 900;
      const start = performance.now();
      function tick(t){
        const p = Math.min(1, (t - start)/dur);
        el.textContent = Math.round(to * (0.2 + 0.8 * p));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, {threshold: 0.35});
  counters.forEach(c => io.observe(c));

  // Шапка при скролле + при смене темы (плотнее фон на вершине)
  const header = document.querySelector('.site-header');
  function applyHeaderBg() {
    const y = window.scrollY || document.documentElement.scrollTop;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    header.style.boxShadow = y > 10 ? '0 8px 20px rgba(0,0,0,.2)' : 'none';
    header.style.background = isLight
      ? (y > 10 ? 'rgba(255,255,255,.96)' : 'rgba(255,255,255,.94)')
      : (y > 10 ? 'rgba(0,0,0,.55)' : 'rgba(0,0,0,.42)');
  }
  applyHeaderBg();
  window.addEventListener('scroll', applyHeaderBg, { passive: true });
  const themeObserver = new MutationObserver(applyHeaderBg);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Дропдаун «Калькуляторы»
  const dropdown = document.getElementById('calcDropdown');
  const btn = document.getElementById('calcMenuBtn');
  function closeMenu(){ dropdown?.classList.remove('open'); btn?.setAttribute('aria-expanded','false'); }
  function openMenu(){ dropdown?.classList.add('open'); btn?.setAttribute('aria-expanded','true'); }
  btn?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown?.classList.contains('open') ? closeMenu() : openMenu();
  });
  document.addEventListener('click', (e) => {
    if (!dropdown?.classList.contains('open')) return;
    if (!dropdown.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // Toast helper
  function showToast(msg, timeout = 1600){
    const box = document.getElementById('toast');
    if (!box) return;
    box.textContent = msg;
    box.hidden = false;
    clearTimeout(box._t);
    box._t = setTimeout(() => { box.hidden = true; }, timeout);
  }

  // Копировать ник
  document.getElementById('copyNickBtn')?.addEventListener('click', async () => {
    const nick = document.getElementById('gameNick')?.textContent?.trim();
    if (!nick) return;
    try {
      await navigator.clipboard.writeText(nick);
      showToast('Ник скопирован');
    } catch {
      showToast('Не удалось скопировать');
    }
  });
});