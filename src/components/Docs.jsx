import React from 'react';
import { Book, Info, Code, ShieldCheck, Zap, Database, Server, Cpu, Activity, Globe } from 'lucide-react';

const Docs = () => {
  return (
    <div className="docs-page animate-fade-in">
      <div className="dashboard-header">
        <h2>Technical Documentation</h2>
        <p>A comprehensive guide to AquaFlow AI architecture, models, and operations.</p>
      </div>

      <div className="docs-sections">
        {/* Project Overview */}
        <section className="glass-card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Info className="text-primary" />
            <h3 className="text-xl font-bold">Project Overview</h3>
          </div>
          <p className="text-muted leading-relaxed">
            AquaFlow AI is an intelligent water management system that utilizes Gradient Boosting regression models to forecast water demand in campus environments. By analyzing historical consumption, weather patterns, and campus occupancy, it identifies anomalies and predicts future needs, optimizing municipal water delivery and local pumping schedules.
          </p>
        </section>

        {/* System Architecture */}
        <div className="docs-grid mb-8">
          <section className="glass-card">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="text-blue-400" />
              <h3 className="text-xl font-bold">Frontend (React/Vite)</h3>
            </div>
            <p className="text-muted text-sm mb-4">
              Built with **React 18** and **Vite**, utilizing **Recharts** for data visualization and **Lucide-React** for iconography. The UI is designed with a modern "Glassmorphism" aesthetic for high readability and premium feel.
            </p>
            <ul className="docs-list text-sm">
              <li>Responsive Mobile Design</li>
              <li>Real-time API Polling</li>
              <li>Interactive Data Filtering</li>
            </ul>
          </section>

          <section className="glass-card">
            <div className="flex items-center gap-3 mb-4">
              <Server className="text-purple-400" />
              <h3 className="text-xl font-bold">Backend (Flask)</h3>
            </div>
            <p className="text-muted text-sm mb-4">
              A **Flask-based REST API** serves data from the machine learning model. It handles data preprocessing, model inference, and serves historical/predicted metrics to the frontend.
            </p>
            <ul className="docs-list text-sm">
              <li>Automated Preprocessing</li>
              <li>Robust Error Handling</li>
              <li>CORS Enabled Security</li>
            </ul>
          </section>
        </div>

        {/* Machine Learning Model */}
        <section className="glass-card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="text-accent" />
            <h3 className="text-xl font-bold">Machine Learning Engine</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Algorithm & Hyperparameters</h4>
              <p className="text-muted text-sm mb-4 leading-relaxed">
                The core engine uses a **Gradient Boosting Regressor** (`scikit-learn`), chosen for its ability to handle non-linear relationships between weather, events, and occupancy.
              </p>
              <div className="code-block text-xs">
                n_estimators: 300<br />
                learning_rate: 0.05<br />
                max_depth: 5<br />
                random_state: 42
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Feature Engineering</h4>
              <p className="text-muted text-sm mb-4">
                Raw data is transformed into a multi-dimensional feature set:
              </p>
              <ul className="docs-list text-xs">
                <li><strong>Occupancy:</strong> Sum of students + staff on campus.</li>
                <li><strong>Weather Correlation:</strong> Temperature (C) and Rainfall (mm).</li>
                <li><strong>Time Sensitivity:</strong> Month and Day of Week (encoded).</li>
                <li><strong>Anomalies:</strong> Special events tracking (0 or 1).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* API Documentation */}
        <section className="glass-card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Code className="text-yellow-400" />
            <h3 className="text-xl font-bold">API Specifications</h3>
          </div>
          <div className="space-y-6">
            <div className="api-endpoint">
              <div className="flex items-center gap-2 mb-2">
                <span className="api-method get">GET</span>
                <code className="text-sm">/api/dashboard</code>
              </div>
              <p className="text-xs text-muted">Returns comprehensive data for charts, including daily historical records and predicted values for the entire 2025 dataset.</p>
            </div>
            <div className="api-endpoint">
              <div className="flex items-center gap-2 mb-2">
                <span className="api-method post">POST</span>
                <code className="text-sm">/api/predict</code>
              </div>
              <p className="text-xs text-muted">Accepts dynamic input features (Temp, Rainfall, Occupancy, etc.) to generate a real-time water demand prediction and savings estimate.</p>
            </div>
            <div className="api-endpoint">
              <div className="flex items-center gap-2 mb-2">
                <span className="api-method get">GET</span>
                <code className="text-sm">/api/model_stats</code>
              </div>
              <p className="text-xs text-muted">Retrains the model and returns performance metrics like MAE (Mean Absolute Error) and RMSE.</p>
            </div>
          </div>
        </section>

        {/* Operational Impact */}
        <section className="glass-card">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-blue-500" />
            <h3 className="text-xl font-bold">Sustainability & Savings</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-muted text-sm leading-relaxed mb-4">
                The efficiency algorithm calculates potential savings by comparing the predicted demand against a standard unoptimized buffer baseline (approx +15%).
              </p>
              <ul className="docs-list text-sm">
                <li><strong>Water Conservation:</strong> Reduction in over-delivery.</li>
                <li><strong>Energy Savings:</strong> Optimized pumping based on exact needs (approx 0.5 kWh per 1000L).</li>
                <li><strong>Carbon Footprint:</strong> Lowered operational energy consumption.</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="energy-meter">
                <Activity size={100} className="text-accent opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent">98.4%</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Docs;
