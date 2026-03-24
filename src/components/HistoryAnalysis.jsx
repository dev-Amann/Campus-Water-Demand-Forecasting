import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Activity, Thermometer, Droplets, Users, Calendar, TrendingUp } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const HistoryAnalysis = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/analysis`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">Analyzing Historical Patterns...</div>;
  if (!data) return <div className="p-8 text-center text-red-400">Failed to load analysis.</div>;

  const { correlations, distribution, statistics } = data;

  const correlationData = [
    { name: 'Temperature', value: correlations.Temperature_C, color: '#f59e0b', icon: <Thermometer size={20}/> },
    { name: 'Rainfall', value: correlations.Rainfall_mm, color: '#3b82f6', icon: <Droplets size={20}/> },
    { name: 'Occupancy', value: correlations.Occupancy, color: '#10b981', icon: <Users size={20}/> },
    { name: 'Special Events', value: correlations.Event, color: '#ec4899', icon: <Calendar size={20}/> },
  ].sort((a,b) => b.value - a.value);

  const formatLiters = (val) => `${(val / 1000).toFixed(1)}k L`;

  return (
    <div className="animate-fade-in">
      <div className="dashboard-header">
        <h2>Historical Data Analysis</h2>
        <p>In-depth statistical exploration of campus water consumption patterns.</p>
      </div>

      {/* Summary Cards */}
      <div className="metrics-grid mb-8">
        <div className="glass-card">
          <h4 className="text-muted text-xs mb-2 uppercase">Mean Daily Usage</h4>
          <p className="text-2xl font-bold">{formatLiters(statistics.mean)}</p>
          <div className="mt-2 text-xs text-accent">Standard Dev: {formatLiters(statistics.std)}</div>
        </div>
        <div className="glass-card">
          <h4 className="text-muted text-xs mb-2 uppercase">Historical Peak</h4>
          <p className="text-2xl font-bold text-red-400">{formatLiters(statistics.max)}</p>
          <div className="mt-2 text-xs text-muted">Median: {formatLiters(statistics.median)}</div>
        </div>
        <div className="glass-card">
          <h4 className="text-muted text-xs mb-2 uppercase">Data Sample Size</h4>
          <p className="text-2xl font-bold text-primary">{statistics.total_records} Days</p>
          <div className="mt-2 text-xs text-muted">Full 2025 Calendar Year</div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Correlation Matrix */}
        <div className="glass-card">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-primary" /> Feature-Usage Correlation
          </h3>
          <div className="space-y-6">
            {correlationData.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  <span className="font-mono">{(item.value * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000" 
                    style={{ width: `${Math.abs(item.value * 100)}%`, background: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted italic">
            *Percentage indicates the statistical strength of the relationship between the feature and water demand.
          </p>
        </div>

        {/* Usage Distribution */}
        <div className="glass-card">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Activity className="text-accent" /> Consumption Distribution
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="range" stroke="var(--text-muted)" fontSize={10} />
                <YAxis stroke="var(--text-muted)" fontSize={10} />
                <Tooltip 
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                />
                <Bar dataKey="count" name="Days Count" radius={[4, 4, 0, 0]}>
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index > 5 ? '#ec4899' : '#3b82f6'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-muted text-center">
            Frequency of Daily Water Consumption Ranges
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryAnalysis;
