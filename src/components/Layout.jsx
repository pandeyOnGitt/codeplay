import { useEffect, useMemo, useRef, useState } from 'react';
import {
  LuHouse, LuMap, LuCode, LuPalette, LuZap, LuFlaskConical, LuHammer, LuPencilLine, LuGraduationCap, LuTimer,
  LuChartColumn, LuTrophy, LuSearch, LuMenu, LuX, LuChevronDown, LuTerminal, LuFlame, LuShield,
} from 'react-icons/lu';
import { Link, useRouter, parseRoute } from '../lib/router.jsx';
import { useProgress, levelFor, streakOf } from '../lib/progress.jsx';
import { useAuth } from '../lib/auth.jsx';
import { TRACKS, ALL_LESSONS, LABS, LESSON_BY_ID } from '../data/syllabus.js';
import { PROJECTS } from '../data/projects.js';
import ProfileMenu from './ProfileMenu.jsx';

const NAV_GROUPS = {
  html: [['Basics', ['Basics']], ['Elements', ['Elements']], ['Forms', ['Forms']], ['Semantic HTML', ['Semantic HTML']], ['Git & GitHub', ['Git & GitHub']]],
  css: [['Fundamentals', ['Fundamentals']], ['Box Model', ['Box Model']], ['Positioning', ['Positioning']], ['Flexbox', ['Flexbox']], ['Grid', ['Grid']], ['Animations', ['Animations']], ['Responsive Design', ['Responsive Design']], ['Advanced & Frameworks', ['Advanced Styling', 'Frameworks']]],
  js: [['Fundamentals', ['Fundamentals']], ['Variables', ['Variables']], ['Conditions & Loops', ['Conditions & Loops']], ['Functions', ['Functions']], ['Arrays & Objects', ['Arrays & Objects']], ['DOM', ['DOM']], ['Events', ['Events']], ['Async JavaScript', ['Async JavaScript']]],
};
const TRACK_ICON = { html: LuCode, css: LuPalette, js: LuZap };
const PLAYGROUND_LINK = { html: ['Practice Lab', 'lab-page-builder'], css: ['CSS Playground', 'lab-css-lab'], js: ['JavaScript Playground', 'playground'] };

function NavItem({ to, icon: Icon, children, active, badge }) {
  return (
    <Link to={to} className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[14px] font-medium transition ${active ? 'bg-ink text-cream' : 'hover:bg-tang-soft'}`} aria-current={active ? 'page' : undefined}>
      {Icon && <Icon className="shrink-0 text-[17px]" />}<span className="truncate">{children}</span>
      {badge != null && <span className={`ml-auto text-[10px] font-bold px-1.5 rounded ${active ? 'bg-cream/20' : 'bg-mist'}`}>{badge}</span>}
    </Link>
  );
}

function TrackNav({ track, route }) {
  const t = TRACKS[track];
  const Icon = TRACK_ICON[track];
  const { state } = useProgress();
  const { page, param } = parseRoute(route);
  const activeLesson = page === 'lesson' ? LESSON_BY_ID[param] : null;
  const inTrack = (page === 'track' && param === track) || activeLesson?.track === track;
  const [open, setOpen] = useState(inTrack);
  const [openGroup, setOpenGroup] = useState(activeLesson?.group);
  useEffect(() => { if (inTrack) setOpen(true); if (activeLesson) setOpenGroup(activeLesson.group); }, [inTrack, activeLesson]);
  const done = t.lessons.filter((l) => state.completedLessons[l.id]).length;
  return (
    <div>
      <div className={`flex items-center rounded-lg ${page === 'track' && param === track ? 'bg-ink text-cream' : 'hover:bg-tang-soft'}`}>
        <Link to={`track-${track}`} className="flex-1 flex items-center gap-2.5 px-3 py-1.5 text-[14px] font-semibold">
          <Icon className="text-[17px]" /> {t.title}
          <span className="ml-auto text-[10px] font-bold opacity-70">{done}/{t.lessons.length}</span>
        </Link>
        <button onClick={() => setOpen(!open)} className="px-2 py-1.5" aria-label={`${open ? 'Collapse' : 'Expand'} ${t.title}`} aria-expanded={open}>
          <LuChevronDown className={`transition ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {open && (
        <div className="ml-4 pl-2 border-l-2 border-dashed border-ink/20 my-1 space-y-0.5">
          {NAV_GROUPS[track].map(([label, groups]) => {
            const lessons = t.lessons.filter((l) => groups.includes(l.group));
            const isOpen = openGroup && groups.includes(openGroup);
            return (
              <div key={label}>
                <button onClick={() => setOpenGroup(isOpen ? null : groups[0])} className="w-full text-left text-[13px] px-2 py-1 rounded-md hover:bg-mist flex items-center gap-1 font-medium text-ink-soft">
                  <LuChevronDown className={`text-xs transition ${isOpen ? '' : '-rotate-90'}`} />{label}
                </button>
                {isOpen && lessons.map((l) => (
                  <Link key={l.id} to={`lesson-${l.id}`} className={`block text-[12.5px] pl-6 pr-2 py-1 rounded-md truncate ${param === l.id ? 'bg-sun font-semibold' : 'hover:bg-mist'}`}>
                    {state.completedLessons[l.id] ? '✓ ' : ''}{l.title}
                  </Link>
                ))}
              </div>
            );
          })}
          <Link to={PLAYGROUND_LINK[track][1]} className="flex items-center gap-1.5 text-[13px] px-2 py-1 rounded-md hover:bg-mist font-semibold text-tang-dark"><LuFlaskConical /> {PLAYGROUND_LINK[track][0]}</Link>
        </div>
      )}
    </div>
  );
}

