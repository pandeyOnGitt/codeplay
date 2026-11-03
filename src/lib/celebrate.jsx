// Lightweight celebration system: confetti on a canvas + toast messages.
// Anything in the app can call celebrate('text') or toast('text').
import { useEffect, useRef, useState } from 'react';

const listeners = new Set();
function emit(evt) { listeners.forEach((l) => l(evt)); }

export function celebrate(message, big = false) { emit({ kind: 'confetti', message, big }); }
export function toast(message, tone = 'info') { emit({ kind: 'toast', message, tone }); }

const COLORS = ['#FF8A3D', '#55B9E8', '#78C86A', '#FFD45C', '#F48FB1'];

export function CelebrationLayer() {
  const canvas = useRef(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    let raf = 0;
    let parts = [];
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    function burst(big) {
      const c = canvas.current;
      if (!c || reduce) return;
      c.width = window.innerWidth; c.height = window.innerHeight;
      const n = big ? 180 : 90;
      for (let i = 0; i < n; i++) {
        parts.push({
          x: c.width / 2 + (Math.random() - 0.5) * 200, y: c.height * 0.35,
          vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 12 - 4,
          r: Math.random() * 6 + 4, c: COLORS[i % COLORS.length], rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
          shape: i % 3, life: 0,
        });
      }
      cancelAnimationFrame(raf);
      const ctx = c.getContext('2d');
      const tick = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        parts.forEach((p) => {
          p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
          if (p.shape === 0) ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
          else if (p.shape === 1) { ctx.beginPath(); ctx.arc(0, 0, p.r / 2.4, 0, 7); ctx.fill(); }
          else { ctx.beginPath(); ctx.moveTo(0, -p.r / 2); ctx.lineTo(p.r / 2, p.r / 2); ctx.lineTo(-p.r / 2, p.r / 2); ctx.fill(); }
          ctx.restore();
        });
        parts = parts.filter((p) => p.y < c.height + 40 && p.life < 240);
        if (parts.length) raf = requestAnimationFrame(tick); else ctx.clearRect(0, 0, c.width, c.height);
      };
      tick();
    }
    const on = (evt) => {
      if (evt.kind === 'confetti') burst(evt.big);
      const id = Math.random();
      setToasts((t) => [...t.slice(-2), { id, message: evt.message, tone: evt.kind === 'confetti' ? 'win' : evt.tone }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
    };
    listeners.add(on);
    return () => { listeners.delete(on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <canvas ref={canvas} className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true" />
      <div className="fixed bottom-4 right-4 z-[101] flex flex-col gap-2" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`sticker anim-pop px-4 py-2.5 text-sm font-semibold ${t.tone === 'win' ? 'bg-sun' : t.tone === 'error' ? 'bg-blush-soft' : 'bg-white'}`}>
            {t.tone === 'win' ? '★ ' : ''}{t.message}
          </div>
        ))}
      </div>
    </>
  );
}
