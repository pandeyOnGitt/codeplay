import { useEffect, useMemo, useState } from 'react';
import { LuTimer, LuCheck, LuX, LuFlag, LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { Link } from '../lib/router.jsx';
import { useProgress } from '../lib/progress.jsx';
import { MCQS as RAW, TRACKS, LESSON_BY_ID, ALL_LESSONS, shuffleOptions } from '../data/syllabus.js';
import { PageHeader, Mascot, Bar } from '../components/ui.jsx';
import { celebrate } from '../lib/celebrate.jsx';

function buildTest(kind) {
  const MCQS = RAW.map((q) => shuffleOptions(q));
  const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);
  if (TRACKS[kind]) return { kind, title: `${TRACKS[kind].title} test`, qs: shuffle(MCQS.filter((q) => q.track === kind)).slice(0, 10), minutes: 10 };
  if (kind === 'full') {
    const per = { html: 8, css: 8, js: 9 };
    return { kind, title: 'Full syllabus test', qs: shuffle(Object.entries(per).flatMap(([t, n]) => shuffle(MCQS.filter((q) => q.track === t)).slice(0, n))), minutes: 25 };
  }
  if (LESSON_BY_ID[kind]) return { kind: 'topic', title: `${LESSON_BY_ID[kind].title} — topic test`, qs: shuffle(MCQS.filter((q) => q.topic === kind)), minutes: 5 };
  return null;
}

function Picker() {
  const { state } = useProgress();
  const [topic, setTopic] = useState(ALL_LESSONS[0].id);
  const cards = [
    ...Object.values(TRACKS).map((t) => ({ to: `mock-${t.id}`, title: `${t.title} test`, meta: '10 questions · 10 minutes', bg: t.soft })),
    { to: 'mock-full', title: 'Full syllabus test', meta: '25 questions · 25 minutes', bg: 'bg-leaf-soft' },
  ];
  return (
    <div>
      <PageHeader kicker="Timed · auto-scored" title="Mock Tests">
        Exam-style multiple-choice tests with a countdown timer, automatic scoring, an explanation for every answer and a weak-topic report at the end.
      </PageHeader>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className={`sticker p-5 ${c.bg} hover:-translate-y-1 transition block`}>
            <LuTimer className="text-2xl" /><div className="font-display text-xl font-semibold mt-2">{c.title}</div><div className="text-sm text-ink-soft">{c.meta}</div>
          </Link>
        ))}
      </div>
      <div className="sticker p-5 mb-6">
        <h3 className="font-semibold mb-2">Topic-wise test</h3>
        <div className="flex flex-wrap gap-2">
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className="border-2 border-ink rounded-lg px-2 py-1.5 text-sm">
            {Object.values(TRACKS).map((t) => <optgroup key={t.id} label={t.title}>{t.lessons.map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}</optgroup>)}
          </select>
          <Link to={`mock-${topic}`} className="btn btn-primary">Start topic test</Link>
        </div>
      </div>
      <h3 className="font-semibold mb-2">Previous results</h3>
      {state.mockResults.length === 0 ? <p className="text-sm text-ink-soft">No tests taken yet.</p> : (
        <div className="sticker overflow-hidden"><table className="w-full text-sm"><thead className="bg-mist"><tr><th className="text-left px-3 py-2">Test</th><th className="text-left px-3 py-2">Score</th><th className="text-left px-3 py-2">Date</th></tr></thead>
          <tbody>{[...state.mockResults].reverse().slice(0, 10).map((r, i) => <tr key={i} className="border-t border-mist"><td className="px-3 py-1.5">{r.title}</td><td className="px-3 py-1.5 font-semibold">{r.score}/{r.total} ({Math.round((r.score / r.total) * 100)}%)</td><td className="px-3 py-1.5 text-ink-soft">{new Date(r.at).toLocaleString()}</td></tr>)}</tbody></table></div>
      )}
    </div>
  );
}

