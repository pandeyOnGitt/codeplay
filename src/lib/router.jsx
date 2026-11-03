// Tiny hash router. Routes are plain hash names like #lesson-css-box-model
// (letters, digits, hyphens) so links work when hosted anywhere, including
// sandboxed frames that only pass simple #names.
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const RouterCtx = createContext({ route: 'home', navigate: () => {} });

function read() {
  const h = decodeURIComponent(window.location.hash.replace(/^#\/?/, ''));
  return h || 'home';
}

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => { setRoute(read()); window.scrollTo({ top: 0 }); document.getElementById('main-scroll')?.scrollTo({ top: 0 }); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const navigate = useCallback((to) => {
    if (to === read()) return;
    window.location.hash = to;
  }, []);
  return <RouterCtx.Provider value={{ route, navigate }}>{children}</RouterCtx.Provider>;
}

export const useRouter = () => useContext(RouterCtx);

/** Split "lesson-css-box-model" into { page: 'lesson', param: 'css-box-model' } */
export function parseRoute(route) {
  const pages = ['lesson', 'track', 'lab', 'project', 'exam', 'mock', 'notes'];
  for (const p of pages) if (route.startsWith(p + '-')) return { page: p, param: route.slice(p.length + 1) };
  return { page: route, param: null };
}

export function Link({ to, children, className = '', onClick, ...rest }) {
  return (
    <a href={'#' + to} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
