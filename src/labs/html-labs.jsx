import { useMemo, useState } from 'react';
import { LuGripVertical, LuTrash2, LuArrowUp, LuArrowDown, LuCheck, LuShuffle, LuCopy, LuX, LuTerminal } from 'react-icons/lu';
import { useProgress } from '../lib/progress.jsx';
import { useRouter } from '../lib/router.jsx';
import { celebrate, toast } from '../lib/celebrate.jsx';
import Preview from '../components/Preview.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import { copyText } from '../components/CodeLab.jsx';
import { SyntaxBlock } from '../pages/Lesson.jsx';
import { Callout } from '../components/ui.jsx';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function sendToPlayground(code, navigate) {
  try { localStorage.setItem('codeplay-playground-draft', JSON.stringify({ html: '', css: '', js: '', ...code })); } catch { /* ignore */ }
  navigate('playground');
}

/* ======================= Page Builder ======================= */
const BLOCKS = {
  h1: { label: 'Heading', make: () => ({ text: 'Welcome to my page' }) },
  h2: { label: 'Sub-heading', make: () => ({ text: 'About me' }) },
  p: { label: 'Paragraph', make: () => ({ text: 'I am learning web development at CodePlay Academy.' }) },
  img: { label: 'Image', make: () => ({ text: 'A colourful banner' }) },
  button: { label: 'Button', make: () => ({ text: 'Contact me' }) },
  ul: { label: 'List', make: () => ({ text: 'HTML, CSS, JavaScript' }) },
  a: { label: 'Link', make: () => ({ text: 'Visit my GitHub' }) },
  hr: { label: 'Divider', make: () => ({ text: '' }) },
};
const IMG_SRC = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='120'%3E%3Crect width='320' height='120' rx='14' fill='%2355B9E8'/%3E%3Ccircle cx='70' cy='60' r='32' fill='%23FFD45C'/%3E%3Cpath d='M130 95 l50 -50 l40 40 l30 -20 l50 30z' fill='%2378C86A'/%3E%3C/svg%3E";

function blockHtml(b) {
  switch (b.type) {
    case 'img': return `<img src="banner.svg" alt="${esc(b.text)}" width="320">`;
    case 'ul': return `<ul>\n${b.text.split(',').map((x) => `    <li>${esc(x.trim())}</li>`).join('\n')}\n  </ul>`;
    case 'a': return `<a href="https://github.com">${esc(b.text)}</a>`;
    case 'hr': return '<hr>';
    default: return `<${b.type}>${esc(b.text)}</${b.type}>`;
  }
}

function RenderBlock({ b }) {
  switch (b.type) {
    case 'h1': return <h1 className="text-3xl font-bold">{b.text}</h1>;
    case 'h2': return <h2 className="text-xl font-bold">{b.text}</h2>;
    case 'p': return <p>{b.text}</p>;
    case 'img': return <img src={IMG_SRC} alt={b.text} className="max-w-full rounded" width={320} />;
    case 'button': return <button type="button" className="px-3 py-1.5 border-2 border-ink rounded bg-sun font-semibold">{b.text}</button>;
    case 'ul': return <ul className="list-disc pl-6">{b.text.split(',').map((x, i) => <li key={i}>{x.trim()}</li>)}</ul>;
    case 'a': return <a className="text-aqua-dark underline" href="#lab-page-builder" onClick={(e) => e.preventDefault()}>{b.text}</a>;
    case 'hr': return <hr className="border-ink/30" />;
    default: return null;
  }
}

