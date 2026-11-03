import { htmlLessons } from './lessons-html.js';
import { cssLessons } from './lessons-css.js';
import { jsLessons } from './lessons-js.js';

export const TRACKS = {
  html: { id: 'html', title: 'HTML', tagline: 'Build the Structure', color: 'tang', hex: '#FF8A3D', soft: 'bg-tang-soft', difficulty: 'Beginner friendly', lessons: htmlLessons },
  css: { id: 'css', title: 'CSS', tagline: 'Make It Beautiful', color: 'aqua', hex: '#55B9E8', soft: 'bg-aqua-soft', difficulty: 'Beginner → Advanced', lessons: cssLessons },
  js: { id: 'js', title: 'JavaScript', tagline: 'Make It Interactive', color: 'sun', hex: '#FFD45C', soft: 'bg-sun-soft', difficulty: 'Elementary → Advanced', lessons: jsLessons },
};

export const ALL_LESSONS = [...htmlLessons, ...cssLessons, ...jsLessons];
export const LESSON_BY_ID = Object.fromEntries(ALL_LESSONS.map((l) => [l.id, l]));
export const LEVELS = ['Beginner', 'Elementary', 'Intermediate', 'Advanced'];

export function neighbours(id) {
  const l = LESSON_BY_ID[id];
  if (!l) return {};
  const list = TRACKS[l.track].lessons;
  const i = list.findIndex((x) => x.id === id);
  return { prev: list[i - 1], next: list[i + 1], index: i, total: list.length };
}

/** A lesson is "unlocked" when it is the first of its track or the one before it is complete.
 *  Locked lessons are still open to explore — locking is guidance, not a wall. */
export function isUnlocked(id, completed) {
  const { prev } = neighbours(id);
  return !prev || !!completed[prev.id];
}

/** All MCQs, tagged with their topic. */
export const MCQS = ALL_LESSONS.flatMap((l) => (l.quiz || []).map((q, i) => ({ ...q, id: `${l.id}-q${i}`, topic: l.id, track: l.track })));

/** Map of the official university syllabus units → lessons that cover them. */
export const SYLLABUS_MAP = [
  { course: 'Web Technologies (HTML & CSS)', module: 'Module I', unit: 'HTML Fundamentals', lessons: ['html-web-intro', 'html-what-is', 'html-structure', 'html-text', 'html-links', 'html-images-media', 'html-lists', 'html-attributes', 'html-tables', 'html-forms', 'html-semantic'] },
  { course: 'Web Technologies (HTML & CSS)', module: 'Module I', unit: 'Version Control with Git and GitHub', lessons: ['git-basics'] },
  { course: 'Web Technologies (HTML & CSS)', module: 'Module II', unit: 'CSS Fundamentals and Responsive Layout Design', lessons: ['css-intro', 'css-selectors', 'css-cascade', 'css-colors-type', 'css-units', 'css-box-model', 'css-display', 'css-position', 'css-zindex-overflow', 'css-flexbox', 'css-grid', 'css-responsive', 'css-animations'] },
  { course: 'Web Technologies (HTML & CSS)', module: 'Module II', unit: 'CSS Preprocessors and Advanced Styling', lessons: ['css-sass', 'css-animations'] },
  { course: 'Web Technologies (HTML & CSS)', module: 'Module III', unit: 'Modern CSS Frameworks', lessons: ['css-frameworks'] },
  { course: 'Web Technologies (HTML & CSS)', module: 'Module III', unit: 'Frontend Project Development', lessons: ['html-semantic', 'css-responsive', 'git-basics'], projects: true },
  { course: 'JavaScript Programming', module: 'Module I', unit: 'JavaScript Fundamentals', lessons: ['js-intro', 'js-variables', 'js-datatypes', 'js-operators', 'js-conditions', 'js-loops', 'js-strings-math'] },
  { course: 'JavaScript Programming', module: 'Module I', unit: 'Functions and Functional Programming', lessons: ['js-functions', 'js-scope', 'js-hof'] },
  { course: 'JavaScript Programming', module: 'Module II', unit: 'Arrays, Objects, and JSON', lessons: ['js-arrays', 'js-objects-json'] },
  { course: 'JavaScript Programming', module: 'Module II', unit: 'Object-Oriented JavaScript', lessons: ['js-oop', 'js-modern'] },
  { course: 'JavaScript Programming', module: 'Module III', unit: 'Modern JavaScript Application Development', lessons: ['js-modern', 'js-async', 'js-dom', 'js-events'] },
  { course: 'JavaScript Programming', module: 'Module III', unit: 'Project-Based Web Development', lessons: ['js-async', 'js-events', 'git-basics'], projects: true },
];

