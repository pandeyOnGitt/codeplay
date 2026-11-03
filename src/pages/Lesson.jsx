import { useEffect } from 'react';
import { LuBookmark, LuBookmarkCheck, LuCheck, LuChevronLeft, LuChevronRight, LuClock, LuFlaskConical, LuGraduationCap, LuLock } from 'react-icons/lu';
import { Link } from '../lib/router.jsx';
import { useProgress } from '../lib/progress.jsx';
import { LESSON_BY_ID, TRACKS, neighbours, isUnlocked, LAB_BY_ID } from '../data/syllabus.js';
import { Section, Callout, Reveal, Empty } from '../components/ui.jsx';
import { rich } from '../components/rich.jsx';
import { highlight } from '../components/CodeEditor.jsx';
import CodeLab from '../components/CodeLab.jsx';
import Quiz from '../components/Quiz.jsx';
import StepThrough from '../components/StepThrough.jsx';
import { WIDGETS } from '../components/widgets.jsx';

const PARTS = ['Definition', 'Why it matters', 'Analogy', 'Syntax', 'Line by line', 'Live editor', 'Experiment', 'Mistakes', 'Exam questions', 'Practice', 'Revision', 'Quiz'];

export function SyntaxBlock({ code, lang }) {
  const html = lang === 'text' ? code.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])) : highlight(code, lang);
  return <pre className="bg-[#2B2F36] text-[#F3EEE3] rounded-xl p-4 overflow-auto text-[13px] font-mono leading-relaxed border-2 border-ink" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function Lesson({ id }) {
  const l = LESSON_BY_ID[id];
  const p = useProgress();
  const { state } = p;
  useEffect(() => { if (l) p.visitLesson(l.id); }, [id]); // eslint-disable-line
  if (!l) return <Empty title="Lesson not found">Choose a lesson from the sidebar or roadmap.</Empty>;

  const t = TRACKS[l.track];
  const { prev, next, index, total } = neighbours(l.id);
  const done = !!state.completedLessons[l.id];
  const unlocked = isUnlocked(l.id, state.completedLessons);
  const bookmarked = !!state.bookmarks[l.id];
  const lang = l.track === 'js' ? 'js' : l.track === 'css' ? 'css' : 'html';
  const Widget = l.widget ? WIDGETS[l.widget] : null;
  const lab = l.experiment ? LAB_BY_ID[l.experiment.lab] : null;
  const tabs = l.tabs || (l.track === 'css' ? ['css', 'html'] : l.live?.js ? ['html', 'css', 'js'] : ['html', 'css']);
  let n = 0; const num = () => ++n;

  return (
    <article>
      <nav className="text-xs text-ink-soft mb-3 flex flex-wrap items-center gap-1" aria-label="Breadcrumb">
        <Link to="home" className="hover:underline">Home</Link> / <Link to={`track-${l.track}`} className="hover:underline">{t.title}</Link> / <span>{l.group}</span> / <span className="text-ink font-semibold">{l.title}</span>
      </nav>

      <header className={`sticker ${t.soft} p-6 mb-5 relative overflow-hidden`}>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 dotgrid opacity-50 hidden md:block" aria-hidden="true" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="chip bg-white">Lesson {index + 1} of {total}</span>
            <span className="chip bg-white">{l.level}</span>
            <span className="chip bg-white"><LuClock /> {l.minutes} min</span>
            {done && <span className="chip bg-leaf"><LuCheck /> Completed</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mt-3">{l.title}</h1>
          <p className="text-ink-soft mt-1">{l.summary}</p>
          <p className="text-xs mt-2 font-mono text-ink-soft">Syllabus: {l.syllabus}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <button className="btn" onClick={() => p.toggleBookmark(l.id)} aria-pressed={bookmarked}>{bookmarked ? <><LuBookmarkCheck /> Bookmarked</> : <><LuBookmark /> Bookmark</>}</button>
            <Link to={`notes-${l.id}`} className="btn"><LuGraduationCap /> Exam notes</Link>
            {lab && <Link to={`lab-${lab.id}`} className="btn btn-sun"><LuFlaskConical /> {lab.title}</Link>}
          </div>
        </div>
      </header>

      {!unlocked && !done && prev && (
        <Callout kind="tip" title="Recommended order">
          <span className="inline-flex items-center gap-1"><LuLock /> This lesson normally unlocks after <Link to={`lesson-${prev.id}`} className="underline font-semibold">{prev.title}</Link>. You are free to explore it now.</span>
        </Callout>
      )}

      <div className="grid xl:grid-cols-[1fr_190px] gap-6">
        <div className="space-y-5 min-w-0">
          <Section num={num()} title="Simple definition" id="part-0"><p>{rich(l.definition)}</p></Section>
          <Section num={num()} title="Why do we need it?" tone="mist" id="part-1"><p>{rich(l.why)}</p></Section>
          <Section num={num()} title={`Real-world analogy: ${l.analogy.title}`} tone="sun" id="part-2"><p>{rich(l.analogy.text)}</p></Section>
          <Section num={num()} title="Syntax" id="part-3"><SyntaxBlock code={l.syntax} lang={l.syntaxLang || lang} /></Section>
          <Section num={num()} title="What every line means" id="part-4">
            <div className="divide-y-2 divide-dashed divide-ink/10">
              {l.lines.map(([code, exp], i) => (
                <div key={i} className="py-2.5 grid md:grid-cols-[minmax(0,260px)_1fr] gap-2 md:gap-4">
                  <code className="!bg-ink !text-cream !border-ink self-start break-all">{code}</code>
                  <span>{rich(exp)}</span>
                </div>
              ))}
            </div>
          </Section>

          {l.live && (
            <Section num={num()} title="Live code editor & browser output" tone="aqua" id="part-5">
              <p className="mb-3">Edit the code — the output on the right updates as you type. Press <kbd className="inline-code">Ctrl + Enter</kbd> to run at any time. Your code runs in a safe sandbox.</p>
              <CodeLab initial={l.live} tabs={tabs} height={380} />
            </Section>
          )}

          {l.steps && (
            <Section num={num()} title="Step-by-step execution" id="part-5b">
              <p className="mb-3">Watch JavaScript run this program one line at a time and see what is stored in memory after each step.</p>
              <StepThrough code={l.live.js} steps={l.steps} />
            </Section>
          )}

          <Section num={num()} title="Interactive experiment" tone="tang" id="part-6">
            {Widget && <div className="mb-4"><Widget /></div>}
            {lab && (
              <div className="rounded-xl bg-white border-2 border-ink p-4 flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                <LuFlaskConical className="text-3xl text-tang-dark shrink-0" />
                <div className="flex-1"><div className="font-semibold">{lab.title}</div><div className="text-sm text-ink-soft">{l.experiment.text}</div></div>
                <Link to={`lab-${lab.id}`} className="btn btn-primary">Open experiment</Link>
              </div>
            )}
            {l.tryThis && (
              <>
                <div className="font-semibold mb-1">Try this in the editor:</div>
                <ul className="space-y-1.5">{l.tryThis.map((x, i) => <li key={i} className="flex gap-2"><span className="w-5 h-5 shrink-0 rounded bg-white border-2 border-ink text-[11px] font-bold grid place-items-center mt-0.5">{i + 1}</span><span>{rich(x)}</span></li>)}</ul>
              </>
            )}
          </Section>

          <Section num={num()} title="Common mistakes" tone="blush" id="part-7">
            <div className="space-y-3">
              {l.mistakes.map((m, i) => (
                <div key={i} className="rounded-xl bg-white border-2 border-ink p-3">
                  <div className="grid md:grid-cols-2 gap-2">
                    <div><div className="text-[11px] font-bold text-blush-dark uppercase">✗ Wrong</div><code className="block !whitespace-pre-wrap mt-1">{m.wrong}</code></div>
                    <div><div className="text-[11px] font-bold text-leaf-dark uppercase">✓ Right</div><code className="block !whitespace-pre-wrap mt-1">{m.right}</code></div>
                  </div>
                  <p className="text-sm !mb-0 text-ink-soft"><b className="text-ink">Why:</b> {m.why}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section num={num()} title="Important examination questions" id="part-8">
            <div className="space-y-3">
              {l.examQs.map((q, i) => (
                <div key={i} className="rounded-xl border-2 border-ink p-3 bg-cream">
                  <div className="flex gap-2 items-start"><span className="chip bg-sun shrink-0">{q.m} mark{q.m > 1 ? 's' : ''}</span><span className="font-semibold">{q.q}</span></div>
                  <div className="mt-2 ml-1"><Reveal label="Show model answer"><p className="text-sm bg-white rounded-lg p-3 border border-ink/20 !m-0">{q.a}</p></Reveal></div>
                </div>
              ))}
            </div>
            <Link to={`notes-${l.id}`} className="btn mt-3"><LuGraduationCap /> Full exam-ready notes</Link>
          </Section>

          <Section num={num()} title="Practice exercises" tone="leaf" id="part-9">
            <ol className="list-decimal pl-5 space-y-1">{l.practice.map((x, i) => <li key={i}>{rich(x)}</li>)}</ol>
            <Link to="playground" className="btn mt-3">Open the Code Playground</Link>
          </Section>

          <Section num={num()} title="Quick revision notes" tone="sun" id="part-10">
            <ul className="grid sm:grid-cols-2 gap-2">{l.revision.map((x, i) => <li key={i} className="bg-white rounded-lg border-2 border-ink px-3 py-2 text-sm font-medium">{x}</li>)}</ul>
          </Section>

          <Section num={num()} title="Check your understanding" id="part-11">
            <Quiz key={l.id} questions={l.quiz} topic={l.id} title={`${l.title} quiz`} />
          </Section>

          <div className="sticker p-5 bg-white flex flex-col md:flex-row items-center gap-3 justify-between">
            {done ? (
              <div className="flex items-center gap-2 font-semibold text-leaf-dark"><LuCheck /> You completed this lesson.
                <button className="text-xs underline text-ink-soft font-normal" onClick={() => p.uncompleteLesson(l.id)}>Mark as not done</button></div>
            ) : (
              <button className="btn btn-green text-base" onClick={() => p.completeLesson(l.id, l.title)}><LuCheck /> Mark lesson complete (+50 XP)</button>
            )}
            <div className="flex gap-2">
              {prev && <Link to={`lesson-${prev.id}`} className="btn"><LuChevronLeft /> {prev.title}</Link>}
              {next && <Link to={`lesson-${next.id}`} className="btn btn-primary">{next.title} <LuChevronRight /></Link>}
            </div>
          </div>
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-6 text-sm">
            <div className="font-bold text-xs uppercase tracking-wide text-ink-soft mb-2">In this lesson</div>
            <ol className="space-y-1 border-l-2 border-ink/20 pl-3">
              {PARTS.map((part, i) => (
                <li key={part}><a href={`#lesson-${l.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(`part-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:text-tang-dark">{part}</a></li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </article>
  );
}
