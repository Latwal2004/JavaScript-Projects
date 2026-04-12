// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────
let allAnime = [];

// Fetch 4 pages × 5 = 20 anime concurrently
async function fetchAnime() {
  try {
    const offsets = [0, 5, 10, 15];
    const responses = await Promise.all(
      offsets.map(offset =>
        fetch(`https://kitsu.io/api/edge/anime?page[limit]=5&page[offset]=${offset}&sort=-averageRating`)
          .then(r => r.json())
      )
    );
    // Merge all pages into one array
    allAnime = responses.flatMap(res => res.data || []);
    renderStats();
    filterAnime();
  } catch (err) {
    document.getElementById('grid').innerHTML =
      '<div class="msg">Failed to load data. Check your internet connection.</div>';
    console.error('Kitsu API error:', err);
  }
}

// ──────────────────────────────────────────────
// STATS
// ──────────────────────────────────────────────
function renderStats() {
  const rated = allAnime.filter(a => a.attributes.averageRating);
  const avg = rated.reduce((sum, a) => sum + parseFloat(a.attributes.averageRating), 0) / rated.length;
  const totalEp = allAnime.reduce((sum, a) => sum + (parseInt(a.attributes.episodeCount) || 0), 0);
  const totalUsers = allAnime.reduce((sum, a) => sum + (parseInt(a.attributes.userCount) || 0), 0);

  document.getElementById('stats').innerHTML = `
    <div class="stat-pill">Titles: <strong>${allAnime.length}</strong></div>
    <div class="stat-pill">Avg Rating: <strong>${avg.toFixed(1)}</strong></div>
    <div class="stat-pill">Total Episodes: <strong>${totalEp.toLocaleString()}</strong></div>
    <div class="stat-pill">Total Watchers: <strong>${(totalUsers / 1000000).toFixed(1)}M</strong></div>
  `;
}

// ──────────────────────────────────────────────
// FILTER + SORT
// ──────────────────────────────────────────────
function filterAnime() {
  const query = document.getElementById('search').value.toLowerCase();
  const sortBy = document.getElementById('sort').value;

  let list = allAnime.filter(a => getTitle(a).toLowerCase().includes(query));

  list.sort((a, b) => {
    if (sortBy === 'rating')     return (parseFloat(b.attributes.averageRating) || 0) - (parseFloat(a.attributes.averageRating) || 0);
    if (sortBy === 'popularity') return (parseInt(a.attributes.popularityRank) || 999) - (parseInt(b.attributes.popularityRank) || 999);
    if (sortBy === 'ep')         return (parseInt(b.attributes.episodeCount) || 0) - (parseInt(a.attributes.episodeCount) || 0);
    return getTitle(a).localeCompare(getTitle(b));
  });

  renderGrid(list);
}

// ──────────────────────────────────────────────
// RENDER GRID
// ──────────────────────────────────────────────
function renderGrid(list) {
  const grid = document.getElementById('grid');
  if (!list.length) {
    grid.innerHTML = '<div class="msg">No anime found matching your search.</div>';
    return;
  }
  grid.innerHTML = list.map((a, i) => cardHTML(a, i)).join('');
}

function cardHTML(a, i) {
  const attr = a.attributes;
  const title = getTitle(a);
  const img = attr.posterImage?.small || '';
  const rating = attr.averageRating ? parseFloat(attr.averageRating).toFixed(1) : '—';
  const ep = attr.episodeCount || '?';
  const type = attr.showType || '—';
  const rank = attr.popularityRank ? `#${attr.popularityRank}` : '';
  const users = attr.userCount ? formatUsers(attr.userCount) : '';
  const epLen = attr.episodeLength ? `${attr.episodeLength}min` : '';
  const age = attr.ageRating || '';
  const delay = Math.min(i * 40, 400);

  return `
    <div class="card" style="animation-delay:${delay}ms" onclick="showModal('${a.id}')">
      <div class="card-img-wrap">
        ${img ? `<img src="${img}" alt="${escHtml(title)}" loading="lazy"/>` : `<div class="no-img">No image</div>`}
        ${rank ? `<div class="card-rank">${rank}</div>` : ''}
      </div>
      <div class="card-body">
        <div class="card-title">${escHtml(title)}</div>
        <div class="badges">
          <span class="badge badge-rating">★ ${rating}</span>
          <span class="badge badge-ep">${ep} ep</span>
          <span class="badge badge-type">${escHtml(type)}</span>
          ${age ? `<span class="badge badge-age">${escHtml(age)}</span>` : ''}
        </div>
        <div class="card-users">
          ${users ? `👥 ${users} watching` : ''}
          ${epLen ? (users ? ' · ' : '') + '⏱ ' + epLen + '/ep' : ''}
        </div>
      </div>
    </div>`;
}

