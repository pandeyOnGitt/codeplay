import { LuCheck, LuTarget } from 'react-icons/lu';
import { Link } from '../lib/router.jsx';
import { useProgress } from '../lib/progress.jsx';
import { LABS, TRACKS, MISSIONS } from '../data/syllabus.js';
import { PageHeader, TrackArt } from '../components/ui.jsx';

const LAB_ART = {
  'page-builder': '▤', 'tag-explorer': '<?>', 'structure-builder': '⇅', 'form-builder': '☑', 'fix-html': '✚', 'css-lab': '◐', 'box-model': '▣', positioning: '✥',
  'z-index': '◧', flexbox: '⇆', grid: '▦', display: '◫', animation: '↻', responsive: '▯▭', variables: 'x=', predict: '?', scope: '{ }', 'function-machine': 'ƒ', array: '[ ]', dom: '</>', events: '↯', 'event-loop': '⟳',
};

export default function PlayHub() {
  const { state } = useProgress();
  return (
    <div>
      <PageHeader kicker={`${LABS.length} experiments`} title="Play & Experiment">
        Hands-on labs where you change things and instantly see what happens. Every experiment you explore earns XP — and some unlock missions.
      </PageHeader>
      <section className="sticker p-5 bg-tang-soft mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><LuTarget /> Missions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MISSIONS.map((m) => {
            const done = !!state.missions[m.id];
            return (
              <Link key={m.id} to={m.to} className={`rounded-xl border-2 border-ink p-3 block hover:-translate-y-0.5 transition ${done ? 'bg-leaf-soft' : 'bg-white'}`}>
                <div className="font-semibold text-sm flex items-center gap-1">{done && <LuCheck className="text-leaf-dark" />}{m.title}</div>
                <div className="text-xs text-ink-soft mt-0.5">{m.text}</div>
                <div className="text-[11px] mt-1 font-semibold">{done ? 'Completed · +100 XP' : m.how}</div>
              </Link>
            );
          })}
        </div>
      </section>
      {Object.values(TRACKS).map((t) => (
        <section key={t.id} className="mb-6">
          <div className="flex items-center gap-3 mb-3"><TrackArt track={t.id} size={44} /><h2 className="text-xl font-semibold">{t.title} Play Mode</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {LABS.filter((l) => l.track === t.id).map((l) => {
              const done = !!state.experiments[l.id]?.done;
              return (
                <Link key={l.id} to={`lab-${l.id}`} className="sticker p-4 bg-white hover:-translate-y-0.5 transition flex gap-3 anim-wiggle">
                  <span className={`w-12 h-12 shrink-0 rounded-xl border-2 border-ink grid place-items-center font-mono font-bold ${t.soft}`}>{LAB_ART[l.id]}</span>
                  <span>
                    <span className="font-semibold flex items-center gap-1">{l.title}{done && <LuCheck className="text-leaf-dark" />}</span>
                    <span className="text-sm text-ink-soft block">{l.blurb}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
