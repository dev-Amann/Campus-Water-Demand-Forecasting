import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.model_selection import train_test_split
import joblib
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_FILE = os.path.join(BASE_DIR, 'model.pkl')
DATA_FILE = os.path.join(BASE_DIR, 'Campus_Water_Demand_Dataset_2025.csv')

def load_data():
    df = pd.read_csv(DATA_FILE)
    return df

def preprocess_data(df):
    """
    Features:
    - Temperature (Temperature_C)
    - Rainfall (Rainfall_mm)
    - Occupancy (Students_On_Campus + Staff_On_Campus)
    - Event (Special_Event: 1 if not null, 0 otherwise)
    Target:
    - Water_Usage_Liters
    """
    df = df.copy()
    
    # Handle missing values if any
    df.fillna({'Temperature_C': df['Temperature_C'].mean(),
               'Rainfall_mm': df['Rainfall_mm'].mean(),
               'Students_On_Campus': df['Students_On_Campus'].mean(),
               'Staff_On_Campus': df['Staff_On_Campus'].mean(),
               'Water_Usage_Liters': df['Water_Usage_Liters'].mean()
              }, inplace=True)

    df['Occupancy'] = df['Students_On_Campus'] + df['Staff_On_Campus']
    df['Event'] = df['Special_Event'].notna().astype(int)
    
    # Map text days to numbers for standardizing
    day_map = {'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5, 'Sunday': 6}
    if 'Day_of_Week' in df.columns:
        df['Day_Num'] = df['Day_of_Week'].map(day_map).fillna(0)
    else:
        df['Day_Num'] = 0
    
    # Ensure Month exists
    if 'Month' not in df.columns:
        df['Month'] = 1

    features = ['Temperature_C', 'Rainfall_mm', 'Occupancy', 'Event', 'Month', 'Day_Num']
    target = 'Water_Usage_Liters'
    
    return df[features], df[target], df

def train_model():
    df = load_data()
    X, y, full_df = preprocess_data(df)
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Switch to GradientBoosting for higher accuracy and better curve fitting
    model = GradientBoostingRegressor(n_estimators=300, learning_rate=0.05, max_depth=5, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate
    predictions = model.predict(X_test)
    mae = mean_absolute_error(y_test, predictions)
    rmse = np.sqrt(mean_squared_error(y_test, predictions))
    
    # Generate predictions for the whole dataset for visualization
    full_predictions = model.predict(X)
    
    # Save the model
    joblib.dump(model, MODEL_FILE)
    
    return {
        'mae': mae,
        'rmse': rmse,
        'model_saved': True,
        'full_df': full_df,
        'full_predictions': full_predictions
    }

def get_model():
    if not os.path.exists(MODEL_FILE):
        train_model()
    return joblib.load(MODEL_FILE)

def predict_single(temp, rainfall, occupancy, event, month, day_num):
    model = get_model()
    input_data = pd.DataFrame({
        'Temperature_C': [temp],
        'Rainfall_mm': [rainfall],
        'Occupancy': [occupancy],
        'Event': [event],
        'Month': [month],
        'Day_Num': [day_num]
    })
    return model.predict(input_data)[0]

if __name__ == '__main__':
    train_model()
