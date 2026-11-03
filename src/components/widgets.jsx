// Interactive lesson widgets and exam diagrams.
import { useState } from 'react';
import { LuChevronRight, LuRotateCcw, LuFilePen, LuGitBranch } from 'react-icons/lu';

const INK = '#30343B';

/* ---------- Request journey (client → server) ---------- */
const JOURNEY = [
  { t: 'You type a URL', d: 'You enter www.college.edu in the address bar and press Enter.' },
  { t: 'DNS lookup', d: 'The browser asks a DNS server: "what is the IP address of college.edu?" — like looking up a phone number in contacts.' },
  { t: 'HTTP request', d: 'The browser sends GET /index.html to that IP address.' },
  { t: 'Server responds', d: 'The server finds the file and replies: 200 OK + the HTML text.' },
  { t: 'More requests', d: 'The HTML mentions style.css, app.js and images, so the browser requests those too.' },
  { t: 'Render', d: 'The browser builds the DOM from HTML, applies CSS, runs JS and paints pixels on your screen.' },
];

export function RequestJourney() {
  const [s, setS] = useState(0);
  const packetX = [70, 150, 250, 380, 250, 70][s];
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 460 150" className="w-full max-w-xl" role="img" aria-label="Diagram of a browser sending a request to a server">
        <rect x="10" y="40" width="110" height="80" rx="10" fill="#DDF1FB" stroke={INK} strokeWidth="2.5" />
        <rect x="18" y="50" width="94" height="52" rx="4" fill="#fff" stroke={INK} strokeWidth="2" />
        <text x="65" y="136" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="Fredoka">Browser (client)</text>
        <rect x="340" y="30" width="90" height="100" rx="10" fill="#FFE3CF" stroke={INK} strokeWidth="2.5" />
        {[50, 72, 94].map((y) => <rect key={y} x="352" y={y} width="66" height="14" rx="3" fill="#fff" stroke={INK} strokeWidth="1.5" />)}
        <text x="385" y="146" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="Fredoka">Server</text>
        <rect x="190" y="6" width="80" height="30" rx="8" fill="#E2F4DE" stroke={INK} strokeWidth="2" />
        <text x="230" y="26" textAnchor="middle" fontSize="12" fontWeight="700">DNS</text>
        <path d="M125 70 H335" stroke={INK} strokeWidth="2" strokeDasharray="6 5" markerEnd="url(#arr)" />
        <path d="M335 95 H125" stroke="#FF8A3D" strokeWidth="2" strokeDasharray="6 5" markerEnd="url(#arr2)" />
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill={INK} /></marker>
          <marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#FF8A3D" /></marker>
        </defs>
        <text x="230" y="64" textAnchor="middle" fontSize="11">request</text>
        <text x="230" y="110" textAnchor="middle" fontSize="11" fill="#B9520F">response</text>
        <g style={{ transition: 'transform .5s' }} transform={`translate(${packetX} ${s === 1 ? -40 : s >= 3 && s !== 4 ? 25 : 0})`}>
          <rect x="-14" y="62" width="28" height="18" rx="4" fill="#FFD45C" stroke={INK} strokeWidth="2" />
        </g>
      </svg>
      <div className="flex flex-wrap gap-1">
        {JOURNEY.map((j, k) => (
          <button key={k} onClick={() => setS(k)} className={`chip ${k === s ? 'bg-ink text-cream' : 'bg-white'}`}>{k + 1}. {j.t}</button>
        ))}
      </div>
      <div className="rounded-lg bg-sun-soft border-2 border-ink/70 px-3 py-2 text-sm"><b>{JOURNEY[s].t}:</b> {JOURNEY[s].d}</div>
      <button className="btn btn-primary" onClick={() => setS((s + 1) % JOURNEY.length)}>Next step <LuChevronRight /></button>
    </div>
  );
}