/* ---------- Extra question types for the question bank ---------- */
export const EXTRA_QUESTIONS = [
  // Output prediction
  { type: 'output', topic: 'js-datatypes', q: 'console.log(1 + "2" + 3); console.log(1 + 2 + "3");', a: '"123" and "33". Evaluation goes left to right; once a string appears, + joins text.' },
  { type: 'output', topic: 'js-operators', q: 'console.log([] == false, [] === false, !![]);', a: 'true false true. [] coerces to "" then 0, and false to 0, so == is true; === compares types; an empty array is truthy.' },
  { type: 'output', topic: 'js-scope', q: 'for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }', a: '3 3 3. var creates one shared i; when the callbacks run, the loop has finished and i is 3. With let it prints 0 1 2.' },
  { type: 'output', topic: 'js-scope', q: 'console.log(typeof hoisted); function hoisted() {} console.log(typeof later); var later = () => {};', a: '"function" and "undefined". Function declarations are hoisted with their body; var later is hoisted as undefined.' },
  { type: 'output', topic: 'js-async', q: 'console.log("A"); setTimeout(() => console.log("B")); Promise.resolve().then(() => console.log("C")); console.log("D");', a: 'A D C B. Synchronous logs first, then microtasks (C), then tasks (B).' },
  { type: 'output', topic: 'js-arrays', q: 'const a = [3, 20, 100]; a.sort(); console.log(a);', a: '[100, 20, 3]. Default sort compares strings: "100" < "20" < "3".' },
  { type: 'output', topic: 'js-objects-json', q: 'const a = { x: 1 }; const b = a; b.x = 5; console.log(a.x);', a: '5. Objects are copied by reference; a and b point to the same object.' },
  { type: 'output', topic: 'js-functions', q: 'function f(a, b = a * 2) { return a + b; } console.log(f(3), f(3, 1));', a: '9 and 4. In the first call b defaults to 6; in the second b is 1.' },
  { type: 'output', topic: 'css-cascade', q: 'p { color: red } .x { color: blue } #y { color: green } — what colour is <p class="x" id="y">?', a: 'Green. The ID selector has the highest specificity (1,0,0).' },
  { type: 'output', topic: 'css-box-model', q: '.b { width: 100px; padding: 10px; border: 5px solid; margin: 20px; } — total horizontal space taken in content-box?', a: '100 + 20 + 10 + 40 = 170px (content + padding + border + margin). The visible box is 130px.' },
  // Debugging
  { type: 'debug', topic: 'html-forms', q: '<label>Email</label><input type="email" id="mail">  — the label does not focus the input when clicked. Fix it.', a: 'Connect them: <label for="mail">Email</label>. The for value must match the input id.' },
  { type: 'debug', topic: 'css-position', q: '.badge { position: absolute; top: 0; right: 0; } appears at the top-right of the whole page instead of the card.', a: 'Add position: relative to the card so it becomes the containing block for the badge.' },
  { type: 'debug', topic: 'css-zindex-overflow', q: '.menu { z-index: 999; } still appears behind the header.', a: 'z-index only works on positioned elements. Add position: relative (or absolute), and check the parent is not creating a lower stacking context.' },
  { type: 'debug', topic: 'js-dom', q: 'document.querySelectorAll(".item").style.color = "red"; throws an error.', a: 'querySelectorAll returns a NodeList. Loop: document.querySelectorAll(".item").forEach(el => el.style.color = "red");' },
  { type: 'debug', topic: 'js-events', q: 'btn.addEventListener("click", showMessage()); — the message shows immediately on page load and never on click.', a: 'Remove the parentheses: addEventListener("click", showMessage). With () the function runs immediately and its result is passed.' },
  { type: 'debug', topic: 'js-async', q: 'const data = fetch("/api/users"); console.log(data.length); prints undefined.', a: 'fetch returns a Promise. Use: const res = await fetch("/api/users"); const data = await res.json(); inside an async function.' },
  { type: 'debug', topic: 'js-loops', q: 'for (let i = 0; i <= arr.length; i++) console.log(arr[i].name); — crashes on the last iteration.', a: 'Use i < arr.length. At i === arr.length, arr[i] is undefined and reading .name throws.' },
  // Programming
  { type: 'program', topic: 'js-loops', q: 'Write a program to print the Fibonacci series up to 10 terms.', a: 'let a = 0, b = 1; for (let i = 0; i < 10; i++) { console.log(a); [a, b] = [b, a + b]; } // 0 1 1 2 3 5 8 13 21 34' },
  { type: 'program', topic: 'js-arrays', q: 'Write a function that returns the second largest number in an array.', a: 'const second = arr => [...new Set(arr)].sort((a, b) => b - a)[1];' },
  { type: 'program', topic: 'js-strings-math', q: 'Write a function to count vowels in a string.', a: 'const vowels = s => (s.match(/[aeiou]/gi) || []).length;' },
  { type: 'program', topic: 'js-functions', q: 'Write a function to check whether a number is prime.', a: 'function isPrime(n) { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; }' },
  { type: 'program', topic: 'js-objects-json', q: 'Given an array of student objects { name, marks }, print the names of students who scored above the class average.', a: 'const avg = list.reduce((s, x) => s + x.marks, 0) / list.length; list.filter(x => x.marks > avg).forEach(x => console.log(x.name));' },
  { type: 'program', topic: 'js-oop', q: 'Create a class Rectangle with width, height, an area() method and a static method compare(r1, r2).', a: 'class Rectangle { constructor(w, h) { this.w = w; this.h = h } area() { return this.w * this.h } static compare(a, b) { return a.area() - b.area() } }' },
  // Practical
  { type: 'practical', topic: 'html-tables', q: 'Create your semester timetable using an HTML table with rowspan for labs and colspan for the lunch break.', a: 'Use table, caption, thead with periods, tbody rows per day, a td with colspan for lunch and rowspan for a 2-period lab. Style with border-collapse.' },
  { type: 'practical', topic: 'css-flexbox', q: 'Build a responsive navigation bar with a logo on the left and links on the right that stacks on mobile.', a: 'nav { display: flex; justify-content: space-between; align-items: center } @media (max-width: 600px) { nav { flex-direction: column } }' },
  { type: 'practical', topic: 'css-grid', q: 'Build a photo gallery of 6 images using CSS Grid where the first image spans two columns.', a: '.g { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px } .g img:first-child { grid-column: span 2 }' },
  { type: 'practical', topic: 'js-events', q: 'Build a form that validates name (min 3 chars), email and matching passwords, showing messages without reloading.', a: 'Listen for submit, preventDefault, validate each field, write messages into small elements, add/remove an error class.' },
  { type: 'practical', topic: 'js-async', q: 'Fetch users from https://jsonplaceholder.typicode.com/users and render name + email cards with a loading message and error handling.', a: 'async function load() { list.textContent = "Loading…"; try { const r = await fetch(url); if (!r.ok) throw new Error(r.status); const users = await r.json(); list.innerHTML = ""; users.forEach(u => { const d = document.createElement("div"); d.textContent = u.name + " — " + u.email; list.append(d); }); } catch (e) { list.textContent = "Could not load users"; } }' },
];

