document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start");
  const resetButton = document.getElementById("reset");
  const statusText = document.getElementById("status");
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab =tabs[0];
  const url = new URL(tab.url);
  const domain = url.hostname;


  let trackedTime = parseInt(localStorage.getItem(domain)) || 0;
  let intervalId = null;
  
  //const statusText = document.getElementById("status");

  statusText.innerHTML = `$ {domain} : ${trackedTime} seconds`;


  startButton.addEventListener("click", () => {
    if (intervalId) return; // Prevent multiple intervals
    intervalId = setInterval(() => {
      trackedTime++;
      localStorage.setItem(domain, trackedTime);
      statusText.innerHTML = `${domain} : ${trackedTime} seconds`;
    }, 1000);
  });


  resetButton.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
    trackedTime = 0;
    localStorage.setItem(domain, trackedTime);
    statusText.innerHTML = `${domain} : ${trackedTime} seconds`;
  });

  const title = tab.title;
  statusText.innerText = ` You're on:\n${title}\n${url}`;
  
});
  
  
  statusText.style.color = "green";

/*  setTimeout(() => {
    statusText.style.opacity = "0";
  }, 5000);*/
});
