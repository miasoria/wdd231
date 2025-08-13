function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
    .replaceAll('"','&quot;').replaceAll("'",'&#39;');
}

async function fetchTestimonials(url = 'data/testimonials.json') {
  try {
    console.log('fetching', url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const json = await res.json();
    if (!Array.isArray(json)) throw new Error('JSON no es array');
    return json.slice(0, 15);
  } catch (err) {
    console.error('fetchTestimonials error:', err);
    return [];
  }
}

function renderGrid(container, items) {
  if (!container) {
    console.warn('RenderGrid: container not found');
    return;
  }
  if (!items.length) {
    container.innerHTML = '<p class="error">No testimonials available.</p>';
    return;
  }

  container.innerHTML = items.map(it => {
    const photo = it.photo_url ? escapeHtml(it.photo_url) : `https://picsum.photos/seed/testi${it.id}/600/400`;
    return `
    <article class="testi-card" data-id="${it.id}">
      <div class="thumb-wrap" aria-hidden="true">
        <img class="testi-thumb" src="${photo}" alt="${escapeHtml(it.name)}" loading="lazy" width="260" height="170">
      </div>
      <div class="testi-meta">
        <strong class="testi-name">${escapeHtml(it.name)}</strong>
        <time class="testi-date" datetime="${escapeHtml(it.date)}">${escapeHtml(it.date)}</time>
      </div>
      <div class="testi-cta">
        <button class="btn-read" data-id="${it.id}" aria-controls="testi-dialog">Read testimony</button>
      </div>
    </article>
  `}).join('');
}

function createDialogController(dialogSelector = '#testi-dialog') {
  const dialog = document.querySelector(dialogSelector);
  if (!dialog) {
    console.warn('Dialog not found:', dialogSelector);
    return { open: () => {}, close: () => {} };
  }

  const titleEl = dialog.querySelector('#testi-title');
  const dateEl = dialog.querySelector('#testi-date');
  const textEl = dialog.querySelector('#testi-text');
  const closeBtn = dialog.querySelector('.dialog-close');

  let lastFocused = null;

  function getFocusable(el) {
    const selector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';
    return Array.from(el.querySelectorAll(selector)).filter(i => i.offsetParent !== null);
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusables = getFocusable(dialog);
    if (focusables.length === 0) { e.preventDefault(); return; }
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function open(item = {}) {
    lastFocused = document.activeElement;
    if (titleEl) titleEl.textContent = item.name || '';
    if (dateEl) dateEl.textContent = item.date || '';
    if (textEl) textEl.textContent = item.text || '';

    if (typeof dialog.showModal === 'function') {
      try { dialog.showModal(); }
      catch (err) { dialog.setAttribute('open',''); }
    } else dialog.setAttribute('open','');

    setTimeout(() => { if (closeBtn) closeBtn.focus(); }, 0);
    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      if (dialog.open || dialog.hasAttribute('open')) close();
      return;
    }
    if (e.key === 'Tab') trapFocus(e);
  }

  dialog.addEventListener('click', (ev) => {
    if (ev.target === dialog) close();
  });

  closeBtn?.addEventListener('click', () => close());
  dialog.addEventListener('close', () => { if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus(); });

  return { open, close };
}

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('testimonialsGrid');
  const dialogCtrl = createDialogController('#testi-dialog');

  const items = await fetchTestimonials('data/testimonials.json');
  console.log('uploaded testimonials:', items.length);
  renderGrid(grid, items);

  if (!grid) return;

  grid.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button.btn-read');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const item = items.find(i => Number(i.id) === id);
    if (!item) return;
    dialogCtrl.open(item);
  });

  grid.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
      const card = ev.target.closest('.testi-card');
      if (!card) return;
      const id = Number(card.dataset.id);
      const item = items.find(i => Number(i.id) === id);
      if (!item) return;
      dialogCtrl.open(item);
    }
  });
});

  document.getElementById("currentyear").textContent = new Date().getFullYear();