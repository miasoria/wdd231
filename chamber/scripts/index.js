  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  const menuButton = document.getElementById('menuButton');
  const navMenu = document.getElementById('navMenu');
  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

const apiKey = "0e6f592303928a80853410aea1b3ecc9";
const lat = 16.766533858632766;
const lon = -3.0021431298940198;


const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;

fetch(currentUrl)
  .then(res => res.json())
  .then(data => {
    document.getElementById('current-temp').textContent = `🌡️ ${data.main.temp.toFixed(1)}°C`;
    document.getElementById('weather-desc').textContent = `☁️ ${data.weather[0].description}`;
    document.getElementById('high-low').textContent = `↑ ${data.main.temp_max.toFixed(1)}°C ↓ ${data.main.temp_min.toFixed(1)}°C`;
    document.getElementById('humidity').textContent = `💧 Humility: ${data.main.humidity}%`;

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", {
      hour: '2-digit',
      minute: '2-digit'
    });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", {
      hour: '2-digit',
      minute: '2-digit'
    });
    document.getElementById('sunrise-sunset').textContent = `🌅 ${sunrise} / 🌇 ${sunset}`;
  })
  .catch(error => {
    console.error("Error getting current weather:", error);
  });

fetch(forecastUrl)
  .then(res => res.json())
  .then(data => {
    const forecastList = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    const forecastEl = document.getElementById('forecast-list');
    forecastEl.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      const day = forecastList[i];
      const date = new Date(day.dt_txt);
      const temp = day.main.temp.toFixed(1);
      const desc = day.weather[0].description;

      const li = document.createElement('li');
      li.textContent = `${date.toLocaleDateString("en-US", { weekday: 'long' })}: ${temp}°C - ${desc}`;
      forecastEl.appendChild(li);
    }
  })
  .catch(error => {
    console.error("Error getting forecast:", error);
  });

  fetch('data/members.json') // Asegúrate que la ruta sea correcta
  .then(response => response.json())
  .then(data => {
    const members = data.members;
    const container = document.getElementById('members-container');

    const selected = members.slice(0, 3);

    selected.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('business-card');

      card.innerHTML = `
        <img src="images/${member.image}" alt="Foto de ${member.name}">
        <h4>${member.company}</h4>
        <p><strong>${member.role}</strong> — ${member.name}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p>${member.description}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error al cargar los miembros:', error);
  });