import { useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useAuth } from '../lib/auth.jsx';
import { Mascot } from './ui.jsx';

/** Full-screen login wall — nothing in the academy is visible until signed in. */
export default function AuthGate() {
  const { login } = useAuth();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

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
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 dotgrid opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-tang/25 border-2 border-ink/10 pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-20 -left-16 w-64 h-64 rounded-full bg-aqua/20 border-2 border-ink/10 pointer-events-none" aria-hidden="true" />

      <div className="relative w-full max-w-md sticker bg-cream overflow-hidden anim-pop">
        <div className="bg-tang-soft border-b-2 border-ink px-5 py-5 flex items-center gap-3">
          <Mascot mood="happy" size={64} className="shrink-0" />
          <div>
            <div className="font-display text-2xl font-semibold leading-none">CodePlay</div>
            <div className="text-[10px] font-bold tracking-[.2em] text-ink-soft mt-1">ACADEMY</div>
            <p className="text-xs text-ink-soft mt-2">Use your Student ID and first name to sign in.</p>
          </div>
        </div>

        <form onSubmit={submit} className="px-5 py-5 space-y-3">
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
            <p className="text-[11px] text-ink-soft mt-1">Password = first name in lowercase (e.g. gaurav)</p>
          </label>

          {error && (
            <div className="rounded-xl border-2 border-blush-dark bg-blush-soft px-3 py-2 text-sm font-medium text-blush-dark anim-rise" role="alert">
              {error}
            </div>
          )}

          <button type="submit" disabled={busy} className="btn btn-primary w-full justify-center mt-1">
            {busy ? 'Please wait…' : 'Enter academy'}
          </button>

          <p className="text-center text-[11px] text-ink-soft pb-1">
            Made by Aditya Pandey
          </p>
        </form>
      </div>
    </div>
  );
}
