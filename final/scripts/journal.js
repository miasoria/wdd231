document.getElementById("journalForm").addEventListener("submit", function () {
    const name = document.getElementById("name").value.trim();
    const mood = document.getElementById("mood").value.trim();
    const entryText = document.getElementById("entry").value.trim();

    const entry = {
        name: name,
        mood: mood,
        content: entryText,
        date: new Date().toLocaleString()
    };

    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.push(entry);

    localStorage.setItem("journalEntries", JSON.stringify(entries));
});

document.getElementById("currentyear").textContent = new Date().getFullYear();



  document.getElementById("currentyear").textContent = new Date().getFullYear();