/* ---------- Git simulator ---------- */
export function GitSim() {
  const [files, setFiles] = useState([{ n: 'index.html', s: 'committed' }, { n: 'style.css', s: 'committed' }, { n: 'app.js', s: 'untracked' }]);
  const [commits, setCommits] = useState([{ id: 'a1f3', msg: 'Initial commit', branch: 'main' }]);
  const [branch, setBranch] = useState('main');
  const [log, setLog] = useState(['$ git init', 'Initialized empty Git repository']);
  const say = (...l) => setLog((x) => [...x.slice(-10), ...l]);
  const edit = (n) => { setFiles((f) => f.map((x) => (x.n === n ? { ...x, s: x.s === 'untracked' ? 'untracked' : 'modified' } : x))); say(`# edited ${n}`); };
  const add = () => {
    const changed = files.filter((f) => f.s === 'modified' || f.s === 'untracked');
    if (!changed.length) return say('$ git add .', 'nothing to add');
    setFiles((f) => f.map((x) => (x.s === 'modified' || x.s === 'untracked' ? { ...x, s: 'staged' } : x)));
    say('$ git add .', `staged: ${changed.map((c) => c.n).join(', ')}`);
  };
  const commit = () => {
    const staged = files.filter((f) => f.s === 'staged');
    if (!staged.length) return say('$ git commit -m "…"', 'nothing to commit (use git add first)');
    const id = Math.random().toString(16).slice(2, 6);
    const msg = `Update ${staged.map((s) => s.n).join(', ')}`;
    setCommits((c) => [...c, { id, msg, branch }]);
    setFiles((f) => f.map((x) => (x.s === 'staged' ? { ...x, s: 'committed' } : x)));
    say(`$ git commit -m "${msg}"`, `[${branch} ${id}] ${staged.length} file(s) changed`);
  };
  const newBranch = () => { const b = branch === 'main' ? 'feature-nav' : 'main'; setBranch(b); say(`$ git switch ${b === 'main' ? 'main' : '-c ' + b}`, `Switched to branch '${b}'`); };
  const col = (title, state, bg) => (
    <div className={`rounded-xl border-2 border-ink ${bg} p-2 min-h-[120px]`}>
      <div className="text-xs font-bold mb-1">{title}</div>
      {files.filter((f) => (state === 'work' ? ['modified', 'untracked'].includes(f.s) : f.s === state)).map((f) => (
        <div key={f.n} className="anim-pop bg-white border-2 border-ink rounded-md px-2 py-1 text-xs font-mono mb-1 flex justify-between">
          {f.n}<span className="text-[10px] opacity-60">{f.s === 'untracked' ? 'U' : f.s === 'modified' ? 'M' : ''}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-3 gap-2">
        {col('1 · Working directory', 'work', 'bg-blush-soft')}
        {col('2 · Staging area', 'staged', 'bg-sun-soft')}
        {col('3 · Repository (committed)', 'committed', 'bg-leaf-soft')}
      </div>
      <div className="flex flex-wrap gap-2">
        {files.map((f) => <button key={f.n} className="btn" onClick={() => edit(f.n)}><LuFilePen /> Edit {f.n}</button>)}
        <button className="btn btn-sun" onClick={add}>git add .</button>
        <button className="btn btn-green" onClick={commit}>git commit</button>
        <button className="btn btn-blue" onClick={newBranch}><LuGitBranch /> switch branch</button>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        <div className="rounded-xl bg-[#22252B] text-[#E9E4D8] font-mono text-xs p-3 min-h-[120px]">{log.map((l, i) => <div key={i} className={l.startsWith('$') ? 'text-sun' : ''}>{l}</div>)}</div>
        <div className="rounded-xl border-2 border-ink bg-white p-3">
          <div className="text-xs font-bold mb-2">History (git log --oneline) · on <span className="chip bg-aqua-soft">{branch}</span></div>
          <div className="flex items-center gap-1 flex-wrap">
            {commits.map((c, i) => (
              <div key={c.id} className="flex items-center gap-1 anim-pop">
                {i > 0 && <span className="w-4 h-0.5 bg-ink" />}
                <span title={c.msg} className={`w-7 h-7 rounded-full border-2 border-ink grid place-items-center text-[9px] font-mono ${c.branch === 'main' ? 'bg-tang' : 'bg-aqua'}`}>{c.id.slice(0, 2)}</span>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-ink-soft mt-2">Orange = main, blue = feature branch. Hover a dot for its message.</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Specificity calculator ---------- */
export function specificity(sel) {
  let s = sel; let a = 0; let b = 0; let c = 0;
  s = s.replace(/:(not|is|has)\(([^)]*)\)/g, (m, fn, inner) => { const r = specificity(inner); a += r[0]; b += r[1]; c += r[2]; return ' '; });
  s = s.replace(/:where\([^)]*\)/g, ' ');
  const take = (re) => { const n = (s.match(re) || []).length; s = s.replace(re, ' '); return n; };
  a += take(/#[\w-]+/g);
  b += take(/\.[\w-]+/g);
  b += take(/\[[^\]]*\]/g);
  c += take(/::[\w-]+(\([^)]*\))?/g);
  b += take(/:[\w-]+(\([^)]*\))?/g);
  c += (s.match(/[a-zA-Z][\w-]*/g) || []).length;
  return [a, b, c];
}

export function SpecificityCalc() {
  const [a, setA] = useState('#nav .link:hover');
  const [b, setB] = useState('nav ul li a');
  const sa = specificity(a); const sb = specificity(b);
  const cmp = sa[0] - sb[0] || sa[1] - sb[1] || sa[2] - sb[2];
  const Box = ({ v, set, s, win }) => (
    <div className={`rounded-xl border-2 border-ink p-3 ${win ? 'bg-leaf-soft' : 'bg-white'}`}>
      <input value={v} onChange={(e) => set(e.target.value)} className="w-full font-mono text-sm border-2 border-ink rounded-md px-2 py-1" aria-label="CSS selector" />
      <div className="flex gap-2 mt-2">
        {['IDs', 'Classes / attrs / pseudo-classes', 'Elements'].map((l, k) => (
          <div key={l} className="flex-1 text-center rounded-lg bg-mist border-2 border-ink py-1">
            <div className="text-xl font-bold font-mono">{s[k]}</div><div className="text-[10px] leading-tight px-1">{l}</div>
          </div>
        ))}
      </div>
      {win && <div className="text-xs font-bold text-leaf-dark mt-1">★ wins</div>}
    </div>
  );
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <Box v={a} set={setA} s={sa} win={cmp > 0} />
      <Box v={b} set={setB} s={sb} win={cmp < 0} />
      {cmp === 0 && <div className="md:col-span-2 text-sm bg-sun-soft rounded-lg px-3 py-2 border-2 border-ink/60">Tie! The rule that appears <b>later</b> in the CSS wins.</div>}
    </div>
  );
}

export const WIDGETS = { 'request-journey': RequestJourney, 'git-sim': GitSim, specificity: SpecificityCalc };

/* ---------- Static exam diagrams ---------- */
const T = (p) => <text fontFamily="Inter, sans-serif" fontSize="12" fill={INK} {...p} />;
const B = ({ x, y, w, h, fill = '#fff', label, sub, r = 8 }) => (
  <g><rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={INK} strokeWidth="2" />{label && <T x={x + w / 2} y={y + h / 2 + (sub ? -2 : 4)} textAnchor="middle" fontWeight="700">{label}</T>}{sub && <T x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" fontSize="10">{sub}</T>}</g>
);
const Arrow = ({ d, color = INK }) => <path d={d} stroke={color} strokeWidth="2" fill="none" markerEnd="url(#dg-arr)" />;
const Defs = () => <defs><marker id="dg-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill={INK} /></marker></defs>;

export const DIAGRAMS = {
  'request-journey': () => (
    <svg viewBox="0 0 440 120" className="w-full max-w-lg"><Defs />
      <B x={10} y={30} w={110} h={60} fill="#DDF1FB" label="Client" sub="browser" />
      <B x={320} y={30} w={110} h={60} fill="#FFE3CF" label="Server" sub="stores files" />
      <Arrow d="M124 48 H316" /><T x={220} y={42} textAnchor="middle">HTTP request (GET /page)</T>
      <Arrow d="M316 76 H124" /><T x={220} y={94} textAnchor="middle">HTTP response (200 OK + HTML)</T>
    </svg>
  ),
  'dom-tree': () => (
    <svg viewBox="0 0 440 200" className="w-full max-w-lg"><Defs />
      <B x={180} y={6} w={80} h={30} fill="#FFD45C" label="document" />
      <B x={185} y={56} w={70} h={30} fill="#FFE3CF" label="html" />
      <B x={80} y={110} w={70} h={30} fill="#DDF1FB" label="head" /><B x={290} y={110} w={70} h={30} fill="#DDF1FB" label="body" />
      <B x={20} y={162} w={60} h={28} label="meta" /><B x={100} y={162} w={60} h={28} label="title" />
      <B x={240} y={162} w={50} h={28} label="h1" /><B x={300} y={162} w={50} h={28} label="p" /><B x={360} y={162} w={60} h={28} label="ul" />
      {['M220 36V56', 'M210 86L120 110', 'M230 86L325 110', 'M110 140L50 162', 'M120 140L130 162', 'M315 140L265 162', 'M325 140L325 162', 'M335 140L390 162'].map((d) => <path key={d} d={d} stroke={INK} strokeWidth="2" />)}
    </svg>
  ),
  'box-model': () => (
    <svg viewBox="0 0 360 220" className="w-full max-w-md">
      <rect x="5" y="5" width="350" height="210" fill="#FFE3CF" stroke={INK} strokeWidth="2" strokeDasharray="6 4" /><T x={14} y={22} fontWeight="700">margin</T>
      <rect x="40" y="35" width="280" height="150" fill={INK} /><T x={48} y={50} fill="#fff" fontWeight="700">border</T>
      <rect x="50" y="55" width="260" height="120" fill="#E2F4DE" /><T x={58} y={70} fontWeight="700">padding</T>
      <rect x="95" y="85" width="170" height="60" fill="#DDF1FB" stroke={INK} strokeWidth="2" /><T x={180} y={119} textAnchor="middle" fontWeight="700">content (width × height)</T>
    </svg>
  ),
  'flex-axes': () => (
    <svg viewBox="0 0 400 170" className="w-full max-w-md"><Defs />
      <rect x="20" y="20" width="360" height="120" rx="10" fill="#F1F6FA" stroke={INK} strokeWidth="2" />
      {[0, 1, 2].map((i) => <B key={i} x={40 + i * 90} y={50} w={70} h={60} fill={['#FF8A3D', '#55B9E8', '#78C86A'][i]} label={`item ${i + 1}`} />)}
      <Arrow d="M30 155 H370" /><T x={200} y={168} textAnchor="middle" fontWeight="700">main axis → justify-content</T>
      <Arrow d="M388 30 V130" /><T x={392} y={20} fontSize="10" fontWeight="700" textAnchor="end">cross axis ↓ align-items</T>
    </svg>
  ),
  'grid-lines': () => (
    <svg viewBox="0 0 330 200" className="w-full max-w-sm">
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={30 + c * 95} y={30 + r * 52} width="85" height="44" rx="6" fill={r === 0 && c < 2 ? '#FFE3CF' : '#DDF1FB'} stroke={INK} strokeWidth="1.5" />))}
      <rect x="30" y="30" width="180" height="44" rx="6" fill="#FFD45C" stroke={INK} strokeWidth="2" /><T x={120} y={56} textAnchor="middle" fontWeight="700">grid-column: 1 / 3</T>
      {[25, 120, 215, 310].map((x, i) => <T key={x} x={x} y={18} fontWeight="700" fill="#B9520F">{i + 1}</T>)}
      <T x={165} y={196} textAnchor="middle" fontSize="11">numbers = column lines (gap between tracks)</T>
    </svg>
  ),
  positions: () => (
    <svg viewBox="0 0 440 150" className="w-full max-w-lg">
      {[['static', 'normal flow', '#F1F6FA'], ['relative', 'nudged, space kept', '#FFF3CC'], ['absolute', 'pinned to parent', '#FFE3CF'], ['fixed', 'pinned to screen', '#DDF1FB'], ['sticky', 'sticks on scroll', '#E2F4DE']].map(([n, d, c], i) => (
        <g key={n}><B x={8 + i * 86} y={20} w={78} h={110} fill={c} /><T x={47 + i * 86} y={40} textAnchor="middle" fontWeight="700">{n}</T><T x={47 + i * 86} y={122} textAnchor="middle" fontSize="9">{d}</T>
          <rect x={22 + i * 86 + (i === 1 ? 10 : 0)} y={i === 2 ? 50 : i === 3 ? 90 : i === 4 ? 50 : 60} width="50" height="26" rx="4" fill={['#30343B', '#FF8A3D', '#F48FB1', '#55B9E8', '#78C86A'][i]} />
          {i === 1 && <rect x={22 + i * 86} y={60} width="50" height="26" rx="4" fill="none" stroke={INK} strokeDasharray="3 3" />}
        </g>
      ))}
    </svg>
  ),
  'semantic-layout': () => (
    <svg viewBox="0 0 360 230" className="w-full max-w-sm">
      <B x={10} y={10} w={340} h={40} fill="#FFE3CF" label="<header> + <nav>" />
      <B x={10} y={60} w={230} h={120} fill="#DDF1FB" />
      <T x={20} y={78} fontWeight="700">&lt;main&gt;</T>
      <B x={22} y={86} w={206} h={40} fill="#fff" label="<article>" /><B x={22} y={132} w={206} h={40} fill="#fff" label="<section>" />
      <B x={250} y={60} w={100} h={120} fill="#FFF3CC" label="<aside>" />
      <B x={10} y={190} w={340} h={30} fill="#E2F4DE" label="<footer>" />
    </svg>
  ),
  'git-areas': () => (
    <svg viewBox="0 0 470 130" className="w-full max-w-xl"><Defs />
      <B x={5} y={30} w={100} h={56} fill="#FDE3EC" label="Working" sub="directory" />
      <B x={125} y={30} w={100} h={56} fill="#FFF3CC" label="Staging" sub="area (index)" />
      <B x={245} y={30} w={100} h={56} fill="#E2F4DE" label="Local repo" sub=".git" />
      <B x={365} y={30} w={100} h={56} fill="#DDF1FB" label="Remote" sub="GitHub" />
      <Arrow d="M105 50H122" /><T x={113} y={22} textAnchor="middle" fontSize="10">add</T>
      <Arrow d="M225 50H242" /><T x={233} y={22} textAnchor="middle" fontSize="10">commit</T>
      <Arrow d="M345 50H362" /><T x={353} y={22} textAnchor="middle" fontSize="10">push</T>
      <Arrow d="M365 76 Q 200 125 60 90" /><T x={210} y={122} textAnchor="middle" fontSize="10">pull / clone</T>
    </svg>
  ),
  'if-flow': () => (
    <svg viewBox="0 0 320 200" className="w-full max-w-xs"><Defs />
      <polygon points="160,10 250,50 160,90 70,50" fill="#FFF3CC" stroke={INK} strokeWidth="2" /><T x={160} y={54} textAnchor="middle" fontWeight="700">condition?</T>
      <Arrow d="M110 72 L70 120" /><T x={70} y={96}>true</T><B x={20} y={122} w={100} h={36} fill="#E2F4DE" label="if block" />
      <Arrow d="M210 72 L250 120" /><T x={230} y={96}>false</T><B x={200} y={122} w={100} h={36} fill="#FDE3EC" label="else block" />
      <Arrow d="M70 158 L150 186" /><Arrow d="M250 158 L170 186" />
    </svg>
  ),
  'loop-flow': () => (
    <svg viewBox="0 0 300 220" className="w-full max-w-xs"><Defs />
      <B x={90} y={6} w={120} h={30} fill="#DDF1FB" label="init: let i = 0" />
      <polygon points="150,50 230,85 150,120 70,85" fill="#FFF3CC" stroke={INK} strokeWidth="2" /><T x={150} y={89} textAnchor="middle" fontWeight="700">i &lt; n ?</T>
      <B x={90} y={140} w={120} h={30} fill="#E2F4DE" label="loop body" />
      <B x={90} y={184} w={120} h={30} fill="#FFE3CF" label="update: i++" />
      <Arrow d="M150 36V50" /><Arrow d="M150 120V140" /><Arrow d="M150 170V184" />
      <Arrow d="M90 199 H30 V85 H68" /><Arrow d="M230 85 H285 V200" /><T x={240} y={78}>false → exit</T>
    </svg>
  ),
  'scope-boxes': () => (
    <svg viewBox="0 0 360 200" className="w-full max-w-sm">
      <rect x="5" y="5" width="350" height="190" rx="12" fill="#FFF3CC" stroke={INK} strokeWidth="2" /><T x={16} y={24} fontWeight="700">Global scope · let app</T>
      <rect x="25" y="38" width="310" height="145" rx="12" fill="#DDF1FB" stroke={INK} strokeWidth="2" /><T x={36} y={58} fontWeight="700">Function scope · let user</T>
      <rect x="45" y="72" width="270" height="95" rx="12" fill="#E2F4DE" stroke={INK} strokeWidth="2" /><T x={56} y={92} fontWeight="700">Block scope {'{ }'} · let temp</T>
      <T x={56} y={116}>can see: temp, user, app ✓</T><T x={56} y={136}>lookup goes outward ↑ (scope chain)</T><T x={56} y={156} fill="#A8325B">outer code cannot see temp ✗</T>
    </svg>
  ),
  bubbling: () => (
    <svg viewBox="0 0 360 200" className="w-full max-w-sm"><Defs />
      <rect x="10" y="10" width="250" height="180" rx="10" fill="#F1F6FA" stroke={INK} strokeWidth="2" /><T x={20} y={28} fontWeight="700">document / body</T>
      <rect x="30" y="40" width="210" height="130" rx="10" fill="#DDF1FB" stroke={INK} strokeWidth="2" /><T x={40} y={58} fontWeight="700">div.card</T>
      <rect x="60" y="80" width="150" height="70" rx="10" fill="#FFE3CF" stroke={INK} strokeWidth="2" /><T x={70} y={98} fontWeight="700">button (target)</T>
      <Arrow d="M300 170 V30" /><T x={284} y={186} fontWeight="700">bubbles up</T>
      <T x={270} y={150}>3. body</T><T x={270} y={110}>2. div</T><T x={270} y={70}>1. button</T>
    </svg>
  ),
  'event-loop': () => (
    <svg viewBox="0 0 460 210" className="w-full max-w-xl"><Defs />
      <B x={10} y={10} w={110} h={150} fill="#FFF3CC" /><T x={65} y={30} textAnchor="middle" fontWeight="700">Call stack</T><B x={20} y={110} w={90} h={22} label="main()" />
      <B x={170} y={10} w={130} h={80} fill="#DDF1FB" /><T x={235} y={30} textAnchor="middle" fontWeight="700">Web APIs</T><T x={235} y={54} textAnchor="middle" fontSize="11">setTimeout, fetch,</T><T x={235} y={70} textAnchor="middle" fontSize="11">DOM events</T>
      <B x={170} y={110} w={280} h={36} fill="#FDE3EC" label="Microtask queue (promises)" />
      <B x={170} y={160} w={280} h={36} fill="#E2F4DE" label="Task queue (timers, events)" />
      <Arrow d="M120 40 H168" /><Arrow d="M300 50 Q 360 60 360 108" />
      <Arrow d="M168 128 H122" /><Arrow d="M168 178 Q 80 190 65 162" />
      <T x={20} y={190} fontWeight="700" fill="#B9520F">Event loop: when the stack is empty,</T><T x={20} y={204} fontWeight="700" fill="#B9520F">run all microtasks, then one task.</T>
    </svg>
  ),
};

export function Diagram({ name }) {
  const D = DIAGRAMS[name];
  return D ? <div className="bg-white rounded-xl border-2 border-ink p-3 my-2 overflow-auto"><D /></div> : null;
}
