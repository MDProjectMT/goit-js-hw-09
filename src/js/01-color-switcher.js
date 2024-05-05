
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let colorInterval = null;

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

startButton.addEventListener('click', function() {
  if (!colorInterval) {
    this.disabled = true;
    stopButton.disabled = false;

    colorInterval = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
});

stopButton.addEventListener('click', function() {
  if (colorInterval) {
    clearInterval(colorInterval);
    colorInterval = null;

    startButton.disabled = false;
    this.disabled = true;
  }
});
stopButton.disabled = true;