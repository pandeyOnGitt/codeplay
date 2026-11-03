import { useEffect, useState } from 'react';
import { LuChevronLeft, LuChevronRight, LuPlay, LuPause, LuRotateCcw } from 'react-icons/lu';
import CodeEditor from './CodeEditor.jsx';

/** Line-by-line execution viewer using a hand-authored trace. */
export default function StepThrough({ code, steps }) {
  const [i, setI] = useState(-1);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    if (i >= steps.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setI((x) => x + 1), 1500);
    return () => clearTimeout(t);
  }, [playing, i, steps.length]);

  const step = steps[i];
  const outputs = steps.slice(0, i + 1).filter((s) => s.out).map((s) => s.out);
  const vars = step?.vars || {};
  const height = Math.min(380, code.split('\n').length * 21.6 + 30);

  return (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-3">
      <div className="sticker-sm overflow-hidden" style={{ height }}>
        <CodeEditor value={code} lang="js" readOnly onChange={() => {}} highlightLine={step?.line} minHeight={0} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="sticker-sm bg-sun-soft p-3 min-h-[76px]">
          <div className="text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-1">
            {i < 0 ? 'Ready' : `Step ${i + 1} of ${steps.length} · line ${step.line}`}
          </div>
          <div className="text-sm">{i < 0 ? 'Press Next to run the program one step at a time. The yellow bar shows which line JavaScript is executing.' : step.note}</div>
        </div>
        <div className="sticker-sm bg-white p-3">
          <div className="text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-1">Memory (variables)</div>
          {Object.keys(vars).length === 0 ? <div className="text-xs text-ink-soft italic">empty</div> : (
            <table className="w-full text-[12.5px] font-mono">
              <tbody>
                {Object.entries(vars).map(([k, v]) => (
                  <tr key={k} className="border-b border-mist last:border-0 anim-rise"><td className="py-0.5 pr-2 text-aqua-dark font-semibold">{k}</td><td className="py-0.5 break-all">{String(v)}</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="sticker-sm bg-[#22252B] text-[#E9E4D8] p-3 font-mono text-[12.5px] min-h-[60px]">
          <div className="text-[11px] font-bold uppercase tracking-wide text-white/60 mb-1 font-sans">Console</div>
          {outputs.length === 0 ? <span className="text-white/40 italic">nothing printed yet</span> : outputs.map((o, k) => <div key={k} className="whitespace-pre-wrap">› {o}</div>)}
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="btn" onClick={() => { setPlaying(false); setI(Math.max(-1, i - 1)); }} disabled={i < 0} aria-label="Previous step"><LuChevronLeft /> Back</button>
          <button className="btn btn-primary" onClick={() => { setPlaying(false); setI(Math.min(steps.length - 1, i + 1)); }} disabled={i >= steps.length - 1}>Next <LuChevronRight /></button>
          <button className="btn btn-blue" onClick={() => { if (i >= steps.length - 1) setI(-1); setPlaying(!playing); }}>{playing ? <><LuPause /> Pause</> : <><LuPlay /> Auto-play</>}</button>
          <button className="btn" onClick={() => { setPlaying(false); setI(-1); }} aria-label="Restart"><LuRotateCcw /></button>
        </div>
      </div>
    </div>
  );
}
