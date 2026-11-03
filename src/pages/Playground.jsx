import { useMemo, useRef, useState } from 'react';
import { ALL_LESSONS, TRACKS } from '../data/syllabus.js';
import { PROJECTS } from '../data/projects.js';
import { PageHeader } from '../components/ui.jsx';
import CodeLab from '../components/CodeLab.jsx';

const KEY = 'codeplay-playground-draft';
const BLANK = {
  html: '<h1>Hello, CodePlay!</h1>\n<p>Edit the HTML, CSS and JS tabs, then watch this page update.</p>\n<button id="btn">Click me</button>',
  css: 'body { font-family: system-ui; padding: 12px; }\nh1 { color: #FF8A3D; }\nbutton { padding: 8px 14px; border-radius: 8px; border: 2px solid #30343B; background: #FFD45C; cursor: pointer; }',
  js: 'document.getElementById("btn").addEventListener("click", () => {\n  console.log("Button clicked!");\n});',
};

function loadDraft() {
  try { const d = JSON.parse(localStorage.getItem(KEY)); if (d && typeof d.html === 'string') return d; } catch { /* ignore */ }
  return BLANK;
}

export default function Playground() {
  const templates = useMemo(() => [
    { id: 'blank', group: 'Start', label: 'Starter page', code: BLANK },
    ...ALL_LESSONS.filter((l) => l.live).map((l) => ({ id: l.id, group: `${TRACKS[l.track].title} examples`, label: l.title, code: { html: '', css: '', js: '', ...l.live } })),
    ...PROJECTS.map((p) => ({ id: `p-${p.id}`, group: 'Mini project solutions', label: p.title, code: { html: '', css: '', js: '', ...p.solution } })),
  ], []);
  const [initial, setInitial] = useState(loadDraft);
  const [choice, setChoice] = useState('');
  const timer = useRef(null);
  const save = (c) => { clearTimeout(timer.current); timer.current = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* ignore */ } }, 400); };

  function pick(id) {
    setChoice(id);
    const t = templates.find((x) => x.id === id);
    if (t) { setInitial({ ...t.code }); save(t.code); }
  }
  const groups = [...new Set(templates.map((t) => t.group))];

  return (
    <div>
      <PageHeader kicker="Write · Run · Experiment" title="Code Playground">
        Separate HTML, CSS and JavaScript editors with a live browser preview and console. Your code runs in an isolated sandbox, and your latest draft is saved automatically in this browser.
      </PageHeader>
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <label className="text-sm font-semibold flex items-center gap-2">Load an example:
          <select value={choice} onChange={(e) => pick(e.target.value)} className="border-2 border-ink rounded-lg px-2 py-1.5 bg-white text-sm max-w-[320px]">
            <option value="" disabled>Choose a template…</option>
            {groups.map((g) => <optgroup key={g} label={g}>{templates.filter((t) => t.group === g).map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</optgroup>)}
          </select>
        </label>
        <span className="text-xs text-ink-soft">Tip: Ctrl + Enter runs your code. Download gives you a single index.html you can open anywhere.</span>
      </div>
      <CodeLab initial={initial} resetTo={BLANK} tabs={['html', 'css', 'js']} height={520} onCodeChange={save} />
    </div>
  );
}
