// === Custom Cursor ===
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
});

setInterval(() => {
  rx += (mx - rx) * .15;
  ry += (my - ry) * .15;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
}, 16);

document.querySelectorAll('a,button,.btn,.chip,.badge,.sk-card,.pr-card,.stat-box,.c-link').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-big'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-big'));
});

// === Click Particles ===
document.addEventListener('click', e => {
  const cols = ['#6366f1', '#22d3ee', '#f472b6', '#10b981', '#fbbf24'];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const a = Math.random() * Math.PI * 2;
    const d = 50 + Math.random() * 90;
    p.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;background:${cols[Math.floor(Math.random() * cols.length)]};--tx:${Math.cos(a) * d}px;--ty:${Math.sin(a) * d}px`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
});

// === Background Canvas (Particle Network) ===
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const pts = Array.from({ length: 70 }, () => ({
  x: Math.random() * 2000,
  y: Math.random() * 1500,
  vx: (Math.random() - .5) * .25,
  vy: (Math.random() - .5) * .25,
  r: Math.random() * 1.2 + .4
}));

(function draw() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(99,102,241,0.45)';
    ctx.fill();
  });
  pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d < 130) {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(99,102,241,${.07 * (1 - d / 130)})`;
      ctx.lineWidth = .6;
      ctx.stroke();
    }
  }));
  requestAnimationFrame(draw);
})();

// === Marquee ===
const mqItems = ['HTML', 'CSS', 'JavaScript', 'Python'];
const tr = document.getElementById('mqTrack');
const html = [...mqItems, ...mqItems, ...mqItems, ...mqItems]
  .map(i => `<span class="mq-item"><span>✦</span>${i}</span>`)
  .join('');
tr.innerHTML = html;

// === Skills Grid ===
const skills = [
  { icon: '🌐', name: 'HTML',       sub: 'Markup',   pct: 20 },
  { icon: '🎨', name: 'CSS',        sub: 'Styling',  pct: 15 },
  { icon: '⚡', name: 'JavaScript', sub: 'Frontend', pct: 15 },
  { icon: '🐍', name: 'Python',     sub: 'Backend',  pct: 25 },
];

const sg = document.getElementById('skillsGrid');
skills.forEach((s, i) => {
  const d = document.createElement('div');
  d.className = 'sk-card reveal';
  d.style.transitionDelay = `${i * .07}s`;
  d.innerHTML = `<span class="sk-emoji">${s.icon}</span><div class="sk-name">${s.name}</div><div class="sk-sub">${s.sub}</div><div class="bar"><div class="bar-fill" data-p="${s.pct}"></div></div><span class="pct">${s.pct}%</span>`;
  sg.appendChild(d);
});



// === Scroll Reveal ===
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      const b = e.target.querySelector('.bar-fill');
      if (b) setTimeout(() => b.style.width = b.dataset.p + '%', 200);
    }
  });
}, { threshold: .1 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
