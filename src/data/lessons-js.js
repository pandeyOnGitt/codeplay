// JavaScript lessons. `steps` describe a line-by-line execution trace of live.js
// (line numbers are 1-based) used by the Step-through viewer.

export const jsLessons = [
  {
    id: 'js-intro', track: 'js', group: 'Fundamentals', level: 'Beginner', minutes: 14,
    title: 'Introduction to JavaScript', syllabus: 'Introduction · History of ECMAScript · Client/Server-side JS · Runtime · Engines · Node.js · Developer Tools',
    summary: 'The programming language that makes web pages interactive.',
    definition: '**JavaScript (JS)** is a programming language that runs in every web browser. While HTML gives structure and CSS gives style, JavaScript gives **behaviour**: it reacts to clicks, checks forms, updates content without reloading and talks to servers. **ECMAScript** is the official standard that JavaScript follows.',
    why: 'Every "Like" button, live search suggestion, image slider, form error message and online game uses JavaScript. With Node.js it also runs on servers, so one language can build an entire application.',
    analogy: { title: 'A light switch', text: 'HTML is the bulb and wiring, CSS is the lampshade. JavaScript is the switch and the electrician\'s logic: "when someone presses this, turn on the light; if it is after 10pm, dim it."' },
    syntax: `<!-- Internal JavaScript -->
<script>
  console.log("Hello from JavaScript!");
</script>

<!-- External JavaScript (recommended) -->
<script src="app.js" defer></script>`,
    lines: [
      ['<script>', 'Tells the browser that what follows is JavaScript, not HTML.'],
      ['console.log(…)', 'Prints a message to the developer console (F12 → Console). Your best debugging friend.'],
      ['src="app.js"', 'Loads JavaScript from a separate file — cleaner and cacheable.'],
      ['defer', 'Runs the script after the HTML has been parsed, so elements exist when your code looks for them.'],
    ],
    live: { html: `<h2 id="msg">Waiting…</h2>\n<button id="btn">Click me</button>`, js: `console.log("JavaScript is running!");\nconst msg = document.getElementById("msg");\nmsg.textContent = "JavaScript changed this heading";\ndocument.getElementById("btn").addEventListener("click", () => {\n  console.log("Button clicked at", new Date().toLocaleTimeString());\n});` },
    tabs: ['js', 'html'],
    steps: [
      { line: 1, note: 'console.log prints a message into the console.', out: 'JavaScript is running!' },
      { line: 2, note: 'Find the element with id="msg" and keep a reference in a constant named msg.', vars: { msg: '<h2 id="msg">' } },
      { line: 3, note: 'Change the text of that element. The page updates instantly.', vars: { msg: '<h2 id="msg">' } },
      { line: 4, note: 'Attach a function that will run later, whenever the button is clicked. Nothing prints yet!', vars: { msg: '<h2 id="msg">' } },
    ],
    mistakes: [
      { wrong: 'Putting <script> in <head> without defer and getting null.', right: 'Use defer or place the script just before </body>.', why: 'The script runs before the HTML elements exist.' },
      { wrong: 'Thinking Java and JavaScript are the same.', right: 'They are completely different languages.', why: 'The name was a 1995 marketing decision.' },
    ],
    exam: {
      definition: 'JavaScript is a high-level, interpreted (JIT-compiled), dynamically typed, single-threaded programming language that conforms to the ECMAScript specification and is used to create interactive behaviour in web pages and, via runtimes like Node.js, server-side applications.',
      points: ['Created by Brendan Eich at Netscape in 1995 (in 10 days), first called Mocha then LiveScript.', 'Standardised as ECMAScript by Ecma International: ES1 (1997), ES3 (1999), ES5 (2009), ES6/ES2015 (major update: let/const, arrow functions, classes, modules, promises), yearly releases since.', 'Client-side JS runs in the browser (DOM, events); server-side JS runs in Node.js (files, databases, APIs).', 'Engines: V8 (Chrome, Edge, Node.js), SpiderMonkey (Firefox), JavaScriptCore (Safari).', 'Runtime environment = engine + APIs (DOM, timers, fetch in browser; fs, http in Node) + event loop.', 'Execution model: single-threaded, call stack, event loop for asynchronous tasks.', 'Ways to include: inline event attributes (avoid), internal <script>, external <script src>.'],
      diff: { title: 'Client-side vs Server-side JavaScript', head: ['Client-side', 'Server-side (Node.js)'], rows: [['Runs in the browser', 'Runs on a server'], ['Access to DOM, window', 'Access to file system, databases'], ['UI interactivity, validation', 'APIs, authentication, data processing'], ['Code visible to users', 'Code hidden on server']] },
    },
    examQs: [
      { m: 1, q: 'Who created JavaScript?', a: 'Brendan Eich, at Netscape in 1995.' },
      { m: 1, q: 'Name the JavaScript engine used in Chrome.', a: 'V8.' },
      { m: 2, q: 'What is ECMAScript?', a: 'The standard specification (ECMA-262) maintained by Ecma International that defines the JavaScript language; JS is an implementation of it.' },
      { m: 3, q: 'Differentiate between client-side and server-side JavaScript.', a: 'Use the comparison table: where it runs, available APIs, purpose, visibility, examples.' },
      { m: 5, q: 'Explain the JavaScript runtime environment and execution model.', a: 'Engine (heap + call stack) executes code; Web APIs (DOM, timers, fetch) are provided by the browser; callback/task and microtask queues; event loop moves callbacks to the stack when empty. Single-threaded, non-blocking.' },
    ],
    practice: ['Open DevTools (F12) on any site and type 2 + 2 in the Console.', 'Write a script that logs your name and age.', 'Link an external app.js file to an HTML page using defer.'],
    revision: ['JS = behaviour. ECMAScript = standard.', 'Brendan Eich, 1995. ES6 = 2015.', 'V8, SpiderMonkey, JavaScriptCore.', 'Browser vs Node.js.', '<script src defer>'],
    quiz: [
      { q: 'Which engine powers Node.js?', o: ['SpiderMonkey', 'V8', 'Chakra', 'Gecko'], a: 1, e: 'Node.js is built on V8.' },
      { q: 'Which attribute delays a script until HTML is parsed?', o: ['async', 'defer', 'wait', 'lazy'], a: 1, e: 'defer.' },
      { q: 'ES6 was released in…', o: ['1999', '2009', '2015', '2020'], a: 2, e: 'ES2015.' },
    ],
  },
  {
    id: 'js-variables', track: 'js', group: 'Variables', level: 'Beginner', minutes: 14,
    title: 'Variables: var, let and const', syllabus: 'Variables (var, let, const)',
    summary: 'Named boxes that store values.',
    definition: 'A **variable** is a named container that stores a value so you can use it later. JavaScript has three keywords to create one: **let** (value can change), **const** (cannot be reassigned) and the older **var** (function-scoped, avoid in modern code).',
    why: 'Programs remember things: the score in a game, items in a cart, the logged-in user\'s name. Variables are how you store and update that information.',
    analogy: { title: 'Labelled boxes', text: '`let score = 0` is a box labelled "score" with 0 inside; you can swap what is inside. `const pi = 3.14` is a sealed glass box: you can see the value, but you cannot replace it.' },
    syntax: `let age = 18;          // can change
age = 19;              // reassign: OK

const college = "Invertis"; // cannot be reassigned
// college = "XYZ";    // TypeError!

var oldStyle = "avoid";    // function-scoped, hoisted`,
    lines: [
      ['let age = 18;', 'Declare a variable named age and assign 18. The = means "store", not "equals".'],
      ['age = 19;', 'Reassign: no let the second time.'],
      ['const college = …', 'A constant binding. Use const by default; switch to let only when you need to reassign.'],
      ['var', 'The pre-2015 way. It ignores block scope and is hoisted, which causes bugs.'],
    ],
    live: { js: `let name = "Riya";\nlet marks = 72;\nconst maxMarks = 100;\nmarks = marks + 10;\nconsole.log(name, "scored", marks, "out of", maxMarks);\nconst student = { name: "Riya" };\nstudent.name = "Riya V.";  // allowed: the object changes, not the binding\nconsole.log(student);` },
    tabs: ['js'],
    steps: [
      { line: 1, note: 'Create a box called name containing "Riya".', vars: { name: '"Riya"' } },
      { line: 2, note: 'Create marks = 72.', vars: { name: '"Riya"', marks: 72 } },
      { line: 3, note: 'Create a constant maxMarks = 100.', vars: { name: '"Riya"', marks: 72, maxMarks: 100 } },
      { line: 4, note: 'Right side first: 72 + 10 = 82, then store 82 back into marks.', vars: { name: '"Riya"', marks: 82, maxMarks: 100 } },
      { line: 5, note: 'Print the values separated by spaces.', vars: { name: '"Riya"', marks: 82, maxMarks: 100 }, out: 'Riya scored 82 out of 100' },
      { line: 6, note: 'student holds a reference to an object.', vars: { name: '"Riya"', marks: 82, maxMarks: 100, student: '{ name: "Riya" }' } },
      { line: 7, note: 'const stops reassigning student, but the object inside can still change.', vars: { name: '"Riya"', marks: 82, maxMarks: 100, student: '{ name: "Riya V." }' } },
      { line: 8, note: 'Print the object.', vars: { name: '"Riya"', marks: 82, maxMarks: 100, student: '{ name: "Riya V." }' }, out: '{ name: Riya V. }' },
    ],
    experiment: { lab: 'variables', text: 'Change values in the Variable Explorer and watch the output react.' },
    tryThis: ['Try maxMarks = 90; and read the error in the console.', 'Rename marks to Marks on one line only — JavaScript is case-sensitive.'],
    mistakes: [
      { wrong: 'let 2ndPlace = "A";', right: 'let secondPlace = "A";', why: 'Names cannot start with a digit; they may contain letters, digits, $ and _.' },
      { wrong: 'let x = 1; let x = 2;', right: 'let x = 1; x = 2;', why: 'Redeclaring with let in the same scope is a SyntaxError.' },
      { wrong: 'Thinking const makes objects frozen.', right: 'const prevents reassignment only.', why: 'Object properties and array items can still change. Use Object.freeze() to freeze.' },
    ],
    exam: {
      definition: 'A variable is a named storage location that holds a value. JavaScript declares variables using var (function-scoped, hoisted with undefined), let (block-scoped, reassignable) and const (block-scoped, must be initialised and cannot be reassigned).',
      points: ['Naming rules: start with a letter, _ or $; no spaces or reserved words; case-sensitive; camelCase convention.', 'let/const are in the Temporal Dead Zone until declared.', 'var can be redeclared; let/const cannot in the same scope.', 'Use const by default, let when reassigning, avoid var.'],
      diff: { title: 'var vs let vs const', head: ['', 'var', 'let', 'const'], rows: [['Scope', 'Function', 'Block', 'Block'], ['Hoisting', 'Hoisted (undefined)', 'Hoisted (TDZ)', 'Hoisted (TDZ)'], ['Redeclare', 'Yes', 'No', 'No'], ['Reassign', 'Yes', 'Yes', 'No'], ['Must initialise', 'No', 'No', 'Yes']] },
    },
    examQs: [
      { m: 1, q: 'Which keyword declares a block-scoped constant?', a: 'const' },
      { m: 2, q: 'Can you change a property of an object declared with const? Explain.', a: 'Yes. const prevents the variable from being reassigned to a new value, but the object it points to is mutable, so its properties can change.' },
      { m: 5, q: 'Differentiate between var, let and const with examples.', a: 'Use the table plus code: var in a for-loop leaking outside the block, let staying inside, const reassignment error.' },
    ],
    practice: ['Store your name, branch and CGPA in variables and log a sentence.', 'Swap the values of two variables a and b.'],
    revision: ['const by default, let if it changes, avoid var.', 'let/const block scope; var function scope.', 'const ≠ immutable object.', 'camelCase names, case-sensitive.'],
    quiz: [
      { q: 'Which cannot be reassigned?', o: ['var', 'let', 'const', 'All can'], a: 2, e: 'const.' },
      { q: 'Valid variable name?', o: ['1name', 'first-name', 'firstName', 'let'], a: 2, e: 'camelCase, starts with a letter.' },
      { q: 'var is scoped to the…', o: ['Block', 'Function', 'File only', 'Loop'], a: 1, e: 'Function scope.' },
    ],
  },
  {
    id: 'js-datatypes', track: 'js', group: 'Variables', level: 'Beginner', minutes: 14,
    title: 'Data Types, Conversion & Coercion', syllabus: 'Primitive and Reference Data Types · Type Conversion and Type Coercion',
    summary: 'Numbers, strings, booleans, objects — and how JS converts between them.',
    definition: 'Every value has a **type**. **Primitive** types store a single simple value: `number`, `string`, `boolean`, `undefined`, `null`, `bigint`, `symbol`. **Reference** (non-primitive) types — objects, arrays and functions — store a *reference* to data in memory. **Type conversion** is converting on purpose (`Number("42")`); **type coercion** is JavaScript converting automatically (`"5" * 2` → 10).',
    why: 'Bugs like "2" + "2" = "22" in a calculator happen when types are misunderstood. Form inputs always give strings, so converting correctly is essential.',
    analogy: { title: 'Photocopy vs house key', text: 'Copying a primitive is like photocopying a page — the copy is independent. Copying an object is like copying a house key — both keys open the same house, so changing something inside affects both.' },
    syntax: `typeof 42          // "number"
typeof "hi"        // "string"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object"  (a famous old bug)
typeof [1, 2]      // "object"
Number("42")       // 42      (explicit conversion)
String(42)         // "42"
"5" * 2            // 10      (coercion: string → number)
"5" + 2            // "52"    (+ with a string joins text)`,
    lines: [
      ['typeof', 'An operator that returns the type of a value as a string.'],
      ['typeof null → "object"', 'A bug from 1995 kept for compatibility. null is a primitive.'],
      ['Number("42")', 'Explicit conversion. Number("abc") gives NaN (Not a Number).'],
      ['"5" * 2', '* only works with numbers, so JS converts "5" to 5.'],
      ['"5" + 2', '+ with a string means concatenation, so 2 becomes "2".'],
    ],
    live: { js: `let a = "10";\nlet b = 5;\nconsole.log(a + b);\nconsole.log(Number(a) + b);\nconsole.log(a * b, typeof (a * b));\nlet list1 = [1, 2];\nlet list2 = list1;\nlist2.push(3);\nconsole.log(list1);` },
    tabs: ['js'],
    steps: [
      { line: 1, note: 'a is the STRING "10" (quotes!).', vars: { a: '"10"' } },
      { line: 2, note: 'b is the NUMBER 5.', vars: { a: '"10"', b: 5 } },
      { line: 3, note: 'string + number → concatenation: "10" + "5".', vars: { a: '"10"', b: 5 }, out: '105' },
      { line: 4, note: 'Convert first: 10 + 5 = 15.', vars: { a: '"10"', b: 5 }, out: '15' },
      { line: 5, note: '* coerces "10" to 10 → 50, a number.', vars: { a: '"10"', b: 5 }, out: '50 number' },
      { line: 6, note: 'list1 holds a REFERENCE to an array in memory.', vars: { a: '"10"', b: 5, list1: '→ [1, 2]' } },
      { line: 7, note: 'list2 copies the reference, not the array. Both point to the same array.', vars: { a: '"10"', b: 5, list1: '→ [1, 2]', list2: '→ (same array)' } },
      { line: 8, note: 'Changing via list2 changes the shared array.', vars: { a: '"10"', b: 5, list1: '→ [1, 2, 3]', list2: '→ (same array)' } },
      { line: 9, note: 'list1 shows 3 too!', vars: { a: '"10"', b: 5, list1: '→ [1, 2, 3]', list2: '→ (same array)' }, out: '[1, 2, 3]' },
    ],
    tryThis: ['Try Number("12abc") and parseInt("12abc").', 'Log typeof NaN — surprise, it is "number".', 'Make a real copy with let list2 = [...list1];'],
    mistakes: [
      { wrong: 'Adding input values directly: input1.value + input2.value', right: 'Number(input1.value) + Number(input2.value)', why: 'Input values are always strings.' },
      { wrong: 'if (x == null) vs typeof x === "null"', right: 'typeof null is "object"; use x === null.', why: 'typeof cannot detect null.' },
    ],
    exam: {
      definition: 'Data types define the kind of value a variable holds. JavaScript has seven primitive types (number, string, boolean, undefined, null, bigint, symbol) stored by value, and reference types (objects, including arrays and functions) stored by reference. Type conversion is explicit transformation of a value to another type; type coercion is implicit automatic conversion performed by JavaScript.',
      points: ['JavaScript is dynamically typed: a variable\'s type can change.', 'undefined = declared but not assigned; null = intentionally empty.', 'NaN is of type number; check with Number.isNaN().', 'Explicit: Number(), String(), Boolean(), parseInt(), parseFloat(), toString().', 'Implicit: + with a string concatenates; -, *, / convert to numbers; == coerces before comparing.', 'Primitives are immutable and copied by value; objects copied by reference.'],
      diff: { title: 'Primitive vs Reference', head: ['Primitive', 'Reference'], rows: [['Stored by value (stack)', 'Stored by reference (heap)'], ['Copy is independent', 'Copy shares the same object'], ['Immutable', 'Mutable'], ['number, string, boolean…', 'object, array, function']] },
    },
    examQs: [
      { m: 1, q: 'What is the output of typeof null?', a: '"object"' },
      { m: 2, q: 'Differentiate undefined and null.', a: 'undefined means a variable is declared but has no value assigned (set by JS); null is an assignment value meaning "intentionally no value" (set by the programmer).' },
      { m: 3, q: 'Predict the output: console.log("3" + 4 + 5, 3 + 4 + "5");', a: '"345" and "75". Left to right: "3"+4 = "34", +5 = "345"; 3+4 = 7, 7+"5" = "75".' },
      { m: 5, q: 'Explain type conversion and type coercion with examples.', a: 'Explicit conversion with Number(), String(), Boolean(), parseInt(); implicit coercion with +, -, *, ==, if conditions; examples and pitfalls; recommend === and explicit conversion.' },
    ],
    practice: ['Write code that adds two numbers stored as strings correctly.', 'Log the type of 7 different values.'],
    revision: ['7 primitives + objects.', 'typeof null = "object" (bug).', '+ with string joins; - * / convert to number.', 'Objects are copied by reference.'],
    quiz: [
      { q: '"8" - 3 = ?', o: ['"83"', '5', 'NaN', '"5"'], a: 1, e: '- coerces to number.' },
      { q: 'typeof [] is…', o: ['"array"', '"object"', '"list"', '"undefined"'], a: 1, e: 'Arrays are objects. Use Array.isArray().' },
      { q: 'Which is NOT a primitive?', o: ['string', 'boolean', 'object', 'symbol'], a: 2, e: 'object is a reference type.' },
    ],
  },
  {
    id: 'js-operators', track: 'js', group: 'Variables', level: 'Beginner', minutes: 14,
    title: 'Operators, Truthy/Falsy & Template Literals', syllabus: 'Operators · Expressions · Template Literals · Truthy and Falsy Values',
    summary: 'Do maths, compare values and build strings.',
    definition: '**Operators** perform actions on values. **Arithmetic** (`+ - * / % **`), **assignment** (`= += -= ++`), **comparison** (`== === != !== > < >= <=`), **logical** (`&& || !`) and the **ternary** (`cond ? a : b`). A value is **truthy** or **falsy** when used as a condition; the falsy values are `false, 0, "", null, undefined, NaN`. **Template literals** use backticks to embed values: \`Hello ${name}\`.',
    why: 'Calculating totals and discounts, checking passwords match, deciding if a user is logged in and building messages all use operators.',
    analogy: { title: 'A calculator and a judge', text: 'Arithmetic operators are calculator buttons. Comparison operators are a judge who answers only true or false. === is a strict judge who checks both value and type; == is a lenient judge who converts first.' },
    syntax: `10 % 3          // 1  (remainder)
2 ** 3          // 8  (power)
let x = 5; x += 2;  // 7
5 == "5"        // true  (loose: converts)
5 === "5"       // false (strict: type differs)
true && false   // false
true || false   // true
!true           // false
const name = "Aman";
\`Hi \${name}, 2+2 = \${2 + 2}\`  // "Hi Aman, 2+2 = 4"`,
    lines: [
      ['%', 'Modulus: the remainder after division. n % 2 === 0 checks if n is even.'],
      ['x += 2', 'Short for x = x + 2.'],
      ['== vs ===', 'Always prefer === to avoid surprising conversions.'],
      ['&& / ||', 'AND is true only if both are true; OR is true if at least one is true.'],
      ['Template literal', 'Backticks allow ${expression} placeholders and multi-line strings.'],
    ],
    live: { js: `const price = 1200;\nconst discount = 15;\nconst finalPrice = price - (price * discount) / 100;\nconsole.log(\`Final price: ₹\${finalPrice}\`);\nconsole.log(7 % 2 === 1 ? "odd" : "even");\nconsole.log(0 == false, 0 === false);\nconst userName = "";\nconsole.log(userName || "Guest");` },
    tabs: ['js'],
    steps: [
      { line: 1, note: 'price = 1200', vars: { price: 1200 } },
      { line: 2, note: 'discount = 15 (percent)', vars: { price: 1200, discount: 15 } },
      { line: 3, note: 'Brackets first: 1200 × 15 = 18000, ÷ 100 = 180, then 1200 − 180 = 1020.', vars: { price: 1200, discount: 15, finalPrice: 1020 } },
      { line: 4, note: 'The template literal inserts the value.', vars: { price: 1200, discount: 15, finalPrice: 1020 }, out: 'Final price: ₹1020' },
      { line: 5, note: '7 % 2 is 1 → condition true → "odd".', vars: { price: 1200, discount: 15, finalPrice: 1020 }, out: 'odd' },
      { line: 6, note: '== converts false to 0 → true. === sees number vs boolean → false.', vars: { price: 1200, discount: 15, finalPrice: 1020 }, out: 'true false' },
      { line: 7, note: 'An empty string.', vars: { price: 1200, discount: 15, finalPrice: 1020, userName: '""' } },
      { line: 8, note: '"" is falsy, so || returns the right side.', vars: { price: 1200, discount: 15, finalPrice: 1020, userName: '""' }, out: 'Guest' },
    ],
    tryThis: ['Set userName = "Neha" and run again.', 'Try null ?? "default" — ?? only falls back for null/undefined, not for "" or 0.'],
    mistakes: [
      { wrong: 'if (x = 5)', right: 'if (x === 5)', why: '= assigns; === compares. The first is always truthy.' },
      { wrong: '"Hello ${name}" with normal quotes', right: '`Hello ${name}` with backticks', why: 'Only backticks create template literals.' },
      { wrong: 'Using || for defaults when 0 is valid', right: 'Use ?? (nullish coalescing)', why: '0 || 10 gives 10, but 0 ?? 10 gives 0.' },
    ],
    exam: {
      definition: 'Operators are symbols that perform operations on operands. JavaScript provides arithmetic, assignment, comparison, logical, bitwise, ternary, typeof and nullish coalescing operators. Truthy and falsy describe how values are converted to boolean in a conditional context. Template literals are string literals delimited by backticks that support embedded expressions and multi-line text.',
      points: ['Falsy values: false, 0, -0, 0n, "", null, undefined, NaN. Everything else is truthy (including "0", [], {}).', '== performs type coercion; === compares value and type without coercion.', 'Logical operators short-circuit: a && b returns a if falsy; a || b returns a if truthy.', 'Precedence: () → ** → * / % → + - → comparison → equality → && → || → ?: → =.', 'Increment: x++ (post, returns old) vs ++x (pre, returns new).'],
      diff: { title: '== vs ===', head: ['== (loose)', '=== (strict)'], rows: [['Converts types first', 'No conversion'], ['5 == "5" → true', '5 === "5" → false'], ['null == undefined → true', 'null === undefined → false'], ['Can surprise you', 'Predictable — recommended']] },
    },
    examQs: [
      { m: 1, q: 'What does the % operator return?', a: 'The remainder of a division.' },
      { m: 2, q: 'List all falsy values in JavaScript.', a: 'false, 0, -0, 0n, "" (empty string), null, undefined, NaN.' },
      { m: 2, q: 'Predict: let a = 5; console.log(a++ + ++a);', a: '12. a++ returns 5 (a becomes 6), ++a makes a 7 and returns 7; 5 + 7 = 12.' },
      { m: 3, q: 'Differentiate == and === with examples.', a: 'Use the table with examples 0 == false (true), 0 === false (false), "" == 0 (true).' },
      { m: 5, q: 'Explain the different types of operators in JavaScript with examples.', a: 'Arithmetic, assignment, comparison, logical, ternary, typeof, nullish ?? and optional chaining ?. — each with an example and output.' },
    ],
    practice: ['Calculate simple interest SI = P × R × T / 100.', 'Check if a year is a leap year using % and logical operators.', 'Greet a user by name with a template literal.'],
    revision: ['+ - * / % **', '=== over ==', '&& || ! short-circuit', 'Falsy: false 0 "" null undefined NaN', '`${}` template literals', 'a ?? b for null/undefined defaults'],
    quiz: [
      { q: '10 % 4 = ?', o: ['2.5', '2', '6', '0'], a: 1, e: 'Remainder 2.' },
      { q: 'Which is truthy?', o: ['0', '""', '"0"', 'null'], a: 2, e: 'Any non-empty string is truthy.' },
      { q: 'null ?? "x" gives…', o: ['null', '"x"', 'undefined', 'Error'], a: 1, e: '?? returns the right side for null/undefined.' },
      { q: '2 ** 4 = ?', o: ['8', '16', '6', '24'], a: 1, e: '2⁴ = 16.' },
    ],
  },
  {
    id: 'js-conditions', track: 'js', group: 'Conditions & Loops', level: 'Beginner', minutes: 12,
    title: 'Conditional Statements & Switch', syllabus: 'Conditional Statements · Control Flow Statements',
    summary: 'Let your program make decisions.',
    definition: '**Conditional statements** run different code depending on whether a condition is true. `if` runs a block when the condition is truthy, `else if` checks another condition, and `else` handles everything else. `switch` compares one value against many `case`s. The **ternary** `cond ? a : b` is a one-line if/else that produces a value.',
    why: 'Show "Pass" or "Fail", give free delivery above ₹499, show a dark theme at night, block underage users — decisions are everywhere.',
    analogy: { title: 'Choosing what to wear', text: 'if it is raining → umbrella; else if it is sunny → sunglasses; else → just go. switch is like a lift: press 1, 2 or 3 and it goes straight to that floor.' },
    syntax: `if (marks >= 90) {
  grade = "A";
} else if (marks >= 75) {
  grade = "B";
} else {
  grade = "C";
}

switch (day) {
  case "Sat":
  case "Sun":
    console.log("Weekend");
    break;
  default:
    console.log("Weekday");
}`,
    lines: [
      ['if (marks >= 90)', 'Condition in brackets. If true, the block in { } runs and the rest is skipped.'],
      ['else if', 'Checked only when previous conditions were false. Order matters!'],
      ['else', 'Runs when nothing above matched.'],
      ['switch (day)', 'Compares day with each case using ===.'],
      ['break', 'Stops the switch. Without it, execution "falls through" into the next case.'],
      ['default', 'Runs when no case matches.'],
    ],
    live: { js: `const marks = 82;\nlet grade;\nif (marks >= 90) {\n  grade = "A";\n} else if (marks >= 75) {\n  grade = "B";\n} else {\n  grade = "C";\n}\nconsole.log("Grade:", grade);\nconst status = marks >= 40 ? "Pass" : "Fail";\nconsole.log(status);` },
    tabs: ['js'],
    steps: [
      { line: 1, note: 'marks = 82', vars: { marks: 82 } },
      { line: 2, note: 'grade declared, value undefined for now.', vars: { marks: 82, grade: 'undefined' } },
      { line: 3, note: 'Is 82 >= 90? false → skip this block.', vars: { marks: 82, grade: 'undefined' } },
      { line: 5, note: 'Is 82 >= 75? true → enter this block.', vars: { marks: 82, grade: 'undefined' } },
      { line: 6, note: 'grade becomes "B". The else is skipped.', vars: { marks: 82, grade: '"B"' } },
      { line: 10, note: 'Print the grade.', vars: { marks: 82, grade: '"B"' }, out: 'Grade: B' },
      { line: 11, note: '82 >= 40 is true → ternary picks "Pass".', vars: { marks: 82, grade: '"B"', status: '"Pass"' } },
      { line: 12, note: 'Print status.', vars: { marks: 82, grade: '"B"', status: '"Pass"' }, out: 'Pass' },
    ],
    tryThis: ['Change marks to 95, 60 and 30.', 'Swap the order: check >= 75 before >= 90. What goes wrong for 95?', 'Write a switch for days of the week.'],
    mistakes: [
      { wrong: 'if (marks > 90) … else if (marks > 75) … with 90 exactly', right: 'Use >= for inclusive boundaries.', why: 'Off-by-one boundaries are the most common logic bug.' },
      { wrong: 'Forgetting break in switch.', right: 'End each case with break (unless fall-through is intended).', why: 'Otherwise multiple cases run.' },
      { wrong: 'if (age > 18 && < 60)', right: 'if (age > 18 && age < 60)', why: 'Each side of && is a full expression.' },
    ],
    exam: {
      definition: 'Conditional statements control the flow of execution by evaluating conditions and executing code blocks accordingly. JavaScript provides if, if…else, else if ladders, nested if, switch and the conditional (ternary) operator.',
      points: ['Conditions are converted to boolean (truthy/falsy).', 'switch uses strict comparison (===).', 'break exits switch/loop; default handles unmatched values.', 'Ternary returns a value and can be used inside expressions.', 'Prefer early returns and clear conditions over deep nesting.'],
      diff: { title: 'if-else vs switch', head: ['if-else', 'switch'], rows: [['Any condition / range', 'Equality against fixed values'], ['Evaluates each condition', 'Matches one expression'], ['Good for ranges (marks >= 90)', 'Good for menus, days, commands']] },
      diagram: 'if-flow',
    },
    examQs: [
      { m: 1, q: 'What happens if break is omitted in a switch case?', a: 'Execution falls through and runs the following cases until a break or the end.' },
      { m: 3, q: 'Write a program to find the largest of three numbers.', a: 'let a=4,b=9,c=7; let max; if (a>=b && a>=c) max=a; else if (b>=a && b>=c) max=b; else max=c; console.log(max); // 9' },
      { m: 5, q: 'Write a JavaScript program using switch to print the name of the day for a number 1–7.', a: 'switch(n){case 1: day="Monday"; break; … case 7: day="Sunday"; break; default: day="Invalid";} with explanation of case, break and default.' },
    ],
    practice: ['Electricity bill: first 100 units ₹5, next 100 ₹7, above ₹10.', 'Check if a number is positive, negative or zero.', 'Use a switch for a simple calculator (+ - * /).'],
    revision: ['if / else if / else — first true wins.', 'switch + case + break + default.', 'cond ? a : b', 'Boundaries: >= vs >.'],
    quiz: [
      { q: 'switch compares using…', o: ['==', '===', '>', 'typeof'], a: 1, e: 'Strict equality.' },
      { q: 'Ternary syntax?', o: ['a ? b : c', 'a : b ? c', 'if a then b', 'a ?? b : c'], a: 0, e: 'condition ? ifTrue : ifFalse.' },
    ],
  },
  {
    id: 'js-loops', track: 'js', group: 'Conditions & Loops', level: 'Beginner', minutes: 14,
    title: 'Loops: for, while, do-while', syllabus: 'Loops · break and continue',
    summary: 'Repeat code without copying it.',
    definition: 'A **loop** repeats a block of code. `for` is best when you know how many times; `while` repeats as long as a condition is true; `do…while` runs at least once and then checks. `for…of` loops over the items of an array or string. `break` exits a loop early and `continue` skips to the next iteration.',
    why: 'Showing 100 products, printing a multiplication table, checking every character of a password or processing every student\'s marks — loops do repetitive work for you.',
    analogy: { title: 'Laps around a track', text: '`for (let lap = 1; lap <= 5; lap++)` is a coach saying "start at lap 1, keep running while lap ≤ 5, add one after each lap". `break` is stopping because it started raining; `continue` is skipping the water break on one lap.' },
    syntax: `for (let i = 1; i <= 5; i++) {
  console.log(i);
}
let n = 3;
while (n > 0) { console.log(n); n--; }
do { console.log("runs once"); } while (false);
for (const fruit of ["apple", "mango"]) console.log(fruit);`,
    lines: [
      ['let i = 1', 'Initialisation: runs once before the loop starts.'],
      ['i <= 5', 'Condition: checked before every iteration; the loop stops when false.'],
      ['i++', 'Update: runs after each iteration.'],
      ['while (n > 0)', 'Repeat while true. Something inside must change n, or it never ends!'],
      ['do…while', 'Body first, check after — always runs at least once.'],
      ['for…of', 'Gives each value of an iterable directly.'],
    ],
    live: { js: `for (let i = 1; i <= 5; i++) {\n  if (i === 3) continue;\n  console.log("7 x " + i + " = " + 7 * i);\n}\nlet count = 0;\nwhile (true) {\n  count++;\n  if (count === 4) break;\n}\nconsole.log("count stopped at", count);` },
    tabs: ['js'],
    steps: [
      { line: 1, note: 'i = 1; is 1 <= 5? yes → enter.', vars: { i: 1 } },
      { line: 2, note: 'i is not 3, continue is skipped.', vars: { i: 1 } },
      { line: 3, note: 'Print the row.', vars: { i: 1 }, out: '7 x 1 = 7' },
      { line: 1, note: 'i++ → 2; 2 <= 5 → enter again.', vars: { i: 2 } },
      { line: 3, note: 'Print.', vars: { i: 2 }, out: '7 x 2 = 14' },
      { line: 2, note: 'i = 3 → continue: skip the rest of this iteration.', vars: { i: 3 } },
      { line: 3, note: 'i = 4 and i = 5 print normally… then i becomes 6 and the loop ends.', vars: { i: '4 → 5 → 6' }, out: '7 x 4 = 28\n7 x 5 = 35' },
      { line: 6, note: 'while(true) would run forever…', vars: { count: 0 } },
      { line: 8, note: '…but when count reaches 4, break exits.', vars: { count: 4 } },
      { line: 10, note: 'Print after the loop.', vars: { count: 4 }, out: 'count stopped at 4' },
    ],
    tryThis: ['Print numbers from 10 down to 1.', 'Remove the break and run — CodePlay stops runaway loops so the tab does not freeze.', 'Sum the numbers 1 to 100 (answer: 5050).'],
    mistakes: [
      { wrong: 'for (let i = 0; i <= arr.length; i++)', right: 'i < arr.length', why: 'Arrays index 0 to length − 1; <= reads one past the end (undefined).' },
      { wrong: 'while (i < 10) { console.log(i); }', right: 'Update i inside the loop.', why: 'The condition never changes → infinite loop.' },
      { wrong: 'for (let i = 0; i < 5; i++); { … }', right: 'No semicolon after the for(…)', why: 'The semicolon makes an empty loop body.' },
    ],
    exam: {
      definition: 'A loop is a control structure that repeatedly executes a block of statements while a condition holds. JavaScript provides for, while, do…while, for…of (iterates values of iterables) and for…in (iterates enumerable property keys of objects).',
      points: ['for: initialisation; condition; update.', 'while: entry-controlled (condition checked first).', 'do…while: exit-controlled (runs at least once).', 'break terminates the loop; continue skips to the next iteration.', 'for…of for arrays/strings; for…in for object keys.'],
      diff: { title: 'while vs do-while', head: ['while', 'do…while'], rows: [['Entry-controlled', 'Exit-controlled'], ['May run 0 times', 'Runs at least once'], ['while (c) { }', 'do { } while (c);']] },
      diagram: 'loop-flow',
    },
    examQs: [
      { m: 1, q: 'Which loop executes at least once?', a: 'do…while' },
      { m: 2, q: 'Differentiate break and continue.', a: 'break exits the loop completely; continue skips the remaining statements of the current iteration and moves to the next.' },
      { m: 3, q: 'Write a program to print the factorial of 5 using a loop.', a: 'let f = 1; for (let i = 1; i <= 5; i++) f *= i; console.log(f); // 120' },
      { m: 5, q: 'Write a program to print all prime numbers between 1 and 50.', a: 'Outer loop n from 2 to 50, inner loop d from 2 to √n; if n % d === 0 mark not prime and break; print primes: 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47.' },
    ],
    practice: ['Print the multiplication table of any number.', 'Count vowels in a string using for…of.', 'Print a star pyramid of 5 rows.'],
    revision: ['for(init; cond; update)', 'while = check first; do-while = run first', 'break exits, continue skips', 'for…of values, for…in keys', 'i < length'],
    quiz: [
      { q: 'How many times does for (let i=0; i<3; i++) run?', o: ['2', '3', '4', 'Infinite'], a: 1, e: 'i = 0, 1, 2.' },
      { q: 'continue does what?', o: ['Exits the loop', 'Skips to next iteration', 'Restarts from 0', 'Nothing'], a: 1, e: 'Skips the rest of the current iteration.' },
      { q: 'for…of over "hi" gives…', o: ['0, 1', '"h", "i"', '"hi"', 'Error'], a: 1, e: 'Characters of the string.' },
    ],
  },
  {
    id: 'js-functions', track: 'js', group: 'Functions', level: 'Elementary', minutes: 16,
    title: 'Functions & Arrow Functions', syllabus: 'Function Declarations and Expressions · Parameters and Arguments · Return Values · Default Parameters · Arrow Functions · Rest and Spread',
    summary: 'Reusable blocks of code that take input and give output.',
    definition: 'A **function** is a named, reusable block of code. You **define** it once with **parameters** (input names), and **call** it many times with **arguments** (actual values). `return` sends a result back. Functions can be **declarations** (`function add(a, b) {}`), **expressions** (`const add = function (a, b) {}`) or **arrow functions** (`const add = (a, b) => a + b`).',
    why: 'Instead of writing the GST calculation 20 times, write `calcGST(price)` once. Functions make code shorter, easier to test and easier to fix.',
    analogy: { title: 'A juice machine', text: 'Parameters are the slots on the machine ("fruit"). Arguments are the actual fruits you drop in (mango). The body is the blending. `return` is the juice that comes out. Without `return`, the machine blends but gives you nothing (undefined).' },
    syntax: `function greet(name = "Student") {   // declaration + default parameter
  return "Hello, " + name;
}
const square = function (n) {         // expression
  return n * n;
};
const add = (a, b) => a + b;           // arrow (implicit return)
function sum(...nums) {                // rest parameter
  return nums.reduce((t, n) => t + n, 0);
}
sum(...[1, 2, 3]);                     // spread argument → 6`,
    lines: [
      ['function greet(name = "Student")', 'name is a parameter with a default value used when no argument is given.'],
      ['return', 'Ends the function and gives a value back to the caller.'],
      ['const square = function', 'A function stored in a variable. Not hoisted like declarations.'],
      ['(a, b) => a + b', 'Arrow function: shorter syntax; with one expression, the result is returned automatically.'],
      ['...nums', 'Rest: collects any number of arguments into an array.'],
      ['sum(...[1,2,3])', 'Spread: expands an array into separate arguments.'],
    ],
    live: { js: `function calcTotal(price, qty = 1) {\n  const subtotal = price * qty;\n  return subtotal + subtotal * 0.18;\n}\nconst bill = calcTotal(500, 2);\nconsole.log("Bill with GST:", bill);\nconst half = (n) => n / 2;\nconsole.log(half(bill));\nconsole.log(calcTotal(100));` },
    tabs: ['js'],
    steps: [
      { line: 1, note: 'Define calcTotal. Defining does NOT run it.', vars: { calcTotal: 'ƒ' } },
      { line: 5, note: 'Call calcTotal(500, 2): price = 500, qty = 2.', vars: { calcTotal: 'ƒ', price: 500, qty: 2 } },
      { line: 2, note: 'Inside the function: subtotal = 1000.', vars: { price: 500, qty: 2, subtotal: 1000 } },
      { line: 3, note: 'Return 1000 + 180 = 1180 back to the caller.', vars: { price: 500, qty: 2, subtotal: 1000 } },
      { line: 5, note: 'bill receives the returned value. price/qty/subtotal disappear (local).', vars: { calcTotal: 'ƒ', bill: 1180 } },
      { line: 6, note: 'Print.', vars: { calcTotal: 'ƒ', bill: 1180 }, out: 'Bill with GST: 1180' },
      { line: 7, note: 'Define an arrow function.', vars: { calcTotal: 'ƒ', bill: 1180, half: 'ƒ' } },
      { line: 8, note: 'half(1180) returns 590.', vars: { calcTotal: 'ƒ', bill: 1180, half: 'ƒ' }, out: '590' },
      { line: 9, note: 'qty not given → default 1 → 100 + 18.', vars: { calcTotal: 'ƒ', bill: 1180, half: 'ƒ' }, out: '118' },
    ],
    experiment: { lab: 'function-machine', text: 'Feed arguments into the Function Machine and watch them become parameters and a return value.' },
    tryThis: ['Remove the return keyword and see bill become undefined.', 'Convert calcTotal into an arrow function.'],
    mistakes: [
      { wrong: 'Calling greet instead of greet()', right: 'Use parentheses to call: greet()', why: 'greet alone is the function itself, not its result.' },
      { wrong: 'Code after return', right: 'return ends the function; put it last.', why: 'Lines after return never run.' },
      { wrong: 'const f = (a, b) => { a + b }', right: '(a, b) => a + b  or  { return a + b; }', why: 'With braces, you need an explicit return.' },
    ],
    exam: {
      definition: 'A function is a reusable block of code designed to perform a task, executed when invoked. Parameters are variables listed in the function definition; arguments are the actual values passed during the call. Arrow functions are a concise ES6 syntax for function expressions that do not have their own this, arguments or prototype.',
      points: ['Function declarations are hoisted completely; expressions and arrows are not callable before definition.', 'Default parameters (ES6): function f(x = 10).', 'Missing arguments become undefined; extra arguments are ignored (available via arguments in normal functions).', 'Rest parameter must be last: function f(a, ...rest).', 'Functions are first-class: they can be stored in variables, passed as arguments and returned.', 'Complexity: a loop over n items is O(n); nested loops O(n²).'],
      diff: { title: 'Normal function vs Arrow function', head: ['Normal function', 'Arrow function'], rows: [['function keyword', '=> syntax'], ['Has its own this', 'Inherits this from surroundings'], ['Has arguments object', 'No arguments object'], ['Can be used as constructor', 'Cannot use new'], ['Declarations are hoisted', 'Not hoisted (stored in a variable)']] },
    },
    examQs: [
      { m: 1, q: 'What does a function return if there is no return statement?', a: 'undefined' },
      { m: 2, q: 'Differentiate between parameters and arguments.', a: 'Parameters are the names declared in the function definition; arguments are the actual values supplied when calling it.' },
      { m: 3, q: 'Write an arrow function that returns the largest of two numbers.', a: 'const max = (a, b) => (a > b ? a : b); console.log(max(4, 9)); // 9' },
      { m: 5, q: 'Explain function declaration, function expression and arrow function with examples.', a: 'Code for each, differences in hoisting, syntax, this behaviour, and when to use them.' },
      { m: 5, q: 'Explain rest parameters and the spread operator with examples.', a: 'Rest collects multiple arguments into an array (function f(...nums)); spread expands an iterable into elements (Math.max(...arr), [...a, ...b], {...obj}).' },
    ],
    practice: ['Write isEven(n) returning true/false.', 'Write a function that converts Celsius to Fahrenheit.', 'Write average(...nums).'],
    revision: ['Define once, call many times.', 'params (definition) vs args (call).', 'return gives a value; default undefined.', 'Arrow: (a) => a * 2.', 'Rest ...collects, spread ...expands.'],
    quiz: [
      { q: 'const f = x => x * 2; f(4) = ?', o: ['4', '8', '"x*2"', 'undefined'], a: 1, e: 'Implicit return 8.' },
      { q: 'Which is hoisted completely?', o: ['Arrow function', 'Function expression', 'Function declaration', 'None'], a: 2, e: 'Declarations can be called before they appear.' },
      { q: 'function f(a, b = 2) { return a + b } f(3) = ?', o: ['3', '5', 'NaN', 'Error'], a: 1, e: 'b defaults to 2.' },
    ],
  },
  {
    id: 'js-scope', track: 'js', group: 'Functions', level: 'Intermediate', minutes: 18,
    title: 'Scope, Hoisting, TDZ & Closures', syllabus: 'Scope and Hoisting · Lexical Scope · Scope Chain · Temporal Dead Zone · Closures',
    summary: 'Where variables live, when they exist, and how functions remember.',
    definition: '**Scope** is the region of code where a variable is accessible: **global**, **function** and **block** (`{ }`) scope. JavaScript uses **lexical scope** — inner code can see outer variables, determined by where code is written. When a variable is looked up, JS climbs the **scope chain** outward. **Hoisting** means declarations are processed before code runs: `var` is created as `undefined`, while `let`/`const` exist but are in the **Temporal Dead Zone (TDZ)** until their line. A **closure** is a function that remembers the variables of the scope where it was created, even after that outer function has finished.',
    why: 'Scope bugs are the most common source of "undefined" surprises. Closures power counters, private data, event handlers and React hooks.',
    analogy: { title: 'Rooms in a house with one-way glass', text: 'Each function is a room with one-way glass: from inside you can see the hallway (outer scope), but people in the hallway cannot see inside. A closure is a backpack: when a function leaves the room, it carries the variables it needs in its backpack.' },
    syntax: `let global = "everyone sees me";
function outer() {
  let outerVar = "outer";
  if (true) {
    let blockVar = "only inside this if";
    var functionVar = "whole function";
  }
  // blockVar → ReferenceError here; functionVar works
}
console.log(x); // undefined  (var hoisted)
var x = 5;
console.log(y); // ReferenceError: TDZ
let y = 5;

function makeCounter() {
  let count = 0;
  return () => ++count;   // closure remembers count
}`,
    lines: [
      ['global', 'Declared outside everything: accessible everywhere.'],
      ['blockVar', 'let/const inside { } exist only inside those braces.'],
      ['var functionVar', 'var ignores blocks and belongs to the whole function.'],
      ['console.log(x) before var x', 'Hoisted declaration, value not yet assigned → undefined.'],
      ['console.log(y) before let y', 'y exists but is in the TDZ → ReferenceError.'],
      ['return () => ++count', 'The returned function keeps access to count after makeCounter has returned.'],
    ],
    live: { js: `function makeCounter() {\n  let count = 0;\n  return function () {\n    count++;\n    return count;\n  };\n}\nconst counterA = makeCounter();\nconst counterB = makeCounter();\nconsole.log(counterA(), counterA(), counterA());\nconsole.log(counterB());\nconsole.log(typeof count);` },
    tabs: ['js'],
    steps: [
      { line: 1, note: 'Define makeCounter (hoisted).', vars: { makeCounter: 'ƒ' } },
      { line: 8, note: 'Call makeCounter(): a NEW scope is created with count = 0, and the inner function is returned.', vars: { makeCounter: 'ƒ', counterA: 'ƒ (remembers count=0)' } },
      { line: 9, note: 'A second call creates a separate scope with its own count.', vars: { makeCounter: 'ƒ', counterA: 'ƒ (count=0)', counterB: 'ƒ (count=0)' } },
      { line: 10, note: 'counterA() three times → 1, 2, 3. Its count lives on in the closure.', vars: { makeCounter: 'ƒ', counterA: 'ƒ (count=3)', counterB: 'ƒ (count=0)' }, out: '1 2 3' },
      { line: 11, note: 'counterB has its own count → 1.', vars: { makeCounter: 'ƒ', counterA: 'ƒ (count=3)', counterB: 'ƒ (count=1)' }, out: '1' },
      { line: 12, note: 'count is not visible globally — it is private to the closures.', vars: { makeCounter: 'ƒ', counterA: 'ƒ (count=3)', counterB: 'ƒ (count=1)' }, out: 'undefined' },
    ],
    experiment: { lab: 'scope', text: 'See global, function and block scopes as nested boxes in the Scope Visualizer, then watch var/let/const in the Hoisting Demonstrator.' },
    tryThis: ['Add a reset function to the returned value: return { inc, reset }.', 'Replace let with var inside a for loop with setTimeout and observe the classic closure bug.'],
    mistakes: [
      { wrong: 'for (var i = 0; i < 3; i++) setTimeout(() => console.log(i))  → 3 3 3', right: 'Use let i', why: 'var shares one i for the whole function; let creates a new i per iteration.' },
      { wrong: 'Using a variable before let declares it.', right: 'Declare variables at the top of their scope.', why: 'TDZ ReferenceError.' },
      { wrong: 'Creating many accidental globals.', right: 'Always declare with let/const.', why: 'Assigning to an undeclared name creates a global in non-strict mode.' },
    ],
    exam: {
      definition: 'Scope determines the accessibility of variables. JavaScript has global, function and block scope and uses lexical (static) scoping, where nested functions access variables of their enclosing scopes through the scope chain. Hoisting is the behaviour of processing declarations before executing code. The Temporal Dead Zone is the period between entering a scope and the declaration of a let/const variable, during which accessing it throws a ReferenceError. A closure is the combination of a function and its lexical environment, allowing it to access outer variables after the outer function has returned.',
      points: ['Function declarations are hoisted with their body.', 'var hoisted and initialised to undefined; let/const hoisted but uninitialised (TDZ).', 'Scope chain: current → outer → … → global; ReferenceError if not found.', 'Uses of closures: data privacy/encapsulation, function factories, memoisation, event handlers, module pattern.', 'Each call to an outer function creates a new closure.'],
      diff: { title: 'Global vs Function vs Block scope', head: ['Global', 'Function', 'Block'], rows: [['Outside all functions', 'Inside a function', 'Inside { }'], ['Accessible everywhere', 'Accessible inside function', 'Accessible inside block'], ['var/let/const', 'var/let/const', 'let/const only']] },
      diagram: 'scope-boxes',
    },
    examQs: [
      { m: 1, q: 'What is the Temporal Dead Zone?', a: 'The time between the start of a scope and the line where a let/const variable is declared; accessing it there throws a ReferenceError.' },
      { m: 2, q: 'Predict: console.log(a); var a = 10;', a: 'undefined — the declaration is hoisted but the assignment is not.' },
      { m: 3, q: 'What is lexical scope? Explain the scope chain.', a: 'Variable access is decided by where code is written. An inner function can access its own variables, then the outer function\'s, then globals — searching outward along the scope chain.' },
      { m: 5, q: 'What is a closure? Write a counter program using a closure.', a: 'Definition plus makeCounter example with private count; explain that the inner function keeps a reference to the outer lexical environment; mention uses.' },
      { m: 10, q: 'Explain scope, hoisting and closures in JavaScript with examples and output.', a: 'Combine: types of scope with code, hoisting of var/let/const/functions with outputs, TDZ, closures with counter and the var-in-loop example and its fix with let.' },
    ],
    practice: ['Write a function makeMultiplier(n) that returns a function multiplying by n.', 'Predict outputs of 3 hoisting snippets before running them.'],
    revision: ['Scopes: global, function, block.', 'Lexical scope → scope chain outward.', 'var hoisted as undefined; let/const TDZ.', 'Closure = function + remembered variables.'],
    quiz: [
      { q: 'Accessing a let variable before its declaration gives…', o: ['undefined', 'null', 'ReferenceError', '0'], a: 2, e: 'TDZ.' },
      { q: 'Which keyword ignores block scope?', o: ['let', 'const', 'var', 'All'], a: 2, e: 'var is function-scoped.' },
      { q: 'A closure lets a function…', o: ['Run faster', 'Access variables of its outer scope later', 'Become global', 'Return twice'], a: 1, e: 'It remembers its lexical environment.' },
    ],
  },
  {
    id: 'js-hof', track: 'js', group: 'Functions', level: 'Intermediate', minutes: 16,
    title: 'Higher-Order Functions, Callbacks, IIFE & this', syllabus: 'Higher-Order Functions · Callback Functions · IIFE · this Keyword · call(), apply(), bind() · Functional Programming',
    summary: 'Functions that take or return functions, and how `this` works.',
    definition: 'A **higher-order function** takes a function as an argument or returns one. The function passed in is a **callback** — it is "called back" later. An **IIFE** (Immediately Invoked Function Expression) runs as soon as it is defined. `this` refers to the object that is calling a method; `call()`, `apply()` and `bind()` let you set `this` explicitly. **Functional programming** favours pure functions (same input → same output, no side effects) and not mutating data.',
    why: 'Event listeners, `setTimeout`, array methods like `map` and `filter`, and fetch handlers all use callbacks. Understanding `this` avoids the classic "undefined is not a function" bug in object methods.',
    analogy: { title: 'Leaving your phone number', text: 'A callback is leaving your number at a shop: "call me back when the shoes arrive." You do not wait at the counter; the shop (higher-order function) calls you when it is ready.' },
    syntax: `function repeat(times, action) {   // higher-order
  for (let i = 0; i < times; i++) action(i);
}
repeat(3, (i) => console.log("Hi", i));  // callback

(function () { console.log("IIFE runs now"); })();

const user = {
  name: "Kabir",
  hello() { return "I am " + this.name; },
};
const fn = user.hello;
fn.call({ name: "Zoya" });          // "I am Zoya"
fn.apply({ name: "Ira" }, []);      // args as an array
const bound = fn.bind(user);        // returns new function
bound();                            // "I am Kabir"`,
    lines: [
      ['action(i)', 'repeat calls whatever function it was given.'],
      ['(function(){ … })()', 'Wrap in brackets to make an expression, then call it immediately. Creates a private scope.'],
      ['this.name', 'Inside a method, this is the object before the dot: user.hello() → user.'],
      ['call(thisArg, a, b)', 'Calls the function with a chosen this and comma-separated arguments.'],
      ['apply(thisArg, [a, b])', 'Same, but arguments in an array.'],
      ['bind(thisArg)', 'Does not call; returns a new function with this permanently set.'],
    ],
    live: { js: `function applyDiscount(prices, rule) {\n  const result = [];\n  for (const p of prices) result.push(rule(p));\n  return result;\n}\nconst tenOff = (p) => p * 0.9;\nconsole.log(applyDiscount([100, 250, 400], tenOff));\nconst shop = {\n  name: "CodeMart",\n  greet() { console.log("Welcome to " + this.name); },\n};\nshop.greet();\nconst g = shop.greet;\ng.call({ name: "PixelStore" });` },
    tabs: ['js'],
    steps: [
      { line: 1, note: 'applyDiscount is higher-order: its second parameter is a function.', vars: { applyDiscount: 'ƒ' } },
      { line: 6, note: 'tenOff is a small function to pass in.', vars: { applyDiscount: 'ƒ', tenOff: 'ƒ' } },
      { line: 7, note: 'Pass tenOff (no brackets!) as the callback. Each price goes through rule(p).', vars: { applyDiscount: 'ƒ', tenOff: 'ƒ' }, out: '[90, 225, 360]' },
      { line: 12, note: 'shop.greet() — this is shop.', vars: { shop: '{ name, greet }' }, out: 'Welcome to CodeMart' },
      { line: 13, note: 'g is the same function, detached from shop.', vars: { shop: '{ name, greet }', g: 'ƒ greet' } },
      { line: 14, note: 'call sets this to another object.', vars: { shop: '{ name, greet }', g: 'ƒ greet' }, out: 'Welcome to PixelStore' },
    ],
    tryThis: ['Write another rule: (p) => p - 50 and pass it.', 'Call g() alone without call. What is this.name now?', 'Use bind to create greetShop that always uses shop.'],
    mistakes: [
      { wrong: 'applyDiscount(prices, tenOff())', right: 'applyDiscount(prices, tenOff)', why: 'tenOff() calls it immediately and passes the result, not the function.' },
      { wrong: 'Arrow functions as object methods using this.', right: 'Use method shorthand greet() { }.', why: 'Arrow functions do not have their own this.' },
    ],
    exam: {
      definition: 'A higher-order function is a function that accepts one or more functions as arguments or returns a function. A callback is a function passed as an argument to be executed later. An IIFE is a function expression executed immediately after its creation. The this keyword refers to the execution context object, determined by how a function is called; call(), apply() and bind() explicitly set this.',
      points: ['Built-in HOFs: map, filter, reduce, forEach, sort, setTimeout, addEventListener.', 'IIFE uses: private scope, avoid polluting globals, module pattern (pre-ES modules).', 'this rules: method call → object; plain call → undefined (strict) / window; new → new object; arrow → lexical this; event handler → element.', 'call(this, a, b), apply(this, [a, b]), bind(this, a) → new function.', 'Functional programming: pure functions, immutability, first-class functions, composition. Improves reusability and testability.'],
      diff: { title: 'call vs apply vs bind', head: ['call', 'apply', 'bind'], rows: [['Invokes immediately', 'Invokes immediately', 'Returns new function'], ['Args comma-separated', 'Args as array', 'Args comma-separated (partial)'], ['fn.call(o, 1, 2)', 'fn.apply(o, [1, 2])', 'fn.bind(o)(1, 2)']] },
    },
    examQs: [
      { m: 1, q: 'What is a callback function?', a: 'A function passed as an argument to another function to be executed later.' },
      { m: 2, q: 'What is an IIFE? Write an example.', a: 'An Immediately Invoked Function Expression runs as soon as it is defined: (function () { console.log("run"); })(); It creates a private scope.' },
      { m: 3, q: 'Differentiate call(), apply() and bind().', a: 'Use the table with an example object and function.' },
      { m: 5, q: 'Explain the this keyword in different contexts.', a: 'Global, method, standalone function (strict vs non-strict), constructor with new, arrow functions, event handlers, and explicit binding with call/apply/bind — with examples.' },
    ],
    practice: ['Write your own myMap(arr, fn).', 'Create a timer using setTimeout with a callback.', 'Write a pure function that returns a new array instead of changing the input.'],
    revision: ['HOF takes/returns functions.', 'Pass callbacks without ().', 'IIFE: (function(){})()', 'this = who calls.', 'call(args), apply([args]), bind → new fn.'],
    quiz: [
      { q: 'Which returns a new function without calling it?', o: ['call', 'apply', 'bind', 'invoke'], a: 2, e: 'bind.' },
      { q: 'In obj.method(), this is…', o: ['window', 'obj', 'method', 'undefined'], a: 1, e: 'The object before the dot.' },
      { q: 'setTimeout(fn, 1000) — fn is a…', o: ['Promise', 'Callback', 'Class', 'Closure only'], a: 1, e: 'It is called back after 1 second.' },
    ],
  },
  {
    id: 'js-arrays', track: 'js', group: 'Arrays & Objects', level: 'Elementary', minutes: 18,
    title: 'Arrays & map, filter, reduce', syllabus: 'Array Fundamentals · Operations · Iteration Methods · map/filter/reduce · Searching and Sorting · Multidimensional Arrays · Destructuring',
    summary: 'Ordered lists of values and powerful methods to process them.',
    definition: 'An **array** is an ordered list of values, written in square brackets: `["HTML", "CSS", "JS"]`. Items are accessed by **index**, starting at 0. Arrays have methods to add/remove (`push`, `pop`, `shift`, `unshift`, `splice`), search (`indexOf`, `includes`, `find`), sort (`sort`, `reverse`) and transform: **map** (change every item), **filter** (keep some items) and **reduce** (combine all items into one value).',
    why: 'Shopping carts, lists of students, search results, chat messages and leaderboard scores are all arrays. map/filter/reduce replace most loops with clear one-liners.',
    analogy: { title: 'A tiffin box with numbered compartments', text: 'Compartment 0, 1, 2… each holds one item. map = putting each item through the same recipe. filter = removing the items you do not like. reduce = mixing everything into one bowl.' },
    syntax: `const marks = [78, 45, 92, 61];
marks[0];              // 78
marks.length;          // 4
marks.push(88);        // add to end
marks.pop();           // remove from end
const plus5   = marks.map(m => m + 5);          // [83, 50, 97, 66]
const passed  = marks.filter(m => m >= 50);     // [78, 92, 61]
const total   = marks.reduce((sum, m) => sum + m, 0); // 276
const topper  = marks.find(m => m > 90);        // 92
const sorted  = [...marks].sort((a, b) => a - b); // ascending
const [first, second] = marks;                  // destructuring
const grid = [[1, 2], [3, 4]]; grid[1][0];      // 3`,
    lines: [
      ['marks[0]', 'Index 0 is the first item; the last is marks[marks.length - 1].'],
      ['map', 'Returns a NEW array of the same length with each item transformed.'],
      ['filter', 'Returns a NEW array with only the items where the callback returns true.'],
      ['reduce((sum, m) => …, 0)', 'Carries an accumulator (sum) through the array, starting at 0.'],
      ['sort((a, b) => a - b)', 'Without a compare function, sort compares as strings: [10, 9, 1] → [1, 10, 9]!'],
      ['const [first, second] = marks', 'Destructuring: unpack values into variables.'],
      ['grid[1][0]', 'A 2D array: row 1, column 0.'],
    ],
    live: { js: `const cart = [\n  { item: "Pen", price: 20, qty: 3 },\n  { item: "Notebook", price: 60, qty: 2 },\n  { item: "Bag", price: 900, qty: 1 },\n];\nconst names = cart.map((p) => p.item);\nconst cheap = cart.filter((p) => p.price < 100);\nconst total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);\nconsole.log(names);\nconsole.log(cheap.length, "cheap items");\nconsole.log("Total ₹" + total);` },
    tabs: ['js'],
    steps: [
      { line: 1, note: 'cart is an array of 3 objects.', vars: { cart: '[Pen, Notebook, Bag]' } },
      { line: 6, note: 'map pulls out the item of every product → a new array of strings.', vars: { cart: '[3 items]', names: '["Pen","Notebook","Bag"]' } },
      { line: 7, note: 'filter keeps only products with price < 100 (Pen and Notebook).', vars: { cart: '[3 items]', names: '[…]', cheap: '[Pen, Notebook]' } },
      { line: 8, note: 'reduce: 0 + 60 = 60 → 60 + 120 = 180 → 180 + 900 = 1080.', vars: { cart: '[3 items]', names: '[…]', cheap: '[2 items]', total: 1080 } },
      { line: 9, note: 'Print names.', vars: { total: 1080 }, out: '[Pen, Notebook, Bag]' },
      { line: 10, note: 'cheap has 2 items.', vars: { total: 1080 }, out: '2 cheap items' },
      { line: 11, note: 'Print total.', vars: { total: 1080 }, out: 'Total ₹1080' },
    ],
    experiment: { lab: 'array', text: 'Push, pop, map, filter and reduce visually in the Array Playground.' },
    tryThis: ['Use find to get the Bag object.', 'Sort the cart by price descending.', 'Chain: cart.filter(...).map(...).'],
    mistakes: [
      { wrong: 'arr[arr.length]', right: 'arr[arr.length - 1]', why: 'Indexes stop at length − 1.' },
      { wrong: 'nums.sort() for numbers', right: 'nums.sort((a, b) => a - b)', why: 'Default sort converts to strings.' },
      { wrong: 'Expecting map to change the original', right: 'Store the returned array.', why: 'map/filter return new arrays; push/pop/sort/splice change the original.' },
      { wrong: 'Forgetting the return in map(p => { p.price * 2 })', right: 'map(p => p.price * 2)', why: 'With braces you must write return.' },
    ],
    exam: {
      definition: 'An array is an ordered, zero-indexed collection of values that can hold elements of any type and grows dynamically. Functional array methods such as map(), filter() and reduce() accept callback functions and return new values without modifying the original array.',
      points: ['Mutating methods: push, pop, shift, unshift, splice, sort, reverse, fill.', 'Non-mutating: map, filter, reduce, slice, concat, find, findIndex, includes, indexOf, join, some, every.', 'forEach runs a function for each element and returns undefined.', 'Searching: linear search with a loop or indexOf/find; binary search on sorted arrays (O(log n)).', 'Sorting algorithms on arrays: bubble sort (O(n²)), built-in sort (TimSort in V8).', 'Multidimensional arrays: arrays of arrays (matrix[i][j]).', 'Destructuring: const [a, , c] = arr; with defaults and rest ([x, ...others]).'],
      diff: { title: 'map vs filter vs reduce', head: ['map', 'filter', 'reduce'], rows: [['Transforms each item', 'Selects some items', 'Combines into one value'], ['Same length', 'Same or shorter', 'Single value'], ['Callback returns new value', 'Callback returns true/false', 'Callback returns accumulator'], ['[1,2].map(x=>x*2) → [2,4]', '[1,2].filter(x=>x>1) → [2]', '[1,2].reduce((a,x)=>a+x,0) → 3']] },
    },
    examQs: [
      { m: 1, q: 'What is the index of the first element of an array?', a: '0' },
      { m: 2, q: 'Differentiate between slice() and splice().', a: 'slice(start, end) returns a shallow copy of a portion without changing the array; splice(start, deleteCount, ...items) changes the original array by removing/adding elements.' },
      { m: 3, q: 'Predict: [10, 1, 5, 100].sort()', a: '[1, 10, 100, 5] — default sort compares strings. Use sort((a, b) => a - b) for numeric order: [1, 5, 10, 100].' },
      { m: 5, q: 'Explain map, filter and reduce with a practical example.', a: 'Student marks array: map to add grace marks, filter to find passed students, reduce to compute total/average; show outputs and explain immutability.' },
      { m: 10, q: 'Write a program to implement bubble sort and linear search on an array. Discuss their time complexity.', a: 'Bubble sort with nested loops swapping adjacent items (O(n²)); linear search loop returning index or -1 (O(n)); mention binary search O(log n) on sorted arrays and built-in sort.' },
    ],
    practice: ['Find the average of an array of marks using reduce.', 'Get the names of students who scored above 80.', 'Write bubble sort from scratch.', 'Sum the diagonal of a 3×3 matrix.'],
    revision: ['Zero-indexed; length.', 'push/pop end, shift/unshift start.', 'map transform, filter select, reduce combine.', 'sort((a,b)=>a-b) for numbers.', 'const [a, b] = arr.'],
    quiz: [
      { q: '[1,2,3].map(x => x * 10) gives…', o: ['[10,20,30]', '60', '[1,2,3]', '[11,12,13]'], a: 0, e: 'Each item × 10.' },
      { q: 'Which method changes the original array?', o: ['map', 'filter', 'push', 'slice'], a: 2, e: 'push mutates.' },
      { q: '[5,8,2].reduce((a, b) => a + b, 0) = ?', o: ['15', '[15]', '582', '0'], a: 0, e: 'Sum = 15.' },
      { q: 'Which returns the first matching element?', o: ['filter', 'find', 'map', 'some'], a: 1, e: 'find returns one element.' },
    ],
  },
  {
    id: 'js-objects-json', track: 'js', group: 'Arrays & Objects', level: 'Elementary', minutes: 18,
    title: 'Objects, Copying & JSON', syllabus: 'Object Creation and Manipulation · Object Methods · Destructuring · Spread Syntax · Shallow and Deep Copy · Optional Chaining · Computed Properties · JSON',
    summary: 'Group related data with named keys — and send it over the internet as JSON.',
    definition: 'An **object** stores related data as **key–value pairs** (properties): `{ name: "Riya", age: 19 }`. Values can be anything, including functions (**methods**). Read properties with dot notation (`user.name`) or brackets (`user["name"]`). **JSON** (JavaScript Object Notation) is a text format based on object syntax, used to send data between browsers and servers; `JSON.stringify()` turns objects into text and `JSON.parse()` turns text back into objects.',
    why: 'Every user profile, product, post and API response is an object. When you fetch data from a server, it arrives as JSON.',
    analogy: { title: 'A student ID card', text: 'An object is an ID card with labelled fields: Name, Roll No, Branch. JSON is the same card photocopied as plain text so it can be faxed (sent over the network) and rebuilt on the other side.' },
    syntax: `const student = {
  name: "Riya",
  roll: 23,
  skills: ["HTML", "CSS"],
  address: { city: "Bareilly" },
  intro() { return "Hi, I am " + this.name; },
};
student.branch = "AI";                 // add
delete student.roll;                   // remove
const { name, address: { city } } = student;  // destructuring
const key = "year"; const o = { [key]: 1 };   // computed property
student.contact?.phone;                // optional chaining → undefined
const shallow = { ...student };        // spread copy (shallow)
const deep = structuredClone(student); // deep copy (no methods)
Object.keys(student);  Object.values(student);  Object.entries(student);
const text = JSON.stringify({ a: 1 }); // '{"a":1}'
JSON.parse(text).a;                    // 1`,
    lines: [
      ['name: "Riya"', 'A property: key name, value "Riya".'],
      ['intro() { … this.name }', 'A method: a function stored in the object.'],
      ['student.branch = "AI"', 'Objects are dynamic: add properties anytime.'],
      ['const { name, address: { city } }', 'Pull properties into variables, even nested ones.'],
      ['[key]: 1', 'Computed key: the property name comes from a variable.'],
      ['?.', 'Optional chaining: stops and returns undefined instead of crashing if something is missing.'],
      ['{ ...student }', 'Shallow copy: nested objects are still shared!'],
      ['structuredClone', 'Deep copy: nested objects are duplicated too.'],
      ['JSON.stringify / parse', 'Object → string for sending/saving; string → object for using.'],
    ],
    live: { js: `const original = { name: "Aman", marks: { web: 80 } };\nconst shallow = { ...original };\nconst deep = structuredClone(original);\nshallow.name = "Aman K";\nshallow.marks.web = 99;\nconsole.log(original.name, original.marks.web);\nconsole.log(deep.marks.web);\nconst json = JSON.stringify(original);\nconsole.log(json, typeof json);\nconsole.log(original.address?.city ?? "No address");` },
    tabs: ['js'],
    steps: [
      { line: 1, note: 'original has a nested object marks.', vars: { original: '{ name: "Aman", marks: → {web: 80} }' } },
      { line: 2, note: 'Spread copies top-level properties. marks still points to the SAME nested object.', vars: { original: '{…, marks: →M}', shallow: '{…, marks: →M}' } },
      { line: 3, note: 'structuredClone duplicates everything, including marks.', vars: { original: '{…, marks: →M}', shallow: '{…, marks: →M}', deep: '{…, marks: →M2}' } },
      { line: 4, note: 'Changing a top-level value affects only shallow.', vars: { 'original.name': '"Aman"', 'shallow.name': '"Aman K"' } },
      { line: 5, note: 'But M is shared, so original.marks.web changes too!', vars: { 'M.web': 99, 'M2.web': 80 } },
      { line: 6, note: 'Print.', vars: { 'M.web': 99 }, out: 'Aman 99' },
      { line: 7, note: 'The deep copy is unaffected.', vars: { 'M2.web': 80 }, out: '80' },
      { line: 8, note: 'Convert to a JSON string.', vars: { json: '\'{"name":"Aman","marks":{"web":99}}\'' } },
      { line: 9, note: 'It is text now.', out: '{"name":"Aman","marks":{"web":99}} string' },
      { line: 10, note: 'address is undefined; ?. avoids a crash and ?? gives a fallback.', out: 'No address' },
    ],
    tryThis: ['Loop over an object with for (const [k, v] of Object.entries(original)).', 'JSON.parse an invalid string like "{name: 1}" (keys need double quotes) and read the error.'],
    mistakes: [
      { wrong: 'user.first name', right: 'user["first name"]', why: 'Keys with spaces need bracket notation.' },
      { wrong: 'Assuming {...obj} is a full copy.', right: 'Use structuredClone for nested data.', why: 'Spread is shallow.' },
      { wrong: "JSON with single quotes: {'a': 1}", right: '{"a": 1}', why: 'JSON requires double quotes for keys and strings.' },
    ],
    exam: {
      definition: 'An object is a collection of key-value pairs (properties), where values may be primitives, other objects or functions (methods). JSON (JavaScript Object Notation) is a lightweight, language-independent text format for data interchange, based on JavaScript object literal syntax; JSON.stringify() serialises a value to JSON text and JSON.parse() deserialises JSON text into a value.',
      points: ['Creation: literal {}, new Object(), constructor functions, classes, Object.create().', 'Access: dot and bracket notation; check with "key" in obj or obj.hasOwnProperty().', 'Object.keys(), Object.values(), Object.entries(), Object.assign(), Object.freeze().', 'Shallow copy: spread, Object.assign; deep copy: structuredClone() or JSON.parse(JSON.stringify(obj)) (loses functions, dates).', 'JSON types: string, number, boolean, null, array, object (no functions/undefined).', 'Optional chaining (?.) and nullish coalescing (??) handle missing data safely.'],
      diff: { title: 'Shallow vs Deep copy', head: ['Shallow copy', 'Deep copy'], rows: [['Copies top level only', 'Copies all nested levels'], ['Nested objects shared', 'Nested objects duplicated'], ['{...o}, Object.assign', 'structuredClone(o)'], ['Faster', 'Slower, more memory']] },
    },
    examQs: [
      { m: 1, q: 'Which method converts a JavaScript object to a JSON string?', a: 'JSON.stringify()' },
      { m: 2, q: 'What is optional chaining?', a: 'The ?. operator accesses a property only if the value before it is not null/undefined; otherwise returns undefined instead of throwing an error.' },
      { m: 3, q: 'Differentiate between shallow and deep copy with an example.', a: 'Use the nested marks example showing shared nested object with spread and independence with structuredClone.' },
      { m: 5, q: 'What is JSON? Explain JSON.stringify and JSON.parse with an example of data exchange.', a: 'Define JSON, rules (double quotes, allowed types), show converting an object to send to a server and parsing a response string back to an object; mention localStorage uses strings.' },
    ],
    practice: ['Create a book object with a method that returns a summary.', 'Count how many times each word appears in a sentence using an object.', 'Save an object in localStorage with JSON and read it back.'],
    revision: ['{ key: value }; dot or ["key"].', 'Methods use this.', 'Destructuring { a, b } = obj.', 'Spread = shallow; structuredClone = deep.', 'JSON.stringify ↔ JSON.parse.', 'obj?.prop ?? fallback'],
    quiz: [
      { q: 'JSON.parse(\'{"x":5}\').x is…', o: ['"5"', '5', 'undefined', 'Error'], a: 1, e: 'Parsed into a number.' },
      { q: 'Which creates a deep copy?', o: ['{...obj}', 'Object.assign({}, obj)', 'structuredClone(obj)', 'obj'], a: 2, e: 'structuredClone.' },
      { q: 'user?.address?.city when user has no address returns…', o: ['Error', 'null', 'undefined', '""'], a: 2, e: 'Optional chaining returns undefined.' },
    ],
  },
  {
    id: 'js-strings-math', track: 'js', group: 'Arrays & Objects', level: 'Elementary', minutes: 10,
    title: 'Strings, Numbers & Math', syllabus: 'String Manipulation · Number Operations · Math Object',
    summary: 'Work with text and numbers using built-in methods.',
    definition: 'A **string** is text in quotes. Strings have a `length` and methods like `toUpperCase()`, `trim()`, `includes()`, `slice()`, `split()`, `replace()` and `padStart()`. **Numbers** have methods like `toFixed()`, and the **Math** object provides `Math.round`, `Math.floor`, `Math.ceil`, `Math.max`, `Math.min`, `Math.random`, `Math.pow` and `Math.sqrt`.',
    why: 'Formatting prices to two decimals, cleaning up user-typed emails, generating OTPs, rounding CGPA and searching text all use these.',
    analogy: { title: 'A toolbox', text: 'String methods are scissors and glue for text. Math is a scientific calculator built into JavaScript.' },
    syntax: `const s = "  Hello World  ";
s.trim();               // "Hello World"
s.toUpperCase();        // "  HELLO WORLD  "
"web-dev".split("-");   // ["web", "dev"]
"JavaScript".slice(0, 4); // "Java"
"abc".includes("b");    // true
(3.14159).toFixed(2);   // "3.14"
Math.round(4.5);        // 5
Math.floor(4.9);        // 4
Math.ceil(4.1);         // 5
Math.floor(Math.random() * 6) + 1; // dice 1–6`,
    lines: [
      ['trim()', 'Removes spaces from both ends — essential for form input.'],
      ['split("-")', 'Breaks a string into an array at each separator.'],
      ['slice(0, 4)', 'Characters from index 0 up to (not including) 4.'],
      ['toFixed(2)', 'Rounds to 2 decimals and returns a STRING.'],
      ['Math.random()', 'A decimal from 0 (inclusive) to 1 (exclusive).'],
    ],
    live: { js: `const email = "  Riya.V@College.EDU ";\nconst clean = email.trim().toLowerCase();\nconsole.log(clean);\nconsole.log(clean.split("@")[1]);\nconst otp = String(Math.floor(Math.random() * 10000)).padStart(4, "0");\nconsole.log("Your OTP:", otp);\nconst cgpa = 8.4567;\nconsole.log(cgpa.toFixed(2), Math.round(cgpa));` },
    tabs: ['js'],
    tryThis: ['Run several times to see new OTPs.', 'Count words in a sentence with split(" ").length.', 'Reverse a string: s.split("").reverse().join("").'],
    mistakes: [
      { wrong: 'Expecting strings to change in place: s.toUpperCase();', right: 's = s.toUpperCase();', why: 'Strings are immutable; methods return new strings.' },
      { wrong: '0.1 + 0.2 === 0.3', right: 'Math.abs(a - b) < Number.EPSILON', why: 'Floating point gives 0.30000000000000004.' },
    ],
    exam: {
      definition: 'Strings are immutable sequences of UTF-16 characters with built-in methods for searching, extracting and transforming text. The Number type represents double-precision floating-point values, and the Math object provides mathematical constants and functions.',
      points: ['String methods: length, charAt, indexOf, includes, startsWith, endsWith, slice, substring, toUpperCase, toLowerCase, trim, split, replace, replaceAll, repeat, padStart.', 'Number methods: toFixed, toString, Number.isInteger, Number.isNaN, parseInt, parseFloat.', 'Math: PI, round, floor, ceil, trunc, abs, pow, sqrt, max, min, random.', 'Random integer between min and max: Math.floor(Math.random() * (max - min + 1)) + min.'],
      diff: { title: 'round vs floor vs ceil (4.6 / -4.6)', head: ['Method', '4.6', '-4.6'], rows: [['Math.round', '5', '-5'], ['Math.floor', '4', '-5'], ['Math.ceil', '5', '-4'], ['Math.trunc', '4', '-4']] },
    },
    examQs: [
      { m: 1, q: 'What does Math.ceil(7.2) return?', a: '8' },
      { m: 2, q: 'Write code to reverse a string.', a: 'const r = str.split("").reverse().join("");' },
      { m: 3, q: 'Write a function to check whether a string is a palindrome.', a: 'const isPal = s => { const c = s.toLowerCase().replace(/[^a-z0-9]/g, ""); return c === c.split("").reverse().join(""); };' },
    ],
    practice: ['Capitalise the first letter of every word.', 'Generate a random number between 50 and 100.', 'Count vowels in a sentence.'],
    revision: ['Strings immutable — methods return new strings.', 'trim, split, slice, includes, replace.', 'toFixed → string.', 'Math.floor(Math.random() * n).'],
    quiz: [
      { q: '"Hello".slice(1, 3) = ?', o: ['"He"', '"el"', '"ell"', '"llo"'], a: 1, e: 'Index 1 up to 3 (excluded).' },
      { q: 'Math.floor(-2.3) = ?', o: ['-2', '-3', '2', '-2.3'], a: 1, e: 'floor goes down.' },
    ],
  },
  {
    id: 'js-oop', track: 'js', group: 'Arrays & Objects', level: 'Advanced', minutes: 18,
    title: 'Object-Oriented JavaScript', syllabus: 'Prototypes · Prototype Chain · Constructor Functions · Object.create() · ES6 Classes · Static · Getters/Setters · Private Fields · Inheritance · Encapsulation · Polymorphism · Composition',
    summary: 'Model real-world things with classes and prototypes.',
    definition: 'JavaScript is **prototype-based**: every object has a hidden link to another object, its **prototype**, from which it inherits properties. Looking up a property climbs the **prototype chain**. **ES6 classes** are a cleaner syntax over prototypes: a `class` has a `constructor`, methods, `static` members, `get`/`set` accessors and `#private` fields. `extends` and `super` create **inheritance**.',
    why: 'Games (Player, Enemy), apps (User, Admin), and UI components are naturally modelled as objects of classes. Understanding prototypes explains where methods like `.push()` come from.',
    analogy: { title: 'A cookie cutter', text: 'A class is a cookie cutter; objects (instances) are the cookies. Inheritance is a star cutter with an extra decoration — it does everything the basic cutter does, plus more.' },
    syntax: `class Student {
  #password;                       // private field
  static college = "Invertis";     // shared by the class
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;
    this.#password = "secret";
  }
  get grade() { return this.marks >= 75 ? "A" : "B"; }
  describe() { return this.name + " (" + this.grade + ")"; }
}
class Topper extends Student {
  constructor(name, marks, rank) {
    super(name, marks);            // call parent constructor
    this.rank = rank;
  }
  describe() { return "#" + this.rank + " " + super.describe(); } // polymorphism
}
const t = new Topper("Riya", 95, 1);`,
    lines: [
      ['class Student', 'A blueprint for student objects.'],
      ['#password', 'A private field: cannot be read from outside the class (encapsulation).'],
      ['static college', 'Belongs to the class itself: Student.college, not student.college.'],
      ['constructor', 'Runs when you write new Student(...), setting up this.'],
      ['get grade()', 'A getter: used like a property (s.grade) but computed.'],
      ['extends / super', 'Topper inherits from Student; super() runs the parent constructor.'],
      ['describe() override', 'Same method name, different behaviour per class = polymorphism.'],
    ],
    live: { js: `class Account {\n  #balance = 0;\n  constructor(owner) { this.owner = owner; }\n  deposit(amt) { if (amt > 0) this.#balance += amt; return this; }\n  get balance() { return this.#balance; }\n}\nclass SavingsAccount extends Account {\n  addInterest(rate) { return this.deposit(this.balance * rate); }\n}\nconst acc = new SavingsAccount("Neha");\nacc.deposit(1000).addInterest(0.05);\nconsole.log(acc.owner, acc.balance);\nconsole.log(acc instanceof Account);\nconsole.log(Object.getPrototypeOf(acc) === SavingsAccount.prototype);` },
    tabs: ['js'],
    tryThis: ['Try console.log(acc.#balance) — a SyntaxError: it is truly private.', 'Add a withdraw method that refuses overdrafts.', 'Create a constructor function version: function Account(owner) { this.owner = owner; } and add methods on Account.prototype.'],
    mistakes: [
      { wrong: 'Forgetting new: const s = Student("A")', right: 'new Student("A")', why: 'Class constructors must be called with new.' },
      { wrong: 'Using this before super() in a subclass constructor.', right: 'Call super() first.', why: 'this is not initialised until the parent constructor runs.' },
      { wrong: 'Deep inheritance chains for everything.', right: 'Prefer composition: objects that contain helper objects.', why: '"Composition over inheritance" keeps code flexible.' },
    ],
    exam: {
      definition: 'Object-oriented programming in JavaScript is based on prototypes: objects inherit directly from other objects through the prototype chain. ES6 classes provide syntactic sugar over constructor functions and prototypes, supporting constructors, instance and static members, accessors, private fields and inheritance via extends and super.',
      points: ['Constructor function: function Car(m) { this.model = m } + Car.prototype.drive = function(){}; new Car("X").', 'Object.create(proto) creates an object with a given prototype.', 'Prototype chain ends at Object.prototype then null.', 'Four pillars: encapsulation (private fields), abstraction, inheritance (extends), polymorphism (method overriding).', 'Composition over inheritance: build objects by combining behaviours.', 'ES Modules: export / import to split code into files (modular programming).'],
      diff: { title: 'Constructor function vs ES6 class', head: ['Constructor function', 'ES6 class'], rows: [['function Person(){}', 'class Person {}'], ['Methods added to .prototype', 'Methods inside class body'], ['Callable without new (bug)', 'Throws without new'], ['Hoisted', 'Not hoisted (TDZ)'], ['Manual inheritance setup', 'extends / super']] },
    },
    examQs: [
      { m: 1, q: 'Which keyword creates a subclass?', a: 'extends' },
      { m: 2, q: 'What is the prototype chain?', a: 'The series of links from an object to its prototype, the prototype\'s prototype, and so on until null; JS searches it when a property is not found on the object itself.' },
      { m: 3, q: 'Explain getters, setters and static members with an example.', a: 'class Temp { static unit = "C"; #c = 0; get f() { return this.#c * 9/5 + 32 } set c(v) { this.#c = v } } — getter computed property, setter validates assignment, static belongs to class.' },
      { m: 5, q: 'Explain inheritance in JavaScript using classes with an example.', a: 'Animal base class with speak(); Dog extends Animal, calls super in constructor and overrides speak(); show output; explain prototype chain underneath.' },
      { m: 10, q: 'Explain OOP concepts in JavaScript: prototypes, classes, encapsulation, inheritance and polymorphism with suitable programs.', a: 'Cover each with code: prototype methods, class syntax, #private fields, extends/super, overridden methods, and composition over inheritance.' },
    ],
    practice: ['Create a Shape class with area(), and Circle/Rectangle subclasses.', 'Model a Library with Book objects (composition).'],
    revision: ['Objects inherit via prototypes.', 'class, constructor, new.', 'static, get/set, #private.', 'extends + super.', 'Polymorphism = override. Prefer composition.'],
    quiz: [
      { q: 'Private fields start with…', o: ['_', '$', '#', '@'], a: 2, e: '#field.' },
      { q: 'super() in a constructor…', o: ['Creates a static method', 'Calls the parent constructor', 'Deletes this', 'Makes it private'], a: 1, e: 'Calls the parent class constructor.' },
      { q: 'Classes in JS are built on…', o: ['Interfaces', 'Prototypes', 'Modules', 'JSON'], a: 1, e: 'Syntactic sugar over prototypes.' },
    ],
  },
  {
    id: 'js-dom', track: 'js', group: 'DOM', level: 'Intermediate', minutes: 18,
    title: 'The DOM: Selecting & Changing the Page', syllabus: 'Document Object Model (DOM) Manipulation · Browser Object Model',
    summary: 'Use JavaScript to read and change HTML and CSS live.',
    definition: 'The **DOM (Document Object Model)** is the browser\'s live, tree-shaped representation of your HTML. Every tag becomes a **node** object that JavaScript can **select** (`querySelector`, `getElementById`), **read and change** (`textContent`, `innerHTML`, `style`, `classList`, attributes), **create** (`createElement`, `append`) and **remove** (`remove()`). The **BOM (Browser Object Model)** is everything else the browser offers: `window`, `location`, `history`, `navigator`, `screen`.',
    why: 'Adding an item to a to-do list, showing an error under a form field, switching to dark mode, updating a cart count — all are DOM manipulation.',
    analogy: { title: 'A family tree', text: 'The DOM is a family tree: `<html>` is the grandparent, `<head>` and `<body>` are its children, and so on. JavaScript is a gardener who can find any family member, change their clothes (style), give them a new name (text), or add a new baby (createElement).' },
    syntax: `const title = document.querySelector("#title");    // first match (CSS selector)
const items = document.querySelectorAll(".item");  // all matches (NodeList)
title.textContent = "New heading";                 // safe text
title.style.color = "tomato";                      // inline style
title.classList.add("highlight");                  // add / remove / toggle classes
title.setAttribute("data-state", "done");
const li = document.createElement("li");           // create
li.textContent = "Buy milk";
document.querySelector("ul").append(li);           // insert
li.remove();                                       // delete`,
    lines: [
      ['querySelector("#title")', 'Uses CSS selector syntax and returns the first matching element, or null.'],
      ['querySelectorAll(".item")', 'Returns all matches; use forEach to loop.'],
      ['textContent', 'Sets plain text. Safer than innerHTML, which parses HTML (risk of XSS with user input).'],
      ['style.color', 'CSS property names become camelCase: background-color → backgroundColor.'],
      ['classList.toggle', 'Best way to change looks: toggle a class defined in CSS.'],
      ['createElement + append', 'Make a new element and attach it to the tree.'],
    ],
    live: { html: `<h2 id="title">My Tasks</h2>\n<ul id="list"><li>Learn HTML</li></ul>\n<input id="task" placeholder="New task">\n<button id="add">Add</button>\n<button id="theme">Toggle theme</button>`, css: `.dark { background: #30343B; color: #FFF9EF; }\n.done { text-decoration: line-through; opacity: .6; }\nli { cursor: pointer; }`, js: `const list = document.querySelector("#list");\nconst input = document.querySelector("#task");\n\ndocument.querySelector("#add").addEventListener("click", () => {\n  if (!input.value.trim()) return;\n  const li = document.createElement("li");\n  li.textContent = input.value;\n  list.append(li);\n  input.value = "";\n  console.log("Tasks:", list.children.length);\n});\n\nlist.addEventListener("click", (e) => {\n  if (e.target.tagName === "LI") e.target.classList.toggle("done");\n});\n\ndocument.querySelector("#theme").addEventListener("click", () => {\n  document.body.classList.toggle("dark");\n});` },
    tabs: ['js', 'html', 'css'],
    experiment: { lab: 'dom', text: 'Write JavaScript in the DOM Playground and watch the DOM tree change in real time.' },
    tryThis: ['Add a task and click it to mark it done.', 'Change the title text using document.querySelector("#title").textContent = "…".', 'Add a delete button to each new task.'],
    mistakes: [
      { wrong: 'document.querySelector("title-id")', right: 'querySelector("#title-id")', why: 'It takes CSS selectors: # for ids, . for classes.' },
      { wrong: 'items.style.color = "red" on querySelectorAll result', right: 'items.forEach(el => el.style.color = "red")', why: 'A NodeList has no style; loop over the elements.' },
      { wrong: 'el.innerHTML = userInput', right: 'el.textContent = userInput', why: 'innerHTML with user text can run malicious HTML/scripts (XSS).' },
    ],
    exam: {
      definition: 'The Document Object Model (DOM) is a programming interface that represents an HTML document as a tree of node objects, allowing scripts to dynamically access and update the content, structure and style of the document. The Browser Object Model (BOM) consists of objects provided by the browser, such as window, location, history, navigator and screen.',
      points: ['Node types: document, element, text, attribute, comment.', 'Selecting: getElementById, getElementsByClassName, getElementsByTagName, querySelector, querySelectorAll.', 'Changing: textContent, innerText, innerHTML, value, style, classList, setAttribute/getAttribute, dataset.', 'Creating/removing: createElement, createTextNode, append, prepend, appendChild, insertBefore, remove, replaceWith.', 'Traversing: parentElement, children, firstElementChild, nextElementSibling.', 'BOM: window.innerWidth, location.href, history.back(), navigator.userAgent, alert/confirm/prompt, setTimeout.'],
      diff: { title: 'innerHTML vs textContent vs innerText', head: ['innerHTML', 'textContent', 'innerText'], rows: [['Parses HTML tags', 'Plain text, all nodes', 'Visible text only'], ['XSS risk with user input', 'Safe', 'Safe'], ['Slower (parsing)', 'Fast', 'Triggers layout']] },
      diagram: 'dom-tree',
    },
    examQs: [
      { m: 1, q: 'What does DOM stand for?', a: 'Document Object Model.' },
      { m: 2, q: 'Differentiate querySelector and querySelectorAll.', a: 'querySelector returns the first element matching a CSS selector (or null); querySelectorAll returns a static NodeList of all matching elements.' },
      { m: 3, q: 'Write JavaScript to change the text and background colour of an element with id "msg".', a: 'const m = document.getElementById("msg"); m.textContent = "Updated"; m.style.backgroundColor = "yellow";' },
      { m: 5, q: 'Explain the DOM tree with a diagram and list methods to select and modify elements.', a: 'Draw document → html → head/body → children with text nodes; list selection methods, modification properties, creation/removal methods with examples.' },
      { m: 10, q: 'Write a program to create a dynamic to-do list using DOM manipulation. Explain each DOM method used.', a: 'HTML input/button/ul; JS: createElement li, set textContent, append, click to toggle class done, delete button with remove(); explain each method and event delegation.' },
    ],
    practice: ['Build a counter with + and − buttons.', 'Change all paragraph colours with querySelectorAll.', 'Create a dark-mode toggle using classList.'],
    revision: ['DOM = tree of nodes.', 'querySelector / querySelectorAll.', 'textContent (safe) vs innerHTML.', 'style.camelCase, classList.add/remove/toggle.', 'createElement → append; el.remove().', 'BOM: window, location, history, navigator.'],
    quiz: [
      { q: 'Which returns all matching elements?', o: ['getElementById', 'querySelector', 'querySelectorAll', 'getElement'], a: 2, e: 'querySelectorAll.' },
      { q: 'CSS background-color in JS style is…', o: ['style.background-color', 'style.backgroundColor', 'style["bg"]', 'style.BackgroundColor'], a: 1, e: 'camelCase.' },
      { q: 'Safest way to insert user text?', o: ['innerHTML', 'textContent', 'outerHTML', 'document.write'], a: 1, e: 'No HTML parsing.' },
    ],
  },
  {
    id: 'js-events', track: 'js', group: 'Events', level: 'Intermediate', minutes: 18,
    title: 'Events, Bubbling, Delegation, Forms & Storage', syllabus: 'Browser Events · Event Bubbling · Event Delegation · Form Validation · Local Storage and Session Storage',
    summary: 'React to clicks, typing and submits — and remember data.',
    definition: 'An **event** is something that happens: a click, a key press, typing in an input, a form submit, the page loading. `addEventListener(type, handler)` runs a function when it happens; the handler receives an **event object** with details (`e.target`, `e.key`). Events **bubble**: they fire on the target, then on its parent, grandparent and so on. **Event delegation** uses bubbling to handle events for many children with one listener on the parent. **localStorage** keeps data permanently in the browser; **sessionStorage** keeps it until the tab closes.',
    why: 'Every interaction on a website starts with an event. Form validation stops bad data; storage keeps a user\'s theme, cart or draft between visits — this very website saves your XP with localStorage!',
    analogy: { title: 'A doorbell and a school announcement', text: 'addEventListener is installing a doorbell: when pressed, it rings (handler). Bubbling is an announcement in one classroom that is heard in the corridor, then the whole building. Delegation is one teacher in the corridor who listens for all classrooms instead of one teacher per class.' },
    syntax: `btn.addEventListener("click", (e) => {
  console.log("Clicked", e.target);
});
input.addEventListener("input", (e) => console.log(e.target.value));
document.addEventListener("keydown", (e) => console.log(e.key));

form.addEventListener("submit", (e) => {
  e.preventDefault();          // stop page reload
  if (!email.value.includes("@")) showError("Invalid email");
});

list.addEventListener("click", (e) => {     // delegation
  if (e.target.matches("li")) e.target.remove();
});
e.stopPropagation();                         // stop bubbling

localStorage.setItem("theme", "dark");
localStorage.getItem("theme");               // "dark"
localStorage.setItem("cart", JSON.stringify([1, 2]));`,
    lines: [
      ['addEventListener("click", fn)', 'Run fn every time the element is clicked.'],
      ['e.target', 'The exact element where the event started.'],
      ['"input" event', 'Fires on every keystroke in a field; "change" fires when the value is committed.'],
      ['e.preventDefault()', 'Stops the default action, like a form reloading the page or a link navigating.'],
      ['e.target.matches("li")', 'Delegation: check which child was clicked.'],
      ['stopPropagation()', 'Stops the event from bubbling further up.'],
      ['localStorage', 'Stores strings only — use JSON for objects and arrays.'],
    ],
    live: { html: `<div id="outer" class="box">outer div\n  <div id="inner" class="box">inner div\n    <button id="btn">Click me</button>\n  </div>\n</div>\n<form id="f">\n  <input id="email" placeholder="email">\n  <button>Join</button>\n  <small id="err"></small>\n</form>\n<p>Visits stored in localStorage: <b id="visits"></b></p>`, css: `.box { border: 2px dashed #55B9E8; padding: 10px; margin: 6px; }\n#err { color: #A8325B; display: block; }`, js: `["btn", "inner", "outer"].forEach((id) => {\n  document.getElementById(id).addEventListener("click", (e) => {\n    console.log("click heard on", id, "(target:", e.target.id + ")");\n  });\n});\n\ndocument.getElementById("f").addEventListener("submit", (e) => {\n  e.preventDefault();\n  const v = document.getElementById("email").value;\n  document.getElementById("err").textContent = v.includes("@") ? "✓ Joined!" : "Please enter a valid email";\n});\n\ntry {\n  const n = Number(localStorage.getItem("demo-visits") || 0) + 1;\n  localStorage.setItem("demo-visits", n);\n  document.getElementById("visits").textContent = n;\n} catch (err) {\n  document.getElementById("visits").textContent = "storage blocked in this sandbox";\n}` },
    tabs: ['js', 'html', 'css'],
    experiment: { lab: 'events', text: 'Click, hover and type in the Event Playground and watch which events fire and how they bubble.' },
    tryThis: ['Click the button: three logs appear (bubbling). Add e.stopPropagation() in the handler and click again.', 'Submit with and without an @.', 'Note: the preview runs in a sandbox, so storage may be blocked here — in your own file it works.'],
    mistakes: [
      { wrong: 'btn.addEventListener("click", handle())', right: 'btn.addEventListener("click", handle)', why: 'Pass the function, do not call it.' },
      { wrong: 'onclick="..." attributes in HTML', right: 'addEventListener in JS', why: 'Keeps HTML and JS separate and allows multiple handlers.' },
      { wrong: 'localStorage.setItem("cart", cartArray)', right: 'JSON.stringify(cartArray)', why: 'Storage converts values to strings: you would get "1,2".' },
      { wrong: 'Storing passwords in localStorage.', right: 'Never store secrets there.', why: 'Any script on the page can read it.' },
    ],
    exam: {
      definition: 'An event is a signal that something has happened in the browser, such as user interaction or page loading. Event handling is attaching functions (listeners) that execute in response. Event bubbling is the propagation of an event from the target element up through its ancestors; event capturing is the opposite phase. Event delegation attaches a single listener to a common ancestor to handle events from many descendants. The Web Storage API provides localStorage (persistent) and sessionStorage (per-tab session) key-value storage.',
      points: ['Event types: mouse (click, dblclick, mouseover, mouseout), keyboard (keydown, keyup), form (submit, input, change, focus, blur), window (load, DOMContentLoaded, resize, scroll).', 'Phases: capturing → target → bubbling; addEventListener(type, fn, true) listens in capture phase.', 'Event object: target, currentTarget, type, key, preventDefault(), stopPropagation().', 'Delegation benefits: fewer listeners, works for dynamically added elements.', 'Form validation: HTML attributes + JS checks on submit/input, show messages, setCustomValidity.', 'Storage methods: setItem, getItem, removeItem, clear, key, length; ~5 MB limit; strings only.'],
      diff: { title: 'localStorage vs sessionStorage vs cookies', head: ['localStorage', 'sessionStorage', 'Cookies'], rows: [['Until cleared', 'Until tab closes', 'Until expiry date'], ['~5–10 MB', '~5 MB', '~4 KB'], ['Not sent to server', 'Not sent to server', 'Sent with every request'], ['Theme, cart, drafts', 'One-time form steps', 'Sessions, auth']] },
      diagram: 'bubbling',
    },
    examQs: [
      { m: 1, q: 'Which method stops a form from reloading the page?', a: 'event.preventDefault()' },
      { m: 2, q: 'What is event bubbling?', a: 'After an event fires on the target, it propagates upward to its parent, grandparent and so on up to document, triggering their listeners for that event.' },
      { m: 3, q: 'What is event delegation? Give an advantage.', a: 'Attaching one listener to a parent and using e.target to handle events from its children. Advantages: fewer listeners/better memory, and it works for elements added later.' },
      { m: 5, q: 'Differentiate localStorage and sessionStorage. Write code to store and retrieve an object.', a: 'Table differences; code: localStorage.setItem("user", JSON.stringify(u)); const u2 = JSON.parse(localStorage.getItem("user"));' },
      { m: 10, q: 'Write a JavaScript program to validate a registration form (name, email, password match) and display error messages. Explain the events used.', a: 'Listen to submit with preventDefault, check each field (length, regex for email, password === confirm), show messages in small elements, use input events for live validation; explain events and DOM methods.' },
    ],
    practice: ['Show a live character counter for a textarea.', 'Delete list items with one delegated listener.', 'Remember the user\'s theme with localStorage.'],
    revision: ['addEventListener(type, fn).', 'e.target, e.preventDefault(), e.stopPropagation().', 'Bubbling: child → parent → document.', 'Delegation: one listener on parent.', 'localStorage permanent, sessionStorage per tab; JSON for objects.'],
    quiz: [
      { q: 'Which event fires on every keystroke in an input?', o: ['change', 'input', 'submit', 'load'], a: 1, e: 'input.' },
      { q: 'By default events propagate…', o: ['Downwards', 'Upwards (bubble)', 'Sideways', 'Not at all'], a: 1, e: 'They bubble up.' },
      { q: 'localStorage stores values as…', o: ['Objects', 'Strings', 'Numbers', 'Any type'], a: 1, e: 'Strings only.' },
      { q: 'sessionStorage is cleared when…', o: ['The computer restarts', 'The tab closes', 'Never', 'After 1 hour'], a: 1, e: 'Per-tab session.' },
    ],
  },
  {
    id: 'js-async', track: 'js', group: 'Async JavaScript', level: 'Advanced', minutes: 20,
    title: 'Async JavaScript: Timers, Event Loop, Promises & Fetch', syllabus: 'Asynchronous Programming · Timers · Event Loop · Promises · async/await · Fetch API · REST APIs · Error Handling',
    summary: 'Do slow tasks without freezing the page.',
    definition: 'JavaScript runs one thing at a time (**single-threaded**). Slow tasks — timers, network requests — are handed to the browser and finish later (**asynchronous**). The **event loop** moves their callbacks back onto the **call stack** when it is empty; promise callbacks (**microtasks**) run before timer callbacks (**tasks**). A **Promise** represents a future result that is *pending*, then *fulfilled* or *rejected*. **async/await** lets you write promise code that reads top-to-bottom. **fetch()** requests data from a server (REST API) and returns a promise.',
    why: 'Loading weather data, sending a chat message, showing a spinner while results load — without async code, the whole page would freeze while waiting.',
    analogy: { title: 'Ordering at a food court', text: 'You order a pizza and get a buzzer (a Promise). You do not stand at the counter blocking the line — you sit and chat (other code runs). When the buzzer rings (fulfilled), you collect the pizza (then/await). If they run out of dough, the buzzer flashes red (rejected → catch).' },
    syntax: `setTimeout(() => console.log("later"), 1000);   // run once after 1s
const id = setInterval(tick, 1000); clearInterval(id);

const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done!"), 500);
});
p.then((v) => console.log(v)).catch((e) => console.error(e));

async function loadUser() {
  try {
    const res = await fetch("https://api.example.com/users/1");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const user = await res.json();
    console.log(user.name);
  } catch (err) {
    console.error("Failed:", err.message);
  } finally {
    console.log("Hide spinner");
  }
}`,
    lines: [
      ['setTimeout(fn, 1000)', 'Schedules fn after at least 1000ms. The code below keeps running immediately.'],
      ['new Promise((resolve, reject) => …)', 'Wraps a future result; call resolve(value) on success or reject(error) on failure.'],
      ['.then / .catch', 'Handle success / failure when the promise settles.'],
      ['async function', 'Always returns a promise and allows await inside.'],
      ['await fetch(url)', 'Pauses this function (not the page) until the response arrives.'],
      ['res.json()', 'Reads and parses the JSON body — also async.'],
      ['try / catch / finally', 'catch handles errors (network down, bad JSON); finally always runs.'],
    ],
    live: { js: `console.log("1: start");\nsetTimeout(() => console.log("4: timeout (task)"), 0);\nPromise.resolve().then(() => console.log("3: promise (microtask)"));\nconsole.log("2: end of script");\n\nconst fakeFetch = (ok) => new Promise((resolve, reject) => {\n  setTimeout(() => ok ? resolve({ name: "Riya", city: "Bareilly" }) : reject(new Error("Server down")), 400);\n});\n\nasync function show() {\n  try {\n    const user = await fakeFetch(true);\n    console.log("5: got user", user);\n    await fakeFetch(false);\n  } catch (err) {\n    console.log("6: caught →", err.message);\n  } finally {\n    console.log("7: finally runs");\n  }\n}\nshow();` },
    tabs: ['js'],
    steps: [
      { line: 1, note: 'Synchronous: prints immediately.', out: '1: start', vars: { stack: 'main' } },
      { line: 2, note: 'setTimeout hands the callback to the browser timer. Even with 0ms it must wait in the TASK queue.', vars: { stack: 'main', tasks: '[timeout]' } },
      { line: 3, note: 'A resolved promise\'s .then goes to the MICROTASK queue.', vars: { stack: 'main', micro: '[then]', tasks: '[timeout]' } },
      { line: 4, note: 'Still synchronous.', out: '2: end of script', vars: { stack: 'main', micro: '[then]', tasks: '[timeout]' } },
      { line: 21, note: 'show() starts; reaches await, which pauses show and returns control.', vars: { stack: 'main', micro: '[then]', tasks: '[timeout]', pending: 'fakeFetch(true)' } },
      { line: 3, note: 'Script done → stack empty → event loop runs ALL microtasks first.', out: '3: promise (microtask)', vars: { tasks: '[timeout]', pending: 'fakeFetch(true)' } },
      { line: 2, note: 'Then one task: the timeout.', out: '4: timeout (task)', vars: { pending: 'fakeFetch(true)' } },
      { line: 13, note: '~400ms later the fake request resolves; show() resumes after await.', out: '5: got user { name: Riya, city: Bareilly }', vars: { user: '{ name, city }' } },
      { line: 16, note: 'The second request rejects → jump to catch.', out: '6: caught → Server down' },
      { line: 18, note: 'finally always runs.', out: '7: finally runs' },
    ],
    experiment: { lab: 'event-loop', text: 'Watch the call stack, Web APIs, microtask queue and task queue animate in the Async Visualizer.' },
    tryThis: ['Predict the order before running. Why does 3 come before 4 even though the timeout is 0ms?', 'Change fakeFetch(false) to true and see catch skipped.', 'Use Promise.all([fakeFetch(true), fakeFetch(true)]) to wait for both.'],
    mistakes: [
      { wrong: 'const data = fetch(url); console.log(data.name);', right: 'const res = await fetch(url); const data = await res.json();', why: 'fetch returns a Promise, not the data.' },
      { wrong: 'Using await outside an async function.', right: 'Wrap it in an async function (or use a module with top-level await).', why: 'await is only valid in async functions and modules.' },
      { wrong: 'Assuming fetch rejects on 404.', right: 'Check res.ok.', why: 'fetch only rejects on network failure; HTTP errors still resolve.' },
      { wrong: 'No error handling.', right: 'Always use catch / try-catch and show a friendly message.', why: 'Networks fail; users need feedback.' },
    ],
    exam: {
      definition: 'Asynchronous programming allows long-running operations to proceed without blocking the main thread. The event loop continuously checks whether the call stack is empty and moves queued callbacks — microtasks (promise reactions) first, then macrotasks (timers, I/O, events) — onto the stack. A Promise is an object representing the eventual completion or failure of an asynchronous operation, with states pending, fulfilled and rejected. async/await is syntax that lets asynchronous promise-based code be written in a synchronous style. The Fetch API provides a promise-based interface for making HTTP requests.',
      points: ['Timers: setTimeout, setInterval, clearTimeout, clearInterval.', 'Callback hell → Promises → async/await.', 'Promise methods: then, catch, finally; static: Promise.all, allSettled, race, any, resolve, reject.', 'Error handling: try…catch…finally, throw new Error(), custom errors, .catch().', 'REST APIs: resources at URLs, methods GET (read), POST (create), PUT/PATCH (update), DELETE (delete) — CRUD; data usually JSON.', 'fetch(url, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data) }).', 'WebSockets keep a two-way connection open for real-time apps (chat, live scores).'],
      diff: { title: 'Synchronous vs Asynchronous', head: ['Synchronous', 'Asynchronous'], rows: [['Runs line by line, waits', 'Starts task, continues, handles result later'], ['Blocks the thread', 'Non-blocking'], ['Simple calculations', 'Timers, network, file I/O'], ['Return values directly', 'Callbacks, promises, async/await']] },
      diagram: 'event-loop',
    },
    examQs: [
      { m: 1, q: 'What are the three states of a Promise?', a: 'Pending, fulfilled (resolved) and rejected.' },
      { m: 2, q: 'Predict the output: console.log(1); setTimeout(()=>console.log(2),0); Promise.resolve().then(()=>console.log(3)); console.log(4);', a: '1 4 3 2 — synchronous first, then microtasks (promise), then tasks (timeout).' },
      { m: 3, q: 'Differentiate setTimeout and setInterval.', a: 'setTimeout runs a callback once after a delay; setInterval runs it repeatedly at the interval until clearInterval is called.' },
      { m: 5, q: 'Explain Promises with an example. How does async/await improve them?', a: 'Create a promise with resolve/reject, consume with then/catch/finally, show chaining; rewrite with async/await and try/catch for readability.' },
      { m: 10, q: 'Explain the JavaScript event loop with a diagram. Write a program using fetch with async/await to display data from a REST API with error handling.', a: 'Diagram: call stack, Web APIs, microtask queue, task queue, event loop arrow. Program: async function, await fetch, check res.ok, await res.json(), render to DOM, catch errors, finally hide loader. Explain CRUD methods.' },
    ],
    practice: ['Build a digital clock with setInterval.', 'Write a delay(ms) function that returns a promise.', 'Fetch from a public API (e.g. https://jsonplaceholder.typicode.com/users) in your own HTML file and list the names.'],
    revision: ['JS single-threaded + event loop.', 'Sync → microtasks → tasks.', 'Promise: pending → fulfilled/rejected.', 'async/await + try/catch/finally.', 'fetch → res.ok → res.json().', 'REST: GET POST PUT DELETE.'],
    quiz: [
      { q: 'Which runs first after the script finishes?', o: ['setTimeout callback', 'Promise.then callback', 'setInterval callback', 'Random'], a: 1, e: 'Microtasks before tasks.' },
      { q: 'await can be used inside…', o: ['Any function', 'async functions', 'Loops only', 'Classes only'], a: 1, e: 'async functions (and modules).' },
      { q: 'fetch rejects when…', o: ['Status is 404', 'Status is 500', 'The network fails', 'Always'], a: 2, e: 'Only network errors reject; check res.ok.' },
      { q: 'Which HTTP method creates data?', o: ['GET', 'POST', 'DELETE', 'HEAD'], a: 1, e: 'POST.' },
    ],
  },
  {
    id: 'js-modern', track: 'js', group: 'Async JavaScript', level: 'Advanced', minutes: 14,
    title: 'Modern ES6+ Features, Modules & Errors', syllabus: 'Modern ECMAScript Features · ES Modules · Error Handling · Code Organization · Debugging · Best Practices',
    summary: 'The modern JavaScript toolkit you will see in every codebase.',
    definition: '**ES6+** (2015 onwards) added let/const, arrow functions, template literals, destructuring, default/rest/spread, classes, promises, **modules** (`import`/`export`), `Map`/`Set`, optional chaining `?.`, nullish coalescing `??` and more. **ES Modules** split code across files. **Error handling** with `try…catch…finally` and `throw` keeps programs from crashing and gives useful messages.',
    why: 'React, Node.js and every modern tutorial assume ES6+. Clean module structure and good error handling are what separate hobby code from industry code.',
    analogy: { title: 'Upgrading from a basic phone to a smartphone', text: 'Old JavaScript could do the job, but ES6+ is the upgrade with better tools: shortcuts (arrow functions), organised folders (modules) and a safety net (try/catch).' },
    syntax: `// math.js
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

// app.js  (<script type="module" src="app.js">)
import multiply, { add } from "./math.js";

const ids = new Set([1, 2, 2, 3]);      // {1, 2, 3} unique values
const ages = new Map([["riya", 19]]);   // key → value, any key type

function withdraw(balance, amount) {
  if (amount > balance) throw new RangeError("Insufficient balance");
  return balance - amount;
}
try { withdraw(100, 500); }
catch (err) { console.log(err.name, err.message); }
finally { console.log("transaction logged"); }`,
    lines: [
      ['export / export default', 'Make functions/values available to other files. One default per module.'],
      ['import multiply, { add }', 'Default import without braces, named imports with braces.'],
      ['type="module"', 'Required in the script tag for import/export in the browser.'],
      ['Set', 'A collection of unique values.'],
      ['Map', 'Key-value pairs where keys can be any type; keeps insertion order.'],
      ['throw new RangeError', 'Create your own error; execution jumps to the nearest catch.'],
    ],
    live: { js: `const students = ["Riya", "Aman", "Riya", "Zoya"];\nconst unique = [...new Set(students)];\nconsole.log(unique);\nconst scores = new Map();\nscores.set("Riya", 91).set("Aman", 78);\nfor (const [name, s] of scores) console.log(name, s);\nfunction parseMarks(text) {\n  const n = Number(text);\n  if (Number.isNaN(n)) throw new TypeError(\`"\${text}" is not a number\`);\n  return n;\n}\ntry {\n  console.log(parseMarks("88"));\n  console.log(parseMarks("eighty"));\n} catch (e) {\n  console.log(e.name + ":", e.message);\n} finally {\n  console.log("Validation finished");\n}` },
    tabs: ['js'],
    tryThis: ['Add a check that throws a RangeError when marks > 100.', 'Use console.table on an array of objects in your browser DevTools.', 'Set a breakpoint in DevTools Sources tab and step through code.'],
    mistakes: [
      { wrong: 'Using import in a normal <script>.', right: '<script type="module">', why: 'Modules must be declared.' },
      { wrong: 'Empty catch blocks.', right: 'Log or handle the error.', why: 'Swallowed errors make bugs invisible.' },
      { wrong: 'Debugging with dozens of alerts.', right: 'Use console.log, DevTools breakpoints and the debugger statement.', why: 'DevTools shows variables at each step.' },
    ],
    exam: {
      definition: 'ECMAScript 2015 (ES6) and later editions introduced modern JavaScript features including block-scoped declarations, arrow functions, classes, modules, promises, destructuring, spread/rest, Map/Set, optional chaining and nullish coalescing. ES Modules provide a standard module system using import and export. Error handling uses try…catch…finally to handle runtime exceptions, and throw to raise errors.',
      points: ['Built-in errors: Error, SyntaxError, ReferenceError, TypeError, RangeError.', 'Error object: name, message, stack.', 'Modules are strict mode by default, have their own scope and are deferred.', 'Best practices: const/let, ===, meaningful names, small functions, avoid globals, comment why not what, consistent formatting (Prettier), linting (ESLint), handle errors, avoid innerHTML with user data.', 'Debugging: console.log/table/error, DevTools breakpoints, debugger keyword, network tab.', 'Performance: minimise DOM updates, debounce input handlers, avoid memory leaks, lazy-load.'],
      diff: { title: 'Named vs default export', head: ['Named export', 'Default export'], rows: [['Many per module', 'One per module'], ['import { add }', 'import anyName'], ['Name must match', 'Any name on import']] },
    },
    examQs: [
      { m: 1, q: 'Name the block that always executes in a try statement.', a: 'finally' },
      { m: 2, q: 'Differentiate Map and plain objects.', a: 'Map keys can be any type and keep insertion order, has size and is iterable; object keys are strings/symbols and objects have prototype keys.' },
      { m: 3, q: 'List any six ES6 features.', a: 'let/const, arrow functions, template literals, destructuring, default parameters, spread/rest, classes, promises, modules, Map/Set.' },
      { m: 5, q: 'Explain error handling in JavaScript with try, catch, finally and throw.', a: 'Syntax, flow of control, built-in error types, custom errors with throw new Error(), example with input validation, finally for cleanup.' },
    ],
    practice: ['Split a project into two modules and import between them.', 'Remove duplicates from an array using Set.', 'Write a function that throws for invalid email and handle it.'],
    revision: ['ES6+: let/const, =>, ``, destructuring, ..., classes, modules, ?. ??', 'export / import, type="module".', 'Set unique, Map key→value.', 'try / catch / finally / throw.'],
    quiz: [
      { q: 'new Set([1,1,2]).size = ?', o: ['1', '2', '3', '0'], a: 1, e: 'Unique values: 1 and 2.' },
      { q: 'Which script tag enables import?', o: ['type="text"', 'type="module"', 'async', 'defer'], a: 1, e: 'type="module".' },
      { q: 'An undeclared variable read throws…', o: ['TypeError', 'ReferenceError', 'RangeError', 'SyntaxError'], a: 1, e: 'ReferenceError.' },
    ],
  },
];
