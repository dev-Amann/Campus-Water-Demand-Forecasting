# AquaFlow AI - Campus Water Demand Forecasting

This full-stack AI-driven web application was developed by **Aman Singh** as part of an Internship project for the **1M1B (One Million for One Billion)** organization.

## Project Overview
AquaFlow AI predicts daily campus water demand using Machine Learning (Gradient Boosting Regressor) based on historical environmental and occupancy data (Temperature, Rainfall, Occupancy, Dates, and Special Events). The system aims to optimize resource management, reduce water wastage, and increase energy efficiency by minimizing unnecessary water pumping.

## Features
- **Gradient Boosting ML Model**: High-accuracy predictions mapping historical correlations between weather and baseline infrastructure needs.
- **Interactive Dashboard**: Powered by React & Recharts to visualize monthly and daily water demand trends.
- **Predictive Simulator**: User-friendly UI to forecast future 2026 demands based on custom dates and occupancy inputs.
- **Actionable Insights Analytics**: Calculates baseline vs. optimized potential water and energy savings.

## Tech Stack
- **Frontend**: React.js (Vite), Vanilla CSS (Glassmorphism aesthetic), Recharts, Lucide-React
- **Backend API**: Python, Flask, Pandas, Scikit-Learn
- **Machine Learning**: `GradientBoostingRegressor`, `joblib`

## How to Run Locally

### 1. Backend Setup
Navigate into the `backend` directory, activate a virtual environment, and install dependencies:
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # On Windows
pip install -r requirements.txt
python app.py
```
*(The Flask API server runs natively on `http://localhost:5000`)*

### 2. Frontend Setup
Navigate into the `frontend` directory, install node modules, and start the Vite dev server:
```bash
cd frontend
npm install
npm run dev
```
*(The web app runs on `http://localhost:5173`)*
