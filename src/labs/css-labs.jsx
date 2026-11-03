import { useEffect, useMemo, useRef, useState } from 'react';
import { LuPlus, LuMinus, LuPlay, LuCheck, LuMonitor, LuTablet, LuSmartphone, LuRotateCcw, LuCopy } from 'react-icons/lu';
import { useProgress } from '../lib/progress.jsx';
import { celebrate, toast } from '../lib/celebrate.jsx';
import { Segmented, Slider, Callout } from '../components/ui.jsx';
import { SyntaxBlock } from '../pages/Lesson.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import Preview from '../components/Preview.jsx';
import { copyText } from '../components/CodeLab.jsx';

const camel = (p) => p.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const toStyle = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== '' && v != null).map(([k, v]) => [camel(k), v]));
const cssBlock = (sel, obj) => `${sel} {\n${Object.entries(obj).filter(([, v]) => v !== '' && v != null).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`;

function CodePanel({ code, title = 'Generated CSS' }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1"><div className="text-xs font-bold uppercase">{title}</div><button className="btn text-xs py-1" onClick={() => copyText(code)}><LuCopy /> Copy</button></div>
      <SyntaxBlock code={code} lang="css" />
    </div>
  );
}

/* ======================= CSS Visual Playground ======================= */
const ELEMENTS = {
  card: { label: '.card', defaults: { width: '300px', padding: '20px', margin: '0px', background: '#ffffff', color: '#30343B', 'border-width': '2px', 'border-style': 'solid', 'border-color': '#30343B', 'border-radius': '16px', 'box-shadow': '4px 4px 0 #30343B', 'text-align': 'left' } },
  title: { label: '.title', defaults: { 'font-size': '24px', 'font-weight': '700', color: '#B9520F', margin: '0px', 'letter-spacing': '0px', 'text-align': 'left' } },
  text: { label: '.text', defaults: { 'font-size': '15px', 'line-height': '1.6', color: '#5B616B', margin: '8px 0px' } },
  button: { label: '.button', defaults: { padding: '10px 16px', background: '#FFD45C', color: '#30343B', 'border-width': '2px', 'border-style': 'solid', 'border-color': '#30343B', 'border-radius': '10px', 'font-weight': '700', 'font-size': '15px' } },
};
const num = (v, d = 0) => { const n = parseFloat(v); return Number.isFinite(n) ? n : d; };

function genCss(styles) { return Object.entries(styles).map(([k, v]) => cssBlock(ELEMENTS[k].label, v)).join('\n\n'); }
function parseCss(text) {
  const out = {};
  const re = /\.(card|title|text|button)\s*\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(text))) {
    const decls = {};
    m[2].split(';').forEach((d) => { const i = d.indexOf(':'); if (i > 0) { const k = d.slice(0, i).trim().toLowerCase(); const v = d.slice(i + 1).trim(); if (k && v) decls[k] = v; } });
    out[m[1]] = decls;
  }
  return out;
}

