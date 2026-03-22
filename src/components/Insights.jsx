import React from 'react';
import { Target, Leaf, Cpu, LineChart, Lightbulb, Users, BarChart } from 'lucide-react';

const Insights = () => {
  return (
    <div>
      <div className="dashboard-header">
        <h2>Project Insights & Benefits</h2>
        <p>Key findings from the AI Model and value proposition for stakeholders.</p>
      </div>

      <div className="charts-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'}}>
        
        <div className="glass-card">
          <h3 style={{marginBottom: '1.5rem', fontSize: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <Lightbulb /> Key AI Findings
          </h3>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
              <div style={{background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '0.5rem'}}>
                <Users size={24} />
              </div>
              <div>
                <h4 style={{fontSize: '1.1rem', marginBottom: '0.25rem'}}>Occupancy is the Primary Driver</h4>
                <p style={{color: 'var(--text-muted)'}}>The AI model identified that the combined number of students and staff on campus correlates highest with water usage spikes, overriding minor temperature changes.</p>
              </div>
            </div>

            <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
              <div style={{background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', padding: '0.75rem', borderRadius: '0.5rem'}}>
                <BarChart size={24} />
              </div>
              <div>
                <h4 style={{fontSize: '1.1rem', marginBottom: '0.25rem'}}>Special Events Amplification</h4>
                <p style={{color: 'var(--text-muted)'}}>During Sports Events and Festivals, baseline water consumption per capita significantly increases due to landscaping, vendor usage, and increased facility stress.</p>
              </div>
            </div>

            <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
              <div style={{background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '0.75rem', borderRadius: '0.5rem'}}>
                <LineChart size={24} />
              </div>
              <div>
                <h4 style={{fontSize: '1.1rem', marginBottom: '0.25rem'}}>Temperature Thresholds</h4>
                <p style={{color: 'var(--text-muted)'}}>Water usage sees a non-linear spike when temperature crosses 34°C, primarily due to increased HVAC cooling tower requirements and grounds maintenance.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{marginBottom: '1.5rem', fontSize: '1.25rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <Target /> Stakeholder Benefits
          </h3>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
              <div style={{background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', padding: '0.75rem', borderRadius: '0.5rem'}}>
                <Cpu size={24} />
              </div>
              <div>
                <h4 style={{fontSize: '1.1rem', marginBottom: '0.25rem'}}>Optimized Pumping Operations</h4>
                <p style={{color: 'var(--text-muted)'}}>Facility managers can use daily forecasts to schedule pumping operations during off-peak energy hours, preventing over-pressurization and extending pump lifespans.</p>
              </div>
            </div>

            <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
              <div style={{background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', padding: '0.75rem', borderRadius: '0.5rem'}}>
                <Leaf size={24} />
              </div>
              <div>
                <h4 style={{fontSize: '1.1rem', marginBottom: '0.25rem'}}>Sustainable Resource Management</h4>
                <p style={{color: 'var(--text-muted)'}}>By actively matching supply with predicted demand instead of relying on a flat-rate schedule, the campus immediately reduces its overall water wastage and energy footprint.</p>
              </div>
            </div>

            <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
              <div style={{background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '0.5rem'}}>
                <LineChart size={24} />
              </div>
              <div>
                <h4 style={{fontSize: '1.1rem', marginBottom: '0.25rem'}}>Data-Driven Budgeting</h4>
                <p style={{color: 'var(--text-muted)'}}>Finance and operations teams gain predictive capability over utility expenditures, improving quarterly budgeting accuracy against seasonal variances.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Insights;
