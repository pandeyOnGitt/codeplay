import { LuCheck, LuLock } from 'react-icons/lu';
import { Link } from '../lib/router.jsx';
import { useProgress } from '../lib/progress.jsx';
import { BADGES } from '../lib/achievements.js';
import { MISSIONS } from '../data/syllabus.js';
import { PageHeader } from '../components/ui.jsx';

function Badge({ b, earned }) {
  return (
    <div className={`sticker p-4 text-center ${earned ? 'bg-white' : 'bg-mist'} ${earned ? 'anim-pop' : ''}`}>
      <svg viewBox="0 0 80 80" className={`w-20 h-20 mx-auto ${earned ? '' : 'grayscale opacity-40'}`} aria-hidden="true">
        <path d="M40 4 L50 12 L63 11 L66 24 L76 32 L70 44 L73 57 L61 62 L55 74 L42 70 L29 75 L22 63 L10 58 L12 45 L5 33 L15 25 L17 12 L30 13 Z" fill={b.color} stroke="#30343B" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="40" cy="40" r="22" fill="#FFF9EF" stroke="#30343B" strokeWidth="2.5" />
        <text x="40" y="46" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize={b.icon.length > 2 ? 13 : 17} fill="#30343B">{b.icon}</text>
      </svg>
      <div className="font-semibold mt-2 flex items-center justify-center gap-1">{earned ? <LuCheck className="text-leaf-dark" /> : <LuLock className="text-ink-soft" />}{b.title}</div>
      <div className="text-xs text-ink-soft">{b.desc}</div>
    </div>
  );
}

export default function Achievements() {
  const { state } = useProgress();
  const earned = BADGES.filter((b) => b.check(state));
  return (
    <div>
      <PageHeader kicker={`${earned.length} of ${BADGES.length} badges`} title="Achievements">Badges unlock automatically as you learn. Missions give a bonus +100 XP.</PageHeader>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {BADGES.map((b) => <Badge key={b.id} b={b} earned={b.check(state)} />)}
      </div>
      <h2 className="text-xl font-semibold mb-3">Missions</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {MISSIONS.map((m) => {
          const done = !!state.missions[m.id];
          return (
            <Link key={m.id} to={m.to} className={`sticker p-4 flex gap-3 items-start ${done ? 'bg-leaf-soft' : 'bg-white hover:-translate-y-0.5 transition'}`}>
              <span className={`w-10 h-10 rounded-xl border-2 border-ink grid place-items-center shrink-0 ${done ? 'bg-leaf' : 'bg-sun-soft'}`}>{done ? <LuCheck /> : <LuLock />}</span>
              <span><span className="font-semibold block">{m.title}</span><span className="text-sm block">{m.text}</span><span className="text-xs text-ink-soft">{done ? `Completed ${new Date(state.missions[m.id]).toLocaleDateString()}` : m.how}</span></span>
            </Link>
          );
        })}
      </div>
      <p className="text-xs text-ink-soft mt-6">Leaderboards are ready to switch on once accounts are added — progress is already stored in a backend-friendly format.</p>
    </div>
  );
}
