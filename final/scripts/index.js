  document.getElementById("currentyear").textContent = new Date().getFullYear();

  const menuButton = document.getElementById('menuButton');
  const navMenu = document.getElementById('navMenu');
  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
