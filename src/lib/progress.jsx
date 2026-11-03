import { createContext, useContext, useEffect, useMemo, useReducer, useCallback, useRef } from 'react';
import { localAdapter, emptyState } from './storage.js';
import { celebrate, toast } from './celebrate.jsx';
import { useAuth } from './auth.jsx';
import { api } from './api.js';

const Ctx = createContext(null);

export const LEVELS = [
  { min: 0, name: 'Curious Beginner' },
  { min: 150, name: 'Tag Tinkerer' },
  { min: 400, name: 'Style Sprout' },
  { min: 800, name: 'Layout Learner' },
  { min: 1300, name: 'Script Scout' },
  { min: 2000, name: 'DOM Wizard' },
  { min: 3000, name: 'Web Builder' },
  { min: 4500, name: 'Code Champion' },
];

export function levelFor(xp) {
  let i = 0;
  for (let k = 0; k < LEVELS.length; k++) if (xp >= LEVELS[k].min) i = k;
  const cur = LEVELS[i];
  const next = LEVELS[i + 1];
  const pct = next ? Math.round(((xp - cur.min) / (next.min - cur.min)) * 100) : 100;
  return { index: i + 1, name: cur.name, next, pct, toNext: next ? next.min - xp : 0 };
}

export const today = (d = new Date()) => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
};

export function streakOf(activity) {
  let count = 0;
  const d = new Date();
  // Today counts if active; if not active today, the streak can still be alive from yesterday.
  if (!activity[today(d)]) d.setDate(d.getDate() - 1);
  while (activity[today(d)]) { count++; d.setDate(d.getDate() - 1); }
  return count;
}

function reducer(state, action) {
  const now = Date.now();
  switch (action.type) {
    case 'xp': {
      const day = today();
      return {
        ...state,
        xp: state.xp + action.amount,
        xpLog: [...state.xpLog.slice(-199), { at: now, amount: action.amount, reason: action.reason }],
        activity: { ...state.activity, [day]: (state.activity[day] || 0) + action.amount },
      };
    }
    case 'set': return { ...state, [action.key]: { ...state[action.key], [action.id]: action.value ?? now } };
    case 'unset': { const copy = { ...state[action.key] }; delete copy[action.id]; return { ...state, [action.key]: copy }; }
    case 'quiz': {
      const list = state.quizScores[action.topic] || [];
      return { ...state, quizScores: { ...state.quizScores, [action.topic]: [...list, { score: action.score, total: action.total, at: now }] } };
    }
    case 'mock': return { ...state, mockResults: [...state.mockResults, { ...action.result, at: now }] };
    case 'profile': return { ...state, profile: { ...state.profile, ...action.profile } };
    case 'experimentData': {
      const prev = state.experiments[action.id] || {};
      return { ...state, experiments: { ...state.experiments, [action.id]: { ...prev, data: { ...(prev.data || {}), ...action.data } } } };
    }
    case 'replace': return action.state;
    default: return state;
  }
}

function hasCloudProgress(p) {
  if (!p) return false;
  return (p.xp || 0) > 0
    || Object.keys(p.completedLessons || {}).length > 0
    || Object.keys(p.experiments || {}).length > 0
    || Object.keys(p.projects || {}).length > 0
    || Object.keys(p.missions || {}).length > 0;
}

