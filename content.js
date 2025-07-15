const safeDomains = ["google.com", "youtube.com", "facebook.com", "twitter.com", "instagram.com", "wikipedia.org", "amazon.com", "apple.com", "microsoft.com", "linkedin.com", "netflix.com", "zoom.us", "bbc.com", "nytimes.com", "cnn.com", "github.com", "stackoverflow.com", "paypal.com", "ebay.com", "adobe.com", "mozilla.org", "dropbox.com", "reddit.com", "quora.com", "pinterest.com", "whatsapp.com", "office.com", "oracle.com", "cloudflare.com", "salesforce.com", "intel.com", "nvidia.com", "spotify.com", "slack.com", "ubuntu.com", "medium.com", "coursera.org", "edx.org", "khanacademy.org", "udemy.com", "harvard.edu", "mit.edu", "stanford.edu", "berkeley.edu", "cam.ac.uk", "ox.ac.uk", "aliexpress.com", "bestbuy.com", "homedepot.com", "walmart.com", "target.com", "forbes.com", "bloomberg.com", "economist.com", "washingtonpost.com"];
const currentDomain = window.location.hostname.replace('www.', '').toLowerCase();

if (safeDomains.includes(currentDomain)) {
  const banner = document.createElement('div');
  banner.innerHTML = `
    <div class="banner-inner">
      <strong>✅ Safe</strong>
      <div style="font-size: 12px; margin: 2px 0 6px;">Confidence: <strong>100%</strong></div>
    </div>
  `;
  banner.style.cssText = `
    position:fixed;top:10px;right:10px;z-index:9999999;
    width:260px;padding:12px;border-radius:10px;
    font-size:14px;font-family:Arial,sans-serif;
    color:black;background:#a7f3d0;
    border: 1px solid black;
    box-shadow:0 4px 12px rgba(0,0,0,0.15);
    animation: fadeIn 0.5s ease-out;
  `;
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeOut { to { opacity: 0; transform: translateY(-10px); } }
  `;
  document.head.appendChild(style);
  document.body.appendChild(banner);

let hideTimeout;

const startHideTimer = () => {
  hideTimeout = setTimeout(() => {
    banner.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      if (banner.parentElement) banner.remove();
    }, 500);
  }, 6000);
};

banner.addEventListener('mouseenter', () => {
  clearTimeout(hideTimeout);
  banner.style.opacity = '1';
  banner.style.transform = 'translateY(0)';
});

banner.addEventListener('mouseleave', startHideTimer);

startHideTimer();

} else {
  const suspiciousPatterns = [
  { pattern: /eval\(/, reason: 'Use of eval() - can execute arbitrary code' },
  { pattern: /document\.write\(/, reason: 'Use of document.write() - potential script injection' },
  { pattern: /onerror\s*=\s*"/, reason: 'Inline onerror handler - potential XSS' },
  { pattern: /setTimeout\(.+?,\s*\d+\)/, reason: 'Use of setTimeout() with code string - potential code execution' }
];

let score = 0;
let matchedReasons = [];

suspiciousPatterns.forEach(entry => {
  if (entry.pattern.test(document.documentElement.innerHTML)) {
    score++;
    matchedReasons.push(entry.reason);
  }
});

let level = 'green';
let accuracy = '100%';
if (score > 2) {
  level = 'red';
  accuracy = '95%';
} else if (score > 0) {
  level = 'yellow';
  accuracy = '70%';
}

const banner = document.createElement('div');
banner.innerHTML = `
  <div class="banner-inner">
    <strong>${level === 'green' ? '✅ Safe' : level === 'yellow' ? '⚠️ Suspicious' : '❌ Malicious'}</strong>
    <div style="font-size: 12px; margin: 2px 0 6px;">Confidence: <strong>${accuracy}</strong></div>
    <button id="toggleDetails" style="background: rgba(0,0,0,0.05); color: black; border: none; border-radius: 5px; padding: 3px 7px; cursor: pointer; font-size: 13px;">...</button>
    <div id="detailsList" style="display: none; text-align: left; margin-top: 6px;">
      <ul style="padding-left: 18px; font-size: 11px; margin: 0;">
        ${matchedReasons.map(r => `<li>${r}</li>`).join('')}
      </ul>
    </div>
  </div>
`;

banner.style.cssText = `
  position:fixed;top:10px;right:10px;z-index:9999999;
  width:260px;padding:12px;border-radius:10px;
  font-size:14px;font-family:Arial,sans-serif;
  color:black;background:${level === 'green' ? '#a7f3d0' : level === 'yellow' ? '#fff3cd' : '#f8d7da'};
  border: 1px solid black;
  box-shadow:0 4px 12px rgba(0,0,0,0.15);
  animation: fadeIn 0.5s ease-out;
`;

const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeOut { to { opacity: 0; transform: translateY(-10px); } }
`;
document.head.appendChild(style);
document.body.appendChild(banner);

let hideTimeout;

const startHideTimer = () => {
  hideTimeout = setTimeout(() => {
    banner.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      if (banner.parentElement) banner.remove();
    }, 500);
  }, 6000);
};

banner.addEventListener('mouseenter', () => {
  clearTimeout(hideTimeout);
  banner.style.opacity = '1';
  banner.style.transform = 'translateY(0)';
});

banner.addEventListener('mouseleave', startHideTimer);

startHideTimer();


// Add toggle logic after DOM insert
setTimeout(() => {
  const btn = document.getElementById('toggleDetails');
  const details = document.getElementById('detailsList');
  if (btn && details) {
    btn.onclick = () => {
      details.style.display = details.style.display === 'none' ? 'block' : 'none';
    };
  }
}, 500);
}