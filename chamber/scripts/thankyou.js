  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  const menuButton = document.getElementById('menuButton');
  const navMenu = document.getElementById('navMenu');
  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);


  function getParam(key) {
    return params.has(key) ? params.get(key) : '';
  }

  const fields = [
    { label: 'First name', key: 'first-name' },
    { label: 'Last name', key: 'last-name' },
    { label: 'Email', key: 'email' },
    { label: 'Mobile phone', key: 'phone' },
    { label: 'Business / Organization', key: 'organization' },
    { label: 'Submitted at', key: 'timestamp' }
  ];

  const container = document.getElementById('summary');

  if (!params.toString()) {
    const p = document.createElement('p');
    p.textContent = 'No form data received. If you submitted the form, please try again.';
    container.appendChild(p);
    return;
  }

  const firstName = getParam('first-name');
  const heading = document.createElement('h2');
  heading.textContent = firstName ? `Thank you, ${firstName}!` : 'Thank you for your submission';
  container.appendChild(heading);

  const dl = document.createElement('dl');
  dl.className = 'summary-list';

  fields.forEach(field => {
    const raw = getParam(field.key) || '';
    const dt = document.createElement('dt');
    dt.textContent = field.label;
    const dd = document.createElement('dd');

    if (field.key === 'timestamp') {
      let display = 'Not available';
      if (raw) {
        const parsed = new Date(raw);
        if (!isNaN(parsed)) {
          display = parsed.toLocaleString('en-US', {
            timeZone: 'America/New_York',
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: true
          });
        } else {
          display = raw;
        }
      }
      dd.textContent = display;
    } else {
      dd.textContent = raw || 'Not provided';
    }

    dl.appendChild(dt);
    dl.appendChild(dd);
  });

  container.appendChild(dl);

  const back = document.createElement('a');
  back.href = 'join.html';
  back.className = 'back-button';
  back.textContent = 'Return to the form';
  container.appendChild(back);
});