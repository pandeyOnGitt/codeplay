import { useState } from 'react';
import { LuCheck, LuArrowLeft, LuEye, LuRotateCcw } from 'react-icons/lu';
import { Link } from '../lib/router.jsx';
import { useProgress } from '../lib/progress.jsx';
import { PROJECTS, PROJECT_BY_ID } from '../data/projects.js';
import { LESSON_BY_ID } from '../data/syllabus.js';
import { PageHeader, Section, Empty, Callout } from '../components/ui.jsx';
import CodeLab from '../components/CodeLab.jsx';

const LEVEL_BG = { Beginner: 'bg-leaf-soft', Intermediate: 'bg-sun-soft', Advanced: 'bg-blush-soft' };

export function Projects() {
  const { state } = useProgress();
  return (
    <div>
      <PageHeader kicker={`${PROJECTS.length} guided builds`} title="Real-World Mini Projects">
        Each project combines several lessons into something you could show in a portfolio. You get the objective, step-by-step instructions, starter code, a live preview, extra challenges and a fully explained solution.
      </PageHeader>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {PROJECTS.map((p, i) => {
          const done = !!state.projects[p.id]?.done;
          return (
            <Link key={p.id} to={`project-${p.id}`} className={`sticker p-4 block hover:-translate-y-1 transition ${done ? 'bg-leaf-soft' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-semibold text-ink/20">{String(i + 1).padStart(2, '0')}</span>
                <span className={`chip ${LEVEL_BG[p.level]}`}>{p.level}</span>
              </div>
              <div className="font-semibold text-lg mt-1 flex items-center gap-1">{p.title}{done && <LuCheck className="text-leaf-dark" />}</div>
              <p className="text-sm text-ink-soft mt-1">{p.objective}</p>
              <div className="flex gap-1 mt-3">{p.tracks.map((t) => <span key={t} className="chip bg-mist uppercase text-[10px]">{t}</span>)}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Project({ id }) {
  const p = PROJECT_BY_ID[id];
  const { state, completeProject } = useProgress();
  const [mode, setMode] = useState('starter');
  if (!p) return <Empty title="Project not found">Pick one from Mini Projects.</Empty>;
  const done = !!state.projects[p.id]?.done;
  const tabs = ['html', 'css', ...(p.tracks.includes('js') ? ['js'] : [])];
  return (
    <div>
      <nav className="text-xs text-ink-soft mb-3"><Link to="projects" className="hover:underline inline-flex items-center gap-1"><LuArrowLeft /> Mini Projects</Link></nav>
      <PageHeader kicker={`${p.level} project`} title={p.title}>{p.objective}</PageHeader>
      <div className="grid xl:grid-cols-[340px_1fr] gap-5">
        <div className="space-y-4">
          <Section title="Concepts you will use" tone="mist">
            <div className="flex flex-wrap gap-1.5">{p.concepts.map((c) => <Link key={c} to={`lesson-${c}`} className="chip bg-white hover:bg-sun-soft">{LESSON_BY_ID[c]?.title}</Link>)}</div>
          </Section>
          <Section title="Step-by-step">
            <ol className="space-y-2">{p.steps.map((s, i) => <li key={i} className="flex gap-2"><span className="w-6 h-6 shrink-0 rounded-full bg-ink text-cream text-xs font-bold grid place-items-center">{i + 1}</span><span className="text-sm">{s}</span></li>)}</ol>
          </Section>
          <Section title="Extra challenges" tone="tang">
            <ul className="list-disc pl-5 text-sm space-y-1">{p.challenges.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </Section>
        </div>
        <div className="space-y-4 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <button className={`btn ${mode === 'starter' ? 'btn-sun' : ''}`} onClick={() => setMode('starter')}><LuRotateCcw /> Starter code</button>
            <button className={`btn ${mode === 'solution' ? 'btn-sun' : ''}`} onClick={() => setMode('solution')}><LuEye /> Final solution</button>
            <span className="text-xs text-ink-soft">{mode === 'starter' ? 'Build it yourself first — the preview updates live.' : 'Study the solution, then tweak it.'}</span>
          </div>
          <CodeLab key={mode} initial={mode === 'starter' ? p.starter : p.solution} tabs={tabs} height={480} />
          {mode === 'solution' && <Callout kind="info" title="How the solution works">{p.explanation}</Callout>}
          <div className="sticker p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-sm">Finished building it? Mark the project as complete.</span>
            {done ? <span className="chip bg-leaf py-1.5 px-3"><LuCheck /> Completed · +150 XP</span> : <button className="btn btn-green" onClick={() => completeProject(p.id, p.title)}><LuCheck /> I built it! (+150 XP)</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
