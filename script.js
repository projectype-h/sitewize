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

  themeSwitcher.addEventListener("change", (e) => {
    const theme = e.target.value;
    body.classList.remove("dark", "neon");
    if (theme === "dark") body.classList.add("dark");
    else if (theme === "neon") body.classList.add("neon");
  });

  // Safety demo simulation
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

  // Test site box logic
  window.runFakeScan = function() {
    const input = document.getElementById("site-input").value.toLowerCase();
    const output = document.getElementById("scan-result");
    if (input.includes("bank") || input.includes("free-money") || input.includes("login-verify")) {
      output.innerHTML = "🔴 Dangerous site (phishing attempt)";
    } else if (input.includes("ads") || input.includes("track")) {
      output.innerHTML = "🟡 Suspicious: tracking or ads detected";
    } else if (input.trim() === "") {
      output.innerHTML = "⚠️ Please enter a website";
    } else {
      output.innerHTML = "🟢 Safe site";
    }
  };
});