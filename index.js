document.addEventListener('DOMContentLoaded', () => {
  
  
  const UPDATES = [
    {
      version: '3.0.0',
      date: '2025-12-04',
      title: 'Глобальная переработка сайта',
      changes: [
        { type: 'new', text: 'Полностью обновлённый дизайн всего сайта' },
        { type: 'new', text: 'Новая главная страница со статистикой и быстрым доступом' },
        { type: 'new', text: 'Переработаны калькуляторы бартера и заточки' },
        { type: 'new', text: 'Удобный каталог гайдов с поиском и фильтрами' },
        { type: 'improve', text: 'Сайт работает быстрее благодаря оптимизации' },
        { type: 'improve', text: 'Обновлены тёмная и светлая темы оформления' }
      ]
    },
    {
      version: '2.1.1',
      date: '2025-09-21',
      title: 'Улучшения карты квестов',
      changes: [
        { type: 'new', text: 'Добавлено удобное меню для телефонов' },
        { type: 'improve', text: 'Подсказки квестов стали удобнее' },
        { type: 'fix', text: 'Исправлены визуальные недочёты карты' }
      ]
    },
    {
      version: '2.1.0',
      date: '2025-08-23',
      title: 'Интерактивная карта квестов',
      changes: [
        { type: 'new', text: 'Добавлена интерактивная карта с квестами' },
        { type: 'new', text: 'Можно фильтровать квесты по фракциям' },
        { type: 'new', text: 'При клике на маркер видны награды и ссылка на гайд' }
      ]
    },
    {
      version: '2.0.0',
      date: '2025-08-12',
      title: 'Обновление дизайна',
      changes: [
        { type: 'new', text: 'Переработан внешний вид всех страниц' },
        { type: 'new', text: 'Добавлены тёмная и светлая темы' },
        { type: 'improve', text: 'Улучшена работа на мобильных устройствах' }
      ]
    },
    {
      version: '1.3.0',
      date: '2025-08-07',
      title: 'Система купонов',
      changes: [
        { type: 'new', text: 'Переработана система скидок в калькуляторе бартера' }
      ]
    }
  ];

  const LATEST_GUIDES = [
    {
      id: 'dela-banditskie',
      title: 'Дела бандитские',
      description: 'Бандит Варяг попросил найти тайник. Награда — уникальный Подарок Варяга.',
      image: 'guides/images/quests/dela-banditskie/cover.jpg',
      url: 'guides/quests/dela-banditskie.html',
      category: 'quest',
      date: '2025-12-03'
    },
    {
      id: 'bespredel',
      title: 'Беспредел',
      description: 'Бандит Могол удивлён, что никто из его банды не явился на сходку.',
      image: 'guides/images/quests/bespredel/cover.jpg',
      url: 'guides/quests/bespredel.html',
      category: 'quest',
      date: '2025-12-03'
    },
    {
      id: 'sudba',
      title: 'Судьба',
      description: 'Спасите новичка от стаи гончих. Награда — легендарный Сиг «Шепота».',
      image: 'guides/images/quests/sudba/sudba.jpg',
      url: 'guides/quests/sudba.html',
      category: 'quest',
      date: '2025-12-03'
    },
    {
      id: 'posylka-freemena-stalker',
      title: 'Посылка Фримена',
      description: 'Гайд по нелинейному квесту. Все варианты диалогов для получения разного оружия.',
      image: 'guides/images/quests/posylka-freemena/freemen.jpg',
      url: 'guides/quests/posylka-freemena-stalker.html',
      category: 'quest',
      date: '2025-12-03'
    },
    {
      id: 'echo-past',
      title: 'Эхо прошлого',
      description: 'На Болотах найден старый ПДА с именем владельца — Борода.',
      image: 'guides/images/quests/echo-past/echo-past.jpg',
      url: 'guides/quests/echo-past.html',
      category: 'quest',
      date: '2025-12-03'
    },
    {
      id: 'custom-radio',
      title: 'Своё радио в игре',
      description: 'Как добавить собственную музыку на радио в STALCRAFT: X.',
      image: 'guides/images/custom-radio/radio.jpg',
      url: 'guide-custom-radio.html',
      category: 'tech',
      date: '2025-08-01'
    }
  ];

  const elements = {
    featuredUpdate: document.getElementById('featuredUpdate'),
    updatesList: document.getElementById('updatesList'),
    latestGuides: document.getElementById('latestGuides'),
    tabBtns: document.querySelectorAll('.tab-btn'),
    tabPanels: document.querySelectorAll('.tab-panel'),
    heroParticles: document.getElementById('heroParticles')
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatShortDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const renderFeaturedUpdate = (update) => {
    const changesHtml = update.changes.map(change => `
      <li>
        <i class="fa-solid fa-circle-check"></i>
        <span><span class="change-type ${change.type}">${
          change.type === 'new' ? 'Новое' : 
          change.type === 'fix' ? 'Исправлено' : 'Улучшено'
        }</span>${change.text}</span>
      </li>
    `).join('');

    elements.featuredUpdate.innerHTML = `
      <div class="featured-header">
        <span class="featured-version">v${update.version}</span>
        <span class="featured-date">${formatDate(update.date)}</span>
      </div>
      <h3 class="featured-title">${update.title}</h3>
      <ul class="featured-changes">${changesHtml}</ul>
    `;
  };

  const renderUpdatesList = () => {
    elements.updatesList.innerHTML = UPDATES.slice(0, 5).map((update, index) => `
      <div class="update-item${index === 0 ? ' active' : ''}" data-index="${index}">
        <span class="version">v${update.version}</span>
        <span class="date">${formatShortDate(update.date)}</span>
      </div>
    `).join('');

    elements.updatesList.querySelectorAll('.update-item').forEach(item => {
      item.addEventListener('click', () => {
        const index = parseInt(item.dataset.index);
        renderFeaturedUpdate(UPDATES[index]);
        
        elements.updatesList.querySelectorAll('.update-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  };

  const renderLatestGuides = () => {
    const categoryLabels = { quest: 'Квест', equipment: 'Снаряжение', tech: 'Технические', misc: 'Разное' };
    
    elements.latestGuides.innerHTML = LATEST_GUIDES.map(guide => `
      <a href="${guide.url}" class="guide-preview-card">
        <div class="guide-preview-image">
          <img src="${guide.image}" alt="${guide.title}" loading="lazy" />
          <span class="guide-preview-badge ${guide.category}">${categoryLabels[guide.category]}</span>
        </div>
        <div class="guide-preview-content">
          <h4 class="guide-preview-title">${guide.title}</h4>
          <p class="guide-preview-desc">${guide.description}</p>
          <div class="guide-preview-meta">
            <span class="guide-preview-date">${formatDate(guide.date)}</span>
            <i class="fa-solid fa-arrow-right guide-preview-arrow"></i>
          </div>
        </div>
      </a>
    `).join('');
  };

  const setupTabs = () => {
    elements.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        elements.tabBtns.forEach(b => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-selected', b === btn);
        });
        
        elements.tabPanels.forEach(panel => {
          panel.classList.toggle('active', panel.id === `panel-${targetTab}`);
        });
      });
    });
  };

  const animateCounters = () => {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.count);
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          
          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };
          
          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
  };

  const createParticles = () => {
    if (!elements.heroParticles) return;
    
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'hero-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 20}s`;
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;
      elements.heroParticles.appendChild(particle);
    }
  };

  const setupNickCopy = () => {
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
  };

  renderFeaturedUpdate(UPDATES[0]);
  renderUpdatesList();
  renderLatestGuides();
  setupTabs();
  animateCounters();
  createParticles();
  setupNickCopy();
  
});