export function CssLab() {
  const { experimentData } = useProgress();
  const init = useMemo(() => Object.fromEntries(Object.entries(ELEMENTS).map(([k, v]) => [k, { ...v.defaults }])), []);
  const [styles, setStyles] = useState(init);
  const [sel, setSel] = useState('card');
  const [code, setCode] = useState(() => genCss(init));
  const [codeFocus, setCodeFocus] = useState(false);
  const s = styles[sel];

  function set(prop, value) {
    const next = { ...styles, [sel]: { ...styles[sel], [prop]: value } };
    setStyles(next); setCode(genCss(next)); experimentData('css-lab', { touched: true });
  }
  function onCode(v) {
    setCode(v);
    const parsed = parseCss(v);
    setStyles((old) => { const n = { ...old }; for (const k of Object.keys(ELEMENTS)) n[k] = parsed[k] || {}; return n; });
  }
  const color = (prop, label) => (
    <label className="flex items-center justify-between text-xs font-semibold gap-2"><span className="font-mono">{label || prop}</span>
      <span className="flex items-center gap-1"><input type="color" value={/^#[0-9a-f]{6}$/i.test(s[prop] || '') ? s[prop] : '#000000'} onChange={(e) => set(prop, e.target.value)} className="w-8 h-7 border-2 border-ink rounded" aria-label={prop} /><code className="text-[10px]">{s[prop] || '—'}</code></span></label>
  );
  const px = (prop, max = 60, min = 0) => <Slider label={prop} value={num(s[prop])} min={min} max={max} onChange={(v) => set(prop, v + 'px')} />;
  const has = (p) => p in ELEMENTS[sel].defaults || p in s;

  return (
    <div className="grid xl:grid-cols-[260px_1fr_340px] gap-4">
      <div className="sticker p-4 space-y-3 h-fit">
        <div className="text-xs font-bold uppercase">1 · Pick an element</div>
        <Segmented value={sel} onChange={setSel} options={Object.entries(ELEMENTS).map(([k, v]) => ({ value: k, label: v.label }))} />
        <div className="text-xs font-bold uppercase pt-2">2 · Change its CSS</div>
        {has('width') && <Slider label="width" value={num(s.width, 300)} min={160} max={480} onChange={(v) => set('width', v + 'px')} />}
        {has('padding') && px('padding', 48)}
        {has('font-size') && <Slider label="font-size" value={num(s['font-size'], 16)} min={10} max={48} onChange={(v) => set('font-size', v + 'px')} />}
        {has('font-weight') && <label className="block text-xs font-semibold"><span className="font-mono">font-weight</span><select value={s['font-weight'] || '400'} onChange={(e) => set('font-weight', e.target.value)} className="w-full border-2 border-ink rounded-md px-1 py-0.5 mt-1">{['300', '400', '500', '600', '700', '800'].map((w) => <option key={w}>{w}</option>)}</select></label>}
        {has('letter-spacing') && <Slider label="letter-spacing" value={num(s['letter-spacing'])} min={-2} max={10} onChange={(v) => set('letter-spacing', v + 'px')} />}
        {has('line-height') && <Slider label="line-height" value={num(s['line-height'], 1.5)} min={1} max={2.5} step={0.1} unit="" onChange={(v) => set('line-height', String(v))} />}
        {has('text-align') && <div><div className="text-xs font-semibold font-mono mb-1">text-align</div><Segmented value={s['text-align'] || 'left'} onChange={(v) => set('text-align', v)} options={['left', 'center', 'right']} /></div>}
        {has('background') && color('background')}
        {color('color')}
        {has('border-width') && <>{px('border-width', 10)}{color('border-color')}
          <div><div className="text-xs font-semibold font-mono mb-1">border-style</div><Segmented value={s['border-style'] || 'solid'} onChange={(v) => set('border-style', v)} options={['solid', 'dashed', 'dotted', 'double']} /></div></>}
        {has('border-radius') && px('border-radius', 40)}
        {has('box-shadow') && <div><div className="text-xs font-semibold font-mono mb-1">box-shadow</div><Segmented value={s['box-shadow'] || 'none'} onChange={(v) => set('box-shadow', v)} options={[{ value: 'none', label: 'none' }, { value: '4px 4px 0 #30343B', label: 'hard' }, { value: '0 10px 25px rgba(0,0,0,.18)', label: 'soft' }]} /></div>}
      </div>
      <div>
        <div className="text-xs font-bold uppercase mb-1">3 · Live canvas — click any element to select it</div>
        <div className="sticker dotgrid bg-mist min-h-[420px] grid place-items-center p-6">
          <div style={toStyle(styles.card)} onClick={() => setSel('card')} className={`cursor-pointer transition-all outline-offset-4 ${sel === 'card' ? 'outline-dashed outline-2 outline-aqua' : ''}`}>
            <h3 style={toStyle(styles.title)} onClick={(e) => { e.stopPropagation(); setSel('title'); }} className={`cursor-pointer ${sel === 'title' ? 'outline-dashed outline-2 outline-aqua' : ''}`}>Tech Fest 2026</h3>
            <p style={toStyle(styles.text)} onClick={(e) => { e.stopPropagation(); setSel('text'); }} className={`cursor-pointer ${sel === 'text' ? 'outline-dashed outline-2 outline-aqua' : ''}`}>Three days of coding contests, robotics and design workshops. Teams of up to four.</p>
            <button style={toStyle(styles.button)} onClick={(e) => { e.stopPropagation(); setSel('button'); }} className={`cursor-pointer ${sel === 'button' ? 'outline-dashed outline-2 outline-aqua' : ''}`}>Register now</button>
          </div>
        </div>
        <button className="btn mt-3" onClick={() => { setStyles(init); setCode(genCss(init)); }}><LuRotateCcw /> Reset design</button>
      </div>
      <div>
        <div className="text-xs font-bold uppercase mb-1">4 · Generated CSS — edit it too!</div>
        <div className={`sticker-sm overflow-hidden h-[460px] ${codeFocus ? 'ring-4 ring-aqua/40' : ''}`} onFocus={() => setCodeFocus(true)} onBlur={() => setCodeFocus(false)}>
          <CodeEditor value={code} lang="css" onChange={onCode} minHeight={0} label="Generated CSS (editable)" />
        </div>
        <p className="text-[11px] text-ink-soft mt-1">Type any property inside a rule (try <code className="inline-code">transform: rotate(-3deg);</code>) and the canvas and controls update.</p>
      </div>
    </div>
  );
}

/* ======================= Box Model Explorer ======================= */
export function BoxModelLab() {
  const { experimentData } = useProgress();
  const [m, setM] = useState(24); const [b, setB] = useState(6); const [p, setP] = useState(20); const [w, setW] = useState(180);
  const [sizing, setSizing] = useState('content-box');
  useEffect(() => { if (m !== 24 || p !== 20) experimentData('box-model', { touched: true }); }, [m, p]); // eslint-disable-line
  const total = sizing === 'content-box' ? w + 2 * p + 2 * b : w;
  const content = sizing === 'content-box' ? w : Math.max(0, w - 2 * p - 2 * b);
  const css = cssBlock('.box', { width: `${w}px`, padding: `${p}px`, border: `${b}px solid #30343B`, margin: `${m}px`, 'box-sizing': sizing });
  return (
    <div className="grid xl:grid-cols-[280px_1fr] gap-4">
      <div className="sticker p-4 space-y-3 h-fit">
        <Slider label="margin" value={m} max={60} onChange={setM} hint="Space OUTSIDE the border" />
        <Slider label="border-width" value={b} max={24} onChange={setB} />
        <Slider label="padding" value={p} max={60} onChange={setP} hint="Space INSIDE the border" />
        <Slider label="width" value={w} min={60} max={300} onChange={setW} />
        <div><div className="text-xs font-semibold font-mono mb-1">box-sizing</div><Segmented value={sizing} onChange={setSizing} options={['content-box', 'border-box']} /></div>
        <div className="rounded-lg bg-sun-soft border-2 border-ink p-3 text-sm">
          <div className="font-bold">Total visible width = {total}px</div>
          <div className="text-xs font-mono mt-1">{sizing === 'content-box' ? `${w} + 2×${p} + 2×${b}` : `width already includes padding + border → content is ${content}px`}</div>
          <div className="text-xs mt-1">Space taken incl. margin: {total + 2 * m}px</div>
        </div>
        <CodePanel code={css} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-bold uppercase mb-1">Diagram (like DevTools)</div>
          <div className="sticker p-4 bg-white font-mono text-[11px] select-none">
            <div className="relative border-2 border-dashed border-ink/50 bg-tang-soft p-3 text-center" style={{ paddingTop: 24 }}>
              <span className="absolute left-2 top-1 font-bold">margin</span><span className="absolute top-1 left-1/2 -translate-x-1/2">{m}</span>
              <span className="absolute left-1 top-1/2 -translate-y-1/2">{m}</span><span className="absolute right-1 top-1/2 -translate-y-1/2">{m}</span><span className="absolute bottom-1 left-1/2 -translate-x-1/2">{m}</span>
              <div className="relative bg-ink text-cream p-3 mx-4 my-2" style={{ paddingTop: 22 }}>
                <span className="absolute left-2 top-1 font-bold">border</span><span className="absolute top-1 left-1/2 -translate-x-1/2">{b}</span>
                <div className="relative bg-leaf-soft text-ink p-3" style={{ paddingTop: 22 }}>
                  <span className="absolute left-2 top-1 font-bold">padding</span><span className="absolute top-1 left-1/2 -translate-x-1/2">{p}</span>
                  <span className="absolute left-1 top-1/2 -translate-y-1/2">{p}</span><span className="absolute right-1 top-1/2 -translate-y-1/2">{p}</span>
                  <div className="bg-aqua-soft border-2 border-ink py-4 mx-5 font-bold">{content} × auto</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase mb-1">Real rendered element</div>
          <div className="sticker bg-white p-3 overflow-auto">
            <div className="bg-[repeating-linear-gradient(45deg,#FFE3CF_0_6px,#FFF3E6_6px_12px)] inline-block">
              <div style={{ width: w, padding: p, border: `${b}px solid #30343B`, margin: m, boxSizing: sizing, background: '#DDF1FB' }} className="transition-all">
                <div className="bg-white/70 border border-dashed border-aqua-dark text-xs p-1">Content area. Padding shows the blue background; the striped area is margin.</div>
              </div>
            </div>
            <div className="mt-2 text-sm">Neighbour element below ↓ (pushed away by margin)</div>
          </div>
          <Callout kind="tip">Switch to <b>border-box</b>: the total width stops growing when you add padding. That is why most developers start every stylesheet with <code>* {'{ box-sizing: border-box; }'}</code>.</Callout>
        </div>
      </div>
    </div>
  );
}

/* ======================= Positioning Playground ======================= */
const POS_INFO = {
  static: ['Default. The element sits in normal document flow.', 'Like furniture exactly where the movers left it. top/left do nothing.'],
  relative: ['Moves from its normal spot; its original space stays reserved (see the dashed ghost).', 'Moving a chair slightly from its original place — the gap where it stood is still there.'],
  absolute: ['Removed from flow and placed relative to the nearest positioned ancestor (the "parent" box, which has position: relative).', 'Placing a "SALE" badge inside a product card, measured from the card\'s corner.'],
  fixed: ['Placed relative to the screen (here, the canvas acts as the screen). Scroll the canvas — it does not move.', 'A WhatsApp chat button that stays at the bottom of the website.'],
  sticky: ['Scrolls normally until it reaches top: Npx, then sticks while its parent is visible.', 'A navigation bar that sticks to the top when you scroll down.'],
};

export function PositioningLab() {
  const { state, experimentData } = useProgress();
  const [mode, setMode] = useState('relative');
  const [off, setOff] = useState({ top: 20, left: 40, right: 0, bottom: 0 });
  const [use, setUse] = useState({ top: true, left: true, right: false, bottom: false });
  const [ghost, setGhost] = useState(true);
  const drag = useRef(null);
  const tried = state.experiments.positioning?.data?.modes || [];
  useEffect(() => { if (!tried.includes(mode)) experimentData('positioning', { modes: [...tried, mode] }); }, [mode]); // eslint-disable-line

  const style = { position: mode };
  for (const k of ['top', 'left', 'right', 'bottom']) if (use[k]) style[k] = off[k];
  if (mode === 'sticky' && !use.top) style.top = 0;
  const cssObj = { position: mode }; for (const k of ['top', 'right', 'bottom', 'left']) if (use[k] && mode !== 'static') cssObj[k] = off[k] + 'px';

  function down(e) {
    if (mode === 'static' || mode === 'sticky') { toast(mode === 'static' ? 'static ignores top/left — pick another mode to drag' : 'sticky depends on scrolling — scroll the canvas instead'); return; }
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, top: off.top, left: off.left };
    setUse((u) => ({ ...u, top: true, left: true, right: false, bottom: false }));
  }
  function moveP(e) { if (!drag.current) return; const d = drag.current; setOff((o) => ({ ...o, top: Math.round(d.top + e.clientY - d.y), left: Math.round(d.left + e.clientX - d.x) })); }
  function up() { drag.current = null; }

  return (
    <div className="grid xl:grid-cols-[280px_1fr] gap-4">
      <div className="space-y-3">
        <div className="sticker p-4 space-y-3">
          <div className="text-xs font-bold uppercase">position</div>
          <Segmented value={mode} onChange={setMode} options={['static', 'relative', 'absolute', 'fixed', 'sticky']} />
          {['top', 'left', 'right', 'bottom'].map((k) => (
            <div key={k} className={`flex items-center gap-2 ${mode === 'static' ? 'opacity-40' : ''}`}>
              <input type="checkbox" checked={use[k]} onChange={(e) => setUse({ ...use, [k]: e.target.checked })} aria-label={`use ${k}`} />
              <div className="flex-1"><Slider label={k} value={off[k]} min={-60} max={260} onChange={(v) => setOff({ ...off, [k]: v })} /></div>
            </div>
          ))}
          <label className="text-xs flex items-center gap-2"><input type="checkbox" checked={ghost} onChange={(e) => setGhost(e.target.checked)} /> Show original (static) position</label>
          <div className="text-xs">Modes tried: {['static', 'relative', 'absolute', 'fixed', 'sticky'].map((m) => <span key={m} className={`chip mr-1 mb-1 ${tried.includes(m) ? 'bg-leaf-soft' : 'bg-white opacity-60'}`}>{m}</span>)}</div>
        </div>
        <CodePanel code={cssBlock('.target', cssObj)} />
      </div>
      <div className="space-y-3">
        <div className="sticker bg-sun-soft p-4">
          <div className="font-semibold">position: {mode}</div>
          <p className="text-sm">{POS_INFO[mode][0]}</p>
          <p className="text-sm mt-1"><b>Real world:</b> {POS_INFO[mode][1]}</p>
        </div>
        <div className="relative sticker overflow-hidden h-[440px] bg-white" style={{ transform: 'translateZ(0)' }}>
          <div className="absolute top-2 right-3 z-20 chip bg-white text-[10px]">canvas = screen · scroll me</div>
          <div className="h-full overflow-y-auto scroll-thin p-4">
            <div className="relative border-2 border-dashed border-aqua-dark rounded-xl p-4 pt-7 bg-aqua-soft/40 min-h-[900px]">
              <span className="absolute top-1 left-2 text-[11px] font-mono font-bold text-aqua-dark">.parent {'{ position: relative }'}</span>
              {[1, 2].map((i) => <p key={i} className="text-sm text-ink-soft mb-2 bg-white/70 rounded p-2">Normal content block {i}. Elements in normal flow stack one after another like paragraphs in a document.</p>)}
              <div className="relative">
                {ghost && mode !== 'static' && <div className="absolute inset-0 border-2 border-dashed border-ink/50 rounded-lg bg-ink/5 grid place-items-center text-[11px] text-ink-soft" style={{ width: 150, height: 56 }}>original spot</div>}
                <div onPointerDown={down} onPointerMove={moveP} onPointerUp={up} style={{ ...style, width: 150, height: 56, zIndex: 10, touchAction: 'none' }}
                  className={`rounded-lg border-2 border-ink bg-tang shadow-[3px_3px_0_#30343B] grid place-items-center font-bold text-sm select-none ${mode === 'static' || mode === 'sticky' ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}`}
                  role="img" aria-label={`Target element with position ${mode}`}>.target ({mode})</div>
              </div>
              {[3, 4, 5, 6, 7, 8].map((i) => <p key={i} className="text-sm text-ink-soft my-2 bg-white/70 rounded p-2">Normal content block {i}. Keep scrolling to see how fixed and sticky behave differently from the others.</p>)}
            </div>
          </div>
        </div>
        <p className="text-xs text-ink-soft">Drag the orange box in relative, absolute or fixed mode. In this demo the canvas has a transform, which makes it the "screen" for fixed elements.</p>
      </div>
    </div>
  );
}

