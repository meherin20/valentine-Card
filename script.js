const bgHearts = document.getElementById("bgHearts"); // background hearts container
const layer = document.getElementById("layer");       // burst hearts container
const actions = document.getElementById("actions");
const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");

const colors = ["#ff2d55", "#ff4d6d", "#ff5fa2", "#ff8fab"];
const rand = (min, max) => Math.random() * (max - min) + min;

/* =========================
   Background floating hearts
   ========================= */
function spawnBgHeart(){
  if (!bgHearts) return;

  const h = document.createElement("div");
  h.className = "bg-heart";
  h.style.color = colors[Math.floor(Math.random() * colors.length)];

  // size using CSS variable so pseudo-elements match
  const size = rand(10, 22);
  h.style.setProperty("--size", `${size}px`);

  // random horizontal position
  h.style.left = `${rand(0, 100)}vw`;

  // animation duration + scale
  const dur = rand(6, 12);
  h.style.animationDuration = `${dur}s`;
  h.style.setProperty("--s", rand(0.7, 1.6).toFixed(2));

  bgHearts.appendChild(h);
  setTimeout(() => h.remove(), (dur + 1) * 1000);
}

// start background hearts
for (let i = 0; i < 14; i++) setTimeout(spawnBgHeart, i * 250);
setInterval(spawnBgHeart, 550);


/* =========================
   YES burst hearts
   ========================= */
function heartBurst(count = 40){
  const r = yesBtn.getBoundingClientRect();
  const ox = r.left + r.width / 2;
  const oy = r.top + r.height / 2;

  for(let i=0;i<count;i++){
    const h = document.createElement("div");
    h.className = "heart";
    h.style.color = colors[Math.floor(Math.random() * colors.length)];

    h.style.left = `${ox}px`;
    h.style.top  = `${oy}px`;

    h.style.setProperty("--x0", `${rand(-10, 10)}px`);
    h.style.setProperty("--y0", `${rand(-6, 8)}px`);
    h.style.setProperty("--x1", `${rand(-220, 220)}px`);
    h.style.setProperty("--y1", `${rand(-240, -520)}px`);
    h.style.setProperty("--s", rand(0.8, 1.8).toFixed(2));
    h.style.setProperty("--dur", `${rand(900, 1600).toFixed(0)}ms`);

    layer.appendChild(h);
    setTimeout(() => h.remove(), 1700);
  }
}

yesBtn.addEventListener("click", () => {
  heartBurst(60);
  yesBtn.textContent = "Yay!! i Love You";
  noBtn.style.display = "none";
});


/* =========================
   NO button runs away
   ========================= */
function moveNo(){
  const area = actions.getBoundingClientRect();
  const btn  = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, area.width - btn.width);
  const maxY = Math.max(0, area.height - btn.height);

  noBtn.style.position = "absolute";

  // keep it fully inside the actions box
  noBtn.style.left = `${rand(0, maxX)}px`;
  noBtn.style.top  = `${rand(0, maxY)}px`;
}

noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("mousemove", moveNo);
noBtn.addEventListener("touchstart", (e)=>{ 
  e.preventDefault(); 
  moveNo(); 
}, {passive:false});
