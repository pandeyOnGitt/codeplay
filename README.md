# CodePlay Academy

An interactive learning platform that teaches HTML, CSS and JavaScript from absolute zero, mapped to the B.Tech Web Technologies and JavaScript Programming syllabus.

**Learn → Understand → Experiment → Play → Practice → Prepare for Exams.**

## What's inside

| Area | Contents |
|---|---|
| Lessons | 44 topics (12 HTML + Git, 15 CSS, 17 JavaScript). Each follows the same 12-part structure: definition, why, analogy, syntax, line-by-line explanation, live editor + output, experiment, common mistakes, exam questions, practice, revision notes, quiz. JS lessons add a step-by-step execution viewer with memory and console. |
| Play & Experiment | 22 labs. HTML: page builder (drag & drop), tag explorer, structure builder, form builder, fix-the-broken-HTML. CSS: visual playground (controls ↔ canvas ↔ editable CSS, all in sync), box model, positioning (drag, all 5 modes), z-index & stacking contexts, Flexbox (with challenges), Grid (drag items into cells), display, animation studio, responsive lab. JS: variable explorer, predict the output, scope & hoisting, function machine, array playground, DOM playground (live DOM tree), event playground (bubbling/capture), event-loop visualizer. |
| Code Playground | Separate HTML / CSS / JS editors, live preview, console, error explanations, run/reset/copy/download, templates for every topic. Code runs in a sandboxed `<iframe sandbox="allow-scripts">` with an infinite-loop guard. |
| Practice | 14 auto-checked coding challenges (tests run inside the sandbox) and topic-wise MCQs. |
| Exam Prep | Exam-language notes per topic (definition, explanation, syntax, diagram, points, differences, advantages, applications, expected questions with model answers), a question bank (1/2/3/5/10-mark, programming, output-prediction, debugging, practical), revision mode (cheat sheets, confused-concept flashcards, last-minute notes). |
| Mock tests | HTML, CSS, JS, full-syllabus and topic tests. Timed, auto-scored, flag-for-review palette, explanations, weak-topic report. Answer options are shuffled each time. |
| Mini projects | 12 guided projects with steps, starter code, live preview, challenges, solution and explanation. |
| Gamification | XP, 8 levels, streaks, daily challenge, 16 badges, 8 missions, celebrations. |
| Progress | Saved in localStorage; progress dashboard with charts, weak topics, bookmarks, export/reset. |

## Run it

The repo ships with an **offline build script** (esbuild + Tailwind CSS v4, no Vite needed):

```bash
npm install
npm run build      # → dist/index.html, dist/app.js, dist/app.css
npm run dev        # watch mode + local server on http://localhost:5173
```

Open `dist/index.html` from a local web server (e.g. `npx serve dist`).

**Using Vite instead:** `vite.config.js` is included. Run `npm run vite:dev`. (The esbuild script is what this build was tested with.)

## Tech stack and deliberate substitutions

The spec asked for React + Vite + Tailwind + React Router + Framer Motion + Monaco/CodeMirror + dnd-kit + Recharts. This build was produced in an environment **without access to the npm registry**, so it uses only what was available locally and replaces the rest with small in-house modules:

| Spec | Used here | Where |
|---|---|---|
| React | React 19 | everywhere |
| Tailwind CSS | Tailwind CSS v4 (theme in `src/index.css`) | everywhere |
| Lucide React | Lucide icon set via `react-icons/lu` | everywhere |
| React Router | tiny hash router (`#lesson-css-grid`) | `src/lib/router.jsx` |
| Monaco / CodeMirror | textarea + highlight.js overlay editor (tab indent, auto-indent, bracket pairing, Ctrl+Enter) | `src/components/CodeEditor.jsx` |
| dnd-kit / React DnD | native HTML5 drag and drop + pointer events | labs |
| Recharts | hand-built SVG charts | `src/pages/Progress.jsx` |
| Framer Motion | CSS keyframe animations + canvas confetti | `src/index.css`, `src/lib/celebrate.jsx` |
| Vite | esbuild script (`build.mjs`); Vite config provided | root |

Each replacement sits behind a small component boundary, so swapping in CodeMirror, React Router or Recharts later is a local change.

## Project structure

```
src/
  data/            syllabus content (the single source of truth)
    lessons-html.js  lessons-css.js  lessons-js.js   ← lesson objects
    syllabus.js      tracks, syllabus map, question bank, challenges, missions, cheat sheets, labs
    projects.js      12 mini projects
  lib/
    storage.js       storage adapter (localStorage today; swap for an API later)
    progress.jsx     progress context: XP, levels, streaks, completion, quizzes, missions
    sandbox.js       builds the sandboxed iframe document (console bridge, tests, DOM reporter, loop guard)
    router.jsx  celebrate.jsx  achievements.js
  components/      CodeEditor, Preview, CodeLab, Quiz, StepThrough, widgets (diagrams), ui kit, Layout
  labs/            html-labs.jsx  css-labs.jsx  js-labs.jsx
  pages/           Dashboard, Roadmap, Track, Lesson, Playground, PlayHub, Lab, Projects, Practice, Exam, MockTest, Progress, Achievements
```

## Adding content

* **New lesson:** add an object to the right `lessons-*.js` file (copy an existing one; all fields are used by the lesson template, exam notes, question bank, mock tests and search automatically). Add its id to `SYLLABUS_MAP` in `syllabus.js`.
* **New challenge:** add to `CHALLENGES` with `tests: [{ label, code }]`, where `code` is a JS function body that returns `true` when the student's page passes. It runs inside the sandbox after the page loads.
* **New lab:** create a component in `src/labs/`, register it in `LABS` (syllabus.js) and `REGISTRY` (pages/Lab.jsx).

## Backend-ready data

All progress lives in one versioned object (`src/lib/storage.js` → `emptyState()`), with a reserved `profile.userId`. To add accounts and leaderboards, implement `load()/save()/reset()` against an API and pass the adapter to `<ProgressProvider adapter={…}>`.
