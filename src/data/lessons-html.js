// HTML + Git lessons. Text supports `code` and **bold** (rendered by rich()).
// Every lesson follows the same 12-part teaching structure.

export const htmlLessons = [
  {
    id: 'html-web-intro', track: 'html', group: 'Basics', level: 'Beginner', minutes: 12,
    title: 'How the Web Works', syllabus: 'Introduction to Web Technologies · Client-Server Architecture',
    summary: 'What happens between typing a web address and seeing a page.',
    definition: 'The **World Wide Web** is a huge collection of pages stored on computers called **servers**. Your **browser** (Chrome, Firefox, Edge) is a **client**: it asks a server for a page, receives files (HTML, CSS, JavaScript, images) and draws them on your screen.',
    why: 'Before writing a single tag it helps to know where your code goes. The HTML you write is a file that a server sends and a browser reads. Knowing this explains why a page must be "uploaded" to be public, why a slow server makes a slow site, and what front-end vs back-end means.',
    analogy: { title: 'A restaurant', text: 'You (the client) sit at a table and give your order to the waiter. The kitchen (the server) prepares the dish and the waiter brings it back. The menu language both sides agree on is **HTTP**. The dish is the web page — HTML is the plate and food, CSS is the presentation, JavaScript is the waiter who reacts when you ask for more salt.' },
    syntax: `Client (browser)                     Server
  |  ---- HTTP request: GET /index.html --->  |
  |                                           |  finds the file
  |  <--- HTTP response: 200 OK + HTML -----  |
  |  reads HTML, then requests CSS, JS, images
  |  draws the page on screen`,
    syntaxLang: 'text',
    lines: [
      ['GET /index.html', 'The browser asks for a file. GET means "please give me". The path says which file.'],
      ['200 OK', 'A status code. 200 = success, 404 = not found, 500 = the server crashed.'],
      ['+ HTML', 'The body of the response: the actual text of the page.'],
      ['requests CSS, JS, images', 'The HTML mentions other files, so the browser sends more requests for each of them.'],
    ],
    widget: 'request-journey',
    live: { html: `<h1>Hello, Web!</h1>\n<p>This page was "sent" by a server and drawn by your browser.</p>\n<p>Static pages look the same for everyone. Dynamic pages change per user — like your Instagram feed.</p>` , css: 'h1 { color: #FF8A3D; }' },
    tryThis: ['Change the heading text and watch the output update — that is exactly what a browser does when it receives new HTML.', 'Add another <p> paragraph explaining a website you use every day.'],
    mistakes: [
      { wrong: 'Thinking the browser stores websites.', right: 'Websites live on servers; the browser only downloads and displays a copy.', why: 'That is why you need internet to open a new site, and why an "offline" site shows an error.' },
      { wrong: 'Mixing up the Internet and the Web.', right: 'The Internet is the network of cables and computers; the Web is one service that runs on it (email and WhatsApp are others).', why: 'Exam questions often test this difference.' },
    ],
    exam: {
      definition: 'Client-server architecture is a network model in which a client (such as a web browser) sends a request for a resource and a server processes the request and returns a response, typically over the HTTP/HTTPS protocol.',
      points: ['Client initiates the request; server waits and responds.', 'HTTP is stateless: each request is independent.', 'HTTPS = HTTP + encryption using TLS.', 'Front-end runs in the browser (HTML, CSS, JS); back-end runs on the server (Node.js, PHP, Python, databases).', 'Common status codes: 200 OK, 301 Moved, 404 Not Found, 500 Internal Server Error.'],
      diff: { title: 'Static vs Dynamic websites', head: ['Static website', 'Dynamic website'], rows: [['Same content for every visitor', 'Content changes per user or time'], ['Pre-written HTML files', 'Pages built by server code or JS at request time'], ['Fast, cheap to host', 'Needs server logic and often a database'], ['Example: college notice page', 'Example: Amazon cart, Instagram feed']] },
      applications: ['Every website and web app', 'Online banking (client = app, server = bank)', 'Email clients talking to mail servers'],
      adv: ['Central control of data on the server', 'Many clients can share one server', 'Easy to update: change the server once'],
      disadv: ['Server is a single point of failure', 'Heavy traffic can overload the server', 'Needs network connectivity'],
      diagram: 'request-journey',
    },
    examQs: [
      { m: 1, q: 'What is the full form of HTTP?', a: 'HyperText Transfer Protocol.' },
      { m: 2, q: 'Differentiate between a web client and a web server.', a: 'A web client (browser) sends requests and displays responses to the user. A web server stores website files, processes requests and sends responses. Client = requester, server = provider.' },
      { m: 3, q: 'Explain static and dynamic websites with examples.', a: 'Static: fixed HTML files, identical for every visitor, fast, e.g. a portfolio page. Dynamic: content generated per request using server-side code and databases or client-side JS, e.g. e-commerce sites and social media feeds. Dynamic sites need more infrastructure but give personalised content.' },
      { m: 5, q: 'Explain client-server architecture with a neat diagram.', a: 'Draw a client (browser) and a server connected through the Internet with arrows for request and response. Explain: (1) user types a URL, (2) DNS converts the domain to an IP address, (3) browser sends an HTTP GET request, (4) server finds/generates the resource, (5) server returns a response with status code and body, (6) browser parses HTML and requests CSS/JS/images, (7) page is rendered. Mention advantages (central data, scalability) and disadvantages (single point of failure, network dependence).' },
    ],
    practice: ['Open any website, press F12, go to the Network tab and reload. Count how many requests were made.', 'List three static and three dynamic websites you use.', 'Find what status code you get when you visit a page that does not exist.'],
    revision: ['Browser = client, website host = server.', 'Request → response over HTTP(S).', 'HTML = structure, CSS = style, JS = behaviour.', 'Static = same for all; dynamic = changes per user.', '200 OK, 404 Not Found, 500 Server Error.'],
    quiz: [
      { q: 'Which of these is a web client?', o: ['Apache server', 'Google Chrome', 'MySQL', 'A router'], a: 1, e: 'A browser such as Chrome requests and displays pages, so it is the client.' },
      { q: 'What does status code 404 mean?', o: ['Success', 'Server crashed', 'Resource not found', 'Redirect'], a: 2, e: '404 means the server could not find what you asked for.' },
      { q: 'A news site that shows the same article to everyone with no server logic is…', o: ['Static', 'Dynamic', 'Responsive', 'Encrypted'], a: 0, e: 'Same content for everyone, from fixed files = static.' },
      { q: 'HTTPS differs from HTTP because it…', o: ['Is faster', 'Encrypts data in transit', 'Uses no server', 'Only works on mobile'], a: 1, e: 'The S means Secure: traffic is encrypted with TLS.' },
    ],
  },
  {
    id: 'html-what-is', track: 'html', group: 'Basics', level: 'Beginner', minutes: 10,
    title: 'What is HTML?', syllabus: 'Introduction to HTML5 · Web Standards',
    summary: 'The language that gives every web page its structure.',
    definition: '**HTML (HyperText Markup Language)** is the standard language used to describe the **structure** of a web page. It uses **tags** like `<h1>` and `<p>` to tell the browser "this is a heading", "this is a paragraph". HTML is a *markup* language, not a programming language — it describes content, it does not make decisions or do calculations.',
    why: 'Every website you have ever visited is built on HTML. Without it, the browser would see one long blob of text with no headings, links, images or buttons. CSS and JavaScript both work *on top of* HTML, so it is always the first thing you learn.',
    analogy: { title: 'The skeleton of a body', text: 'HTML is the skeleton: it decides where the head, arms and legs go. CSS is the skin, clothes and hairstyle. JavaScript is the muscles and brain that make it move.' },
    syntax: `<tagname attribute="value">Content goes here</tagname>`,
    lines: [
      ['<tagname', 'An opening tag starts with < and the tag name, such as p or h1.'],
      ['attribute="value"', 'Optional extra information about the element, written inside the opening tag.'],
      ['Content goes here', 'What the user actually sees, placed between opening and closing tags.'],
      ['</tagname>', 'The closing tag has a forward slash. Opening tag + content + closing tag = an element.'],
    ],
    live: { html: `<h1>My first web page</h1>\n<p>HTML gives this text <strong>structure</strong>.</p>\n<p>Without tags, the browser would not know this is a separate paragraph.</p>\n<!-- This is a comment. The browser ignores it. -->\n<img src="" alt="An empty image has alt text" />\n<br>\n<button>I am a button</button>` },
    tryThis: ['Remove the </strong> closing tag and see how the bold "leaks" into the rest of the text.', 'Change <h1> to <h3> — notice the size changes because headings have levels.', 'Write a comment <!-- like this --> and confirm it does not appear on the page.'],
    mistakes: [
      { wrong: '<p>Hello<p>', right: '<p>Hello</p>', why: 'The closing tag needs a slash. Without it you are opening a second paragraph.' },
      { wrong: 'Calling HTML a programming language.', right: 'HTML is a markup language.', why: 'It has no variables, conditions or loops. JavaScript is the programming language of the web.' },
      { wrong: '<img src="cat.jpg"></img>', right: '<img src="cat.jpg" alt="A cat">', why: '<img>, <br>, <hr>, <input> and <meta> are void (empty) elements and have no closing tag.' },
    ],
    exam: {
      definition: 'HTML (HyperText Markup Language) is the standard markup language for creating and structuring web pages, using elements represented by tags that browsers interpret and render. HTML5 is its current version, maintained by WHATWG as a "living standard".',
      points: ['Tim Berners-Lee created HTML in 1991 at CERN.', 'Versions: HTML 2.0 (1995), HTML 3.2 (1997), HTML 4.01 (1999), XHTML 1.0 (2000), HTML5 (2014, now a living standard).', 'HTML5 added semantic tags (header, nav, article, footer), native <audio>/<video>, <canvas>, new input types (email, date, range) and local storage APIs.', 'Element = opening tag + content + closing tag.', 'Void elements have no closing tag: img, br, hr, input, meta, link.', 'HTML is not case-sensitive, but lowercase is the standard practice.'],
      diff: { title: 'HTML vs HTML5', head: ['HTML 4.01', 'HTML5'], rows: [['Long DOCTYPE declaration', 'Short: <!DOCTYPE html>'], ['Needed Flash for audio/video', 'Native <audio> and <video>'], ['Mostly <div> for layout', 'Semantic tags: header, nav, section, article, footer'], ['Few input types', 'email, url, date, number, range, color…'], ['No offline storage', 'localStorage, sessionStorage']] },
      applications: ['Structuring every web page', 'Email templates', 'Hybrid mobile apps', 'Documentation and e-books (EPUB uses HTML)'],
    },
    examQs: [
      { m: 1, q: 'Who invented HTML?', a: 'Tim Berners-Lee, in 1991 at CERN.' },
      { m: 1, q: 'Name any two void elements in HTML.', a: '<br> and <img> (also <hr>, <input>, <meta>, <link>).' },
      { m: 2, q: 'Differentiate between a tag and an element.', a: 'A tag is the markup itself, e.g. <p> or </p>. An element is the complete unit: opening tag, content and closing tag, e.g. <p>Hello</p>.' },
      { m: 5, q: 'What is HTML5? List and explain the new features introduced in HTML5.', a: 'HTML5 is the fifth and current version of HTML, a living standard by WHATWG. New features: (1) simplified DOCTYPE, (2) semantic elements — header, nav, main, section, article, aside, footer, (3) multimedia — audio and video without plugins, (4) graphics — canvas and inline SVG, (5) form enhancements — new input types (email, date, number, range, color) and attributes (required, placeholder, pattern, autofocus), (6) Web Storage — localStorage and sessionStorage, (7) APIs — geolocation, drag and drop, web workers. Benefits: better accessibility, SEO and mobile support.' },
    ],
    practice: ['Write a page with one heading, two paragraphs and a button.', 'Write the HTML for your name in bold and your college name in italics.', 'Find three void elements and use each once.'],
    revision: ['HTML = HyperText Markup Language (structure).', 'Tag: <p>; element: <p>text</p>.', 'Void elements: img, br, hr, input, meta, link.', 'HTML5 → semantic tags, audio/video, canvas, new inputs, storage.', 'Comments: <!-- ... -->'],
    quiz: [
      { q: 'HTML stands for…', o: ['Hyper Trainer Marking Language', 'HyperText Markup Language', 'HighText Machine Language', 'HyperText Markdown Language'], a: 1, e: 'HyperText (text with links) Markup (tags that label content) Language.' },
      { q: 'Which is a void element?', o: ['<p>', '<div>', '<br>', '<span>'], a: 2, e: '<br> is a line break with no content, so it has no closing tag.' },
      { q: 'Which part of a web page does HTML control?', o: ['Behaviour', 'Structure', 'Database', 'Colours only'], a: 1, e: 'HTML = structure, CSS = presentation, JS = behaviour.' },
      { q: 'Which is NOT new in HTML5?', o: ['<video>', '<nav>', '<table>', 'type="date"'], a: 2, e: 'Tables have existed since early HTML versions.' },
    ],
  },
  {
    id: 'html-structure', track: 'html', group: 'Basics', level: 'Beginner', minutes: 14,
    title: 'HTML Document Structure', syllabus: 'HTML Document Structure · Meta Tags',
    summary: 'DOCTYPE, html, head and body — the skeleton every page needs.',
    definition: 'Every HTML page follows the same basic structure: a `<!DOCTYPE html>` declaration, then an `<html>` element that contains two parts — the `<head>` (information *about* the page, not shown on screen) and the `<body>` (everything the user sees).',
    why: 'Browsers need this structure to render the page correctly. The DOCTYPE switches the browser into "standards mode". The head carries the title shown in the browser tab, the character set so Hindi or emoji display properly, and the viewport setting that makes the page work on phones.',
    analogy: { title: 'A letter in an envelope', text: 'The DOCTYPE is the stamp saying what kind of letter this is. `<html>` is the envelope. The `<head>` is the address and sender details written on the outside — important, but not the message. The `<body>` is the actual letter you read.' },
    syntax: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Notes for first-year students">
    <title>Invertis Notes</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>Everything visible goes inside body.</p>
  </body>
</html>`,
    lines: [
      ['<!DOCTYPE html>', 'Tells the browser this is an HTML5 document. Not a tag — a declaration. Always the first line.'],
      ['<html lang="en">', 'The root element that wraps everything. lang="en" helps screen readers and search engines know the language.'],
      ['<head>', 'Container for metadata: information about the page that is not displayed in the page area.'],
      ['<meta charset="UTF-8">', 'Character encoding. UTF-8 supports every language and emoji, so ₹ and हिंदी display correctly.'],
      ['<meta name="viewport" …>', 'Makes the page fit the device width on mobiles instead of showing a zoomed-out desktop page.'],
      ['<meta name="description" …>', 'A summary that search engines like Google may show under your page title in results.'],
      ['<title>', 'The text shown on the browser tab and in bookmarks. Also very important for SEO.'],
      ['<body>', 'Everything the user sees: headings, text, images, links, forms.'],
    ],
    live: { html: `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <title>My College Page</title>\n  </head>\n  <body>\n    <h1>Invertis University</h1>\n    <p>Department of Computer Science</p>\n    <p>Symbols work thanks to UTF-8: ₹ ✓ हिंदी 😀</p>\n  </body>\n</html>` },
    experiment: { lab: 'structure-builder', text: 'Drag the pieces of a document into the right order in the Structure Builder.' },
    tryThis: ['Put a <p> inside <head> instead of <body>. Browsers try to fix it, but it is invalid HTML.', 'Change the <title> — in a real browser tab this text would change.'],
    mistakes: [
      { wrong: 'Putting visible content like <h1> inside <head>.', right: 'Visible content always goes in <body>.', why: 'The head is only for metadata; browsers silently move misplaced content, which leads to confusing bugs.' },
      { wrong: 'Forgetting <!DOCTYPE html>.', right: 'Always start with <!DOCTYPE html>.', why: 'Without it browsers enter "quirks mode" and CSS can behave inconsistently.' },
      { wrong: 'Two <body> or two <head> elements.', right: 'Exactly one head and one body inside html.', why: 'The document tree allows only one of each.' },
    ],
    exam: {
      definition: 'The basic structure of an HTML document consists of the DOCTYPE declaration followed by the root <html> element, which contains a <head> section for metadata and a <body> section for the displayed content.',
      points: ['DOCTYPE is a declaration, not an element, and is case-insensitive.', '<html> is the root element; all others are its descendants.', '<head> contains title, meta, link (CSS), style, script, base.', '<body> contains all renderable content.', 'Meta tags: charset, viewport, description, keywords, author, robots.', 'Every document must have a <title>.'],
      diff: { title: '<head> vs <body>', head: ['<head>', '<body>'], rows: [['Metadata about the page', 'Visible page content'], ['Not displayed in the page area', 'Rendered on screen'], ['title, meta, link, style', 'h1, p, img, a, form, div…'], ['Read by browsers, search engines', 'Read by users']] },
      diagram: 'dom-tree',
    },
    examQs: [
      { m: 1, q: 'What is the purpose of <!DOCTYPE html>?', a: 'It declares the document type as HTML5 so the browser renders it in standards mode.' },
      { m: 2, q: 'What is the use of the viewport meta tag?', a: 'It controls the layout on mobile browsers: width=device-width makes the page width equal to the screen width and initial-scale=1.0 sets the initial zoom, enabling responsive design.' },
      { m: 3, q: 'Explain any three meta tags with examples.', a: 'charset: <meta charset="UTF-8"> sets the character encoding. viewport: <meta name="viewport" content="width=device-width, initial-scale=1.0"> for responsive layouts. description: <meta name="description" content="..."> gives a summary used by search engines.' },
      { m: 5, q: 'Write and explain the basic structure of an HTML5 document.', a: 'Write the full skeleton (DOCTYPE, html with lang, head with meta charset, viewport and title, body with content). Explain each line: DOCTYPE → standards mode; html → root; head → metadata; meta charset → encoding; viewport → mobile scaling; title → tab title and SEO; body → visible content. Draw the tree: html → head (meta, title) and body (h1, p).' },
    ],
    practice: ['Write a complete HTML5 skeleton from memory, without looking.', 'Create a page titled "About Me" with a description meta tag.', 'Draw the document tree of your page on paper.'],
    revision: ['Order: DOCTYPE → html → head → body.', 'head = metadata; body = visible.', 'charset UTF-8, viewport for mobile, title for tab + SEO.', 'Only one head and one body.'],
    quiz: [
      { q: 'Which element contains the browser tab text?', o: ['<head>', '<title>', '<meta>', '<h1>'], a: 1, e: '<title> sits inside <head> and appears on the tab.' },
      { q: 'Where should <meta charset="UTF-8"> go?', o: ['Inside <body>', 'Before DOCTYPE', 'Inside <head>', 'After </html>'], a: 2, e: 'All meta tags belong in the head.' },
      { q: 'What is the root element of an HTML page?', o: ['<head>', '<body>', '<html>', '<!DOCTYPE>'], a: 2, e: 'Everything is nested inside <html>.' },
      { q: 'Which meta tag makes pages fit mobile screens?', o: ['charset', 'viewport', 'description', 'author'], a: 1, e: 'viewport with width=device-width.' },
    ],
  },
  {
    id: 'html-text', track: 'html', group: 'Elements', level: 'Beginner', minutes: 12,
    title: 'Headings, Paragraphs & Text Formatting', syllabus: 'Text Formatting · Headings · Paragraphs · HTML Entities',
    summary: 'Organise text with heading levels, paragraphs and meaningful formatting.',
    definition: '**Headings** `<h1>` to `<h6>` mark titles from most to least important. **Paragraphs** `<p>` hold blocks of text. **Formatting tags** give words special meaning: `<strong>` (important), `<em>` (emphasis), `<mark>` (highlight), `<sub>`/`<sup>` (subscript/superscript), `<code>` (code). **Entities** like `&lt;` let you show reserved characters.',
    why: 'Readers scan pages using headings, screen readers let blind users jump between headings, and Google uses them to understand your topic. Formatting tags add meaning — not just looks — so assistive technology can stress important words.',
    analogy: { title: 'A textbook chapter', text: 'h1 is the chapter title, h2 the section headings, h3 the sub-sections. Paragraphs are the body text. A highlighter pen is `<mark>`, and a "Note!" in bold is `<strong>`.' },
    syntax: `<h1>Chapter title</h1>
<h2>Section</h2>
<p>Water is H<sub>2</sub>O and E = mc<sup>2</sup>.</p>
<p><strong>Important:</strong> read <em>carefully</em>.</p>
<p>Use &lt;p&gt; for paragraphs &amp; &copy; for ©.</p>`,
    lines: [
      ['<h1>…</h1>', 'Main heading. Use one h1 per page for the main topic.'],
      ['<h2>…</h2>', 'A sub-heading under the h1. Do not skip levels (h1 → h3) just for size.'],
      ['<sub>2</sub>', 'Subscript: text slightly below the line, used in chemistry formulas.'],
      ['<sup>2</sup>', 'Superscript: text slightly above the line, used for powers and footnotes.'],
      ['<strong> / <em>', 'Semantic bold and italic: strong = important, em = stressed emphasis.'],
      ['&lt; &gt; &amp; &copy;', 'Entities: codes that display <, >, & and ©, since < and > would otherwise start a tag.'],
    ],
    live: { html: `<h1>Physics Notes</h1>\n<h2>Unit 1: Energy</h2>\n<p>Einstein's equation is E = mc<sup>2</sup>.</p>\n<p>Water is H<sub>2</sub>O.</p>\n<p><strong>Exam tip:</strong> <mark>derivations carry 5 marks</mark>.</p>\n<p>Old price: <del>₹999</del> <ins>₹499</ins></p>\n<p>Type <code>&lt;p&gt;</code> to start a paragraph.</p>\n<hr>\n<p>Line one<br>Line two (after a &lt;br&gt;)</p>\n<pre>  Preformatted    text\n  keeps   spaces</pre>`, css: 'mark { background: #FFD45C; }\nh2 { color: #176C97; }' },
    tryThis: ['Type extra spaces between words in a <p>. HTML collapses them into one space — but <pre> keeps them.', 'Change <strong> to <b>. It looks the same — but only <strong> tells screen readers the text is important.', 'Try writing <p> without &lt; and see that the browser treats it as a real tag.'],
    mistakes: [
      { wrong: 'Using <h1> for every big text.', right: 'Choose heading levels by importance; use CSS for size.', why: 'Headings form an outline. Skipping levels confuses screen readers and search engines.' },
      { wrong: 'Pressing Enter many times to add space.', right: 'Use separate <p> elements and CSS margin.', why: 'HTML collapses whitespace; line breaks in code do not show on the page.' },
      { wrong: 'Using <br><br><br> for layout.', right: 'Use <br> only for line breaks inside content (addresses, poems).', why: 'Spacing is a CSS job.' },
    ],
    exam: {
      definition: 'Text formatting elements are HTML tags that define the meaning or appearance of text, such as <strong>, <em>, <mark>, <sub>, <sup>, <del>, <ins> and <code>. Headings <h1>–<h6> define a hierarchy of titles, and <p> defines a paragraph.',
      points: ['Six heading levels: h1 (most important) to h6.', 'Browsers add default margins to headings and paragraphs.', 'Whitespace collapsing: multiple spaces/newlines show as one space.', '<pre> preserves whitespace; <br> inserts a line break; <hr> a thematic break.', 'Physical vs logical tags: <b>/<i> change look only; <strong>/<em> carry meaning.', 'Entities: &lt; &gt; &amp; &quot; &nbsp; &copy; &reg; &#8377;'],
      diff: { title: '<b> vs <strong>', head: ['<b>', '<strong>'], rows: [['Physical (presentational) tag', 'Logical (semantic) tag'], ['Only makes text bold', 'Marks text as important'], ['Screen readers ignore it', 'Screen readers may stress it'], ['Use for keywords, product names', 'Use for warnings, key points']] },
    },
    examQs: [
      { m: 1, q: 'Which tag is used for superscript?', a: '<sup>' },
      { m: 1, q: 'How many heading levels does HTML provide?', a: 'Six: <h1> to <h6>.' },
      { m: 2, q: 'What are HTML entities? Give two examples.', a: 'Entities are special codes starting with & and ending with ; used to display reserved or special characters. Examples: &lt; shows <, &copy; shows ©.' },
      { m: 3, q: 'Differentiate between <b> and <strong>, and <i> and <em>.', a: '<b> and <i> are physical tags that only change appearance. <strong> and <em> are logical tags that add meaning — importance and emphasis — which screen readers and search engines understand. Visually they are the same by default.' },
      { m: 5, q: 'Write HTML to display: H2SO4, (a+b)2 = a2 + 2ab + b2, a highlighted note and a deleted price.', a: '<p>H<sub>2</sub>SO<sub>4</sub></p> <p>(a+b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup></p> <p><mark>Note: carry your ID card</mark></p> <p><del>₹1200</del> ₹800</p>. Explain sub lowers text, sup raises it, mark highlights, del strikes through.' },
    ],
    practice: ['Write a recipe page with h1 title, h2 for "Ingredients" and "Method", and paragraphs.', 'Display the formula CO2 and x3 + y3.', 'Show the text "<html>" literally on the page.'],
    revision: ['h1–h6 by importance, one h1 per page.', 'p = paragraph; br = line break; hr = divider.', 'strong/em = meaning; b/i = look.', 'sub ↓, sup ↑, mark highlight, del/ins edits.', '&lt; &gt; &amp; &nbsp; &copy;'],
    quiz: [
      { q: 'Which tag displays text exactly with spaces preserved?', o: ['<p>', '<pre>', '<code>', '<span>'], a: 1, e: '<pre> keeps spaces and line breaks.' },
      { q: 'To show "<" on the page you write…', o: ['&gt;', '&lt;', '&amp;', '<<'], a: 1, e: '&lt; = less-than.' },
      { q: 'H₂O needs which tag for the 2?', o: ['<sup>', '<sub>', '<small>', '<low>'], a: 1, e: 'Subscript lowers the text.' },
      { q: 'Which tag carries semantic importance?', o: ['<b>', '<strong>', '<i>', '<u>'], a: 1, e: '<strong> means important.' },
      { q: 'What does HTML do with 5 spaces in a paragraph?', o: ['Shows 5 spaces', 'Shows 1 space', 'Shows an error', 'Adds a line break'], a: 1, e: 'Whitespace collapsing.' },
    ],
  },
  {
    id: 'html-links', track: 'html', group: 'Elements', level: 'Beginner', minutes: 10,
    title: 'Hyperlinks & Navigation', syllabus: 'Hyperlinks',
    summary: 'Connect pages together with the anchor tag.',
    definition: 'A **hyperlink** is clickable content that takes the user to another page, file, section or app. It is created with the anchor element `<a>`, and its destination is set in the `href` (hypertext reference) attribute.',
    why: 'Links are what make the web a *web*. Navigation menus, "Read more" buttons, download links, email links and "Back to top" buttons are all anchors.',
    analogy: { title: 'Doors in a building', text: 'Each page is a room. A link is a door with a sign. An absolute URL is a door to another building (another website); a relative URL is a door to another room in the same building; `#id` is a door to a corner of the same room.' },
    syntax: `<a href="https://www.invertisuniversity.ac.in" target="_blank">College website</a>
<a href="about.html">About (relative)</a>
<a href="#contact">Jump to contact</a>
<a href="mailto:office@college.edu">Email us</a>
<a href="tel:+911234567890">Call</a>`,
    lines: [
      ['href="https://…"', 'Absolute URL: the full address including https://. Used for other websites.'],
      ['target="_blank"', 'Opens the link in a new tab. Add rel="noopener" for security.'],
      ['href="about.html"', 'Relative URL: a path from the current file. Used for pages of your own site.'],
      ['href="#contact"', 'Fragment link: jumps to the element with id="contact" on the same page.'],
      ['mailto: / tel:', 'Special links that open the email app or phone dialler.'],
    ],
    live: { html: `<nav>\n  <a href="#home">Home</a> |\n  <a href="#courses">Courses</a> |\n  <a href="#contact">Contact</a>\n</nav>\n\n<h2 id="home">Home</h2>\n<p>Welcome! Click the links above to jump around.</p>\n<div style="height:300px"></div>\n\n<h2 id="courses">Courses</h2>\n<p>B.Tech AI, BCA, MCA</p>\n<div style="height:300px"></div>\n\n<h2 id="contact">Contact</h2>\n<p><a href="mailto:office@college.edu">office@college.edu</a></p>\n<p><a href="#home">↑ Back to top</a></p>`, css: 'nav { position: sticky; top: 0; background: #FFF3CC; padding: 8px; }\na { color: #176C97; font-weight: 600; }\na:hover { color: #FF8A3D; }' },
    tryThis: ['Add a fourth section with an id and a link to it in the nav.', 'Remove the id from "Courses" — the link stops working. The href and id must match exactly.'],
    mistakes: [
      { wrong: '<a href="www.google.com">', right: '<a href="https://www.google.com">', why: 'Without https:// the browser treats it as a relative file path in your own site.' },
      { wrong: 'Link text "click here".', right: 'Descriptive text: "Download the syllabus (PDF)".', why: 'Screen reader users often list all links; "click here" tells them nothing. It also hurts SEO.' },
      { wrong: 'href="#Contact" with id="contact".', right: 'Match case exactly.', why: 'Fragment ids are case-sensitive.' },
    ],
    exam: {
      definition: 'A hyperlink is a reference in a web document that the user can follow to reach another resource. In HTML it is created with the anchor element <a> whose href attribute specifies the destination URL.',
      points: ['Absolute URL: complete address with protocol (https://site.com/page).', 'Relative URL: path relative to the current document (pages/about.html, ../index.html).', 'Internal (fragment) link: href="#id".', 'target: _self (default), _blank (new tab), _parent, _top.', 'download attribute suggests downloading instead of opening.', 'Link states styled with CSS: :link, :visited, :hover, :active.'],
      diff: { title: 'Absolute vs relative URL', head: ['Absolute URL', 'Relative URL'], rows: [['Contains protocol and domain', 'Only a path from current file'], ['https://site.com/about.html', 'about.html or ../img/a.png'], ['Used for external sites', 'Used inside your own site'], ['Breaks if domain changes? No', 'Keeps working when the whole site moves']] },
    },
    examQs: [
      { m: 1, q: 'Which attribute of <a> specifies the destination?', a: 'href' },
      { m: 2, q: 'How do you open a link in a new tab?', a: 'Use target="_blank" on the anchor, e.g. <a href="https://example.com" target="_blank" rel="noopener">Example</a>.' },
      { m: 3, q: 'Explain absolute and relative URLs with examples.', a: 'An absolute URL includes protocol and domain, e.g. https://example.com/docs/a.html, and is used to link to other sites. A relative URL is relative to the current file, e.g. docs/a.html or ../index.html, and is used for internal pages so the site works when moved.' },
      { m: 5, q: 'Create a single page with a navigation bar that jumps to three sections and a back-to-top link. Explain how it works.', a: 'Create <nav> with <a href="#s1">…</a> etc., give each <section> a matching id, and add <a href="#top"> at the bottom with id="top" on the header. Explain that a fragment link scrolls to the element whose id matches the text after #.' },
    ],
    practice: ['Create a nav bar with links to Home, Gallery and Contact pages (relative links).', 'Add an email link and a phone link.', 'Make a long page with a "Back to top" link.'],
    revision: ['<a href="…">text</a>', 'Absolute = full URL; relative = path.', '#id jumps within page.', 'target="_blank" new tab.', 'mailto: and tel: open apps.'],
    quiz: [
      { q: 'What does href="#faq" do?', o: ['Opens faq.html', 'Jumps to element with id="faq"', 'Searches for faq', 'Nothing'], a: 1, e: 'A # link points to an id on the current page.' },
      { q: 'Which is a relative URL?', o: ['https://a.com', 'images/logo.png', 'mailto:a@b.com', 'ftp://x'], a: 1, e: 'No protocol or domain — it is a path.' },
      { q: 'target="_blank" opens the link…', o: ['In the same tab', 'In a new tab', 'As a download', 'In a popup alert'], a: 1, e: '_blank = a new browsing context.' },
    ],
  },
  {
    id: 'html-images-media', track: 'html', group: 'Elements', level: 'Beginner', minutes: 14,
    title: 'Images, Audio, Video & Iframes', syllabus: 'Images · Image paths · Audio and video · Iframes',
    summary: 'Embed pictures, sound, video and other pages.',
    definition: 'The `<img>` element shows a picture from the path in its `src` attribute; `alt` gives a text description. `<audio>` and `<video>` play media with built-in controls. `<iframe>` displays another web page (like a YouTube video or Google Map) inside your page.',
    why: 'Media makes pages engaging — product photos on shopping sites, lecture videos, campus maps. The `alt` text is essential: it is read aloud to blind users, shown when an image fails to load, and used by Google Images.',
    analogy: { title: 'A photo frame', text: '`<img>` is an empty frame on the wall; `src` tells it which photo to show. If the photo is missing, the `alt` label on the frame tells visitors what should be there.' },
    syntax: `<img src="images/campus.jpg" alt="Main building of the campus" width="400">
<video src="lecture.mp4" controls width="400" poster="thumb.jpg"></video>
<audio src="anthem.mp3" controls></audio>
<iframe src="https://www.example.com" width="400" height="300" title="Example site"></iframe>`,
    lines: [
      ['src="images/campus.jpg"', 'The image path. Relative paths start from the HTML file: images/ is a folder next to it, ../ goes up one folder.'],
      ['alt="…"', 'Alternative text. Describe what the image shows. Use alt="" for purely decorative images.'],
      ['width="400"', 'Width in pixels. Setting width and height prevents the layout jumping while the image loads.'],
      ['controls', 'A boolean attribute: its presence shows play/pause/volume. Without it there is no way to play.'],
      ['poster', 'The preview image shown before the video starts.'],
      ['title on iframe', 'Describes the embedded content for screen readers.'],
    ],
    live: { html: `<h3>Image with a working data URL</h3>\n<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='120'%3E%3Crect width='220' height='120' rx='14' fill='%2355B9E8'/%3E%3Ccircle cx='60' cy='60' r='30' fill='%23FFD45C'/%3E%3C/svg%3E" alt="A blue card with a yellow sun" width="220">\n\n<h3>Broken image — alt text appears</h3>\n<img src="missing-photo.jpg" alt="Photo of the college library" width="220">\n\n<h3>Figure with caption</h3>\n<figure>\n  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='90'%3E%3Crect width='160' height='90' fill='%2378C86A'/%3E%3C/svg%3E" alt="Green placeholder">\n  <figcaption>Fig 1: The campus lawn</figcaption>\n</figure>\n\n<h3>Video element (no file here, but controls show)</h3>\n<video controls width="260"></video>`, css: 'img { border: 2px solid #30343B; border-radius: 8px; }\nfigcaption { font-size: 13px; color: #5B616B; }' },
    tryThis: ['Delete the alt attribute from the broken image — now there is no clue what was meant to be there.', 'Change width="220" to 100 and see the image shrink while keeping its shape.', 'Remove controls from <video>: the player disappears.'],
    mistakes: [
      { wrong: '<img src="C:\\Users\\me\\Desktop\\pic.jpg">', right: '<img src="images/pic.jpg">', why: 'A path on your own computer will not exist on the server or anyone else\'s computer.' },
      { wrong: 'Leaving out alt.', right: 'Always add alt (empty alt="" if decorative).', why: 'Missing alt is an accessibility failure and an HTML validation error.' },
      { wrong: 'Using a huge 5 MB photo and shrinking it with width.', right: 'Resize/compress images before uploading.', why: 'The browser still downloads the full file, making the page slow on mobile data.' },
    ],
    exam: {
      definition: 'The <img> element embeds an image into a document using the src attribute for the image path and the alt attribute for alternative text. HTML5 provides <audio> and <video> elements for native media playback and <iframe> for embedding another HTML document.',
      points: ['<img> is a void element; required attributes: src and alt.', 'Formats: JPEG (photos), PNG (transparency), GIF (animation), SVG (vector), WebP (modern, smaller).', 'Path types: relative (img/a.png, ../a.png) and absolute (https://…).', 'Media attributes: controls, autoplay, muted, loop, poster, preload.', '<source> inside <video>/<audio> provides multiple formats as fallbacks.', '<figure> + <figcaption> group an image with its caption.'],
      diff: { title: 'Images: raster vs vector', head: ['Raster (JPG/PNG)', 'Vector (SVG)'], rows: [['Made of pixels', 'Made of shapes / maths'], ['Blurry when enlarged', 'Sharp at any size'], ['Best for photos', 'Best for icons, logos, charts']] },
    },
    examQs: [
      { m: 1, q: 'Which attribute provides alternative text for an image?', a: 'alt' },
      { m: 2, q: 'Why is the alt attribute important?', a: 'It is read by screen readers for visually impaired users, shown when the image fails to load, and helps search engines understand the image (SEO).' },
      { m: 3, q: 'Write HTML to embed a video with controls and a fallback message.', a: '<video controls width="480"><source src="intro.mp4" type="video/mp4"><source src="intro.webm" type="video/webm">Your browser does not support video.</video>. The browser picks the first supported source; the text shows only in very old browsers.' },
      { m: 5, q: 'Explain the <img>, <audio>, <video> and <iframe> elements with attributes.', a: '<img>: src, alt, width, height, loading="lazy". <audio>: src, controls, autoplay, loop, muted. <video>: src, controls, poster, width, autoplay muted, loop, with <source> children for formats. <iframe>: src, width, height, title, allowfullscreen; embeds another page such as a map or video.' },
    ],
    practice: ['Create a product card with an image, name and price.', 'Embed an audio player for a song file named song.mp3.', 'Write correct relative paths for: an image in a sibling folder "assets", and an image one folder up.'],
    revision: ['<img src alt> — void element.', 'Relative paths: folder/file, ../ up one level.', 'audio/video need controls to show player.', 'figure + figcaption for captions.', 'iframe embeds another page; give it a title.'],
    quiz: [
      { q: 'Which path goes one folder up?', o: ['./img.png', '../img.png', '/img.png', '~img.png'], a: 1, e: '../ means the parent folder.' },
      { q: 'What happens if an image fails to load?', o: ['Page crashes', 'alt text shows', 'Nothing at all', 'Browser downloads it'], a: 1, e: 'The browser shows the alt text.' },
      { q: 'Which attribute shows play/pause buttons on video?', o: ['play', 'controls', 'buttons', 'autoplay'], a: 1, e: 'controls is a boolean attribute.' },
      { q: 'Best format for a logo that must stay sharp at every size?', o: ['JPG', 'GIF', 'SVG', 'BMP'], a: 2, e: 'SVG is vector-based.' },
    ],
  },
  {
    id: 'html-lists', track: 'html', group: 'Elements', level: 'Beginner', minutes: 8,
    title: 'Lists', syllabus: 'Lists',
    summary: 'Unordered, ordered and description lists.',
    definition: 'HTML has three list types: **unordered** `<ul>` (bullets, order does not matter), **ordered** `<ol>` (numbers, order matters) and **description** `<dl>` (terms with definitions). Each item in ul/ol is an `<li>`.',
    why: 'Lists are everywhere: navigation menus are usually `<ul>` lists of links, recipes use `<ol>` steps, and FAQs or glossaries use `<dl>`.',
    analogy: { title: 'Shopping list vs recipe', text: 'A shopping list (milk, eggs, bread) has no order — that is `<ul>`. A recipe ("1. boil water, 2. add pasta") must be followed in order — that is `<ol>`. A dictionary is `<dl>`.' },
    syntax: `<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>
<ol type="1" start="1">
  <li>Install VS Code</li>
  <li>Create index.html</li>
</ol>
<dl>
  <dt>HTML</dt>
  <dd>Structure of a page</dd>
</dl>`,
    lines: [
      ['<ul>', 'Unordered list: shows bullet points.'],
      ['<li>', 'List item: each entry. Only <li> may be a direct child of <ul>/<ol>.'],
      ['<ol type="1" start="1">', 'Ordered list. type can be 1, A, a, I, i. start sets the first number.'],
      ['<dl> <dt> <dd>', 'Description list: dt is the term, dd is its description.'],
    ],
    live: { html: `<h3>Subjects this semester</h3>\n<ul>\n  <li>Web Development</li>\n  <li>Python</li>\n  <li>Mathematics\n    <ul>\n      <li>Calculus</li>\n      <li>Linear Algebra</li>\n    </ul>\n  </li>\n</ul>\n\n<h3>Steps to submit an assignment</h3>\n<ol type="I">\n  <li>Write the code</li>\n  <li>Push to GitHub</li>\n  <li>Share the link</li>\n</ol>\n\n<h3>Glossary</h3>\n<dl>\n  <dt>Browser</dt><dd>Software that displays web pages.</dd>\n  <dt>Server</dt><dd>Computer that stores and sends websites.</dd>\n</dl>`, css: 'li::marker { color: #FF8A3D; }\ndt { font-weight: bold; }' },
    tryThis: ['Change type="I" to type="a" for letters.', 'Add start="5" to the ordered list.', 'Nest an <ol> inside an <li> of the first list.'],
    mistakes: [
      { wrong: '<ul><p>Item</p></ul>', right: '<ul><li>Item</li></ul>', why: 'Only <li> may be a direct child of ul/ol.' },
      { wrong: 'Closing the inner list after the </li>.', right: 'Nested list goes inside the parent <li>, before its </li>.', why: 'A nested list belongs to a specific item.' },
    ],
    exam: {
      definition: 'HTML lists group related items. An unordered list (<ul>) displays items with bullets, an ordered list (<ol>) displays numbered items, and a description list (<dl>) pairs terms (<dt>) with descriptions (<dd>).',
      points: ['<ol> attributes: type (1, A, a, I, i), start, reversed.', 'Bullet style is changed with CSS list-style-type (disc, circle, square, none).', 'Lists can be nested to any depth.', 'Navigation menus are commonly built with <ul> + <a>.'],
      diff: { title: '<ul> vs <ol>', head: ['<ul>', '<ol>'], rows: [['Bullets', 'Numbers/letters'], ['Order does not matter', 'Order matters'], ['Menus, features', 'Steps, rankings']] },
    },
    examQs: [
      { m: 1, q: 'Which tag defines a list item?', a: '<li>' },
      { m: 2, q: 'List the values of the type attribute of <ol>.', a: '1 (numbers, default), A (uppercase letters), a (lowercase letters), I (uppercase Roman), i (lowercase Roman).' },
      { m: 5, q: 'Explain the three types of lists in HTML with code and output.', a: 'Write code for ul with 3 items (bullets), ol type="A" start="3" (C, D, E) and dl with 2 dt/dd pairs; describe output and typical uses: ul for unordered collections and menus, ol for sequences, dl for glossaries/FAQs. Mention nesting.' },
    ],
    practice: ['Make a nested list of your semesters and their subjects.', 'Make a top-5 movies list in reverse order using the reversed attribute.'],
    revision: ['ul = bullets, ol = numbers, dl = term/definition.', 'li only inside ul/ol.', 'ol: type, start, reversed.', 'Nest lists inside an li.'],
    quiz: [
      { q: 'Which list suits step-by-step instructions?', o: ['<ul>', '<ol>', '<dl>', '<menu>'], a: 1, e: 'Order matters → ordered list.' },
      { q: 'In a <dl>, the term goes in…', o: ['<dd>', '<li>', '<dt>', '<td>'], a: 2, e: 'dt = description term.' },
      { q: '<ol type="i"> produces…', o: ['1, 2, 3', 'a, b, c', 'i, ii, iii', 'I, II, III'], a: 2, e: 'Lowercase Roman numerals.' },
    ],
  },
  {
    id: 'html-tables', track: 'html', group: 'Elements', level: 'Elementary', minutes: 14,
    title: 'HTML Tables', syllabus: 'HTML Tables',
    summary: 'Show data in rows and columns.',
    definition: 'A **table** displays data in rows and columns. `<table>` wraps it, `<tr>` is a table row, `<th>` is a header cell and `<td>` is a data cell. `<thead>`, `<tbody>` and `<tfoot>` group rows, and `colspan`/`rowspan` merge cells.',
    why: 'Timetables, marksheets, price comparisons and attendance sheets are tabular data. Tables make them readable and let screen readers announce "row 3, Physics, 78".',
    analogy: { title: 'An Excel sheet', text: 'A table is a spreadsheet: `<tr>` is one row, each `<td>` is one cell in that row. Merging cells across columns in Excel is `colspan`; merging down rows is `rowspan`.' },
    syntax: `<table>
  <caption>Semester Result</caption>
  <thead>
    <tr><th>Subject</th><th>Marks</th></tr>
  </thead>
  <tbody>
    <tr><td>Web Dev</td><td>92</td></tr>
  </tbody>
  <tfoot>
    <tr><td colspan="2">Result: Pass</td></tr>
  </tfoot>
</table>`,
    lines: [
      ['<caption>', 'A title for the table, shown above it.'],
      ['<thead> / <tbody> / <tfoot>', 'Groups: header rows, body rows and footer rows. They help styling and accessibility.'],
      ['<tr>', 'One table row.'],
      ['<th>', 'Header cell: bold and centred by default; describes a column or row.'],
      ['<td>', 'Data cell.'],
      ['colspan="2"', 'This cell stretches across 2 columns.'],
    ],
    live: { html: `<table>\n  <caption>Monday Timetable</caption>\n  <thead>\n    <tr><th>Time</th><th>Room 101</th><th>Room 102</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>9:00</td><td>Web Dev</td><td rowspan="2">AI Lab</td></tr>\n    <tr><td>10:00</td><td>Maths</td></tr>\n    <tr><td>11:00</td><td colspan="2">Lunch break</td></tr>\n  </tbody>\n</table>`, css: 'table { border-collapse: collapse; }\nth, td { border: 2px solid #30343B; padding: 6px 12px; }\nth { background: #FFD45C; }\ntbody tr:nth-child(even) { background: #F1F6FA; }\ncaption { font-weight: bold; margin-bottom: 6px; }' },
    tryThis: ['Change colspan="2" to colspan="1" and see the row become broken.', 'Remove border-collapse: collapse in CSS — you get double borders.', 'Add a new row for 12:00.'],
    mistakes: [
      { wrong: 'Using tables to lay out a whole page.', right: 'Use tables only for tabular data; use CSS Flexbox/Grid for layout.', why: 'Layout tables are inaccessible and hard to make responsive.' },
      { wrong: 'Forgetting that rowspan "steals" a cell from the next row.', right: 'The next row should have one fewer <td>.', why: 'Otherwise the row will have too many cells and stick out.' },
      { wrong: 'Using the border attribute.', right: 'Use CSS border.', why: 'The border attribute is obsolete in HTML5.' },
    ],
    exam: {
      definition: 'An HTML table is a structured set of data arranged in rows and columns using the <table>, <tr>, <th> and <td> elements, optionally grouped with <thead>, <tbody> and <tfoot> and titled with <caption>.',
      points: ['colspan merges cells horizontally; rowspan merges vertically.', '<th scope="col|row"> improves accessibility.', 'CSS border-collapse: collapse merges adjacent borders.', 'Tables should not be used for page layout.'],
      diff: { title: '<th> vs <td>', head: ['<th>', '<td>'], rows: [['Header cell', 'Data cell'], ['Bold and centred by default', 'Normal and left-aligned'], ['Describes data', 'Holds data']] },
    },
    examQs: [
      { m: 1, q: 'Which tag defines a table row?', a: '<tr>' },
      { m: 2, q: 'What is the difference between colspan and rowspan?', a: 'colspan makes a cell span multiple columns horizontally; rowspan makes a cell span multiple rows vertically.' },
      { m: 5, q: 'Create an HTML table for a student marksheet with a caption, header, 3 subjects, total row using colspan.', a: 'Write <table> with <caption>Marksheet</caption>, <thead><tr><th>Subject</th><th>Max</th><th>Obtained</th></tr></thead>, 3 body rows and <tfoot><tr><td colspan="2">Total</td><td>255</td></tr></tfoot>; style with border-collapse.' },
      { m: 10, q: 'Design a class timetable using HTML tables demonstrating rowspan and colspan. Explain each tag used.', a: 'Build a table with days as rows and periods as columns; merge a lab across two periods (colspan="2") and lunch across all days (rowspan). Explain table, caption, thead, tbody, tr, th (scope), td, colspan, rowspan, and CSS for borders/zebra rows. Mention accessibility (th, caption) and not using tables for layout.' },
    ],
    practice: ['Create your weekly timetable.', 'Make a price comparison table for 3 phones.', 'Recreate a cricket scorecard with merged header cells.'],
    revision: ['table > tr > th/td', 'caption = title; thead/tbody/tfoot = groups', 'colspan ↔, rowspan ↕', 'border-collapse: collapse', 'Tables for data, not layout'],
    quiz: [
      { q: 'A header cell is created with…', o: ['<td>', '<th>', '<thead>', '<header>'], a: 1, e: '<th> = table header cell.' },
      { q: 'To merge 3 columns use…', o: ['rowspan="3"', 'colspan="3"', 'merge="3"', 'span="3"'], a: 1, e: 'colspan spans columns.' },
      { q: 'Which CSS removes double borders?', o: ['border: none', 'border-collapse: collapse', 'table-layout: fixed', 'border-spacing: 2'], a: 1, e: 'Collapse merges neighbouring borders.' },
    ],
  },
  {
    id: 'html-forms', track: 'html', group: 'Forms', level: 'Elementary', minutes: 18,
    title: 'Forms, Inputs, Labels & Validation', syllabus: 'Forms · Form Controls · Input Types · Labels · Validation',
    summary: 'Collect information from users — the right way.',
    definition: 'A **form** collects user input and sends it somewhere. `<form>` wraps the controls. `<input>` creates fields whose behaviour depends on `type` (text, email, password, number, date, checkbox, radio…). `<label>` names each field. Built-in **validation** attributes like `required`, `minlength`, `pattern`, `min` and `max` stop bad data before it is sent.',
    why: 'Logins, sign-ups, search boxes, exam registrations, feedback forms and payment pages are all forms. Using correct input types gives mobile users the right keyboard (numbers for phone, @ for email) and free validation.',
    analogy: { title: 'A paper admission form', text: 'The paper is `<form>`. Each printed box is an `<input>`. The printed text "Father\'s name:" next to a box is the `<label>`. The office clerk who rejects your form because a required box is empty is HTML validation.' },
    syntax: `<form action="/register" method="post">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="you@college.edu" required>

  <label for="age">Age</label>
  <input type="number" id="age" name="age" min="16" max="60">

  <button type="submit">Register</button>
</form>`,
    lines: [
      ['action="/register"', 'Where the data is sent when submitted (a server URL).'],
      ['method="post"', 'How it is sent. GET puts data in the URL (searches); POST sends it in the request body (passwords, large data).'],
      ['<label for="email">', 'Connects the label to the input with id="email". Clicking the label focuses the field, and screen readers read it.'],
      ['type="email"', 'Browser checks the value looks like an email and shows an @ keyboard on phones.'],
      ['name="email"', 'The key used when data is sent: email=you@college.edu. Without a name, the field is not submitted!'],
      ['placeholder', 'Grey hint text inside the field. It disappears when typing, so it is not a replacement for a label.'],
      ['required', 'The form will not submit while this is empty.'],
      ['min / max', 'Allowed range for number and date inputs.'],
    ],
    live: { html: `<form id="reg">\n  <h3>Hackathon Registration</h3>\n\n  <label for="name">Full name</label>\n  <input id="name" name="name" required minlength="3" placeholder="Aarav Sharma">\n\n  <label for="email">College email</label>\n  <input id="email" name="email" type="email" required>\n\n  <label for="phone">Phone (10 digits)</label>\n  <input id="phone" name="phone" type="tel" pattern="[0-9]{10}" required>\n\n  <label for="year">Year</label>\n  <select id="year" name="year">\n    <option>1st</option><option>2nd</option><option>3rd</option>\n  </select>\n\n  <fieldset>\n    <legend>Track</legend>\n    <label><input type="radio" name="track" value="web" checked> Web</label>\n    <label><input type="radio" name="track" value="ai"> AI</label>\n  </fieldset>\n\n  <label><input type="checkbox" name="agree" required> I accept the rules</label>\n  <button>Register</button>\n</form>\n<p id="out"></p>`, css: 'form { display: grid; gap: 6px; max-width: 320px; }\ninput, select { padding: 6px; border: 2px solid #30343B; border-radius: 6px; }\ninput:invalid:not(:placeholder-shown) { border-color: #F48FB1; }\ninput:valid { border-color: #78C86A; }\nbutton { padding: 8px; background: #FF8A3D; border: 2px solid #30343B; border-radius: 6px; font-weight: bold; }', js: `// Stop the real submit so we can see the data here.\ndocument.getElementById('reg').addEventListener('submit', function (e) {\n  e.preventDefault();\n  const data = Object.fromEntries(new FormData(this));\n  console.log(data);\n  document.getElementById('out').textContent = 'Submitted! Check the console.';\n});` },
    tabs: ['html', 'css', 'js'],
    experiment: { lab: 'form-builder', text: 'Build your own registration form in the Form Builder by picking fields.' },
    tryThis: ['Click Register with empty fields — the browser blocks it and shows a message.', 'Type 9 digits in phone. The pattern [0-9]{10} needs exactly 10.', 'Remove name="email" and submit: email is missing from the console output.'],
    mistakes: [
      { wrong: 'Using placeholder instead of a label.', right: 'Always provide a <label>; placeholder is only a hint.', why: 'The placeholder vanishes as you type and many screen readers skip it.' },
      { wrong: '<label>Email</label><input id="mail">', right: '<label for="mail">Email</label><input id="mail">', why: 'Without for/id (or wrapping), the label is not connected to the input.' },
      { wrong: 'Radio buttons with different names.', right: 'Give all options in one group the same name.', why: 'Only radios sharing a name are mutually exclusive.' },
      { wrong: 'Trusting HTML validation for security.', right: 'Always validate again on the server.', why: 'Anyone can bypass browser validation with developer tools.' },
    ],
    exam: {
      definition: 'An HTML form is a section of a document, defined by the <form> element, containing interactive controls such as <input>, <select>, <textarea> and <button> that collect user data and submit it to a server specified by the action attribute using the method (GET/POST) attribute.',
      points: ['Form attributes: action, method, autocomplete, novalidate, enctype (multipart/form-data for file upload).', 'Input types: text, password, email, number, tel, url, date, time, color, range, file, checkbox, radio, hidden, submit, reset.', 'Other controls: <textarea>, <select>/<option>, <button>, <fieldset>/<legend>, <datalist>.', 'Validation attributes: required, minlength, maxlength, min, max, step, pattern.', 'CSS pseudo-classes :valid and :invalid style fields by validity.', 'Client-side validation improves UX; server-side validation is mandatory for security.'],
      diff: { title: 'GET vs POST', head: ['GET', 'POST'], rows: [['Data in URL query string', 'Data in request body'], ['Visible, bookmarkable', 'Not visible in URL'], ['Length limited', 'Large data, files'], ['Search, filters', 'Login, registration, payment']] },
    },
    examQs: [
      { m: 1, q: 'Which attribute makes a field mandatory?', a: 'required' },
      { m: 2, q: 'Why should you use <label>?', a: 'It describes the field, increases the clickable area (clicking focuses the input), and is read by screen readers, making forms accessible.' },
      { m: 3, q: 'Differentiate between GET and POST.', a: 'GET appends data to the URL, is visible, has length limits and is used for search; POST sends data in the body, is not visible in the URL, supports large data/files and is used for login and registration.' },
      { m: 5, q: 'List and explain any eight HTML5 input types.', a: 'email (validates email format), number (numeric with min/max/step), tel (phone keypad), url (validates URL), date (date picker), color (colour picker), range (slider), password (masked), plus checkbox/radio/file. Explain each with an example tag.' },
      { m: 10, q: 'Design a student registration form with validation. Explain each control and validation attribute.', a: 'Include text name (required, minlength), email, tel with pattern="[0-9]{10}", date of birth (min/max), gender radios sharing a name, course select, hobbies checkboxes, address textarea, file upload (enctype multipart/form-data), submit/reset buttons; group with fieldset/legend and labels. Explain client vs server validation.' },
    ],
    practice: ['Build a login form with username, password and "remember me".', 'Build a feedback form with a rating range 1–5 and a textarea.', 'Add a pattern that accepts only a 6-digit PIN code.'],
    revision: ['form(action, method) > label + input(name).', 'label for = input id.', 'type gives keyboard + validation.', 'required, minlength, pattern, min, max.', 'Radios share a name. GET vs POST.'],
    quiz: [
      { q: 'Which input type shows a slider?', o: ['slider', 'range', 'number', 'scale'], a: 1, e: 'type="range".' },
      { q: 'Data from an input is only submitted if it has a…', o: ['class', 'id', 'name', 'label'], a: 2, e: 'The name is the key in the submitted data.' },
      { q: 'Which method should a login form use?', o: ['GET', 'POST', 'PUT', 'FETCH'], a: 1, e: 'POST keeps the password out of the URL.' },
      { q: 'Which attribute takes a regular expression?', o: ['regex', 'match', 'pattern', 'format'], a: 2, e: 'pattern="[0-9]{10}".' },
      { q: 'To group radio buttons so only one can be selected, they need the same…', o: ['id', 'value', 'name', 'label'], a: 2, e: 'Shared name = one group.' },
    ],
  },
  {
    id: 'html-attributes', track: 'html', group: 'Elements', level: 'Elementary', minutes: 12,
    title: 'Attributes, Classes, IDs & Containers', syllabus: 'Containers · Attributes · Classes and IDs · Data Attributes · Block vs Inline',
    summary: 'Give elements extra information and group them.',
    definition: 'An **attribute** adds information to an element, written as `name="value"` in the opening tag. `class` groups elements for styling (many elements can share it); `id` uniquely identifies one element. `data-*` attributes store custom data for JavaScript. `<div>` (block) and `<span>` (inline) are generic **containers** with no meaning of their own.',
    why: 'CSS and JavaScript find elements through classes and ids. Every card on Amazon shares a class like `product-card`; the search box has a unique id. Knowing block vs inline explains why some elements start on a new line and others do not.',
    analogy: { title: 'Students in a college', text: 'An `id` is your roll number — unique. A `class` is your section ("Section B") — many students share it. `data-hostel="A-block"` is an extra note on your ID card that the warden (JavaScript) can read.' },
    syntax: `<div id="profile" class="card highlight" data-user-id="42">
  <h2 class="card-title">Riya</h2>
  <p>Loves <span class="tag">AI</span> and <span class="tag">design</span></p>
</div>`,
    lines: [
      ['id="profile"', 'A unique name. Only one element on the page may have it. CSS uses #profile, JS uses getElementById.'],
      ['class="card highlight"', 'Two classes separated by a space. CSS: .card and .highlight.'],
      ['data-user-id="42"', 'Custom data for JS: element.dataset.userId gives "42".'],
      ['<div>', 'Block container: takes full width and starts on a new line.'],
      ['<span>', 'Inline container: only as wide as its content, stays inside the line.'],
    ],
    live: { html: `<div class="card" data-price="499">\n  <h3>Wireless Mouse</h3>\n  <p>Only <span class="price">₹499</span> today</p>\n</div>\n<div class="card highlight" id="best" data-price="1299">\n  <h3>Keyboard</h3>\n  <p>Only <span class="price">₹1299</span> today</p>\n</div>\n\n<p>Block vs inline:</p>\n<div class="demo">div</div><div class="demo">div</div>\n<span class="demo">span</span><span class="demo">span</span>`, css: '.card { border: 2px solid #30343B; border-radius: 10px; padding: 8px 12px; margin: 8px 0; }\n.highlight { background: #FFF3CC; }\n#best h3::after { content: " ★ best seller"; color: #FF8A3D; font-size: 13px; }\n.price { color: #357A2B; font-weight: bold; }\n.demo { background: #DDF1FB; border: 1px dashed #176C97; margin: 2px; }', js: `document.querySelectorAll('.card').forEach(card => {\n  console.log(card.querySelector('h3').textContent, '→ data-price =', card.dataset.price);\n});` },
    tabs: ['html', 'css', 'js'],
    tryThis: ['Add class="highlight" to the first card too.', 'Give the second card a data-stock="12" and log card.dataset.stock.', 'Notice the two divs stack, while the spans sit side by side.'],
    mistakes: [
      { wrong: 'Using the same id on two elements.', right: 'Use a class when several elements share a style.', why: 'ids must be unique; getElementById returns only the first.' },
      { wrong: 'class="card, highlight"', right: 'class="card highlight"', why: 'Multiple classes are separated by spaces, not commas.' },
      { wrong: 'Putting a <div> inside a <p>.', right: 'Only inline content goes inside <p>.', why: 'The browser closes the <p> early, breaking your structure.' },
    ],
    exam: {
      definition: 'Attributes provide additional information about HTML elements and are specified as name-value pairs in the start tag. The id attribute assigns a unique identifier, the class attribute assigns one or more reusable group names, and data-* attributes store custom private data accessible through JavaScript\'s dataset property.',
      points: ['Global attributes work on all elements: id, class, style, title, lang, hidden, tabindex, data-*.', 'Boolean attributes: presence = true (required, disabled, checked).', 'Block elements: div, p, h1–h6, ul, li, table, form, section.', 'Inline elements: span, a, img, strong, em, input, label.', 'Block elements can contain inline elements; inline should not contain block.'],
      diff: { title: 'id vs class', head: ['id', 'class'], rows: [['Unique per page', 'Reusable on many elements'], ['One per element', 'Many per element'], ['CSS: #name', 'CSS: .name'], ['Higher specificity', 'Lower specificity'], ['Used for anchors, JS hooks', 'Used for styling groups']] },
    },
    examQs: [
      { m: 1, q: 'How do you write two classes on one element?', a: 'Separate them with a space: class="btn primary".' },
      { m: 2, q: 'What are data attributes?', a: 'Custom attributes beginning with data- that store extra information on elements, readable in JS via element.dataset (data-user-id → dataset.userId).' },
      { m: 3, q: 'Differentiate between block and inline elements with examples.', a: 'Block elements start on a new line and take the full available width (div, p, h1, ul). Inline elements flow within a line and take only the needed width (span, a, strong, img). Width/height do not apply to non-replaced inline elements.' },
      { m: 5, q: 'Explain the id and class attributes with an example of how CSS and JavaScript use them.', a: 'Give code with <div id="main" class="box"> etc., CSS #main{} and .box{}, JS document.getElementById("main") and document.querySelectorAll(".box"). Explain uniqueness, specificity, and reuse.' },
    ],
    practice: ['Create three product cards that share a class and one with a unique id.', 'Store a student roll number in a data attribute and log it.'],
    revision: ['Attribute = name="value" in opening tag.', 'id unique (#), class reusable (.).', 'data-* → element.dataset.', 'div = block container, span = inline container.'],
    quiz: [
      { q: 'How many elements may share one id?', o: ['Any number', 'One', 'Two', 'Ten'], a: 1, e: 'ids must be unique.' },
      { q: 'data-room-no="B12" is read in JS as…', o: ['el.data.roomNo', 'el.dataset.roomNo', 'el.dataset.room-no', 'el.roomNo'], a: 1, e: 'Dashes become camelCase in dataset.' },
      { q: 'Which is inline by default?', o: ['<div>', '<p>', '<span>', '<section>'], a: 2, e: 'span is inline.' },
    ],
  },
  {
    id: 'html-semantic', track: 'html', group: 'Semantic HTML', level: 'Intermediate', minutes: 16,
    title: 'Semantic HTML, Accessibility & SEO', syllabus: 'Semantic HTML Elements · Accessibility · SEO Basics · Best Practices · Validation · Web Standards',
    summary: 'Write HTML that people, screen readers and Google all understand.',
    definition: '**Semantic elements** describe their meaning: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`. **Non-semantic** elements like `<div>` and `<span>` say nothing about their content. **Accessibility (a11y)** means everyone — including people using screen readers or keyboards — can use your site. **SEO** (Search Engine Optimisation) means helping search engines understand and rank your page.',
    why: 'A page built only from divs looks fine but is a maze for screen readers and search bots. Semantic HTML gives free keyboard navigation landmarks, better Google ranking and cleaner code that teammates understand.',
    analogy: { title: 'Labelled boxes when moving house', text: 'Packing everything in unlabelled boxes (divs) works, but finding the kitchen stuff is painful. Boxes labelled "Kitchen", "Books", "Bedroom" (header, nav, main, footer) make unpacking easy — for you and for the movers (screen readers, Google).' },
    syntax: `<header>
  <h1>CodePlay Blog</h1>
  <nav><a href="/">Home</a> <a href="/posts">Posts</a></nav>
</header>
<main>
  <article>
    <h2>Learning Flexbox</h2>
    <p>…</p>
  </article>
  <aside>Related posts</aside>
</main>
<footer>&copy; 2026 CodePlay</footer>`,
    lines: [
      ['<header>', 'Introductory content: logo, site title, navigation.'],
      ['<nav>', 'A block of major navigation links.'],
      ['<main>', 'The main unique content of the page. Only one per page.'],
      ['<article>', 'Self-contained content that makes sense alone: a blog post, news story, product card.'],
      ['<section>', 'A themed group of content, usually with its own heading.'],
      ['<aside>', 'Side content related to the main content: sidebar, tips, ads.'],
      ['<footer>', 'Closing content: copyright, contact, links.'],
    ],
    live: { html: `<header>\n  <h1>Campus News</h1>\n  <nav><a href="#">Home</a> · <a href="#">Events</a> · <a href="#">Sports</a></nav>\n</header>\n<main>\n  <article>\n    <h2>AI Hackathon this Friday</h2>\n    <p>Teams of 3 can register at the CS department.</p>\n    <time datetime="2026-11-06">6 November 2026</time>\n  </article>\n  <aside>\n    <h3>Quick links</h3>\n    <p>Library hours: 9am–8pm</p>\n  </aside>\n</main>\n<footer>&copy; 2026 Student Council</footer>`, css: 'header, main, footer, article, aside, nav { border: 2px dashed #55B9E8; padding: 6px; margin: 4px; position: relative; }\nheader::before, main::before, footer::before, article::before, aside::before, nav::before {\n  font: bold 10px monospace; color: #fff; background: #176C97; padding: 1px 4px; position: absolute; top: -8px; right: 6px;\n}\nheader::before { content: "header"; } nav::before { content: "nav"; } main::before { content: "main"; }\narticle::before { content: "article"; } aside::before { content: "aside"; } footer::before { content: "footer"; }\nmain { display: flex; gap: 8px; } article { flex: 2; } aside { flex: 1; background: #FFF3CC; }' },
    tryThis: ['Replace <article> with <div>. It looks identical — the difference is only in meaning, which is exactly the point.', 'Add a <section> with an h2 inside the article.'],
    mistakes: [
      { wrong: '<div class="header"> for everything.', right: 'Use <header>, <nav>, <main>, <footer>.', why: 'Screen reader users can jump between landmarks only when semantic tags are used.' },
      { wrong: '<div onclick="…">Buy</div> as a button.', right: '<button>Buy</button>', why: 'A div cannot be focused with Tab or pressed with Enter. Buttons are accessible for free.' },
      { wrong: 'Low-contrast light grey text.', right: 'Contrast ratio of at least 4.5:1 for normal text.', why: 'WCAG guidelines; low contrast is unreadable for many users, especially in sunlight.' },
    ],
    exam: {
      definition: 'Semantic HTML is the use of HTML elements that clearly describe their meaning and role in the document (such as <header>, <nav>, <main>, <article>, <section>, <aside> and <footer>), improving accessibility, search-engine optimisation and code maintainability. Non-semantic elements such as <div> and <span> convey no meaning about their content.',
      points: ['Accessibility basics: alt text, labels, semantic landmarks, headings in order, keyboard access, colour contrast, lang attribute, ARIA only when needed.', 'SEO basics: unique <title>, meta description, one h1, descriptive headings, meaningful link text, alt text, fast loading, mobile-friendly, clean URLs.', 'Validation: check markup with the W3C Markup Validation Service (validator.w3.org).', 'Web standards are maintained by W3C and WHATWG so websites work across browsers.', 'Best practices: lowercase tags, quote attribute values, indent nested elements, close all non-void elements, separate structure (HTML), style (CSS) and behaviour (JS).'],
      diff: { title: 'Semantic vs non-semantic', head: ['Semantic', 'Non-semantic'], rows: [['Describes meaning', 'No meaning'], ['header, nav, article, footer', 'div, span'], ['Better accessibility & SEO', 'Needs extra ARIA to be accessible'], ['Self-documenting code', 'Relies on class names']] },
      diagram: 'semantic-layout',
    },
    examQs: [
      { m: 1, q: 'Give two examples of semantic elements.', a: '<article> and <nav> (also header, main, section, aside, footer).' },
      { m: 2, q: 'Differentiate between <section> and <article>.', a: '<article> is self-contained content that can stand alone (a blog post); <section> groups related content under a theme, usually with a heading, and need not stand alone.' },
      { m: 3, q: 'What is web accessibility? List four ways HTML supports it.', a: 'Accessibility means designing sites usable by people with disabilities. HTML supports it through alt text on images, labels for form controls, semantic landmarks (nav, main), proper heading order, native buttons/links for keyboard use, and the lang attribute.' },
      { m: 5, q: 'What is SEO? Explain how HTML can be written to improve SEO.', a: 'SEO improves visibility in search results. HTML practices: unique descriptive <title>, meta description, single h1 and logical heading hierarchy, semantic tags, descriptive link text, alt text, meta viewport for mobile, valid markup, fast pages (optimised images, lazy loading).' },
      { m: 10, q: 'Explain semantic HTML5 layout elements with a diagram of a typical page layout. Discuss their importance in accessibility and SEO.', a: 'Draw header (logo + nav) at top, main with article/section and aside side-by-side, footer at bottom. Explain each element, then accessibility (landmarks, screen reader navigation, keyboard) and SEO (search engines understand primary content, headings, articles). Contrast with a div-only layout.' },
    ],
    practice: ['Convert a div-only blog page into a semantic one.', 'Run any page through validator.w3.org and fix the errors.', 'Use the Tab key to navigate a website you use daily. Can you reach everything?'],
    revision: ['header, nav, main, section, article, aside, footer.', 'One main and one h1 per page.', 'a11y: alt, labels, contrast, keyboard, lang.', 'SEO: title, description, headings, link text.', 'Validate at validator.w3.org.'],
    quiz: [
      { q: 'Which element should contain the main navigation?', o: ['<menu>', '<nav>', '<links>', '<header>'], a: 1, e: '<nav> marks major navigation blocks.' },
      { q: 'A standalone blog post is best wrapped in…', o: ['<section>', '<article>', '<div>', '<aside>'], a: 1, e: 'article = self-contained content.' },
      { q: 'How many <main> elements should a page have?', o: ['0', '1', 'Any', 'One per section'], a: 1, e: 'Exactly one visible main.' },
      { q: 'Which improves SEO the most?', o: ['Lots of <br>', 'A descriptive <title>', 'Using only divs', 'Inline styles'], a: 1, e: 'The title is a key ranking and display signal.' },
    ],
  },
  {
    id: 'git-basics', track: 'html', group: 'Git & GitHub', level: 'Intermediate', minutes: 18,
    title: 'Version Control with Git & GitHub', syllabus: 'Version Control with Git and GitHub',
    summary: 'Save every version of your code and work with a team.',
    definition: '**Version control** is a system that records changes to files over time so you can see history, undo mistakes and collaborate. **Git** is a free, **distributed** version control system that runs on your computer. **GitHub** is a website that hosts Git repositories online for sharing and teamwork.',
    why: 'Without Git, projects end up as "final.html", "final2.html", "final-REAL.html". With Git you can go back to any version, try ideas on branches without breaking working code, and many people can work on one project. Every software company uses it, and your GitHub profile is your coding portfolio.',
    analogy: { title: 'A photo album of your project', text: 'Your **working directory** is the room as it is now. `git add` puts selected items in front of the camera (the **staging area**). `git commit` takes the photo and sticks it in the album (the **repository**) with a caption. `git push` sends a copy of the album to GitHub, the cloud.' },
    syntax: `git config --global user.name "Riya Verma"
git config --global user.email "riya@example.com"
git init                      # start tracking this folder
git status                    # what changed?
git add index.html            # stage a file (or: git add .)
git commit -m "Add homepage"  # save a snapshot
git log --oneline             # view history
git branch feature-nav        # create a branch
git switch feature-nav        # move to it
git remote add origin https://github.com/riya/site.git
git push -u origin main       # upload to GitHub
git pull                      # download + merge new changes
git clone https://github.com/riya/site.git
git tag v1.0                  # label a release`,
    syntaxLang: 'text',
    lines: [
      ['git config', 'Sets your name and email once; they appear on every commit.'],
      ['git init', 'Creates a hidden .git folder: the folder is now a repository.'],
      ['git status', 'Shows modified, staged and untracked files. Run it often!'],
      ['git add', 'Moves changes from the working directory to the staging area.'],
      ['git commit -m', 'Saves the staged snapshot permanently with a message.'],
      ['git branch / switch', 'A branch is a separate line of work. main stays safe while you experiment.'],
      ['git push / pull', 'push uploads commits to the remote (GitHub); pull = fetch + merge downloads others\' work.'],
      ['git clone', 'Copies a whole remote repository with its history to your computer.'],
      ['git tag', 'Marks a specific commit as important, such as a release version.'],
    ],
    widget: 'git-sim',
    tryThis: ['Use the simulator: edit a file, stage it, then commit. Watch it move through the three areas.', 'Create a branch in the simulator and commit on it.'],
    mistakes: [
      { wrong: 'git commit without git add.', right: 'Stage first: git add file, then commit.', why: 'Only staged changes go into a commit.' },
      { wrong: 'Messages like "changes" or "asdf".', right: 'Describe what and why: "Fix navbar overlap on mobile".', why: 'History is useless if messages say nothing.' },
      { wrong: 'Committing passwords or API keys.', right: 'List secret files in .gitignore.', why: 'Anything pushed to a public repo can be copied by anyone, forever.' },
      { wrong: 'Panicking at a merge conflict.', right: 'Open the file, choose between the <<<<<<< and >>>>>>> sections, delete the markers, add and commit.', why: 'A conflict just means Git needs a human to decide.' },
    ],
    exam: {
      definition: 'A Version Control System (VCS) is software that tracks and manages changes to files over time, enabling history, rollback and collaboration. Git is a distributed VCS created by Linus Torvalds in 2005 in which every developer has a full copy of the repository and its history. GitHub is a cloud-based hosting service for Git repositories that adds collaboration features such as pull requests, issues and code review.',
      points: ['Three areas: working directory → staging area (index) → repository (.git).', 'Commit lifecycle: untracked → staged → committed; modified → staged → committed.', 'Branching: create isolated lines of development; merge combines them.', 'fetch downloads remote changes without merging; pull = fetch + merge.', 'Merge conflict: same lines changed differently; resolve manually, then add and commit.', 'Tags mark releases (v1.0). .gitignore lists files Git should not track.', 'Collaboration on GitHub: fork → clone → branch → commit → push → pull request → review → merge.'],
      diff: { title: 'Centralized vs Distributed VCS', head: ['Centralized (SVN, CVS)', 'Distributed (Git, Mercurial)'], rows: [['One central server holds history', 'Every clone has full history'], ['Needs network for most actions', 'Commit, log, branch work offline'], ['Server failure = history at risk', 'Any clone can restore the project'], ['Simpler model', 'Fast, flexible branching']] },
      diagram: 'git-areas',
    },
    examQs: [
      { m: 1, q: 'Which command initialises a new Git repository?', a: 'git init' },
      { m: 2, q: 'Differentiate between git fetch and git pull.', a: 'git fetch downloads new commits from the remote but does not change your working files; git pull fetches and then merges them into the current branch.' },
      { m: 3, q: 'Explain the working directory, staging area and repository.', a: 'Working directory: actual files you edit. Staging area: a list of changes prepared for the next commit (git add). Repository: the .git database storing committed snapshots permanently (git commit).' },
      { m: 5, q: 'Compare centralized and distributed version control systems.', a: 'Use the comparison table: architecture, offline work, speed, backup/failure, branching, examples (SVN vs Git). Conclude that distributed systems are preferred for modern collaborative development.' },
      { m: 10, q: 'Explain the Git workflow for collaborating on a project using GitHub, including branching and resolving a merge conflict.', a: 'Steps: clone repo, create branch, make changes, git add/commit, push branch, open pull request, review, merge. Conflict: two branches edit the same line; Git inserts <<<<<<<, =======, >>>>>>> markers; developer edits to keep the right code, removes markers, git add, git commit. Mention pull before push, meaningful messages, small commits, .gitignore.' },
    ],
    practice: ['Create a repository for your first web page and make three commits.', 'Push it to GitHub and enable GitHub Pages to publish it.', 'Create a branch, change the heading colour, and merge it into main.'],
    revision: ['VCS tracks history. Git = distributed. GitHub = online host.', 'Working dir → (add) → staging → (commit) → repo → (push) → remote.', 'branch, switch, merge.', 'pull = fetch + merge.', 'Conflicts: edit, remove markers, add, commit.'],
    quiz: [
      { q: 'Which command moves changes to the staging area?', o: ['git commit', 'git add', 'git push', 'git stage-all'], a: 1, e: 'git add stages changes.' },
      { q: 'Git is a ___ version control system.', o: ['Centralized', 'Distributed', 'Cloud-only', 'Manual'], a: 1, e: 'Every clone has full history.' },
      { q: 'git pull is equivalent to…', o: ['clone + push', 'fetch + merge', 'add + commit', 'init + add'], a: 1, e: 'Fetch then merge.' },
      { q: 'Who created Git?', o: ['Tim Berners-Lee', 'Linus Torvalds', 'Brendan Eich', 'Guido van Rossum'], a: 1, e: 'Linus Torvalds, 2005, for Linux kernel development.' },
    ],
  },
];
