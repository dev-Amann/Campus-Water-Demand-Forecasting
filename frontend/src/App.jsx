import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Droplets, TrendingUp, BarChart3, Activity } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Predictor from './components/Predictor';
import Insights from './components/Insights';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="sidebar">
      <h1><Droplets className="inline-block mr-2" /> AquaFlow AI</h1>
      
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive('/')}`}>
          <BarChart3 size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/predict" className={`nav-link ${isActive('/predict')}`}>
          <Activity size={20} />
          <span>Predict Demand</span>
        </Link>
        <Link to="/insights" className={`nav-link ${isActive('/insights')}`}>
          <TrendingUp size={20} />
          <span>Project Insights</span>
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
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/predict" element={<Predictor />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
