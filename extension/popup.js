document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start");
  const resetButton = document.getElementById("reset");
  const statusText = document.getElementById("status");

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
