import { LuCheck, LuArrowLeft } from 'react-icons/lu';
import { Link } from '../lib/router.jsx';
import { useProgress } from '../lib/progress.jsx';
import { LAB_BY_ID, TRACKS, LESSON_BY_ID } from '../data/syllabus.js';
import { Empty } from '../components/ui.jsx';
import * as htmlLabs from '../labs/html-labs.jsx';
import * as cssLabs from '../labs/css-labs.jsx';
import * as jsLabs from '../labs/js-labs.jsx';

const REGISTRY = {
  'page-builder': htmlLabs.PageBuilder, 'tag-explorer': htmlLabs.TagExplorer, 'structure-builder': htmlLabs.StructureBuilder, 'form-builder': htmlLabs.FormBuilder, 'fix-html': htmlLabs.FixHtml,
  'css-lab': cssLabs.CssLab, 'box-model': cssLabs.BoxModelLab, positioning: cssLabs.PositioningLab, 'z-index': cssLabs.ZIndexLab, flexbox: cssLabs.FlexboxLab, grid: cssLabs.GridLab, display: cssLabs.DisplayLab, animation: cssLabs.AnimationLab, responsive: cssLabs.ResponsiveLab,
  variables: jsLabs.VariableLab, predict: jsLabs.PredictLab, scope: jsLabs.ScopeLab, 'function-machine': jsLabs.FunctionMachine, array: jsLabs.ArrayLab, dom: jsLabs.DomLab, events: jsLabs.EventLab, 'event-loop': jsLabs.EventLoopLab,
};
const RELATED = {
  'page-builder': 'html-what-is', 'tag-explorer': 'html-text', 'structure-builder': 'html-structure', 'form-builder': 'html-forms', 'fix-html': 'html-semantic',
  'css-lab': 'css-intro', 'box-model': 'css-box-model', positioning: 'css-position', 'z-index': 'css-zindex-overflow', flexbox: 'css-flexbox', grid: 'css-grid', display: 'css-display', animation: 'css-animations', responsive: 'css-responsive',
  variables: 'js-variables', predict: 'js-operators', scope: 'js-scope', 'function-machine': 'js-functions', array: 'js-arrays', dom: 'js-dom', events: 'js-events', 'event-loop': 'js-async',
};

export default function Lab({ id }) {
  const lab = LAB_BY_ID[id];
  const Comp = REGISTRY[id];
  const { state, completeExperiment } = useProgress();
  if (!lab || !Comp) return <Empty title="Experiment not found">Head back to Play & Experiment to pick one.</Empty>;
  const done = !!state.experiments[id]?.done;
  const related = LESSON_BY_ID[RELATED[id]];
  const t = TRACKS[lab.track];
  return (
    <div>
      <nav className="text-xs text-ink-soft mb-3"><Link to="play" className="hover:underline inline-flex items-center gap-1"><LuArrowLeft /> Play & Experiment</Link> / {t.title}</nav>
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-5">
        <div>
          <span className={`chip ${t.soft}`}>{t.title} experiment</span>
          <h1 className="text-3xl font-semibold mt-2"><span className="squiggle">{lab.title}</span></h1>
          <p className="text-ink-soft mt-2">{lab.blurb}{related && <> Related lesson: <Link to={`lesson-${related.id}`} className="underline font-semibold">{related.title}</Link>.</>}</p>
        </div>
        {done ? <span className="chip bg-leaf py-1.5 px-3"><LuCheck /> Explored · +30 XP</span>
          : <button className="btn btn-green" onClick={() => completeExperiment(id, lab.title)}><LuCheck /> I explored this (+30 XP)</button>}
      </header>
      <Comp />
    </div>
  );
}