/* ---------- Coding challenges (auto-checked inside the sandbox) ---------- */
export const CHALLENGES = [
  { id: 'first-page', topic: 'html-structure', title: 'Your first web page', level: 'Beginner', task: 'Create an <h1> that says exactly "Hello CodePlay" and a <p> paragraph introducing yourself.', starter: { html: '<!-- Write your heading and paragraph here -->\n' },
    tests: [{ label: 'There is an <h1> with the text "Hello CodePlay"', code: "return document.querySelector('h1') && document.querySelector('h1').textContent.trim() === 'Hello CodePlay'" }, { label: 'There is a paragraph with some text', code: "var p=document.querySelector('p');return !!p && p.textContent.trim().length > 5" }] },
  { id: 'html-link', topic: 'html-links', title: 'Link in a new tab', level: 'Beginner', task: 'Create a link with the text "Visit Example" that goes to https://example.com and opens in a new tab.', starter: { html: '' },
    tests: [{ label: 'Link points to https://example.com', code: "var a=document.querySelector('a');return !!a && a.getAttribute('href').replace(/\\/$/,'')==='https://example.com'" }, { label: 'Opens in a new tab (target="_blank")', code: "var a=document.querySelector('a');return !!a && a.target==='_blank'" }, { label: 'Link text is "Visit Example"', code: "var a=document.querySelector('a');return !!a && a.textContent.trim()==='Visit Example'" }] },
  { id: 'html-list', topic: 'html-lists', title: 'Ordered steps', level: 'Beginner', task: 'Make an ordered list with at least 3 steps for submitting an assignment, numbered with capital Roman numerals.', starter: { html: '' },
    tests: [{ label: 'An <ol> exists', code: "return !!document.querySelector('ol')" }, { label: 'It has at least 3 <li>', code: "return document.querySelectorAll('ol > li').length>=3" }, { label: 'Uses type="I"', code: "return document.querySelector('ol') && document.querySelector('ol').getAttribute('type')==='I'" }] },
  { id: 'html-form', topic: 'html-forms', title: 'Accessible email field', level: 'Elementary', task: 'Build a form with an email input that is required and has a <label> properly connected to it, plus a submit button.', starter: { html: '<form>\n  \n</form>' },
    tests: [{ label: 'Input type is email', code: "return !!document.querySelector('form input[type=email]')" }, { label: 'Email input is required', code: "var i=document.querySelector('input[type=email]');return !!i && i.required" }, { label: 'A label is connected (for = id)', code: "var i=document.querySelector('input[type=email]');return !!i && !!i.id && !!document.querySelector('label[for=\"'+i.id+'\"]')" }, { label: 'There is a submit button', code: "var b=document.querySelector('form button, form input[type=submit]');return !!b && (b.type==='submit')" }] },
  { id: 'css-center', topic: 'css-flexbox', title: 'Centre the box', level: 'Elementary', task: 'Using Flexbox on .wrap, centre the .box horizontally and vertically.', starter: { html: '<div class="wrap">\n  <div class="box">Centre me</div>\n</div>', css: '.wrap { height: 200px; background: #F1F6FA; }\n.box { width: 100px; padding: 10px; background: #FF8A3D; }\n' },
    tests: [{ label: '.wrap uses display: flex', code: "return getComputedStyle(document.querySelector('.wrap')).display==='flex'" }, { label: 'Horizontally centred', code: "return getComputedStyle(document.querySelector('.wrap')).justifyContent==='center'" }, { label: 'Vertically centred', code: "return getComputedStyle(document.querySelector('.wrap')).alignItems==='center'" }] },
  { id: 'css-card', topic: 'css-box-model', title: 'Design a beautiful card', level: 'Elementary', task: 'Style .card with padding of at least 16px, a border-radius of at least 10px, a border, and a box-shadow. Make it look good!', starter: { html: '<div class="card">\n  <h3>Riya Verma</h3>\n  <p>B.Tech AI · 1st year</p>\n</div>', css: '.card {\n  \n}' },
    tests: [{ label: 'Padding ≥ 16px', code: "return parseFloat(getComputedStyle(document.querySelector('.card')).paddingTop)>=16" }, { label: 'Border radius ≥ 10px', code: "return parseFloat(getComputedStyle(document.querySelector('.card')).borderTopLeftRadius)>=10" }, { label: 'Has a border', code: "return parseFloat(getComputedStyle(document.querySelector('.card')).borderTopWidth)>0" }, { label: 'Has a box-shadow', code: "return getComputedStyle(document.querySelector('.card')).boxShadow!=='none'" }] },
  { id: 'css-grid3', topic: 'css-grid', title: 'Three-column grid', level: 'Intermediate', task: 'Make .grid a CSS Grid with 3 equal columns and a gap of 12px.', starter: { html: '<div class="grid">\n  <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>\n</div>', css: '.grid div { background: #DDF1FB; padding: 16px; }\n' },
    tests: [{ label: 'display: grid', code: "return getComputedStyle(document.querySelector('.grid')).display==='grid'" }, { label: '3 columns', code: "return getComputedStyle(document.querySelector('.grid')).gridTemplateColumns.split(' ').length===3" }, { label: 'Gap of 12px', code: "return getComputedStyle(document.querySelector('.grid')).columnGap==='12px'" }] },
  { id: 'js-sum', topic: 'js-functions', title: 'Write sum(a, b)', level: 'Beginner', task: 'Write a function named sum that returns the sum of two numbers.', starter: { js: '// write function sum here\n' },
    tests: [{ label: 'sum is a function', code: "return typeof sum==='function'" }, { label: 'sum(2, 3) returns 5', code: 'return sum(2,3)===5' }, { label: 'sum(-1, 1) returns 0', code: 'return sum(-1,1)===0' }] },
  { id: 'js-even', topic: 'js-operators', title: 'Even or odd?', level: 'Beginner', task: 'Write isEven(n) that returns true for even numbers and false for odd numbers.', starter: { js: 'function isEven(n) {\n  \n}' },
    tests: [{ label: 'isEven(4) is true', code: 'return isEven(4)===true' }, { label: 'isEven(7) is false', code: 'return isEven(7)===false' }, { label: 'isEven(0) is true', code: 'return isEven(0)===true' }] },
  { id: 'js-passed', topic: 'js-arrays', title: 'Filter passed students', level: 'Elementary', task: 'Write passed(marks) that returns a NEW array with only marks of 40 or above. Use filter.', starter: { js: 'function passed(marks) {\n  \n}\nconsole.log(passed([35, 72, 40, 18, 90]));' },
    tests: [{ label: 'passed([35, 72, 40, 18, 90]) → [72, 40, 90]', code: 'return JSON.stringify(passed([35,72,40,18,90]))==="[72,40,90]"' }, { label: 'Does not change the original array', code: 'var a=[10,50];passed(a);return a.length===2' }] },
  { id: 'js-reverse', topic: 'js-strings-math', title: 'Reverse a string', level: 'Elementary', task: 'Write reverse(s) that returns the string reversed.', starter: { js: 'function reverse(s) {\n  \n}' },
    tests: [{ label: 'reverse("code") → "edoc"', code: 'return reverse("code")==="edoc"' }, { label: 'reverse("") → ""', code: 'return reverse("")===""' }] },
  { id: 'js-detective', topic: 'js-loops', title: 'JavaScript Detective', level: 'Elementary', task: 'This function should return the total of all marks, but it has bugs. Find and fix them!', starter: { js: 'function total(marks) {\n  let sum;\n  for (let i = 0; i <= marks.length; i++) {\n    sum = sum + marks[i];\n  }\n  return sum;\n}\nconsole.log(total([10, 20, 30])); // should print 60' },
    tests: [{ label: 'total([10, 20, 30]) returns 60', code: 'return total([10,20,30])===60' }, { label: 'total([]) returns 0', code: 'return total([])===0' }] },
  { id: 'dom-magician', topic: 'js-dom', title: 'DOM Magician', level: 'Intermediate', task: 'When #magic is clicked, change the text of #msg to "Abracadabra!" and add the class "glow" to it.', starter: { html: '<p id="msg">Nothing yet…</p>\n<button id="magic">Cast spell</button>', css: '.glow { color: #FF8A3D; text-shadow: 0 0 8px #FFD45C; }', js: '// your code here\n' },
    tests: [{ label: 'Clicking #magic changes #msg text to "Abracadabra!"', code: "document.getElementById('magic').click();return document.getElementById('msg').textContent.trim()==='Abracadabra!'" }, { label: '#msg gets the class "glow"', code: "return document.getElementById('msg').classList.contains('glow')" }] },
  { id: 'js-counter', topic: 'js-events', title: 'Click counter', level: 'Intermediate', task: 'Make #count increase by 1 each time #inc is clicked (start at 0).', starter: { html: '<p>Count: <span id="count">0</span></p>\n<button id="inc">+1</button>', js: '' },
    tests: [{ label: 'Two clicks show 2', code: "var b=document.getElementById('inc');b.click();b.click();return document.getElementById('count').textContent.trim()==='2'" }] },
];

