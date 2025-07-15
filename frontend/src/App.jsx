import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { JoinRoom } from './pages/JoinRoom';
import { LiveStream } from './pages/LiveStream';
import { Recordings } from './pages/Recordings';
import { About } from './pages/About';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-secondary-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/join/:roomCode" element={<JoinRoom />} />
            <Route path="/stream" element={<LiveStream />} />
            <Route path="/recordings" element={<Recordings />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

      </div>
    </ErrorBoundary>
  );
}

// 404 Component
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-secondary-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-secondary-700 mb-4">Page Not Found</h2>
      <p className="text-secondary-600 mb-8">The page you're looking for doesn't exist.</p>
      <a 
        href="/" 
        className="btn btn-primary btn-lg"
      >
        Go Home
      </a>
    </div>
  );
}

export default App; 