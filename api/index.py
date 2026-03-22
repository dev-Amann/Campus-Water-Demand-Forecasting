import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from model import load_data, preprocess_data, train_model, predict_single, get_model
import numpy as np

import traceback
app = Flask(__name__)
CORS(app)

@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify({
        'error': str(e),
        'type': type(e).__name__,
        'traceback': traceback.format_exc()
    }), 500

# Background train on startup if model not present
get_model()

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    df = load_data()
    X, y, df_processed = preprocess_data(df)
    model = get_model()
    predictions = model.predict(X)
    
    df['Predicted_Usage'] = predictions
    df['Occupancy'] = df['Students_On_Campus'] + df['Staff_On_Campus']
    df['Event'] = df['Special_Event'].fillna('None')
    
    # Format dates as strings
    df['Date'] = df['Date'].astype(str)
    
    # Calculate monthly aggregations
    monthly_df = df.groupby('Month')[['Water_Usage_Liters', 'Predicted_Usage']].sum().reset_index()
    monthly_records = monthly_df.to_dict(orient='records')

    # Ensure types are serializable
    records = df[['Date', 'Water_Usage_Liters', 'Predicted_Usage', 'Temperature_C', 'Occupancy', 'Event', 'Rainfall_mm']].to_dict(orient='records')
    
    return jsonify({
        'data': records,
        'monthly_data': monthly_records,
        'summary': {
            'total_usage': float(df['Water_Usage_Liters'].sum()),
            'total_predicted': float(np.sum(predictions)),
            'avg_daily_usage': float(df['Water_Usage_Liters'].mean()),
            'max_temp': float(df['Temperature_C'].max())
        }
    })

@app.route('/api/predict', methods=['POST'])
def run_prediction():
    data = request.json
    try:
        temp = float(data.get('temperature', 25.0))
        rainfall = float(data.get('rainfall', 0.0))
        occupancy = float(data.get('occupancy', 5000))
        event = int(data.get('event', 0))
        month = int(data.get('month', 1))
        day_num = int(data.get('day_num', 0))
        
        prediction = predict_single(temp, rainfall, occupancy, event, month, day_num)
        
        # Impact calculations
        # Assuming an unoptimized pumping uses +10% over actual usage.
        # Savings = baseline - predicted usage.
        baseline = prediction * 1.15
        water_saved = baseline - prediction
        energy_saved = (water_saved / 1000) * 0.5  # kWh saved per 1000 L
        
        return jsonify({
            'success': True,
            'prediction': float(prediction),
            'baseline': float(baseline),
            'water_saved': float(water_saved),
            'energy_saved': float(energy_saved)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/model_stats', methods=['GET'])
def model_stats():
    # To get fresh stats, we retrain
    stats = train_model()
    return jsonify({
        'mae': float(stats['mae']),
        'rmse': float(stats['rmse'])
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
