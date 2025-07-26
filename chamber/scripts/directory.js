  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  const menuButton = document.getElementById('menuButton');
  const navMenu = document.getElementById('navMenu');
  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  const container = document.querySelector(".cards");
  document.getElementById("grid").addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
  });
  document.getElementById("list").addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
  });

  const url = "data/members.json";
  async function getMembers() {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Fetch failed");
      const data = await response.json();
      displayMembers(data.members);
    } catch (error) {
      console.error("Error loading members:", error);
      container.innerHTML = "<p style='color: red;'>Could not load members 😢</p>";
    }
  }

  function displayMembers(members) {
    container.innerHTML = "";
    members.forEach(member => {
      const card = document.createElement("section");
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;
      container.appendChild(card);
    });
  }

  getMembers();
});