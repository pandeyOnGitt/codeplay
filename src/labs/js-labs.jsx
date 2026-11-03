import { useEffect, useRef, useState } from 'react';
import { LuPlay, LuChevronRight, LuChevronLeft, LuRotateCcw, LuCheck, LuTrash2, LuPause } from 'react-icons/lu';
import { useProgress } from '../lib/progress.jsx';
import { celebrate } from '../lib/celebrate.jsx';
import { Segmented, Callout } from '../components/ui.jsx';
import { SyntaxBlock } from '../pages/Lesson.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import Preview from '../components/Preview.jsx';
import { explainError } from '../lib/sandbox.js';

/* ======================= Variable Explorer ======================= */
export function VariableLab() {
  const [name, setName] = useState('Riya');
  const [age, setAge] = useState('19');
  const [isStudent, setIsStudent] = useState(true);
  const [skills, setSkills] = useState('HTML, CSS');
  const [constTry, setConstTry] = useState(null);
  const ageNum = Number(age);
  const skillArr = skills.split(',').map((s) => s.trim()).filter(Boolean);
  const vals = [['name', JSON.stringify(name), typeof name], ['age', age === '' ? 'NaN' : String(ageNum), typeof ageNum], ['isStudent', String(isStudent), 'boolean'], ['skills', JSON.stringify(skillArr), 'object (array)'], ['COLLEGE', '"Invertis"', 'string']];
  const code = `let name = ${JSON.stringify(name)};\nlet age = Number("${age}");     // input values are strings!\nlet isStudent = ${isStudent};\nlet skills = ${JSON.stringify(skillArr)};\nconst COLLEGE = "Invertis";\n\nconst intro = \`Hi, I'm \${name}, \${age} years old.\`;\nconst canVote = age >= 18 ? "can vote" : "cannot vote yet";\nconsole.log(intro, canVote);\nconsole.log(isStudent ? "Student at " + COLLEGE : "Not a student");\nconsole.log("Skills:", skills.length);`;
  return (
    <div className="grid xl:grid-cols-[300px_1fr] gap-4">
      <div className="sticker p-4 space-y-3 h-fit">
        <div className="text-xs font-bold uppercase">Change the variables</div>
        <label className="block text-sm font-semibold">name (string)<input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 border-2 border-ink rounded-md px-2 py-1 font-normal" /></label>
        <label className="block text-sm font-semibold">age (number)<input value={age} onChange={(e) => setAge(e.target.value)} className="w-full mt-1 border-2 border-ink rounded-md px-2 py-1 font-normal" /></label>
        <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} /> isStudent (boolean)</label>
        <label className="block text-sm font-semibold">skills (array, comma separated)<input value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full mt-1 border-2 border-ink rounded-md px-2 py-1 font-normal" /></label>
        <button className="btn bg-blush-soft w-full justify-center" onClick={() => setConstTry('TypeError: Assignment to constant variable.')}>Try: COLLEGE = "XYZ"</button>
        {constTry && <div className="text-xs bg-blush-soft border-2 border-ink rounded-lg p-2 anim-rise"><b className="font-mono">{constTry}</b><br />const variables cannot be reassigned.</div>}
      </div>
      <div className="space-y-3">
        <div className="grid sm:grid-cols-5 gap-2">
          {vals.map(([k, v, t]) => (
            <div key={k} className="sticker-sm bg-white p-2 anim-pop">
              <div className="text-[10px] font-bold uppercase text-ink-soft">{k === 'COLLEGE' ? 'const' : 'let'}</div>
              <div className="font-mono font-bold text-sm">{k}</div>
              <div className="font-mono text-xs bg-mist rounded px-1 mt-1 break-all">{v}</div>
              <div className="text-[10px] mt-1">typeof → <b>{t}</b></div>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-3">
          <SyntaxBlock code={code} lang="js" />
          <div className="sticker bg-[#22252B] text-[#E9E4D8] p-4 font-mono text-sm">
            <div className="text-[11px] text-white/50 mb-1 font-sans font-bold">CONSOLE</div>
            <div>› Hi, I'm {name}, {age === '' ? 'NaN' : ageNum} years old. {ageNum >= 18 ? 'can vote' : 'cannot vote yet'}</div>
            <div>› {isStudent ? 'Student at Invertis' : 'Not a student'}</div>
            <div>› Skills: {skillArr.length}</div>
            {Number.isNaN(ageNum) && <div className="text-sun mt-2 font-sans text-xs">age is NaN because "{age}" is not a valid number. Number() returns NaN for text.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================= Predict the Output ======================= */
const PREDICT = [
  { code: 'console.log("5" + 3);\nconsole.log("5" - 3);', options: ['8 and 2', '"53" and 2', '"53" and "53"', '8 and "2"'], a: 1, why: '+ with a string joins text; - converts the string to a number.' },
  { code: 'let x = 10;\nif (true) {\n  let x = 20;\n}\nconsole.log(x);', options: ['10', '20', 'undefined', 'Error'], a: 0, why: 'The inner let x lives only inside the block. The outer x is still 10.' },
  { code: 'console.log(typeof null, typeof []);', options: ['null array', 'object object', 'null object', 'undefined object'], a: 1, why: 'typeof null is "object" (an old bug) and arrays are objects.' },
  { code: 'const nums = [1, 2, 3];\nconst out = nums.map(n => n * 2);\nconsole.log(nums, out);', options: ['[2,4,6] [2,4,6]', '[1,2,3] [2,4,6]', '[1,2,3] undefined', 'Error'], a: 1, why: 'map returns a NEW array and leaves the original unchanged.' },
  { code: 'console.log(a);\nvar a = 7;', options: ['7', 'undefined', 'ReferenceError', 'null'], a: 1, why: 'var is hoisted and initialised to undefined; the assignment happens later.' },
  { code: 'console.log("A");\nsetTimeout(() => console.log("B"), 0);\nconsole.log("C");', options: ['A B C', 'A C B', 'B A C', 'C A B'], a: 1, why: 'setTimeout callbacks wait in the task queue until the current script finishes.' },
  { code: 'const user = { name: "Zoya" };\nconst copy = user;\ncopy.name = "Ira";\nconsole.log(user.name);', options: ['Zoya', 'Ira', 'undefined', 'Error'], a: 1, why: 'copy holds a reference to the same object.' },
  { code: 'console.log(0 || "default", 0 ?? "default");', options: ['default default', '0 0', 'default 0', '0 default'], a: 2, why: '|| treats 0 as falsy; ?? only replaces null/undefined.' },
  { code: 'let count = 0;\nfor (let i = 0; i < 5; i++) {\n  if (i === 2) continue;\n  if (i === 4) break;\n  count++;\n}\nconsole.log(count);', options: ['5', '4', '3', '2'], a: 2, why: 'i = 0, 1, 3 increment count. 2 is skipped; the loop breaks at 4.' },
];
export function PredictLab() {
  const { completeExperiment } = useProgress();
  const [i, setI] = useState(0);
  const [pick, setPick] = useState(null);
  const [logs, setLogs] = useState(null);
  const [score, setScore] = useState({});
  const [runN, setRunN] = useState(0);
  const p = PREDICT[i];
  const run = () => { setLogs([]); setRunN((n) => n + 1); };
  useEffect(() => { setPick(null); setLogs(null); }, [i]);
  const answered = Object.keys(score).length;
  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between"><span className="chip bg-mist">Puzzle {i + 1} of {PREDICT.length}</span><span className="text-sm font-semibold">Score: {Object.values(score).filter(Boolean).length}/{answered}</span></div>
        <SyntaxBlock code={p.code} lang="js" />
        <div className="text-sm font-semibold">What will the console print?</div>
        <div className="grid sm:grid-cols-2 gap-2">
          {p.options.map((o, k) => (
            <button key={k} disabled={pick !== null} onClick={() => { setPick(k); setScore({ ...score, [i]: k === p.a }); }}
              className={`text-left font-mono text-sm px-3 py-2 rounded-lg border-2 border-ink ${pick === null ? 'hover:bg-sun-soft' : k === p.a ? 'bg-leaf-soft' : k === pick ? 'bg-blush-soft' : 'opacity-50'}`}>{o}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary" disabled={pick === null} onClick={run}><LuPlay /> Run it for real</button>
          <button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}><LuChevronLeft /></button>
          <button className="btn" disabled={i === PREDICT.length - 1} onClick={() => setI(i + 1)}>Next <LuChevronRight /></button>
        </div>
      </div>
      <div className="space-y-3">
        {pick !== null && <div className={`rounded-xl border-2 border-ink p-3 text-sm anim-rise ${pick === p.a ? 'bg-leaf-soft' : 'bg-blush-soft'}`}><b>{pick === p.a ? 'You predicted correctly!' : 'Surprise!'}</b> {p.why}</div>}
        <div className="sticker bg-[#22252B] text-[#E9E4D8] p-4 font-mono text-sm min-h-[140px]">
          <div className="text-[11px] text-white/50 mb-1 font-sans font-bold">REAL CONSOLE OUTPUT</div>
          {logs === null ? <span className="text-white/40 italic">Pick an answer, then press Run.</span> : logs.length === 0 ? <span className="text-white/40">running…</span> : logs.map((l, k) => <div key={k}>› {l.text}</div>)}
        </div>
        {logs !== null && <div className="hidden"><Preview html="" css="" js={p.code} runKey={i * 1000 + runN} onConsole={(l) => setLogs((x) => [...(x || []), l])} /></div>}
        {answered === PREDICT.length && (
          <div className="sticker p-4 bg-sun-soft">All puzzles answered! <button className="btn btn-green ml-2" onClick={() => { celebrate('Output oracle!'); completeExperiment('predict', 'Predict the Output'); }}><LuCheck /> Finish</button></div>
        )}
      </div>
    </div>
  );
}

/* ======================= Scope Visualizer + Hoisting ======================= */
const SCOPE_VARS = { college: 'global', greet: 'global', student: 'function', marks: 'block' };
const LOOKUPS = [
  { where: 'block', name: 'marks', label: 'marks used inside the if-block' },
  { where: 'block', name: 'student', label: 'student used inside the if-block' },
  { where: 'block', name: 'college', label: 'college used inside the if-block' },
  { where: 'function', name: 'marks', label: 'marks used in the function (outside the block)' },
  { where: 'global', name: 'student', label: 'student used in global code' },
];
const CHAIN = { block: ['block', 'function', 'global'], function: ['function', 'global'], global: ['global'] };

function HoistingDemo() {
  const [kw, setKw] = useState('var');
  const [step, setStep] = useState(0);
  const code = kw === 'function' ? 'console.log(sayHi());\nfunction sayHi() { return "hi"; }' : `console.log(score);\n${kw} score = 50;\nconsole.log(score);`;
  const mem = { var: ['score = undefined', 'score = undefined', 'score = 50', 'score = 50'], let: ['score = ⟨uninitialised · TDZ⟩', 'score = ⟨TDZ⟩', '—', '—'], const: ['score = ⟨uninitialised · TDZ⟩', 'score = ⟨TDZ⟩', '—', '—'], function: ['sayHi = ƒ sayHi() {…}', 'sayHi = ƒ', 'sayHi = ƒ', 'sayHi = ƒ'] }[kw];
  const out = { var: [[], ['undefined'], ['undefined'], ['undefined', '50']], let: [[], ['ReferenceError: Cannot access \'score\' before initialization'], [], []], const: [[], ['ReferenceError: Cannot access \'score\' before initialization'], [], []], function: [[], ['hi'], ['hi'], ['hi']] }[kw];
  const notes = {
    var: ['Creation phase: JS scans the code and creates score, set to undefined.', 'Line 1 runs: score exists but has no value yet → undefined.', 'Line 2 assigns 50.', 'Line 3 prints 50.'],
    let: ['Creation phase: score is created but NOT initialised. It is in the Temporal Dead Zone (TDZ).', 'Line 1 tries to read score while it is in the TDZ → ReferenceError. The program stops here.', 'Never reached.', 'Never reached.'],
    const: ['Creation phase: same as let — created, but in the TDZ.', 'Line 1 → ReferenceError. const behaves like let for hoisting.', 'Never reached.', 'Never reached.'],
    function: ['Creation phase: the whole function declaration is stored in memory.', 'Line 1 calls sayHi() before its line — it works!', 'Line 2 is the declaration itself; nothing new happens.', 'Done.'],
  }[kw];
  const maxStep = kw === 'let' || kw === 'const' ? 1 : 3;
  return (
    <div className="sticker p-5 bg-white">
      <h3 className="font-semibold text-lg mb-2">Hoisting Demonstrator</h3>
      <Segmented value={kw} onChange={(v) => { setKw(v); setStep(0); }} options={['var', 'let', 'const', 'function']} />
      <div className="grid md:grid-cols-3 gap-3 mt-3">
        <div className="sticker-sm overflow-hidden h-[110px]"><CodeEditor value={code} lang="js" readOnly onChange={() => {}} highlightLine={step === 0 ? null : step} minHeight={0} /></div>
        <div className="rounded-xl border-2 border-ink p-3 bg-sun-soft">
          <div className="text-[11px] font-bold uppercase">{step === 0 ? 'Phase 1 · creation' : 'Phase 2 · execution'}</div>
          <div className="font-mono text-sm mt-1">{mem[step]}</div>
          <p className="text-sm mt-2">{notes[step]}</p>
        </div>
        <div className="rounded-xl border-2 border-ink p-3 bg-[#22252B] text-[#E9E4D8] font-mono text-xs">
          {out[step].length ? out[step].map((o, k) => <div key={k} className={o.startsWith('Reference') ? 'text-[#FF8F8F]' : ''}>› {o}</div>) : <span className="text-white/40">no output yet</span>}
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button className="btn" disabled={step === 0} onClick={() => setStep(step - 1)}><LuChevronLeft /> Back</button>
        <button className="btn btn-primary" disabled={step >= maxStep} onClick={() => setStep(step + 1)}>Next step <LuChevronRight /></button>
        <div className="flex gap-1 items-center ml-2">{[0, 1, 2, 3].map((k) => <span key={k} className={`w-6 h-1.5 rounded-full ${k <= step ? 'bg-tang' : 'bg-mist'} ${k > maxStep ? 'opacity-30' : ''}`} />)}</div>
      </div>
    </div>
  );
}

export function ScopeLab() {
  const [look, setLook] = useState(0);
  const L = LOOKUPS[look];
  const chain = CHAIN[L.where];
  const foundAt = chain.find((s) => SCOPE_VARS[L.name] === s);
  const reached = foundAt ? chain.slice(0, chain.indexOf(foundAt) + 1) : chain;
  const box = (scope, title, vars, children, bg) => (
    <div className={`rounded-2xl border-2 p-3 transition-all ${reached.includes(scope) ? (foundAt === scope ? 'border-leaf-dark ring-4 ring-leaf/40' : 'border-tang ring-2 ring-tang/30') : 'border-ink'} ${bg}`}>
      <div className="text-xs font-bold uppercase flex items-center gap-2">{title} {L.where === scope && <span className="chip bg-white text-[10px]">you are here</span>}{foundAt === scope && <span className="chip bg-leaf text-[10px]">found ✓</span>}</div>
      <div className="font-mono text-sm my-1">{vars}</div>
      {children}
    </div>
  );
  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        <div>
          {box('global', 'Global scope', 'const college = "Invertis"; function greet() {…}', (
            box('function', 'Function scope · greet()', 'let student = "Aman";', box('block', 'Block scope · if (true) { }', 'let marks = 88;', null, 'bg-leaf-soft'), 'bg-aqua-soft')
          ), 'bg-sun-soft')}
        </div>
        <div className="sticker p-4 space-y-2 h-fit">
          <div className="text-xs font-bold uppercase">Look up a variable</div>
          {LOOKUPS.map((x, k) => <button key={k} onClick={() => setLook(k)} className={`w-full text-left text-sm px-2 py-1.5 rounded-lg border-2 ${k === look ? 'border-ink bg-ink text-cream' : 'border-transparent hover:bg-mist'}`}>{x.label}</button>)}
          <div className={`rounded-lg p-3 text-sm border-2 border-ink ${foundAt ? 'bg-leaf-soft' : 'bg-blush-soft'}`}>
            Search path: <b className="font-mono">{chain.join(' → ')}</b><br />
            {foundAt ? <>Found <code>{L.name}</code> in the <b>{foundAt}</b> scope.</> : <><b>ReferenceError:</b> {L.name} is not defined. Outer scopes can never look <i>inside</i> inner ones.</>}
          </div>
        </div>
      </div>
      <HoistingDemo />
    </div>
  );
}

/* ======================= Function Machine ======================= */
const FUNCS = [
  { name: 'add', params: ['a', 'b'], defaults: ['4', '6'], body: 'return a + b;', fn: (a, b) => a + b },
  { name: 'area', params: ['length', 'width'], defaults: ['5', '3'], body: 'return length * width;', fn: (l, w) => l * w },
  { name: 'greet', params: ['name', 'greeting = "Hello"'], defaults: ['"Riya"', ''], body: 'return greeting + ", " + name + "!";', fn: (n, g = 'Hello') => `${g}, ${n}!` },
  { name: 'isAdult', params: ['age'], defaults: ['17'], body: 'return age >= 18;', fn: (a) => a >= 18 },
  { name: 'maxOf', params: ['...nums'], defaults: ['3, 9, 2'], body: 'return Math.max(...nums);', fn: (...n) => Math.max(...n) },
];
function parseArg(s) {
  const t = s.trim();
  if (t === '') return undefined;
  if (/^".*"$|^'.*'$/.test(t)) return t.slice(1, -1);
  if (t === 'true' || t === 'false') return t === 'true';
  const n = Number(t); return Number.isNaN(n) ? t : n;
}
export function FunctionMachine() {
  const [fi, setFi] = useState(0);
  const f = FUNCS[fi];
  const [args, setArgs] = useState(f.defaults);
  const [stage, setStage] = useState(0);
  useEffect(() => { setArgs(FUNCS[fi].defaults); setStage(0); }, [fi]);
  const rest = f.params[0].startsWith('...');
  const values = rest ? args[0].split(',').map(parseArg) : args.map(parseArg);
  let result; let err = null;
  try { result = f.fn(...values); } catch (e) { err = e.message; }
  const show = (v) => (v === undefined ? 'undefined' : typeof v === 'string' ? `"${v}"` : String(v));
  const callStr = `${f.name}(${rest ? args[0] : args.filter((a, k) => a !== '' || k === 0).join(', ')})`;
  function run() { setStage(1); setTimeout(() => setStage(2), 700); setTimeout(() => setStage(3), 1400); }
  return (
    <div className="grid xl:grid-cols-[280px_1fr] gap-4">
      <div className="sticker p-4 space-y-3 h-fit">
        <div className="text-xs font-bold uppercase">Choose a function</div>
        <Segmented value={String(fi)} onChange={(v) => setFi(Number(v))} options={FUNCS.map((x, k) => ({ value: String(k), label: x.name }))} />
        <div className="text-xs font-bold uppercase pt-2">Arguments (values you pass in)</div>
        {(rest ? [f.params[0]] : f.params).map((p, k) => (
          <label key={p} className="block text-sm"><span className="font-mono text-xs">{p}</span>
            <input value={args[k] ?? ''} onChange={(e) => { const a = [...args]; a[k] = e.target.value; setArgs(a); setStage(0); }} className="w-full border-2 border-ink rounded-md px-2 py-1 font-mono text-sm" placeholder={p.includes('=') ? 'leave empty to use default' : ''} /></label>
        ))}
        <button className="btn btn-primary w-full justify-center" onClick={run}><LuPlay /> Run the machine</button>
      </div>
      <div className="space-y-3">
        <SyntaxBlock code={`function ${f.name}(${f.params.join(', ')}) {\n  ${f.body}\n}\n\nconst result = ${callStr};`} lang="js" />
        <div className="sticker bg-white p-5">
          <div className="grid md:grid-cols-[1fr_auto_1.3fr_auto_1fr] items-center gap-3">
            <div className={`rounded-xl border-2 border-ink p-3 bg-sun-soft transition ${stage >= 1 ? 'opacity-50' : ''}`}><div className="text-[11px] font-bold uppercase">Arguments</div><div className="font-mono text-sm">{values.map(show).join(', ')}</div></div>
            <LuChevronRight className={`text-2xl ${stage >= 1 ? 'text-tang' : 'text-ink/30'}`} />
            <div className={`rounded-2xl border-[3px] border-ink p-3 bg-aqua-soft relative ${stage === 2 ? 'anim-wiggle' : ''}`}>
              <div className="absolute -top-3 left-3 chip bg-ink text-cream">ƒ {f.name}</div>
              <div className="text-[11px] font-bold uppercase mt-1">Parameters inside</div>
              {(rest ? [['nums', `[${values.map(show).join(', ')}]`]] : f.params.map((p, k) => [p.split('=')[0].trim(), show(values[k] === undefined && p.includes('=') ? p.split('=')[1].trim().replace(/"/g, '') : values[k])])).map(([p, v]) => (
                <div key={p} className={`font-mono text-sm transition ${stage >= 1 ? 'opacity-100' : 'opacity-30'}`}>{p} = <b>{v}</b></div>
              ))}
              <div className={`font-mono text-xs mt-2 ${stage >= 2 ? 'opacity-100' : 'opacity-30'}`}>{f.body}</div>
            </div>
            <LuChevronRight className={`text-2xl ${stage >= 3 ? 'text-tang' : 'text-ink/30'}`} />
            <div className={`rounded-xl border-2 border-ink p-3 transition ${stage >= 3 ? 'bg-leaf-soft anim-pop' : 'bg-mist opacity-50'}`}><div className="text-[11px] font-bold uppercase">Return value</div><div className="font-mono text-lg font-bold">{stage >= 3 ? (err ? 'Error' : show(result)) : '?'}</div></div>
          </div>
        </div>
        <Callout kind="info"><b>Arguments</b> are the actual values in the call <code>{callStr}</code>. Inside, they are copied into <b>parameters</b> — local variables that exist only while the function runs. <code>return</code> sends one value back out.</Callout>
      </div>
    </div>
  );
}

/* ======================= Array Playground ======================= */
export function ArrayLab() {
  const [arr, setArr] = useState([12, 45, 7, 30, 21]);
  const [val, setVal] = useState('18');
  const [limit, setLimit] = useState(20);
  const [log, setLog] = useState([]);
  const [result, setResult] = useState(null);
  const do_ = (code, fn, mutates) => {
    const copy = [...arr];
    const ret = fn(copy);
    if (mutates) setArr(copy);
    setResult({ code, ret: JSON.stringify(ret) ?? 'undefined', mutates, newArr: mutates ? copy : ret });
    setLog((l) => [{ code, ret: JSON.stringify(ret) ?? 'undefined', mutates }, ...l].slice(0, 8));
  };
  const v = Number(val);
  const ops = [
    ['push', `arr.push(${v})`, (a) => a.push(v), true, 'Add to the END'],
    ['pop', 'arr.pop()', (a) => a.pop(), true, 'Remove from the END'],
    ['unshift', `arr.unshift(${v})`, (a) => a.unshift(v), true, 'Add to the START'],
    ['shift', 'arr.shift()', (a) => a.shift(), true, 'Remove from the START'],
    ['splice', 'arr.splice(1, 1)', (a) => a.splice(1, 1), true, 'Remove 1 item at index 1'],
    ['sort', 'arr.sort((a, b) => a - b)', (a) => a.sort((x, y) => x - y), true, 'Sort ascending (mutates!)'],
    ['reverse', 'arr.reverse()', (a) => a.reverse(), true, 'Reverse order (mutates!)'],
    ['map', 'arr.map(n => n * 2)', (a) => a.map((n) => n * 2), false, 'NEW array, every item doubled'],
    ['filter', `arr.filter(n => n > ${limit})`, (a) => a.filter((n) => n > limit), false, `NEW array, only items > ${limit}`],
    ['reduce', 'arr.reduce((sum, n) => sum + n, 0)', (a) => a.reduce((s, n) => s + n, 0), false, 'Combine into ONE value'],
    ['find', `arr.find(n => n > ${limit})`, (a) => a.find((n) => n > limit), false, 'First item > limit'],
    ['includes', `arr.includes(${v})`, (a) => a.includes(v), false, 'Is the value in the array?'],
    ['indexOf', `arr.indexOf(${v})`, (a) => a.indexOf(v), false, 'Position of value (or -1)'],
  ];
  return (
    <div className="grid xl:grid-cols-[1fr_320px] gap-4">
      <div className="space-y-3">
        <div className="sticker bg-white p-5">
          <div className="text-xs font-bold uppercase mb-2">const arr = [{arr.join(', ')}] · length {arr.length}</div>
          <div className="flex flex-wrap gap-2 min-h-[80px]">
            {arr.length === 0 && <span className="text-ink-soft text-sm italic">empty array []</span>}
            {arr.map((n, i) => (
              <div key={i + '-' + n} className="anim-pop text-center">
                <div className="w-14 h-14 rounded-xl border-2 border-ink bg-sun grid place-items-center font-mono font-bold text-lg shadow-[2px_2px_0_#30343B]">{n}</div>
                <div className="text-[11px] font-mono text-ink-soft mt-1">[{i}]</div>
              </div>
            ))}
          </div>
        </div>
        {result && (
          <div className={`sticker p-4 anim-rise ${result.mutates ? 'bg-blush-soft' : 'bg-leaf-soft'}`}>
            <div className="font-mono text-sm font-bold">{result.code}</div>
            <div className="text-sm mt-1">Returned: <code>{result.ret}</code></div>
            <div className="text-xs mt-1">{result.mutates ? '⚠ This method CHANGED the original array.' : '✓ The original array is unchanged — a value or a new array was returned.'}</div>
          </div>
        )}
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-sm font-semibold">value<input value={val} onChange={(e) => setVal(e.target.value)} className="block w-20 border-2 border-ink rounded-md px-2 py-1 font-mono" /></label>
          <label className="text-sm font-semibold">limit for filter/find<input type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="block w-24 border-2 border-ink rounded-md px-2 py-1 font-mono" /></label>
          <button className="btn" onClick={() => { setArr([12, 45, 7, 30, 21]); setResult(null); setLog([]); }}><LuRotateCcw /> Reset</button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {ops.map(([k, code, fn, mut, desc]) => (
            <button key={k} onClick={() => do_(code, fn, mut)} className={`text-left rounded-lg border-2 border-ink px-3 py-2 hover:-translate-y-0.5 transition ${mut ? 'bg-tang-soft' : 'bg-aqua-soft'}`}>
              <div className="font-mono font-bold text-sm">{k}()</div><div className="text-[11px]">{desc}</div>
            </button>
          ))}
        </div>
        <p className="text-xs text-ink-soft">Orange = changes the original (mutating). Blue = returns something new (non-mutating).</p>
      </div>
      <div className="sticker bg-[#22252B] text-[#E9E4D8] p-4 font-mono text-xs h-fit">
        <div className="text-[11px] text-white/50 mb-2 font-sans font-bold">HISTORY</div>
        {log.length === 0 ? <span className="text-white/40">Press a method to begin.</span> : log.map((l, i) => <div key={i} className="mb-1.5"><div className={l.mutates ? 'text-[#FFB27D]' : 'text-[#9BD5F0]'}>{l.code}</div><div className="text-white/60">→ {l.ret}</div></div>)}
      </div>
    </div>
  );
}

/* ======================= DOM Playground ======================= */
const DOM_HTML = `<div id="app">\n  <h2 id="title">My Shopping List</h2>\n  <ul id="list">\n    <li>Milk</li>\n    <li class="done">Bread</li>\n  </ul>\n  <button id="add">Add item</button>\n</div>`;
const SNIPPETS = [
  ['Change text', 'document.querySelector("#title").textContent = "Weekend Shopping";'],
  ['Change colour', 'document.querySelector("#title").style.color = "#FF8A3D";'],
  ['Hide element', 'document.querySelector(".done").style.display = "none";'],
  ['Add element', 'const li = document.createElement("li");\nli.textContent = "Eggs";\ndocument.querySelector("#list").append(li);'],
  ['Remove element', 'document.querySelector("#list li").remove();'],
  ['Handle click', 'document.querySelector("#add").addEventListener("click", () => {\n  const li = document.createElement("li");\n  li.textContent = "Item " + (document.querySelectorAll("#list li").length + 1);\n  document.querySelector("#list").append(li);\n});'],
];
function DomNode({ n, depth = 0 }) {
  if (!n) return null;
  if (n.t === '#text') return <div className="font-mono text-[11.5px] text-ink-soft" style={{ paddingLeft: depth * 14 }}>"{n.x}"</div>;
  return (
    <div>
      <div className="font-mono text-[12px] anim-rise" style={{ paddingLeft: depth * 14 }}>
        <span className="text-tang-dark font-bold">&lt;{n.t}</span>
        {n.id && <span className="text-aqua-dark"> id="{n.id}"</span>}
        {n.c && <span className="text-leaf-dark"> class="{n.c}"</span>}
        {n.s && <span className="text-blush-dark"> style="{n.s}"</span>}
        <span className="text-tang-dark font-bold">&gt;</span>
      </div>
      {n.k.map((c, i) => <DomNode key={i} n={c} depth={depth + 1} />)}
    </div>
  );
}
export function DomLab() {
  const [js, setJs] = useState('// Click a snippet button or write your own JavaScript.\n// The DOM tree on the right updates in real time.\n');
  const [runKey, setRunKey] = useState(0);
  const [ran, setRan] = useState(js);
  const [tree, setTree] = useState(null);
  const [errs, setErrs] = useState([]);
  const run = (code = js) => { setErrs([]); setRan(code); setRunKey((k) => k + 1); };
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {SNIPPETS.map(([l, c]) => <button key={l} className="btn" onClick={() => { const n = js.trimEnd() + '\n\n' + c + '\n'; setJs(n); run(n); }}>{l}</button>)}
        <button className="btn" onClick={() => { const n = '// fresh start\n'; setJs(n); run(n); }}><LuTrash2 /> Clear code</button>
      </div>
      <div className="grid xl:grid-cols-3 gap-3">
        <div>
          <div className="flex items-center justify-between mb-1"><span className="text-xs font-bold uppercase">JavaScript</span><button className="btn btn-green text-xs py-1" onClick={() => run()}><LuPlay /> Run</button></div>
          <div className="sticker-sm overflow-hidden h-[380px]"><CodeEditor value={js} onChange={setJs} lang="js" onRun={() => run()} minHeight={0} /></div>
          {errs.length > 0 && <div className="mt-2 text-xs bg-blush-soft border-2 border-ink rounded-lg p-2"><b>{errs[0]}</b><br />{explainError(errs[0])}</div>}
        </div>
        <div>
          <div className="text-xs font-bold uppercase mb-1">Web page</div>
          <div className="sticker-sm overflow-hidden h-[380px] bg-white">
            <Preview html={DOM_HTML} css={'.done { text-decoration: line-through; color: #8a8f98 } button { padding: 6px 12px; border: 2px solid #30343B; border-radius: 8px; background: #FFD45C; }'} js={ran} runKey={runKey} reportDom onDom={setTree} onConsole={(l) => l.type === 'error' && setErrs((e) => [...e, l.text])} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase mb-1">Live DOM tree (body)</div>
          <div className="sticker-sm bg-white p-3 h-[380px] overflow-auto">{tree ? <DomNode n={tree} /> : <span className="text-sm text-ink-soft">Loading…</span>}</div>
        </div>
      </div>
      <Callout kind="info">The browser turns HTML into a tree of objects — the DOM. JavaScript changes the tree, and the browser immediately repaints the page. Click "Handle click", then press the page's button and watch new <code>&lt;li&gt;</code> nodes appear.</Callout>
    </div>
  );
}

/* ======================= Event Playground ======================= */
export function EventLab() {
  const [log, setLog] = useState([]);
  const [stop, setStop] = useState(false);
  const [capture, setCapture] = useState(false);
  const [flash, setFlash] = useState({});
  const refs = { section: useRef(null), card: useRef(null), button: useRef(null) };
  const input = useRef(null); const hover = useRef(null); const form = useRef(null); const keyArea = useRef(null);
  const stopRef = useRef(stop); stopRef.current = stop;
  const add = (entry) => setLog((l) => [{ ...entry, t: new Date().toLocaleTimeString().split(' ')[0], id: Math.random() }, ...l].slice(0, 40));
  const blink = (k) => { setFlash((f) => ({ ...f, [k]: true })); setTimeout(() => setFlash((f) => ({ ...f, [k]: false })), 500); };

  useEffect(() => {
    const cleanups = [];
    const on = (el, type, fn, opts) => { el.addEventListener(type, fn, opts); cleanups.push(() => el.removeEventListener(type, fn, opts)); };
    for (const [name, r] of Object.entries(refs)) {
      on(r.current, 'click', (e) => {
        blink(name);
        add({ type: 'click', target: e.target.dataset.n, current: name, phase: e.eventPhase === 1 ? 'capturing ↓' : e.eventPhase === 2 ? 'at target' : 'bubbling ↑' });
        if (stopRef.current && name === 'button') e.stopPropagation();
      }, { capture });
    }
    on(input.current, 'focus', () => add({ type: 'focus', target: 'input', current: 'input' }));
    on(input.current, 'input', (e) => add({ type: 'input', target: 'input', current: 'input', extra: `value = "${e.target.value}"` }));
    on(input.current, 'change', (e) => add({ type: 'change', target: 'input', current: 'input', extra: `committed "${e.target.value}"` }));
    on(input.current, 'blur', () => add({ type: 'blur', target: 'input', current: 'input' }));
    on(hover.current, 'mouseenter', () => add({ type: 'mouseenter', target: 'hover box', current: 'hover box' }));
    on(hover.current, 'mouseleave', () => add({ type: 'mouseleave', target: 'hover box', current: 'hover box' }));
    on(hover.current, 'dblclick', () => add({ type: 'dblclick', target: 'hover box', current: 'hover box' }));
    on(keyArea.current, 'keydown', (e) => { add({ type: 'keydown', target: 'key area', current: 'key area', extra: `e.key = "${e.key}"` }); if (e.key !== 'Tab') e.preventDefault(); });
    on(form.current, 'submit', (e) => { e.preventDefault(); add({ type: 'submit', target: 'form', current: 'form', extra: 'e.preventDefault() stopped the page reload' }); });
    return () => cleanups.forEach((c) => c());
  }, [capture]); // eslint-disable-line

  const colors = { click: 'bg-tang', input: 'bg-aqua', change: 'bg-aqua', keydown: 'bg-sun', submit: 'bg-leaf', focus: 'bg-mist', blur: 'bg-mist', mouseenter: 'bg-blush', mouseleave: 'bg-blush', dblclick: 'bg-tang' };
  return (
    <div className="grid xl:grid-cols-[1fr_380px] gap-4">
      <div className="space-y-4">
        <div className="sticker p-4 bg-white">
          <div className="text-xs font-bold uppercase mb-2">1 · Bubbling: click the button</div>
          <div ref={refs.section} data-n="section" className={`rounded-xl border-2 border-ink p-3 transition ${flash.section ? 'bg-sun' : 'bg-mist'}`}>
            <span className="font-mono text-xs font-bold" data-n="section">&lt;section&gt;</span>
            <div ref={refs.card} data-n="card" className={`rounded-xl border-2 border-ink p-3 mt-1 transition ${flash.card ? 'bg-sun' : 'bg-aqua-soft'}`}>
              <span className="font-mono text-xs font-bold" data-n="card">&lt;div class="card"&gt;</span>
              <div className="mt-2"><button ref={refs.button} data-n="button" className={`btn transition ${flash.button ? 'bg-sun' : 'btn-primary'}`}>&lt;button&gt; Click me</button></div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-3 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" checked={stop} onChange={(e) => setStop(e.target.checked)} /> Call <code className="inline-code">e.stopPropagation()</code> on the button</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={capture} onChange={(e) => setCapture(e.target.checked)} /> Listen in <b>capture</b> phase</label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="sticker p-4 bg-white space-y-2">
            <div className="text-xs font-bold uppercase">2 · Typing & focus</div>
            <input ref={input} placeholder="Type here, then click outside" className="w-full border-2 border-ink rounded-lg px-3 py-2" aria-label="Event test input" />
            <div ref={keyArea} tabIndex={0} className="rounded-lg border-2 border-dashed border-ink p-3 text-sm bg-sun-soft focus:bg-sun">Click here and press keys (keydown)</div>
          </div>
          <div className="sticker p-4 bg-white space-y-2">
            <div className="text-xs font-bold uppercase">3 · Mouse & forms</div>
            <div ref={hover} className="rounded-lg border-2 border-ink p-4 text-sm bg-blush-soft text-center select-none">Hover me · double-click me</div>
            <form ref={form} className="flex gap-2"><input className="flex-1 border-2 border-ink rounded-lg px-2" placeholder="email" aria-label="Form test input" /><button className="btn btn-green">Submit</button></form>
          </div>
        </div>
      </div>
      <div className="sticker bg-white p-3 h-[560px] flex flex-col">
        <div className="flex items-center justify-between mb-2"><span className="text-xs font-bold uppercase">Event log (newest first)</span><button className="btn text-xs py-1" onClick={() => setLog([])}><LuTrash2 /> Clear</button></div>
        <div className="flex-1 overflow-auto space-y-1">
          {log.length === 0 && <div className="text-sm text-ink-soft">Interact with the elements on the left…</div>}
          {log.map((l) => (
            <div key={l.id} className="text-xs border-b border-mist pb-1 anim-rise">
              <span className={`chip ${colors[l.type] || 'bg-mist'} mr-1`}>{l.type}</span>
              <span className="font-mono">target: <b>{l.target}</b>{l.current !== l.target && <> · heard on: <b>{l.current}</b></>}</span>
              {l.phase && <span className="ml-1 text-ink-soft">({l.phase})</span>}
              {l.extra && <div className="font-mono text-ink-soft pl-1">{l.extra}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ======================= Async / Event-loop Visualizer ======================= */
const PROGRAMS = {
  basic: {
    title: 'setTimeout vs Promise',
    code: 'console.log("1 start");\nsetTimeout(() => console.log("4 timeout"), 0);\nPromise.resolve().then(() => console.log("3 promise"));\nconsole.log("2 end");',
    frames: [
      { line: 1, stack: ['main()', 'console.log("1 start")'], api: [], micro: [], task: [], out: ['1 start'], note: 'Synchronous code runs on the call stack straight away.' },
      { line: 2, stack: ['main()', 'setTimeout(cb, 0)'], api: ['timer 0ms → cb'], micro: [], task: [], out: ['1 start'], note: 'setTimeout hands the callback to the browser\'s timer (a Web API). JS does not wait.' },
      { line: 2, stack: ['main()'], api: [], micro: [], task: ['timeout cb'], out: ['1 start'], note: 'The 0ms timer finishes instantly, so its callback moves to the TASK queue — it still has to wait its turn.' },
      { line: 3, stack: ['main()', 'Promise.then(cb)'], api: [], micro: ['promise cb'], task: ['timeout cb'], out: ['1 start'], note: 'A resolved promise puts its .then callback in the MICROTASK queue.' },
      { line: 4, stack: ['main()', 'console.log("2 end")'], api: [], micro: ['promise cb'], task: ['timeout cb'], out: ['1 start', '2 end'], note: 'Still synchronous.' },
      { line: 4, stack: [], api: [], micro: ['promise cb'], task: ['timeout cb'], out: ['1 start', '2 end'], note: 'The script is finished: the call stack is EMPTY. Now the event loop looks at the queues.' },
      { line: 3, stack: ['promise cb'], api: [], micro: [], task: ['timeout cb'], out: ['1 start', '2 end', '3 promise'], note: 'Microtasks always go first — ALL of them — before any task.' },
      { line: 2, stack: ['timeout cb'], api: [], micro: [], task: [], out: ['1 start', '2 end', '3 promise', '4 timeout'], note: 'Only then does the event loop take ONE task from the task queue.' },
      { line: 2, stack: [], api: [], micro: [], task: [], out: ['1 start', '2 end', '3 promise', '4 timeout'], note: 'Everything is done. Final order: 1, 2, 3, 4.' },
    ],
  },
  fetch: {
    title: 'async / await with fetch',
    code: 'async function load() {\n  console.log("loading…");\n  const res = await fetch("/api/user");\n  console.log("got data");\n}\nload();\nconsole.log("UI still responsive");',
    frames: [
      { line: 6, stack: ['main()', 'load()'], api: [], micro: [], task: [], out: [], note: 'load() is called and starts running synchronously.' },
      { line: 2, stack: ['main()', 'load()'], api: [], micro: [], task: [], out: ['loading…'], note: 'Prints before anything asynchronous happens.' },
      { line: 3, stack: ['main()', 'load()', 'fetch()'], api: ['HTTP GET /api/user'], micro: [], task: [], out: ['loading…'], note: 'fetch sends a network request through the browser (Web API).' },
      { line: 3, stack: ['main()'], api: ['HTTP GET /api/user'], micro: [], task: [], out: ['loading…'], note: 'await PAUSES load() and gives control back. The page does not freeze.' },
      { line: 7, stack: ['main()', 'console.log'], api: ['HTTP GET /api/user'], micro: [], task: [], out: ['loading…', 'UI still responsive'], note: 'The rest of the script keeps running while we wait for the network.' },
      { line: 7, stack: [], api: ['HTTP GET /api/user'], micro: [], task: [], out: ['loading…', 'UI still responsive'], note: 'Stack empty. Clicks and scrolls can be handled now.' },
      { line: 3, stack: [], api: [], micro: ['resume load()'], task: [], out: ['loading…', 'UI still responsive'], note: 'The response arrives; the promise resolves and schedules load() to resume (a microtask).' },
      { line: 4, stack: ['load() (resumed)'], api: [], micro: [], task: [], out: ['loading…', 'UI still responsive', 'got data'], note: 'load() continues after the await line.' },
    ],
  },
  interval: {
    title: 'Blocking vs non-blocking',
    code: 'setTimeout(() => console.log("timer"), 0);\nfor (let i = 0; i < 1e9; i++) {}  // heavy loop\nconsole.log("loop done");',
    frames: [
      { line: 1, stack: ['main()', 'setTimeout'], api: ['timer 0ms'], micro: [], task: [], out: [], note: 'The timer is registered.' },
      { line: 2, stack: ['main()', 'for-loop (busy…)'], api: [], micro: [], task: ['timer cb'], out: [], note: 'The timer is ready, but the call stack is busy with a huge loop. Nothing else can run — the page is frozen!' },
      { line: 3, stack: ['main()', 'console.log'], api: [], micro: [], task: ['timer cb'], out: ['loop done'], note: 'The loop finally ends.' },
      { line: 1, stack: ['timer cb'], api: [], micro: [], task: [], out: ['loop done', 'timer'], note: 'Only now can the timer callback run. Lesson: never block the main thread with heavy work.' },
    ],
  },
};
function Lane({ title, items, color, hint }) {
  return (
    <div className={`rounded-xl border-2 border-ink p-2 ${color} min-h-[150px] flex flex-col`}>
      <div className="text-[11px] font-bold uppercase">{title}</div>
      <div className="text-[10px] text-ink-soft mb-1">{hint}</div>
      <div className="flex flex-col-reverse gap-1 flex-1 justify-end">
        {items.map((x, i) => <div key={x + i} className="anim-pop bg-white border-2 border-ink rounded-md px-2 py-1 text-[11.5px] font-mono">{x}</div>)}
      </div>
    </div>
  );
}
export function EventLoopLab() {
  const [prog, setProg] = useState('basic');
  const [i, setI] = useState(0);
  const [play, setPlay] = useState(false);
  const P = PROGRAMS[prog];
  const f = P.frames[i];
  useEffect(() => { setI(0); setPlay(false); }, [prog]);
  useEffect(() => {
    if (!play) return;
    if (i >= P.frames.length - 1) { setPlay(false); return; }
    const t = setTimeout(() => setI(i + 1), 1600);
    return () => clearTimeout(t);
  }, [play, i, P.frames.length]);
  return (
    <div className="space-y-4">
      <Segmented size="md" value={prog} onChange={setProg} options={Object.entries(PROGRAMS).map(([k, v]) => ({ value: k, label: v.title }))} />
      <div className="grid xl:grid-cols-[360px_1fr] gap-4">
        <div className="space-y-3">
          <div className="sticker-sm overflow-hidden" style={{ height: P.code.split('\n').length * 21.6 + 30 }}><CodeEditor value={P.code} lang="js" readOnly onChange={() => {}} highlightLine={f.line} minHeight={0} /></div>
          <div className="sticker bg-sun-soft p-3 text-sm min-h-[90px]"><div className="text-[11px] font-bold uppercase mb-1">Step {i + 1} / {P.frames.length}</div>{f.note}</div>
          <div className="flex gap-2">
            <button className="btn" disabled={i === 0} onClick={() => { setPlay(false); setI(i - 1); }}><LuChevronLeft /></button>
            <button className="btn btn-primary" disabled={i >= P.frames.length - 1} onClick={() => { setPlay(false); setI(i + 1); }}>Next <LuChevronRight /></button>
            <button className="btn btn-blue" onClick={() => { if (i >= P.frames.length - 1) setI(0); setPlay(!play); }}>{play ? <><LuPause /> Pause</> : <><LuPlay /> Play</>}</button>
            <button className="btn" onClick={() => { setPlay(false); setI(0); }} aria-label="Restart"><LuRotateCcw /></button>
          </div>
        </div>
        <div className="space-y-3">
          <div className="grid sm:grid-cols-4 gap-2">
            <Lane title="Call stack" items={f.stack} color="bg-sun-soft" hint="runs one thing at a time" />
            <Lane title="Web APIs" items={f.api} color="bg-aqua-soft" hint="timers, fetch, events" />
            <Lane title="Microtask queue" items={f.micro} color="bg-blush-soft" hint="promises — run first" />
            <Lane title="Task queue" items={f.task} color="bg-leaf-soft" hint="timers, clicks — run after" />
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold"><span className={`w-8 h-8 rounded-full border-2 border-ink grid place-items-center ${f.stack.length === 0 ? 'bg-tang animate-spin' : 'bg-white'}`} style={{ animationDuration: '2s' }}>⟳</span> Event loop: {f.stack.length === 0 ? 'stack empty → checking queues' : 'waiting for the stack to empty'}</div>
          <div className="sticker bg-[#22252B] text-[#E9E4D8] p-3 font-mono text-sm min-h-[90px]"><div className="text-[11px] text-white/50 font-sans font-bold mb-1">CONSOLE</div>{f.out.map((o, k) => <div key={k} className="anim-rise">› {o}</div>)}</div>
        </div>
      </div>
    </div>
  );
}

