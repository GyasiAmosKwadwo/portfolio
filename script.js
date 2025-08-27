// Typing Animation
const typingText = document.querySelector(".typing-text");
const words = ["Backend Developer", "Cybersecurity Enthusiast", "Problem Solver"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  typingText.textContent = currentWord.substring(0, charIndex) + "|";

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++; setTimeout(type, 150);
  } else if (isDeleting && charIndex > 0) {
    charIndex--; setTimeout(type, 100);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 700);
  }
}
type();

// Fade-in Scroll Animation
const faders = document.querySelectorAll(".fade-in");
window.addEventListener("scroll", () => {
  faders.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) el.classList.add("visible");
  });
});

// Network Nodes Canvas Animation in Navbar
const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");
let nodes = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = 80; // navbar height
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

for (let i = 0; i < 25; i++) {
  nodes.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, dx: (Math.random() - 0.5) * 1.2, dy: (Math.random() - 0.5) * 1.2 });
}

function drawNetwork() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#06b6d4";
  nodes.forEach(n => {
    n.x += n.dx; n.y += n.dy;
    if (n.x < 0 || n.x > canvas.width) n.dx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.dy *= -1;
    ctx.beginPath(); ctx.arc(n.x, n.y, 2, 0, Math.PI * 2); ctx.fill();
  });

  ctx.strokeStyle = "rgba(6,182,212,0.3)";
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawNetwork);
}
drawNetwork();
