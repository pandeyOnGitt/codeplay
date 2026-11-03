import { useAuth } from '../lib/auth.jsx';

/** Sidebar user card (no logout — that lives in the top-right ProfileMenu). */
export default function AuthBar() {
  const { user, loading, isLoggedIn } = useAuth();

  if (loading) {
    return <div className="text-xs text-ink-soft px-1 py-1">Checking session…</div>;
  }

  if (!isLoggedIn || !user) return null;

  const initial = (user.name || user.username || user.email || '?').charAt(0).toUpperCase();

  return (
    <div className="sticker-sm bg-white p-2.5">
      <div className="flex items-center gap-2 min-w-0">
        <span className={`w-8 h-8 rounded-xl border-2 border-ink grid place-items-center font-bold text-sm text-ink shrink-0 ${user.role === 'admin' ? 'bg-tang' : 'bg-aqua'}`}>
          {initial}
        </span>
        <div className="min-w-0 leading-tight">
          <div className="text-sm font-semibold truncate flex items-center gap-1">
            {user.name}
            {user.role === 'admin' && <span className="chip bg-tang-soft text-[9px]">admin</span>}
          </div>
          <div className="text-[10px] text-ink-soft truncate font-mono">{user.username || user.email}</div>
        </div>
      </div>
    </div>
  );
}
