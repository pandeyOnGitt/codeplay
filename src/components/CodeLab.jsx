// Reusable HTML / CSS / JS lab: editors + sandboxed live preview + console.
import { useEffect, useRef, useState } from 'react';
import { LuPlay, LuRotateCcw, LuCopy, LuDownload, LuTrash2, LuTerminal, LuCircleCheck, LuCircleX, LuLightbulb } from 'react-icons/lu';
import CodeEditor from './CodeEditor.jsx';
import Preview from './Preview.jsx';
import { explainError } from '../lib/sandbox.js';
import { toast } from '../lib/celebrate.jsx';

const TAB_STYLE = { html: 'bg-tang', css: 'bg-aqua', js: 'bg-sun' };
const TAB_LABEL = { html: 'HTML', css: 'CSS', js: 'JS' };

export function copyText(text) {
  const done = () => toast('Copied to clipboard');
  try {
    navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
  } catch { fallbackCopy(text, done); }
}
function fallbackCopy(text, done) {
  const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select();
  try { document.execCommand('copy'); done(); } catch { toast('Copy failed — select the code and press Ctrl+C', 'error'); }
  t.remove();
}

export function downloadFile(name, content, type = 'text/html') {
  try {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast(`Downloading ${name} (if nothing happens, use Copy)`);
  } catch { toast('Download blocked here — use Copy instead', 'error'); }
}

