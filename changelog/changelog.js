document.addEventListener('DOMContentLoaded', () => {
  const showEarlyBtn = document.getElementById('showEarlyBtn');
  const earlyVersions = document.getElementById('earlyVersions');
  const showAllVersions = document.getElementById('showAllVersions');
  const versionNav = document.getElementById('versionNav');
  const versionLinks = document.querySelectorAll('.version-link');
  const versionCards = document.querySelectorAll('.version-card[id]');
  const copyBtn = document.getElementById('copyNickBtn');
  const nickEl = document.getElementById('gameNick');

  if (showEarlyBtn && earlyVersions) {
    showEarlyBtn.addEventListener('click', () => {
      const isHidden = earlyVersions.hidden;
      earlyVersions.hidden = !isHidden;
      showEarlyBtn.classList.toggle('expanded', isHidden);
      showEarlyBtn.querySelector('span').textContent = isHidden 
        ? 'Скрыть ранние версии' 
        : 'Показать ранние версии (1.0.0 — 1.0.4)';
    });
  }

  if (showAllVersions && versionNav) {
    showAllVersions.addEventListener('click', () => {
      const isExpanded = versionNav.style.maxHeight === 'none';
      versionNav.style.maxHeight = isExpanded ? '400px' : 'none';
      showAllVersions.querySelector('span').textContent = isExpanded ? 'Показать все' : 'Свернуть';
    });
  }

  if (versionLinks.length && versionCards.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          versionLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });
    versionCards.forEach(card => observer.observe(card));
  }

  versionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;

      const earlyContainer = target.closest('#earlyVersions');
      if (earlyContainer?.hidden) {
        earlyContainer.hidden = false;
        showEarlyBtn?.classList.add('expanded');
        if (showEarlyBtn) {
          showEarlyBtn.querySelector('span').textContent = 'Скрыть ранние версии';
        }
      }
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', targetId);
    });
  });

  if (copyBtn && nickEl) {
    const showCopySuccess = () => {
      const icon = copyBtn.querySelector('i');
      icon.className = 'fa-solid fa-check';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        icon.className = 'fa-regular fa-copy';
        copyBtn.classList.remove('copied');
      }, 2000);
    };

    copyBtn.addEventListener('click', async () => {
      const nick = nickEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(nick);
        showCopySuccess();
      } catch {
        const ta = document.createElement('textarea');
        ta.value = nick;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showCopySuccess();
      }
    });
  }
});