function Runner({ test, onRetake }) {
  const { recordMock } = useProgress();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [left, setLeft] = useState(test.minutes * 60);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (done) return;
    if (left <= 0) { submit(); return; }
    const t = setTimeout(() => setLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [left, done]); // eslint-disable-line

  function submit() {
    if (done) return;
    const perTopic = {};
    let score = 0;
    test.qs.forEach((q, k) => { const ok = answers[k] === q.a; if (ok) score++; perTopic[q.topic] = perTopic[q.topic] || [0, 0]; perTopic[q.topic][0] += ok ? 1 : 0; perTopic[q.topic][1] += 1; });
    recordMock({ kind: test.kind, title: test.title, score, total: test.qs.length, perTopic, seconds: test.minutes * 60 - left });
    if (score / test.qs.length >= 0.8) celebrate(`Excellent! ${score}/${test.qs.length}`, true);
    setDone(true);
    window.scrollTo({ top: 0 });
  }

  const q = test.qs[i];
  const mm = String(Math.floor(left / 60)).padStart(2, '0'); const ss = String(left % 60).padStart(2, '0');

  if (done) {
    const score = test.qs.filter((qq, k) => answers[k] === qq.a).length;
    const pct = Math.round((score / test.qs.length) * 100);
    const byTopic = {};
    test.qs.forEach((qq, k) => { byTopic[qq.topic] = byTopic[qq.topic] || [0, 0]; byTopic[qq.topic][0] += answers[k] === qq.a ? 1 : 0; byTopic[qq.topic][1]++; });
    const weak = Object.entries(byTopic).filter(([, [r, t]]) => r / t < 0.6);
    return (
      <div className="space-y-5">
        <div className="sticker p-6 bg-white grid md:grid-cols-[auto_1fr] gap-5 items-center">
          <Mascot size={110} mood={pct >= 60 ? 'happy' : 'think'} />
          <div>
            <div className="text-sm font-semibold text-ink-soft">{test.title} · result</div>
            <div className="font-display text-4xl font-semibold">{score} / {test.qs.length} <span className="text-xl text-ink-soft">({pct}%)</span></div>
            <div className="max-w-md mt-2"><Bar pct={pct} color={pct >= 80 ? 'bg-leaf' : pct >= 50 ? 'bg-sun' : 'bg-blush'} /></div>
            <p className="text-sm mt-2">{pct >= 80 ? 'Exam ready! Keep revising to stay sharp.' : pct >= 50 ? 'Good foundation. Review the explanations below and the weak topics.' : 'Do not worry — revisit the lessons below, then try again.'} Time used: {Math.floor((test.minutes * 60 - left) / 60)}m {(test.minutes * 60 - left) % 60}s.</p>
            <div className="flex gap-2 mt-3"><Link to="mock" className="btn">All tests</Link><button className="btn btn-primary" onClick={onRetake}>Retake (new questions)</button></div>
          </div>
        </div>
        {weak.length > 0 && (
          <div className="sticker p-5 bg-blush-soft">
            <h3 className="font-semibold mb-2">Weak topics to revise</h3>
            <div className="flex flex-wrap gap-2">{weak.map(([t, [r, n]]) => <Link key={t} to={`notes-${t}`} className="chip bg-white py-1 px-3 hover:bg-sun-soft">{LESSON_BY_ID[t].title} · {r}/{n}</Link>)}</div>
          </div>
        )}
        <div className="space-y-3">
          {test.qs.map((qq, k) => {
            const ok = answers[k] === qq.a;
            return (
              <div key={k} className={`sticker p-4 ${ok ? 'bg-leaf-soft' : 'bg-white'}`}>
                <div className="flex gap-2 font-semibold">{ok ? <LuCheck className="text-leaf-dark mt-1 shrink-0" /> : <LuX className="text-blush-dark mt-1 shrink-0" />}{k + 1}. {qq.q}</div>
                <div className="text-sm mt-1 ml-6">Your answer: <span className="font-mono">{answers[k] != null ? qq.o[answers[k]] : '— not answered —'}</span>{!ok && <> · Correct: <span className="font-mono font-semibold">{qq.o[qq.a]}</span></>}</div>
                <div className="text-sm mt-1 ml-6 text-ink-soft">{qq.e} <Link to={`notes-${qq.topic}`} className="underline">Notes</Link></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div><div className="text-xs text-ink-soft font-semibold">{test.title}</div><h1 className="text-2xl font-semibold">Question {i + 1} of {test.qs.length}</h1></div>
        <div className={`chip text-base py-1.5 px-3 ${left < 60 ? 'bg-blush animate-pulse' : 'bg-sun'}`} role="timer" aria-live="off"><LuTimer /> {mm}:{ss}</div>
      </div>
      <div className="grid lg:grid-cols-[1fr_240px] gap-4">
        <div className="sticker p-5">
          <div className="text-[11px] text-ink-soft mb-1">Topic: {LESSON_BY_ID[q.topic].title}</div>
          <p className="font-semibold text-lg mb-4">{q.q}</p>
          <div className="grid gap-2">
            {q.o.map((o, k) => (
              <button key={k} onClick={() => setAnswers({ ...answers, [i]: k })} className={`text-left px-3 py-2.5 rounded-lg border-2 border-ink font-mono text-sm ${answers[i] === k ? 'bg-aqua text-ink font-semibold' : 'hover:bg-mist'}`}>
                <b className="mr-2">{String.fromCharCode(65 + k)}.</b>{o}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-5">
            <button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}><LuArrowLeft /> Previous</button>
            <button className={`btn ${flags[i] ? 'btn-sun' : ''}`} onClick={() => setFlags({ ...flags, [i]: !flags[i] })}><LuFlag /> {flags[i] ? 'Flagged' : 'Flag for review'}</button>
            {i < test.qs.length - 1 ? <button className="btn btn-primary ml-auto" onClick={() => setI(i + 1)}>Next <LuArrowRight /></button>
              : <button className="btn btn-green ml-auto" onClick={submit}><LuCheck /> Submit test</button>}
          </div>
        </div>
        <div className="sticker p-4 h-fit">
          <div className="text-xs font-bold uppercase mb-2">Question palette</div>
          <div className="grid grid-cols-5 gap-1.5">
            {test.qs.map((_, k) => (
              <button key={k} onClick={() => setI(k)} className={`h-9 rounded-md border-2 border-ink text-sm font-bold relative ${k === i ? 'ring-2 ring-ink ring-offset-1' : ''} ${answers[k] != null ? 'bg-aqua' : 'bg-white'}`} aria-label={`Question ${k + 1}${answers[k] != null ? ', answered' : ''}${flags[k] ? ', flagged' : ''}`}>
                {k + 1}{flags[k] && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-sun rounded-full border border-ink" />}
              </button>
            ))}
          </div>
          <div className="text-xs mt-3 text-ink-soft">{Object.keys(answers).length} answered · {Object.values(flags).filter(Boolean).length} flagged</div>
          <button className="btn btn-green w-full justify-center mt-3" onClick={submit}>Submit now</button>
        </div>
      </div>
    </div>
  );
}

export default function MockTest({ kind }) {
  const [seed, setSeed] = useState(0);
  const test = useMemo(() => (kind ? buildTest(kind) : null), [kind, seed]); // eslint-disable-line
  if (!kind || !test || !test.qs.length) return <Picker />;
  return <Runner key={kind + seed} test={test} onRetake={() => { setSeed((s) => s + 1); window.scrollTo({ top: 0 }); }} />;
}
