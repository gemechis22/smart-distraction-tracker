document.getElementById("start").addEventListener("click", () => {
  document.getElementById("status").innerText = "Tracking started!";
  const startTime = new Date();
  setInterval(() => {
    const now = new Date();
    const elapsed = new Date(now - startTime);
    const hours = String(elapsed.getUTCHours()).padStart(2, '0');
    const minutes = String(elapsed.getUTCMinutes()).padStart(2, '0');
    const seconds = String(elapsed.getUTCSeconds()).padStart(2, '0');
    document.getElementById("time").innerText = `${hours}:${minutes}:${seconds}`;
  }, 1000);
});
document.getElementById("stop").addEventListener("click", () => { 
  document.getElementById("status").innerText = "Tracking stopped!";
} );

document.getElementById("reset").addEventListener("click", () => {
  document.getElementById("status").innerText = "Tracking reset!";
  document.getElementById("time").innerText = "00:00:00";
} );
document.getElementById("time").innerText = "00:00:00";   