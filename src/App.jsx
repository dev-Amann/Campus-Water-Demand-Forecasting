import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Droplets, TrendingUp, BarChart3, Activity, Menu, X, BookOpen, LineChart } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Predictor from './components/Predictor';
import Insights from './components/Insights';
import Docs from './components/Docs';
import HistoryAnalysis from './components/HistoryAnalysis';

const Sidebar = ({ isOpen, toggleMenu }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  // Close menu when a link is clicked on mobile
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h1><Droplets className="inline-block mr-2" /> AquaFlow AI</h1>
        <button className="mobile-close" onClick={toggleMenu}>
          <X size={24} />
        </button>
      </div>
      
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive('/')}`} onClick={handleLinkClick}>
          <BarChart3 size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/predict" className={`nav-link ${isActive('/predict')}`} onClick={handleLinkClick}>
          <Activity size={20} />
          <span>Predict Demand</span>
        </Link>
        <Link to="/analysis" className={`nav-link ${isActive('/analysis')}`} onClick={handleLinkClick}>
          <LineChart size={20} />
          <span>History Analysis</span>
        </Link>
        <Link to="/insights" className={`nav-link ${isActive('/insights')}`} onClick={handleLinkClick}>
          <TrendingUp size={20} />
          <span>Project Insights</span>
        </Link>
        <Link to="/docs" className={`nav-link ${isActive('/docs')}`} onClick={handleLinkClick}>
          <BookOpen size={20} />
          <span>Documentation</span>
        </Link>
      </div>
      
      <div className="sidebar-footer" style={{marginTop: 'auto'}}>
        <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>
          Campus Water Demand<br/>Forecasting © 2026
        </p>
      </div>
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <Menu size={24} />
        </button>
        
        {isMenuOpen && <div className="sidebar-overlay" onClick={toggleMenu}></div>}
        
        <Sidebar isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/predict" element={<Predictor />} />
            <Route path="/analysis" element={<HistoryAnalysis />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
