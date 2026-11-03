// A lightweight code editor: a transparent <textarea> on top of a
// syntax-highlighted <pre>. Supports Tab indentation, auto-indent on Enter,
// bracket pairing, Ctrl/Cmd+Enter to run, and line numbers.
import { useEffect, useMemo, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);

const LANG = { html: 'xml', css: 'css', js: 'javascript' };
const PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };

export function highlight(code, lang) {
  try { return hljs.highlight(code, { language: LANG[lang] || lang }).value; }
  catch { return code.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }
}

export default function CodeEditor({ value, onChange, lang = 'html', onRun, minHeight = 220, label, readOnly = false, highlightLine = null }) {
  const ta = useRef(null);
  const pre = useRef(null);
  const gutter = useRef(null);
  const html = useMemo(() => highlight(value, lang) + '\n', [value, lang]);
  const lines = value.split('\n').length;

  const sync = () => {
    if (!ta.current) return;
    pre.current.scrollTop = ta.current.scrollTop; pre.current.scrollLeft = ta.current.scrollLeft;
    gutter.current.scrollTop = ta.current.scrollTop;
  };
  useEffect(sync, [value]);

  function replace(start, end, text, caret) {
    const v = value.slice(0, start) + text + value.slice(end);
    onChange(v);
    requestAnimationFrame(() => { if (ta.current) { ta.current.selectionStart = ta.current.selectionEnd = caret ?? start + text.length; } });
  }

  function onKeyDown(e) {
    if (readOnly) return;
    const el = e.currentTarget;
    const { selectionStart: s, selectionEnd: en } = el;
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); onRun?.(); return; }
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      replace(s, en, '  ');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const lineStart = value.lastIndexOf('\n', s - 1) + 1;
      const indent = value.slice(lineStart, s).match(/^\s*/)[0];
      const before = value[s - 1]; const after = value[s];
      const opens = before === '{' || before === '(' || before === '[' || (lang === 'html' && before === '>' && after === '<');
      if (opens && (after === '}' || after === ')' || after === ']' || after === '<')) {
        replace(s, en, '\n' + indent + '  ' + '\n' + indent, s + indent.length + 3);
      } else {
        replace(s, en, '\n' + indent + (opens ? '  ' : ''));
      }
    } else if (PAIRS[e.key] && s === en && !e.ctrlKey && !e.metaKey) {
      const nextCh = value[s];
      if ((e.key === '"' || e.key === "'" || e.key === '`') && nextCh === e.key) { e.preventDefault(); el.selectionStart = el.selectionEnd = s + 1; return; }
      if (e.key === "'" && /\w/.test(value[s - 1] || '')) return; // apostrophes in words
      e.preventDefault();
      replace(s, en, e.key + PAIRS[e.key], s + 1);
    } else if ([')', ']', '}'].includes(e.key) && value[s] === e.key && s === en) {
      e.preventDefault(); el.selectionStart = el.selectionEnd = s + 1;
    } else if (e.key === 'Backspace' && s === en && PAIRS[value[s - 1]] === value[s] && value[s]) {
      e.preventDefault(); replace(s - 1, s + 1, '', s - 1);
    }
  }

  return (
    <div className="code-wrap rounded-b-[10px] bg-[#2B2F36] overflow-hidden" style={{ minHeight, height: '100%' }}>
      <div ref={gutter} className="code-gutter" aria-hidden="true">
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className={highlightLine === i + 1 ? 'text-sun font-bold' : ''}>{i + 1}</div>
        ))}
      </div>
      {highlightLine && (
        <div className="absolute left-0 right-0 bg-sun/15 border-l-4 border-sun pointer-events-none z-0 transition-all"
          style={{ top: 12 + (highlightLine - 1) * 21.6 - (ta.current?.scrollTop || 0), height: 21.6 }} />
      )}
      <pre ref={pre} aria-hidden="true" className="absolute inset-0 relative-z" dangerouslySetInnerHTML={{ __html: html }} />
      <textarea
        ref={ta}
        value={value}
        readOnly={readOnly}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        aria-label={label || `${lang.toUpperCase()} code editor`}
        onChange={(e) => onChange(e.target.value)}
        onScroll={sync}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
