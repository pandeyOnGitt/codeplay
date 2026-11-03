import { useState } from 'react';
import { LuFlame, LuDownload, LuTrash2, LuBookmark } from 'react-icons/lu';
import { Link } from '../lib/router.jsx';
import { useProgress, levelFor, streakOf, today, LEVELS } from '../lib/progress.jsx';
import { TRACKS, ALL_LESSONS, LESSON_BY_ID, LABS, CHALLENGES } from '../data/syllabus.js';
import { PROJECTS } from '../data/projects.js';
import { topicStats, weakTopics } from '../lib/achievements.js';
import { PageHeader, ProgressRing, Bar, Empty } from '../components/ui.jsx';
import { downloadFile, copyText } from '../components/CodeLab.jsx';

/** Small hand-rolled SVG bar chart (no chart library needed). */
function BarChart({ data, color = '#FF8A3D', height = 160, unit = '' }) {
  const max = Math.max(1, ...data.map((d) => d.v));
  const w = 100 / data.length;
  return (
    <svg viewBox={`0 0 100 ${height / 3}`} className="w-full" style={{ height }} role="img" aria-label="Bar chart">
      {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2="100" y1={(height / 3 - 8) * (1 - g)} y2={(height / 3 - 8) * (1 - g)} stroke="#E6E1D6" strokeWidth="0.2" />)}
      {data.map((d, i) => {
        const h = ((height / 3 - 8) * d.v) / max;
        return (
          <g key={i}>
            <rect x={i * w + w * 0.18} y={height / 3 - 8 - h} width={w * 0.64} height={Math.max(h, 0.3)} rx="0.8" fill={d.v ? color : '#E6E1D6'} stroke="#30343B" strokeWidth={d.v ? 0.25 : 0}>
              <title>{d.label}: {d.v}{unit}</title>
            </rect>
            <text x={i * w + w / 2} y={height / 3 - 3} textAnchor="middle" fontSize="2.3" fill="#5B616B">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Progress() {
  const p = useProgress();
  const { state } = p;
  const [confirm, setConfirm] = useState(false);
  const lv = levelFor(state.xp);
  const streak = streakOf(state.activity);
  const days = Array.from({ length: 14 }, (_, k) => { const d = new Date(); d.setDate(d.getDate() - (13 - k)); const key = today(d); return { label: d.getDate() + '/' + (d.getMonth() + 1), v: state.activity[key] || 0, key }; });
  const stats = topicStats(state);
  const quizData = Object.entries(stats).filter(([t]) => LESSON_BY_ID[t]).slice(0, 14).map(([t, s]) => ({ label: LESSON_BY_ID[t].title.split(' ')[0], v: Math.round((s.right / s.total) * 100) }));
  const weak = weakTopics(state);
  const bookmarks = Object.keys(state.bookmarks).map((id) => LESSON_BY_ID[id]).filter(Boolean);
  const heat = Array.from({ length: 35 }, (_, k) => { const d = new Date(); d.setDate(d.getDate() - (34 - k)); return state.activity[today(d)] || 0; });
  const totals = [
    ['Lessons', Object.keys(state.completedLessons).length, ALL_LESSONS.length, 'bg-tang'],
    ['Experiments', Object.values(state.experiments).filter((e) => e.done).length, LABS.length, 'bg-aqua'],
    ['Challenges', Object.keys(state.challenges).length, CHALLENGES.length, 'bg-leaf'],
    ['Projects', Object.values(state.projects).filter((x) => x.done).length, PROJECTS.length, 'bg-sun'],
    ['Exam notes read', Object.keys(state.examNotesRead).length, ALL_LESSONS.length, 'bg-blush'],
  ];
  return (
    <div className="space-y-6">
      <PageHeader kicker="Saved in this browser" title="My Progress">Everything you do is saved automatically. Use export to back up your progress.</PageHeader>
      <section className="grid md:grid-cols-[1fr_1.4fr] gap-5">
        <div className="sticker p-5 bg-aqua-soft">
          <div className="flex items-center gap-4">
            <ProgressRing pct={lv.pct} size={90} stroke={9} color="#176C97" />
            <div><div className="text-xs font-bold uppercase text-aqua-dark">Level {lv.index} of {LEVELS.length}</div><div className="font-display text-2xl font-semibold">{lv.name}</div><div className="text-sm">{state.xp} XP{lv.next && ` · ${lv.toNext} to go`}</div></div>
          </div>
          <div className="flex items-center gap-2 mt-4 font-semibold"><LuFlame className="text-tang text-xl" /> {streak}-day streak</div>
          <div className="grid grid-cols-7 gap-1 mt-2" aria-label="Activity in the last 5 weeks">
            {heat.map((v, k) => <div key={k} title={`${v} XP`} className="aspect-square rounded border border-ink/20" style={{ background: v === 0 ? '#fff' : v < 60 ? '#FFE3CF' : v < 150 ? '#FFB27D' : '#FF8A3D' }} />)}
          </div>
          <div className="text-[11px] text-ink-soft mt-1">Last 5 weeks — darker = more XP that day</div>
        </div>
        <div className="sticker p-5">
          <h3 className="font-semibold mb-2">XP earned in the last 14 days</h3>
          <BarChart data={days} unit=" XP" />
        </div>
      </section>
      <section className="sticker p-5">
        <h3 className="font-semibold mb-3">Completion</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {totals.map(([l, v, t, c]) => <div key={l}><div className="flex justify-between text-sm font-semibold"><span>{l}</span><span>{v}/{t}</span></div><Bar pct={(v / t) * 100} color={c} className="mt-1" /></div>)}
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-5">
          {Object.values(TRACKS).map((t) => {
            const done = t.lessons.filter((l) => state.completedLessons[l.id]).length;
            return <div key={t.id} className={`rounded-xl border-2 border-ink p-3 ${t.soft} flex items-center gap-3`}><ProgressRing pct={Math.round((done / t.lessons.length) * 100)} color={t.hex} /><div><div className="font-semibold">{t.title}</div><div className="text-xs">{done} of {t.lessons.length} lessons</div></div></div>;
          })}
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-5">
        <div className="sticker p-5">
          <h3 className="font-semibold mb-2">Quiz & test accuracy by topic</h3>
          {quizData.length === 0 ? <Empty title="No quiz data yet">Take a lesson quiz or a mock test.</Empty> : <BarChart data={quizData} color="#55B9E8" unit="%" />}
        </div>
        <div className="sticker p-5 bg-blush-soft">
          <h3 className="font-semibold mb-2">Weak topics (below 60%)</h3>
          {weak.length === 0 ? <p className="text-sm">No weak topics detected. Take more quizzes to get a clearer picture.</p> : (
            <ul className="space-y-1.5">{weak.map((w) => <li key={w.topic} className="flex items-center justify-between bg-white rounded-lg border-2 border-ink px-3 py-1.5 text-sm"><Link to={`lesson-${w.topic}`} className="hover:underline">{w.lesson.title}</Link><span className="flex gap-2 items-center"><b>{w.pct}%</b><Link to={`notes-${w.topic}`} className="chip bg-sun-soft">notes</Link></span></li>)}</ul>
          )}
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-5">
        <div className="sticker p-5">
          <h3 className="font-semibold mb-2 flex items-center gap-2"><LuBookmark /> Bookmarked topics</h3>
          {bookmarks.length === 0 ? <p className="text-sm text-ink-soft">Use the Bookmark button on any lesson to save it here.</p> : <ul className="space-y-1">{bookmarks.map((l) => <li key={l.id}><Link to={`lesson-${l.id}`} className="text-sm hover:underline">{l.title}</Link></li>)}</ul>}
        </div>
        <div className="sticker p-5">
          <h3 className="font-semibold mb-2">Recent XP</h3>
          <ul className="text-sm space-y-1 max-h-48 overflow-auto">{[...state.xpLog].reverse().slice(0, 15).map((x, i) => <li key={i} className="flex justify-between border-b border-mist py-0.5"><span className="truncate">{x.reason}</span><b className="text-tang-dark">+{x.amount}</b></li>)}{state.xpLog.length === 0 && <li className="text-ink-soft">Nothing yet.</li>}</ul>
        </div>
      </section>
      <section className="sticker p-5 flex flex-wrap gap-2 items-center">
        <span className="text-sm font-semibold mr-auto">Your data</span>
        <button className="btn" onClick={() => copyText(p.exportJSON())}>Copy progress JSON</button>
        <button className="btn" onClick={() => downloadFile('codeplay-progress.json', p.exportJSON(), 'application/json')}><LuDownload /> Export</button>
        {confirm ? <><span className="text-sm">Erase everything?</span><button className="btn bg-blush" onClick={() => { p.reset(); setConfirm(false); }}>Yes, reset</button><button className="btn" onClick={() => setConfirm(false)}>Cancel</button></>
          : <button className="btn bg-blush-soft" onClick={() => setConfirm(true)}><LuTrash2 /> Reset progress</button>}
      </section>
    </div>
  );
}
