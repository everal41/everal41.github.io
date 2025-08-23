// TOC + Lightbox + копирование ника
document.addEventListener('DOMContentLoaded', () => {
  const article = document.getElementById('article');
  const toc = document.getElementById('toc');

  // ---------------- TOC ----------------
  if (article && toc) {
    const headers = [...article.querySelectorAll('h2')];
    if (!headers.length) { toc.remove(); }
    else {
      const links = headers.map(h => {
        const id = h.id || h.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g,'');
        h.id = id;
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = h.textContent.trim();
        toc.appendChild(a);
        return { h, a };
      });

      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          const link = links.find(l => l.h === e.target)?.a;
          if (!link) return;
          if (e.isIntersecting) {
            links.forEach(l => l.a.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });

      headers.forEach(h => io.observe(h));
    }
  }

  // ---------------- Lightbox ----------------
  initLightbox(article || document);

  // ---------------- Copy nick ----------------
  initCopyNick();
});

function initLightbox(scopeEl){
  // Создаём оверлей один раз
  let lb = document.querySelector('.lb');
  if (!lb) {
    lb = document.createElement('div');
    lb.className = 'lb';
    lb.innerHTML = `<img alt=""><div class="lb-caption" aria-hidden="true"></div>`;
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLB(); });
    document.body.appendChild(lb);
  }
  const lbImg = lb.querySelector('img');
  const lbCaption = lb.querySelector('.lb-caption');

  // Помечаем изображения как кликабельные
  const images = [...(scopeEl.querySelectorAll
    ? scopeEl.querySelectorAll('img')
    : document.querySelectorAll('img'))]
    .filter(img => img.closest('.g-article') || img.closest('.img-grid-2') || img.closest('.reward-list'));

  images.forEach(img => {
    img.classList.add('zoomable-img');
    img.addEventListener('click', () => {
      const full = img.dataset.full || img.src;
      lbImg.src = full;
      lbImg.alt = img.alt || '';
      lbCaption.textContent = img.closest('figure')?.querySelector('figcaption')?.textContent || img.alt || '';
      openLB();
    }, { passive: true });
  });

  function openLB(){
    lb.classList.add('open');
    initLightbox._prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onEsc);
  }
  function closeLB(){
    lb.classList.remove('open');
    lbImg.src = '';
    document.body.style.overflow = initLightbox._prevOverflow || '';
    document.removeEventListener('keydown', onEsc);
  }
  function onEsc(e){ if (e.key === 'Escape') closeLB(); }
}

function initCopyNick(){
  const btn = document.getElementById('copyNickBtn');
  const nickEl = document.getElementById('gameNick');
  if (!btn || !nickEl || btn.dataset.inited) return;
  btn.dataset.inited = '1';

  btn.addEventListener('click', async () => {
    const nick = nickEl.textContent.trim();
    const icon = btn.querySelector('i');
    const label = btn.querySelector('span');
    const prevIconClass = icon?.className;
    const prevLabel = label?.textContent;

    try {
      await navigator.clipboard.writeText(nick);
      if (icon) icon.className = 'fa-solid fa-check';
      if (label) label.textContent = 'Скопировано';
      btn.disabled = true;
      setTimeout(() => {
        btn.disabled = false;
        if (icon && prevIconClass) icon.className = prevIconClass;
        if (label) label.textContent = prevLabel || 'Копировать';
      }, 1400);
    } catch (e) {
      // Фолбэк через textarea
      const ta = document.createElement('textarea');
      ta.value = nick;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      try { document.execCommand('copy'); } catch(_) {}
      document.body.removeChild(ta);
      if (icon) icon.className = 'fa-solid fa-check';
      if (label) label.textContent = 'Скопировано';
      setTimeout(() => {
        if (icon && prevIconClass) icon.className = prevIconClass;
        if (label) label.textContent = prevLabel || 'Копировать';
      }, 1400);
    }
  });
}