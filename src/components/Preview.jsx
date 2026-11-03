import { useEffect, useMemo, useRef } from 'react';
import { buildDocument } from '../lib/sandbox.js';

/** Sandboxed live preview. Student code runs in an opaque-origin iframe and
 *  reports console output, test results and (optionally) its DOM tree. */
export default function Preview({ html, css, js, runKey = 0, tests, reportDom, onConsole, onTests, onDom, title = 'Live output', className = '', style }) {
  const frame = useRef(null);
  const runId = useMemo(() => 'r' + Math.random().toString(36).slice(2) + runKey, [html, css, js, runKey]); // eslint-disable-line
  const doc = useMemo(() => buildDocument({ html, css, js, runId, tests, reportDom }), [runId]); // eslint-disable-line

  const handlers = useRef({});
  handlers.current = { onConsole, onTests, onDom };

  useEffect(() => {
    function onMsg(e) {
      const d = e.data;
      if (!d || d.__codeplay !== runId) return;
      if (frame.current && e.source !== frame.current.contentWindow) return;
      const h = handlers.current;
      if (d.type === 'tests') h.onTests?.(d.args);
      else if (d.type === 'dom') h.onDom?.(d.args[0]);
      else h.onConsole?.({ type: d.type, text: d.args[0] ?? '' });
    }
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [runId]);

  return (
    <iframe
      ref={frame}
      key={runId}
      title={title}
      sandbox="allow-scripts allow-forms"
      srcDoc={doc}
      className={`w-full h-full bg-white ${className}`}
      style={style}
    />
  );
}
