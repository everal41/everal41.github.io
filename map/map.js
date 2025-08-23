/* Инфобокс: слева — превью/название/фракция/статусы, справа — описание в боксе + крупные награды.
   Добавлены редкости наград и заметная кнопка «Гайд по прохождению». */

document.addEventListener('DOMContentLoaded', () => {
  const el = {
    mapSelect: document.getElementById('mapSelect'),
    mapCanvas: document.getElementById('mapCanvas'),
    mapFrame: document.getElementById('mapFrame'),
    mapImage: document.getElementById('mapImage'),
    markersLayer: document.getElementById('markersLayer'),
    zoomInBtn: document.getElementById('zoomInBtn'),
    zoomOutBtn: document.getElementById('zoomOutBtn'),
    zoomResetBtn: document.getElementById('zoomResetBtn'),
    zoomValue: document.getElementById('zoomValue'),
    toast: document.getElementById('toast')
  };

  const DEFAULT_ZOOM = 0.76;
  const LIMITS = { maxZoom: 3.5 };
  const PIN_SCALE = 0.68;

  const MARKER_ICONS = {
    bandit:  { src: 'images/icons/marker-bandit.webp',  w: 41, h: 44, alt: 'Бандиты' },
    stalker: { src: 'images/icons/marker-stalker.webp', w: 43, h: 41, alt: 'Сталкеры' },
    any:     { src: 'images/icons/marker-any.webp',     w: 44, h: 42, alt: 'Любая группировка' }
  };

  const MAPS = [
    { id: 'south',   name: 'Южная часть зоны', src: 'images/maps/map-south.png',   width: 1372, height: 2000 },
    { id: 'north',   name: 'Северная часть зоны', src: 'images/maps/map-north.png',   width: 1372, height: 2000 },
    { id: 'pripyat', name: 'Припять',             src: 'images/maps/map-pripyat.png', width: 1372, height: 2000 }
  ];

  const IMG_PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="80">
      <rect width="100%" height="100%" rx="8" ry="8" fill="#1b1d21"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            font-family="Montserrat, Arial" font-size="11" fill="#b8bdc9">Нет изображения</text>
    </svg>
  `);

  const MARKERS = [
    // Эхо прошлого — Сталкеры
    {
      id: 'q-echo-past-stalker',
      title: 'Эхо прошлого',
      loc: 'south',
      faction: 'stalker',
      x: 647, y: 1691,
      preview: 'images/quests/echo-past/echo-past.jpg',
      desc: 'На Болотах я нашёл очень старый ПДА, на котором имя владельца — Борода.',
      rewards: [{ img: 'images/items/pp2000-yakor-blue.webp', label: 'ПП‑2000 «Якорь»', rarity: 'stalker' }],
      money: 1500,
      reputation: 30,
      guideUrl: '../guides/echo-past.html'
    },
    // Эхо прошлого — Бандиты
    {
      id: 'q-echo-past-bandit',
      title: 'Эхо прошлого',
      loc: 'south',
      faction: 'bandit',
      x: 445, y: 1572,
      preview: 'images/quests/echo-past/echo-past.jpg',
      desc: 'На Болотах я нашёл очень старый ПДА, на котором имя владельца — Борода.',
      rewards: [{ img: 'images/items/pp2000-yakor-blue.webp', label: 'ПП‑2000 «Якорь»', rarity: 'stalker' }],
      money: 1500,
      reputation: 30,
      guideUrl: '../guides/echo-past.html'
    },
  ];

  let state = { currentMapId: 'south', zoom: DEFAULT_ZOOM, minZoom: 0.3 };

  function initMapSelect() {
    el.mapSelect.innerHTML = MAPS.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
    el.mapSelect.value = state.currentMapId;
    el.mapSelect.addEventListener('change', () => {
      state.currentMapId = el.mapSelect.value;
      renderMap(true);
      showToast(`Карта: ${getMapById(state.currentMapId).name}`);
    });
  }
  function getMapById(id){ return MAPS.find(m => m.id === id) || MAPS[0]; }

  function renderMap(resetView=false){
    const map = getMapById(state.currentMapId);

    // Сохраняем базовые размеры для пробника координат
    el.mapFrame.dataset.baseW = map.width;
    el.mapFrame.dataset.baseH = map.height;

    el.mapFrame.style.setProperty('--frame-w', map.width * state.zoom + 'px');
    el.mapFrame.style.setProperty('--frame-h', map.height * state.zoom + 'px');

    el.mapFrame.classList.add('loading');
    el.mapImage.classList.remove('error');
    el.mapImage.alt = `Карта: ${map.name}`;
    el.mapImage.src = map.src;
    el.mapImage.onload = () => el.mapFrame.classList.remove('loading');
    el.mapImage.onerror = () => { el.mapFrame.classList.remove('loading'); el.mapImage.classList.add('error'); };

    recalcMinZoom();
    if (resetView){
      const startZoom = Math.max(DEFAULT_ZOOM, state.minZoom);
      setZoom(startZoom, getCanvasCenterAnchor());
      centerCanvas();
    } else {
      setZoom(clamp(state.zoom, state.minZoom, LIMITS.maxZoom), getCanvasCenterAnchor());
    }

    const markers = MARKERS.filter(q => q.loc === state.currentMapId);
    el.markersLayer.innerHTML = '';
    markers.forEach(q => el.markersLayer.appendChild(createMarkerEl(q, map)));

    // После рендера поправим поповеры, если что-то уже активно
    updateOpenPopovers();
  }

  function createMarkerEl(q, map){
    const left = (q.x / map.width * 100).toFixed(4) + '%';
    const top  = (q.y / map.height * 100).toFixed(4) + '%';

    const marker = document.createElement('button');
    marker.className = `marker marker--${q.faction || 'any'}`;
    marker.type = 'button';
    marker.setAttribute('aria-label', q.title);
    marker.style.left = left;
    marker.style.top  = top;

    const icon = MARKER_ICONS[q.faction] || MARKER_ICONS.any;
    const w = Math.round(icon.w * PIN_SCALE);
    const h = Math.round(icon.h * PIN_SCALE);

    marker.innerHTML = `
      <span class="pin">
        <img class="pin-img" src="${icon.src}" alt="Метка — ${escapeHtml(icon.alt)}"
             width="${w}" height="${h}" draggable="false" />
      </span>
      <div class="popover" role="dialog" aria-label="${escapeHtml(q.title)}">
        <div class="q-grid">
          <div class="q-left">
            <img class="q-thumb-xl" src="${q.preview || IMG_PLACEHOLDER}" alt="Превью — ${escapeHtml(q.title)}" />
            <div class="q-title-l">${escapeHtml(q.title)}</div>
            ${buildFactionBadge(q)}
            ${buildStatsInline(q)}
          </div>
          <div class="q-right">
            <div class="q-desc-box">
              <div class="q-desc">${escapeHtml(q.desc)}</div>
            </div>
            ${buildRewardsLarge(q)}
            <div class="q-actions">
              <a href="${q.guideUrl}" class="btn btn-primary inline" title="Открыть гайд">
                <i class="fa-solid fa-book-open"></i> Гайд по прохождению
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    marker.querySelector('.pin-img').addEventListener('error', () => { marker.classList.add('pin-fallback'); }, { once:true });
    marker.querySelectorAll('.q-thumb-xl, .rw-large img').forEach(im => {
      im.addEventListener('error', () => { im.src = IMG_PLACEHOLDER; }, { once:true });
    });

    // Клик по маркеру
    marker.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const active = marker.classList.toggle('active');
      // Сбрасываем другие
      if (active){
        document.querySelectorAll('.marker.active').forEach(m => { if (m !== marker) { m.classList.remove('active'); m.style.zIndex = ''; } });
        // Поднимаем активную метку над остальными
        marker.style.zIndex = '1000';
        scrollMarkerIntoView(marker);
        // Позиционируем поповер после перерисовки
        requestAnimationFrame(() => positionPopover(marker));
      } else {
        marker.style.zIndex = '';
      }
    });

    // Наведение: тоже поднимаем и позиционируем
    marker.addEventListener('mouseenter', () => {
      marker.style.zIndex = '1000';
      requestAnimationFrame(() => positionPopover(marker));
    });
    marker.addEventListener('mouseleave', () => {
      if (!marker.classList.contains('active')) marker.style.zIndex = '';
    });

    return marker;
  }

  function buildFactionBadge(q){
    const txt = q.faction === 'bandit' ? 'Только Бандиты'
             : q.faction === 'stalker' ? 'Только Сталкеры'
             : 'Любая группировка';
    const cls = q.faction === 'bandit' ? 'badge--bandit'
             : q.faction === 'stalker' ? 'badge--stalker'
             : 'badge--any';
    return `<div class="q-badges"><span class="q-badge ${cls}">${txt}</span></div>`;
  }

  function buildStatsInline(q){
    const chips = [];
    if (isFinite(q.money)) chips.push(`<span class="stat-badge money"><i class="fa-solid fa-ruble-sign"></i> ${formatRubles(q.money)}</span>`);
    if (isFinite(q.reputation)) chips.push(`<span class="stat-badge rep"><i class="fa-solid fa-medal"></i> +${formatInt(q.reputation)}</span>`);
    return chips.length ? `<div class="q-stats-inline">${chips.join('')}</div>` : '';
  }

  function buildRewardsLarge(q){
    const list = [
      ...(q.rewardsVar || []),
      ...(q.rewards || [])
    ];
    if (!list.length) return '';
    return `
      <div class="rw-panel-large">
        <div class="rw-label">НАГРАДА</div>
        <div class="rw-gallery">
          ${list.map(r => `
            <span class="rw-large ${r.rarity ? `rarity-${escapeClass(r.rarity)}` : ''}">
              <img src="${r.img || IMG_PLACEHOLDER}" alt="Награда" />
              <span class="lbl">${escapeHtml(r.label || '')}</span>
            </span>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* Центрирование метки при открытии */
  function scrollMarkerIntoView(marker){
    const c = el.mapCanvas.getBoundingClientRect();
    const m = marker.getBoundingClientRect();
    const out = m.left < c.left || m.right > c.right || m.top < c.top || m.bottom > c.bottom;
    if (out) marker.scrollIntoView({ block:'center', inline:'center', behavior:'smooth' });
  }

  /* Подталкивание поповера внутрь канваса + компактный режим */
  function positionPopover(marker){
    const pop = marker.querySelector('.popover');
    if (!pop) return;

    // Сброс — затем установим нужные значения
    pop.style.transform = 'translateX(-50%)';
    pop.style.width = ''; // вернёмся к CSS-правилу width:min(560px,96vw)

    const cr = el.mapCanvas.getBoundingClientRect();
    const pad = 8;
    const available = Math.max(0, cr.width - pad*2);

    // Ограничим ширину поповера канвасом, чтобы он не выходил наружу
    const maxW = 560;
    if (available > 0) {
      const w = Math.min(maxW, available);
      pop.style.width = w + 'px';
    }

    // Компактная сетка по реальной ширине канваса (не вьюпорта)
    const qGrid = pop.querySelector('.q-grid');
    if (qGrid){
      if (available < 520) qGrid.style.gridTemplateColumns = '1fr';
      else qGrid.style.gridTemplateColumns = '';
    }

    // После применения ширины — считаем сдвиг
    const pr = pop.getBoundingClientRect();
    let dx = 0;
    if (pr.left < cr.left + pad) dx = (cr.left + pad) - pr.left;
    else if (pr.right > cr.right - pad) dx = (cr.right - pad) - pr.right;

    if (Math.abs(dx) > 0.5){
      pop.style.transform = `translateX(calc(-50% + ${dx}px))`;
    } else {
      pop.style.transform = 'translateX(-50%)';
    }
  }

  /* Переобновить все открытые/фокусные/ховерные поповеры (при зуме/скролле/резайзе) */
  function updateOpenPopovers(){
    document.querySelectorAll('.marker.active, .marker:focus-within, .marker:hover')
      .forEach(positionPopover);
  }

  /* Зум / подгон под экран */
  function recalcMinZoom(){
    const map = getMapById(state.currentMapId);
    const fitW = el.mapCanvas.clientWidth / map.width;
    const fitH = el.mapCanvas.clientHeight / map.height;
    state.minZoom = Math.min(fitW, fitH) || 0.3;
  }

  function setZoom(newZoom, anchor){
    const map = getMapById(state.currentMapId);
    const r = el.mapCanvas.getBoundingClientRect();

    const prev = state.zoom;
    const cw = map.width * prev;
    const ch = map.height * prev;

    const ax = anchor?.clientX ?? (r.left + r.width/2);
    const ay = anchor?.clientY ?? (r.top + r.height/2);
    const relX = (el.mapCanvas.scrollLeft + (ax - r.left)) / Math.max(1, cw);
    const relY = (el.mapCanvas.scrollTop  + (ay - r.top))  / Math.max(1, ch);

    state.zoom = clamp(newZoom, state.minZoom, LIMITS.maxZoom);
    const nw = map.width * state.zoom;
    const nh = map.height * state.zoom;

    el.mapFrame.style.setProperty('--frame-w', nw + 'px');
    el.mapFrame.style.setProperty('--frame-h', nh + 'px');
    el.zoomValue.textContent = Math.round(state.zoom * 100) + '%';

    const sl = relX * nw - (ax - r.left);
    const st = relY * nh - (ay - r.top);
    el.mapCanvas.scrollLeft = clamp(sl, 0, Math.max(0, nw - r.width));
    el.mapCanvas.scrollTop  = clamp(st, 0, Math.max(0, nh - r.height));

    el.mapCanvas.classList.toggle('pannable', state.zoom > state.minZoom + 1e-3);

    // После зума — перепозиционируем видимые поповеры
    updateOpenPopovers();
  }

  function centerCanvas(){
    const map = getMapById(state.currentMapId);
    const cw = map.width * state.zoom;
    const ch = map.height * state.zoom;
    const r = el.mapCanvas.getBoundingClientRect();
    el.mapCanvas.scrollLeft = Math.max(0, (cw - r.width)/2);
    el.mapCanvas.scrollTop  = Math.max(0, (ch - r.height)/2);
  }

  /* Кнопки масштаба */
  el.zoomInBtn.addEventListener('click', () => setZoom(state.zoom * 1.2, getCanvasCenterAnchor()));
  el.zoomOutBtn.addEventListener('click', () => setZoom(state.zoom / 1.2, getCanvasCenterAnchor()));
  el.zoomResetBtn.addEventListener('click', () => {
    recalcMinZoom();
    setZoom(Math.max(DEFAULT_ZOOM, state.minZoom), getCanvasCenterAnchor());
    centerCanvas();
  });

  function getCanvasCenterAnchor(){
    const r = el.mapCanvas.getBoundingClientRect();
    return { clientX: r.left + r.width/2, clientY: r.top + r.height/2 };
  }

  /* Зум колесом */
  el.mapCanvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const scale = e.deltaY > 0 ? 1/1.1 : 1.1;
    setZoom(state.zoom * scale, { clientX: e.clientX, clientY: e.clientY });
  }, { passive:false });

  /* Перетаскивание */
  let dragActive=false, dragStart={x:0,y:0,sx:0,sy:0};
  el.mapCanvas.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.marker') || e.target.closest('.popover')) return;
    if (state.zoom <= state.minZoom + 1e-3) return;
    if (e.button !== 0) return;
    el.mapCanvas.setPointerCapture(e.pointerId);
    dragActive = true;
    dragStart = { x:e.clientX, y:e.clientY, sx:el.mapCanvas.scrollLeft, sy:el.mapCanvas.scrollTop };
    el.mapCanvas.classList.add('dragging');
  });
  el.mapCanvas.addEventListener('pointermove', (e) => {
    if (!dragActive || el._pinch) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    el.mapCanvas.scrollLeft = clamp(dragStart.sx - dx, 0, el.mapFrame.clientWidth - el.mapCanvas.clientWidth);
    el.mapCanvas.scrollTop  = clamp(dragStart.sy - dy, 0, el.mapFrame.clientHeight - el.mapCanvas.clientHeight);
  });
  ['pointerup','pointercancel','pointerleave'].forEach(t => el.mapCanvas.addEventListener(t, () => {
    dragActive=false; el.mapCanvas.classList.remove('dragging');
  }));

  /* Pinch‑zoom */
  const pointers = new Map();
  el.mapCanvas.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch'){ el.mapCanvas.setPointerCapture(e.pointerId); pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}); }
  });
  el.mapCanvas.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch' && pointers.has(e.pointerId)){
      pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if (pointers.size >= 2){
        const [p1,p2] = getTwoPoints();
        const dist0 = distance(p1,p2);
        if (!el._pinch) el._pinch = { dist: dist0, zoom: state.zoom };
        const scale = dist0 / el._pinch.dist;
        const newZoom = el._pinch.zoom * scale;
        const center = { clientX:(p1.x+p2.x)/2, clientY:(p1.y+p2.y)/2 };
        setZoom(newZoom, center);
      }
    }
  }, { passive:false });
  ['pointerup','pointercancel','pointerleave'].forEach(t => el.mapCanvas.addEventListener(t, (e) => {
    if (pointers.has(e.pointerId)) pointers.delete(e.pointerId);
    if (pointers.size < 2) el._pinch = null;
  }));
  function getTwoPoints(){ const it=pointers.values(); const a=it.next().value; const b=it.next().value; return [a,b]; }
  function distance(a,b){ const dx=a.x-b.x, dy=a.y-b.y; return Math.hypot(dx,dy); }

  /* Клик вне поповеров — закрыть */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.marker')) {
      document.querySelectorAll('.marker.active').forEach(m => { m.classList.remove('active'); m.style.zIndex = ''; });
    }
  });

  /* События для перепозиционирования поповеров */
  el.mapCanvas.addEventListener('scroll', updateOpenPopovers);
  window.addEventListener('resize', () => {
    recalcMinZoom();
    setZoom(Math.max(state.zoom,state.minZoom), getCanvasCenterAnchor());
    updateOpenPopovers();
  });
  window.addEventListener('orientationchange', updateOpenPopovers);

  /* Утилиты */
  function clamp(v,min,max){ return Math.max(min, Math.min(max,v)); }
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function escapeClass(s){ return String(s).replace(/[^a-z0-9_-]/gi,''); }
  function formatInt(n){ return Number(n).toFixed(0); }
  function formatRubles(n){ return new Intl.NumberFormat('ru-RU').format(Number(n)) + ' руб.'; }
  function showToast(text){ if(!el.toast) return; el.toast.textContent=text; el.toast.hidden=false; clearTimeout(showToast._t); showToast._t=setTimeout(()=>{el.toast.hidden=true},1800); }

  /* Старт */
  initMapSelect();
  renderMap(true);
});

// Быстрый пробник координат (клик по карте -> X/Y в пикселях 1372x2000)
window.enableMapCoordProbe = (on = true) => {
  const canvas = document.getElementById('mapCanvas');
  const frame = document.getElementById('mapFrame');
  const baseW = Number(frame?.dataset?.baseW || 1372);
  const baseH = Number(frame?.dataset?.baseH || 2000);

  const handler = (e) => {
    const r = frame.getBoundingClientRect();
    const relX = (e.clientX - r.left) / r.width;
    const relY = (e.clientY - r.top) / r.height;
    const X = Math.round(relX * baseW);
    const Y = Math.round(relY * baseH);
    console.log(`Marker coords: x:${X}, y:${Y}   // относ. ${baseW}x${baseH}`);
  };

  if (on) {
    canvas.style.cursor = 'crosshair';
    canvas.addEventListener('click', handler);
    console.info('Пробник координат: включен (enableMapCoordProbe(false) — выключить)');
  } else {
    canvas.style.cursor = '';
    canvas.removeEventListener('click', handler);
    console.info('Пробник координат: выключен');
  }
};