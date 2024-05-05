import flatpickr from "flatpickr";
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const now = new Date();
        if (selectedDate <= now) {
            alert("Please choose a date in the future.");
        } else {
            document.querySelector('[data-start]').disabled = false;
        }
    }
};
flatpickr("#datetime-picker", options);

const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

let countdownInterval = null;

startButton.addEventListener('click', function() {
    const endDate = new Date(document.getElementById('datetime-picker').value);
    function updateTimer() {
        const now = new Date();
        const msLeft = endDate - now;
        if (msLeft >= 0) {
            const time = convertMs(msLeft);
            daysSpan.textContent = addLeadingZero(time.days);
            hoursSpan.textContent = addLeadingZero(time.hours);
            minutesSpan.textContent = addLeadingZero(time.minutes);
            secondsSpan.textContent = addLeadingZero(time.seconds);
        } else {
            clearInterval(countdownInterval);
            startButton.disabled = true;
        }
    }
    countdownInterval = setInterval(updateTimer, 1000);
});