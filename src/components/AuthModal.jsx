import { useEffect, useState } from 'react';
import { LuX, LuEye, LuEyeOff } from 'react-icons/lu';
import { useAuth } from '../lib/auth.jsx';
import { Mascot } from './ui.jsx';

export default function AuthModal() {
  const { authOpen, closeAuth, login } = useAuth();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authOpen) return;
    setError('');
    setPassword('');
  }, [authOpen]);

  useEffect(() => {
    if (!authOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') closeAuth(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [authOpen, closeAuth]);

  if (!authOpen) return null;

  async function submit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(loginId.trim(), password);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]" onClick={closeAuth} />
      <div className="relative w-full max-w-md sticker bg-cream p-0 overflow-hidden anim-pop">
        <div className="bg-tang-soft border-b-2 border-ink px-5 py-4 flex items-start gap-3">
          <Mascot mood="happy" size={56} className="shrink-0" />
          <div className="min-w-0 flex-1 pt-1">
            <h2 id="auth-title" className="font-display text-xl font-semibold leading-tight">Welcome back</h2>
            <p className="text-xs text-ink-soft mt-1">Sign in with your Student ID and first name.</p>
          </div>
          <button type="button" className="btn px-2.5 py-1.5" onClick={closeAuth} aria-label="Close">
            <LuX />
          </button>
        </div>

        <form onSubmit={submit} className="px-5 py-4 space-y-3">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">Student ID</span>
            <input
              required
              type="text"
              autoComplete="username"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-xl border-2 border-ink bg-white text-sm font-mono focus:outline-none focus:ring-4 focus:ring-aqua/40 uppercase"
              style={{ textTransform: 'uppercase' }}
              placeholder="BTAI2026…"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">Password</span>
            <div className="mt-1 relative">
              <input
                required
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                minLength={2}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 pr-11 rounded-xl border-2 border-ink bg-white text-sm focus:outline-none focus:ring-4 focus:ring-aqua/40"
                placeholder="First name (lowercase)"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-ink-soft hover:bg-mist"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <LuEyeOff /> : <LuEye />}
              </button>
            </div>
          </label>

          {error && (
            <div className="rounded-xl border-2 border-blush-dark bg-blush-soft px-3 py-2 text-sm font-medium text-blush-dark anim-rise" role="alert">
              {error}
            </div>
          )}

          <button type="submit" disabled={busy} className="btn btn-primary w-full justify-center mt-1">
            {busy ? 'Please wait…' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
}
