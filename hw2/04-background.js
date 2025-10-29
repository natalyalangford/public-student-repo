const toggleBtn = document.getElementById("toggleBtn");
const intervalInput = document.getElementById("intervalInput");

let timerId = null;
let interval = 3;

/**
 * generates a random soft color using HSLA
 * - h = hue (0–360)
 * - s = saturation (percentage)
 * - l = lightness (percentage)
 * - a = alpha (transparency) to keep the colors gentle on the eyes
 */
function randomColor() {
  const h = Math.floor(Math.random() * 360);
  const s = 60 + Math.floor(Math.random() * 20);
  const l = 60 + Math.floor(Math.random() * 15);
  const a = 0.35; // soft alpha
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}

// apply the new color to the body
function changeBackground() {
  document.body.style.backgroundColor = randomColor();
}

// start the background changer
function start() {
  changeBackground();
  timerId = setInterval(changeBackground, interval * 1000);
  toggleBtn.textContent = "Stop";
  toggleBtn.classList.remove("btn-success");
  toggleBtn.classList.add("btn-danger");
  intervalInput.disabled = true;
}

// stop the background changer
function stop() {
  clearInterval(timerId);
  timerId = null;
  toggleBtn.textContent = "Start";
  toggleBtn.classList.remove("btn-danger");
  toggleBtn.classList.add("btn-success");
  intervalInput.disabled = false;
}

// toggle between running and stopped
toggleBtn.addEventListener("click", () => {
  if (timerId === null) {
    const val = Number(intervalInput.value);
    if (!val || val < 1) {
      alert("Please enter a valid number (1 or higher)");
      return;
    }
    interval = val;
    start();
  } else {
    stop();
  }
});

// start automatically when the page loads
window.addEventListener("load", start);
