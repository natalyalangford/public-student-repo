const input = document.getElementById("userInput");
const textEl = document.getElementById("text");
const originalText = textEl.innerText;

// escape regex special characters
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// highlight all occurrences
function highlightWord(word) {
  const query = word.trim();
  if (query === "") {
    textEl.innerHTML = originalText;
    return;
  }

  const escaped = escapeRegExp(query);
  const regex = new RegExp(`(${escaped})`, "gi");
  const highlighted = originalText.replace(
    regex,
    '<mark class="bg-warning p-0 m-0">$1</mark>'
  );
  textEl.innerHTML = highlighted;
}

// listen for enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    highlightWord(input.value);
  }
});
