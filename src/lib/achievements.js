import { TRACKS, ALL_LESSONS, MCQS, shuffleOptions, seeded } from '../data/syllabus.js';
import { streakOf } from './progress.jsx';

const count = (o) => Object.keys(o || {}).length;
const trackDone = (s, t) => TRACKS[t].lessons.every((l) => s.completedLessons[l.id]);

export const BADGES = [
  { id: 'first-step', title: 'First Step', desc: 'Complete your first lesson', color: '#FF8A3D', icon: '1', check: (s) => count(s.completedLessons) >= 1 },
  { id: 'five-lessons', title: 'On a Roll', desc: 'Complete 5 lessons', color: '#55B9E8', icon: '5', check: (s) => count(s.completedLessons) >= 5 },
  { id: 'fifteen-lessons', title: 'Bookworm', desc: 'Complete 15 lessons', color: '#78C86A', icon: '15', check: (s) => count(s.completedLessons) >= 15 },
  { id: 'html-hero', title: 'Structure Builder', desc: 'Finish every HTML lesson', color: '#FF8A3D', icon: '</>', check: (s) => trackDone(s, 'html') },
  { id: 'css-hero', title: 'Style Master', desc: 'Finish every CSS lesson', color: '#55B9E8', icon: '{ }', check: (s) => trackDone(s, 'css') },
  { id: 'js-hero', title: 'Script Wizard', desc: 'Finish every JavaScript lesson', color: '#FFD45C', icon: 'JS', check: (s) => trackDone(s, 'js') },
  { id: 'lab-rat', title: 'Lab Explorer', desc: 'Explore 5 experiments', color: '#F48FB1', icon: '⚗', check: (s) => Object.values(s.experiments).filter((e) => e.done).length >= 5 },
  { id: 'lab-master', title: 'Mad Scientist', desc: 'Explore 15 experiments', color: '#F48FB1', icon: '⚛', check: (s) => Object.values(s.experiments).filter((e) => e.done).length >= 15 },
  { id: 'quiz-ace', title: 'Quiz Ace', desc: 'Get 100% on any quiz', color: '#78C86A', icon: '✓', check: (s) => Object.values(s.quizScores).some((l) => l.some((r) => r.score === r.total && r.total > 0)) },
  { id: 'solver', title: 'Problem Solver', desc: 'Solve 5 coding challenges', color: '#55B9E8', icon: '⌘', check: (s) => count(s.challenges) >= 5 },
  { id: 'builder', title: 'Builder', desc: 'Complete your first mini project', color: '#FF8A3D', icon: '⚒', check: (s) => Object.values(s.projects).some((p) => p.done) },
  { id: 'streak-3', title: 'Warming Up', desc: '3-day learning streak', color: '#FFD45C', icon: '3d', check: (s) => streakOf(s.activity) >= 3 },
  { id: 'streak-7', title: 'Unstoppable', desc: '7-day learning streak', color: '#FF8A3D', icon: '7d', check: (s) => streakOf(s.activity) >= 7 },
  { id: 'exam-ready', title: 'Exam Ready', desc: 'Score 80%+ on a full-syllabus mock test', color: '#78C86A', icon: 'A+', check: (s) => s.mockResults.some((r) => r.kind === 'full' && r.score / r.total >= 0.8) },
  { id: 'note-taker', title: 'Note Taker', desc: 'Read 10 exam-ready notes', color: '#55B9E8', icon: '✎', check: (s) => count(s.examNotesRead) >= 10 },
  { id: 'xp-1000', title: 'XP Collector', desc: 'Earn 1,000 XP', color: '#F48FB1', icon: 'XP', check: (s) => s.xp >= 1000 },
];

/** Per-topic quiz/mock accuracy → weak topics (below 60% with at least 2 answers). */
export function topicStats(state) {
  const stats = {};
  const add = (topic, right, total) => { stats[topic] = stats[topic] || { right: 0, total: 0 }; stats[topic].right += right; stats[topic].total += total; };
  for (const [topic, list] of Object.entries(state.quizScores)) list.forEach((r) => add(topic, r.score, r.total));
  for (const m of state.mockResults) for (const [topic, [r, t]] of Object.entries(m.perTopic || {})) add(topic, r, t);
  return stats;
}

export function weakTopics(state) {
  const st = topicStats(state);
  return Object.entries(st)
    .filter(([, v]) => v.total >= 2 && v.right / v.total < 0.6)
    .map(([topic, v]) => ({ topic, pct: Math.round((v.right / v.total) * 100), lesson: ALL_LESSONS.find((l) => l.id === topic) }))
    .filter((x) => x.lesson)
    .sort((a, b) => a.pct - b.pct);
}

/** Deterministic daily question so everyone gets the same one on a given day. */
export function dailyQuestion(dateStr) {
  let h = 0;
  for (const ch of dateStr) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return shuffleOptions(MCQS[h % MCQS.length], seeded(dateStr));
}
