import { useEffect, useState } from 'react';
import { LuFlame, LuBookOpen, LuTarget, LuStar, LuArrowRight, LuTimer, LuCalendarCheck, LuCheck, LuX } from 'react-icons/lu';
import { Link } from '../lib/router.jsx';
import { useProgress, levelFor, streakOf, today } from '../lib/progress.jsx';
import { useAuth } from '../lib/auth.jsx';
import { TRACKS, ALL_LESSONS, LESSON_BY_ID, MISSIONS, CHALLENGES } from '../data/syllabus.js';
import { dailyQuestion, weakTopics } from '../lib/achievements.js';
import { Mascot, TrackArt, Bar, ProgressRing } from '../components/ui.jsx';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

function NameSetter() {
  const { state, setName } = useProgress();
  const { user, isLoggedIn } = useAuth();
  const [v, setV] = useState('');

  useEffect(() => {
    if (isLoggedIn && user?.name && !state.profile.name) setName(user.name);
  }, [isLoggedIn, user, state.profile.name, setName]);

  if (state.profile.name) return null;
  return (
    <form className="mt-3 flex gap-2 max-w-sm" onSubmit={(e) => { e.preventDefault(); if (v.trim()) setName(v.trim()); }}>
      <input value={v} onChange={(e) => setV(e.target.value)} placeholder="What should we call you?" aria-label="Your name" className="flex-1 px-3 py-2 rounded-lg border-2 border-ink text-sm" />
      <button className="btn btn-sun">Save</button>
    </form>
  );
}

function Stat({ icon: Icon, label, value, color }) {
  return (
    <div className="sticker p-3.5 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl border-2 border-ink grid place-items-center text-lg ${color}`}><Icon /></div>
      <div><div className="font-display text-2xl font-semibold leading-none">{value}</div><div className="text-xs text-ink-soft mt-0.5">{label}</div></div>
    </div>
  );
}

