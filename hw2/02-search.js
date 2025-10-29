const input = document.getElementById("userInput");
const button = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");

// find every place in the text that matches what the user searched for & visually highlight it in yellow
function highlight(text, query) {
  if (!query) return text;
  // escape regex special chars in query
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${escaped})`, "gi");
  return text.replace(re, '<mark class="bg-warning p-0 m-0">$1</mark>');
}

// helper function
function renderEmptyState(msg, tone = "secondary") {
  resultsDiv.innerHTML = `
    <div class="col-12">
      <p class="text-center text-${tone} m-0">${msg}</p>
    </div>
  `;
}

function renderResults(list, query) {
  resultsDiv.innerHTML = "";

  if (list.length === 0) {
    renderEmptyState("No results found.", "muted");
    return;
  }

  list.forEach((char) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex";

    const card = document.createElement("div");
    card.className = "card shadow-sm flex-fill";

    const body = document.createElement("div");
    body.className = "card-body text-center";

    const title = document.createElement("h2");
    title.className = "card-title fs-5";
    title.innerHTML = highlight(char.name, query);

    const by = document.createElement("p");
    by.className = "card-text text-muted mb-0";
    by.textContent = `Birth year: ${char.birth_year}`;

    body.appendChild(title);
    body.appendChild(by);
    card.appendChild(body);
    col.appendChild(card);
    resultsDiv.appendChild(col);
  });
}

// search handler
function handleSearch() {
  const queryRaw = input.value.trim();
  if (queryRaw === "") {
    resultsDiv.innerHTML = "";
    renderEmptyState("Please enter a search term.", "danger");
    return;
  }

  const query = queryRaw.toLowerCase();
  // 'characters' comes from 02-data.js
  const matches = characters.filter((c) =>
    c.name.toLowerCase().includes(query)
  );

  renderResults(matches, queryRaw);
}

// events
button.addEventListener("click", handleSearch);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});
