document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('bubbles-container');
  const header = document.getElementById('main-header');
  const logo = document.getElementById('main-logo');

  function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = Math.random() * 100 + 'vw';
    bubble.style.animationDuration = 3 + Math.random() * 2 + 's';
    container.appendChild(bubble);

    bubble.addEventListener('contextmenu', e => {
      e.preventDefault();
      bubble.style.animation = 'pop 0.3s ease-out forwards';
      setTimeout(() => bubble.remove(), 300);
    });

    setTimeout(() => {
      if (bubble.parentElement) bubble.remove();
    }, 6000);
  }

  setInterval(createBubble, 500);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      logo.style.transform = 'scale(0.85)';
    } else {
      logo.style.transform = 'scale(1)';
    }
  });

  const style = document.createElement('style');
  style.textContent = `
    .bubble {
      position: absolute;
      bottom: 0;
      width: 12px;
      height: 12px;
      background: rgba(0,123,255,0.3);
      border-radius: 50%;
      animation: rise 5s linear infinite;
    }

    @keyframes rise {
      from { transform: translateY(0); opacity: 1; }
      to { transform: translateY(-100vh); opacity: 0; }
    }

    @keyframes pop {
      to {
        transform: scale(1.5);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});