const entriesContainer = document.getElementById("entriesContainer");
const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

if (entries.length === 0) {
    entriesContainer.innerHTML = "<p>There are no saved entries.</p>";
} else {
    entries.forEach(entry => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h2>${entry.name} — <small>${entry.mood}</small></h2>
            <p>${entry.content}</p>
            <small>Guardado el: ${entry.date}</small>
            <hr>
        `;
        entriesContainer.appendChild(div);
    });
}

document.getElementById("currentyear").textContent = new Date().getFullYear();