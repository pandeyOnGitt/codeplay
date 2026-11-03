import { useMemo, useState } from 'react';
import { LuCheck, LuX, LuRotateCcw, LuArrowRight } from 'react-icons/lu';
import { useProgress } from '../lib/progress.jsx';
import { celebrate } from '../lib/celebrate.jsx';
import { Mascot } from './ui.jsx';
import { shuffleOptions } from '../data/syllabus.js';

/** One-question-at-a-time MCQ quiz with explanations. */
export default function Quiz({ questions, topic, title = 'Quick quiz', compact = false }) {
  const { recordQuiz } = useProgress();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [round, setRound] = useState(0);
  const qs = useMemo(() => (questions || []).map((q) => shuffleOptions(q)), [questions, round]); // eslint-disable-line

  if (!qs?.length) return null;
  const q = qs[i];

  function pick(k) {
    if (picked !== null) return;
    setPicked(k);
    if (k === q.a) setScore((s) => s + 1);
  }
  function next() {
    if (i + 1 >= qs.length) {
      const final = score;
      setDone(true);
      recordQuiz(topic, final, qs.length);
      if (final === qs.length) celebrate(`Perfect score! ${final}/${qs.length}`);
      return;
    }
    setI(i + 1); setPicked(null);
  }
  function restart() { setI(0); setPicked(null); setScore(0); setDone(false); setRound((r) => r + 1); }

  if (done) {
    const pct = Math.round((score / qs.length) * 100);
    return (
      <div className="text-center py-4 anim-pop">
        <Mascot size={90} mood={pct >= 60 ? 'happy' : 'think'} className="mx-auto" />
        <div className="font-display text-2xl font-semibold mt-2">{score} / {qs.length} correct</div>
        <p className="text-ink-soft text-sm">{pct === 100 ? 'Flawless! You really get this.' : pct >= 60 ? 'Nice work — review the ones you missed.' : 'Good start. Re-read the lesson notes and try again.'}</p>
        <p className="text-xs text-ink-soft mt-1">+{score * 10} XP earned</p>
        <button className="btn btn-sun mt-3" onClick={restart}><LuRotateCcw /> Try again</button>
      </div>
    );
  }

  return (
    <div>
      {!compact && (
        <div className="flex items-center justify-between mb-3 text-sm">
          <span className="font-semibold">{title}</span>
          <span className="chip bg-mist">Question {i + 1} of {qs.length}</span>
        </div>
      )}
      <div className="h-2 rounded-full bg-mist mb-3 overflow-hidden"><div className="h-full bg-tang transition-all" style={{ width: `${(i / qs.length) * 100}%` }} /></div>
      <p className="font-semibold text-[15.5px] mb-3">{q.q}</p>
      <div className="grid gap-2">
        {q.o.map((opt, k) => {
          const state = picked === null ? '' : k === q.a ? 'right' : k === picked ? 'wrong' : 'dim';
          return (
            <button key={k} onClick={() => pick(k)} disabled={picked !== null}
              className={`text-left px-3 py-2.5 rounded-lg border-2 font-medium transition flex items-center gap-2
                ${state === 'right' ? 'bg-leaf-soft border-leaf-dark' : state === 'wrong' ? 'bg-blush-soft border-blush-dark' : state === 'dim' ? 'opacity-50 border-ink/30' : 'border-ink hover:bg-sun-soft'}`}>
              <span className="w-6 h-6 shrink-0 rounded-md border-2 border-current grid place-items-center text-xs font-bold">
                {state === 'right' ? <LuCheck /> : state === 'wrong' ? <LuX /> : String.fromCharCode(65 + k)}
              </span>
              <span className="font-mono text-[13.5px]">{opt}</span>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className={`mt-3 rounded-lg px-3 py-2 text-sm anim-rise ${picked === q.a ? 'bg-leaf-soft' : 'bg-blush-soft'}`}>
          <b>{picked === q.a ? 'Correct!' : 'Not quite.'}</b> {q.e}
        </div>
      )}
      {picked !== null && (
        <div className="mt-3 flex justify-end"><button className="btn btn-primary" onClick={next}>{i + 1 >= qs.length ? 'See result' : 'Next'} <LuArrowRight /></button></div>
      )}
    </div>
  );
}