export function combineDoc({ html, css, js }) {
  return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My CodePlay page</title>\n  <style>\n${css}\n  </style>\n</head>\n<body>\n${html}\n  <script>\n${js}\n  </script>\n</body>\n</html>\n`;
}

export default function CodeLab({
  initial, tabs = ['html', 'css', 'js'], height = 360, autoRun = true, tests, onTests, onRun,
  layout = 'side', showConsole = true, reportDom, onDom, onCodeChange, resetTo, id,
}) {
  const [code, setCode] = useState(() => ({ html: '', css: '', js: '', ...initial }));
  const [active, setActive] = useState(tabs[0]);
  const [runKey, setRunKey] = useState(0);
  const [live, setLive] = useState(autoRun);
  const [ran, setRan] = useState({ ...code });
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState(null);
  const timer = useRef(null);

  // When the parent swaps the starting code (e.g. a new template), reload.
  const initKey = JSON.stringify(initial);
  useEffect(() => {
    const next = { html: '', css: '', js: '', ...initial };
    setCode(next); setRan(next); setLogs([]); setResults(null); setRunKey((k) => k + 1);
  }, [initKey]); // eslint-disable-line

  function run(c = code) { setLogs([]); setResults(null); setRan({ ...c }); setRunKey((k) => k + 1); onRun?.(c); }

  function update(lang, v) {
    const next = { ...code, [lang]: v };
    setCode(next);
    onCodeChange?.(next);
    if (live) { clearTimeout(timer.current); timer.current = setTimeout(() => run(next), 700); }
  }
  useEffect(() => () => clearTimeout(timer.current), []);

  const reset = () => { const r = { html: '', css: '', js: '', ...(resetTo || initial) }; setCode(r); run(r); toast('Code reset to the starting version'); };
  const errors = logs.filter((l) => l.type === 'error');
  const firstHint = errors.length ? explainError(errors[0].text) : null;

  const editorPane = (
    <div className="flex flex-col min-w-0 sticker-sm bg-[#2B2F36] overflow-hidden" style={{ height }}>
      <div className="flex items-center gap-1 bg-white border-b-2 border-ink px-2 py-1.5" role="tablist">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={active === t} onClick={() => setActive(t)}
            className={`px-3 py-1 rounded-md text-xs font-bold border-2 ${active === t ? `${TAB_STYLE[t]} border-ink` : 'border-transparent text-ink-soft hover:bg-mist'}`}>
            {TAB_LABEL[t]}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1">
          <label className="text-[11px] font-semibold text-ink-soft flex items-center gap-1 mr-1 cursor-pointer" title="Update the output automatically as you type">
            <input type="checkbox" checked={live} onChange={(e) => setLive(e.target.checked)} /> Auto-run
          </label>
          <IconBtn label="Run (Ctrl+Enter)" onClick={() => run()} className="bg-leaf"><LuPlay /></IconBtn>
          <IconBtn label="Reset code" onClick={reset}><LuRotateCcw /></IconBtn>
          <IconBtn label="Copy full page" onClick={() => copyText(tabs.length === 1 ? code[active] : combineDoc(code))}><LuCopy /></IconBtn>
          <IconBtn label="Download as index.html" onClick={() => downloadFile('index.html', combineDoc(code))}><LuDownload /></IconBtn>
        </div>
      </div>
      <div className="flex-1 min-h-0 relative">
        <CodeEditor key={active} value={code[active]} lang={active} onChange={(v) => update(active, v)} onRun={() => run()} minHeight={0} />
      </div>
    </div>
  );

  const outputPane = (
    <div className="flex flex-col min-w-0 gap-2" style={{ height }}>
      <div className="sticker-sm overflow-hidden flex flex-col flex-1 min-h-0 bg-white">
        <div className="flex items-center gap-2 px-3 py-1.5 border-b-2 border-ink bg-mist text-xs font-bold">
          <span className="flex gap-1"><i className="w-2.5 h-2.5 rounded-full bg-blush inline-block" /><i className="w-2.5 h-2.5 rounded-full bg-sun inline-block" /><i className="w-2.5 h-2.5 rounded-full bg-leaf inline-block" /></span>
          Browser output
        </div>
        <div className="flex-1 min-h-0">
          <Preview html={ran.html} css={ran.css} js={ran.js} runKey={runKey} tests={tests} reportDom={reportDom} onDom={onDom}
            onConsole={(l) => setLogs((x) => (l.type === 'clear' ? [] : [...x.slice(-80), l]))}
            onTests={(r) => { setResults(r); onTests?.(r); }} />
        </div>
      </div>
      {showConsole && (
        <div className="sticker-sm bg-[#22252B] text-[#E9E4D8] overflow-hidden flex flex-col" style={{ height: Math.max(110, height * 0.34) }}>
          <div className="flex items-center gap-2 px-3 py-1 text-[11px] font-bold border-b border-white/10 text-white/80">
            <LuTerminal /> Console {logs.length > 0 && <span className="chip border-white/40 text-white/80">{logs.length}</span>}
            <button onClick={() => setLogs([])} className="ml-auto flex items-center gap-1 hover:text-sun" aria-label="Clear console"><LuTrash2 /> Clear</button>
          </div>
          <div className="flex-1 overflow-auto scroll-thin font-mono text-[12.5px] px-3 py-1.5 space-y-0.5" aria-live="polite">
            {logs.length === 0 && <div className="text-white/40 italic">console.log() output appears here</div>}
            {logs.map((l, i) => (
              <div key={i} className={l.type === 'error' ? 'text-[#FF8F8F]' : l.type === 'warn' ? 'text-sun' : l.type === 'info' ? 'text-aqua' : ''}>
                <span className="opacity-40 mr-1">{l.type === 'error' ? '✖' : '›'}</span>{l.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div id={id} className="space-y-2">
      <div className={layout === 'side' ? 'grid lg:grid-cols-2 gap-3' : 'grid gap-3'}>
        {editorPane}
        {outputPane}
      </div>
      {firstHint && (
        <div className="sticker-sm bg-blush-soft px-3 py-2 text-sm flex gap-2 items-start anim-rise">
          <LuLightbulb className="mt-0.5 shrink-0 text-blush-dark" /> <div><b>What this error means:</b> {firstHint}</div>
        </div>
      )}
      {results && (
        <div className="sticker-sm bg-white px-3 py-2 text-sm anim-rise">
          <div className="font-bold mb-1">Checks</div>
          <ul className="space-y-0.5">
            {results.map((r, i) => (
              <li key={i} className={`flex items-center gap-2 ${r.ok ? 'text-leaf-dark' : 'text-blush-dark'}`}>
                {r.ok ? <LuCircleCheck /> : <LuCircleX />} {r.label}{r.err ? <span className="text-xs opacity-70"> — {r.err}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function IconBtn({ children, label, onClick, className = '' }) {
  return (
    <button onClick={onClick} title={label} aria-label={label}
      className={`w-7 h-7 grid place-items-center rounded-md border-2 border-ink text-sm hover:-translate-y-px transition ${className || 'bg-white'}`}>
      {children}
    </button>
  );
}
