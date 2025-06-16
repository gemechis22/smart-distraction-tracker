// Track active timers
let activeTimers = {};

// Helper function to get storage data
async function getStorageData(domain) {
  const result = await chrome.storage.local.get(domain);
  return result[domain] || { time: 0, date: new Date().toDateString() };
}

// Helper function to save storage data
async function saveStorageData(domain, data) {
  await chrome.storage.local.set({ [domain]: data });
}

// Add notification thresholds (in seconds)
const NOTIFICATION_THRESHOLDS = [
  1800,  // 30 minutes
  3600,  // 1 hour
  7200   // 2 hours
];

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { action, domain } = request;
  
  switch (action) {
    case "startTracking":
      if (!activeTimers[domain]) {
        // Start new tracking interval
        getStorageData(domain).then(data => {
          const today = new Date().toDateString();
          
          // Reset if it's a new day
          if (data.date !== today) {
            data = { time: 0, date: today };
          }

          activeTimers[domain] = setInterval(async () => {
            data.time += 1;
            await saveStorageData(domain, data);

            // Check for notification thresholds
            if (NOTIFICATION_THRESHOLDS.includes(data.time)) {
              const minutes = Math.floor(data.time / 60);
              chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icon48.png',  // Make sure this icon exists
                title: 'Time Alert!',
                message: `You've spent ${minutes} minutes on ${domain}`,
                priority: 2
              });
            }
          }, 1000);
        });
      }
      break;

    case "resetTracking":
      if (activeTimers[domain]) {
        clearInterval(activeTimers[domain]);
        delete activeTimers[domain];
      }
      saveStorageData(domain, {
        time: 0,
        date: new Date().toDateString()
      });
      break;
  }
});

// Cleanup on extension update/reload
chrome.runtime.onSuspend.addListener(() => {
  Object.values(activeTimers).forEach(clearInterval);
});
