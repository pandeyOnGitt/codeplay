export const cssLessons = [
  {
    id: 'css-intro', track: 'css', group: 'Fundamentals', level: 'Beginner', minutes: 12,
    title: 'Introduction to CSS', syllabus: 'Introduction to CSS · CSS Syntax · Inline, Internal and External CSS',
    summary: 'How CSS turns plain HTML into a designed page.',
    definition: '**CSS (Cascading Style Sheets)** is the language that controls how HTML looks: colours, fonts, spacing, layout, animation. A CSS **rule** has a **selector** (which elements) and a **declaration block** of `property: value;` pairs (what to change).',
    why: 'HTML alone looks like a 1995 document. CSS lets one file style hundreds of pages consistently — change the brand colour once and the whole website updates.',
    analogy: { title: 'Instructions to a painter', text: 'A CSS rule is like telling a painter: "**All doors** (selector) → paint them **blue** (property: value) and **make the handles gold**." You point at things, then say what to change.' },
    syntax: `selector {
  property: value;
  property: value;
}

/* example */
h1 {
  color: #FF8A3D;
  font-size: 32px;
}`,
    lines: [
      ['selector', 'Chooses which HTML elements the rule applies to — here every h1.'],
      ['{ … }', 'The declaration block holds all the changes for that selector.'],
      ['color: #FF8A3D;', 'A declaration: property, colon, value, semicolon.'],
      ['/* … */', 'A CSS comment. The browser ignores it.'],
    ],
    live: { html: `<h1 style="color: #55B9E8;">Inline style (on the tag)</h1>\n<h1>Internal / external style</h1>\n<p class="note">CSS can live in three places.</p>`, css: `/* This CSS tab acts like an internal <style> block\n   or an external style.css file */\nh1 {\n  color: #FF8A3D;\n  font-family: Georgia, serif;\n}\n.note {\n  background: #FFF3CC;\n  padding: 8px;\n  border-left: 4px solid #FFD45C;\n}` },
    tryThis: ['Change the h1 colour value to "green" or "#78C86A".', 'The first heading stays blue: inline styles beat the CSS tab. That is the cascade at work.', 'Delete a semicolon between two declarations and see the next declaration break.'],
    mistakes: [
      { wrong: 'h1 { color = red }', right: 'h1 { color: red; }', why: 'CSS uses a colon, not an equals sign, and each declaration ends with a semicolon.' },
      { wrong: 'Styling everything with inline style="".', right: 'Use an external stylesheet.', why: 'Inline styles cannot be reused, clutter HTML and are hard to override.' },
      { wrong: '<link href="style.css"> without rel.', right: '<link rel="stylesheet" href="style.css">', why: 'rel="stylesheet" tells the browser what the file is.' },
    ],
    exam: {
      definition: 'CSS (Cascading Style Sheets) is a style sheet language used to describe the presentation of documents written in HTML, separating content from design. A CSS rule consists of a selector and a declaration block containing property-value pairs.',
      points: ['Three ways: inline (style attribute), internal (<style> in head), external (<link rel="stylesheet" href="style.css">).', 'Priority when specificity is equal: inline > internal/external (whichever comes later wins).', 'External CSS is cached by the browser and reused across pages.', 'Håkon Wium Lie proposed CSS in 1994; CSS1 1996, CSS2 1998, CSS3 is modular.', '"Cascading" refers to how multiple rules combine and which wins.'],
      diff: { title: 'Inline vs Internal vs External CSS', head: ['Inline', 'Internal', 'External'], rows: [['style="" on a tag', '<style> in <head>', 'Separate .css file'], ['One element', 'One page', 'Whole website'], ['Highest priority', 'Normal', 'Normal'], ['Hard to maintain', 'OK for single pages', 'Best practice, cached']] },
    },
    examQs: [
      { m: 1, q: 'What is the full form of CSS?', a: 'Cascading Style Sheets.' },
      { m: 2, q: 'Write the syntax of a CSS rule and label its parts.', a: 'selector { property: value; } — selector picks elements, the declaration block contains declarations, each is property: value; .' },
      { m: 5, q: 'Explain the three ways of applying CSS with examples, advantages and disadvantages.', a: 'Inline: <p style="color:red">, quick but not reusable. Internal: <style> in head, good for single pages. External: <link rel="stylesheet" href="style.css">, reusable across pages, cached, separates concerns. Discuss priority.' },
    ],
    practice: ['Create an external style.css and link it to a page.', 'Style a paragraph three ways (inline, internal, external) and observe which wins.'],
    revision: ['selector { property: value; }', 'Inline > internal/external by default.', 'External = reusable + cached.', 'Comments: /* */'],
    quiz: [
      { q: 'Which HTML tag links an external CSS file?', o: ['<style>', '<css>', '<link>', '<script>'], a: 2, e: '<link rel="stylesheet" href="…">' },
      { q: 'Which is valid CSS?', o: ['p {color=red}', 'p {color: red;}', 'p (color: red)', 'p: color red'], a: 1, e: 'property: value; inside braces.' },
      { q: 'Which way of applying CSS has the highest priority?', o: ['External', 'Internal', 'Inline', 'Browser default'], a: 2, e: 'Inline styles beat stylesheet rules (without !important).' },
    ],
  },
  {
    id: 'css-selectors', track: 'css', group: 'Fundamentals', level: 'Beginner', minutes: 16,
    title: 'Selectors, Pseudo-classes & Pseudo-elements', syllabus: 'Selectors · Element/Class/ID/Universal/Grouping/Attribute selectors · Pseudo-classes · Pseudo-elements',
    summary: 'Point at exactly the elements you want to style.',
    definition: 'A **selector** tells CSS which elements a rule targets. **Element** (`p`), **class** (`.card`), **ID** (`#logo`), **universal** (`*`), **grouping** (`h1, h2`), **descendant** (`nav a`), **child** (`ul > li`), and **attribute** (`input[type="email"]`) selectors pick elements by name, class, id, position or attribute. **Pseudo-classes** (`:hover`, `:focus`, `:nth-child(2)`) select by *state or position*. **Pseudo-elements** (`::before`, `::after`, `::first-letter`) style a *part* of an element.',
    why: 'Real websites have thousands of elements. Good selectors let you style "only the links inside the footer" or "every second row of the table" without adding a class to each one.',
    analogy: { title: 'Calling students in a classroom', text: '`p` = "all students". `.cr` = "all class representatives". `#roll-23` = "student number 23". `:hover` = "whoever raises a hand right now". `::first-letter` = "just the first letter of each name on the board".' },
    syntax: `p { }                    /* element */
.card { }                /* class */
#logo { }                /* id */
* { }                    /* universal: everything */
h1, h2, h3 { }           /* grouping */
nav a { }                /* descendant: any a inside nav */
ul > li { }              /* child: direct children only */
input[type="email"] { }  /* attribute */
a:hover { }              /* pseudo-class: state */
li:nth-child(odd) { }    /* pseudo-class: position */
p::first-letter { }      /* pseudo-element: part */
.price::before { content: "₹"; }`,
    lines: [
      ['.card', 'A dot means class. Matches every element with class="card".'],
      ['#logo', 'A hash means id. Matches the one element with id="logo".'],
      ['nav a', 'A space means "inside": links anywhere inside nav.'],
      ['ul > li', '> means direct child only, not grandchildren.'],
      ['[type="email"]', 'Square brackets select by attribute.'],
      [':hover', 'One colon = pseudo-class (a state like hover, focus, checked).'],
      ['::before', 'Two colons = pseudo-element: generated content before the element\'s content.'],
    ],
    live: { html: `<nav><a href="#">Home</a> <a href="#">Shop</a></nav>\n<a href="#">A link outside nav</a>\n<ul class="menu">\n  <li>Phones</li><li>Laptops</li><li>Tablets</li><li>Watches</li>\n</ul>\n<p class="intro">CodePlay makes CSS selectors easy to understand.</p>\n<p>Price: <span class="price">999</span></p>\n<input type="email" placeholder="email">\n<input type="text" placeholder="text">`, css: `nav a { color: #FF8A3D; font-weight: bold; }\na:hover { text-decoration: underline wavy; }\n.menu > li:nth-child(odd) { background: #DDF1FB; }\n.menu li:first-child { font-weight: bold; }\n.intro::first-letter { font-size: 2em; color: #F48FB1; }\n.price::before { content: "₹"; }\ninput[type="email"] { border: 2px solid #78C86A; }\ninput:focus { outline: 3px solid #FFD45C; }` },
    tryThis: ['Change nth-child(odd) to nth-child(2) or nth-child(3n).', 'Hover over the links and click into the inputs to trigger :hover and :focus.', 'Change `nav a` to just `a` — now the outside link turns orange too.'],
    mistakes: [
      { wrong: '.card .title vs .card.title confusion', right: '.card .title = title inside card; .card.title = one element with both classes.', why: 'A single space changes the meaning completely.' },
      { wrong: 'p::hover', right: 'p:hover', why: 'States are pseudo-classes (one colon); ::before/::after are pseudo-elements.' },
      { wrong: '::before with no content property', right: '.x::before { content: ""; }', why: 'Without content, the pseudo-element is not generated.' },
    ],
    exam: {
      definition: 'A CSS selector is a pattern used to select the HTML elements to which a set of style rules apply. Pseudo-classes select elements based on their state or position (e.g. :hover, :nth-child()), while pseudo-elements style a specific part of an element or insert generated content (e.g. ::before, ::first-line).',
      points: ['Combinators: descendant (space), child (>), adjacent sibling (+), general sibling (~).', 'Attribute selectors: [attr], [attr="v"], [attr^="v"] (starts with), [attr$="v"] (ends with), [attr*="v"] (contains).', 'Common pseudo-classes: :hover, :active, :focus, :visited, :checked, :disabled, :first-child, :last-child, :nth-child(n), :not().', 'Pseudo-elements: ::before, ::after, ::first-letter, ::first-line, ::selection, ::placeholder, ::marker.', 'Link order rule: :link, :visited, :hover, :active (LoVe HAte).'],
      diff: { title: 'Pseudo-class vs pseudo-element', head: ['Pseudo-class', 'Pseudo-element'], rows: [['Single colon :', 'Double colon ::'], ['Selects a state/position', 'Selects part of an element'], [':hover, :nth-child(2)', '::before, ::first-letter'], ['Whole element styled', 'Generated or partial content']] },
    },
    examQs: [
      { m: 1, q: 'Which symbol is used for an ID selector?', a: '# (hash), e.g. #header.' },
      { m: 2, q: 'Differentiate between descendant and child selectors.', a: 'Descendant (A B) matches B anywhere inside A at any depth; child (A > B) matches only B that is a direct child of A.' },
      { m: 3, q: 'Explain any three attribute selectors with examples.', a: 'a[target] selects links that have a target attribute; input[type="text"] selects text inputs; a[href^="https"] selects links starting with https; img[src$=".png"] selects PNG images.' },
      { m: 5, q: 'Explain pseudo-classes and pseudo-elements with examples.', a: 'Define both, give code for a:hover, input:focus, li:nth-child(even), p::first-letter, .q::before{content:"Q: "}. Show the difference in syntax and purpose.' },
    ],
    practice: ['Make zebra stripes on a list using :nth-child(even).', 'Add a "NEW" label before items with class="new" using ::before.', 'Style only external links using a[href^="http"].'],
    revision: ['p · .class · #id · * · a, b', 'A B descendant, A > B child, A + B next sibling.', '[attr="value"]', ':hover :focus :nth-child()', '::before ::after (need content)'],
    quiz: [
      { q: 'Which selects every <li> that is a direct child of .menu?', o: ['.menu li', '.menu > li', '.menu + li', '.menu ~ li'], a: 1, e: '> = direct child.' },
      { q: 'Which is a pseudo-element?', o: [':hover', ':focus', '::after', ':checked'], a: 2, e: 'Double colon, generates content.' },
      { q: 'li:nth-child(2n) selects…', o: ['First two items', 'Even items', 'Odd items', 'Every 3rd item'], a: 1, e: '2n = 2, 4, 6…' },
      { q: 'What does * select?', o: ['Nothing', 'Only body', 'Every element', 'Only ids'], a: 2, e: 'The universal selector.' },
    ],
  },
  {
    id: 'css-cascade', track: 'css', group: 'Fundamentals', level: 'Elementary', minutes: 14,
    title: 'Cascade, Inheritance & Specificity', syllabus: 'Specificity · Cascading Rules · Inheritance',
    summary: 'Why one rule wins when two rules disagree.',
    definition: 'When several rules target the same element and property, the **cascade** decides the winner using: **importance** (`!important`), then **specificity** (how precise the selector is), then **source order** (later wins). **Inheritance** means some properties (like `color` and `font-family`) pass from parent to children automatically, while others (like `border` and `margin`) do not.',
    why: 'The number one beginner frustration is "my CSS is not working!" — usually because another rule with higher specificity wins. Understanding this saves hours of debugging.',
    analogy: { title: 'Instructions from different people', text: 'Mom says "wear a jacket" (element selector). Your class teacher says "wear the blue jacket" (class). The principal says "student #23 wears the red jacket" (id). The most specific instruction wins. `!important` is a court order — it beats everything, so use it rarely.' },
    syntax: `/* Specificity score = (IDs, classes, elements) */
p            { color: gray; }   /* (0,0,1) */
.intro       { color: blue; }   /* (0,1,0) */
#hero        { color: green; }  /* (1,0,0) */
p.intro      { color: purple; } /* (0,1,1) */
style="color:red"               /* inline beats all selectors */
p { color: black !important; }  /* beats even inline */`,
    lines: [
      ['(0,0,1)', 'Count IDs, then classes/attributes/pseudo-classes, then elements/pseudo-elements.'],
      ['.intro (0,1,0)', 'One class beats any number of element selectors.'],
      ['#hero (1,0,0)', 'One ID beats any number of classes.'],
      ['inline style', 'Wins over every stylesheet selector.'],
      ['!important', 'Overrides normal rules. Hard to undo, so avoid it.'],
    ],
    widget: 'specificity',
    live: { html: `<div class="box">\n  <p id="hero" class="intro">Which colour will I be?</p>\n  <p>I inherit the font from the div.</p>\n</div>`, css: `.box { font-family: Georgia, serif; border: 2px solid #30343B; padding: 8px; }\np { color: gray; }\n.intro { color: #176C97; }\n#hero { color: #357A2B; }\np.intro { color: purple; }\n/* Same specificity → the later one wins */\n.intro { color: #FF8A3D; }` },
    tryThis: ['The first paragraph is green because #hero has the highest specificity. Delete the #hero rule and see which wins next.', 'Notice the border on .box is not inherited by the paragraphs, but the font is.', 'Add !important to the p rule.'],
    mistakes: [
      { wrong: 'Adding !important everywhere to "fix" CSS.', right: 'Use a more specific selector or reorder rules.', why: '!important wars make CSS impossible to maintain.' },
      { wrong: 'Thinking 11 classes beat 1 ID.', right: 'Columns never overflow: 1 ID beats any number of classes.', why: 'Specificity is compared column by column, left to right.' },
    ],
    exam: {
      definition: 'The cascade is the algorithm browsers use to resolve conflicts when multiple CSS declarations apply to the same element, based on origin and importance, specificity, and order of appearance. Specificity is a weight calculated from the selector components (inline, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements). Inheritance is the mechanism by which certain property values pass from parent elements to their children.',
      points: ['Order of precedence: !important > inline style > ID > class/attribute/pseudo-class > element/pseudo-element > universal (0).', 'Equal specificity → the rule declared later wins.', 'Inherited properties: color, font-*, line-height, text-align, visibility, list-style, cursor.', 'Non-inherited: margin, padding, border, background, width, height, display, position.', 'Keywords: inherit, initial, unset, revert.'],
      diff: { title: 'Specificity examples', head: ['Selector', 'Score'], rows: [['li', '0,0,1'], ['ul li a', '0,0,3'], ['.nav a', '0,1,1'], ['a:hover', '0,1,1'], ['#menu .item', '1,1,0']] },
    },
    examQs: [
      { m: 1, q: 'Which has higher specificity: .btn or #submit?', a: '#submit (an ID selector).' },
      { m: 2, q: 'Calculate the specificity of "#nav ul li.active a:hover".', a: '1 ID, 2 class/pseudo-class (.active, :hover), 3 elements (ul, li, a) → (1,2,3).' },
      { m: 3, q: 'What is inheritance in CSS? Name inherited and non-inherited properties.', a: 'Children automatically receive some property values from their parents. Inherited: color, font-family, font-size, line-height, text-align. Not inherited: margin, padding, border, background, width.' },
      { m: 5, q: 'Explain the CSS cascade with an example of conflicting rules.', a: 'Write three rules targeting the same p with different colours (element, class, id) and an inline style; explain the order (importance, specificity, source order) and the final colour; mention !important and inheritance.' },
    ],
    practice: ['Use the specificity calculator on 5 selectors from a real site.', 'Make a rule lose, then win, only by changing its order.'],
    revision: ['!important > inline > id > class > element.', 'Score (ids, classes, elements).', 'Tie → later rule wins.', 'Text properties inherit; box properties do not.'],
    quiz: [
      { q: 'Specificity of .card p?', o: ['0,0,2', '0,1,1', '1,0,1', '0,2,0'], a: 1, e: '1 class + 1 element.' },
      { q: 'Which property is inherited?', o: ['margin', 'border', 'color', 'padding'], a: 2, e: 'Text properties like color inherit.' },
      { q: 'Two rules with equal specificity — which wins?', o: ['The first', 'The last', 'Neither', 'Random'], a: 1, e: 'Source order: later wins.' },
    ],
  },
  {
    id: 'css-colors-type', track: 'css', group: 'Fundamentals', level: 'Beginner', minutes: 14,
    title: 'Colours, Backgrounds & Typography', syllabus: 'Colors · Typography · Fonts · Backgrounds · Gradients · Shadows',
    summary: 'Make text readable and pages beautiful.',
    definition: 'CSS colours can be written as **names** (`tomato`), **hex** (`#FF8A3D`), **rgb/rgba** (`rgb(255 138 61 / 0.5)`) or **hsl** (`hsl(24 100% 62%)`). **Background** properties set colours, images and gradients behind content. **Typography** properties — `font-family`, `font-size`, `font-weight`, `font-style`, `line-height`, `letter-spacing`, `text-align`, `text-transform` — control how text looks.',
    why: 'Colour and type create the personality of a site and, more importantly, readability. Poor line-height or low contrast makes notes painful to read; good typography makes users stay.',
    analogy: { title: 'Writing a poster by hand', text: 'Choosing paper colour is `background`. Choosing a marker colour is `color`. Big letters for the title is `font-size`, thick strokes `font-weight`, space between lines `line-height`, and spreading letters out `letter-spacing`.' },
    syntax: `body {
  font-family: "Inter", Arial, sans-serif;  /* fallback list */
  font-size: 16px;
  line-height: 1.6;
  color: #30343B;
  background: #FFF9EF;
}
h1 {
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
}
.banner {
  background: linear-gradient(135deg, #FFD45C, #FF8A3D);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}`,
    lines: [
      ['font-family: "Inter", Arial, sans-serif;', 'A list: if Inter is not available the browser tries Arial, then any sans-serif font.'],
      ['line-height: 1.6;', 'Space between lines: 1.6 × the font size. 1.5–1.7 is comfortable for reading.'],
      ['color', 'Text colour. (Not font-color!)'],
      ['font-weight: 700;', '100 (thin) to 900 (black). 400 = normal, 700 = bold.'],
      ['text-transform', 'uppercase, lowercase or capitalize without changing the HTML.'],
      ['linear-gradient(…)', 'A smooth blend between colours, used as a background image.'],
      ['box-shadow', 'x-offset, y-offset, blur, colour.'],
    ],
    live: { html: `<div class="banner">\n  <h1>Tech Fest 2026</h1>\n  <p>Coding · Robotics · Design</p>\n</div>\n<p class="body">Google Fonts lets you use beautiful free fonts. Add a &lt;link&gt; in the head, then use the font name in font-family.</p>`, css: `.banner {\n  background: linear-gradient(135deg, #FFD45C, #FF8A3D);\n  padding: 24px;\n  border-radius: 12px;\n  box-shadow: 0 6px 0 #30343B;\n  text-align: center;\n}\nh1 {\n  margin: 0;\n  font-family: Georgia, serif;\n  letter-spacing: 3px;\n  text-transform: uppercase;\n  text-shadow: 2px 2px 0 #fff;\n}\n.body {\n  font-size: 17px;\n  line-height: 1.7;\n  color: hsl(220 10% 30%);\n}` },
    tryThis: ['Change the gradient angle from 135deg to 90deg or "to right".', 'Try rgba(255, 138, 61, 0.3) as the background — the last number is opacity.', 'Change line-height to 1 and then 2.5. Which is easier to read?'],
    mistakes: [
      { wrong: 'font-color: red;', right: 'color: red;', why: 'There is no font-color property.' },
      { wrong: 'font-family: Open Sans;', right: 'font-family: "Open Sans", sans-serif;', why: 'Quote names with spaces and always end with a generic fallback.' },
      { wrong: 'Light grey text on white.', right: 'Check contrast (at least 4.5:1).', why: 'Low contrast fails accessibility guidelines.' },
    ],
    exam: {
      definition: 'CSS colour values specify the colour of text, backgrounds and borders using keywords, hexadecimal, RGB(A) or HSL(A) notation. CSS typography properties control the font family, size, weight, style, spacing and alignment of text.',
      points: ['Hex: #RRGGBB (e.g. #FF0000 = red); short form #F00.', 'rgb(r, g, b) 0–255; rgba adds alpha 0–1 for transparency.', 'hsl(hue 0–360, saturation %, lightness %).', 'Background properties: background-color, background-image, background-repeat, background-position, background-size (cover/contain), background-attachment.', 'Gradients: linear-gradient(), radial-gradient(), conic-gradient().', 'Google Fonts: <link href="https://fonts.googleapis.com/css2?family=Poppins" rel="stylesheet"> then font-family: "Poppins", sans-serif;', 'Generic font families: serif, sans-serif, monospace, cursive, fantasy.'],
      diff: { title: 'Colour formats', head: ['Format', 'Example'], rows: [['Keyword', 'tomato'], ['Hex', '#FF8A3D'], ['RGB(A)', 'rgba(255,138,61,0.5)'], ['HSL', 'hsl(24 100% 62%)']] },
    },
    examQs: [
      { m: 1, q: 'Which property changes text colour?', a: 'color' },
      { m: 2, q: 'What is the difference between rgb() and rgba()?', a: 'rgba() has a fourth alpha value (0 = fully transparent, 1 = opaque) to control transparency.' },
      { m: 3, q: 'Explain any five background properties.', a: 'background-color sets colour; background-image sets an image/gradient; background-repeat controls tiling; background-position sets placement; background-size (cover/contain) scales the image.' },
      { m: 5, q: 'Explain CSS font properties with examples. How do you use Google Fonts?', a: 'font-family with fallback, font-size, font-weight, font-style, line-height, letter-spacing, text-align, text-transform, text-decoration. Google Fonts: include <link> in head, then reference the family name in font-family.' },
    ],
    practice: ['Style an event poster with a gradient background and a Google Font.', 'Create three buttons with the same colour in hex, rgb and hsl.'],
    revision: ['color = text, background = behind.', 'hex, rgb(a), hsl(a).', 'font-family with fallbacks.', 'line-height ~1.6 for body text.', 'linear-gradient(angle, c1, c2).'],
    quiz: [
      { q: 'What does the alpha in rgba control?', o: ['Brightness', 'Transparency', 'Hue', 'Blur'], a: 1, e: 'Alpha is opacity.' },
      { q: '#FFFFFF is…', o: ['Black', 'White', 'Red', 'Grey'], a: 1, e: 'All channels at max.' },
      { q: 'Which value makes a background image cover the whole box?', o: ['background-size: contain', 'background-size: cover', 'background-repeat: fill', 'background: full'], a: 1, e: 'cover fills and crops.' },
    ],
  },
  {
    id: 'css-units', track: 'css', group: 'Fundamentals', level: 'Elementary', minutes: 10,
    title: 'CSS Units & Variables', syllabus: 'Units · Variables',
    summary: 'px, %, em, rem, vw, vh — and reusable custom properties.',
    definition: '**Absolute units** like `px` are fixed sizes. **Relative units** scale with something else: `%` (the parent), `em` (the element\'s own font size), `rem` (the root `<html>` font size), `vw`/`vh` (1% of the viewport width/height). **CSS variables** (custom properties) store values for reuse: `--brand: #FF8A3D;` and `color: var(--brand);`.',
    why: 'Relative units make layouts adapt to screen sizes and user font settings. Variables mean changing the theme colour in one place instead of 60.',
    analogy: { title: 'Measuring with your hand', text: '`px` is a ruler: always the same. `%` is "half of the table". `em` is "the width of my thumb" — different for each person. `vw` is "10% of the room\'s width".' },
    syntax: `:root {
  --brand: #FF8A3D;
  --space: 16px;
}
html { font-size: 16px; }   /* 1rem = 16px */
.card {
  width: 50%;               /* half of parent */
  padding: var(--space);
  font-size: 1.25rem;       /* 20px */
  border: 2px solid var(--brand);
}
.hero { height: 60vh; }     /* 60% of screen height */`,
    lines: [
      [':root', 'Selects the <html> element. Variables declared here are available everywhere.'],
      ['--brand', 'A custom property must start with two dashes.'],
      ['var(--space)', 'Reads the variable value.'],
      ['1.25rem', '1.25 × root font size = 20px.'],
      ['60vh', '60% of the viewport (visible screen) height.'],
    ],
    live: { html: `<div class="parent">\n  <div class="half">width: 50%</div>\n  <p class="em">font-size: 1.5em</p>\n  <p class="rem">font-size: 1.5rem</p>\n</div>\n<div class="vw">width: 50vw</div>`, css: `:root { --brand: #FF8A3D; --soft: #FFE3CF; }\n.parent { font-size: 20px; border: 2px solid var(--brand); padding: 8px; }\n.half { width: 50%; background: var(--soft); }\n.em  { font-size: 1.5em; margin: 4px 0; }  /* 1.5 × 20px = 30px */\n.rem { font-size: 1.5rem; margin: 4px 0; } /* 1.5 × 16px = 24px */\n.vw  { width: 50vw; background: #DDF1FB; margin-top: 8px; }` },
    tryThis: ['Change --brand to #55B9E8 and watch every use update.', 'Change .parent font-size to 30px: the em text grows, the rem text does not.'],
    mistakes: [
      { wrong: 'Nested em sizes growing out of control.', right: 'Use rem for font sizes.', why: 'em multiplies at each nesting level.' },
      { wrong: 'var(brand)', right: 'var(--brand)', why: 'The two dashes are part of the name.' },
    ],
    exam: {
      definition: 'CSS units specify lengths. Absolute units (px, cm, mm, in, pt) have fixed sizes, while relative units (%, em, rem, vw, vh, vmin, vmax, ch) are calculated relative to another value. CSS custom properties (variables) are user-defined properties beginning with -- whose values are read with the var() function.',
      points: ['1rem = font-size of html (default 16px).', '1em = font-size of the current element (for font-size: the parent).', '% for width is relative to the parent width.', 'vw/vh relative to viewport size.', 'Variables cascade and can be redefined inside selectors or media queries.', 'var(--x, fallback) provides a default.'],
      diff: { title: 'em vs rem', head: ['em', 'rem'], rows: [['Relative to element/parent font size', 'Relative to root (html) font size'], ['Compounds when nested', 'Consistent everywhere'], ['Good for component-relative spacing', 'Good for font sizes, layout']] },
    },
    examQs: [
      { m: 1, q: 'If html font-size is 16px, what is 2rem?', a: '32px.' },
      { m: 2, q: 'Differentiate between em and rem.', a: 'em is relative to the font size of the element (or parent for font-size) and compounds when nested; rem is always relative to the root html font size.' },
      { m: 3, q: 'What are CSS variables? Write an example.', a: 'Custom properties declared with -- (e.g. :root { --main: #333; }) and used with var(--main). They make themes and repeated values easy to maintain.' },
    ],
    practice: ['Define 3 colour variables and build a card using only them.', 'Make a full-screen hero section using 100vh.'],
    revision: ['px fixed; %, em, rem, vw, vh relative.', 'rem = root font size.', '--name: value; var(--name).'],
    quiz: [
      { q: '50vw means…', o: ['50px', '50% of parent', '50% of viewport width', '50 em'], a: 2, e: 'vw = viewport width.' },
      { q: 'How do you read a variable --gap?', o: ['$gap', 'var(gap)', 'var(--gap)', '--gap()'], a: 2, e: 'var(--gap)' },
    ],
  },
  {
    id: 'css-box-model', track: 'css', group: 'Box Model', level: 'Beginner', minutes: 16,
    title: 'The CSS Box Model', syllabus: 'CSS Box Model · Width and height · Margin · Padding · Borders · Border radius · Content-box vs border-box',
    summary: 'Every element is a box: content, padding, border and margin.',
    definition: 'Every HTML element is drawn as a rectangular **box** made of four layers: the **content** (text/images), **padding** (space inside the border), the **border**, and **margin** (space outside the border separating it from other elements). `box-sizing` decides whether `width` includes padding and border (`border-box`) or only the content (`content-box`, the default).',
    why: 'Spacing, sizes and alignment on every website come from the box model. When an element is "20px too wide" or "won\'t line up", the box model is almost always the reason.',
    analogy: { title: 'A framed photo on a wall', text: 'The **photo** is the content. The white **mount** around the photo is padding. The wooden **frame** is the border. The empty **wall space** between this frame and the next is the margin.' },
    syntax: `.box {
  width: 200px;
  height: 100px;
  padding: 20px;              /* inside the border */
  border: 4px solid #30343B;
  margin: 16px;               /* outside the border */
  border-radius: 12px;        /* rounded corners */
  box-sizing: border-box;     /* width includes padding + border */
}
/* Shorthand order: top right bottom left (clockwise) */
margin: 10px 20px 30px 40px;
margin: 10px 20px;  /* top/bottom 10, left/right 20 */`,
    lines: [
      ['width / height', 'Size of the content area (in content-box mode).'],
      ['padding: 20px;', 'Space between content and border. The background colour fills it.'],
      ['border: 4px solid #30343B;', 'width, style (solid, dashed, dotted), colour.'],
      ['margin: 16px;', 'Transparent space outside the border.'],
      ['border-radius', 'Rounds the corners. 50% on a square makes a circle.'],
      ['box-sizing: border-box;', 'Makes width = content + padding + border. Much easier to work with.'],
      ['10px 20px 30px 40px', 'Clockwise from the top: top, right, bottom, left.'],
    ],
    live: { html: `<div class="box content-box">content-box</div>\n<div class="box border-box">border-box</div>`, css: `.box {\n  width: 200px;\n  padding: 20px;\n  border: 6px solid #30343B;\n  margin: 12px;\n  background: #DDF1FB;\n  border-radius: 10px;\n}\n.content-box { box-sizing: content-box; } /* total width 252px */\n.border-box { box-sizing: border-box; background: #FFE3CF; } /* total width 200px */` },
    experiment: { lab: 'box-model', text: 'Adjust margin, border and padding with sliders in the Box Model Explorer and watch the diagram and real element update together.' },
    tryThis: ['Compare the two boxes: same width value, different total size. Why? (padding + border are added in content-box.)', 'Set padding to 0 on one box.', 'Make a circle: equal width/height and border-radius: 50%.'],
    mistakes: [
      { wrong: 'Expecting width: 100% + padding to fit the parent.', right: 'Use box-sizing: border-box.', why: 'In content-box, padding is added on top of 100%, causing overflow.' },
      { wrong: 'Using padding to separate two cards.', right: 'Use margin (or gap) between elements.', why: 'Padding is inside; it grows the coloured area.' },
      { wrong: 'Being confused when vertical margins don\'t add up.', right: 'Learn margin collapsing.', why: 'Vertical margins of adjacent blocks collapse into the larger one (20px + 30px = 30px gap).' },
    ],
    exam: {
      definition: 'The CSS box model describes the rectangular boxes generated for elements, each consisting of content, padding, border and margin areas. The box-sizing property determines whether the specified width and height include only the content (content-box) or also padding and border (border-box).',
      points: ['Total width (content-box) = width + padding-left + padding-right + border-left + border-right (+ margins for space taken).', 'border-box: total width = width (padding and border are inside it).', 'Shorthand order: top, right, bottom, left (TRBL — "trouble").', 'Margin collapsing: adjacent vertical margins merge into the larger one.', 'margin: 0 auto centres a block with a set width.', 'Negative margins are allowed; negative padding is not.'],
      diff: { title: 'Margin vs Padding', head: ['Margin', 'Padding'], rows: [['Outside the border', 'Inside the border'], ['Transparent', 'Shows background colour'], ['Can be negative', 'Cannot be negative'], ['Vertical margins can collapse', 'Never collapses'], ['Spaces elements apart', 'Spaces content from its edge']] },
      diagram: 'box-model',
    },
    examQs: [
      { m: 1, q: 'Which box model layer is transparent and outside the border?', a: 'Margin.' },
      { m: 2, q: 'An element has width 300px, padding 20px and border 5px with content-box. What is its total rendered width?', a: '300 + 2×20 + 2×5 = 350px.' },
      { m: 3, q: 'Differentiate between content-box and border-box.', a: 'content-box (default): width/height apply to content only; padding and border add to the size. border-box: width/height include content, padding and border, so the box stays the specified size.' },
      { m: 5, q: 'Explain the CSS box model with a neat labelled diagram.', a: 'Draw nested rectangles: content (centre), padding, border, margin; label each; explain properties, shorthand TRBL, total size formula, box-sizing, margin collapsing; give an example rule.' },
    ],
    practice: ['Create a profile card 300px wide with 24px padding that stays exactly 300px.', 'Centre a 600px container on the page with margin.', 'Create a circular avatar.'],
    revision: ['content → padding → border → margin.', 'TRBL clockwise shorthand.', 'border-box keeps width honest.', 'margin: 0 auto centres blocks.', 'Vertical margins collapse.'],
    quiz: [
      { q: 'Padding is located…', o: ['Outside the border', 'Between content and border', 'Outside the margin', 'Inside the content'], a: 1, e: 'Padding sits between content and border.' },
      { q: 'margin: 10px 20px; sets…', o: ['top 10, others 20', 'top/bottom 10, left/right 20', 'left 10, right 20', 'all 30'], a: 1, e: 'Two values = vertical, horizontal.' },
      { q: 'With border-box, width: 200px, padding: 20px — the content width is…', o: ['200px', '240px', '160px', '180px'], a: 2, e: '200 − 40 = 160px (no border).' },
      { q: 'Which can be negative?', o: ['padding', 'margin', 'border-width', 'none'], a: 1, e: 'Negative margins are allowed.' },
    ],
  },
  {
    id: 'css-display', track: 'css', group: 'Box Model', level: 'Elementary', minutes: 12,
    title: 'Display Property', syllabus: 'Display Properties · Block, inline and inline-block · None vs visibility hidden',
    summary: 'block, inline, inline-block, flex, grid and none.',
    definition: 'The `display` property decides how an element\'s box behaves in the layout. **block** takes the full width and starts on a new line; **inline** flows inside text and ignores width/height; **inline-block** flows inline but accepts width/height; **flex** and **grid** turn the element into a layout container for its children; **none** removes it completely. `visibility: hidden` hides an element but keeps its space.',
    why: 'Turning a vertical list of links into a horizontal menu, making buttons sit side by side, or hiding a mobile menu — all are display changes.',
    analogy: { title: 'People in a queue', text: 'block people insist on standing alone in their own row. inline people squeeze together in one row like words in a sentence. inline-block people stand in the row but each holds a box of a fixed size. display: none means the person left the queue; visibility: hidden means they are invisible but still taking up their spot.' },
    syntax: `span.badge { display: inline-block; width: 80px; }
nav li     { display: inline; }
.menu      { display: flex; }
.mobile    { display: none; }      /* removed, no space */
.ghost     { visibility: hidden; } /* invisible, keeps space */`,
    lines: [
      ['inline-block', 'Sits in a line, but width/height/vertical padding work.'],
      ['display: inline', 'Width and height are ignored for non-replaced inline elements.'],
      ['display: flex', 'Children become flex items laid out in a row by default.'],
      ['display: none', 'Element is removed from the layout and from screen readers.'],
      ['visibility: hidden', 'Element is invisible but its box still occupies space.'],
    ],
    live: { html: `<p>A <span class="pill">span</span> and another <span class="pill">span</span> in a sentence.</p>\n<div class="row">\n  <div class="item">1</div><div class="item hide">2</div><div class="item">3</div>\n</div>`, css: `.pill { display: inline-block; width: 70px; padding: 4px; background: #FFE3CF; text-align: center; border-radius: 99px; }\n.row { border: 2px dashed #55B9E8; }\n.item { display: inline-block; width: 60px; height: 40px; background: #78C86A; margin: 4px; }\n.hide { visibility: hidden; }  /* try display: none */` },
    experiment: { lab: 'display', text: 'Switch between block, inline, inline-block, flex, grid and none in the Display Playground.' },
    tryThis: ['Change .pill display to inline — the width stops working.', 'Swap visibility: hidden for display: none and watch the gap close.'],
    mistakes: [
      { wrong: 'Setting width on a <span> and nothing happens.', right: 'Make it inline-block or block.', why: 'Inline elements ignore width and height.' },
      { wrong: 'Using opacity: 0 to hide a menu.', right: 'Use display: none (or visibility: hidden).', why: 'An opacity: 0 element is still clickable and readable by screen readers.' },
    ],
    exam: {
      definition: 'The display property specifies the display behaviour (the type of rendering box) of an element, such as block, inline, inline-block, flex, grid or none.',
      points: ['block: new line, full width, respects width/height/margin/padding.', 'inline: no new line, width/height ignored, vertical margins do not push lines.', 'inline-block: inline flow + box dimensions.', 'none vs visibility:hidden vs opacity:0 — removed / hidden with space / transparent but interactive.'],
      diff: { title: 'display: none vs visibility: hidden', head: ['display: none', 'visibility: hidden'], rows: [['Removed from layout', 'Still occupies space'], ['Not rendered', 'Rendered invisibly'], ['Neighbours move up', 'Neighbours stay'], ['Not read by screen readers', 'Not read by screen readers']] },
    },
    examQs: [
      { m: 1, q: 'Which display value lets an inline element accept width?', a: 'inline-block' },
      { m: 2, q: 'Differentiate display:none and visibility:hidden.', a: 'display:none removes the element and its space from layout; visibility:hidden hides it but keeps its space.' },
      { m: 5, q: 'Explain block, inline and inline-block with examples and a diagram.', a: 'Describe each with default elements (div/p, span/a, button/img), sketch how boxes flow, list which box properties work, and give a use case (navigation buttons with inline-block).' },
    ],
    practice: ['Turn a vertical <ul> of links into a horizontal menu.', 'Hide an element on button click using JS + display.'],
    revision: ['block = own line; inline = in text; inline-block = in text with size.', 'none = gone; hidden = invisible but keeps space.'],
    quiz: [
      { q: 'Default display of <div>?', o: ['inline', 'block', 'flex', 'inline-block'], a: 1, e: 'div is block.' },
      { q: 'Which keeps the element\'s space?', o: ['display: none', 'visibility: hidden', 'Both', 'Neither'], a: 1, e: 'visibility: hidden keeps the space.' },
    ],
  },
  {
    id: 'css-position', track: 'css', group: 'Positioning', level: 'Intermediate', minutes: 18,
    title: 'CSS Positioning', syllabus: 'Positioning Techniques · Static, relative, absolute, fixed and sticky',
    summary: 'Move elements exactly where you want them.',
    definition: 'The `position` property controls how an element is placed. **static** (default) follows normal flow. **relative** shifts the element from where it would normally be, keeping its original space. **absolute** removes it from the flow and places it relative to the nearest *positioned* ancestor. **fixed** places it relative to the browser window, so it stays put while scrolling. **sticky** behaves normally until you scroll past a threshold, then sticks. The offsets `top`, `right`, `bottom` and `left` say where.',
    why: 'Sticky headers, "SALE" badges on product cards, WhatsApp chat buttons in the corner, dropdown menus and tooltips all rely on positioning.',
    analogy: { title: 'Furniture in a room', text: '**Static**: furniture where the movers left it. **Relative**: you nudge the chair 20cm — its old spot stays empty. **Absolute**: a sticker on a specific cupboard, measured from that cupboard\'s corner. **Fixed**: a poster glued to your glasses — wherever you look, it is in the same place. **Sticky**: a note that moves with the page until it hits the top edge, then sticks there.' },
    syntax: `.card  { position: relative; }        /* becomes the reference */
.badge { position: absolute; top: 8px; right: 8px; }
.chat  { position: fixed; bottom: 20px; right: 20px; }
nav    { position: sticky; top: 0; }
.nudge { position: relative; left: 20px; top: 10px; }`,
    lines: [
      ['.card { position: relative; }', 'Gives the card a "positioned" status so absolute children measure from it.'],
      ['.badge { position: absolute; top: 8px; right: 8px; }', 'Pins the badge 8px from the top-right corner of the card.'],
      ['.chat { position: fixed; … }', 'Stays in the bottom-right of the screen even while scrolling.'],
      ['nav { position: sticky; top: 0; }', 'Scrolls normally, then sticks at the top. Needs a top/bottom value.'],
      ['left: 20px', 'For relative: moves it 20px to the RIGHT (away from the left edge).'],
    ],
    live: { html: `<div class="card">\n  <span class="badge">-40%</span>\n  <h3>Running Shoes</h3>\n  <p>₹1,799</p>\n</div>\n<p class="nudge">I am relatively nudged.</p>\n<button class="chat">💬</button>`, css: `.card { position: relative; width: 200px; border: 2px solid #30343B; border-radius: 12px; padding: 12px; }\n.badge { position: absolute; top: -10px; right: -10px; background: #F48FB1; padding: 4px 8px; border-radius: 99px; font-weight: bold; border: 2px solid #30343B; }\n.nudge { position: relative; left: 30px; background: #FFF3CC; }\n.chat { position: fixed; right: 16px; bottom: 16px; width: 52px; height: 52px; border-radius: 50%; background: #78C86A; border: 2px solid #30343B; font-size: 22px; }` },
    experiment: { lab: 'positioning', text: 'Drag elements and switch between all five modes in the Positioning Playground.' },
    tryThis: ['Remove position: relative from .card — the badge jumps to the corner of the whole page.', 'Change the badge to top: 50%.', 'Change .nudge left to -30px.'],
    mistakes: [
      { wrong: 'Absolute element flying to the page corner.', right: 'Give the parent position: relative.', why: 'Absolute looks for the nearest positioned ancestor; if none, it uses the page.' },
      { wrong: 'Sticky not sticking.', right: 'Add top: 0 and make sure no ancestor has overflow: hidden.', why: 'Sticky needs a threshold and a scrolling ancestor.' },
      { wrong: 'Positioning everything absolutely for layout.', right: 'Use Flexbox/Grid for layout; absolute for overlays and badges.', why: 'Absolute elements ignore each other and break on different screen sizes.' },
    ],
    exam: {
      definition: 'The CSS position property specifies the positioning method of an element — static, relative, absolute, fixed or sticky — and, together with the offset properties top, right, bottom and left, determines its final location.',
      points: ['static: default, offsets have no effect.', 'relative: offset from its normal position; original space preserved; creates a containing block for absolute children.', 'absolute: removed from normal flow; positioned relative to nearest positioned ancestor (non-static); otherwise the initial containing block.', 'fixed: relative to the viewport; does not move on scroll (unless an ancestor has a transform).', 'sticky: hybrid of relative and fixed based on scroll position within its parent.', 'Positioned elements can use z-index.'],
      diff: { title: 'relative vs absolute', head: ['relative', 'absolute'], rows: [['Stays in normal flow', 'Removed from normal flow'], ['Offset from its own normal position', 'Offset from nearest positioned ancestor'], ['Original space kept', 'Space collapses'], ['Often used as a container', 'Used for badges, tooltips, overlays']] },
      diagram: 'positions',
    },
    examQs: [
      { m: 1, q: 'Which position value keeps an element visible while scrolling?', a: 'fixed (or sticky after its threshold).' },
      { m: 2, q: 'What is a "positioned ancestor"?', a: 'The nearest ancestor whose position is anything other than static; absolute children are positioned relative to it.' },
      { m: 3, q: 'Differentiate between fixed and sticky positioning.', a: 'fixed is always relative to the viewport and removed from flow; sticky stays in normal flow and becomes fixed only when the scroll reaches the given threshold, within its parent.' },
      { m: 5, q: 'Explain all five CSS position values with examples.', a: 'Describe static, relative, absolute, fixed, sticky with code and real use cases (nudge, badge on card, floating chat button, sticky navbar); explain flow and reference point for each.' },
      { m: 10, q: 'Design a product card with a discount badge, a sticky header and a floating help button. Explain the positioning used.', a: 'Write HTML/CSS: header position:sticky; top:0; card position:relative with badge absolute top/right; help button fixed bottom/right; explain z-index usage, containing blocks and why Flexbox is used for the card grid.' },
    ],
    practice: ['Build a sticky navbar on a long page.', 'Add a "NEW" ribbon to the corner of an image card.', 'Centre a modal box with absolute + transform: translate(-50%, -50%).'],
    revision: ['static default · relative nudges · absolute pins to positioned parent · fixed to screen · sticky sticks on scroll.', 'Absolute needs a relative parent.', 'Sticky needs top.'],
    quiz: [
      { q: 'An absolute element with no positioned ancestor is placed relative to…', o: ['Its parent', 'The initial containing block (page)', 'The previous sibling', 'Nothing'], a: 1, e: 'Falls back to the initial containing block.' },
      { q: 'Which keeps the original space empty after moving?', o: ['relative', 'absolute', 'fixed', 'none of these'], a: 0, e: 'Relative keeps its place in flow.' },
      { q: 'A WhatsApp button always at the bottom-right uses…', o: ['sticky', 'absolute', 'fixed', 'static'], a: 2, e: 'Fixed to the viewport.' },
      { q: 'position: sticky requires…', o: ['z-index', 'a threshold such as top: 0', 'display: flex', 'float'], a: 1, e: 'It needs to know where to stick.' },
    ],
  },
  {
    id: 'css-zindex-overflow', track: 'css', group: 'Positioning', level: 'Intermediate', minutes: 14,
    title: 'z-index, Stacking, Overflow & Float', syllabus: 'Layering using z-index · Overflow Management · Float and clear',
    summary: 'Control which element is on top, what happens to extra content, and how floats work.',
    definition: '`z-index` sets the stacking order of **positioned** elements: higher numbers appear on top. A **stacking context** is a group that is layered as a single unit — children can never escape their parent\'s layer. `overflow` decides what happens when content is bigger than its box: `visible`, `hidden`, `scroll` or `auto`. `float` pushes an element to the left or right so text wraps around it; `clear` stops that wrapping.',
    why: 'Dropdowns hidden behind other elements, modals that are not on top, scrollable chat boxes, and text wrapping around a photo in a news article all need these properties.',
    analogy: { title: 'Sheets of paper on a desk', text: 'z-index is which paper is on top of the pile. A stacking context is a folder: even if one paper inside the folder says "I am number 999", the folder itself sits wherever the folder is in the pile.' },
    syntax: `.modal   { position: fixed; z-index: 100; }
.dropdown{ position: absolute; z-index: 10; }
.chatbox { height: 200px; overflow-y: auto; }
.photo   { float: left; margin-right: 12px; }
.footer  { clear: both; }`,
    lines: [
      ['z-index: 100', 'Only works on positioned elements (or flex/grid items).'],
      ['overflow-y: auto', 'Adds a vertical scrollbar only when needed.'],
      ['float: left', 'Element moves to the left; following text wraps on the right.'],
      ['clear: both', 'This element moves below any floated elements.'],
    ],
    live: { html: `<div class="stack">\n  <div class="a">A z:1</div>\n  <div class="b">B z:3</div>\n  <div class="c">C z:2</div>\n</div>\n<div class="scroll">Lorem ipsum dolor sit amet. Each new line makes this box overflow. Scroll me! Content keeps going and going and going so you can see overflow: auto in action. More text. Even more text.</div>\n<p><span class="float">FLOAT</span>This text wraps around a floated box just like a newspaper wraps text around a photo. Keep reading and you will see the text flow beside and then under it.</p>`, css: `.stack { position: relative; height: 120px; }\n.stack div { position: absolute; width: 90px; height: 70px; border: 2px solid #30343B; font-weight: bold; padding: 4px; }\n.a { background: #FF8A3D; left: 0; top: 0; z-index: 1; }\n.b { background: #55B9E8; left: 40px; top: 25px; z-index: 3; }\n.c { background: #78C86A; left: 80px; top: 50px; z-index: 2; }\n.scroll { height: 70px; overflow: auto; border: 2px solid #30343B; padding: 6px; margin: 8px 0; }\n.float { float: left; width: 70px; height: 50px; background: #FFD45C; margin-right: 8px; display: grid; place-items: center; }` },
    experiment: { lab: 'z-index', text: 'Use the z-index Laboratory to raise and lower boxes and see stacking contexts in action.' },
    tryThis: ['Change C to z-index: 5 to bring it to the front.', 'Change overflow: auto to hidden — the extra text is cut off.'],
    mistakes: [
      { wrong: 'z-index: 9999 on a static element.', right: 'Add position: relative (or any non-static).', why: 'z-index has no effect on static elements (except flex/grid items).' },
      { wrong: 'Child with z-index 999 still behind another element.', right: 'Check the parent\'s stacking context.', why: 'An opacity < 1, transform, or a z-index on a positioned parent traps children inside its layer.' },
      { wrong: 'Parent collapses to zero height when children float.', right: 'Use display: flow-root on the parent (or a clearfix).', why: 'Floats are taken out of normal flow.' },
    ],
    exam: {
      definition: 'z-index specifies the stack order of positioned elements along the z-axis; a stacking context is a three-dimensional grouping of elements that is painted as a single unit. The overflow property controls what happens when content exceeds its container. float places an element on the left or right side of its container allowing inline content to wrap around it, and clear specifies sides on which floats are not allowed.',
      points: ['Stacking contexts are created by: root, positioned element with z-index, opacity < 1, transform, filter, position fixed/sticky, flex/grid items with z-index.', 'overflow values: visible (default), hidden, scroll, auto, clip; overflow-x and overflow-y separately.', 'text-overflow: ellipsis needs white-space: nowrap and overflow: hidden.', 'float values: left, right, none; clear: left, right, both.', 'Modern layouts use Flexbox/Grid instead of floats.'],
      diff: { title: 'overflow values', head: ['Value', 'Effect'], rows: [['visible', 'Content spills out'], ['hidden', 'Content clipped'], ['scroll', 'Scrollbars always'], ['auto', 'Scrollbars only when needed']] },
    },
    examQs: [
      { m: 1, q: 'On which elements does z-index work?', a: 'Positioned elements (relative, absolute, fixed, sticky) and flex/grid items.' },
      { m: 2, q: 'Differentiate overflow: scroll and overflow: auto.', a: 'scroll always shows scrollbars; auto shows them only when content overflows.' },
      { m: 3, q: 'What is a stacking context? Name three ways to create one.', a: 'A group of elements layered together as one unit, so children\'s z-index is relative to it. Created by a positioned element with z-index, opacity less than 1, transform, or position: fixed.' },
    ],
    practice: ['Build a modal that appears above everything.', 'Truncate a long title with "…".', 'Wrap text around a floated image.'],
    revision: ['z-index needs position.', 'Stacking contexts trap children.', 'overflow: visible | hidden | scroll | auto.', 'float + clear; prefer flex/grid.'],
    quiz: [
      { q: 'Higher z-index means…', o: ['Further back', 'On top', 'Bigger', 'More transparent'], a: 1, e: 'Higher = closer to the viewer.' },
      { q: 'Which shows scrollbars only when needed?', o: ['scroll', 'auto', 'visible', 'clip'], a: 1, e: 'auto.' },
      { q: 'Which creates a new stacking context?', o: ['color: red', 'opacity: 0.9', 'margin: 0', 'display: block'], a: 1, e: 'opacity below 1.' },
    ],
  },
  {
    id: 'css-flexbox', track: 'css', group: 'Flexbox', level: 'Intermediate', minutes: 20,
    title: 'Flexbox Layout', syllabus: 'Flexbox Layout System · Alignment Techniques',
    summary: 'Arrange items in a row or column, with easy alignment and spacing.',
    definition: '**Flexbox** is a one-dimensional layout system. Setting `display: flex` on a **container** makes its direct children **flex items**, laid out along a **main axis** (a row by default) and a **cross axis** (perpendicular). Container properties like `justify-content` (main axis), `align-items` (cross axis), `flex-direction`, `flex-wrap` and `gap` arrange the items; item properties `flex-grow`, `flex-shrink` and `flex-basis` decide how they share space.',
    why: 'Navbars, centring things, button groups, card rows, sidebars and footers — Flexbox makes these layouts a few lines of CSS. "How do I centre a div?" is answered with three Flexbox lines.',
    analogy: { title: 'Books on a shelf', text: 'The shelf is the flex container, books are items. `flex-direction` is whether the shelf is horizontal or a vertical stack. `justify-content` is pushing books to the left, right, centre, or spreading them evenly. `align-items` is whether books stand at the top or bottom of the shelf. `flex-grow` lets some books "puff up" to fill empty space.' },
    syntax: `.container {
  display: flex;
  flex-direction: row;          /* row | column | row-reverse | column-reverse */
  justify-content: space-between; /* main axis */
  align-items: center;          /* cross axis */
  flex-wrap: wrap;              /* allow new lines */
  gap: 16px;
}
.item { flex: 1 1 200px; }       /* grow shrink basis */

/* Perfect centring */
.center { display: flex; justify-content: center; align-items: center; }`,
    lines: [
      ['display: flex', 'Turns on Flexbox for the children of this element.'],
      ['flex-direction', 'Sets the main axis. column stacks items vertically.'],
      ['justify-content', 'Distributes items along the main axis: flex-start, center, flex-end, space-between, space-around, space-evenly.'],
      ['align-items', 'Aligns items on the cross axis: stretch (default), center, flex-start, flex-end, baseline.'],
      ['flex-wrap: wrap', 'Lets items move to a new line instead of shrinking forever.'],
      ['gap', 'Space between items — no margin hacks needed.'],
      ['flex: 1 1 200px', 'Shorthand: grow factor 1, shrink factor 1, starting size 200px.'],
    ],
    live: { html: `<nav class="bar">\n  <strong>CodePlay</strong>\n  <div class="links"><a>Home</a><a>Courses</a><a>Login</a></div>\n</nav>\n<div class="cards">\n  <div>Card 1</div><div>Card 2</div><div>Card 3</div>\n</div>\n<div class="center">Perfectly centred</div>`, css: `.bar { display: flex; justify-content: space-between; align-items: center; background: #FFF3CC; padding: 10px; border-radius: 10px; }\n.links { display: flex; gap: 12px; }\n.cards { display: flex; gap: 10px; margin: 10px 0; flex-wrap: wrap; }\n.cards div { flex: 1 1 120px; background: #DDF1FB; padding: 18px; border: 2px solid #30343B; border-radius: 8px; }\n.center { display: flex; justify-content: center; align-items: center; height: 90px; background: #E2F4DE; border-radius: 10px; }` },
    experiment: { lab: 'flexbox', text: 'Experiment with every container and item property in the Flexbox Playground.' },
    tryThis: ['Change .bar justify-content to center or space-around.', 'Set flex-direction: column on .cards.', 'Give the second card flex-grow: 3 by adding .cards div:nth-child(2) { flex-grow: 3; }.'],
    mistakes: [
      { wrong: 'Putting display: flex on the items.', right: 'Put it on the parent container.', why: 'Flex properties like justify-content belong to the container.' },
      { wrong: 'Using justify-content to centre vertically in a row.', right: 'Use align-items for the cross axis.', why: 'In a row, the main axis is horizontal.' },
      { wrong: 'Axes "swap" confusion with flex-direction: column.', right: 'Remember justify = main axis, align = cross axis.', why: 'With column, justify-content works vertically.' },
    ],
    exam: {
      definition: 'Flexbox (Flexible Box Layout) is a one-dimensional CSS layout model that arranges items in rows or columns within a flex container, distributing space and aligning items along a main axis and a cross axis.',
      points: ['Container properties: display:flex, flex-direction, flex-wrap, flex-flow, justify-content, align-items, align-content, gap.', 'Item properties: order, flex-grow, flex-shrink, flex-basis, flex (shorthand), align-self.', 'Main axis set by flex-direction; cross axis is perpendicular.', 'align-content aligns multiple lines (only when wrapping).', 'Common patterns: navbar, centring, equal-height cards, sticky footer.'],
      diff: { title: 'justify-content vs align-items', head: ['justify-content', 'align-items'], rows: [['Main axis', 'Cross axis'], ['Horizontal in a row', 'Vertical in a row'], ['space-between, space-around…', 'stretch, baseline…']] },
      diagram: 'flex-axes',
    },
    examQs: [
      { m: 1, q: 'Which property changes the main axis in Flexbox?', a: 'flex-direction' },
      { m: 2, q: 'Write CSS to centre a child both horizontally and vertically using Flexbox.', a: '.parent { display: flex; justify-content: center; align-items: center; height: 300px; }' },
      { m: 3, q: 'Explain flex-grow, flex-shrink and flex-basis.', a: 'flex-basis is the starting size before free space is distributed; flex-grow is the share of extra space an item takes; flex-shrink is how much it shrinks when space is short. Shorthand flex: 1 1 200px.' },
      { m: 5, q: 'Explain the main container properties of Flexbox with examples.', a: 'Describe display:flex, flex-direction, flex-wrap, justify-content (all values), align-items, align-content, gap with small code and diagrams.' },
      { m: 10, q: 'Design a responsive navigation bar and a row of three cards using Flexbox. Explain the main and cross axis.', a: 'Write HTML/CSS: nav with logo and links using space-between/center; cards with flex-wrap and flex: 1 1 250px; media query switching nav to column. Draw axes diagram and explain behaviour.' },
    ],
    practice: ['Build a navbar with the logo on the left and links on the right.', 'Make three equal-height pricing cards that wrap on mobile.', 'Create a sticky footer layout with flex-direction: column.'],
    revision: ['Parent: display:flex.', 'justify = main, align = cross.', 'direction, wrap, gap.', 'flex: grow shrink basis.', 'Centre: justify-content + align-items center.'],
    quiz: [
      { q: 'Which value places equal space between items with none at the edges?', o: ['space-around', 'space-evenly', 'space-between', 'center'], a: 2, e: 'space-between.' },
      { q: 'Default flex-direction?', o: ['column', 'row', 'row-reverse', 'wrap'], a: 1, e: 'row.' },
      { q: 'align-items works along…', o: ['Main axis', 'Cross axis', 'z-axis', 'Both'], a: 1, e: 'Cross axis.' },
      { q: 'flex: 2 on one item and flex: 1 on another means…', o: ['Same size', 'First gets twice the free space', 'First is 2px', 'Second grows more'], a: 1, e: 'Grow factor 2 vs 1.' },
    ],
  },
  {
    id: 'css-grid', track: 'css', group: 'Grid', level: 'Intermediate', minutes: 18,
    title: 'CSS Grid Layout', syllabus: 'CSS Grid Layout System · Grid rows and columns · Gap · Grid and Flexbox Integration · Layout Composition',
    summary: 'Two-dimensional layouts with rows and columns.',
    definition: '**CSS Grid** is a two-dimensional layout system: you define **columns and rows** on a container, and items are placed into the resulting **cells**. `grid-template-columns` and `grid-template-rows` define the tracks, the `fr` unit shares free space, `gap` adds gutters, and items can span several cells with `grid-column` and `grid-row`.',
    why: 'Photo galleries, dashboards, magazine layouts and whole page layouts (header, sidebar, content, footer) are naturally grids. Grid handles both directions at once, which Flexbox cannot do.',
    analogy: { title: 'A chessboard / spreadsheet', text: 'You draw the lines first (template columns and rows), then place pieces into squares. A big piece can cover two squares — that is spanning.' },
    syntax: `.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
  grid-template-rows: 120px auto;
  gap: 12px;
}
.featured {
  grid-column: 1 / 3;   /* from line 1 to line 3 = 2 columns */
  grid-row: span 2;     /* covers 2 rows */
}
/* Responsive without media queries */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`,
    lines: [
      ['display: grid', 'Turns on Grid for direct children.'],
      ['repeat(3, 1fr)', 'Three columns, each one "fraction" of the free space.'],
      ['grid-template-rows', 'Row sizes: fixed, auto (fit content) or fr.'],
      ['gap: 12px', 'Space between rows and columns.'],
      ['grid-column: 1 / 3', 'Start at grid line 1, end at line 3. Lines are numbered from 1.'],
      ['span 2', 'Cover 2 tracks from wherever the item starts.'],
      ['auto-fit + minmax', 'As many columns as fit, each at least 200px — responsive automatically.'],
    ],
    live: { html: `<div class="layout">\n  <header>Header</header>\n  <aside>Sidebar</aside>\n  <main>\n    <div class="gallery">\n      <div class="big">Featured</div><div>2</div><div>3</div><div>4</div><div>5</div>\n    </div>\n  </main>\n  <footer>Footer</footer>\n</div>`, css: `.layout {\n  display: grid;\n  grid-template-columns: 120px 1fr;\n  grid-template-areas: "head head" "side main" "foot foot";\n  gap: 8px;\n}\nheader { grid-area: head; } aside { grid-area: side; } main { grid-area: main; } footer { grid-area: foot; }\n.layout > * { background: #FFF3CC; border: 2px solid #30343B; border-radius: 8px; padding: 8px; }\n.gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }\n.gallery div { background: #DDF1FB; padding: 14px; border-radius: 6px; text-align: center; }\n.gallery .big { grid-column: span 2; grid-row: span 2; background: #FFE3CF; }` },
    experiment: { lab: 'grid', text: 'Add rows and columns and drag items into cells in the Grid Playground.' },
    tryThis: ['Change repeat(3, 1fr) to repeat(4, 1fr).', 'Change the layout areas to put the sidebar on the right: "head head" "main side" "foot foot" (and swap the columns).', 'Remove grid-row: span 2 from .big.'],
    mistakes: [
      { wrong: 'grid-column: 1 / 2 expecting 2 columns.', right: 'grid-column: 1 / 3 or span 2.', why: 'Numbers are lines, not columns: column 1 is between lines 1 and 2.' },
      { wrong: 'Using Grid for a simple row of buttons.', right: 'Use Flexbox for one-dimensional rows.', why: 'Both work, but Flexbox is simpler for single rows.' },
    ],
    exam: {
      definition: 'CSS Grid Layout is a two-dimensional layout system that divides a container into rows and columns (tracks) and places child items into the resulting cells or areas.',
      points: ['Container: display:grid, grid-template-columns, grid-template-rows, grid-template-areas, gap, justify-items, align-items, place-items.', 'Item: grid-column, grid-row (start / end or span n), grid-area, justify-self, align-self.', 'fr unit = fraction of free space; repeat(); minmax(); auto-fit/auto-fill.', 'Grid lines are numbered from 1; negative numbers count from the end (-1 = last line).', 'Flexbox + Grid together: Grid for page skeleton, Flexbox inside components.'],
      diff: { title: 'Flexbox vs Grid', head: ['Flexbox', 'Grid'], rows: [['One-dimensional (row OR column)', 'Two-dimensional (rows AND columns)'], ['Content-first sizing', 'Layout-first sizing'], ['Navbars, toolbars, card rows', 'Page layouts, galleries, dashboards'], ['Items flow along an axis', 'Items placed in cells/areas']] },
      diagram: 'grid-lines',
    },
    examQs: [
      { m: 1, q: 'What does the fr unit represent?', a: 'A fraction of the available free space in the grid container.' },
      { m: 2, q: 'Write CSS for a 4-column grid with equal columns and a 20px gap.', a: '.g { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }' },
      { m: 3, q: 'Differentiate between Flexbox and Grid.', a: 'Use the comparison table: dimension, approach, use cases, alignment.' },
      { m: 5, q: 'Explain grid-template-areas with an example page layout.', a: 'Define areas as strings in the container ("header header" "sidebar main" "footer footer"), assign each element with grid-area, show resulting layout and how to rearrange it in a media query.' },
      { m: 10, q: 'Design a responsive dashboard layout using CSS Grid and explain all the grid properties used.', a: 'Header, sidebar, stat cards (auto-fit minmax), chart area spanning two columns, footer; media query collapsing to one column; explain each property.' },
    ],
    practice: ['Build a 3×3 photo gallery with one image spanning two columns.', 'Create a holy-grail layout using grid-template-areas.', 'Make a card grid that is responsive without any media query.'],
    revision: ['display:grid → template-columns/rows.', 'fr, repeat(), minmax(), auto-fit.', 'grid-column: start / end | span n.', 'grid-template-areas + grid-area.', 'Grid 2D, Flexbox 1D.'],
    quiz: [
      { q: 'grid-template-columns: 1fr 2fr gives…', o: ['Two equal columns', 'Second column twice as wide', 'First twice as wide', '3 columns'], a: 1, e: '2fr is twice 1fr.' },
      { q: 'An item from line 2 to line 4 spans…', o: ['1 column', '2 columns', '3 columns', '4 columns'], a: 1, e: '4 − 2 = 2.' },
      { q: 'Grid is best described as…', o: ['One-dimensional', 'Two-dimensional', 'Three-dimensional', 'Inline only'], a: 1, e: 'Rows and columns.' },
    ],
  },
  {
    id: 'css-responsive', track: 'css', group: 'Responsive Design', level: 'Intermediate', minutes: 16,
    title: 'Responsive Design & Media Queries', syllabus: 'Responsive Design Principles · Media Queries · Responsive Typography · Responsive HTML Design',
    summary: 'One website that looks great on phones, tablets and desktops.',
    definition: '**Responsive web design** means a page adapts its layout to any screen size. It uses the **viewport meta tag**, **fluid** layouts (%, fr, flex), **flexible images** (`max-width: 100%`) and **media queries** — CSS blocks that apply only when a condition is true, such as `@media (min-width: 768px)`. **Mobile-first** means writing styles for small screens first and adding rules for larger screens.',
    why: 'Most students browse on phones. A site that requires pinch-zooming loses users, and Google ranks mobile-friendly sites higher.',
    analogy: { title: 'Water takes the shape of its glass', text: 'A responsive page is like water — pour it into a tall phone glass or a wide desktop bowl and it fills the shape. Media queries are the rules like "if the glass is wider than 768px, arrange the furniture in two columns".' },
    syntax: `<meta name="viewport" content="width=device-width, initial-scale=1.0">

/* Mobile first: base styles for small screens */
.cards { display: grid; grid-template-columns: 1fr; gap: 12px; }
img { max-width: 100%; height: auto; }
h1 { font-size: clamp(1.5rem, 4vw, 3rem); }

/* Tablet and up */
@media (min-width: 768px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}
/* Desktop and up */
@media (min-width: 1024px) {
  .cards { grid-template-columns: repeat(4, 1fr); }
}`,
    lines: [
      ['viewport meta', 'Without it, phones pretend to be 980px wide and shrink the page.'],
      ['grid-template-columns: 1fr', 'Mobile: one column.'],
      ['max-width: 100%', 'Images never get wider than their container.'],
      ['clamp(min, preferred, max)', 'Responsive typography: grows with the screen but stays between limits.'],
      ['@media (min-width: 768px)', 'These rules apply only when the viewport is at least 768px wide.'],
      ['Breakpoints', 'Common: 576px (large phone), 768px (tablet), 1024px (laptop), 1280px (desktop).'],
    ],
    live: { html: `<h1>Responsive Cards</h1>\n<p>Resize the output panel (or use the Responsive Lab) to see the layout change.</p>\n<div class="cards">\n  <div>📘 HTML</div><div>🎨 CSS</div><div>⚡ JS</div><div>🧪 Labs</div>\n</div>`, css: `h1 { font-size: clamp(1.4rem, 5vw, 2.6rem); }\n.cards { display: grid; grid-template-columns: 1fr; gap: 10px; }\n.cards div { background: #DDF1FB; border: 2px solid #30343B; border-radius: 10px; padding: 18px; }\n@media (min-width: 400px) {\n  .cards { grid-template-columns: repeat(2, 1fr); }\n}\n@media (min-width: 600px) {\n  .cards { grid-template-columns: repeat(4, 1fr); }\n  .cards div { background: #E2F4DE; }\n}` },
    experiment: { lab: 'responsive', text: 'Preview a page at mobile, tablet and desktop widths in the Responsive Design Lab.' },
    tryThis: ['Change the 600px breakpoint to 500px.', 'Add a media query that hides the paragraph on small screens.'],
    mistakes: [
      { wrong: 'Forgetting the viewport meta tag.', right: 'Always include it.', why: 'Media queries will not behave as expected on real phones.' },
      { wrong: 'Fixed widths like width: 1200px.', right: 'max-width: 1200px; width: 100%;', why: 'Fixed widths cause horizontal scrolling on phones.' },
      { wrong: 'Writing a breakpoint for every device model.', right: 'Add breakpoints where your content breaks.', why: 'New devices appear every month; content-based breakpoints last.' },
    ],
    exam: {
      definition: 'Responsive web design is an approach in which web pages render well on a variety of devices and screen sizes by using fluid grids, flexible images and CSS media queries. A media query applies a block of CSS only when specified conditions about the device or viewport (such as width, orientation or resolution) are true.',
      points: ['Three pillars (Ethan Marcotte, 2010): fluid grids, flexible images, media queries.', 'Syntax: @media media-type and (condition) { rules }.', 'Media types: all, screen, print.', 'Features: min-width, max-width, orientation, prefers-color-scheme, prefers-reduced-motion.', 'Mobile-first uses min-width queries; desktop-first uses max-width.', 'Responsive typography: rem, vw, clamp().'],
      diff: { title: 'Mobile-first vs Desktop-first', head: ['Mobile-first', 'Desktop-first'], rows: [['Base CSS for small screens', 'Base CSS for large screens'], ['Uses min-width queries', 'Uses max-width queries'], ['Lighter CSS on phones', 'Phones override many rules'], ['Recommended today', 'Older approach']] },
    },
    examQs: [
      { m: 1, q: 'Which CSS feature applies styles based on screen width?', a: 'Media queries (@media).' },
      { m: 2, q: 'Write a media query that changes the body background on screens narrower than 600px.', a: '@media (max-width: 600px) { body { background: lightyellow; } }' },
      { m: 3, q: 'What is the mobile-first approach?', a: 'Writing base styles for small screens first and progressively adding styles for larger screens with min-width media queries; it keeps CSS simpler and faster on mobile.' },
      { m: 5, q: 'Explain responsive web design principles with examples.', a: 'Viewport meta, fluid layouts (%, fr, flex), flexible images (max-width:100%), media queries with breakpoints, responsive typography (clamp/rem), mobile-first; code examples for each.' },
    ],
    practice: ['Make a 1→2→3 column layout with two breakpoints.', 'Hide the desktop menu and show a hamburger button below 768px.', 'Use clamp() for your main heading.'],
    revision: ['viewport meta + fluid + flexible images + media queries.', '@media (min-width: 768px) { … }', 'Mobile-first = min-width.', 'img { max-width: 100% }', 'clamp(min, vw, max).'],
    quiz: [
      { q: 'Mobile-first CSS mostly uses…', o: ['max-width queries', 'min-width queries', 'no queries', 'print queries'], a: 1, e: 'Add styles as screens get bigger.' },
      { q: 'Which keeps images inside their container?', o: ['width: 100vw', 'max-width: 100%', 'overflow: scroll', 'float: left'], a: 1, e: 'max-width: 100%.' },
      { q: 'A typical tablet breakpoint is around…', o: ['200px', '768px', '2000px', '50px'], a: 1, e: '768px is common.' },
    ],
  },
  {
    id: 'css-animations', track: 'css', group: 'Animations', level: 'Advanced', minutes: 16,
    title: 'Transitions, Transforms & Animations', syllabus: 'CSS Animations · Transitions · Transformations · Keyframes',
    summary: 'Make interfaces move smoothly.',
    definition: 'A **transform** changes an element\'s shape or position visually: `translate()` moves, `scale()` resizes, `rotate()` spins, `skew()` slants. A **transition** animates a property change smoothly over time (for example on hover). An **animation** uses `@keyframes` to define multiple steps and can run automatically, repeat and alternate.',
    why: 'Smooth hover effects, loading spinners, sliding menus and attention-grabbing buttons make interfaces feel alive and give feedback that something happened.',
    analogy: { title: 'A flip-book', text: 'A transition is a door with a soft-close hinge: it moves smoothly from open to closed. An animation is a flip-book: you draw keyframes (the important pages) and the browser fills in the in-between pages.' },
    syntax: `.btn {
  transition: transform 0.3s ease, background 0.3s;
}
.btn:hover {
  transform: translateY(-4px) scale(1.05);
  background: #FFD45C;
}
@keyframes bounce {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-30px); }
  100% { transform: translateY(0); }
}
.ball {
  animation: bounce 1s ease-in-out infinite;
  /* name duration timing-function iteration-count */
}`,
    lines: [
      ['transition: transform 0.3s ease', 'Animate changes of transform over 0.3 seconds with an ease curve.'],
      ['translateY(-4px)', 'Moves up 4px without affecting the layout of other elements.'],
      ['scale(1.05)', 'Grows to 105%.'],
      ['@keyframes bounce', 'Defines the named animation steps with percentages.'],
      ['animation: bounce 1s ease-in-out infinite', 'Run "bounce" for 1s per cycle, forever.'],
    ],
    live: { html: `<button class="btn">Hover me</button>\n<div class="ball"></div>\n<div class="spinner"></div>`, css: `.btn { padding: 10px 18px; border: 2px solid #30343B; border-radius: 10px; background: #FF8A3D; font-weight: bold; transition: transform .3s ease, background .3s, box-shadow .3s; box-shadow: 0 3px 0 #30343B; }\n.btn:hover { transform: translateY(-3px) rotate(-2deg); background: #FFD45C; box-shadow: 0 6px 0 #30343B; }\n@keyframes bounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-40px) } }\n.ball { width: 40px; height: 40px; border-radius: 50%; background: #55B9E8; margin: 50px 20px 10px; animation: bounce 1s ease-in-out infinite; border: 2px solid #30343B; }\n@keyframes spin { to { transform: rotate(360deg) } }\n.spinner { width: 34px; height: 34px; border: 5px solid #E2F4DE; border-top-color: #78C86A; border-radius: 50%; animation: spin .8s linear infinite; }` },
    experiment: { lab: 'animation', text: 'Design your own animation with duration, delay, timing and transform controls in the Animation Studio.' },
    tryThis: ['Change ease-in-out to linear and feel the difference.', 'Change infinite to 3.', 'Add animation-direction: alternate.'],
    mistakes: [
      { wrong: 'transition on :hover only.', right: 'Put the transition on the normal state.', why: 'Then it animates both on hover and when the mouse leaves.' },
      { wrong: 'Animating width, top or left for movement.', right: 'Animate transform and opacity.', why: 'They are GPU-friendly and do not trigger layout recalculation, so animations stay smooth.' },
      { wrong: 'Flashy animations everywhere.', right: 'Respect prefers-reduced-motion.', why: 'Motion can cause dizziness for some users.' },
    ],
    exam: {
      definition: 'CSS transforms modify the coordinate space of an element (translate, rotate, scale, skew). CSS transitions animate the change of a property value over a duration when the value changes. CSS animations use @keyframes rules to define intermediate steps of an animation sequence that can run automatically and repeatedly.',
      points: ['Transition properties: transition-property, -duration, -timing-function, -delay.', 'Timing functions: ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier(), steps().', 'Animation properties: animation-name, -duration, -timing-function, -delay, -iteration-count, -direction, -fill-mode, -play-state.', '2D transforms: translate, rotate, scale, skew; 3D: rotateX/Y, perspective.', 'transform-origin sets the pivot point.'],
      diff: { title: 'Transition vs Animation', head: ['Transition', 'Animation'], rows: [['Needs a trigger (hover, class change)', 'Can start automatically'], ['Start and end state only', 'Multiple keyframes'], ['Runs once per change', 'Can loop infinitely'], ['Simple hover effects', 'Loaders, attention effects']] },
    },
    examQs: [
      { m: 1, q: 'Which rule defines animation steps?', a: '@keyframes' },
      { m: 2, q: 'List four transform functions.', a: 'translate(), rotate(), scale(), skew().' },
      { m: 3, q: 'Differentiate between transition and animation.', a: 'Use the table: trigger, keyframes, looping, use cases.' },
      { m: 5, q: 'Write CSS for a loading spinner and explain each property.', a: 'Square element with border, one coloured border-top, border-radius: 50%, animation: spin 1s linear infinite; @keyframes spin { to { transform: rotate(360deg) } } — explain each.' },
    ],
    practice: ['Make a button that lifts on hover.', 'Create a pulsing notification dot.', 'Animate a card flipping with rotateY.'],
    revision: ['transform: translate, scale, rotate, skew.', 'transition: property duration timing delay.', '@keyframes + animation shorthand.', 'Animate transform & opacity for performance.'],
    quiz: [
      { q: 'Which needs a trigger such as :hover?', o: ['Animation', 'Transition', 'Keyframes', 'Both'], a: 1, e: 'Transitions run when a value changes.' },
      { q: 'animation-iteration-count: infinite means…', o: ['Runs once', 'Loops forever', 'Never runs', 'Runs backwards'], a: 1, e: 'Forever.' },
      { q: 'Which is most efficient to animate?', o: ['width', 'margin-left', 'transform', 'top'], a: 2, e: 'transform avoids layout reflow.' },
    ],
  },
  {
    id: 'css-sass', track: 'css', group: 'Advanced Styling', level: 'Advanced', minutes: 16,
    title: 'Sass & Maintainable CSS Architecture', syllabus: 'CSS Preprocessors and Advanced Styling · Sass · Modular CSS · BEM · Optimization · Cross-browser',
    summary: 'Variables, nesting, mixins and loops — compiled to normal CSS.',
    definition: '**Sass** is a CSS **preprocessor**: you write `.scss` files with extra features — **variables** (`$brand`), **nesting**, **mixins** (reusable blocks), **functions**, **loops** and **partials** (`@use`) — and a compiler turns them into normal CSS the browser understands. **BEM** (Block__Element--Modifier) is a naming convention that keeps large stylesheets organised.',
    why: 'Large projects have thousands of lines of CSS. Sass removes repetition and splits code into components; BEM stops classes from clashing. Most companies use Sass or a framework built on similar ideas.',
    analogy: { title: 'A recipe with shortcuts', text: 'Sass is like writing "make the standard masala (mixin)" instead of listing 12 spices every time. The compiler is the cook who expands every shortcut into the full recipe (plain CSS).' },
    syntax: `// SCSS (input)
$brand: #FF8A3D;
@mixin center { display: flex; justify-content: center; align-items: center; }

.card {
  padding: 16px;
  &__title { color: $brand; }          // .card__title
  &--featured { border: 2px solid $brand; } // .card--featured
  &:hover { transform: scale(1.02); }
  .icon { @include center; }
}
@each $name, $c in (ok: green, err: red) {
  .text-#{$name} { color: $c; }
}`,
    lines: [
      ['$brand', 'A Sass variable (compile-time). CSS custom properties work at run time.'],
      ['@mixin / @include', 'Define a reusable chunk of declarations and paste it anywhere.'],
      ['&__title', '& means "the parent selector" → .card__title (BEM element).'],
      ['&--featured', 'BEM modifier → .card--featured, a variation of the block.'],
      ['@each', 'A loop that generates many similar classes, like utility classes.'],
    ],
    live: { html: `<p>The CSS tab shows what the SCSS above compiles to. Browsers only understand this plain CSS.</p>\n<div class="card card--featured">\n  <h3 class="card__title">Featured course</h3>\n  <p class="card__text text-ok">Seats available</p>\n  <div class="card__icon">★</div>\n</div>`, css: `/* Compiled output of the SCSS example */\n.card { padding: 16px; border-radius: 12px; background: #fff; transition: transform .2s; }\n.card__title { color: #FF8A3D; margin: 0 0 6px; }\n.card--featured { border: 2px solid #FF8A3D; }\n.card:hover { transform: scale(1.02); }\n.card__icon { display: flex; justify-content: center; align-items: center; width: 40px; height: 40px; background: #FFF3CC; border-radius: 50%; }\n.text-ok { color: green; }\n.text-err { color: red; }` },
    tryThis: ['Add a .card--compact modifier with smaller padding and apply it.', 'Write a utility class .mt-2 { margin-top: 8px } — this is how utility frameworks are built.'],
    mistakes: [
      { wrong: 'Nesting 6 levels deep.', right: 'Keep nesting to 2–3 levels.', why: 'Deep nesting creates very specific, fragile selectors.' },
      { wrong: 'Linking a .scss file directly in HTML.', right: 'Compile to .css and link that.', why: 'Browsers cannot read Sass.' },
    ],
    exam: {
      definition: 'A CSS preprocessor is a scripting language that extends CSS with features such as variables, nesting, mixins, functions and loops, and compiles into standard CSS. Sass (Syntactically Awesome Style Sheets) is the most widely used preprocessor, with SCSS syntax being a superset of CSS.',
      points: ['Features: variables, nesting, partials and @use, mixins with arguments, @extend, functions, operators, control directives (@if, @each, @for).', 'Two syntaxes: .scss (braces, like CSS) and .sass (indentation-based).', 'BEM: .block, .block__element, .block--modifier.', 'Optimisation: minify CSS, remove unused CSS, combine files, prefer classes over deep selectors, use transform/opacity for animation.', 'Cross-browser compatibility: test on multiple browsers, use autoprefixer, check caniuse.com, provide fallbacks.'],
      diff: { title: 'Sass variables vs CSS variables', head: ['Sass $var', 'CSS --var'], rows: [['Resolved at compile time', 'Resolved at run time'], ['Not visible in browser', 'Visible in DevTools'], ['Cannot change with JS', 'Can be changed with JS'], ['Not affected by media queries', 'Can change inside media queries']] },
    },
    examQs: [
      { m: 1, q: 'What is a CSS preprocessor?', a: 'A tool/language that extends CSS with programming features and compiles to plain CSS, e.g. Sass.' },
      { m: 2, q: 'What is a mixin in Sass?', a: 'A reusable group of declarations defined with @mixin and inserted with @include, optionally taking arguments.' },
      { m: 3, q: 'Explain BEM naming with an example.', a: 'Block (.card), Element (.card__title), Modifier (.card--featured). It makes class names descriptive, flat in specificity and avoids conflicts.' },
      { m: 5, q: 'Explain features of Sass with examples.', a: 'Variables, nesting with &, partials/@use, mixins, @extend, functions, loops; show SCSS and the compiled CSS.' },
    ],
    practice: ['Convert a card stylesheet to BEM naming.', 'Write a set of spacing utility classes .mt-1 … .mt-4.'],
    revision: ['Sass → compiled to CSS.', 'Variables, nesting, mixins, loops, partials.', 'BEM: block__element--modifier.', 'Optimise: minify, purge, transform/opacity.'],
    quiz: [
      { q: 'In BEM, .menu__item--active is…', o: ['Block', 'Element with modifier', 'Utility', 'ID'], a: 1, e: 'Element "item" of block "menu" with modifier "active".' },
      { q: 'Browsers can read .scss files directly.', o: ['True', 'False'], a: 1, e: 'They must be compiled.' },
      { q: 'Which inserts a mixin?', o: ['@use', '@include', '@extend', '@import-mixin'], a: 1, e: '@include.' },
    ],
  },
  {
    id: 'css-frameworks', track: 'css', group: 'Frameworks', level: 'Advanced', minutes: 16,
    title: 'CSS Frameworks: Bootstrap & Tailwind', syllabus: 'Modern CSS Frameworks · Utility-First CSS · Responsive Breakpoints · Customization · Component Reusability · Documentation-Driven Development',
    summary: 'Ready-made components and utility classes to build faster.',
    definition: 'A **CSS framework** is a pre-written library of styles. **Bootstrap** is **component-based**: classes like `btn btn-primary`, `card`, `navbar` and a 12-column grid (`row`, `col-md-6`). **Tailwind CSS** is **utility-first**: tiny single-purpose classes like `p-4`, `bg-orange-400`, `flex`, `md:grid-cols-3` combined directly in HTML. Both use **responsive breakpoint prefixes** and both can be **customised** with your brand colours.',
    why: 'Teams ship faster with consistent, tested styles. Knowing a framework is expected in internships, and reading its **documentation** is a core professional skill (documentation-driven development).',
    analogy: { title: 'LEGO kits vs LEGO bricks', text: 'Bootstrap is a LEGO kit: you get a finished car (component) and change its colour. Tailwind is a bucket of small bricks: you build anything, brick by brick, without writing new CSS.' },
    syntax: `<!-- Bootstrap: include CSS from CDN, then use component classes -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6"><button class="btn btn-primary">Join</button></div>
  </div>
</div>

<!-- Tailwind: utility classes, md: = from 768px up -->
<script src="https://cdn.tailwindcss.com"></script>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
  <div class="rounded-xl bg-orange-400 p-6 font-bold shadow hover:scale-105">Card</div>
</div>`,
    lines: [
      ['container / row / col-md-6', 'Bootstrap grid: 12 columns; col-md-6 = half width from the md breakpoint (768px).'],
      ['btn btn-primary', 'A pre-designed button component with the primary colour.'],
      ['grid-cols-1 md:grid-cols-3', 'Tailwind: 1 column on mobile, 3 from md (768px) up.'],
      ['p-4 / gap-4', 'Spacing utilities: 4 × 0.25rem = 1rem.'],
      ['hover:scale-105', 'State prefix: applies scale on hover.'],
    ],
    live: { html: `<p>This mini utility framework (in the CSS tab) works exactly like Tailwind, just smaller. Real Tailwind generates thousands of these classes.</p>\n<div class="grid md-cols-3 gap-4 p-4 bg-mist rounded">\n  <div class="p-4 bg-orange rounded shadow font-bold">Utility</div>\n  <div class="p-4 bg-blue rounded shadow font-bold">First</div>\n  <div class="p-4 bg-green rounded shadow font-bold hover-lift">CSS</div>\n</div>\n<button class="btn btn-primary mt-4">Bootstrap-style component</button>`, css: `/* A tiny utility-first framework */\n.grid { display: grid; } .gap-4 { gap: 1rem; } .p-4 { padding: 1rem; } .mt-4 { margin-top: 1rem; }\n.rounded { border-radius: .75rem; } .shadow { box-shadow: 0 3px 0 #30343B; } .font-bold { font-weight: 700; }\n.bg-orange { background: #FF8A3D; } .bg-blue { background: #55B9E8; } .bg-green { background: #78C86A; } .bg-mist { background: #F1F6FA; }\n.hover-lift { transition: transform .2s; } .hover-lift:hover { transform: translateY(-4px); }\n@media (min-width: 500px) { .md-cols-3 { grid-template-columns: repeat(3, 1fr); } }\n\n/* A component-style class, like Bootstrap */\n.btn { padding: .5rem 1rem; border-radius: .5rem; border: 2px solid #30343B; font-weight: 600; cursor: pointer; }\n.btn-primary { background: #FFD45C; }` },
    tryThis: ['Add a new utility .bg-pink { background: #F48FB1 } and use it on a card.', 'Remove md-cols-3 and the cards stack.', 'Compare: to change the button you edit a component class, to change a card you edit utilities in the HTML.'],
    mistakes: [
      { wrong: 'Overriding framework classes with !important.', right: 'Customise through the framework\'s config (Tailwind theme, Bootstrap Sass variables).', why: 'Overrides fight the framework and break on updates.' },
      { wrong: 'Copying class names without reading the docs.', right: 'Look up each class in the official documentation.', why: 'Documentation-driven development avoids guessing and misuse.' },
      { wrong: 'Using a framework without understanding CSS.', right: 'Learn Flexbox/Grid first.', why: 'Frameworks are built on these; debugging needs CSS knowledge.' },
    ],
    exam: {
      definition: 'A CSS framework is a pre-prepared library of CSS (and sometimes JavaScript) that provides standardised styles, a responsive grid system and reusable components to speed up front-end development. Bootstrap is a component-based framework; Tailwind CSS is a utility-first framework that composes designs from small single-purpose classes.',
      points: ['Bootstrap: 12-column grid, breakpoints sm (576), md (768), lg (992), xl (1200), xxl (1400); components: navbar, card, modal, button, form, alert; JS plugins.', 'Tailwind: utilities for spacing (p-4, m-2), typography (text-xl, font-bold), colours (bg-sky-500), flex/grid (flex, justify-between, grid-cols-3), states (hover:, focus:), breakpoints (sm:, md:, lg:, xl:).', 'Customisation: tailwind config theme / @theme; Bootstrap Sass variables.', 'Advantages: speed, consistency, responsive by default, documentation, community.', 'Disadvantages: larger CSS (unless purged), similar-looking sites, learning curve, cluttered HTML (Tailwind).'],
      diff: { title: 'Bootstrap vs Tailwind', head: ['Bootstrap', 'Tailwind CSS'], rows: [['Component-based', 'Utility-first'], ['Pre-designed components', 'Build custom designs'], ['Less custom CSS needed for standard UI', 'Almost no custom CSS'], ['Sites can look similar', 'Unique designs'], ['Includes JS components', 'CSS only']] },
    },
    examQs: [
      { m: 1, q: 'What does "utility-first" mean?', a: 'Styling by combining many small single-purpose classes directly in HTML, as in Tailwind CSS.' },
      { m: 2, q: 'What does col-md-6 mean in Bootstrap?', a: 'On medium screens (≥768px) and above, the element takes 6 of 12 columns (half the width); below md it stacks full-width.' },
      { m: 5, q: 'Compare Bootstrap and Tailwind CSS.', a: 'Use the comparison table, with code examples of a button/card in each and a discussion of customisation and use cases.' },
      { m: 5, q: 'What are the advantages and disadvantages of using CSS frameworks?', a: 'Advantages: speed, consistency, responsive grid, cross-browser tested, documentation, reusable components. Disadvantages: file size, generic look, dependency, learning curve, overriding difficulty.' },
    ],
    practice: ['Rebuild a pricing card in Bootstrap and again in Tailwind (use their CDN in a local file).', 'Read the Tailwind "Flexbox" docs and recreate one example.'],
    revision: ['Bootstrap = components + 12-col grid.', 'Tailwind = utilities + breakpoint prefixes.', 'sm 576/640, md 768, lg 992/1024.', 'Customise via config, not !important.'],
    quiz: [
      { q: 'Tailwind is…', o: ['Component-based', 'Utility-first', 'A JS framework', 'A preprocessor'], a: 1, e: 'Utility-first.' },
      { q: 'Bootstrap\'s grid has how many columns?', o: ['10', '12', '16', '24'], a: 1, e: '12.' },
      { q: 'In Tailwind, md:flex applies flex…', o: ['Only on mobile', 'From the md breakpoint up', 'Only on hover', 'Never'], a: 1, e: 'Mobile-first prefix.' },
    ],
  },
];