/* ---------- Missions ---------- */
export const MISSIONS = [
  { id: 'html-explorer', title: 'HTML Explorer', text: 'Create your first webpage.', how: 'Solve the "Your first web page" challenge.', check: (s) => !!s.challenges['first-page'], to: 'practice' },
  { id: 'css-artist', title: 'CSS Artist', text: 'Design a beautiful card.', how: 'Solve the "Design a beautiful card" challenge.', check: (s) => !!s.challenges['css-card'], to: 'practice' },
  { id: 'position-master', title: 'Position Master', text: 'Move an element using all five positioning types.', how: 'Try static, relative, absolute, fixed and sticky in the Positioning Playground.', check: (s) => (s.experiments.positioning?.data?.modes || []).length >= 5, to: 'lab-positioning' },
  { id: 'flexbox-hero', title: 'Flexbox Hero', text: 'Arrange five boxes correctly.', how: 'Match the target layout in the Flexbox Playground challenge.', check: (s) => !!s.experiments.flexbox?.data?.hero, to: 'lab-flexbox' },
  { id: 'js-detective', title: 'JavaScript Detective', text: 'Find the error in a program.', how: 'Fix the bugs in the "JavaScript Detective" challenge.', check: (s) => !!s.challenges['js-detective'], to: 'practice' },
  { id: 'dom-magician', title: 'DOM Magician', text: 'Change a webpage using JavaScript.', how: 'Solve the "DOM Magician" challenge.', check: (s) => !!s.challenges['dom-magician'], to: 'practice' },
  { id: 'bug-squasher', title: 'Bug Squasher', text: 'Fix broken HTML.', how: 'Fix all snippets in the Fix the Broken HTML lab.', check: (s) => !!s.experiments['fix-html']?.done, to: 'lab-fix-html' },
  { id: 'exam-warrior', title: 'Exam Warrior', text: 'Score 70% or more in a mock test.', how: 'Take any mock test.', check: (s) => s.mockResults.some((r) => r.score / r.total >= 0.7), to: 'mock' },
];

