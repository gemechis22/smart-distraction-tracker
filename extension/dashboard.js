document.addEventListener('DOMContentLoaded', async () => {
  const siteList = document.getElementById("siteList");
  const today = new Date().toDateString();

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  }

  // Get all stored data
  const storage = await chrome.storage.local.get(null);
  const chartLabels = [];
  const chartData = [];

  // Process each domain's data
  for (const [domain, data] of Object.entries(storage)) {
    if (data.date === today && data.time > 0) {
      // Add to list
      const li = document.createElement("li");
      li.textContent = `${domain} — ${formatTime(data.time)}`;
      siteList.appendChild(li);

      // Add to chart
      chartLabels.push(domain);
      chartData.push(data.time);
    }
  }

  // Create pie chart if we have data
  if (chartData.length > 0) {
    const ctx = document.getElementById("timeChart").getContext("2d");
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: chartLabels,
        datasets: [{
          data: chartData,
          backgroundColor: [
            '#36A2EB', '#FF6384', '#4BC0C0',
            '#FFCE56', '#9966FF', '#FF9F40'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  // Calculate total time
  const totalSeconds = chartData.reduce((acc, val) => acc + val, 0);
  document.getElementById("totalTime").innerText = `Total Time: ${formatTime(totalSeconds)}`;

  // Calculate progress toward daily limit (let's say 2 hours = 7200 seconds)
  const dailyLimit = 7200;
  const percentage = Math.min((totalSeconds / dailyLimit) * 100, 100).toFixed(1);
  const progressBar = document.getElementById("progressBar");

  progressBar.style.width = `${percentage}%`;
  progressBar.innerText = `${percentage}%`;
});
