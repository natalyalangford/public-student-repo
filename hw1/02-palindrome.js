const input = document.getElementById("numberInput");
const result = document.getElementById("result");

input.addEventListener("input", handleInput);

function handleInput(event) {
  const value = event.target.value.trim();
  result.textContent = "";

  if (value === "") return;

  const num = Number(value);

  if (isNaN(num) || num < 0) {
    result.textContent = "Please enter a positive number";
    result.className = "text-danger";
    return;
  }

  const reversed = value.split("").reverse().join("");

  if (value === reversed) {
    result.textContent = "Yes! This is a palindrome";
    result.className = "text-success";
  } else {
    result.textContent = "No. Try again";
    result.className = "text-danger";
  }
}
