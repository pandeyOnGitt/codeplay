import { Component, useEffect } from 'react';
import { RouterProvider, useRouter, parseRoute } from './lib/router.jsx';
import { AuthProvider, useAuth } from './lib/auth.jsx';
import { ProgressProvider, useProgress } from './lib/progress.jsx';
import { CelebrationLayer } from './lib/celebrate.jsx';
import { MISSIONS } from './data/syllabus.js';
import Layout from './components/Layout.jsx';
import AuthGate from './components/AuthGate.jsx';
import AuthModal from './components/AuthModal.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Roadmap from './pages/Roadmap.jsx';
import Track from './pages/Track.jsx';
import Lesson from './pages/Lesson.jsx';
import Playground from './pages/Playground.jsx';
import PlayHub from './pages/PlayHub.jsx';
import Lab from './pages/Lab.jsx';
import { Projects, Project } from './pages/Projects.jsx';
import Practice from './pages/Practice.jsx';
import { Exam, ExamNotes } from './pages/Exam.jsx';
import MockTest from './pages/MockTest.jsx';
import Progress from './pages/Progress.jsx';
import Achievements from './pages/Achievements.jsx';
import Admin from './pages/Admin.jsx';
import { Empty, Mascot } from './components/ui.jsx';

function Pages() {
  const { route } = useRouter();
  const { page, param } = parseRoute(route);
  switch (page) {
    case 'home': return <Dashboard />;
    case 'roadmap': return <Roadmap />;
    case 'track': return <Track id={param} />;
    case 'lesson': return <Lesson id={param} />;
    case 'playground': return <Playground />;
    case 'play': return <PlayHub />;
    case 'lab': return <Lab id={param} />;
    case 'projects': return <Projects />;
    case 'project': return <Project id={param} />;
    case 'practice': return <Practice />;
    case 'exam': return <Exam tab={param} />;
    case 'notes': return <ExamNotes id={param} />;
    case 'mock': return <MockTest kind={param} />;
    case 'progress': return <Progress />;
    case 'achievements': return <Achievements />;
    case 'admin': return <Admin />;
    default: return <NotFound />;
  }
}

function NotFound() {
  return <Empty title="This page wandered off" art={<Mascot mood="think" />}>We could not find that page. Try the sidebar or the search box.</Empty>;
}

/** Watches progress and awards missions as soon as their condition becomes true. */
function MissionWatcher() {
  const { state, completeMission } = useProgress();
  useEffect(() => {
    for (const m of MISSIONS) if (!state.missions[m.id] && m.check(state)) completeMission(m.id, m.title);
  }, [state, completeMission]);
  return null;
}

class ErrorBoundary extends Component {
  constructor(p) { super(p); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  render() {
    if (this.state.err) return (
      <div className="p-8 max-w-lg mx-auto text-center">
        <Mascot mood="wow" className="mx-auto" />
        <h2 className="text-2xl font-semibold mt-2">Something broke on this page</h2>
        <p className="text-ink-soft mt-1 text-sm">{String(this.state.err.message || this.state.err)}</p>
        <button className="btn btn-primary mt-4" onClick={() => { this.setState({ err: null }); window.location.hash = 'home'; }}>Back to dashboard</button>
      </div>
    );
    return this.props.children;
  }
}

function KeyedBoundary({ children }) {
  const { route } = useRouter();
  return <ErrorBoundary key={route}>{children}</ErrorBoundary>;
}

function AuthenticatedApp() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center anim-rise">
          <Mascot mood="happy" size={80} className="mx-auto anim-bob" />
          <p className="mt-3 text-sm font-semibold text-ink-soft">Checking your session…</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) return <AuthGate />;

  return (
    <>
      <Layout>
        <KeyedBoundary><Pages /></KeyedBoundary>
      </Layout>
      <AuthModal />
      <MissionWatcher />
    </>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <ProgressProvider>
          <AuthenticatedApp />
          <CelebrationLayer />
        </ProgressProvider>
      </AuthProvider>
    </RouterProvider>
  );
}
