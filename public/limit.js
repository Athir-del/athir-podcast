const DAILY_LIMIT = 3;

function checkLimit() {
  const today = new Date().toDateString();
  const data = JSON.parse(localStorage.getItem('athir_usage') || '{}');
  
  if (data.date !== today) {
    localStorage.setItem('athir_usage', JSON.stringify({ date: today, count: 0 }));
    return true;
  }
  
  if (data.count >= DAILY_LIMIT) {
    showUpgrade();
    return false;
  }
  
  return true;
}

function incrementUsage() {
  const today = new Date().toDateString();
  const data = JSON.parse(localStorage.getItem('athir_usage') || '{}');
  const count = (data.date === today ? data.count : 0) + 1;
  localStorage.setItem('athir_usage', JSON.stringify({ date: today, count }));
  updateCounter();
}

function updateCounter() {
  const today = new Date().toDateString();
  const data = JSON.parse(localStorage.getItem('athir_usage') || '{}');
  const count = data.date === today ? data.count : 0;
  const remaining = DAILY_LIMIT - count;
  const el = document.getElementById('usageCounter');
  if (el) el.textContent = `🎯 متبقي: ${remaining}/${DAILY_LIMIT} توليدات اليوم`;
}

function showUpgrade() {
  document.getElementById('upgradeModal').style.display = 'flex';
}

window.checkLimit = checkLimit;
window.incrementUsage = incrementUsage;
window.updateCounter = updateCounter;