function Search({ onPick }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const { navigate } = useRouter();
  const ref = useRef(null);
  const index = useMemo(() => [
    ...ALL_LESSONS.map((l) => ({ to: `lesson-${l.id}`, title: l.title, sub: `${TRACKS[l.track].title} · ${l.syllabus}`, kind: 'Lesson', hay: `${l.title} ${l.syllabus} ${l.summary} ${l.track}`.toLowerCase() })),
    ...LABS.map((l) => ({ to: `lab-${l.id}`, title: l.title, sub: l.blurb, kind: 'Experiment', hay: `${l.title} ${l.blurb} lab experiment playground`.toLowerCase() })),
    ...PROJECTS.map((p) => ({ to: `project-${p.id}`, title: p.title, sub: p.objective, kind: 'Project', hay: `${p.title} ${p.objective} project`.toLowerCase() })),
    { to: 'playground', title: 'Code Playground', sub: 'HTML, CSS & JS editors with live preview', kind: 'Tool', hay: 'code playground editor run' },
    { to: 'mock', title: 'Mock Tests', sub: 'Timed tests with automatic scoring', kind: 'Exam', hay: 'mock test exam timed' },
    { to: 'exam-bank', title: 'Question Bank', sub: '1, 2, 3, 5 and 10-mark questions', kind: 'Exam', hay: 'question bank marks exam' },
    { to: 'exam-revision', title: 'Revision Mode', sub: 'Cheat sheets and last-minute notes', kind: 'Exam', hay: 'revision cheat sheet notes' },
  ], []);
  const results = q.trim().length < 2 ? [] : index.filter((x) => q.toLowerCase().split(/\s+/).every((w) => x.hay.includes(w))).slice(0, 8);
  useEffect(() => {
    const onKey = (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); ref.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const go = (r) => { navigate(r.to); setQ(''); setOpen(false); onPick?.(); };
  return (
    <div className="relative">
      <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
      <input ref={ref} value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); setHi(0); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => Math.min(results.length - 1, h + 1)); }
          if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(0, h - 1)); }
          if (e.key === 'Enter' && results[hi]) go(results[hi]);
          if (e.key === 'Escape') { setQ(''); e.currentTarget.blur(); }
        }}
        placeholder="Search topics… (Ctrl+K)" aria-label="Search topics"
        className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-ink bg-white text-sm focus:outline-none focus:ring-4 focus:ring-aqua/40" />
      {open && q.trim().length >= 2 && (
        <div className="absolute z-50 mt-1 w-full sticker p-1 max-h-96 overflow-auto anim-rise" role="listbox">
          {results.length === 0 && <div className="p-3 text-sm text-ink-soft">No match for "{q}". Try "flexbox", "forms" or "closure".</div>}
          {results.map((r, i) => (
            <button key={r.to} role="option" aria-selected={i === hi} onMouseDown={() => go(r)} onMouseEnter={() => setHi(i)}
              className={`w-full text-left px-3 py-2 rounded-lg ${i === hi ? 'bg-sun-soft' : ''}`}>
              <div className="text-sm font-semibold flex items-center gap-2">{r.title}<span className="chip bg-mist text-[10px]">{r.kind}</span></div>
              <div className="text-xs text-ink-soft truncate">{r.sub}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Sidebar({ onNavigate }) {
  const { route } = useRouter();
  const { page } = parseRoute(route);
  const { isAdmin } = useAuth();
  const is = (p) => page === p;
  return (
    <nav className="flex flex-col gap-0.5 text-ink" aria-label="Main" onClick={(e) => { if (e.target.closest('a')) onNavigate?.(); }}>
      <NavItem to="home" icon={LuHouse} active={is('home')}>Home</NavItem>
      <NavItem to="roadmap" icon={LuMap} active={is('roadmap')}>Learning Roadmap</NavItem>
      <div className="text-[11px] font-bold uppercase tracking-wider text-ink-soft px-3 pt-3 pb-1">Learn</div>
      <TrackNav track="html" route={route} />
      <TrackNav track="css" route={route} />
      <TrackNav track="js" route={route} />
      <div className="text-[11px] font-bold uppercase tracking-wider text-ink-soft px-3 pt-3 pb-1">Play & build</div>
      <NavItem to="play" icon={LuFlaskConical} active={is('play') || is('lab')} badge={LABS.length}>Play & Experiment</NavItem>
      <NavItem to="playground" icon={LuTerminal} active={is('playground')}>Code Playground</NavItem>
      <NavItem to="projects" icon={LuHammer} active={is('projects') || is('project')} badge={PROJECTS.length}>Mini Projects</NavItem>
      <NavItem to="practice" icon={LuPencilLine} active={is('practice')}>Practice Questions</NavItem>
      <div className="text-[11px] font-bold uppercase tracking-wider text-ink-soft px-3 pt-3 pb-1">Exams</div>
      <NavItem to="exam" icon={LuGraduationCap} active={is('exam') || is('notes')}>Exam Preparation</NavItem>
      <NavItem to="mock" icon={LuTimer} active={is('mock')}>Mock Tests</NavItem>
      <div className="text-[11px] font-bold uppercase tracking-wider text-ink-soft px-3 pt-3 pb-1">You</div>
      <NavItem to="progress" icon={LuChartColumn} active={is('progress')}>My Progress</NavItem>
      <NavItem to="achievements" icon={LuTrophy} active={is('achievements')}>Achievements</NavItem>
      {isAdmin && (
        <>
          <div className="text-[11px] font-bold uppercase tracking-wider text-ink-soft px-3 pt-3 pb-1">Admin</div>
          <NavItem to="admin" icon={LuShield} active={is('admin')}>Manage users</NavItem>
        </>
      )}
    </nav>
  );
}

function XPChip() {
  const { state } = useProgress();
  const lv = levelFor(state.xp);
  const streak = streakOf(state.activity);
  return (
    <Link to="progress" className="flex items-center gap-2 text-xs font-bold">
      <span className="chip bg-sun" title="Current streak"><LuFlame /> {streak}</span>
      <span className="chip bg-white" title={`Level ${lv.index}: ${lv.name}`}>Lv {lv.index} · {state.xp} XP</span>
    </Link>
  );
}

function Logo() {
  return (
    <Link to="home" className="flex items-center gap-2 group" aria-label="CodePlay Academy home">
      <span className="w-9 h-9 rounded-xl bg-tang border-2 border-ink grid place-items-center font-mono font-bold text-cream shadow-[2px_2px_0_#30343B] group-hover:rotate-[-6deg] transition">{'</>'}</span>
      <span className="leading-none">
        <span className="font-display font-semibold text-lg block">CodePlay</span>
        <span className="text-[10px] font-bold tracking-[.2em] text-ink-soft">ACADEMY</span>
      </span>
    </Link>
  );
}

function FooterNote() {
  const { isLoggedIn } = useAuth();
  return (
    <footer className="px-8 py-5 text-xs text-ink-soft border-t-2 border-dashed border-ink/15 text-center">
      CodePlay Academy · Learn → Understand → Experiment → Play → Practice → Prepare.
      {' '}
      {isLoggedIn ? 'Progress is synced to your account.' : 'Progress is saved in this browser — log in to sync.'}
      <span className="block mt-1.5">Made by Aditya Pandey</span>
    </footer>
  );
}

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { route } = useRouter();
  useEffect(() => setMobileOpen(false), [route]);
  return (
    <div className="min-h-screen flex">
      <a href="#main-scroll" onClick={(e) => { e.preventDefault(); document.getElementById('main-scroll')?.focus(); }} className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 btn z-[200]">Skip to content</a>
      <aside className="hidden lg:flex w-[272px] shrink-0 flex-col h-screen sticky top-0 border-r-2 border-ink bg-[#FFFDF8]">
        <div className="p-4 pb-3 border-b-2 border-dashed border-ink/20 space-y-3"><Logo /><Search /></div>
        <div className="flex-1 overflow-y-auto scroll-thin p-3"><Sidebar /></div>
        <div className="p-3 border-t-2 border-dashed border-ink/20">
          <XPChip />
        </div>
      </aside>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-[290px] max-w-[85vw] h-full bg-[#FFFDF8] border-r-2 border-ink flex flex-col anim-rise">
            <div className="p-4 flex items-center justify-between"><Logo /><button className="btn" onClick={() => setMobileOpen(false)} aria-label="Close menu"><LuX /></button></div>
            <div className="px-4 pb-2"><Search onPick={() => setMobileOpen(false)} /></div>
            <div className="flex-1 overflow-y-auto p-3"><Sidebar onNavigate={() => setMobileOpen(false)} /></div>
            <div className="p-3 border-t-2 border-dashed border-ink/20">
              <XPChip />
            </div>
          </aside>
        </div>
      )}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b-2 border-ink px-3 md:px-6 py-2 flex items-center gap-2">
          <div className="lg:hidden">
            <button type="button" className="btn px-2.5" onClick={() => setMobileOpen(true)} aria-label="Open menu"><LuMenu /></button>
          </div>
          <div className="lg:hidden"><Logo /></div>
          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <div className="lg:hidden"><XPChip /></div>
            <ProfileMenu />
          </div>
        </header>
        <main id="main-scroll" tabIndex={-1} className="flex-1 px-4 md:px-8 py-6 md:py-8 max-w-[1240px] w-full mx-auto outline-none">
          {children}
        </main>
        <FooterNote />
      </div>
    </div>
  );
}
