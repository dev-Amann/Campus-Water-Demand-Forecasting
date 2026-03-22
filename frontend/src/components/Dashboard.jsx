import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Droplets, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/dashboard`);
        setData(response.data.data);
        setMonthlyData(response.data.monthly_data);
        setSummary(response.data.summary);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div style={{color: 'var(--primary)', fontSize: '1.2rem', textAlign: 'center'}}>
          <Droplets size={48} className="animate-bounce mx-auto mb-4" />
          <p>Loading AI Predictions...</p>
        </div>
      </div>
    );
  }

  const formatNumber = (num) => num ? num.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isMonth = Number.isInteger(Number(label)) && label >= 1 && label <= 12;
      const displayLabel = isMonth ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][label - 1] : label;
      
      return (
        <div className="custom-tooltip">
          <p className="label" style={{fontWeight: 700}}>{displayLabel}</p>
          {payload.map((entry, index) => (
             <p key={index} className="intro" style={{color: entry.color}}>
                {entry.name}: {formatNumber(entry.value)} L
             </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="dashboard-header">
        <h2>Campus Water Demand Forecasting (2025)</h2>
        <p>AI-driven ML predictions vs actual consumption for the Campus Operations Project using 2025 data.</p>
      </div>

      {summary && (
        <div className="metrics-grid">
          <div className="glass-card metric-card">
            <div className="metric-icon"><Droplets /></div>
            <div className="metric-info">
              <h3>Total Usage (Liters)</h3>
              <p>{formatNumber(summary.total_usage)}</p>
            </div>
          </div>
          <div className="glass-card metric-card">
            <div className="metric-icon success"><CheckCircle /></div>
            <div className="metric-info">
              <h3>Predicted Total (Liters)</h3>
              <p>{formatNumber(summary.total_predicted)}</p>
            </div>
          </div>
          <div className="glass-card metric-card">
            <div className="metric-icon" style={{color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)'}}>
              <AlertTriangle />
            </div>
            <div className="metric-info">
              <h3>Max Temp Alert (C)</h3>
              <p>{summary.max_temp}°</p>
            </div>
          </div>
        </div>
      )}

      <div className="charts-grid">
        <div className="glass-card chart-container">
          <h3 style={{marginBottom: '1.5rem', fontSize: '1.25rem'}}>Actual vs Predicted Demand Over Time</h3>
          <div className="chart-scroll-area" style={{width: '100%', height: '310px', overflowX: 'auto', overflowY: 'hidden', paddingBottom: '8px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.slice(0, 50)} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="Date" stroke="var(--text-muted)" tick={{fontSize: 12}} />
                <YAxis stroke="var(--text-muted)" tick={{fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="Water_Usage_Liters" name="Actual Usage" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsage)" />
                <Area type="monotone" dataKey="Predicted_Usage" name="Predicted Demand" stroke="#10b981" fillOpacity={1} fill="url(#colorPredicted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card chart-container">
          <h3 style={{marginBottom: '1.5rem', fontSize: '1.25rem'}}>Usage vs Temperature</h3>
          <div className="chart-scroll-area" style={{width: '100%', height: '310px', overflowX: 'auto', overflowY: 'hidden', paddingBottom: '8px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.slice().sort((a,b)=>a.Temperature_C - b.Temperature_C).slice(0, 50)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="Temperature_C" name="Temp(C)" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="Water_Usage_Liters" name="Water Usage" stroke="#8b5cf6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card chart-container" style={{gridColumn: '1 / -1'}}>
          <h3 style={{marginBottom: '1.5rem', fontSize: '1.25rem'}}>Monthly Campus Water Demand (2025)</h3>
          <div className="chart-scroll-area" style={{width: '100%', height: '310px', overflowX: 'auto', overflowY: 'hidden', paddingBottom: '8px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="Month" stroke="var(--text-muted)" tickFormatter={(val) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][val - 1] || val} />
                <YAxis stroke="var(--text-muted)" domain={['dataMin - 100000', 'dataMax + 100000']} tickFormatter={(val) => `${(val / 1000).toLocaleString()}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="Water_Usage_Liters" name="Actual Usage" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Predicted_Usage" name="Predicted Demand" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 5 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card chart-container" style={{gridColumn: '1 / -1'}}>
          <h3 style={{marginBottom: '1.5rem', fontSize: '1.25rem'}}>Occupancy & Events Impact</h3>
          <div className="chart-scroll-area" style={{width: '100%', height: '310px', overflowX: 'auto', overflowY: 'hidden', paddingBottom: '8px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.filter(d => d.Event !== 'None').slice(0, 30)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="Event" stroke="var(--text-muted)" />
                <YAxis yAxisId="left" stroke="var(--text-muted)" tickFormatter={(val) => `${(val / 1000).toLocaleString()}k`} />
                <YAxis yAxisId="right" orientation="right" stroke="#6366f1" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar yAxisId="left" dataKey="Water_Usage_Liters" name="Water Usage (Liters)" fill="#ec4899" radius={[4,4,0,0]} />
                <Bar yAxisId="right" dataKey="Occupancy" name="Campus Occupancy (People)" fill="#6366f1" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
