/**
 * home.js — editorial hero, live preview lab, filter dock and the full tool directory.
 */
import { CATEGORIES, TOOLS, countTools, getToolByKey } from '../tools.js';
import { createEl, qs, qsa, on, debounce, escapeHTML } from '../utils/dom.js';
import { getFavorites, getRecents } from '../utils/storage.js';
import { categorySectionHTML, toolGridHTML, emptyStateHTML, wireFavStars } from './shared.js';
import { mountPreviewLab } from './homePreviews.js';

const chipHTML = (filter, label, count, active = false) => `
  <button class="chip ${active ? 'is-active' : ''}" type="button" data-filter="${filter}" aria-pressed="${active}">
    ${escapeHTML(label)} <span class="chip-count">${count}</span>
  </button>`;

export function renderHome() {
  const favorites = getFavorites().map(getToolByKey).filter(Boolean);
  const recents = getRecents().map(getToolByKey).filter(Boolean).slice(0, 4);

  const view = createEl('div', { class: 'route-view' });
  view.innerHTML = `
    <section class="hero" id="hero-section">
      <div class="hero-copy">
        <span class="hero-eyebrow"><span class="status-dot status-dot--accent" aria-hidden="true"></span> Swiss modular computation engine</span>
        <h1>Precision tools.<br><em>Directly tactile.</em></h1>
      </div>
      <p class="hero-lead">
        ${TOOLS.length} local-first tools with zero trackers and tactile modular controls.
        Results land as you type, and everything runs privately in your browser.
      </p>
    </section>

    <section class="preview-lab" id="preview-lab" aria-label="Live tool previews"></section>

    ${recents.length ? `
    <section class="recents">
      <div class="section-head"><i class="fa-solid fa-clock-rotate-left cat-icon"></i><h2>Jump Back In</h2></div>
      ${toolGridHTML(recents)}
    </section>` : ''}

    ${favorites.length ? `
    <section class="favorites-section">
      <div class="section-head"><i class="fa-solid fa-star cat-icon" style="color:var(--warning)"></i><h2>Your favorites</h2><span class="count">${favorites.length}</span></div>
      ${toolGridHTML(favorites)}
    </section>` : ''}

    <section class="filter-dock" aria-label="Search and filter tools">
      <div class="dock-search">
        <div class="home-search" role="search" aria-label="Filter instruments">
          <i class="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
          <input type="search" id="home-search" placeholder="Filter ${TOOLS.length} tools…"
                 aria-label="Filter tools" autocomplete="off">
        </div>
      </div>
      <div class="dock-chips" id="filter-chips">
        ${chipHTML('all', 'All', TOOLS.length, true)}
        ${chipHTML('calculators', 'Calculators', countTools('calculators'))}
        ${chipHTML('converters', 'Converters', countTools('converters'))}
        <span class="chip-sep" aria-hidden="true"></span>
        ${CATEGORIES.map((c) => chipHTML(`cat:${c.id}`, c.name, c.tools.length)).join('')}
      </div>
    </section>
    <div class="results-bar" id="results-bar" hidden>
      <span id="results-status" role="status" aria-live="polite"></span>
      <button class="btn btn-sm btn-ghost" id="reset-filters" type="button"><i class="fa-solid fa-rotate-left" aria-hidden="true"></i> Reset</button>
    </div>

    <div id="tool-sections">
      ${CATEGORIES.map((c) => categorySectionHTML(c, TOOLS.filter((t) => t.categoryId === c.id))).join('')}
    </div>
    <div id="no-results" hidden>${emptyStateHTML('No tools match that search', 'Try a shorter term, or reset the filter dock above.')}</div>
  `;

  const lab = mountPreviewLab(qs('#preview-lab', view));

  /* ---------- live filtering (debounced; pure DOM, no re-render) ---------- */
  const searchInput = qs('#home-search', view);
  const sections = qsa('.cat-section', view);
  const noResults = qs('#no-results', view);
  const resultsBar = qs('#results-bar', view);
  const resultsStatus = qs('#results-status', view);
  const resetBtn = qs('#reset-filters', view);
  let activeFilter = 'all';

  const filterLabel = () => {
    if (activeFilter === 'calculators') return 'Calculators';
    if (activeFilter === 'converters') return 'Converters';
    if (activeFilter.startsWith('cat:')) {
      return CATEGORIES.find((c) => `cat:${c.id}` === activeFilter)?.name || 'All instruments';
    }
    return 'All instruments';
  };

  const applyFilter = () => {
    const query = searchInput.value.trim();
    const terms = query ? query.toLowerCase().split(/\s+/) : [];
    let visibleTotal = 0;

    sections.forEach((section) => {
      const catId = section.dataset.category;
      const catAllowed = activeFilter === 'all'
        || (activeFilter.startsWith('cat:') ? activeFilter.slice(4) === catId
          : CATEGORIES.find((c) => c.id === catId).group === activeFilter);

      let visible = 0;
      qsa('.tool-card', section).forEach((card) => {
        const haystack = card.dataset.search;
        const match = catAllowed && terms.every((t) => haystack.includes(t));
        card.hidden = !match;
        if (match) visible += 1;
      });
      section.hidden = visible === 0;
      const count = qs('.count', section);
      if (count) count.textContent = `${visible} tool${visible === 1 ? '' : 's'}`;
      visibleTotal += visible;
    });

    noResults.hidden = visibleTotal !== 0;

    const filtering = Boolean(query) || activeFilter !== 'all';
    resultsBar.hidden = !filtering;
    if (filtering && resultsStatus) {
      resultsStatus.textContent = `Showing ${visibleTotal} of ${TOOLS.length} · ${filterLabel()}${query ? ` · “${query}”` : ''}`;
    }
  };

  on(searchInput, 'input', debounce(applyFilter, 130));
  on(qs('#filter-chips', view), 'click', '.chip', (e, chip) => {
    qsa('.chip', view).forEach((c) => {
      const active = c === chip;
      c.classList.toggle('is-active', active);
      c.setAttribute('aria-pressed', String(active));
    });
    activeFilter = chip.dataset.filter;
    applyFilter();
  });
  on(resetBtn, 'click', () => {
    searchInput.value = '';
    activeFilter = 'all';
    qsa('.chip', view).forEach((c) => {
      const active = c.dataset.filter === 'all';
      c.classList.toggle('is-active', active);
      c.setAttribute('aria-pressed', String(active));
    });
    applyFilter();
    searchInput.focus();
  });

  wireFavStars(view);
  view.__cleanup = () => lab.destroy();
  document.title = 'FatahCalc Pro — Every calculator and converter, in one modern place by FatahTech';
  return view;
}
