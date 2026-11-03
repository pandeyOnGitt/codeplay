/** Backend base URL. Override with window.CODEPLAY_API if needed. */
export const API_BASE =
  (typeof window !== 'undefined' && window.CODEPLAY_API) || 'http://localhost:5000';

const TOKEN_KEY = 'codeplay-academy:token';

export function getToken() {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch { /* ignore */ }
}

export async function api(path, { method = 'GET', body, token } = {}) {
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const auth = token ?? getToken();
  if (auth) headers.Authorization = `Bearer ${auth}`;

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    const err = new Error('Cannot reach the server. Is the backend running on port 5000?');
    err.network = true;
    throw err;
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.errors = data.errors;
    throw err;
  }
  return data;
}
