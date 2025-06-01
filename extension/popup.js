document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start");
  const resetButton = document.getElementById("reset");
  const statusText = document.getElementById("status");

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m : ${secs < 10 ? '0' : ''}${secs}s`;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const url = new URL(tab.url);
    const domain = url.hostname;

    let trackedTime = parseInt(localStorage.getItem(domain)) || 0;
    let intervalId = null;

    statusText.innerHTML = `${domain} : ${formatTime(trackedTime)}`;

    startButton.addEventListener("click", () => {
      if (intervalId) return; // Prevent multiple intervals
      intervalId = setInterval(() => {
        trackedTime++;
        localStorage.setItem(domain, trackedTime);
        statusText.innerHTML = `${domain} : ${formatTime(trackedTime)}`;
      }, 1000);
    });

    resetButton.addEventListener("click", () => {
      clearInterval(intervalId);
      intervalId = null;
      trackedTime = 0;
      localStorage.setItem(domain, trackedTime);
      statusText.innerHTML = `${domain} : ${formatTime(trackedTime)}`;
    });

    // Optional: Show current tab info somewhere else if needed
    // statusText.innerText = `You're on:\n${tab.title}\n${url}`;
  });

  statusText.style.color = "green";
});
