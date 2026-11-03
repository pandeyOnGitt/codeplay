// CodePlay Academy build script.
// Bundles the React app with esbuild and compiles Tailwind CSS v4 by scanning
// the source for class candidates. Works fully offline.
//   node build.mjs          → production build into dist/
//   node build.mjs --watch  → rebuild on change + local server on :5173
import * as esbuild from 'esbuild';
import { compile } from 'tailwindcss';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const root = path.dirname(new URL(import.meta.url).pathname);
const watch = process.argv.includes('--watch');
const out = path.join(root, 'dist');
fs.mkdirSync(out, { recursive: true });

/** Load KEY=VALUE pairs from a .env file into process.env.
 *  @param {boolean} override  when true, file values win over existing env
 */
function loadEnvFile(file, override = false) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const i = trimmed.indexOf('=');
    if (i < 0) continue;
    const key = trimmed.slice(0, i).trim();
    let val = trimmed.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (override || process.env[key] === undefined) process.env[key] = val;
  }
}

// Priority: real environment (Vercel / shell) > local `.env` > localhost fallback.
// Never bake a production URL into the repo — set VITE_API_URL on Vercel.
loadEnvFile(path.join(root, '.env'), false);
const apiUrl = (process.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const apiSource = process.env.VITE_API_URL
  ? (process.env.VERCEL ? 'Vercel env' : 'env')
  : 'fallback';
console.log(`[codeplay] API_BASE from ${apiSource}`);
if (!watch && !process.env.VITE_API_URL) {
  console.warn('[codeplay] WARNING: VITE_API_URL is unset — production builds will call localhost.');
}


function walk(dir, acc = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(jsx?|tsx?|html)$/.test(f)) acc.push(p);
  }
  return acc;
}

async function buildCss() {
  const entry = fs.readFileSync(path.join(root, 'src/index.css'), 'utf8');
  const twDir = path.dirname(require.resolve('tailwindcss/package.json'));
  const compiler = await compile(entry, {
    base: root,
    loadStylesheet: async (id, base) => {
      let file;
      if (id === 'tailwindcss') file = path.join(twDir, 'index.css');
      else if (id.startsWith('tailwindcss/')) file = path.join(twDir, id.slice(12));
      else file = path.resolve(base, id);
      return { path: file, base: path.dirname(file), content: fs.readFileSync(file, 'utf8') };
    },
  });
  const candidates = new Set();
  for (const f of walk(path.join(root, 'src'))) {
    const src = fs.readFileSync(f, 'utf8');
    for (const t of src.split(/[\s"'`{}()<>;,\\]+/)) if (t && t.length < 120) candidates.add(t);
  }
  fs.writeFileSync(path.join(out, 'app.css'), compiler.build([...candidates]));
}

const htmlTemplate = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
  .replace('<script type="module" src="/src/main.jsx"></script>', '<link rel="stylesheet" href="app.css" />\n    <script src="app.js" defer></script>')
  .replaceAll('href="/favicon', 'href="./favicon')
  .replaceAll('href="/apple-touch-icon', 'href="./apple-touch-icon');

function copyPublic() {
  const pub = path.join(root, 'public');
  if (!fs.existsSync(pub)) return;
  for (const name of fs.readdirSync(pub)) {
    const from = path.join(pub, name);
    if (!fs.statSync(from).isFile()) continue;
    fs.copyFileSync(from, path.join(out, name));
  }
}

const options = {
  entryPoints: [path.join(root, 'src/main.jsx')],
  bundle: true,
  minify: !watch,
  sourcemap: watch,
  format: 'iife',
  target: ['es2020'],
  outfile: path.join(out, 'app.js'),
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
  define: {
    'process.env.NODE_ENV': watch ? '"development"' : '"production"',
    __CODEPLAY_API_URL__: JSON.stringify(apiUrl),
  },


  plugins: [{
    name: 'css-and-html',
    setup(b) {
      // CSS is compiled by Tailwind below; keep the import in main.jsx for Vite users.
      b.onResolve({ filter: /\.css$/ }, (a) => ({ path: a.path, namespace: 'skip-css' }));
      b.onLoad({ filter: /.*/, namespace: 'skip-css' }, () => ({ contents: '', loader: 'js' }));
      b.onEnd(async (r) => {
        if (r.errors.length) return;
        await buildCss();
        copyPublic();
        fs.writeFileSync(path.join(out, 'index.html'), htmlTemplate);
        console.log(`[codeplay] built ${new Date().toLocaleTimeString()}`);
      });
    },
  }],
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: out, port: 5173 });
  console.log(`[codeplay] dev server on http://localhost:${port}`);
} else {
  await esbuild.build(options);
}
