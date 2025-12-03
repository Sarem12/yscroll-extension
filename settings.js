// Settings page logic
let dailyLimit = 30;
let sessionLimit = 5;

// Load saved settings
async function loadSettings() {
  chrome.storage.local.get(['dailyLimit', 'sessionLimit'], (data) => {
    if (data.dailyLimit) {
      dailyLimit = data.dailyLimit;
      updateDailyDisplay();
    }
    if (data.sessionLimit) {
      sessionLimit = data.sessionLimit;
      updateSessionDisplay();
    }
  });
}

// Update daily limit display
function updateDailyDisplay() {
  document.getElementById('dailyLimitDisplay').textContent = dailyLimit;
  document.getElementById('dailyValue').textContent = dailyLimit;
}

// Update session limit display
function updateSessionDisplay() {
  document.getElementById('sessionLimitDisplay').textContent = sessionLimit;
  document.getElementById('sessionValue').textContent = sessionLimit;
}

// Daily limit controls
document.getElementById('dailyIncrement').addEventListener('click', () => {
  dailyLimit = Math.min(dailyLimit + 5, 180); // Max 3 hours
  updateDailyDisplay();
});

document.getElementById('dailyDecrement').addEventListener('click', () => {
  dailyLimit = Math.max(dailyLimit - 5, 5); // Min 5 minutes
  updateDailyDisplay();
});

// Session limit controls
document.getElementById('sessionIncrement').addEventListener('click', () => {
  sessionLimit = Math.min(sessionLimit + 1, 60); // Max 1 hour
  updateSessionDisplay();
});

document.getElementById('sessionDecrement').addEventListener('click', () => {
  sessionLimit = Math.max(sessionLimit - 1, 1); // Min 1 minute
  updateSessionDisplay();
});

// Save settings and close
document.getElementById('finishBtn').addEventListener('click', async () => {
  await chrome.storage.local.set({
    dailyLimit,
    sessionLimit
  });
  
  // Show confirmation
  const btn = document.getElementById('finishBtn');
  btn.textContent = 'Saved!';
  btn.style.background = '#10b981';
  
  setTimeout(() => {
    window.close();
  }, 500);
});

// Initialize
loadSettings();
