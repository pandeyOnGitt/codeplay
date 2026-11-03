import { LuCheck, LuClock, LuFlaskConical, LuArrowRight } from 'react-icons/lu';
import { Link } from '../lib/router.jsx';
import { useProgress } from '../lib/progress.jsx';
import { TRACKS, LABS } from '../data/syllabus.js';
import { PageHeader, TrackArt, Bar, Empty } from '../components/ui.jsx';

const INTRO = {
  html: 'HTML is where every website begins. You will learn to describe pages with tags — headings, links, images, tables and forms — and finish with semantic, accessible HTML and Git for saving your work.',
  css: 'CSS turns structure into design. Every property here has a live playground: drag sliders, switch values and see exactly what changes — from colours and the box model to Flexbox, Grid and animation.',
  js: 'JavaScript makes pages react. We start slowly with variables and decisions, step through programs line by line, then build up to the DOM, events and talking to servers.',
};

export default function Track({ id }) {
  const t = TRACKS[id];
  const { state } = useProgress();
  if (!t) return <Empty title="Unknown track">Pick HTML, CSS or JavaScript from the sidebar.</Empty>;
  const groups = [...new Set(t.lessons.map((l) => l.group))];
  const done = t.lessons.filter((l) => state.completedLessons[l.id]).length;
  const next = t.lessons.find((l) => !state.completedLessons[l.id]);
  const labs = LABS.filter((l) => l.track === id);
  return (
    <div>
      <PageHeader kicker={`${t.lessons.length} lessons · ${t.difficulty}`} title={`${t.title} — ${t.tagline}`} color={t.color} art={<TrackArt track={id} size={120} />}>
        {INTRO[id]}
        <div className="mt-4 max-w-md"><Bar pct={(done / t.lessons.length) * 100} color={`bg-${t.color}`} /><div className="text-xs mt-1">{done} of {t.lessons.length} complete</div></div>
        {next && <Link to={`lesson-${next.id}`} className="btn btn-primary mt-4">{done ? 'Continue' : 'Start'}: {next.title} <LuArrowRight /></Link>}
      </PageHeader>
      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-5">
          {groups.map((g) => (
            <section key={g}>
              <h2 className="text-lg font-semibold mb-2">{g}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {t.lessons.filter((l) => l.group === g).map((l) => {
                  const n = t.lessons.indexOf(l) + 1;
                  const isDone = !!state.completedLessons[l.id];
                  return (
                    <Link key={l.id} to={`lesson-${l.id}`} className={`sticker p-4 hover:-translate-y-0.5 transition block ${isDone ? 'bg-leaf-soft' : 'bg-white'}`}>
                      <div className="flex items-center gap-2 text-xs text-ink-soft font-semibold">
                        <span className={`w-6 h-6 rounded-md border-2 border-ink grid place-items-center text-ink ${isDone ? 'bg-leaf' : t.soft}`}>{isDone ? <LuCheck /> : n}</span>
                        {l.level} · <LuClock /> {l.minutes} min
                      </div>
                      <div className="font-semibold mt-2">{l.title}</div>
                      <div className="text-sm text-ink-soft mt-0.5">{l.summary}</div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
        <aside className="space-y-3">
          <div className="sticker p-4 bg-sun-soft">
            <h3 className="font-semibold flex items-center gap-2"><LuFlaskConical /> {t.title} experiments</h3>
            <ul className="mt-2 space-y-1">
              {labs.map((l) => (
                <li key={l.id}><Link to={`lab-${l.id}`} className="text-sm hover:underline flex items-center gap-1">{state.experiments[l.id]?.done && <LuCheck className="text-leaf-dark" />}{l.title}</Link></li>
              ))}
            </ul>
          </div>
          <div className="sticker p-4">
            <h3 className="font-semibold">Test yourself</h3>
            <p className="text-sm text-ink-soft mt-1">A timed {t.title} mock test with explanations.</p>
            <Link to={`mock-${id}`} className="btn btn-blue mt-3">Take the {t.title} test</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
