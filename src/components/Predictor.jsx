import React, { useState } from 'react';
import axios from 'axios';
import { Activity, Thermometer, CloudRain, Users, Calendar, ArrowRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Predictor = () => {
  const [formData, setFormData] = useState({
    targetDate: '2026-06-15',
    temperature: 25.0,
    rainfall: 0.0,
    occupancy: 5000,
    event: 0
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modelStats, setModelStats] = useState(null);

  React.useEffect(() => {
    axios.get(`${API_URL}/model_stats`).then(res => setModelStats(res.data)).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const targetDateObj = new Date(formData.targetDate);
    // JS getDay(): 0 is Sunday, 1 is Monday. Python: 0 is Monday, 6 is Sunday.
    const dayNum = targetDateObj.getDay() === 0 ? 6 : targetDateObj.getDay() - 1; 

    const payload = {
      ...formData,
      month: targetDateObj.getMonth() + 1,
      day_num: dayNum
    };

    try {
      const response = await axios.post(`${API_URL}/predict`, payload);
      setResult(response.data);
    } catch (error) {
      console.error("Prediction error", error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => num ? num.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 0;

  return (
    <div>
      <div className="dashboard-header">
        <h2>2026 Prediction Simulator</h2>
        <p>Use our newly tuned ML Regression model (GradientBoosting) to forecast future daily requirements.</p>
      </div>

      {modelStats && (
        <div style={{marginBottom: '2rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(59, 130, 246, 0.5)'}}>
          <h4 style={{color: 'var(--primary)', marginBottom: '0.5rem'}}>Model Accuracy (Retrained)</h4>
          <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>
            Mean Absolute Error (MAE): <strong style={{color: 'white'}}>{modelStats.mae.toLocaleString(undefined, { maximumFractionDigits: 1 })} Liters</strong> | 
            Root Mean Squared Error (RMSE): <strong style={{color: 'white'}}>{modelStats.rmse.toLocaleString(undefined, { maximumFractionDigits: 1 })} Liters</strong>
          </p>
        </div>
      )}

      <div className="charts-grid">
        <div className="glass-card">
          <h3 style={{marginBottom: '1.5rem', fontSize: '1.25rem'}}>Simulation Inputs</h3>
          
          <form onSubmit={handlePredict}>
            <div className="form-group">
              <label><Calendar size={16} className="inline mr-2" /> Target Date (2026)</label>
              <input type="date" name="targetDate" className="form-control" value={formData.targetDate} min="2026-01-01" max="2026-12-31" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label><Thermometer size={16} className="inline mr-2" /> Temperature (°C)</label>
              <input type="number" step="0.1" name="temperature" className="form-control" value={formData.temperature} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label><CloudRain size={16} className="inline mr-2" /> Rainfall (mm)</label>
              <input type="number" step="0.1" name="rainfall" className="form-control" value={formData.rainfall} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label><Users size={16} className="inline mr-2" /> Student & Staff Occupancy</label>
              <input type="number" name="occupancy" className="form-control" value={formData.occupancy} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label><Calendar size={16} className="inline mr-2" /> Special Event?</label>
              <select name="event" className="form-control" value={formData.event} onChange={handleChange}>
                <option value={0}>No Event</option>
                <option value={1}>Yes, Special Event (Sports, Festival, etc.)</option>
              </select>
            </div>

            <button type="submit" className="btn" style={{width: '100%'}} disabled={loading}>
              {loading ? 'Running AI Model...' : <>Generate Prediction <ArrowRight size={18} /></>}
            </button>
          </form>
        </div>

        {result && (
          <div className="glass-card result-card-highlight">
            <div className="result-header">
              <Activity className="text-primary" size={24} />
              <h3>Analysis Report</h3>
            </div>
            
            <div className="prediction-main">
              <span className="prediction-label">Estimated Water Demand</span>
              <div className="prediction-value-wrapper">
                <span className="prediction-number">{formatNumber(result.prediction)}</span>
                <span className="prediction-unit">Liters</span>
              </div>
            </div>

            <div className="impact-stats-container">
              <div className="stat-row">
                <span className="stat-label">Unoptimized Baseline</span>
                <span className="stat-value">{formatNumber(result.baseline)} L</span>
              </div>
              <div className="stat-row highlight-stat">
                <span className="stat-label">Potential Water Saved</span>
                <span className="stat-value text-accent">-{formatNumber(result.water_saved)} L</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Est. Energy Saved</span>
                <span className="stat-value text-yellow-400">-{parseFloat(result.energy_saved).toFixed(2)} kWh</span>
              </div>
            </div>
            
            <div className="predictor-notes">
              <div className="note-card info">
                <p><strong>💡 Base Load:</strong> Even at 0 occupancy, ~115k L is required for facility maintenance and landscaping.</p>
              </div>
              <div className="note-card highlight">
                <p><strong>📊 Variable Impact:</strong> Model proves Temp and Occupancy dominate demand, while individual Events show minor statistical impact.</p>
              </div>
              <p className="disclaimer-text">* Accurate forecasting prevents pump wear and reduces campus energy footprint.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predictor;