export function ProgressProvider({ children, adapter = localAdapter }) {
  const { token, user, bootProgress, consumeBootProgress, isLoggedIn } = useAuth();
  const [state, dispatch] = useReducer(reducer, null, () => adapter.load());
  const skipCloudSave = useRef(false);
  const hydratedFor = useRef(null);

  useEffect(() => { adapter.save(state); }, [state, adapter]);

  // Pull cloud progress after login / session restore
  useEffect(() => {
    if (!isLoggedIn || !user || !bootProgress) return;
    if (hydratedFor.current === user.id) {
      consumeBootProgress();
      return;
    }
    const server = consumeBootProgress();
    if (!server) return;
    hydratedFor.current = user.id;
    skipCloudSave.current = true;
    if (hasCloudProgress(server)) {
      dispatch({
        type: 'replace',
        state: {
          ...emptyState(),
          ...server,
          profile: {
            ...emptyState().profile,
            ...server.profile,
            name: server.profile?.name || user.name || '',
            userId: user.id,
          },
        },
      });
    } else {
      const local = adapter.load();
      const merged = {
        ...local,
        profile: {
          ...local.profile,
          name: local.profile?.name || user.name || '',
          userId: user.id,
        },
      };
      dispatch({ type: 'replace', state: merged });
      api('/api/progress', { method: 'PUT', body: merged, token }).catch(() => {});
    }
  }, [isLoggedIn, user, bootProgress, consumeBootProgress, adapter, token]);

  useEffect(() => {
    if (!isLoggedIn) hydratedFor.current = null;
  }, [isLoggedIn]);

  // Debounced cloud sync while logged in
  useEffect(() => {
    if (!token || !isLoggedIn) return;
    if (skipCloudSave.current) {
      skipCloudSave.current = false;
      return;
    }
    const t = setTimeout(() => {
      api('/api/progress', { method: 'PUT', body: state, token }).catch(() => {});
    }, 900);
    return () => clearTimeout(t);
  }, [state, token, isLoggedIn]);

  const addXP = useCallback((amount, reason) => {
    dispatch({ type: 'xp', amount, reason });
  }, []);

  const progressApi = useMemo(() => ({
    state,
    addXP,
    hydrate(next) {
      skipCloudSave.current = true;
      dispatch({ type: 'replace', state: { ...emptyState(), ...next } });
    },
    completeLesson(id, title) {
      if (state.completedLessons[id]) return;
      dispatch({ type: 'set', key: 'completedLessons', id });
      addXP(50, `Lesson: ${title}`);
      celebrate(`Lesson complete! +50 XP`);
    },
    uncompleteLesson(id) { dispatch({ type: 'unset', key: 'completedLessons', id }); },
    visitLesson(id) { dispatch({ type: 'set', key: 'visitedLessons', id }); },
    toggleBookmark(id) {
      if (state.bookmarks[id]) { dispatch({ type: 'unset', key: 'bookmarks', id }); toast('Bookmark removed'); }
      else { dispatch({ type: 'set', key: 'bookmarks', id }); toast('Bookmarked for later'); }
    },
    completeExperiment(id, title) {
      if (state.experiments[id]?.done) return;
      dispatch({ type: 'set', key: 'experiments', id, value: { ...(state.experiments[id] || {}), done: Date.now() } });
      addXP(30, `Experiment: ${title}`);
      celebrate(`Experiment explored! +30 XP`);
    },
    experimentData(id, data) { dispatch({ type: 'experimentData', id, data }); },
    recordQuiz(topic, score, total) {
      dispatch({ type: 'quiz', topic, score, total });
      if (score > 0) addXP(score * 10, `Quiz: ${topic}`);
    },
    recordMock(result) {
      dispatch({ type: 'mock', result });
      addXP(Math.max(10, result.score * 5), `Mock test: ${result.title}`);
    },
    solveChallenge(id, title) {
      if (state.challenges[id]) return false;
      dispatch({ type: 'set', key: 'challenges', id });
      addXP(40, `Challenge: ${title}`);
      celebrate(`Challenge solved! +40 XP`);
      return true;
    },
    completeProject(id, title) {
      if (state.projects[id]?.done) return;
      dispatch({ type: 'set', key: 'projects', id, value: { done: Date.now() } });
      addXP(150, `Project: ${title}`);
      celebrate(`Project shipped! +150 XP`);
    },
    completeMission(id, title) {
      if (state.missions[id]) return;
      dispatch({ type: 'set', key: 'missions', id });
      addXP(100, `Mission: ${title}`);
      celebrate(`Mission accomplished: ${title}! +100 XP`, true);
    },
    completeDaily() {
      const d = today();
      if (state.daily[d]) return;
      dispatch({ type: 'set', key: 'daily', id: d, value: true });
      addXP(40, 'Daily challenge');
      celebrate('Daily challenge done! +40 XP');
    },
    markNotesRead(id) { if (!state.examNotesRead[id]) dispatch({ type: 'set', key: 'examNotesRead', id }); },
    setName(name) { dispatch({ type: 'profile', profile: { name } }); },
    reset() { dispatch({ type: 'replace', state: adapter.reset() }); toast('Progress reset'); },
    exportJSON() { return JSON.stringify(state, null, 2); },
  }), [state, addXP, adapter]);

  return <Ctx.Provider value={progressApi}>{children}</Ctx.Provider>;
}

export const useProgress = () => useContext(Ctx);
