document.addEventListener("DOMContentLoaded", () => {
  const bubbles = document.getElementById("bubbles-container");
  const themeSwitcher = document.getElementById("theme-switcher");
  const body = document.body;
  const safetyBox = document.getElementById("safety-box");

  function createBubble() {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = Math.random() * 100 + "vw";
    bubble.style.animationDuration = 4 + Math.random() * 4 + "s";
    bubble.style.width = bubble.style.height = 8 + Math.random() * 12 + "px";
    bubble.addEventListener("contextmenu", e => {
      e.preventDefault();
      bubble.style.animation = "pop 0.3s ease-out forwards";
      setTimeout(() => bubble.remove(), 300);
    });
    bubbles.appendChild(bubble);
    setTimeout(() => bubble.remove(), 8000);
  }
  setInterval(createBubble, 500);

  // Fix: Theme Switcher (adds/removes correct classes)
  themeSwitcher.addEventListener("change", (e) => {
    body.classList.remove("dark", "neon");
    const theme = e.target.value;
    if (theme === "dark") {
      body.classList.add("dark");
    } else if (theme === "neon") {
      body.classList.add("neon");
    }
  });

  // Fix: Safety Box Simulation
  window.simulateSafety = function(type) {
    safetyBox.classList.remove("yellow", "red");
    if (type === "safe") {
      safetyBox.textContent = "🟢 Safe Site";
    } else if (type === "suspicious") {
      safetyBox.classList.add("yellow");
      safetyBox.textContent = "🟡 Suspicious: Unknown script running";
    } else if (type === "dangerous") {
      safetyBox.classList.add("red");
      safetyBox.textContent = "🔴 Dangerous: Site flagged for phishing";
    }
  };

  // Fix: Test a Website box logic
  window.runFakeScan = function() {
    const input = document.getElementById("site-input");
    const output = document.getElementById("scan-result");
    const url = input.value.toLowerCase().trim();

    if (!url) {
      output.innerHTML = "⚠️ Please enter a website";
      return;
    }

    if (url.includes("bank") || url.includes("phish") || url.includes("verify-login")) {
      output.innerHTML = "🔴 Dangerous site (phishing)";
    } else if (url.includes("ads") || url.includes("tracker") || url.includes("click")) {
      output.innerHTML = "🟡 Suspicious site (tracking detected)";
    } else {
      output.innerHTML = "🟢 Safe site (no known issues)";
    }
  };
});