/* ---------- Cheat sheets for revision mode ---------- */
export const CHEATS = {
  html: [
    ['<!DOCTYPE html>', 'HTML5 document declaration'], ['<meta charset="UTF-8">', 'Character encoding'], ['<meta name="viewport" …>', 'Mobile scaling'],
    ['<h1>–<h6>', 'Headings by importance'], ['<p> <br> <hr>', 'Paragraph, line break, divider'], ['<strong> <em> <mark>', 'Important, emphasis, highlight'],
    ['<a href target>', 'Hyperlink'], ['<img src alt>', 'Image (void)'], ['<ul> <ol> <li> <dl>', 'Lists'], ['<table> <tr> <th> <td>', 'Tables; colspan/rowspan'],
    ['<form action method>', 'Form'], ['<input type name required>', 'Field: text, email, number, date…'], ['<label for>', 'Accessible field name'],
    ['<select> <option> <textarea>', 'Dropdown, multiline'], ['<header> <nav> <main> <article> <section> <aside> <footer>', 'Semantic layout'],
    ['<audio controls> <video controls>', 'Media'], ['<iframe src title>', 'Embed another page'], ['&lt; &gt; &amp; &nbsp; &copy;', 'Entities'],
  ],
  css: [
    ['selector { prop: value; }', 'Rule syntax'], ['.class #id * a, b', 'Basic selectors'], ['A B / A > B / A + B', 'Descendant / child / next sibling'],
    [':hover :focus :nth-child(n)', 'Pseudo-classes'], ['::before ::after', 'Pseudo-elements (need content)'], ['!important > inline > id > class > element', 'Cascade order'],
    ['margin border padding content', 'Box model outside → in'], ['box-sizing: border-box', 'Width includes padding + border'],
    ['display: block | inline | inline-block | flex | grid | none', 'Display types'], ['position: static | relative | absolute | fixed | sticky', 'Positioning'],
    ['z-index', 'Stack order (positioned)'], ['overflow: hidden | auto | scroll', 'Extra content'],
    ['display:flex; justify-content; align-items; gap', 'Flexbox container'], ['flex: grow shrink basis', 'Flex item'],
    ['grid-template-columns: repeat(3, 1fr)', 'Grid columns'], ['grid-column: 1 / 3 | span 2', 'Grid placement'],
    ['@media (min-width: 768px) {}', 'Media query'], ['px % em rem vw vh', 'Units'], ['--x: 1; var(--x)', 'Variables'],
    ['transition: prop 0.3s ease', 'Transition'], ['@keyframes + animation', 'Animation'], ['transform: translate scale rotate', 'Transforms'],
  ],
  js: [
    ['let / const / var', 'Declarations'], ['typeof x', 'Type check'], ['=== !== && || ! ?? ?.', 'Key operators'],
    ['if / else if / else; switch', 'Conditions'], ['for / while / do…while / for…of', 'Loops'], ['function f(a = 1) {}  (a) => a * 2', 'Functions'],
    ['...rest / ...spread', 'Collect / expand'], ['arr.push pop shift unshift splice', 'Mutating array methods'], ['arr.map filter reduce find some every', 'Functional array methods'],
    ['arr.sort((a, b) => a - b)', 'Numeric sort'], ['Object.keys values entries', 'Object helpers'], ['JSON.stringify / JSON.parse', 'Serialise / parse'],
    ['str.trim split slice includes replace', 'String methods'], ['Math.round floor ceil random max', 'Math'], ['class A extends B { constructor() { super() } }', 'Classes'],
    ['document.querySelector / All', 'Select elements'], ['el.textContent / classList / style', 'Change elements'], ['createElement / append / remove', 'Create & delete'],
    ['el.addEventListener("click", fn)', 'Events'], ['e.preventDefault() / e.stopPropagation()', 'Event control'], ['localStorage.setItem / getItem', 'Storage'],
    ['setTimeout / setInterval', 'Timers'], ['new Promise / .then / .catch', 'Promises'], ['async / await / try…catch', 'Async'], ['fetch(url).then(r => r.json())', 'HTTP requests'],
  ],
};

