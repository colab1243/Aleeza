import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-heart">💌</span>
          <span className="logo-text">To My Love</span>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <span className="nav-icon">⏰</span>
            <span className="nav-text">Countdown</span>
          </Link>
          <Link 
            to="/memories" 
            className={`nav-link ${isActive('/memories') ? 'active' : ''}`}
          >
            <span className="nav-icon">📸</span>
            <span className="nav-text">Memories</span>
          </Link>
          <Link 
            to="/guestbook" 
            className={`nav-link ${isActive('/guestbook') ? 'active' : ''}`}
          >
            <span className="nav-icon">💌</span>
            <span className="nav-text">Guestbook</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

