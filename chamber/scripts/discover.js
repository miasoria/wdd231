  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

fetch('data/discover.json').then(r => console.log(r.status, r.url));

const DATA_PATH = 'data/discover.json';
const visitorEl = document.getElementById('visitorMessage');

function daysBetween(msOld, msNow) {
  const diff = msNow - msOld;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function showVisitorMessage() {
  const key = 'chamber_last_visit';
  const now = Date.now();
  const last = localStorage.getItem(key);
  let msg = '';
  if (!last) {
    msg = 'Welcome! Let us know if you have any questions.';
  } else {
    const days = daysBetween(Number(last), now);
    if (days === 0) {
      msg = 'Back so soon! Awesome!';
    } else if (days === 1) {
      msg = 'You last visited 1 day ago.';
    } else {
      msg = `You last visited ${days} days ago.`;
    }
  }
  visitorEl.textContent = msg;
  localStorage.setItem(key, now.toString());
}

async function loadCards() {
  try {
    const res = await fetch(DATA_PATH);
    if (!res.ok) throw new Error('Could not load JSON');
    const items = await res.json();
    items.slice(0,8).forEach((item, i) => {
      const area = `card${i+1}`;
      const el = document.querySelector(`.${area}`);
      if (!el) return;
      el.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image_url}" alt="${item.alt || item.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <a class="btn" href="#" aria-label="Learn more about ${item.name}">Learn more</a>
      `;
    });
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  showVisitorMessage();
  loadCards();
});