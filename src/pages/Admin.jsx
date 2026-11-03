import { useCallback, useEffect, useState } from 'react';
import { LuRefreshCw, LuTrash2, LuShield, LuUsers } from 'react-icons/lu';
import { useAuth } from '../lib/auth.jsx';
import { api } from '../lib/api.js';
import { toast } from '../lib/celebrate.jsx';
import { PageHeader, Empty, Mascot } from '../components/ui.jsx';
import { Link } from '../lib/router.jsx';

function fmt(d) {
  if (!d) return 'Never';
  try {
    return new Date(d).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return String(d);
  }
}

export default function Admin() {
  const { user, token, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api('/api/admin/users', { token });
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  if (!isAdmin) {
    return (
      <Empty title="Admins only" art={<Mascot mood="think" />}>
        You need an admin account to manage users.{' '}
        <Link to="home" className="underline font-semibold">Back home</Link>
      </Empty>
    );
  }

  async function removeUser(u) {
    if (u.id === user.id) {
      toast('You cannot remove yourself', 'error');
      return;
    }
    const ok = window.confirm(`Remove ${u.name} (${u.email})?\nTheir progress will be deleted permanently.`);
    if (!ok) return;
    setBusyId(u.id);
    try {
      await api(`/api/admin/users/${u.id}`, { method: 'DELETE', token });
      setUsers((list) => list.filter((x) => x.id !== u.id));
      toast(`Removed ${u.name}`, 'win');
    } catch (err) {
      toast(err.message || 'Could not remove user', 'error');
    } finally {
      setBusyId(null);
    }
  }

  const loggedIn = users.filter((u) => u.lastLoginAt);
  const never = users.filter((u) => !u.lastLoginAt);

  return (
    <div className="space-y-6">
      <PageHeader kicker="Admin" title="User management" color="aqua" art={<Mascot mood="wow" size={88} />}>
        See everyone who registered, who has logged in, and remove accounts when needed.
      </PageHeader>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="sticker p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border-2 border-ink bg-aqua-soft grid place-items-center"><LuUsers /></div>
          <div>
            <div className="font-display text-2xl font-semibold leading-none">{users.length}</div>
            <div className="text-xs text-ink-soft">Registered</div>
          </div>
        </div>
        <div className="sticker p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border-2 border-ink bg-leaf-soft grid place-items-center"><LuShield /></div>
          <div>
            <div className="font-display text-2xl font-semibold leading-none">{loggedIn.length}</div>
            <div className="text-xs text-ink-soft">Have logged in</div>
          </div>
        </div>
        <div className="sticker p-4 flex items-center gap-3 justify-between">
          <div>
            <div className="font-display text-2xl font-semibold leading-none">{never.length}</div>
            <div className="text-xs text-ink-soft">Never logged in</div>
          </div>
          <button type="button" className="btn text-xs" onClick={load} disabled={loading}>
            <LuRefreshCw className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border-2 border-blush-dark bg-blush-soft px-4 py-3 text-sm font-medium text-blush-dark">
          {error}
        </div>
      )}

      <div className="sticker overflow-hidden">
        <div className="px-4 py-3 border-b-2 border-ink bg-mist flex items-center gap-2 font-semibold text-sm">
          <LuUsers /> All users
        </div>
        {loading ? (
          <div className="p-8 text-center text-sm text-ink-soft">Loading users…</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-sm text-ink-soft">No users yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b-2 border-ink/15 text-xs uppercase tracking-wide text-ink-soft">
                  <th className="px-4 py-2.5 font-bold">User</th>
                  <th className="px-4 py-2.5 font-bold">Student ID</th>
                  <th className="px-4 py-2.5 font-bold">Role</th>
                  <th className="px-4 py-2.5 font-bold">Last login</th>
                  <th className="px-4 py-2.5 font-bold">Logins</th>
                  <th className="px-4 py-2.5 font-bold">XP</th>
                  <th className="px-4 py-2.5 font-bold">Lessons</th>
                  <th className="px-4 py-2.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-ink/10 hover:bg-sun-soft/40">
                    <td className="px-4 py-3">
                      <div className="font-semibold">{u.name}</div>
                      <div className="text-xs text-ink-soft">{u.email || '—'}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{u.username || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`chip ${u.role === 'admin' ? 'bg-tang-soft' : 'bg-mist'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap">{fmt(u.lastLoginAt)}</td>
                    <td className="px-4 py-3 font-mono text-xs">{u.loginCount}</td>
                    <td className="px-4 py-3 font-mono text-xs">{u.xp}</td>
                    <td className="px-4 py-3 font-mono text-xs">{u.lessonsCompleted}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        className="btn text-xs py-1.5 px-2.5 bg-blush-soft disabled:opacity-40"
                        disabled={busyId === u.id || u.id === user.id}
                        title={u.id === user.id ? 'Cannot delete yourself' : 'Remove user'}
                        onClick={() => removeUser(u)}
                      >
                        <LuTrash2 /> {busyId === u.id ? '…' : 'Remove'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
