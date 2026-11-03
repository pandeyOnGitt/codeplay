import { useState } from 'react';
import { LuLock, LuCheck, LuPlay } from 'react-icons/lu';
import { Link } from '../lib/router.jsx';
import { useProgress } from '../lib/progress.jsx';
import { TRACKS, LEVELS, isUnlocked, SYLLABUS_MAP, LESSON_BY_ID } from '../data/syllabus.js';
import { PageHeader, Segmented } from '../components/ui.jsx';

const LEVEL_STYLE = { Beginner: 'bg-leaf-soft', Elementary: 'bg-aqua-soft', Intermediate: 'bg-sun-soft', Advanced: 'bg-blush-soft' };

function Node({ l, state, idx }) {
  const done = !!state.completedLessons[l.id];
  const unlocked = isUnlocked(l.id, state.completedLessons);
  const color = TRACKS[l.track].color;
  return (
    <Link to={`lesson-${l.id}`} className={`relative flex items-center gap-3 p-2.5 pr-3 rounded-xl border-2 border-ink bg-white hover:-translate-y-0.5 transition ${!unlocked && !done ? 'opacity-75' : ''}`}
      style={{ marginLeft: idx % 2 ? 28 : 0 }} title={!unlocked && !done ? 'Recommended after the previous lesson — but you can explore it now' : ''}>
      <span className={`w-9 h-9 shrink-0 rounded-full border-2 border-ink grid place-items-center text-sm font-bold ${done ? 'bg-leaf' : unlocked ? `bg-${color}` : 'bg-mist'}`}>
        {done ? <LuCheck /> : unlocked ? <LuPlay /> : <LuLock />}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold truncate">{l.title}</span>
        <span className="block text-[11px] text-ink-soft">{TRACKS[l.track].title} · {l.minutes} min</span>
      </span>
    </Link>
  );
}

export default function Roadmap() {
  const { state } = useProgress();
  const [view, setView] = useState('journey');
  const all = Object.values(TRACKS).flatMap((t) => t.lessons);
  return (
    <div>
      <PageHeader kicker="Your learning journey" title="Learning Roadmap">
        Lessons unlock one after another so you always know what to do next — but nothing is really locked. Curious about Grid before Flexbox? Go ahead and explore.
      </PageHeader>
      <div className="mb-5"><Segmented size="md" value={view} onChange={setView} options={[{ value: 'journey', label: 'Journey by level' }, { value: 'syllabus', label: 'University syllabus map' }]} /></div>

      {view === 'journey' ? (
        <div className="space-y-6">
          {LEVELS.map((lvl, li) => {
            const lessons = all.filter((l) => l.level === lvl);
            const done = lessons.filter((l) => state.completedLessons[l.id]).length;
            return (
              <section key={lvl} className={`sticker p-5 ${LEVEL_STYLE[lvl]}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-ink text-cream grid place-items-center font-display text-lg font-semibold">{li + 1}</span>
                  <div><h2 className="text-xl font-semibold">{lvl}</h2><div className="text-xs text-ink-soft">{done}/{lessons.length} complete</div></div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.values(TRACKS).map((t) => {
                    const ls = lessons.filter((l) => l.track === t.id);
                    if (!ls.length) return <div key={t.id} className="hidden md:block" />;
                    return (
                      <div key={t.id}>
                        <div className="text-xs font-bold uppercase tracking-wide mb-2">{t.title}</div>
                        <div className="space-y-2 relative">
                          <div className="absolute left-[22px] top-4 bottom-4 border-l-[3px] border-dotted border-ink/30" aria-hidden="true" />
                          {ls.map((l, i) => <Node key={l.id} l={l} state={state} idx={i} />)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {SYLLABUS_MAP.map((u, i) => (
            <div key={i} className="sticker p-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="chip bg-mist">{u.course}</span><span className="chip bg-sun-soft">{u.module}</span>
                <h3 className="font-semibold">{u.unit}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {u.lessons.map((id) => {
                  const l = LESSON_BY_ID[id];
                  return (
                    <Link key={id} to={`lesson-${id}`} className={`text-sm px-2.5 py-1 rounded-lg border-2 border-ink ${state.completedLessons[id] ? 'bg-leaf-soft' : 'bg-white hover:bg-mist'}`}>
                      {state.completedLessons[id] ? '✓ ' : ''}{l.title}
                    </Link>
                  );
                })}
                {u.projects && <Link to="projects" className="text-sm px-2.5 py-1 rounded-lg border-2 border-ink bg-tang-soft">Mini projects →</Link>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
