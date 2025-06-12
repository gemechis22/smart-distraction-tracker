const siteList = document.getElementById("siteList");
const today = new Date().toDateString();

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
}

// For chart data
const chartLabels = [];
const chartData = [];

// Build site list and collect chart data
for (let i = 0; i < localStorage.length; i++) {
    const domain = localStorage.key(i);
    try {
        const data = JSON.parse(localStorage.getItem(domain));
        if (data && data.date === today && data.time > 0) {
            // Create list item
            const li = document.createElement("li");
            li.textContent = `${domain} — ${formatTime(data.time)}`;
            siteList.appendChild(li);

            // Add to chart data
            chartLabels.push(domain);
            chartData.push(data.time);
        }
    } catch (e) {
        continue;
    }
}

// Create pie chart
if (chartData.length > 0) {
    const ctx = document.getElementById("timeChart").getContext("2d");
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: chartLabels,
            datasets: [{
                data: chartData,
                backgroundColor: [
                    '#36A2EB',  // Blue
                    '#FF6384',  // Red
                    '#4BC0C0',  // Green
                    '#FFCE56',  // Yellow
                    '#9966FF',  // Purple
                    '#FF9F40'   // Orange
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
