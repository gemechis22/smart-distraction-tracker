document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start");
  const resetButton = document.getElementById("reset");
  const statusText = document.getElementById("status");
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab =tabs[0];
  const url = tab.url;
  const statusText = document.getElementById("status");

  statusText.innerHTML = `your're currently on:\n${url} `;

  const title = tab.title;
  statusText.innerText = ` You're on:\n${title}\n${url}`;
  
});
  startButton.addEventListener("click", () => {
    statusText.innerText = " Tracking started!";
  });

  resetButton.addEventListener("click", () => {
    statusText.innerHTML = " Tracking reset.";
  });
  statusText.style.color = "green";

  setTimeout(() => {
    statusText.style.opacity = "0";
  }, 5000);
});
