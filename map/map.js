document.addEventListener('DOMContentLoaded', () => {
  const el = {
    mapSelect: document.getElementById('mapSelect'),
    mapCanvas: document.getElementById('mapCanvas'),
    mapFrame: document.getElementById('mapFrame'),
    mapImage: document.getElementById('mapImage'),
    markersLayer: document.getElementById('markersLayer'),
    zoomInBtn: document.getElementById('zoomInBtn'),
    zoomOutBtn: document.getElementById('zoomOutBtn'),
    zoomValue: document.getElementById('zoomValue'),
    toast: document.getElementById('toast'),
    tilesLayer: null
  };

  const CONFIG = { DEFAULT_ZOOM: 1.48, MAX_ZOOM: 3.5, MIN_ZOOM: 0.68, PIN_SCALE: 0.7, TILE_SEAM: 0.5 };

  const MARKER_ICONS = {
    bandit: { src: 'images/icons/marker-bandit.webp', w: 41, h: 44, alt: 'Бандиты' },
    stalker: { src: 'images/icons/marker-stalker.webp', w: 43, h: 41, alt: 'Сталкеры' },
    any: { src: 'images/icons/marker-any.webp', w: 44, h: 42, alt: 'Все' },
    event: { src: 'images/icons/marker-event.webp', w: 44, h: 42, alt: 'Ивент' }
  };

  const MAPS = [
    {
      id: 'south', name: 'Южная часть зоны', src: 'images/maps/map-south-2x.png',
      width: 2742, height: 3999,
      tiles: { tileSize: 192, levels: [{ z: 2, cols: 15, rows: 21, url: (x, y) => `images/maps/South/2x/2-${x}-${y}.jpg` }] }
    },
    { id: 'north', name: 'Северная часть зоны', src: 'images/maps/map-north.png', width: 1372, height: 2000 },
    { id: 'lyubech', name: 'Любеч-3', src: 'images/maps/map-lyubech.png', width: 1372, height: 2000 }
  ];

  const IMG_PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect width="100%" height="100%" rx="8" fill="#18181b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter,Arial" font-size="11" fill="#71717a">Нет изображения</text></svg>'
  );

  const MARKERS = window.QUESTS_DATA || [];

  let state = { currentMapId: 'south', zoom: CONFIG.DEFAULT_ZOOM, minZoom: 0.3 };
  let tilesState = { level: null };
  let dragActive = false, dragStart = { x: 0, y: 0, sx: 0, sy: 0 };
  const pointers = new Map();

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const escapeClass = s => String(s).replace(/[^a-z0-9_-]/gi, '');
  const formatRubles = n => new Intl.NumberFormat('ru-RU').format(Number(n));
  const getMapById = id => MAPS.find(m => m.id === id) || MAPS[0];
  const getCanvasCenterAnchor = () => {
    const r = el.mapCanvas.getBoundingClientRect();
    return { clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 };
  };

  function parseLabelQty(r) {
    let qty = r?.qty, name = String(r?.label ?? '');
    if (!qty && name) {
      const m = name.match(/[×x]\s*(\d+)\s*$/i);
      if (m) { qty = m[1]; name = name.replace(m[0], '').trim(); }
    }
    return { name, qty };
  }

  function showToast(text) {
    if (!el.toast) return;
    el.toast.textContent = text;
    el.toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.toast.hidden = true, 1800);
  }

  function initMapSelect() {
    el.mapSelect.innerHTML = MAPS.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
    el.mapSelect.value = state.currentMapId;
    el.mapSelect.addEventListener('change', () => {
      state.currentMapId = el.mapSelect.value;
      renderMap(true);
      showToast(`Карта: ${getMapById(state.currentMapId).name}`);
    });
  }

  function renderMap(resetView = false) {
    const map = getMapById(state.currentMapId);
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

    setupTilesLayer();
    recalcMinZoom();

    if (resetView) {
      setZoom(Math.max(CONFIG.DEFAULT_ZOOM, state.minZoom), getCanvasCenterAnchor());
      centerCanvas();
    } else {
      setZoom(clamp(state.zoom, state.minZoom, CONFIG.MAX_ZOOM), getCanvasCenterAnchor());
    }

    el.markersLayer.innerHTML = '';
    MARKERS.filter(q => q.loc === state.currentMapId).forEach(q => el.markersLayer.appendChild(createMarkerEl(q, map)));
    updateTiles(true);
    updateOpenPopovers();
  }

  function createMarkerEl(q, map) {
    const marker = document.createElement('button');
    marker.className = `marker marker--${q.faction || 'any'}`;
    marker.type = 'button';
    marker.setAttribute('aria-label', q.title);
    marker.style.left = (q.x / map.width * 100) + '%';
    marker.style.top = (q.y / map.height * 100) + '%';

    const icon = MARKER_ICONS[q.faction] || MARKER_ICONS.any;
    const w = Math.round(icon.w * CONFIG.PIN_SCALE), h = Math.round(icon.h * CONFIG.PIN_SCALE);

    marker.innerHTML = `
      <span class="pin"><img class="pin-img" src="${icon.src}" alt="Метка — ${escapeHtml(icon.alt)}" width="${w}" height="${h}" draggable="false"></span>
      <div class="popover" role="dialog" aria-label="${escapeHtml(q.title)}">
        <div class="q-grid">
          <div class="q-left">
            <img class="q-thumb-xl" src="${q.preview || IMG_PLACEHOLDER}" alt="Превью — ${escapeHtml(q.title)}">
            <div class="q-title-l">${escapeHtml(q.title)}</div>
            ${buildFactionBadge(q)}
            ${buildStatsInline(q)}
          </div>
          <div class="q-right">
            <div class="q-desc-box"><div class="q-desc">${escapeHtml(q.desc)}</div></div>
            ${buildRewardsLarge(q)}
            <div class="q-actions"><a href="${q.guideUrl}" class="btn" title="Открыть гайд"><i class="fa-solid fa-book-open"></i> Гайд по прохождению</a></div>
          </div>
        </div>
      </div>`;

    marker.querySelector('.pin-img').addEventListener('error', () => marker.classList.add('pin-fallback'), { once: true });
    marker.querySelectorAll('.q-thumb-xl, .rw-large img').forEach(im => {
      im.addEventListener('error', () => im.src = IMG_PLACEHOLDER, { once: true });
    });

    marker.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const active = marker.classList.toggle('active');
      if (active) {
        document.querySelectorAll('.marker.active').forEach(m => { if (m !== marker) m.classList.remove('active'); });
        scrollMarkerIntoView(marker);
        requestAnimationFrame(() => positionPopover(marker));
      }
    });
    return marker;
  }

  function buildFactionBadge(q) {
    const txt = { bandit: 'Бандиты', stalker: 'Сталкеры', event: 'Ивент' }[q.faction] || 'Все';
    const cls = { bandit: 'badge--bandit', stalker: 'badge--stalker', event: 'badge--event' }[q.faction] || 'badge--any';
    return `<div class="q-badges"><span class="q-badge ${cls}">${txt}</span></div>`;
  }

  function buildStatsInline(q) {
    const chips = [];
    if (isFinite(q.money)) chips.push(`<span class="stat-badge money"><i class="fa-solid fa-ruble-sign"></i> ${formatRubles(q.money)}</span>`);
    if (isFinite(q.reputation)) chips.push(`<span class="stat-badge rep"><i class="fa-solid fa-star"></i> +${q.reputation}</span>`);
    return chips.length ? `<div class="q-stats-inline">${chips.join('')}</div>` : '';
  }

  function buildRewardsLarge(q) {
    const list = [...(q.rewardsVar || []), ...(q.rewards || [])];
    if (!list.length) return '';
    return `<div class="rw-panel-large"><div class="rw-label">Награда</div><div class="rw-gallery grid-2">${list.map(r => {
      const { name, qty } = parseLabelQty(r);
      const fullName = `${name}${qty ? ` ×${qty}` : ''}`;
      return `<span class="rw-large compact ${r.rarity ? `rarity-${escapeClass(r.rarity)}` : ''}" data-tooltip="${escapeHtml(fullName)}"><img src="${r.img || IMG_PLACEHOLDER}" alt="Награда"><span class="lbl">${escapeHtml(name)}</span>${qty ? `<span class="qty">×${escapeHtml(qty)}</span>` : ''}</span>`;
    }).join('')}</div></div>`;
  }

  function scrollMarkerIntoView(marker) {
    const c = el.mapCanvas.getBoundingClientRect(), m = marker.getBoundingClientRect();
    if (m.left < c.left || m.right > c.right || m.top < c.top || m.bottom > c.bottom) {
      marker.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
    }
  }

  function positionPopover(marker) {
    const pop = marker.querySelector('.popover');
    if (!pop) return;
    pop.style.transform = 'translateX(-50%)';
    pop.style.width = '';
    pop.style.maxHeight = '';
    pop.classList.remove('scrollable');
    pop.removeAttribute('data-pos');

    const cr = el.mapCanvas.getBoundingClientRect(), mr = marker.getBoundingClientRect(), pad = 8;
    const availableW = Math.max(0, cr.width - pad * 2);
    if (availableW > 0) pop.style.width = Math.min(520, availableW) + 'px';

    const qGrid = pop.querySelector('.q-grid');
    if (qGrid) qGrid.style.gridTemplateColumns = availableW < 480 ? '1fr' : '';

    let pr = pop.getBoundingClientRect(), dx = 0;
    if (pr.left < cr.left + pad) dx = (cr.left + pad) - pr.left;
    else if (pr.right > cr.right - pad) dx = (cr.right - pad) - pr.right;
    if (Math.abs(dx) > 0.5) pop.style.transform = `translateX(calc(-50% + ${dx}px))`;

    const spaceAbove = (mr.top - cr.top) - 12, spaceBelow = (cr.bottom - mr.bottom) - 12;
    const naturalH = pop.scrollHeight, placeBelow = spaceAbove < naturalH && spaceBelow > spaceAbove;
    if (placeBelow) pop.setAttribute('data-pos', 'below');

    const availableH = Math.max(150, (placeBelow ? spaceBelow : spaceAbove) - 8);
    if (naturalH > availableH) { pop.classList.add('scrollable'); pop.style.maxHeight = availableH + 'px'; }
  }

  function setupTilesLayer() {
    if (el.tilesLayer) { el.tilesLayer.remove(); el.tilesLayer = null; tilesState.level = null; }
    const map = getMapById(state.currentMapId);
    if (!map.tiles) { el.mapImage.style.display = ''; return; }
    el.mapImage.style.display = 'none';
    const layer = document.createElement('div');
    layer.className = 'tiles-layer';
    el.mapFrame.insertBefore(layer, el.markersLayer);
    el.tilesLayer = layer;
  }

  function pickBestTileLevel(map) {
    const t = map.tiles;
    if (!t?.levels?.length) return null;
    const want = state.zoom * (window.devicePixelRatio || 1);
    const baseCols1 = Math.ceil(map.width / t.tileSize), baseRows1 = Math.ceil(map.height / t.tileSize);
    const levels = t.levels.map(l => ({ l, eff: Math.min(l.cols / baseCols1, l.rows / baseRows1) })).sort((a, b) => a.eff - b.eff);
    let best = levels[0].l;
    for (const it of levels) { if (it.eff >= want) { best = it.l; break; } best = it.l; }
    return best;
  }

  function getBaseUnit(map, lvl) {
    const t = map.tiles;
    const baseCols1 = Math.ceil(map.width / t.tileSize), baseRows1 = Math.ceil(map.height / t.tileSize);
    return { unitW: (t.tileSize * baseCols1) / lvl.cols, unitH: (t.tileSize * baseRows1) / lvl.rows };
  }

  function updateTiles(force = false) {
    const map = getMapById(state.currentMapId);
    if (!el.tilesLayer || !map.tiles) return;
    const lvl = pickBestTileLevel(map);
    if (!lvl) return;

    if (force || !tilesState.level || tilesState.level.z !== lvl.z) {
      tilesState.level = lvl;
      el.tilesLayer.innerHTML = '';
    }

    const { unitW, unitH } = getBaseUnit(map, lvl);
    const usableCols = Math.ceil(map.width / unitW), usableRows = Math.ceil(map.height / unitH);
    const r = el.mapCanvas.getBoundingClientRect();
    const leftBase = el.mapCanvas.scrollLeft / state.zoom, topBase = el.mapCanvas.scrollTop / state.zoom;
    const viewBaseW = r.width / state.zoom, viewBaseH = r.height / state.zoom, buf = 1;
    const c0 = Math.max(0, Math.floor(leftBase / unitW) - buf);
    const r0 = Math.max(0, Math.floor(topBase / unitH) - buf);
    const c1 = Math.min(usableCols - 1, Math.floor((leftBase + viewBaseW) / unitW) + buf);
    const r1 = Math.min(usableRows - 1, Math.floor((topBase + viewBaseH) / unitH) + buf);
    const needed = new Set();

    for (let row = r0; row <= r1; row++) {
      for (let col = c0; col <= c1; col++) {
        const key = `${lvl.z}:${row}:${col}`;
        needed.add(key);
        let img = el.tilesLayer.querySelector(`img.tile[data-key="${key}"]`);
        if (!img) {
          img = new Image();
          img.className = 'tile';
          img.decoding = 'async';
          img.loading = 'eager';
          img.dataset.key = key;
          img.alt = '';
          img.src = lvl.url(col, row);
          el.tilesLayer.appendChild(img);
        }
        const isLastCol = col === usableCols - 1, isLastRow = row === usableRows - 1;
        const sL = col > 0 ? CONFIG.TILE_SEAM : 0, sT = row > 0 ? CONFIG.TILE_SEAM : 0;
        const sR = !isLastCol ? CONFIG.TILE_SEAM : 0, sB = !isLastRow ? CONFIG.TILE_SEAM : 0;
        const x = col * unitW * state.zoom - sL, y = row * unitH * state.zoom - sT;
        const w = unitW * state.zoom + sL + sR, h = unitH * state.zoom + sT + sB;
        img.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        img.style.width = w + 'px';
        img.style.height = h + 'px';
      }
    }
    el.tilesLayer.querySelectorAll('img.tile').forEach(im => { if (!needed.has(im.dataset.key)) im.remove(); });
  }

  function updateOpenPopovers() {
    document.querySelectorAll('.marker.active, .marker:focus-within, .marker:hover').forEach(positionPopover);
  }

  function recalcMinZoom() {
    const map = getMapById(state.currentMapId);
    state.minZoom = Math.min(el.mapCanvas.clientWidth / map.width, el.mapCanvas.clientHeight / map.height) || 0.3;
  }

  function setZoom(newZoom, anchor) {
    const map = getMapById(state.currentMapId), r = el.mapCanvas.getBoundingClientRect();
    const prev = state.zoom, cw = map.width * prev, ch = map.height * prev;
    const ax = anchor?.clientX ?? (r.left + r.width / 2), ay = anchor?.clientY ?? (r.top + r.height / 2);
    const relX = (el.mapCanvas.scrollLeft + (ax - r.left)) / Math.max(1, cw);
    const relY = (el.mapCanvas.scrollTop + (ay - r.top)) / Math.max(1, ch);

    state.zoom = clamp(newZoom, Math.max(state.minZoom, CONFIG.MIN_ZOOM), CONFIG.MAX_ZOOM);
    const nw = map.width * state.zoom, nh = map.height * state.zoom;

    el.mapFrame.style.setProperty('--frame-w', nw + 'px');
    el.mapFrame.style.setProperty('--frame-h', nh + 'px');
    el.zoomValue.textContent = Math.round(state.zoom * 100) + '%';
    el.mapCanvas.scrollLeft = clamp(relX * nw - (ax - r.left), 0, Math.max(0, nw - r.width));
    el.mapCanvas.scrollTop = clamp(relY * nh - (ay - r.top), 0, Math.max(0, nh - r.height));
    el.mapCanvas.classList.toggle('pannable', state.zoom > state.minZoom + 1e-3);
    updateOpenPopovers();
    updateTiles();
  }

  function centerCanvas() {
    const map = getMapById(state.currentMapId), r = el.mapCanvas.getBoundingClientRect();
    el.mapCanvas.scrollLeft = Math.max(0, (map.width * state.zoom - r.width) / 2);
    el.mapCanvas.scrollTop = Math.max(0, (map.height * state.zoom - r.height) / 2);
  }

  el.zoomInBtn.addEventListener('click', () => setZoom(state.zoom * 1.2, getCanvasCenterAnchor()));
  el.zoomOutBtn.addEventListener('click', () => setZoom(state.zoom / 1.2, getCanvasCenterAnchor()));
  el.mapCanvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    setZoom(state.zoom * (e.deltaY > 0 ? 1 / 1.1 : 1.1), { clientX: e.clientX, clientY: e.clientY });
  }, { passive: false });

  el.mapCanvas.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') {
      el.mapCanvas.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        const [p1, p2] = [...pointers.values()];
        el._pinch = { dist: Math.hypot(p1.x - p2.x, p1.y - p2.y), zoom: state.zoom, cx: (p1.x + p2.x) / 2, cy: (p1.y + p2.y) / 2 };
      }
      const activeMarker = document.querySelector('.marker.active');
      if (activeMarker && !e.target.closest('.marker')) { activeMarker.classList.remove('active'); return; }
    }
    if (e.target.closest('.marker') || e.target.closest('.popover')) return;
    if (state.zoom <= state.minZoom + 1e-3 || e.button !== 0) return;
    el.mapCanvas.setPointerCapture(e.pointerId);
    dragActive = true;
    dragStart = { x: e.clientX, y: e.clientY, sx: el.mapCanvas.scrollLeft, sy: el.mapCanvas.scrollTop };
    el.mapCanvas.classList.add('dragging');
  });

  el.mapCanvas.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch' && pointers.has(e.pointerId)) {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2 && el._pinch) {
        const [p1, p2] = [...pointers.values()];
        setZoom(el._pinch.zoom * (Math.hypot(p1.x - p2.x, p1.y - p2.y) / el._pinch.dist), { clientX: el._pinch.cx, clientY: el._pinch.cy });
      }
    }
    if (!dragActive || el._pinch) return;
    el.mapCanvas.scrollLeft = clamp(dragStart.sx - (e.clientX - dragStart.x), 0, el.mapFrame.clientWidth - el.mapCanvas.clientWidth);
    el.mapCanvas.scrollTop = clamp(dragStart.sy - (e.clientY - dragStart.y), 0, el.mapFrame.clientHeight - el.mapCanvas.clientHeight);
  });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => {
    el.mapCanvas.addEventListener(t, (e) => {
      if (pointers.has(e.pointerId)) pointers.delete(e.pointerId);
      if (pointers.size < 2) el._pinch = null;
      dragActive = false;
      el.mapCanvas.classList.remove('dragging');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.marker')) document.querySelectorAll('.marker.active').forEach(m => { m.classList.remove('active'); m.style.zIndex = ''; });
  });

  el.mapCanvas.addEventListener('scroll', () => { updateOpenPopovers(); updateTiles(); });
  window.addEventListener('resize', () => { recalcMinZoom(); setZoom(Math.max(state.zoom, state.minZoom), getCanvasCenterAnchor()); updateOpenPopovers(); updateTiles(); });
  window.addEventListener('orientationchange', () => { updateOpenPopovers(); updateTiles(); });

  const legendToggles = { any: document.querySelector('.chip-any'), stalker: document.querySelector('.chip-stalker'), bandit: document.querySelector('.chip-bandit'), event: document.querySelector('.chip-event') };
  const legendVisible = { any: true, stalker: true, bandit: true, event: true };

  Object.entries(legendToggles).forEach(([faction, node]) => {
    if (!node) return;
    node.setAttribute('role', 'button');
    const toggle = () => {
      legendVisible[faction] = !legendVisible[faction];
      document.querySelectorAll(`.marker--${faction}`).forEach(m => m.style.display = legendVisible[faction] ? '' : 'none');
      node.classList.toggle('off', !legendVisible[faction]);
      node.classList.toggle('active', legendVisible[faction]);
      node.setAttribute('aria-pressed', legendVisible[faction]);
    };
    node.addEventListener('click', toggle);
    node.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });

  const copyBtn = document.getElementById('copyNickBtn'), nickEl = document.getElementById('gameNick');
  if (copyBtn && nickEl) {
    copyBtn.addEventListener('click', async () => {
      const nick = nickEl.textContent.trim(), icon = copyBtn.querySelector('i');
      try { await navigator.clipboard.writeText(nick); }
      catch { const ta = document.createElement('textarea'); ta.value = nick; ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
      icon.className = 'fa-solid fa-check';
      copyBtn.classList.add('copied');
      setTimeout(() => { icon.className = 'fa-regular fa-copy'; copyBtn.classList.remove('copied'); }, 2000);
    });
  }

  const tooltipEl = document.createElement('div');
  tooltipEl.className = 'global-tooltip';
  document.body.appendChild(tooltipEl);
  let tooltipTarget = null;

  const updateTooltip = () => {
    if (!tooltipTarget) return;
    const text = tooltipTarget.dataset.tooltip;
    if (!text) return;
    tooltipEl.textContent = text;
    tooltipEl.classList.add('visible');
    const targetRect = tooltipTarget.getBoundingClientRect(), tooltipRect = tooltipEl.getBoundingClientRect(), gap = 8;
    let left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
    let top = targetRect.top - tooltipRect.height - gap;
    if (left < 10) left = 10;
    else if (left + tooltipRect.width > window.innerWidth - 10) left = window.innerWidth - tooltipRect.width - 10;
    if (top < 10) top = targetRect.bottom + gap;
    tooltipEl.style.left = `${left}px`;
    tooltipEl.style.top = `${top}px`;
  };

  document.addEventListener('mouseover', (e) => { const target = e.target.closest('[data-tooltip]'); if (target) { tooltipTarget = target; updateTooltip(); } });
  document.addEventListener('mouseout', (e) => { const target = e.target.closest('[data-tooltip]'); if (target && target === tooltipTarget) { tooltipEl.classList.remove('visible'); tooltipTarget = null; } });
  window.addEventListener('scroll', () => { if (tooltipTarget) updateTooltip(); }, { capture: true, passive: true });

  initMapSelect();
  renderMap(true);
});

window.enableMapCoordProbe = (on = true) => {
  const canvas = document.getElementById('mapCanvas'), frame = document.getElementById('mapFrame');
  const baseW = Number(frame?.dataset?.baseW || 1372), baseH = Number(frame?.dataset?.baseH || 2000);
  const handler = (e) => {
    const r = frame.getBoundingClientRect();
    console.log(`Marker coords: x:${Math.round((e.clientX - r.left) / r.width * baseW)}, y:${Math.round((e.clientY - r.top) / r.height * baseH)}`);
  };
  if (on) { canvas.style.cursor = 'crosshair'; canvas.addEventListener('click', handler); console.info('Пробник координат включен. enableMapCoordProbe(false) — выключить'); }
  else { canvas.style.cursor = ''; canvas.removeEventListener('click', handler); console.info('Пробник координат выключен'); }
};
