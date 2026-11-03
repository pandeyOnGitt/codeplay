import { useEffect, useMemo, useState } from 'react';
import { LuCheck, LuArrowLeft, LuBookOpen, LuListChecks, LuFileText, LuTimer, LuBrain } from 'react-icons/lu';
import { Link, useRouter } from '../lib/router.jsx';
import { useProgress } from '../lib/progress.jsx';
import { ALL_LESSONS, LESSON_BY_ID, TRACKS, EXTRA_QUESTIONS, CHEATS, CONFUSED, SYLLABUS_MAP } from '../data/syllabus.js';
import { PageHeader, Segmented, Reveal, Empty, Bar } from '../components/ui.jsx';
import { Diagram } from '../components/widgets.jsx';
import { SyntaxBlock } from './Lesson.jsx';
import { rich } from '../components/rich.jsx';

const TABS = [
  { value: 'notes', label: 'Exam-ready notes' },
  { value: 'bank', label: 'Question bank' },
  { value: 'revision', label: 'Revision mode' },
];

function NotesIndex() {
  const { state } = useProgress();
  return (
    <div className="space-y-5">
      {SYLLABUS_MAP.map((u, i) => (
        <section key={i}>
          <h3 className="font-semibold mb-2"><span className="chip bg-mist mr-2">{u.module}</span>{u.unit} <span className="text-xs text-ink-soft font-normal">· {u.course}</span></h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {u.lessons.map((id) => {
              const l = LESSON_BY_ID[id];
              return (
                <Link key={id} to={`notes-${id}`} className={`rounded-xl border-2 border-ink p-3 hover:-translate-y-0.5 transition ${state.examNotesRead[id] ? 'bg-leaf-soft' : 'bg-white'}`}>
                  <div className="text-sm font-semibold flex items-center gap-1">{state.examNotesRead[id] && <LuCheck className="text-leaf-dark" />}{l.title}</div>
                  <div className="text-[11px] text-ink-soft">{l.examQs.length} exam questions · {TRACKS[l.track].title}</div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export function ExamNotes({ id }) {
  const l = LESSON_BY_ID[id];
  const { markNotesRead } = useProgress();
  useEffect(() => { if (l) markNotesRead(l.id); }, [id]); // eslint-disable-line
  if (!l) return <Empty title="Notes not found">Pick a topic from Exam Preparation.</Empty>;
  const e = l.exam;
  const i = ALL_LESSONS.indexOf(l);
  const prev = ALL_LESSONS[i - 1]; const next = ALL_LESSONS[i + 1];
  const lang = l.syntaxLang || (l.track === 'js' ? 'js' : l.track === 'css' ? 'css' : 'html');
  return (
    <article className="max-w-4xl">
      <nav className="text-xs text-ink-soft mb-3"><Link to="exam" className="hover:underline inline-flex items-center gap-1"><LuArrowLeft /> Exam Preparation</Link> / {TRACKS[l.track].title}</nav>
      <header className="sticker p-6 bg-white paper-lines mb-5">
        <span className="chip bg-sun-soft">Exam-ready notes</span>
        <h1 className="text-3xl font-semibold mt-2">{l.title}</h1>
        <p className="text-xs font-mono text-ink-soft mt-1">{l.syllabus}</p>
        <div className="flex gap-2 mt-3"><Link to={`lesson-${l.id}`} className="btn"><LuBookOpen /> Interactive lesson</Link><Link to={`mock-${l.id}`} className="btn btn-blue"><LuTimer /> Topic test</Link></div>
      </header>
      <div className="space-y-5">
        <section className="sticker p-5"><h2 className="text-lg font-semibold mb-2">1. Definition</h2><p className="leading-relaxed italic border-l-4 border-tang pl-3">{e.definition}</p></section>
        <section className="sticker p-5"><h2 className="text-lg font-semibold mb-2">2. Explanation</h2><p className="leading-relaxed">{rich(l.definition)}</p><p className="leading-relaxed mt-2">{rich(l.why)}</p></section>
        <section className="sticker p-5"><h2 className="text-lg font-semibold mb-2">3. Syntax / example code</h2><SyntaxBlock code={l.syntax} lang={lang} />
          {l.live?.js && l.steps && <><div className="text-sm font-semibold mt-3">Example program</div><SyntaxBlock code={l.live.js} lang="js" /><div className="text-sm font-semibold mt-2">Expected output</div><pre className="bg-[#22252B] text-[#E9E4D8] rounded-xl p-3 text-[13px] font-mono">{l.steps.filter((s) => s.out).map((s) => s.out).join('\n')}</pre></>}
        </section>
        {e.diagram && <section className="sticker p-5"><h2 className="text-lg font-semibold mb-2">4. Diagram</h2><Diagram name={e.diagram} /><p className="text-xs text-ink-soft">Practise drawing this neatly — diagrams earn marks in 5 and 10-mark answers.</p></section>}
        <section className="sticker p-5 bg-sun-soft"><h2 className="text-lg font-semibold mb-2">Important points to remember</h2><ul className="list-disc pl-5 space-y-1.5">{e.points.map((p, k) => <li key={k}>{p}</li>)}</ul></section>
        {e.diff && (
          <section className="sticker p-5 overflow-auto"><h2 className="text-lg font-semibold mb-2">Important difference: {e.diff.title}</h2>
            <table className="w-full text-sm border-collapse"><thead><tr>{e.diff.head.map((h, k) => <th key={k} className="border-2 border-ink bg-aqua-soft px-3 py-1.5 text-left">{h}</th>)}</tr></thead>
              <tbody>{e.diff.rows.map((r, k) => <tr key={k}>{r.map((c, j) => <td key={j} className="border-2 border-ink px-3 py-1.5">{c}</td>)}</tr>)}</tbody></table>
          </section>
        )}
        {(e.adv || e.disadv) && (
          <section className="grid md:grid-cols-2 gap-4">
            {e.adv && <div className="sticker p-5 bg-leaf-soft"><h2 className="text-lg font-semibold mb-2">Advantages</h2><ul className="list-disc pl-5 space-y-1">{e.adv.map((x, k) => <li key={k}>{x}</li>)}</ul></div>}
            {e.disadv && <div className="sticker p-5 bg-blush-soft"><h2 className="text-lg font-semibold mb-2">Disadvantages</h2><ul className="list-disc pl-5 space-y-1">{e.disadv.map((x, k) => <li key={k}>{x}</li>)}</ul></div>}
          </section>
        )}
        {e.applications && <section className="sticker p-5"><h2 className="text-lg font-semibold mb-2">Practical applications</h2><ul className="list-disc pl-5 space-y-1">{e.applications.map((x, k) => <li key={k}>{x}</li>)}</ul></section>}
        <section className="sticker p-5"><h2 className="text-lg font-semibold mb-3">Expected exam questions</h2>
          <div className="space-y-3">{l.examQs.map((q, k) => (
            <div key={k} className="border-b-2 border-dashed border-ink/15 pb-3"><div className="flex gap-2"><span className="chip bg-sun shrink-0">{q.m}M</span><b>{q.q}</b></div><div className="mt-1 ml-1"><Reveal label="Model answer"><p className="text-sm bg-mist rounded-lg p-3">{q.a}</p></Reveal></div></div>
          ))}</div>
        </section>
        <section className="sticker p-5 bg-tang-soft"><h2 className="text-lg font-semibold mb-2">Last-minute revision</h2><ul className="grid sm:grid-cols-2 gap-2">{l.revision.map((x, k) => <li key={k} className="bg-white rounded-lg border-2 border-ink px-3 py-1.5 text-sm">{x}</li>)}</ul></section>
        <div className="flex justify-between gap-2">
          {prev ? <Link to={`notes-${prev.id}`} className="btn">← {prev.title}</Link> : <span />}
          {next && <Link to={`notes-${next.id}`} className="btn btn-primary">{next.title} →</Link>}
        </div>
      </div>
    </article>
  );
}

const BANK_TYPES = [
  { value: '1', label: '1 mark' }, { value: '2', label: '2 marks' }, { value: '3', label: '3 marks' }, { value: '5', label: '5 marks' }, { value: '10', label: '10 marks' },
  { value: 'program', label: 'Programming' }, { value: 'output', label: 'Output prediction' }, { value: 'debug', label: 'Debugging' }, { value: 'practical', label: 'Practical' },
];

function QuestionBank() {
  const [type, setType] = useState('2');
  const [track, setTrack] = useState('all');
  const list = useMemo(() => {
    const fromLessons = ALL_LESSONS.flatMap((l) => l.examQs.map((q) => ({ ...q, topic: l.id, track: l.track, type: String(q.m) })));
    const extra = EXTRA_QUESTIONS.map((q) => ({ ...q, track: LESSON_BY_ID[q.topic].track }));
    return [...fromLessons, ...extra].filter((q) => q.type === type && (track === 'all' || q.track === track));
  }, [type, track]);
  const counts = useMemo(() => {
    const c = {};
    ALL_LESSONS.forEach((l) => l.examQs.forEach((q) => { c[q.m] = (c[q.m] || 0) + 1; }));
    EXTRA_QUESTIONS.forEach((q) => { c[q.type] = (c[q.type] || 0) + 1; });
    return c;
  }, []);
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {BANK_TYPES.map((t) => <button key={t.value} onClick={() => setType(t.value)} className={`chip py-1 px-3 ${type === t.value ? 'bg-ink text-cream' : 'bg-white'}`}>{t.label} <span className="opacity-60">({counts[t.value] || 0})</span></button>)}
      </div>
      <div className="mb-4"><Segmented value={track} onChange={setTrack} options={[{ value: 'all', label: 'All subjects' }, ...Object.values(TRACKS).map((t) => ({ value: t.id, label: t.title }))]} /></div>
      {list.length === 0 ? <Empty title="No questions for this filter">Try another mark category or subject.</Empty> : (
        <ol className="space-y-3">
          {list.map((q, i) => (
            <li key={i} className="sticker p-4">
              <div className="flex flex-wrap items-start gap-2">
                <span className="font-display font-semibold text-ink-soft">Q{i + 1}.</span>
                <span className="font-semibold flex-1 min-w-[200px] whitespace-pre-wrap">{q.q}</span>
                <Link to={`notes-${q.topic}`} className="chip bg-mist hover:bg-sun-soft">{LESSON_BY_ID[q.topic].title}</Link>
              </div>
              <div className="mt-2"><Reveal label="Show answer"><p className="text-sm bg-mist rounded-lg p-3 whitespace-pre-wrap font-[inherit]">{q.a}</p></Reveal></div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function Revision() {
  const [sheet, setSheet] = useState('css');
  const [flip, setFlip] = useState({});
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><LuFileText /> Cheat sheets</h3>
        <Segmented value={sheet} onChange={setSheet} options={[{ value: 'html', label: 'HTML tags' }, { value: 'css', label: 'CSS properties' }, { value: 'js', label: 'JavaScript methods' }]} />
        <div className="sticker mt-3 overflow-hidden">
          <table className="w-full text-sm">
            <tbody>{CHEATS[sheet].map(([k, v], i) => <tr key={i} className={i % 2 ? 'bg-mist' : 'bg-white'}><td className="px-3 py-1.5 font-mono text-[12.5px] w-1/2 border-r-2 border-ink/10">{k}</td><td className="px-3 py-1.5">{v}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
      <section>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><LuBrain /> Frequently confused concepts <span className="text-sm font-normal text-ink-soft">— tap a card to flip</span></h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CONFUSED.map(([a, b], i) => (
            <button key={i} onClick={() => setFlip({ ...flip, [i]: !flip[i] })} className={`sticker p-4 text-left min-h-[110px] transition ${flip[i] ? 'bg-leaf-soft' : 'bg-sun-soft hover:-translate-y-0.5'}`} aria-pressed={!!flip[i]}>
              {flip[i] ? <span className="text-sm anim-rise block">{b}</span> : <span className="font-display text-lg font-semibold">{a}</span>}
            </button>
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><LuListChecks /> Important definitions & last-minute notes</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {ALL_LESSONS.map((l) => (
            <div key={l.id} className="sticker p-4">
              <Link to={`notes-${l.id}`} className="font-semibold hover:underline">{l.title}</Link>
              <ul className="text-sm mt-1 space-y-0.5 list-disc pl-5">{l.revision.slice(0, 4).map((r, k) => <li key={k}>{r}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function Exam({ tab }) {
  const { navigate } = useRouter();
  const t = TABS.some((x) => x.value === tab) ? tab : 'notes';
  const { state } = useProgress();
  const read = Object.keys(state.examNotesRead).length;
  return (
    <div>
      <PageHeader kicker="B.Tech university exams" title="Exam Preparation" color="leaf">
        Notes written in examination language, a question bank sorted by marks, cheat sheets and revision cards — every item mapped to your syllabus.
        <div className="max-w-md mt-3"><Bar pct={(read / ALL_LESSONS.length) * 100} color="bg-leaf" /><div className="text-xs mt-1">{read}/{ALL_LESSONS.length} topic notes read</div></div>
      </PageHeader>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <Segmented size="md" value={t} onChange={(v) => navigate(`exam-${v}`)} options={TABS} />
        <Link to="mock" className="btn btn-blue"><LuTimer /> Mock tests</Link>
      </div>
      {t === 'notes' && <NotesIndex />}
      {t === 'bank' && <QuestionBank />}
      {t === 'revision' && <Revision />}
    </div>
  );
}