function DailyChallenge() {
  const { state, completeDaily } = useProgress();
  const d = today();
  const q = dailyQuestion(d);
  const done = !!state.daily[d];
  const [pick, setPick] = useState(null);
  const lesson = LESSON_BY_ID[q.topic];
  return (
    <div className="sticker bg-sun-soft p-5 relative overflow-hidden">
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-sun border-2 border-ink opacity-70" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-center gap-2 text-sm font-bold"><LuCalendarCheck /> Daily challenge <span className="chip bg-white">+40 XP</span></div>
        <p className="font-semibold mt-2">{q.q}</p>
        <div className="grid sm:grid-cols-2 gap-2 mt-3">
          {q.o.map((o, k) => {
            const show = pick !== null || done;
            const cls = show ? (k === q.a ? 'bg-leaf-soft border-leaf-dark' : k === pick ? 'bg-blush-soft border-blush-dark' : 'opacity-60') : 'hover:bg-white';
            return (
              <button key={k} disabled={show} onClick={() => { setPick(k); if (k === q.a) completeDaily(); }}
                className={`text-left text-sm font-mono px-3 py-2 rounded-lg border-2 border-ink ${cls}`}>{o}</button>
            );
          })}
        </div>
        {(pick !== null || done) && (
          <div className="text-sm mt-3 anim-rise flex items-start gap-2">
            {(done || pick === q.a) ? <LuCheck className="mt-0.5 text-leaf-dark" /> : <LuX className="mt-0.5 text-blush-dark" />}
            <span>{done && pick === null ? 'You already solved today\'s challenge. Come back tomorrow!' : pick === q.a ? 'Correct! ' + q.e : 'Not this time. ' + q.e + ' Try a new one tomorrow.'}
              {' '}<Link to={`lesson-${q.topic}`} className="underline font-semibold">Review: {lesson?.title}</Link></span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { state } = useProgress();
  const lv = levelFor(state.xp);
  const streak = streakOf(state.activity);
  const completed = Object.keys(state.completedLessons).length;
  const next = ALL_LESSONS.find((l) => !state.completedLessons[l.id]);
  const recent = Object.entries(state.visitedLessons).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([id]) => LESSON_BY_ID[id]).filter(Boolean);
  const weak = weakTopics(state).slice(0, 3);
  const missionsLeft = MISSIONS.filter((m) => !state.missions[m.id]).slice(0, 3);
  const examLessons = ALL_LESSONS.length;
  const examPct = Math.round((Object.keys(state.examNotesRead).length / examLessons) * 100);

  return (
    <div className="space-y-6">
      <section className="grid lg:grid-cols-[1.5fr_1fr] gap-5">
        <div className="sticker p-6 md:p-7 bg-white relative overflow-hidden">
          <div className="absolute inset-0 dotgrid opacity-60" aria-hidden="true" />
          <div className="relative flex gap-5 items-center">
            <Mascot size={110} className="anim-bob hidden sm:block shrink-0" />
            <div>
              <div className="text-sm font-semibold text-tang-dark">{greeting()}{state.profile.name ? `, ${state.profile.name}` : ''}!</div>
              <h1 className="text-3xl md:text-[2.3rem] font-semibold leading-tight mt-1">
                {completed === 0 ? <>Let's write your <span className="squiggle">first line of code</span>.</> : <>Keep going — you're a <span className="squiggle">{lv.name}</span>.</>}
              </h1>
              <p className="text-ink-soft mt-2 text-[15px]">Learn → Understand → Experiment → Play → Practice → Prepare for exams. No experience needed.</p>
              <NameSetter />
              {next && (
                <Link to={`lesson-${next.id}`} className="btn btn-primary mt-4 text-base">
                  {completed === 0 ? 'Start with lesson 1' : 'Continue learning'}: {next.title} <LuArrowRight />
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="sticker p-5 bg-aqua-soft flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-aqua-dark">Level {lv.index}</div>
              <div className="font-display text-2xl font-semibold">{lv.name}</div>
            </div>
            <ProgressRing pct={lv.pct} size={70} color="#176C97" label="to next level" />
          </div>
          <div className="mt-3">
            <Bar pct={lv.pct} color="bg-aqua" />
            <div className="text-xs mt-1.5 text-ink-soft">{lv.next ? `${lv.toNext} XP to ${lv.next.name}` : 'Max level reached!'}</div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
            <div className="rounded-lg bg-white border-2 border-ink p-2"><div className="text-xs text-ink-soft">Total XP</div><div className="font-bold text-lg">{state.xp}</div></div>
            <div className="rounded-lg bg-white border-2 border-ink p-2"><div className="text-xs text-ink-soft">Streak</div><div className="font-bold text-lg flex items-center gap-1"><LuFlame className="text-tang" />{streak} day{streak === 1 ? '' : 's'}</div></div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat icon={LuBookOpen} label="Lessons completed" value={`${completed}/${ALL_LESSONS.length}`} color="bg-tang-soft" />
        <Stat icon={LuTarget} label="Challenges solved" value={`${Object.keys(state.challenges).length}/${CHALLENGES.length}`} color="bg-leaf-soft" />
        <Stat icon={LuStar} label="Missions done" value={`${Object.keys(state.missions).length}/${MISSIONS.length}`} color="bg-sun-soft" />
        <Stat icon={LuTimer} label="Mock tests taken" value={state.mockResults.length} color="bg-blush-soft" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Your learning paths</h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {Object.values(TRACKS).map((t) => {
            const done = t.lessons.filter((l) => state.completedLessons[l.id]).length;
            const pct = Math.round((done / t.lessons.length) * 100);
            return (
              <Link key={t.id} to={`track-${t.id}`} className={`sticker p-4 ${t.soft} hover:-translate-y-1 transition block`}>
                <div className="flex justify-between items-start"><TrackArt track={t.id} size={72} /><span className="chip bg-white">{t.difficulty}</span></div>
                <div className="font-display text-xl font-semibold mt-2">{t.title}</div>
                <div className="text-sm text-ink-soft">{t.tagline}</div>
                <div className="mt-3"><Bar pct={pct} color={`bg-${t.color}`} /><div className="text-xs mt-1">{done}/{t.lessons.length} lessons · {pct}%</div></div>
              </Link>
            );
          })}
          <Link to="exam" className="sticker p-4 bg-leaf-soft hover:-translate-y-1 transition block">
            <div className="flex justify-between items-start"><TrackArt track="exam" size={72} /><span className="chip bg-white">All levels</span></div>
            <div className="font-display text-xl font-semibold mt-2">Exam Preparation</div>
            <div className="text-sm text-ink-soft">Become Exam Ready</div>
            <div className="mt-3"><Bar pct={examPct} color="bg-leaf" /><div className="text-xs mt-1">{Object.keys(state.examNotesRead).length}/{examLessons} notes read</div></div>
          </Link>
        </div>
      </section>

      <section className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <DailyChallenge />
        <div className="sticker p-5">
          <h3 className="font-semibold text-lg mb-2">Recently explored</h3>
          {recent.length === 0 ? <p className="text-sm text-ink-soft">Nothing yet — open any lesson and it will appear here.</p> : (
            <ul className="space-y-1.5">{recent.map((l) => (
              <li key={l.id}><Link to={`lesson-${l.id}`} className="flex items-center gap-2 text-sm hover:underline">
                <span className={`w-2.5 h-2.5 rounded-full bg-${TRACKS[l.track].color} border border-ink`} />{l.title}{state.completedLessons[l.id] && <LuCheck className="text-leaf-dark" />}
              </Link></li>
            ))}</ul>
          )}
          <h3 className="font-semibold text-lg mt-4 mb-2">Upcoming practice tests</h3>
          <ul className="space-y-1.5 text-sm">
            <li><Link to="mock-html" className="hover:underline">HTML test · 10 questions · 10 min</Link></li>
            <li><Link to="mock-css" className="hover:underline">CSS test · 10 questions · 10 min</Link></li>
            <li><Link to="mock-full" className="hover:underline font-semibold">Full syllabus test · 25 questions · 25 min</Link></li>
          </ul>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-5">
        <div className="sticker p-5 bg-tang-soft">
          <h3 className="font-semibold text-lg mb-2">Active missions</h3>
          {missionsLeft.length === 0 ? <p className="text-sm">All missions complete. Legend!</p> : missionsLeft.map((m) => (
            <Link key={m.id} to={m.to} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/60">
              <span className="w-8 h-8 rounded-lg bg-white border-2 border-ink grid place-items-center shrink-0"><LuTarget /></span>
              <span><span className="font-semibold text-sm block">{m.title}: {m.text}</span><span className="text-xs text-ink-soft">{m.how}</span></span>
            </Link>
          ))}
        </div>
        <div className="sticker p-5">
          <h3 className="font-semibold text-lg mb-2">Topics to revise</h3>
          {weak.length === 0 ? <p className="text-sm text-ink-soft">Take a few quizzes and we'll point out the topics that need more practice.</p> : weak.map((w) => (
            <Link key={w.topic} to={`lesson-${w.topic}`} className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-mist">
              <span>{w.lesson.title}</span><span className="chip bg-blush-soft">{w.pct}%</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
