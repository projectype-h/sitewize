const container = document.getElementById('bubbles-container');

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  const size = Math.random() * 20 + 10;
  bubble.style.width = size + 'px';
  bubble.style.height = size + 'px';
  bubble.style.left = Math.random() * window.innerWidth + 'px';
  bubble.style.bottom = '0px';
  bubble.style.background = 'rgba(0,123,255,0.2)';
  container.appendChild(bubble);

  bubble.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    bubble.classList.add('pop');
    setTimeout(() => bubble.remove(), 400);
  });

  setTimeout(() => {
    if (!bubble.classList.contains('pop')) bubble.remove();
  }, 6000);
}

setInterval(createBubble, 500);