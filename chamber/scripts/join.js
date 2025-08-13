  document.getElementById("currentyear").textContent = new Date().getFullYear();

  const menuButton = document.getElementById('menuButton');
  const navMenu = document.getElementById('navMenu');
  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  document.addEventListener("DOMContentLoaded", () => {
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    const now = new Date();
    timestampField.value = now.toISOString();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const openButtons = document.querySelectorAll("[data-modal]");

  openButtons.forEach(button => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    });
  });

  const closeButtons = document.querySelectorAll(".close-modal");
  closeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const dialog = button.closest("dialog");
      if (dialog) dialog.close();
    });
  });
});