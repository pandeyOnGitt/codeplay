// Builds the document that runs inside the sandboxed <iframe sandbox="allow-scripts">.
// The iframe has NO same-origin access, so student code can never touch the app,
// its storage or its cookies. It talks back only through postMessage.

/** Insert a guard into for / while / do loops so an accidental infinite loop
 *  throws a friendly error instead of freezing the tab. */
export function guardLoops(src) {
  let out = '';
  let i = 0;
  const n = src.length;
  let inStr = null;
  while (i < n) {
    const ch = src[i];
    // skip comments
    if (!inStr && ch === '/' && src[i + 1] === '/') { const e = src.indexOf('\n', i); const end = e === -1 ? n : e; out += src.slice(i, end); i = end; continue; }
    if (!inStr && ch === '/' && src[i + 1] === '*') { const e = src.indexOf('*/', i + 2); const end = e === -1 ? n : e + 2; out += src.slice(i, end); i = end; continue; }
    if (inStr) { out += ch; if (ch === '\\') { out += src[i + 1] ?? ''; i += 2; continue; } if (ch === inStr) inStr = null; i++; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { inStr = ch; out += ch; i++; continue; }
    const rest = src.slice(i, i + 6);
    const prev = src[i - 1] || ' ';
    const isWordStart = !/[\w$]/.test(prev);
    let kw = null;
    if (isWordStart && /^for\b/.test(rest)) kw = 'for';
    else if (isWordStart && /^while\b/.test(src.slice(i, i + 6))) kw = 'while';
    else if (isWordStart && /^do\b/.test(rest)) kw = 'do';
    if (kw === 'do') {
      let j = i + 2; while (/\s/.test(src[j])) j++;
      if (src[j] === '{') { out += src.slice(i, j + 1) + '__guard();'; i = j + 1; continue; }
    } else if (kw) {
      let j = i + kw.length; while (/\s/.test(src[j])) j++;
      if (src[j] === '(') {
        let depth = 0; let k = j;
        for (; k < n; k++) { if (src[k] === '(') depth++; else if (src[k] === ')') { depth--; if (depth === 0) break; } }
        let m = k + 1; while (m < n && /\s/.test(src[m])) m++;
        if (src[m] === '{') { out += src.slice(i, m + 1) + '__guard();'; i = m + 1; continue; }
        out += src.slice(i, k + 1); i = k + 1; continue;
      }
    }
    out += ch; i++;
  }
  return out;
}

const SHIM = (runId, jsStartLine) => `<script>(function(){
var RUN=${JSON.stringify(runId)};var JS_START=${jsStartLine};
function fmt(v,d){d=d||0;try{if(v===null)return'null';if(v===undefined)return'undefined';var t=typeof v;
if(t==='string')return d?JSON.stringify(v):v;if(t==='number'||t==='boolean'||t==='bigint')return String(v);
if(t==='function')return'ƒ '+(v.name||'anonymous')+'()';if(t==='symbol')return v.toString();
if(v instanceof Error)return v.name+': '+v.message;if(typeof Element!=='undefined'&&v instanceof Element){return '<'+v.tagName.toLowerCase()+(v.id?' id="'+v.id+'"':'')+(v.className&&typeof v.className==='string'?' class="'+v.className+'"':'')+'>';}
if(d>2)return Array.isArray(v)?'[…]':'{…}';
if(Array.isArray(v))return'['+v.map(function(x){return fmt(x,d+1)}).join(', ')+']';
if(v instanceof Map)return'Map('+v.size+') {'+Array.from(v).map(function(e){return fmt(e[0],d+1)+' => '+fmt(e[1],d+1)}).join(', ')+'}';
if(v instanceof Set)return'Set('+v.size+') {'+Array.from(v).map(function(x){return fmt(x,d+1)}).join(', ')+'}';
if(v instanceof Promise)return'Promise {…}';
var ks=Object.keys(v);return'{ '+ks.map(function(k){return k+': '+fmt(v[k],d+1)}).join(', ')+(ks.length?' }':'}');}catch(e){return String(v)}}
function send(type,args){try{parent.postMessage({__codeplay:RUN,type:type,args:args},'*')}catch(e){}}
['log','info','warn','error','debug'].forEach(function(m){var o=console[m];console[m]=function(){var a=[].slice.call(arguments);send(m==='debug'?'log':m,[a.map(function(x){return fmt(x)}).join(' ')]);o&&o.apply(console,a)}});
console.table=function(d){send('log',[fmt(d)])};console.clear=function(){send('clear',[])};
window.alert=function(m){send('info',['[alert] '+m])};window.confirm=function(m){send('info',['[confirm] '+m+' → true']);return true};window.prompt=function(m,d){send('info',['[prompt] '+m+' → '+(d===undefined?'null':d)]);return d===undefined?null:d};
var guardCount=0,guardReset=Date.now();window.__guard=function(){if(++guardCount>200000){var now=Date.now();if(now-guardReset<1500){guardCount=0;throw new Error('Loop stopped: it ran more than 200,000 times very quickly. Check your loop condition.')}guardCount=0;guardReset=now}};
window.addEventListener('error',function(e){var line=e.lineno&&e.lineno>JS_START?' (JS line '+(e.lineno-JS_START)+')':'';send('error',[(e.message||'Error')+line])});
window.addEventListener('unhandledrejection',function(e){send('error',['Uncaught (in promise) '+fmt(e.reason)])});
window.__codeplaySend=send;
})();<\/script>`;

const TESTS = (tests) => `<script>window.addEventListener('load',function(){setTimeout(function(){var T=${JSON.stringify(tests)};var res=T.map(function(t){try{var ok=!!(new Function(t.code))();return{label:t.label,ok:ok}}catch(e){return{label:t.label,ok:false,err:String(e.message||e)}}});window.__codeplaySend('tests',res)},60)});<\/script>`;

const DOMREPORT = `<script>(function(){function ser(n,d){if(d>8)return null;if(n.nodeType===3){var t=n.textContent.trim();return t?{t:'#text',x:t.slice(0,40)}:null}if(n.nodeType!==1||n.tagName==='SCRIPT')return null;var o={t:n.tagName.toLowerCase(),id:n.id||'',c:(typeof n.className==='string'?n.className:''),s:n.getAttribute('style')||'',k:[]};for(var i=0;i<n.childNodes.length;i++){var c=ser(n.childNodes[i],d+1);if(c)o.k.push(c)}return o}
var tm;function report(){clearTimeout(tm);tm=setTimeout(function(){window.__codeplaySend('dom',[ser(document.body,0)])},40)}
window.addEventListener('load',function(){report();new MutationObserver(report).observe(document.body,{subtree:true,childList:true,attributes:true,characterData:true})});})();<\/script>`;

export function buildDocument({ html = '', css = '', js = '', runId = 'x', tests = null, reportDom = false, guard = true }) {
  const isFullDoc = /<html[\s>]/i.test(html);
  const jsCode = guard ? guardLoops(js) : js;
  // Assemble pieces, then compute where the student's JS starts so error line numbers make sense.
  let head = `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">`;
  let pre;
  if (isFullDoc) {
    const injectedHead = `${head}<style>${css}</style>`;
    const doc = html.match(/<head[^>]*>/i) ? html.replace(/<head[^>]*>/i, (m) => m + injectedHead) : html.replace(/<html[^>]*>/i, (m) => m + '<head>' + injectedHead + '</head>');
    const parts = doc.split(/<\/body>/i);
    pre = parts[0] + (reportDom ? DOMREPORT : '') + (tests ? TESTS(tests) : '') + '\n<script>\n';
    const line = pre.split('\n').length - 1;
    const shimmed = pre.replace(/<head[^>]*>/i, (m) => m + SHIM(runId, line).replace(/\n/g, ' '));
    return shimmed + jsCode + '\n</script>' + (parts[1] !== undefined ? '</body>' + parts.slice(1).join('</body>') : '');
  }
  pre = `<!DOCTYPE html><html><head>${head}SHIM_HERE<style>body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;margin:12px;color:#30343B}${css}</style></head><body>\n${html}\n${reportDom ? DOMREPORT : ''}${tests ? TESTS(tests) : ''}\n<script>\n`;
  const line = pre.split('\n').length - 1;
  return pre.replace('SHIM_HERE', SHIM(runId, line).replace(/\n/g, ' ')) + jsCode + '\n</script></body></html>';
}

/** Turn a raw JS error message into beginner-friendly advice. */
export function explainError(msg = '') {
  const m = msg.toLowerCase();
  if (m.includes('is not defined')) return 'JavaScript does not know this name. Check the spelling (JS is case-sensitive) or declare it first with let or const.';
  if (m.includes('before initialization')) return 'You used a let/const variable before the line that creates it. This waiting period is called the Temporal Dead Zone.';
  if (m.includes('assignment to constant')) return 'A const variable cannot be given a new value. Use let if the value needs to change.';
  if (m.includes("cannot read properties of null") || m.includes('of null')) return 'Something you selected does not exist. querySelector/getElementById returned null — check the selector and that the element is in the HTML.';
  if (m.includes('cannot read properties of undefined')) return 'You tried to read a property from something that is undefined. Check that the object or array item really exists.';
  if (m.includes('is not a function')) return 'You called something with () that is not a function. Check the name and that it is spelled exactly like the method.';
  if (m.includes('unexpected token') || m.includes('syntaxerror') || m.includes('unexpected end')) return 'Syntax problem: a bracket, quote or comma is probably missing or extra. Check the line mentioned and the one before it.';
  if (m.includes('loop stopped')) return 'Make sure the loop condition eventually becomes false — for example, that i++ is actually changing i.';
  if (m.includes('already been declared')) return 'You declared the same let/const name twice in the same scope. Remove the second let/const or rename it.';
  return null;
}
