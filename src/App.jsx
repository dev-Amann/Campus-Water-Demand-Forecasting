import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Droplets, TrendingUp, BarChart3, Activity, Menu, X, BookOpen, LineChart, Sparkles } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Predictor from './components/Predictor';
import Insights from './components/Insights';
import Docs from './components/Docs';
import HistoryAnalysis from './components/HistoryAnalysis';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="navbar glass-card">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand" onClick={handleLinkClick}>
            <Droplets size={28} />
            <span>AquaFlow AI</span>
          </Link>

          {/* Desktop Links */}
          <div className="navbar-links">
            <Link to="/" className={`nav-link ${isActive('/')}`} onClick={handleLinkClick}>Dashboard</Link>
            <Link to="/predict" className={`nav-link ${isActive('/predict')}`} onClick={handleLinkClick}>Simulator</Link>
            <Link to="/analysis" className={`nav-link ${isActive('/analysis')}`} onClick={handleLinkClick}>Analysis</Link>
            <Link to="/insights" className={`nav-link ${isActive('/insights')}`} onClick={handleLinkClick}>Insights</Link>
            <Link to="/docs" className={`nav-link ${isActive('/docs')}`} onClick={handleLinkClick}>Docs</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar & Overlay */}
      <div 
        className={`sidebar-overlay ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      ></div>
      
      <div className={`mobile-sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="navbar-brand">
            <Droplets size={24} />
            <span>Menu</span>
          </div>
          <button className="close-sidebar" onClick={toggleMenu}>
            <X size={24} />
          </button>
        </div>
        
        <div className="sidebar-links">
          <Link to="/" className={`sidebar-link ${isActive('/')}`} onClick={handleLinkClick}>
            <Activity size={20} /> Dashboard
          </Link>
          <Link to="/predict" className={`sidebar-link ${isActive('/predict')}`} onClick={handleLinkClick}>
            <TrendingUp size={20} /> Simulator
          </Link>
          <Link to="/analysis" className={`sidebar-link ${isActive('/analysis')}`} onClick={handleLinkClick}>
            <BarChart3 size={20} /> Analysis
          </Link>
          <Link to="/insights" className={`sidebar-link ${isActive('/insights')}`} onClick={handleLinkClick}>
            <LineChart size={20} /> Insights
          </Link>
          <Link to="/docs" className={`sidebar-link ${isActive('/docs')}`} onClick={handleLinkClick}>
            <BookOpen size={20} /> Docs
          </Link>
        </div>

        <div className="sidebar-footer">
          <p>AquaFlow v2.0</p>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app-container top-nav">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/predict" element={<Predictor />} />
            <Route path="/analysis" element={<HistoryAnalysis />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </main>

        {/* Backend Status Notification */}
        <div className={`status-notification ${showNotification ? 'active' : ''}`}>
          <div className="status-icon">
            <Sparkles size={22} className="text-yellow-400" />
          </div>
          <div className="status-content">
            <h4><span className="status-glow"></span>System Initialization</h4>
            <p>Our backend is hosted on Render. It may take 30-60s to wake up if inactive. Please wait...</p>
          </div>
          <button 
            className="close-notification" 
            onClick={() => setShowNotification(false)}
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>

        <footer className="footer-main">
          <div className="container" style={{textAlign: 'center', padding: '3rem 0', borderTop: '1px solid var(--border)'}}>
            <p className="text-muted mb-2">AquaFlow AI © 2026 Campus Sustainability initiative</p>
            <p style={{fontSize: '0.9rem'}}>
              Developed by <a href="https://amann-singh.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary hover-underline" style={{fontWeight: '600', textDecoration: 'none'}}>AMAN SINGH</a>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
