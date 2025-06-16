document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start");
  const resetButton = document.getElementById("reset");
  const statusText = document.getElementById("status");

  // Get current tab info
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const url = new URL(tab.url);
    const domain = url.hostname;

    // Update status text
    statusText.innerText = `Ready to track: ${domain}`;

    // Send commands to background worker
    startButton.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "startTracking", domain });
      statusText.innerText = "Tracking started in background";
    });

    resetButton.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "resetTracking", domain });
      statusText.innerText = "Timer reset";
    });
  });
});
