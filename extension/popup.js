document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start");
  const resetButton = document.getElementById("reset");
  const statusText = document.getElementById("status");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const url = new URL(tab.url);
    const domain = url.hostname;
    const today = new Date().toDateString();
    const storedData = JSON.parse(localStorage.getItem(domain));

    let trackedTime = 0;
    if (storedData && storedData.date === today) {
      trackedTime = storedData.time;
    } else {
      localStorage.setItem(domain, JSON.stringify({ time: 0, date: today }));
    }

    let intervalId = null;

    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
    }

    statusText.innerText = ` ${domain}: ${formatTime(trackedTime)}`;

    startButton.addEventListener("click", () => {
      if (intervalId) return;

      intervalId = setInterval(() => {
        trackedTime++;
        localStorage.setItem(domain, JSON.stringify({ time: trackedTime, date: today }));
        statusText.innerText = ` ${domain}: ${formatTime(trackedTime)}`;

        const dailyLimit = 7200;
        if (trackedTime === dailyLimit) {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "Daily Limit Reached",
            message: `You've reached your daily 2-hour limit on ${domain}!`,
            priority: 2
          });
        }
      }, 1000);
    });

    resetButton.addEventListener("click", () => {
      clearInterval(intervalId);
      trackedTime = 0;
      localStorage.setItem(domain, JSON.stringify({ time: 0, date: today }));
      statusText.innerText = ` ${domain}: ${formatTime(trackedTime)}`;
      intervalId = null;
    });
  });
});
