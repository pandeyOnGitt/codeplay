import { useState } from 'react';
import { LuChevronDown, LuInfo, LuTriangleAlert, LuLightbulb, LuSparkles } from 'react-icons/lu';

export function PageHeader({ kicker, title, children, art, color = 'tang' }) {
  return (
    <header className="relative mb-6 flex flex-col md:flex-row md:items-end gap-4 justify-between">
      <div className="max-w-3xl">
        {kicker && <div className={`chip bg-${color}-soft mb-2`}>{kicker}</div>}
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight"><span className="squiggle">{title}</span></h1>
        {children && <div className="mt-3 text-ink-soft text-[15px] leading-relaxed">{children}</div>}
      </div>
      {art && <div className="shrink-0 hidden md:block">{art}</div>}
    </header>
  );
}

export function Section({ num, title, children, tone = 'white', id, icon }) {
  const bg = { white: 'bg-white', cream: 'bg-cream', mist: 'bg-mist', sun: 'bg-sun-soft', leaf: 'bg-leaf-soft', aqua: 'bg-aqua-soft', blush: 'bg-blush-soft', tang: 'bg-tang-soft' }[tone];
  return (
    <section id={id} className={`sticker ${bg} p-5 md:p-6 anim-rise scroll-mt-20`}>
      <h2 className="flex items-center gap-3 text-xl font-semibold mb-3">
        {num != null && <span className="w-8 h-8 grid place-items-center rounded-full bg-ink text-cream text-sm font-bold shrink-0">{num}</span>}
        {icon}{title}
      </h2>
      <div className="lesson-prose text-[15px]">{children}</div>
    </section>
  );
}

export function Callout({ kind = 'info', title, children }) {
  const map = {
    info: ['bg-aqua-soft', <LuInfo key="i" />],
    warn: ['bg-blush-soft', <LuTriangleAlert key="w" />],
    tip: ['bg-sun-soft', <LuLightbulb key="t" />],
    win: ['bg-leaf-soft', <LuSparkles key="s" />],
  };
  const [bg, icon] = map[kind];
  return (
    <div className={`rounded-xl border-2 border-ink/80 ${bg} px-4 py-3 my-3 flex gap-3`}>
      <div className="mt-1 text-lg shrink-0">{icon}</div>
      <div className="text-[14.5px]">{title && <div className="font-bold mb-0.5">{title}</div>}{children}</div>
    </div>
  );
}

export function Reveal({ label = 'Show answer', children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="text-sm font-semibold text-aqua-dark flex items-center gap-1 hover:underline" aria-expanded={open}>
        <LuChevronDown className={`transition ${open ? 'rotate-180' : ''}`} /> {open ? 'Hide' : label}
      </button>
      {open && <div className="mt-2 anim-rise">{children}</div>}
    </div>
  );
}

export function ProgressRing({ pct = 0, size = 64, stroke = 7, color = '#FF8A3D', label }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }} role="img" aria-label={`${pct}% ${label || 'complete'}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#E6E1D6" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (c * Math.min(100, pct)) / 100} style={{ transition: 'stroke-dashoffset .6s' }} />
      </svg>
      <span className="absolute text-xs font-bold">{pct}%</span>
    </div>
  );
}

export function Bar({ pct, color = 'bg-tang', className = '' }) {
  return (
    <div className={`h-3 rounded-full bg-[#ECE6DA] border-[1.5px] border-ink overflow-hidden ${className}`} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${Math.min(100, pct)}%` }} />
    </div>
  );
}

export function Code({ children, lang }) {
  return <pre className="bg-[#2B2F36] text-[#F3EEE3] rounded-xl p-4 overflow-auto text-[13px] font-mono leading-relaxed border-2 border-ink my-2" data-lang={lang}>{children}</pre>;
}

export function Segmented({ options, value, onChange, size = 'sm' }) {
  return (
    <div className="inline-flex flex-wrap gap-1 p-1 rounded-xl bg-mist border-2 border-ink" role="radiogroup">
      {options.map((o) => {
        const v = typeof o === 'string' ? o : o.value; const l = typeof o === 'string' ? o : o.label;
        return (
          <button key={v} role="radio" aria-checked={value === v} onClick={() => onChange(v)}
            className={`${size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'} rounded-lg font-semibold font-mono transition ${value === v ? 'bg-ink text-cream' : 'hover:bg-white'}`}>
            {l}
          </button>
        );
      })}
    </div>
  );
}

export function Slider({ label, value, onChange, min = 0, max = 100, step = 1, unit = 'px', hint }) {
  return (
    <label className="block">
      <div className="flex justify-between text-xs font-semibold mb-1"><span className="font-mono">{label}</span><span className="font-mono bg-mist px-1.5 rounded">{value}{unit}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" aria-label={label} />
      {hint && <div className="text-[11px] text-ink-soft">{hint}</div>}
    </label>
  );
}

export function Empty({ title, children, art }) {
  return (
    <div className="text-center py-10 px-4">
      <div className="mx-auto w-28 mb-3">{art || <SleepyBracket />}</div>
      <div className="font-display text-lg font-semibold">{title}</div>
      <div className="text-sm text-ink-soft mt-1 max-w-sm mx-auto">{children}</div>
    </div>
  );
}

