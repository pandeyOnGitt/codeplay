// Storage adapter. Today progress lives in localStorage; tomorrow a backend can
// implement the same three methods (load, save, reset) and the rest of the app
// will not change. Keep the shape versioned so migrations are possible.
const KEY = 'codeplay-academy:v1';

export const SCHEMA_VERSION = 1;

export function emptyState() {
  return {
    version: SCHEMA_VERSION,
    profile: { name: '', createdAt: Date.now(), userId: null }, // userId reserved for future auth
    xp: 0,
    xpLog: [], // { at, amount, reason }
    activity: {}, // 'YYYY-MM-DD': xp earned that day
    completedLessons: {}, // lessonId: timestamp
    visitedLessons: {}, // lessonId: timestamp (for "recently explored")
    experiments: {}, // labId: { done: ts, data: {} }
    quizScores: {}, // topicId: [{ score, total, at }]
    mockResults: [], // { id, kind, score, total, at, perTopic: {topicId: [right,total]} }
    challenges: {}, // challengeId: timestamp
    projects: {}, // projectId: { done: ts }
    missions: {}, // missionId: timestamp
    daily: {}, // 'YYYY-MM-DD': true
    bookmarks: {}, // lessonId: timestamp
    examNotesRead: {}, // lessonId: timestamp
  };
}

export const localAdapter = {
  load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return emptyState();
      const data = JSON.parse(raw);
      return { ...emptyState(), ...data };
    } catch {
      return emptyState();
    }
  },
  save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable: progress lives in memory */ }
  },
  reset() {
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
    return emptyState();
  },
};
