document.addEventListener('DOMContentLoaded', () => {
  const article = document.getElementById('article');
  const toc = document.getElementById('toc');

  if (article && toc) {
    const headers = [...article.querySelectorAll('h2')];
    
    if (!headers.length) {
      toc.closest('.toc-card')?.remove();
    } else {
      const slugify = (text, index) => {
        const slug = text.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\u0400-\u04FF-]/g, '')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        return slug || `section-${index}`;
      };

      const links = headers.map((h, idx) => {
        const id = h.id || slugify(h.textContent, idx);
        h.id = id;

        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = h.textContent.replace(/^[^\s]+\s/, '');
        toc.appendChild(a);
        
        return { h, a };
      });

      toc.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (!a) return;
        e.preventDefault();
        const target = document.getElementById(a.getAttribute('href').slice(1));
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', a.getAttribute('href'));
      });

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const link = links.find(l => l.h === entry.target)?.a;
          if (!link) return;
          
          if (entry.isIntersecting) {
            links.forEach(l => l.a.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

      headers.forEach(h => observer.observe(h));
    }
  }

  const choiceContainer = document.getElementById('rewardChoice');
  if (choiceContainer) {
    const buttons = choiceContainer.querySelectorAll('.choice-btn');
    const panels = document.querySelectorAll('.choice-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(btn.dataset.target)?.classList.add('active');
      });
    });
  }

  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox?.querySelector('img');
  const lbCaption = lightbox?.querySelector('.lb-caption');
  const lbClose = lightbox?.querySelector('.lb-close');

  if (lightbox && lbImg) {
    const images = document.querySelectorAll('.img-figure img');
    
    images.forEach(img => {
      img.addEventListener('click', () => {
        lbImg.src = img.dataset.full || img.src;
        lbImg.alt = img.alt || '';
        lbCaption.textContent = img.closest('figure')?.querySelector('figcaption')?.textContent || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lbImg.src = '';
      document.body.style.overflow = '';
    };

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    lbClose?.addEventListener('click', closeLightbox);
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  const readingBar = document.querySelector('.reading-bar');
  if (readingBar && article) {
    const updateProgress = () => {
      const rect = article.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrolled = window.scrollY - articleTop + windowHeight * 0.3;
      const progress = Math.max(0, Math.min(1, scrolled / (articleHeight - windowHeight * 0.5)));
      
      readingBar.style.width = `${progress * 100}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  const copyBtn = document.getElementById('copyNickBtn');
  const nickEl = document.getElementById('gameNick');
  
  if (copyBtn && nickEl) {
    copyBtn.addEventListener('click', async () => {
      const nick = nickEl.textContent.trim();
      const icon = copyBtn.querySelector('i');
      
      try {
        await navigator.clipboard.writeText(nick);
        icon.className = 'fa-solid fa-check';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
          icon.className = 'fa-regular fa-copy';
          copyBtn.classList.remove('copied');
        }, 2000);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = nick;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        
        icon.className = 'fa-solid fa-check';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          icon.className = 'fa-regular fa-copy';
          copyBtn.classList.remove('copied');
        }, 2000);
      }
    });
  }
});