/* ---------- Illustrations (hand-made SVG characters) ---------- */

/** "Pixel" — the CodePlay mascot: a friendly pair of angle brackets with a face. */
export function Mascot({ size = 120, mood = 'happy', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} role="img" aria-label="Pixel, the CodePlay mascot">
      <ellipse cx="60" cy="110" rx="34" ry="5" fill="#30343B" opacity=".12" />
      <rect x="22" y="22" width="76" height="76" rx="22" fill="#FF8A3D" stroke="#30343B" strokeWidth="3" />
      <path d="M40 46 l-10 14 l10 14" fill="none" stroke="#FFF9EF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M80 46 l10 14 l-10 14" fill="none" stroke="#FFF9EF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="51" cy="55" r="4.5" fill="#30343B" /><circle cx="69" cy="55" r="4.5" fill="#30343B" />
      <circle cx="52.5" cy="53.5" r="1.4" fill="#fff" /><circle cx="70.5" cy="53.5" r="1.4" fill="#fff" />
      {mood === 'happy' && <path d="M52 66 q8 8 16 0" fill="none" stroke="#30343B" strokeWidth="3" strokeLinecap="round" />}
      {mood === 'think' && <path d="M53 68 h14" stroke="#30343B" strokeWidth="3" strokeLinecap="round" />}
      {mood === 'wow' && <circle cx="60" cy="68" r="4" fill="#30343B" />}
      <circle cx="44" cy="64" r="4" fill="#F48FB1" opacity=".8" /><circle cx="76" cy="64" r="4" fill="#F48FB1" opacity=".8" />
      <path d="M60 22 v-10" stroke="#30343B" strokeWidth="3" /><circle cx="60" cy="10" r="5" fill="#FFD45C" stroke="#30343B" strokeWidth="2.5" />
    </svg>
  );
}

function SleepyBracket() {
  return (
    <svg viewBox="0 0 120 100" role="img" aria-label="Nothing here yet">
      <rect x="20" y="20" width="80" height="64" rx="18" fill="#F1F6FA" stroke="#30343B" strokeWidth="3" />
      <path d="M45 50 q5 4 10 0 M65 50 q5 4 10 0" fill="none" stroke="#30343B" strokeWidth="3" strokeLinecap="round" />
      <path d="M54 66 h12" stroke="#30343B" strokeWidth="3" strokeLinecap="round" />
      <text x="92" y="22" fontFamily="Fredoka" fontSize="14" fill="#55B9E8" fontWeight="700">z</text>
      <text x="102" y="12" fontFamily="Fredoka" fontSize="10" fill="#55B9E8" fontWeight="700">z</text>
    </svg>
  );
}

/** Track illustrations — each a distinct little scene. */
export function TrackArt({ track, size = 96 }) {
  if (track === 'html') return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <rect x="10" y="62" width="80" height="24" rx="4" fill="#FF8A3D" stroke="#30343B" strokeWidth="2.5" />
      <rect x="22" y="38" width="56" height="24" rx="4" fill="#FFD45C" stroke="#30343B" strokeWidth="2.5" />
      <rect x="34" y="14" width="32" height="24" rx="4" fill="#55B9E8" stroke="#30343B" strokeWidth="2.5" />
      <text x="50" y="80" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" fill="#30343B">&lt;body&gt;</text>
      <text x="50" y="55" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" fill="#30343B">&lt;main&gt;</text>
      <text x="50" y="30" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" fill="#30343B">&lt;h1&gt;</text>
    </svg>
  );
  if (track === 'css') return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M20 80 C 10 60, 30 40, 50 46 S 85 30, 80 15" fill="none" stroke="#F48FB1" strokeWidth="6" strokeLinecap="round" />
      <circle cx="28" cy="28" r="14" fill="#55B9E8" stroke="#30343B" strokeWidth="2.5" />
      <rect x="54" y="52" width="30" height="30" rx="8" fill="#78C86A" stroke="#30343B" strokeWidth="2.5" transform="rotate(12 69 67)" />
      <path d="M70 12 l16 16 l-30 30 l-20 4 l4 -20 z" fill="#FFD45C" stroke="#30343B" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
  if (track === 'js') return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="22" fill="#FFD45C" stroke="#30343B" strokeWidth="2.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <rect key={a} x="46" y="16" width="8" height="12" rx="2" fill="#FFD45C" stroke="#30343B" strokeWidth="2.5" transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="22" fill="#FFD45C" stroke="#30343B" strokeWidth="2.5" />
      <text x="50" y="57" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="18" fontWeight="700" fill="#30343B">JS</text>
      <path d="M84 20 l4 -8 M90 28 l8 -2 M80 14 l-1 -8" stroke="#FF8A3D" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <rect x="18" y="14" width="56" height="72" rx="6" fill="#fff" stroke="#30343B" strokeWidth="2.5" />
      <path d="M28 32 h36 M28 44 h36 M28 56 h24" stroke="#55B9E8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="70" cy="68" r="17" fill="#78C86A" stroke="#30343B" strokeWidth="2.5" />
      <path d="M62 68 l6 6 l10 -12" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