export const CONFUSED = [
  ['<b> vs <strong>', 'Both look bold; <strong> means "important" to screen readers and search engines.'],
  ['id vs class', 'id is unique (#), class is reusable (.).'],
  ['margin vs padding', 'Margin is outside the border (transparent); padding is inside (shows background).'],
  ['display:none vs visibility:hidden', 'none removes the space; hidden keeps the space.'],
  ['relative vs absolute', 'Relative moves from its own spot and keeps its space; absolute leaves the flow and pins to the nearest positioned ancestor.'],
  ['justify-content vs align-items', 'justify = main axis; align = cross axis.'],
  ['Flexbox vs Grid', 'Flexbox for one direction; Grid for rows AND columns.'],
  ['em vs rem', 'em = parent/element font size (compounds); rem = root font size.'],
  ['== vs ===', '== converts types; === checks type and value. Use ===.'],
  ['null vs undefined', 'undefined = not assigned yet; null = deliberately empty.'],
  ['let vs var', 'let is block-scoped with TDZ; var is function-scoped and hoisted as undefined.'],
  ['map vs forEach', 'map returns a new array; forEach returns undefined.'],
  ['parameters vs arguments', 'Parameters are names in the definition; arguments are values in the call.'],
  ['innerHTML vs textContent', 'innerHTML parses HTML (XSS risk); textContent is plain text.'],
  ['localStorage vs sessionStorage', 'local lasts until cleared; session ends when the tab closes.'],
  ['GET vs POST', 'GET sends data in the URL; POST sends it in the body.'],
  ['git fetch vs git pull', 'fetch downloads only; pull downloads and merges.'],
  ['transition vs animation', 'Transition needs a trigger and has two states; animation uses keyframes and can loop.'],
];

