document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("bubbles-container");

  function createBubble() {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = Math.random() * 100 + "vw";
    bubble.style.animationDuration = 4 + Math.random() * 4 + "s";
    bubble.style.width = bubble.style.height = 8 + Math.random() * 12 + "px";

    bubble.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      bubble.style.animation = "pop 0.3s ease-out forwards";
      setTimeout(() => bubble.remove(), 300);
    });

    container.appendChild(bubble);
    setTimeout(() => bubble.remove(), 8000);
  }

  setInterval(createBubble, 500);
});