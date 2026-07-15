// Minimal canvas confetti burst. No dependencies.
// Colors default to the app's language palette so the win moment
// feels like it belongs to this app, not a generic library default.
export function fireConfetti(canvas, colors = ["#E8A33D", "#5FB8A0", "#4F8FE8", "#EDEAE0"]) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);

  const pieceCount = 140;
  const pieces = Array.from({ length: pieceCount }, () => ({
    x: Math.random() * width,
    y: -20 - Math.random() * height * 0.5,
    w: 4 + Math.random() * 4,
    h: 8 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    spin: (Math.random() - 0.5) * 12,
    vy: 2 + Math.random() * 3,
    vx: (Math.random() - 0.5) * 2,
    tilt: Math.random() * Math.PI,
  }));

  let frame = 0;
  const maxFrames = 240;
  let rafId;

  function draw() {
    frame++;
    ctx.clearRect(0, 0, width, height);
    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (frame < maxFrames) {
      rafId = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  draw();
  return () => {
    cancelAnimationFrame(rafId);
    ctx.clearRect(0, 0, width, height);
  };
}
