import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import TutorialsPage from './pages/TutorialsPage';
import ChallengesPage from './pages/ChallengesPage';

// EditorPage wrapper: reads location state or URL search params (?lang=)
function EditorWrapper() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const langParam = searchParams.get('lang');
  const state = location.state || {};

  // state.snippet → full snippet object (from dashboard)
  // state.code + state.language → from tutorials / challenges "Run in Editor"
  // langParam → from navbar/homepage compiler links (?lang=cpp)
  const initialSnippet =
    state.snippet ||
    (state.code
      ? {
          code: state.code,
          language: state.language,
          title: '',
          challengeTitle: state.challengeTitle || '',
          _id: null,
        }
      : langParam
      ? {
          language: langParam,
          title: '',
          challengeTitle: '',
          _id: null,
        }
      : null);

  const key = state.snippet?._id || state.challengeTitle || state.language || langParam || 'default';
  return <EditorPage key={key} initialSnippet={initialSnippet} />;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<EditorWrapper />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#21262d',
              color: '#e6edf3',
              border: '1px solid #30363d',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
            },
            success: {
              iconTheme: { primary: '#3fb950', secondary: '#0d1117' },
            },
            error: {
              iconTheme: { primary: '#f85149', secondary: '#0d1117' },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}
