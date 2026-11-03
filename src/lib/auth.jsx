import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api, getToken, setToken } from './api.js';
import { toast } from './celebrate.jsx';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(() => getToken());
  const [loading, setLoading] = useState(() => !!getToken());
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  /** Latest server progress from login/me — consumed by ProgressSync */
  const [bootProgress, setBootProgress] = useState(null);

  const applySession = useCallback((nextToken, nextUser, progress) => {
    setToken(nextToken);
    setTokenState(nextToken);
    setUser(nextUser);
    if (progress) setBootProgress(progress);
  }, []);

  const clearSession = useCallback(() => {
    setToken(null);
    setTokenState(null);
    setUser(null);
    setBootProgress(null);
  }, []);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const data = await api('/api/auth/me', { token });
        if (cancelled) return;
        setUser(data.user);
        if (data.progress) setBootProgress(data.progress);
      } catch {
        if (!cancelled) clearSession();
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [token, clearSession]);

  const openAuth = useCallback((mode = 'login') => {
    setAuthMode(mode);
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => setAuthOpen(false), []);

  const login = useCallback(async (username, password) => {
    const data = await api('/api/auth/login', {
      method: 'POST',
      body: { username, email: username, password },
    });
    applySession(data.token, data.user, data.progress);
    setAuthOpen(false);
    toast(`Welcome back, ${data.user.name}!`, 'win');
    return data;
  }, [applySession]);

  const register = useCallback(async (name, email, password) => {
    const data = await api('/api/auth/register', { method: 'POST', body: { name, email, password } });
    let progress = data.progress || null;
    if (!progress) {
      try {
        const prog = await api('/api/progress', { token: data.token });
        progress = prog.progress;
      } catch { /* local progress will upload on next sync */ }
    }
    applySession(data.token, data.user, progress);
    setAuthOpen(false);
    toast(`Account ready — hi ${data.user.name}!`, 'win');
    return data;
  }, [applySession]);

  const logout = useCallback(() => {
    clearSession();
    toast('Logged out');
  }, [clearSession]);

  const consumeBootProgress = useCallback(() => {
    const p = bootProgress;
    setBootProgress(null);
    return p;
  }, [bootProgress]);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    isLoggedIn: !!user,
    isAdmin: user?.role === 'admin',
    authOpen,
    authMode,
    setAuthMode,
    openAuth,
    closeAuth,
    login,
    register,
    logout,
    bootProgress,
    consumeBootProgress,
  }), [user, token, loading, authOpen, authMode, openAuth, closeAuth, login, register, logout, bootProgress, consumeBootProgress]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