// ──────────────────────────────────────────────
// MODAL
// ──────────────────────────────────────────────
function showModal(id) {
  const a = allAnime.find(x => x.id === id);
  if (!a) return;
  const attr = a.attributes;
  const title = getTitle(a);
  const poster = attr.posterImage?.medium || '';
  const cover = attr.coverImage?.large || attr.coverImage?.original || '';
  const rating = attr.averageRating ? parseFloat(attr.averageRating).toFixed(1) : '—';
  const ep = attr.episodeCount || '?';
  const type = attr.showType || '—';
  const status = attr.status || '—';
  const start = attr.startDate || '—';
  const end = attr.endDate || '—';
  const epLen = attr.episodeLength ? `${attr.episodeLength} min/ep` : '—';
  const users = attr.userCount ? formatUsers(attr.userCount) : '—';
  const favs = attr.favoritesCount ? formatUsers(attr.favoritesCount) : '—';
  const rank = attr.popularityRank ? `#${attr.popularityRank}` : '—';
  const ratingRank = attr.ratingRank ? `#${attr.ratingRank}` : '—';
  const age = attr.ageRating || '—';
  const ageGuide = attr.ageRatingGuide || '';
  const slug = attr.slug || '';
  const kitsuLink = slug ? `https://kitsu.io/anime/${slug}` : '';
  const synopsis = attr.synopsis
    ? attr.synopsis.slice(0, 380) + (attr.synopsis.length > 380 ? '…' : '')
    : 'No synopsis available.';

  document.getElementById('modal').innerHTML = `
    ${cover ? `<img class="modal-cover" src="${cover}" alt="cover"/>` : `<div class="modal-cover-placeholder"></div>`}
    <div class="modal-top">
      <div class="modal-poster">
        ${poster ? `<img src="${poster}" alt="${escHtml(title)}"/>` : `<div class="no-img" style="height:150px">—</div>`}
      </div>
      <div class="modal-info">
        <div class="modal-title">${escHtml(title)}</div>
        <div class="modal-meta">
          ${escHtml(type)} · ${ep} eps · ${escHtml(status)}<br>
          ${start} → ${end}<br>
          Age: <strong>${escHtml(age)}</strong>${ageGuide ? ` — ${escHtml(ageGuide)}` : ''}
        </div>
        <div class="modal-stats-row">
          <span class="badge badge-rating">★ ${rating}</span>
          <span class="badge badge-rank">Pop. ${rank}</span>
          <span class="badge badge-rank">Rated ${ratingRank}</span>
          <span class="badge badge-ep">⏱ ${epLen}</span>
          <span class="badge badge-ep">👥 ${users}</span>
          <span class="badge badge-ep">♥ ${favs}</span>
          ${age !== '—' ? `<span class="badge badge-age">${escHtml(age)}</span>` : ''}
        </div>
        ${kitsuLink ? `<a class="modal-kitsu-link" href="${kitsuLink}" target="_blank">View on Kitsu ↗</a>` : ''}
      </div>
    </div>
    <div class="modal-synopsis">${escHtml(synopsis)}</div>
    <button class="modal-close" onclick="closeModal()">✕  Close</button>
  `;
  document.getElementById('modal-bg').classList.add('open');
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('modal-bg')) {
    document.getElementById('modal-bg').classList.remove('open');
  }
}

// Close with Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ──────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────
function getTitle(a) {
  const t = a.attributes.titles;
  return t.en || t.en_jp || t.ja_jp || 'Unknown Title';
}

function formatUsers(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ──────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────
fetchAnime();