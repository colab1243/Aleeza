import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Countdown from './components/Countdown';
import MemoryWall from './components/MemoryWall';
import Dreams from './components/Dreams';
import Guestbook from './components/Guestbook';
import './App.css';

function App() {
  const targetDate = new Date('2025-12-31');
  const countdownTitle = "Until Forever";

  return (
    <Router>
      <div className="app">
        {/* Welcome message overlay */}
        <div className="welcome-overlay">
          <div className="welcome-content">
            <h1 className="welcome-title">To My Dearest Love</h1>
            <p className="welcome-subtitle">A little corner of the internet just for us...</p>
            <div className="welcome-decoration">❀ ✦ ❀</div>
          </div>
        </div>

        <Navigation />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Countdown targetDate={targetDate} title={countdownTitle} />}
            />
            <Route path="/memories" element={<MemoryWall />} />
            <Route path="/dreams" element={<Dreams />} />
            <Route path="/guestbook" element={<Guestbook />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