/* ======================= z-index Laboratory ======================= */
export function ZIndexLab() {
  const [z, setZ] = useState({ a: 1, b: 2, c: 3 });
  const [positioned, setPositioned] = useState(true);
  const [trap, setTrap] = useState(false);
  const [childZ, setChildZ] = useState(99);
  const boxes = [['a', '#FF8A3D', 20, 20], ['b', '#55B9E8', 90, 60], ['c', '#78C86A', 160, 100]];
  const order = [...boxes].sort((x, y) => (positioned ? z[x[0]] - z[y[0]] : 0)).map((x) => x[0].toUpperCase());
  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-[280px_1fr] gap-4">
        <div className="sticker p-4 space-y-3 h-fit">
          {boxes.map(([k]) => <Slider key={k} label={`box ${k.toUpperCase()} z-index`} value={z[k]} min={-1} max={10} unit="" onChange={(v) => setZ({ ...z, [k]: v })} />)}
          <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={positioned} onChange={(e) => setPositioned(e.target.checked)} /> Boxes are positioned (relative/absolute)</label>
          <div className="rounded-lg bg-mist border-2 border-ink p-2 text-sm">Paint order (back → front): <b className="font-mono">{positioned ? order.join(' → ') : 'A → B → C (source order)'}</b></div>
          {!positioned && <Callout kind="warn">With <code>position: static</code>, z-index is ignored. Boxes stack in HTML order.</Callout>}
        </div>
        <div className="sticker bg-white h-[300px] relative dotgrid">
          {boxes.map(([k, c, x, y]) => (
            <div key={k} style={positioned ? { position: 'absolute', left: x, top: y, zIndex: z[k], background: c } : { position: 'relative', left: x, top: y - (k === 'a' ? 0 : k === 'b' ? 60 : 120), background: c }}
              className="w-40 h-28 border-2 border-ink rounded-xl p-2 font-bold shadow-[3px_3px_0_#30343B] transition-all">
              {k.toUpperCase()} <span className="font-mono text-xs">z:{positioned ? z[k] : 'n/a'}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="sticker p-5 bg-sun-soft">
        <h3 className="font-semibold text-lg">Stacking contexts: the folder rule</h3>
        <p className="text-sm">The green child has a huge z-index, but if its <b>parent</b> creates a stacking context with z-index 1, the child is trapped inside that layer — it can never go above the blue box (z-index 2) that is outside.</p>
        <div className="grid md:grid-cols-[260px_1fr] gap-4 mt-3">
          <div className="space-y-2">
            <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={trap} onChange={(e) => setTrap(e.target.checked)} /> Give the parent <code className="inline-code">z-index: 1</code></label>
            <Slider label="child z-index" value={childZ} min={0} max={999} unit="" onChange={setChildZ} />
            <div className="text-sm font-semibold">{trap ? 'Child is trapped → stays below blue.' : 'No context on parent → child competes globally and goes on top.'}</div>
          </div>
          <div className="relative h-48 bg-white rounded-xl border-2 border-ink">
            <div className="absolute left-6 top-6 w-56 h-32 rounded-xl border-2 border-dashed border-ink bg-tang-soft p-1 text-xs font-mono" style={{ position: 'absolute', zIndex: trap ? 1 : 'auto' }}>
              parent {trap ? '(z-index: 1)' : '(z-index: auto)'}
              <div className="absolute left-16 top-10 w-40 h-24 rounded-lg border-2 border-ink bg-leaf p-1 font-bold" style={{ zIndex: childZ }}>child z:{childZ}</div>
            </div>
            <div className="absolute left-44 top-14 w-40 h-24 rounded-lg border-2 border-ink bg-aqua p-1 font-bold text-xs" style={{ zIndex: 2 }}>blue z:2</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================= Flexbox Playground ======================= */
const FLEX_COLORS = ['#FF8A3D', '#55B9E8', '#78C86A', '#FFD45C', '#F48FB1', '#9BD5F0', '#FFB27D', '#B6E3A8'];
const TARGETS = [
  { id: 'hero', title: 'Flexbox Hero', desc: '5 boxes in a row, spread with equal space BETWEEN them, all aligned to the BOTTOM.', want: { n: 5, direction: 'row', justify: 'space-between', align: 'flex-end' } },
  { id: 'center', title: 'Dead centre', desc: '3 boxes in a row, grouped in the exact centre (both axes).', want: { n: 3, direction: 'row', justify: 'center', align: 'center' } },
  { id: 'column', title: 'Mobile stack', desc: '4 boxes in a column, centred horizontally, evenly spaced vertically.', want: { n: 4, direction: 'column', justify: 'space-evenly', align: 'center' } },
];

export function FlexboxLab() {
  const { state, experimentData } = useProgress();
  const [c, setC] = useState({ direction: 'row', justify: 'flex-start', align: 'stretch', wrap: 'nowrap', alignContent: 'normal', gap: 10, width: 100 });
  const [items, setItems] = useState([1, 2, 3, 4].map((id) => ({ id, grow: 0, shrink: 1, basis: 'auto', alignSelf: 'auto' })));
  const [sel, setSel] = useState(null);
  const [drag, setDrag] = useState(null);
  const [target, setTarget] = useState(0);
  const set = (k, v) => setC({ ...c, [k]: v });
  const item = items.find((i) => i.id === sel);
  const setItem = (k, v) => setItems(items.map((i) => (i.id === sel ? { ...i, [k]: v } : i)));
  const add = () => setItems([...items, { id: Math.max(0, ...items.map((i) => i.id)) + 1, grow: 0, shrink: 1, basis: 'auto', alignSelf: 'auto' }]);
  const containerCss = { display: 'flex', 'flex-direction': c.direction, 'justify-content': c.justify, 'align-items': c.align, 'flex-wrap': c.wrap, gap: c.gap + 'px', ...(c.wrap !== 'nowrap' && c.alignContent !== 'normal' ? { 'align-content': c.alignContent } : {}) };
  const itemCss = items.filter((i) => i.grow || i.shrink !== 1 || i.basis !== 'auto' || i.alignSelf !== 'auto').map((i) => cssBlock(`.item-${i.id}`, { ...(i.grow ? { 'flex-grow': i.grow } : {}), ...(i.shrink !== 1 ? { 'flex-shrink': i.shrink } : {}), ...(i.basis !== 'auto' ? { 'flex-basis': i.basis } : {}), ...(i.alignSelf !== 'auto' ? { 'align-self': i.alignSelf } : {}) })).join('\n\n');
  const T = TARGETS[target];
  function checkTarget() {
    const w = T.want;
    const ok = items.length === w.n && c.direction === w.direction && c.justify === w.justify && c.align === w.align && items.every((i) => !i.grow);
    if (ok) {
      celebrate(`${T.title} solved!`);
      if (T.id === 'hero') experimentData('flexbox', { hero: true });
      experimentData('flexbox', { [`t-${T.id}`]: true });
    } else {
      const tips = [];
      if (items.length !== w.n) tips.push(`you need exactly ${w.n} boxes (you have ${items.length})`);
      if (c.direction !== w.direction) tips.push('check flex-direction');
      if (c.justify !== w.justify) tips.push('check justify-content (main axis)');
      if (c.align !== w.align) tips.push('check align-items (cross axis)');
      if (items.some((i) => i.grow)) tips.push('reset flex-grow to 0');
      toast('Not yet: ' + tips.join(', '), 'error');
    }
  }
  const isCol = c.direction.startsWith('column');
  return (
    <div className="grid xl:grid-cols-[290px_1fr] gap-4">
      <div className="space-y-3">
        <div className="sticker p-4 space-y-2.5">
          <div className="text-xs font-bold uppercase">Container</div>
          {[['flex-direction', 'direction', ['row', 'row-reverse', 'column', 'column-reverse']], ['justify-content', 'justify', ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']], ['align-items', 'align', ['stretch', 'flex-start', 'center', 'flex-end', 'baseline']], ['flex-wrap', 'wrap', ['nowrap', 'wrap', 'wrap-reverse']], ['align-content', 'alignContent', ['normal', 'flex-start', 'center', 'space-between', 'stretch']]].map(([label, key, opts]) => (
            <div key={key}><div className="text-[11px] font-semibold font-mono mb-1">{label}</div><Segmented value={c[key]} onChange={(v) => set(key, v)} options={opts} /></div>
          ))}
          <Slider label="gap" value={c.gap} max={40} onChange={(v) => set('gap', v)} />
          <Slider label="container width" value={c.width} min={30} max={100} unit="%" onChange={(v) => set('width', v)} hint="Shrink it to see wrap & shrink" />
          <div className="flex gap-2"><button className="btn" onClick={add} disabled={items.length >= 8}><LuPlus /> Item</button><button className="btn" onClick={() => { setItems(items.slice(0, -1)); setSel(null); }} disabled={items.length <= 1}><LuMinus /> Item</button></div>
        </div>
        {item && (
          <div className="sticker p-4 space-y-2 bg-aqua-soft anim-rise">
            <div className="text-xs font-bold uppercase">Item {item.id}</div>
            <Slider label="flex-grow" value={item.grow} max={5} unit="" onChange={(v) => setItem('grow', v)} />
            <Slider label="flex-shrink" value={item.shrink} max={5} unit="" onChange={(v) => setItem('shrink', v)} />
            <div><div className="text-[11px] font-semibold font-mono mb-1">flex-basis</div><Segmented value={item.basis} onChange={(v) => setItem('basis', v)} options={['auto', '60px', '120px', '200px', '40%']} /></div>
            <div><div className="text-[11px] font-semibold font-mono mb-1">align-self</div><Segmented value={item.alignSelf} onChange={(v) => setItem('alignSelf', v)} options={['auto', 'flex-start', 'center', 'flex-end', 'stretch']} /></div>
          </div>
        )}
      </div>
      <div className="space-y-3">
        <div className="sticker bg-white p-3">
          <div className="text-[11px] text-ink-soft mb-2">Click an item to edit it · drag items to reorder · main axis is <b>{isCol ? 'vertical ↓' : 'horizontal →'}</b></div>
          <div className="dotgrid bg-mist rounded-xl border-2 border-dashed border-ink/40 transition-all" style={{ width: `${c.width}%`, height: 300, display: 'flex', flexDirection: c.direction, justifyContent: c.justify, alignItems: c.align, flexWrap: c.wrap, alignContent: c.alignContent, gap: c.gap, padding: 8, overflow: 'auto' }}>
            {items.map((it, idx) => (
              <div key={it.id} draggable onDragStart={() => setDrag(idx)} onDragOver={(e) => e.preventDefault()} onDrop={() => { if (drag === null) return; const x = [...items]; const [v] = x.splice(drag, 1); x.splice(idx, 0, v); setItems(x); setDrag(null); }}
                onClick={() => setSel(it.id === sel ? null : it.id)}
                style={{ background: FLEX_COLORS[(it.id - 1) % FLEX_COLORS.length], flexGrow: it.grow, flexShrink: it.shrink, flexBasis: it.basis, alignSelf: it.alignSelf, minWidth: 44, minHeight: 40, fontSize: idx % 2 ? 22 : 15, padding: idx % 3 === 0 ? '18px 12px' : '8px 12px' }}
                className={`border-2 border-ink rounded-lg font-bold grid place-items-center cursor-grab transition-all ${sel === it.id ? 'ring-4 ring-ink/40' : ''}`}>{it.id}</div>
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-3">
          <CodePanel code={cssBlock('.container', containerCss) + (itemCss ? '\n\n' + itemCss : '')} />
          <div className="sticker p-4 bg-tang-soft">
            <div className="flex items-center justify-between"><div className="font-semibold">Challenge: {T.title}</div>
              {(state.experiments.flexbox?.data || {})[`t-${T.id}`] && <span className="chip bg-leaf"><LuCheck /> solved</span>}</div>
            <p className="text-sm mt-1">{T.desc}</p>
            <div className="mt-2 rounded-lg bg-white border-2 border-ink h-24 p-2" style={{ display: 'flex', flexDirection: T.want.direction, justifyContent: T.want.justify, alignItems: T.want.align }} aria-label="Target layout preview">
              {Array.from({ length: T.want.n }, (_, i) => <div key={i} className="w-7 rounded border-2 border-ink/60 opacity-70" style={{ background: FLEX_COLORS[i], height: 14 + (i % 3) * 8 }} />)}
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              <button className="btn btn-primary" onClick={checkTarget}><LuCheck /> Check my layout</button>
              {TARGETS.map((t, i) => <button key={t.id} onClick={() => setTarget(i)} className={`chip ${i === target ? 'bg-ink text-cream' : 'bg-white'}`}>{i + 1}</button>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================= Grid Playground ======================= */
const TRACK_SIZES = ['1fr', '2fr', 'auto', '80px', '120px', 'minmax(60px, 1fr)'];
export function GridLab() {
  const [cols, setCols] = useState(['1fr', '1fr', '1fr']);
  const [rows, setRows] = useState(['80px', '80px', '80px']);
  const [gap, setGap] = useState(10);
  const [items, setItems] = useState([{ id: 1, c: 1, r: 1, cs: 2, rs: 1 }, { id: 2, c: 3, r: 1, cs: 1, rs: 2 }, { id: 3, c: 1, r: 2, cs: 1, rs: 1 }, { id: 4, c: 2, r: 2, cs: 1, rs: 1 }]);
  const [sel, setSel] = useState(1);
  const [lines, setLines] = useState(true);
  const it = items.find((i) => i.id === sel);
  const upd = (k, v) => setItems(items.map((i) => (i.id === sel ? { ...i, [k]: v } : i)));
  const place = (c, r, id = sel) => { if (!id) return; setItems(items.map((i) => (i.id === id ? { ...i, c, r } : i))); };
  const resize = (arr, set, n, def) => { if (n < 1 || n > 6) return; set(n > arr.length ? [...arr, def] : arr.slice(0, n)); };
  const css = cssBlock('.grid', { display: 'grid', 'grid-template-columns': cols.join(' '), 'grid-template-rows': rows.join(' '), gap: gap + 'px' }) + '\n\n' +
    items.map((i) => cssBlock(`.item-${i.id}`, { 'grid-column': i.cs > 1 ? `${i.c} / span ${i.cs}` : `${i.c}`, 'grid-row': i.rs > 1 ? `${i.r} / span ${i.rs}` : `${i.r}` })).join('\n');
  return (
    <div className="grid xl:grid-cols-[300px_1fr] gap-4">
      <div className="space-y-3">
        <div className="sticker p-4 space-y-3">
          <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase">Columns ({cols.length})</span><span className="flex gap-1"><button className="btn px-2 py-0.5" onClick={() => resize(cols, setCols, cols.length - 1)} aria-label="Remove column"><LuMinus /></button><button className="btn px-2 py-0.5" onClick={() => resize(cols, setCols, cols.length + 1, '1fr')} aria-label="Add column"><LuPlus /></button></span></div>
          <div className="flex flex-wrap gap-1">{cols.map((v, i) => <select key={i} value={v} onChange={(e) => setCols(cols.map((x, k) => (k === i ? e.target.value : x)))} className="border-2 border-ink rounded px-1 text-xs font-mono" aria-label={`Column ${i + 1} size`}>{TRACK_SIZES.map((s) => <option key={s}>{s}</option>)}</select>)}</div>
          <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase">Rows ({rows.length})</span><span className="flex gap-1"><button className="btn px-2 py-0.5" onClick={() => resize(rows, setRows, rows.length - 1)} aria-label="Remove row"><LuMinus /></button><button className="btn px-2 py-0.5" onClick={() => resize(rows, setRows, rows.length + 1, '80px')} aria-label="Add row"><LuPlus /></button></span></div>
          <div className="flex flex-wrap gap-1">{rows.map((v, i) => <select key={i} value={v} onChange={(e) => setRows(rows.map((x, k) => (k === i ? e.target.value : x)))} className="border-2 border-ink rounded px-1 text-xs font-mono" aria-label={`Row ${i + 1} size`}>{TRACK_SIZES.map((s) => <option key={s}>{s}</option>)}</select>)}</div>
          <Slider label="gap" value={gap} max={30} onChange={setGap} />
          <label className="text-xs flex items-center gap-2"><input type="checkbox" checked={lines} onChange={(e) => setLines(e.target.checked)} /> Show grid line numbers</label>
          <div className="flex gap-2"><button className="btn" onClick={() => setItems([...items, { id: Math.max(0, ...items.map((i) => i.id)) + 1, c: 1, r: 1, cs: 1, rs: 1 }])} disabled={items.length >= 9}><LuPlus /> Item</button>
            <button className="btn" onClick={() => { setItems(items.filter((i) => i.id !== sel)); setSel(null); }} disabled={!sel}><LuMinus /> Remove selected</button></div>
        </div>
        {it && (
          <div className="sticker p-4 bg-aqua-soft space-y-2">
            <div className="text-xs font-bold uppercase">Item {it.id} · click a cell or drag it</div>
            <Slider label="grid-column start" value={it.c} min={1} max={cols.length} unit="" onChange={(v) => upd('c', v)} />
            <Slider label="column span" value={it.cs} min={1} max={cols.length} unit="" onChange={(v) => upd('cs', v)} />
            <Slider label="grid-row start" value={it.r} min={1} max={rows.length} unit="" onChange={(v) => upd('r', v)} />
            <Slider label="row span" value={it.rs} min={1} max={rows.length} unit="" onChange={(v) => upd('rs', v)} />
          </div>
        )}
      </div>
      <div className="space-y-3">
        <div className="sticker bg-white p-6 relative">
          <div className="relative" style={{ display: 'grid', gridTemplateColumns: cols.join(' '), gridTemplateRows: rows.join(' '), gap }}>
            {rows.map((_, r) => cols.map((__, c) => (
              <button key={`${r}-${c}`} onClick={() => place(c + 1, r + 1)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => place(c + 1, r + 1, Number(e.dataTransfer.getData('text/item')))}
                style={{ gridColumn: c + 1, gridRow: r + 1 }} className="border-2 border-dashed border-ink/25 rounded-lg bg-mist/60 hover:bg-sun-soft text-[10px] text-ink-soft" aria-label={`Cell row ${r + 1} column ${c + 1}`}>{r + 1},{c + 1}</button>
            )))}
            {items.map((i) => (
              <div key={i.id} draggable onDragStart={(e) => { e.dataTransfer.setData('text/item', String(i.id)); setSel(i.id); }} onClick={() => setSel(i.id)}
                style={{ gridColumn: `${i.c} / span ${i.cs}`, gridRow: `${i.r} / span ${i.rs}`, background: FLEX_COLORS[(i.id - 1) % FLEX_COLORS.length] }}
                className={`z-10 border-2 border-ink rounded-lg font-bold grid place-items-center cursor-grab opacity-95 ${sel === i.id ? 'ring-4 ring-ink/40' : ''}`}>{i.id}</div>
            ))}
            {lines && <div className="absolute -top-5 left-0 right-0 pointer-events-none" style={{ display: 'grid', gridTemplateColumns: cols.join(' '), gap }}>{cols.map((_, k) => <span key={k} className="text-[10px] font-bold text-tang-dark -ml-1">{k + 1}</span>)}</div>}
            {lines && <span className="absolute -top-5 -right-2 text-[10px] font-bold text-tang-dark">{cols.length + 1}</span>}
          </div>
        </div>
        <CodePanel code={css} />
      </div>
    </div>
  );
}

/* ======================= Display Playground ======================= */
const DISPLAYS = [
  ['block', 'Each box takes the full width and starts on a new line. Width/height work.'],
  ['inline', 'Boxes flow like words in a sentence. Width and height are IGNORED; vertical padding overlaps lines.'],
  ['inline-block', 'Flows inline, but width, height and padding all work. Great for buttons and badges.'],
  ['flex', '(on the parent) Children line up in a row and can be aligned and stretched.'],
  ['grid', '(on the parent) Children are placed in columns — here 3 equal columns.'],
  ['none', 'The middle box is completely removed: no space, not read by screen readers.'],
  ['visibility: hidden', 'The middle box is invisible but still takes up its space.'],
];
export function DisplayLab() {
  const [d, setD] = useState('inline');
  const [size, setSize] = useState(true);
  const parent = d === 'flex' ? { display: 'flex', gap: 8 } : d === 'grid' ? { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 } : {};
  const child = (i) => {
    const base = { background: FLEX_COLORS[i], border: '2px solid #30343B', borderRadius: 8, padding: '6px 10px', margin: 4, fontWeight: 700 };
    if (size) Object.assign(base, { width: 110, height: 50 });
    if (['block', 'inline', 'inline-block'].includes(d)) base.display = d;
    if (d === 'none' && i === 1) base.display = 'none';
    if (d === 'visibility: hidden' && i === 1) base.visibility = 'hidden';
    return base;
  };
  const code = ['flex', 'grid'].includes(d) ? cssBlock('.parent', d === 'flex' ? { display: 'flex', gap: '8px' } : { display: 'grid', 'grid-template-columns': 'repeat(3, 1fr)', gap: '8px' }) : d.startsWith('visibility') ? cssBlock('.box-2', { visibility: 'hidden' }) : d === 'none' ? cssBlock('.box-2', { display: 'none' }) : cssBlock('.box', { display: d, ...(size ? { width: '110px', height: '50px' } : {}) });
  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-4">
      <div className="space-y-3">
        <Segmented size="md" value={d} onChange={setD} options={DISPLAYS.map(([v]) => v)} />
        <div className="sticker bg-sun-soft p-3 text-sm"><b className="font-mono">{d}:</b> {DISPLAYS.find((x) => x[0] === d)[1]}</div>
        <div className="sticker bg-white p-4 min-h-[220px]">
          <p className="text-sm leading-8">
            Some text before the boxes in the same paragraph line…{' '}
            <span style={parent} className={['flex', 'grid'].includes(d) ? 'outline-dashed outline-2 outline-aqua my-2' : ''}>
              {[0, 1, 2].map((i) => <span key={i} style={child(i)}>box {i + 1}</span>)}
            </span>
            {' '}…and text after them.
          </p>
        </div>
        <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={size} onChange={(e) => setSize(e.target.checked)} /> Apply <code className="inline-code">width: 110px; height: 50px</code> to the boxes</label>
      </div>
      <div className="space-y-3"><CodePanel code={code} /><Callout kind="tip">Switch between <b>inline</b> and <b>inline-block</b> with the size checkbox on. Only inline-block respects width and height.</Callout></div>
    </div>
  );
}

/* ======================= Animation Studio ======================= */
const PRESETS = {
  bounce: { from: 'translateY(0)', mid: 'translateY(-60px)', to: 'translateY(0)' },
  spin: { from: 'rotate(0deg)', to: 'rotate(360deg)' },
  pulse: { from: 'scale(1)', mid: 'scale(1.25)', to: 'scale(1)' },
  slide: { from: 'translateX(0)', to: 'translateX(200px)' },
  shake: { from: 'translateX(0)', mid: 'translateX(-14px) rotate(-4deg)', to: 'translateX(0)' },
  custom: null,
};
const TIMINGS = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(.68,-0.55,.27,1.55)', 'steps(5)'];
const BEZ = { ease: [0.25, 0.1, 0.25, 1], linear: [0, 0, 1, 1], 'ease-in': [0.42, 0, 1, 1], 'ease-out': [0, 0, 0.58, 1], 'ease-in-out': [0.42, 0, 0.58, 1], 'cubic-bezier(.68,-0.55,.27,1.55)': [0.68, -0.55, 0.27, 1.55] };

export function AnimationLab() {
  const [preset, setPreset] = useState('bounce');
  const [dur, setDur] = useState(1); const [delay, setDelay] = useState(0);
  const [timing, setTiming] = useState('ease-in-out'); const [count, setCount] = useState('infinite'); const [dir, setDir] = useState('normal'); const [fill, setFill] = useState('none');
  const [cust, setCust] = useState({ tx: 120, ty: 0, rot: 45, sc: 1.2 });
  const [run, setRun] = useState(0);
  const frames = preset === 'custom' ? { from: 'translate(0, 0) rotate(0deg) scale(1)', to: `translate(${cust.tx}px, ${cust.ty}px) rotate(${cust.rot}deg) scale(${cust.sc})` } : PRESETS[preset];
  const kf = `@keyframes my-anim {\n  0% { transform: ${frames.from}; }\n${frames.mid ? `  50% { transform: ${frames.mid}; }\n` : ''}  100% { transform: ${frames.to}; }\n}`;
  const anim = `my-anim ${dur}s ${timing} ${delay}s ${count} ${dir} ${fill}`;
  const css = `${kf}\n\n.ball {\n  animation: ${anim};\n  /* name duration timing-function delay iteration-count direction fill-mode */\n}`;
  const b = BEZ[timing];
  return (
    <div className="grid xl:grid-cols-[300px_1fr] gap-4">
      <div className="sticker p-4 space-y-3 h-fit">
        <div><div className="text-[11px] font-semibold font-mono mb-1">keyframes preset</div><Segmented value={preset} onChange={setPreset} options={Object.keys(PRESETS)} /></div>
        {preset === 'custom' && (
          <div className="rounded-lg bg-aqua-soft border-2 border-ink p-2 space-y-1">
            <div className="text-xs font-bold">100% keyframe transform</div>
            <Slider label="translateX" value={cust.tx} min={-150} max={250} onChange={(v) => setCust({ ...cust, tx: v })} />
            <Slider label="translateY" value={cust.ty} min={-100} max={100} onChange={(v) => setCust({ ...cust, ty: v })} />
            <Slider label="rotate" value={cust.rot} min={-360} max={360} unit="deg" onChange={(v) => setCust({ ...cust, rot: v })} />
            <Slider label="scale" value={cust.sc} min={0.2} max={2.5} step={0.1} unit="" onChange={(v) => setCust({ ...cust, sc: v })} />
          </div>
        )}
        <Slider label="animation-duration" value={dur} min={0.2} max={5} step={0.1} unit="s" onChange={setDur} />
        <Slider label="animation-delay" value={delay} min={0} max={3} step={0.1} unit="s" onChange={setDelay} />
        <label className="block text-[11px] font-semibold font-mono">timing-function<select value={timing} onChange={(e) => setTiming(e.target.value)} className="w-full border-2 border-ink rounded-md mt-1 text-xs">{TIMINGS.map((t) => <option key={t}>{t}</option>)}</select></label>
        <div><div className="text-[11px] font-semibold font-mono mb-1">iteration-count</div><Segmented value={count} onChange={setCount} options={['1', '2', '3', 'infinite']} /></div>
        <div><div className="text-[11px] font-semibold font-mono mb-1">direction</div><Segmented value={dir} onChange={setDir} options={['normal', 'reverse', 'alternate']} /></div>
        <div><div className="text-[11px] font-semibold font-mono mb-1">fill-mode</div><Segmented value={fill} onChange={setFill} options={['none', 'forwards', 'both']} /></div>
        <button className="btn btn-primary w-full justify-center" onClick={() => setRun((r) => r + 1)}><LuPlay /> Play preview</button>
      </div>
      <div className="space-y-3">
        <div className="sticker bg-white h-[260px] grid place-items-center dotgrid overflow-hidden relative">
          <style>{kf}</style>
          <div key={run + anim + kf} className="w-20 h-20 rounded-2xl bg-tang border-2 border-ink shadow-[3px_3px_0_#30343B] grid place-items-center font-bold" style={{ animation: anim }}>.ball</div>
        </div>
        <div className="grid lg:grid-cols-[1fr_220px] gap-3">
          <CodePanel code={css} />
          <div className="sticker p-3">
            <div className="text-xs font-bold uppercase mb-1">Timing curve</div>
            {b ? (
              <svg viewBox="-10 -40 120 160" className="w-full" aria-label={`Timing curve for ${timing}`}>
                <rect x="0" y="0" width="100" height="100" fill="#F1F6FA" stroke="#30343B" />
                <path d={`M0 100 C ${b[0] * 100} ${100 - b[1] * 100}, ${b[2] * 100} ${100 - b[3] * 100}, 100 0`} fill="none" stroke="#FF8A3D" strokeWidth="3" />
                <line x1="0" y1="100" x2={b[0] * 100} y2={100 - b[1] * 100} stroke="#55B9E8" strokeDasharray="3 2" /><line x1="100" y1="0" x2={b[2] * 100} y2={100 - b[3] * 100} stroke="#55B9E8" strokeDasharray="3 2" />
                <text x="50" y="115" textAnchor="middle" fontSize="9">time →</text><text x="-5" y="50" fontSize="9" transform="rotate(-90 -5 50)" textAnchor="middle">progress →</text>
              </svg>
            ) : <p className="text-sm">steps(5) jumps in 5 equal steps instead of moving smoothly — like a ticking clock.</p>}
            <p className="text-[11px] text-ink-soft">Steeper = faster at that moment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================= Responsive Design Lab ======================= */
const RESP_HTML = `<header class="top"><b>CampusConnect</b><nav><a>Events</a><a>Clubs</a><a>Login</a></nav></header>
<section class="hero"><h1>Find your people on campus</h1><p>Join clubs, discover events and meet classmates.</p></section>
<main class="cards">
  <article>Coding Club</article><article>Robotics</article><article>Music</article><article>Photography</article>
</main>`;
const RESP_CSS = `body { margin: 0; font-family: system-ui; }
.top { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #30343B; color: #FFF9EF; }
nav { display: flex; gap: 10px; }
.hero { padding: 24px 14px; background: #FFE3CF; }
.hero h1 { font-size: clamp(1.4rem, 6vw, 2.6rem); margin: 0; }
.cards { display: grid; grid-template-columns: 1fr; gap: 10px; padding: 14px; }
article { background: #DDF1FB; border: 2px solid #30343B; border-radius: 10px; padding: 18px; font-weight: bold; }

/* Mobile: stack the navigation */
@media (max-width: 480px) {
  .top { flex-direction: column; gap: 6px; }
}
/* Tablet and up */
@media (min-width: 600px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}
/* Desktop and up */
@media (min-width: 1000px) {
  .cards { grid-template-columns: repeat(4, 1fr); }
  .hero { text-align: center; padding: 60px; }
}`;

export function ResponsiveLab() {
  const [width, setWidth] = useState(375);
  const [css, setCss] = useState(RESP_CSS);
  const box = useRef(null);
  const [boxW, setBoxW] = useState(800);
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setBoxW(e.contentRect.width));
    if (box.current) ro.observe(box.current);
    return () => ro.disconnect();
  }, []);
  const scale = Math.min(1, (boxW - 8) / width);
  const queries = [...css.matchAll(/@media\s*\(([^)]*)\)/g)].map((m) => {
    const q = m[1]; const n = parseFloat((q.match(/(\d+)px/) || [])[1]);
    const active = /min-width/.test(q) ? width >= n : /max-width/.test(q) ? width <= n : false;
    return { q, active };
  });
  const presets = [['Mobile', 375, LuSmartphone], ['Tablet', 768, LuTablet], ['Desktop', 1280, LuMonitor]];
  return (
    <div className="grid xl:grid-cols-[1fr_380px] gap-4">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {presets.map(([l, w, I]) => <button key={l} className={`btn ${width === w ? 'btn-sun' : ''}`} onClick={() => setWidth(w)}><I /> {l} · {w}px</button>)}
        </div>
        <Slider label="viewport width" value={width} min={320} max={1440} onChange={setWidth} />
        <div className="flex flex-wrap gap-1">{queries.map((q, i) => <span key={i} className={`chip font-mono ${q.active ? 'bg-leaf' : 'bg-white opacity-60'}`}>@media ({q.q}) {q.active ? '✓ active' : ''}</span>)}</div>
        <div ref={box} className="sticker bg-mist p-1 overflow-hidden" style={{ height: 480 }}>
          <div style={{ width, height: 480 / scale - 8, transform: `scale(${scale})`, transformOrigin: 'top left' }} className="bg-white border-2 border-ink rounded-lg overflow-hidden">
            <Preview html={RESP_HTML} css={css} js="" title="Responsive preview" />
          </div>
        </div>
        <p className="text-xs text-ink-soft">The preview is a real page rendered at {width}px wide{scale < 1 ? ` and scaled to ${Math.round(scale * 100)}% to fit` : ''}.</p>
      </div>
      <div>
        <div className="text-xs font-bold uppercase mb-1">Edit the CSS & media queries</div>
        <div className="sticker-sm overflow-hidden h-[600px]"><CodeEditor value={css} onChange={setCss} lang="css" minHeight={0} /></div>
      </div>
    </div>
  );
}