/* ---------- Experiments catalogue ---------- */
export const LABS = [
  { id: 'page-builder', track: 'html', title: 'Build Your First Website', blurb: 'Drag headings, paragraphs, images and buttons onto a blank page.' },
  { id: 'tag-explorer', track: 'html', title: 'HTML Tag Explorer', blurb: 'Pick a tag and see what it is, how to write it and how it renders.' },
  { id: 'structure-builder', track: 'html', title: 'HTML Structure Builder', blurb: 'Put the pieces of an HTML document in the right order.' },
  { id: 'form-builder', track: 'html', title: 'Form Builder', blurb: 'Create a registration form by choosing fields and validation.' },
  { id: 'fix-html', track: 'html', title: 'Fix the Broken HTML', blurb: 'Spot and repair the mistakes in real-looking snippets.' },
  { id: 'css-lab', track: 'css', title: 'CSS Visual Playground', blurb: 'Select an element, tweak its CSS with controls, edit the code — all in sync.' },
  { id: 'box-model', track: 'css', title: 'Box Model Explorer', blurb: 'Margin vs padding vs border, with a live diagram.' },
  { id: 'positioning', track: 'css', title: 'Positioning Playground', blurb: 'Drag elements and compare static, relative, absolute, fixed and sticky.' },
  { id: 'z-index', track: 'css', title: 'z-index Laboratory', blurb: 'Raise and lower overlapping boxes; see stacking contexts.' },
  { id: 'flexbox', track: 'css', title: 'Flexbox Playground', blurb: 'Every container and item property, plus a layout challenge.' },
  { id: 'grid', track: 'css', title: 'CSS Grid Playground', blurb: 'Add rows and columns, then place items into cells.' },
  { id: 'display', track: 'css', title: 'Display Property Playground', blurb: 'block, inline, inline-block, flex, grid, none — side by side.' },
  { id: 'animation', track: 'css', title: 'Animation Studio', blurb: 'Design keyframes, timing and transforms, then press play.' },
  { id: 'responsive', track: 'css', title: 'Responsive Design Lab', blurb: 'See one page on mobile, tablet and desktop and edit its media queries.' },
  { id: 'variables', track: 'js', title: 'Variable Explorer', blurb: 'Change variable values and watch the output react.' },
  { id: 'predict', track: 'js', title: 'Predict the Output', blurb: 'Guess what the console prints, then run it to check.' },
  { id: 'scope', track: 'js', title: 'Scope Visualizer & Hoisting', blurb: 'See scopes as nested boxes and var/let/const on a timeline.' },
  { id: 'function-machine', track: 'js', title: 'Function Machine', blurb: 'Arguments in, parameters inside, return value out.' },
  { id: 'array', track: 'js', title: 'Array Playground', blurb: 'push, pop, map, filter, reduce, sort — visually.' },
  { id: 'dom', track: 'js', title: 'DOM Playground', blurb: 'Write JavaScript and watch the DOM tree change live.' },
  { id: 'events', track: 'js', title: 'Event Playground', blurb: 'See exactly which events fire and how they bubble.' },
  { id: 'event-loop', track: 'js', title: 'Async JavaScript Visualizer', blurb: 'Call stack, queues and the event loop, animated.' },
];
export const LAB_BY_ID = Object.fromEntries(LABS.map((l) => [l.id, l]));

/** Return a copy of an MCQ with its options shuffled (and the answer index remapped),
 *  so the correct answer is not always in the same position. */
export function shuffleOptions(q, rand = Math.random) {
  const idx = q.o.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return { ...q, o: idx.map((i) => q.o[i]), a: idx.indexOf(q.a) };
}
export function seeded(seedStr) {
  let h = 2166136261;
  for (const c of seedStr) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  return () => { h = (Math.imul(h, 1664525) + 1013904223) >>> 0; return h / 4294967296; };
}