export function PageBuilder() {
  const { experimentData } = useProgress();
  const { navigate } = useRouter();
  const [blocks, setBlocks] = useState([{ id: 1, type: 'h1', text: 'Welcome to my page' }]);
  const [sel, setSel] = useState(1);
  const [dragOver, setDragOver] = useState(null);
  const nextId = () => Math.max(0, ...blocks.map((b) => b.id)) + 1;

  function add(type, at = blocks.length) {
    const id = nextId();
    const nb = [...blocks]; nb.splice(at, 0, { id, type, ...BLOCKS[type].make() });
    setBlocks(nb); setSel(id);
    if (nb.length >= 5) experimentData('page-builder', { built: true });
  }
  function move(from, to) { const nb = [...blocks]; const [x] = nb.splice(from, 1); nb.splice(to, 0, x); setBlocks(nb); }
  function onDrop(e, at) {
    e.preventDefault(); setDragOver(null);
    const type = e.dataTransfer.getData('text/block'); const from = e.dataTransfer.getData('text/index');
    if (type) add(type, at); else if (from !== '') { const f = Number(from); move(f, f < at ? at - 1 : at); }
  }
  const html = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My First Website</title>\n</head>\n<body>\n${blocks.map((b) => '  ' + blockHtml(b)).join('\n')}\n</body>\n</html>`;
  const selected = blocks.find((b) => b.id === sel);

  return (
    <div className="grid lg:grid-cols-[180px_1fr_1fr] gap-4">
      <div className="sticker p-3 h-fit">
        <div className="text-xs font-bold uppercase mb-2">Elements</div>
        <p className="text-[11px] text-ink-soft mb-2">Drag onto the page, or click to add.</p>
        <div className="grid gap-1.5">
          {Object.entries(BLOCKS).map(([type, b]) => (
            <button key={type} draggable onDragStart={(e) => e.dataTransfer.setData('text/block', type)} onClick={() => add(type)}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg border-2 border-ink bg-tang-soft hover:bg-sun-soft text-sm font-semibold cursor-grab">
              {b.label}<code className="text-[10px]">&lt;{type}&gt;</code>
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs font-bold uppercase mb-1">Your web page</div>
        <div className="sticker bg-white p-4 min-h-[360px] space-y-1 font-sans" onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, blocks.length)}>
          {blocks.length === 0 && <div className="text-center text-ink-soft py-16 border-2 border-dashed border-ink/30 rounded-xl">Drop elements here to build your page</div>}
          {blocks.map((b, i) => (
            <div key={b.id} draggable onDragStart={(e) => e.dataTransfer.setData('text/index', String(i))}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragOver(i); }} onDrop={(e) => { e.stopPropagation(); onDrop(e, i); }}
              onClick={() => setSel(b.id)}
              className={`group relative rounded-lg p-2 pl-7 border-2 cursor-pointer ${sel === b.id ? 'border-aqua bg-aqua-soft/40' : 'border-transparent hover:border-ink/20'} ${dragOver === i ? 'border-t-tang border-t-4' : ''}`}>
              <LuGripVertical className="absolute left-1.5 top-1/2 -translate-y-1/2 text-ink-soft opacity-60 cursor-grab" />
              <span className="absolute right-1 top-1 text-[10px] font-mono bg-ink text-cream px-1 rounded opacity-0 group-hover:opacity-100">&lt;{b.type}&gt;</span>
              <RenderBlock b={b} />
            </div>
          ))}
        </div>
        {selected && (
          <div className="sticker-sm bg-sun-soft p-3 mt-3 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold">Selected &lt;{selected.type}&gt;</span>
            {selected.type !== 'hr' && (
              <input value={selected.text} onChange={(e) => setBlocks(blocks.map((b) => (b.id === sel ? { ...b, text: e.target.value } : b)))}
                className="flex-1 min-w-[160px] border-2 border-ink rounded-md px-2 py-1 text-sm" aria-label={selected.type === 'img' ? 'Alt text' : selected.type === 'ul' ? 'List items, comma separated' : 'Text'}
                placeholder={selected.type === 'img' ? 'alt text' : selected.type === 'ul' ? 'items, comma separated' : 'text'} />
            )}
            {(() => { const i = blocks.findIndex((b) => b.id === sel); return (<>
              <button className="btn px-2" disabled={i === 0} onClick={() => move(i, i - 1)} aria-label="Move up"><LuArrowUp /></button>
              <button className="btn px-2" disabled={i === blocks.length - 1} onClick={() => move(i, i + 1)} aria-label="Move down"><LuArrowDown /></button>
              <button className="btn px-2 bg-blush-soft" onClick={() => { setBlocks(blocks.filter((b) => b.id !== sel)); setSel(null); }} aria-label="Delete"><LuTrash2 /></button>
            </>); })()}
            {selected.type === 'img' && <span className="text-[11px] w-full">For images, the text is the <b>alt</b> description read by screen readers.</span>}
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between mb-1"><div className="text-xs font-bold uppercase">Generated HTML</div>
          <div className="flex gap-1"><button className="btn text-xs py-1" onClick={() => copyText(html)}><LuCopy /> Copy</button>
            <button className="btn btn-sun text-xs py-1" onClick={() => sendToPlayground({ html: blocks.map(blockHtml).join('\n').replace('banner.svg', IMG_SRC) }, navigate)}><LuTerminal /> Open in Playground</button></div></div>
        <SyntaxBlock code={html} lang="html" />
        <Callout kind="info">Every block you add becomes a real HTML tag. Notice how the whole page lives inside <code>&lt;body&gt;</code>, while the title sits in <code>&lt;head&gt;</code>.</Callout>
      </div>
    </div>
  );
}

/* ======================= Tag Explorer ======================= */
const TAGS = [
  ['h1', 'Heading', 'The most important heading on the page.', 'Gives a title so users and search engines know what the page is about.', '<h1>Admissions 2026</h1>', 'Page titles, hero banners'],
  ['p', 'Paragraph', 'A block of text.', 'Separates text into readable paragraphs with spacing.', '<p>Classes start on 1 August.</p>', 'Articles, descriptions, notes'],
  ['a', 'Anchor (link)', 'A clickable link to another page or place.', 'Connects pages — the core idea of the web.', '<a href="https://example.com">Visit</a>', 'Menus, "Read more", downloads'],
  ['img', 'Image', 'Displays a picture. Void element.', 'Shows photos, logos and illustrations; alt describes it.', `<img src="${IMG_SRC}" alt="Banner" width="200">`, 'Product photos, avatars, banners'],
  ['ul', 'Unordered list', 'A bulleted list of items (li).', 'Groups related items where order does not matter.', '<ul><li>Pens</li><li>Notebook</li></ul>', 'Navigation menus, feature lists'],
  ['ol', 'Ordered list', 'A numbered list of items (li).', 'Shows steps or rankings where order matters.', '<ol><li>Sign up</li><li>Verify email</li></ol>', 'Instructions, top-10 lists'],
  ['table', 'Table', 'Rows (tr) and cells (th/td) of data.', 'Presents tabular data clearly.', '<table border="1"><tr><th>Name</th><th>Marks</th></tr><tr><td>Riya</td><td>92</td></tr></table>', 'Timetables, marksheets, price lists'],
  ['form', 'Form', 'Container for input controls.', 'Collects user data and submits it.', '<form><input placeholder="Search"> <button>Go</button></form>', 'Login, search, registration'],
  ['input', 'Input', 'A field the user can type into or select. Void element.', 'Different types give different controls and validation.', '<input type="date"> <input type="range"> <input type="color">', 'Every form on the web'],
  ['label', 'Label', 'A caption for a form control.', 'Makes forms accessible and increases click area.', '<label for="e">Email</label> <input id="e" type="email">', 'All form fields'],
  ['button', 'Button', 'A clickable button.', 'Triggers actions: submit forms, run JavaScript.', '<button>Add to cart</button>', 'Submit, buy, like, play'],
  ['select', 'Select', 'A drop-down list of options.', 'Lets users choose one value from many.', '<select><option>B.Tech</option><option>BCA</option></select>', 'Country, course, size pickers'],
  ['textarea', 'Textarea', 'A multi-line text field.', 'For long text like comments or addresses.', '<textarea rows="3">Your feedback…</textarea>', 'Comments, messages, addresses'],
  ['div', 'Division', 'A generic block container with no meaning.', 'Groups elements for layout and styling.', '<div style="background:#FFF3CC;padding:8px">A box</div>', 'Layout wrappers, cards'],
  ['span', 'Span', 'A generic inline container with no meaning.', 'Styles a part of a line of text.', '<p>Price: <span style="color:green">₹499</span></p>', 'Highlights, badges, icons'],
  ['header', 'Header', 'Introductory content of a page or section.', 'Semantic landmark for logos and navigation.', '<header><h2>My Blog</h2></header>', 'Top of pages and articles'],
  ['nav', 'Navigation', 'A block of major navigation links.', 'Lets screen readers jump to the menu.', '<nav><a href="#">Home</a> | <a href="#">About</a></nav>', 'Main menus, breadcrumbs'],
  ['main', 'Main', 'The main unique content of a page.', 'Landmark for the primary content; one per page.', '<main><p>Main content here</p></main>', 'Wrapping page content'],
  ['article', 'Article', 'Self-contained content that makes sense alone.', 'Marks content that could be shared independently.', '<article><h3>News</h3><p>Fest announced</p></article>', 'Blog posts, news, product cards'],
  ['section', 'Section', 'A themed group of content with a heading.', 'Splits a page into meaningful parts.', '<section><h3>Courses</h3><p>…</p></section>', 'Chapters, page sections'],
  ['footer', 'Footer', 'Closing content of a page or section.', 'Holds copyright, contact and links.', '<footer>© 2026 CodePlay</footer>', 'Bottom of pages'],
  ['strong', 'Strong', 'Text of strong importance.', 'Semantic bold that screen readers can stress.', '<p><strong>Warning:</strong> deadline today</p>', 'Warnings, key points'],
  ['video', 'Video', 'Embeds a video player.', 'Native video without plugins.', '<video controls width="220"></video>', 'Lectures, product demos'],
  ['iframe', 'Inline frame', 'Embeds another web page.', 'Shows maps, videos or widgets from other sites.', '<iframe srcdoc="<p>I am a page inside a page</p>" width="220" height="60" title="demo"></iframe>', 'Google Maps, YouTube embeds'],
];

export function TagExplorer() {
  const [tag, setTag] = useState('h1');
  const [q, setQ] = useState('');
  const t = TAGS.find((x) => x[0] === tag);
  const list = TAGS.filter((x) => (x[0] + x[1]).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="grid md:grid-cols-[230px_1fr] gap-4">
      <div className="sticker p-3 h-fit">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter tags…" aria-label="Filter tags" className="w-full border-2 border-ink rounded-lg px-2 py-1 text-sm mb-2" />
        <div className="flex flex-wrap gap-1.5 max-h-[480px] overflow-auto">
          {list.map(([name]) => (
            <button key={name} onClick={() => setTag(name)} className={`font-mono text-sm px-2 py-1 rounded-md border-2 border-ink ${tag === name ? 'bg-ink text-cream' : 'bg-white hover:bg-sun-soft'}`}>&lt;{name}&gt;</button>
          ))}
        </div>
      </div>
      <div className="sticker p-5 anim-rise" key={tag}>
        <div className="flex items-baseline gap-3"><h2 className="font-mono text-3xl font-bold text-tang-dark">&lt;{t[0]}&gt;</h2><span className="font-display text-xl">{t[1]}</span></div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div><div className="text-xs font-bold uppercase text-ink-soft">Definition</div><p>{t[2]}</p>
            <div className="text-xs font-bold uppercase text-ink-soft mt-3">Purpose</div><p>{t[3]}</p>
            <div className="text-xs font-bold uppercase text-ink-soft mt-3">Where it is used</div><p>{t[5]}</p></div>
          <div><div className="text-xs font-bold uppercase text-ink-soft mb-1">Syntax</div><SyntaxBlock code={t[4].replace(IMG_SRC, 'banner.svg')} lang="html" />
            <div className="text-xs font-bold uppercase text-ink-soft mt-3 mb-1">Rendered output</div>
            <div className="sticker-sm overflow-hidden h-[140px]"><Preview html={t[4]} css="" js="" title={`${t[0]} output`} /></div></div>
        </div>
      </div>
    </div>
  );
}

/* ======================= Structure Builder ======================= */
const SKELETON = ['<!DOCTYPE html>', '<html lang="en">', '<head>', '<meta charset="UTF-8">', '<title>My Page</title>', '</head>', '<body>', '<h1>Hello!</h1>', '</body>', '</html>'];
const shuffle = (a) => { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };
const INDENT = { '<html lang="en">': 0, '<head>': 1, '</head>': 1, '<body>': 1, '</body>': 1, '<meta charset="UTF-8">': 2, '<title>My Page</title>': 2, '<h1>Hello!</h1>': 2 };

export function StructureBuilder() {
  const { completeExperiment } = useProgress();
  const [order, setOrder] = useState(() => shuffle(SKELETON));
  const [checked, setChecked] = useState(false);
  const [drag, setDrag] = useState(null);
  const correctAt = (i) => order[i] === SKELETON[i] || (i === 3 && order[3] === SKELETON[4] && order[4] === SKELETON[3]) || (i === 4 && order[4] === SKELETON[3] && order[3] === SKELETON[4]);
  const allRight = order.every((_, i) => correctAt(i));
  const move = (from, to) => { const x = [...order]; const [v] = x.splice(from, 1); x.splice(to, 0, v); setOrder(x); setChecked(false); };
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <div>
        <p className="mb-3 text-sm">Drag the lines (or use the arrows) to build a valid HTML document. Press <b>Check</b> to see which lines are in the right place.</p>
        <ol className="space-y-1.5">
          {order.map((line, i) => (
            <li key={line} draggable onDragStart={() => setDrag(i)} onDragOver={(e) => e.preventDefault()} onDrop={() => { if (drag !== null) move(drag, i); setDrag(null); }}
              className={`flex items-center gap-2 rounded-lg border-2 px-2 py-1.5 bg-white cursor-grab ${checked ? (correctAt(i) ? 'border-leaf-dark bg-leaf-soft' : 'border-blush-dark bg-blush-soft') : 'border-ink'}`}>
              <LuGripVertical className="text-ink-soft shrink-0" />
              <span className="text-[11px] font-mono w-5 text-ink-soft">{i + 1}</span>
              <code className="flex-1 !bg-transparent !border-0 text-[13px]" style={{ paddingLeft: checked && correctAt(i) ? (INDENT[line] || 0) * 18 : 0 }}>{line}</code>
              <button className="p-1" disabled={i === 0} onClick={() => move(i, i - 1)} aria-label="Move up"><LuArrowUp /></button>
              <button className="p-1" disabled={i === order.length - 1} onClick={() => move(i, i + 1)} aria-label="Move down"><LuArrowDown /></button>
            </li>
          ))}
        </ol>
        <div className="flex gap-2 mt-3">
          <button className="btn btn-primary" onClick={() => { setChecked(true); if (allRight) { celebrate('Perfect structure!'); completeExperiment('structure-builder', 'HTML Structure Builder'); } }}><LuCheck /> Check</button>
          <button className="btn" onClick={() => { setOrder(shuffle(SKELETON)); setChecked(false); }}><LuShuffle /> Shuffle</button>
        </div>
        {checked && <div className={`mt-3 rounded-lg px-3 py-2 text-sm ${allRight ? 'bg-leaf-soft' : 'bg-sun-soft'}`}>{allRight ? 'Correct! DOCTYPE first, then html wraps head (metadata) and body (visible content).' : `${order.filter((_, i) => correctAt(i)).length} of ${order.length} lines are in place. Hint: every opening tag must close after everything inside it.`}</div>}
      </div>
      <div className="space-y-3">
        <Callout kind="tip" title="Think of it as nesting boxes">
          <code>&lt;html&gt;</code> is the big box. Inside it are two boxes: <code>&lt;head&gt;</code> (information about the page) and <code>&lt;body&gt;</code> (what you see). A box must be closed after everything inside it.
        </Callout>
        <div className="sticker p-4">
          <div className="text-xs font-bold uppercase mb-2">The tree you are building</div>
          <div className="font-mono text-sm space-y-1">
            <div className="rounded-lg border-2 border-ink bg-tang-soft p-2">html
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="rounded-lg border-2 border-ink bg-aqua-soft p-2">head<div className="text-xs mt-1">meta · title</div></div>
                <div className="rounded-lg border-2 border-ink bg-leaf-soft p-2">body<div className="text-xs mt-1">h1</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================= Form Builder ======================= */
const FIELD_TYPES = [
  { key: 'name', label: 'Full name', type: 'text', attrs: 'minlength="3"' },
  { key: 'email', label: 'Email', type: 'email', attrs: '' },
  { key: 'password', label: 'Password', type: 'password', attrs: 'minlength="8"' },
  { key: 'phone', label: 'Mobile number', type: 'tel', attrs: 'pattern="[0-9]{10}"' },
  { key: 'dob', label: 'Date of birth', type: 'date', attrs: '' },
  { key: 'age', label: 'Age', type: 'number', attrs: 'min="16" max="60"' },
  { key: 'gender', label: 'Gender', type: 'radio', options: ['Female', 'Male', 'Other'] },
  { key: 'course', label: 'Course', type: 'select', options: ['B.Tech AI', 'BCA', 'MCA'] },
  { key: 'hobbies', label: 'Hobbies', type: 'checkbox', options: ['Coding', 'Music', 'Sports'] },
  { key: 'address', label: 'Address', type: 'textarea', attrs: 'rows="3"' },
  { key: 'photo', label: 'Profile photo', type: 'file', attrs: 'accept="image/*"' },
  { key: 'colour', label: 'Favourite colour', type: 'color', attrs: '' },
];

function fieldHtml(f, req) {
  const r = req ? ' required' : '';
  if (f.type === 'radio' || f.type === 'checkbox') {
    return `  <fieldset>\n    <legend>${f.label}</legend>\n${f.options.map((o, i) => `    <label><input type="${f.type}" name="${f.key}" value="${o}"${f.type === 'radio' && i === 0 ? r : ''}> ${o}</label>`).join('\n')}\n  </fieldset>`;
  }
  if (f.type === 'select') return `  <label for="${f.key}">${f.label}</label>\n  <select id="${f.key}" name="${f.key}"${r}>\n${f.options.map((o) => `    <option>${o}</option>`).join('\n')}\n  </select>`;
  if (f.type === 'textarea') return `  <label for="${f.key}">${f.label}</label>\n  <textarea id="${f.key}" name="${f.key}" ${f.attrs}${r}></textarea>`;
  return `  <label for="${f.key}">${f.label}</label>\n  <input type="${f.type}" id="${f.key}" name="${f.key}"${f.attrs ? ' ' + f.attrs : ''}${r}>`;
}

const FORM_CSS = `form { display: grid; gap: 6px; max-width: 340px; font-family: system-ui; }\ninput:not([type=radio]):not([type=checkbox]), select, textarea { padding: 6px; border: 2px solid #30343B; border-radius: 6px; }\nfieldset { border: 2px solid #30343B; border-radius: 6px; }\nbutton { padding: 8px; background: #FF8A3D; border: 2px solid #30343B; border-radius: 6px; font-weight: bold; }\ninput:user-invalid { border-color: #E0567F; }`;
const FORM_JS = `document.querySelector("form").addEventListener("submit", (e) => {\n  e.preventDefault();\n  const data = {};\n  new FormData(e.target).forEach((v, k) => { data[k] = data[k] ? [].concat(data[k], v) : v; });\n  console.log("Submitted:", data);\n});`;

export function FormBuilder() {
  const { experimentData } = useProgress();
  const [picked, setPicked] = useState(['name', 'email', 'course']);
  const [required, setRequired] = useState({ name: true, email: true });
  const [title, setTitle] = useState('Hackathon Registration');
  const [btn, setBtn] = useState('Register');
  const fields = picked.map((k) => FIELD_TYPES.find((f) => f.key === k));
  const html = `<form>\n  <h2>${esc(title)}</h2>\n${fields.map((f) => fieldHtml(f, required[f.key])).join('\n')}\n  <button type="submit">${esc(btn)}</button>\n</form>`;
  const toggle = (k) => { const n = picked.includes(k) ? picked.filter((x) => x !== k) : [...picked, k]; setPicked(n); if (n.length >= 6) experimentData('form-builder', { big: true }); };
  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-4">
      <div className="sticker p-4 h-fit space-y-3">
        <label className="block text-sm font-semibold">Form title<input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 border-2 border-ink rounded-md px-2 py-1 font-normal" /></label>
        <label className="block text-sm font-semibold">Button text<input value={btn} onChange={(e) => setBtn(e.target.value)} className="w-full mt-1 border-2 border-ink rounded-md px-2 py-1 font-normal" /></label>
        <div>
          <div className="text-xs font-bold uppercase mb-1">Fields</div>
          {FIELD_TYPES.map((f) => (
            <div key={f.key} className="flex items-center justify-between text-sm py-0.5">
              <label className="flex items-center gap-2"><input type="checkbox" checked={picked.includes(f.key)} onChange={() => toggle(f.key)} />{f.label} <code className="text-[10px]">{f.type}</code></label>
              {picked.includes(f.key) && f.type !== 'checkbox' && (
                <label className="text-[11px] flex items-center gap-1" title="required"><input type="checkbox" checked={!!required[f.key]} onChange={(e) => setRequired({ ...required, [f.key]: e.target.checked })} />req</label>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid xl:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-1"><div className="text-xs font-bold uppercase">Generated HTML</div><button className="btn text-xs py-1" onClick={() => copyText(html)}><LuCopy /> Copy</button></div>
          <SyntaxBlock code={html} lang="html" />
        </div>
        <div>
          <div className="text-xs font-bold uppercase mb-1">Live form (try submitting!)</div>
          <PreviewWithConsole html={html} css={FORM_CSS} js={FORM_JS} height={430} />
          <Callout kind="tip">Mark a field <b>req</b> and try submitting it empty — the browser blocks it. Radios share one <code>name</code> so only one can be chosen.</Callout>
        </div>
      </div>
    </div>
  );
}

export function PreviewWithConsole({ html, css, js, height = 300, reportDom, onDom }) {
  const [logs, setLogs] = useState([]);
  const key = useMemo(() => html + css + js, [html, css, js]);
  return (
    <div className="space-y-2">
      <div className="sticker-sm overflow-hidden bg-white" style={{ height }}>
        <Preview key={key} html={html} css={css} js={js} reportDom={reportDom} onDom={onDom} onConsole={(l) => setLogs((x) => (l.type === 'clear' ? [] : [...x.slice(-30), l]))} />
      </div>
      <div className="sticker-sm bg-[#22252B] text-[#E9E4D8] font-mono text-xs p-2 h-24 overflow-auto">
        {logs.length === 0 ? <span className="text-white/40 italic">console output</span> : logs.map((l, i) => <div key={i} className={l.type === 'error' ? 'text-[#FF8F8F]' : ''}>› {l.text}</div>)}
      </div>
    </div>
  );
}

/* ======================= Fix the Broken HTML ======================= */
const BROKEN = [
  { title: 'Tags closed in the wrong order', code: '<p>This is <b>very important</p></b>', hint: 'The last tag opened must be the first one closed: <b> inside <p> means </b> comes before </p>.', check: (c) => /<p>[^<]*<b>[^<]*<\/b>\s*<\/p>/i.test(c) },
  { title: 'Missing quote in an attribute', code: '<a href="about.html>About us</a>', hint: 'Attribute values need an opening AND a closing quote.', check: (c) => /<a\s+href="about\.html"\s*>\s*About us\s*<\/a>/i.test(c) },
  { title: 'Inaccessible image', code: '<img src="logo.png">', hint: 'Every image needs alt text describing it.', check: (c) => /<img[^>]*\salt="[^"]{3,}"[^>]*>/i.test(c) && /src="logo\.png"/.test(c) },
  { title: 'Wrong child inside a list', code: '<ul>\n  <p>Phones</p>\n  <p>Laptops</p>\n</ul>', hint: 'Only <li> elements may be direct children of <ul>.', check: (c) => /<ul>\s*<li>\s*Phones\s*<\/li>\s*<li>\s*Laptops\s*<\/li>\s*<\/ul>/i.test(c) },
  { title: 'Label not connected', code: '<label>Email</label>\n<input type="email" id="email">', hint: 'Use for="email" on the label so it points to the input\'s id.', check: (c) => /<label[^>]*for="email"[^>]*>\s*Email\s*<\/label>/i.test(c) && /id="email"/.test(c) },
  { title: 'Heading in the head', code: '<!DOCTYPE html>\n<html>\n<head>\n  <h1>My Blog</h1>\n  <title>Blog</title>\n</head>\n<body>\n</body>\n</html>', hint: 'Visible content like <h1> belongs inside <body>.', check: (c) => { const head = (c.match(/<head>([\s\S]*?)<\/head>/i) || [])[1] || ''; const body = (c.match(/<body>([\s\S]*?)<\/body>/i) || [])[1] || ''; return !/<h1/i.test(head) && /<h1>\s*My Blog\s*<\/h1>/i.test(body) && /<title>Blog<\/title>/i.test(head); } },
];

export function FixHtml() {
  const { completeExperiment } = useProgress();
  const [codes, setCodes] = useState(BROKEN.map((b) => b.code));
  const [i, setI] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const solved = codes.map((c, k) => BROKEN[k].check(c));
  const ok = solved[i];
  const all = solved.every(Boolean);
  function check() {
    if (ok) {
      toast('Fixed!', 'win');
      if (all) { celebrate('All bugs squashed!', true); completeExperiment('fix-html', 'Fix the Broken HTML'); }
      else { const nxt = solved.findIndex((s, k) => !s && k !== i); if (nxt >= 0) { setI(nxt); setShowHint(false); } }
    } else { toast('Not quite yet — check the hint', 'error'); setShowHint(true); }
  }
  return (
    <div className="grid lg:grid-cols-[220px_1fr] gap-4">
      <div className="sticker p-3 h-fit">
        <div className="text-xs font-bold uppercase mb-2">Bugs {solved.filter(Boolean).length}/{BROKEN.length}</div>
        {BROKEN.map((b, k) => (
          <button key={k} onClick={() => { setI(k); setShowHint(false); }} className={`w-full text-left text-sm px-2 py-1.5 rounded-lg mb-1 flex items-center gap-2 ${k === i ? 'bg-ink text-cream' : 'hover:bg-mist'}`}>
            <span className={`w-5 h-5 rounded-full border-2 grid place-items-center text-[10px] ${solved[k] ? 'bg-leaf border-ink text-ink' : 'border-current'}`}>{solved[k] ? <LuCheck /> : k + 1}</span>{b.title}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        <div className="sticker p-4">
          <h3 className="font-semibold text-lg">{i + 1}. {BROKEN[i].title}</h3>
          <p className="text-sm text-ink-soft">Edit the code to fix the mistake, then press Check.</p>
          <div className="grid md:grid-cols-2 gap-3 mt-3">
            <div className="sticker-sm overflow-hidden h-[220px]"><CodeEditor value={codes[i]} lang="html" onChange={(v) => setCodes(codes.map((c, k) => (k === i ? v : c)))} minHeight={0} /></div>
            <div className="sticker-sm overflow-hidden h-[220px] bg-white"><Preview html={codes[i]} css="" js="" /></div>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <button className="btn btn-primary" onClick={check}><LuCheck /> Check</button>
            <button className="btn" onClick={() => setShowHint(!showHint)}>Hint</button>
            <button className="btn" onClick={() => setCodes(codes.map((c, k) => (k === i ? BROKEN[k].code : c)))}><LuX /> Reset</button>
            {ok && <span className="chip bg-leaf self-center"><LuCheck /> Looks correct</span>}
          </div>
          {showHint && <Callout kind="tip">{BROKEN[i].hint}</Callout>}
        </div>
        <Callout kind="info">Browsers are forgiving: broken HTML often still <i>looks</i> fine, but it confuses screen readers, search engines and your CSS/JS. Always validate your markup at validator.w3.org.</Callout>
      </div>
    </div>
  );
}


