import { useMemo, useState } from 'react';
import { LuCheck, LuTarget } from 'react-icons/lu';
import { useProgress } from '../lib/progress.jsx';
import { CHALLENGES, LESSON_BY_ID, MCQS, TRACKS, ALL_LESSONS } from '../data/syllabus.js';
import { PageHeader, Segmented } from '../components/ui.jsx';
import CodeLab from '../components/CodeLab.jsx';
import Quiz from '../components/Quiz.jsx';

function Challenges() {
  const { state, solveChallenge } = useProgress();
  const [cid, setCid] = useState(CHALLENGES[0].id);
  const c = CHALLENGES.find((x) => x.id === cid);
  const tabs = [...(c.starter.html !== undefined || !c.starter.js ? ['html'] : []), ...(c.starter.css !== undefined ? ['css'] : []), ...(c.starter.js !== undefined ? ['js'] : [])];
  if (tabs.length === 0) tabs.push('html');
  const onTests = (r) => {
    if (r.length && r.every((x) => x.ok)) solveChallenge(c.id, c.title);
  };
  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-4">
      <div className="sticker p-3 h-fit max-h-[640px] overflow-auto">
        <div className="text-xs font-bold uppercase mb-2">Coding challenges · {Object.keys(state.challenges).length}/{CHALLENGES.length}</div>
        {CHALLENGES.map((x) => (
          <button key={x.id} onClick={() => setCid(x.id)} className={`w-full text-left px-2 py-1.5 rounded-lg mb-1 text-sm flex items-start gap-2 ${x.id === cid ? 'bg-ink text-cream' : 'hover:bg-mist'}`}>
            <span className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 grid place-items-center text-[9px] ${state.challenges[x.id] ? 'bg-leaf border-ink text-ink' : 'border-current'}`}>{state.challenges[x.id] && <LuCheck />}</span>
            <span><span className="block font-semibold">{x.title}</span><span className="text-[11px] opacity-75">{x.level} · {LESSON_BY_ID[x.topic]?.title}</span></span>
          </button>
        ))}
      </div>
      <div className="space-y-3 min-w-0">
        <div className="sticker p-4 bg-sun-soft">
          <div className="flex items-center gap-2 font-semibold"><LuTarget /> {c.title} {state.challenges[c.id] && <span className="chip bg-leaf"><LuCheck /> solved</span>}</div>
          <p className="text-sm mt-1">{c.task}</p>
          <p className="text-[11px] text-ink-soft mt-1">Checks run automatically each time your code runs. All green = solved (+40 XP).</p>
        </div>
        <CodeLab key={c.id} initial={c.starter} tabs={tabs} tests={c.tests} onTests={onTests} height={360} />
      </div>
    </div>
  );
}

function TopicPractice() {
  const [track, setTrack] = useState('html');
  const [topic, setTopic] = useState('all');
  const lessons = ALL_LESSONS.filter((l) => l.track === track);
  const qs = useMemo(() => {
    const pool = MCQS.filter((q) => q.track === track && (topic === 'all' || q.topic === topic));
    return [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
  }, [track, topic]);
  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-4">
      <div className="sticker p-4 space-y-3 h-fit">
        <Segmented value={track} onChange={(v) => { setTrack(v); setTopic('all'); }} options={Object.values(TRACKS).map((t) => ({ value: t.id, label: t.title }))} />
        <label className="block text-sm font-semibold">Topic
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full mt-1 border-2 border-ink rounded-lg px-2 py-1 text-sm font-normal">
            <option value="all">All {TRACKS[track].title} topics (random 10)</option>
            {lessons.map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}
          </select>
        </label>
        <p className="text-xs text-ink-soft">Scores feed your weak-topic report on the progress page.</p>
      </div>
      <div className="sticker p-5"><Quiz key={track + topic} questions={qs} topic={topic === 'all' ? `${track}-mixed` : topic} title="Practice set" /></div>
    </div>
  );
}

export default function Practice() {
  const [tab, setTab] = useState('code');
  return (
    <div>
      <PageHeader kicker="Practice makes permanent" title="Practice Questions">
        Auto-checked coding challenges and topic-wise multiple-choice practice. Every question is mapped to a syllabus topic.
      </PageHeader>
      <div className="mb-4"><Segmented size="md" value={tab} onChange={setTab} options={[{ value: 'code', label: 'Coding challenges' }, { value: 'mcq', label: 'Topic MCQs' }]} /></div>
      {tab === 'code' ? <Challenges /> : <TopicPractice />}
    </div>
  );
}
