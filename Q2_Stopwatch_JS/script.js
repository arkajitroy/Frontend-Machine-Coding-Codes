let displayTime = document.getElementById("display-time");
let stopwatch;
let startTime;
let isRunning = false;

function formatTime(time) {
  const totalMilliseconds = time;
  const milliseconds = totalMilliseconds % 1000;
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  return `${formatDigit(hours)}:${formatDigit(minutes)}:${formatDigit(
    seconds
  )}:${formatMilliseconds(milliseconds)}`;
}

function formatMilliseconds(milliseconds) {
  return milliseconds < 10
    ? `00${milliseconds}`
    : milliseconds < 100
    ? `0${milliseconds}`
    : milliseconds;
}

function formatDigit(digit) {
  return digit < 10 ? `0${digit}` : digit;
}

function handleStartStopwatch() {
  if (!isRunning) {
    startTime = new Date().getTime();
    isRunning = true;
    stopwatch = setInterval(updateDisplay, 10); // Update every 10 milliseconds for better precision
  }
}

function handlePauseStopwatch() {
  if (isRunning) {
    clearInterval(stopwatch);
    isRunning = false;
  }
}

function handleResetStopwatch() {
  clearInterval(stopwatch);
  isRunning = false;
  displayTime.textContent = "00:00:00:000";
}

function updateDisplay() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  displayTime.textContent = formattedTime;
}
