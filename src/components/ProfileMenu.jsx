import { useEffect, useRef, useState } from 'react';
import { LuLogOut, LuChevronDown } from 'react-icons/lu';
import { useAuth } from '../lib/auth.jsx';

/** Top-right profile avatar — click to open logout menu. */
export default function ProfileMenu() {
  const { user, isLoggedIn, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!isLoggedIn || !user) return null;

  const initial = (user.name || user.username || '?').charAt(0).toUpperCase();
  const isAdmin = user.role === 'admin';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-white pl-0.5 pr-2 py-0.5 shadow-[2px_2px_0_#30343B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_#30343B] transition"
      >
        <span
          className={`w-9 h-9 rounded-full border-2 border-ink grid place-items-center font-bold text-sm shrink-0 ${isAdmin ? 'bg-tang text-ink' : 'bg-aqua text-ink'}`}
        >
          {initial}
        </span>
        <span className="hidden sm:block text-sm font-semibold max-w-[7rem] truncate">{user.name?.split(' ')[0]}</span>
        <LuChevronDown className={`text-ink-soft text-sm transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 sticker bg-cream p-1.5 z-50 anim-rise"
        >
          <div className="px-3 py-2 border-b border-ink/10 mb-1">
            <div className="text-sm font-semibold truncate">{user.name}</div>
            <div className="text-[11px] text-ink-soft font-mono truncate">{user.username || user.email}</div>
            {isAdmin && <span className="chip bg-tang-soft mt-1 text-[9px]">admin</span>}
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={() => { setOpen(false); logout(); }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blush-soft text-left"
          >
            <LuLogOut /> Log out
          </button>
        </div>
      )}
    </div>
  );
}
