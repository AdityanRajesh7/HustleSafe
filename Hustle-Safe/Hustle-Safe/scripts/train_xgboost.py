import pandas as pd
import numpy as np
import xgboost as xgb
import os

def train_premium_model():
    print("Training XGBoost Premium Engine...")
    
    # 1. We generate synthetic training features that mirror what the LSTM will output
    # Features: [Predicted GDS (0-100), Is Festival Week (0/1), Historical Claims (0-200)]
    np.random.seed(42)
    n_samples = 5000
    
    predicted_gds = np.random.uniform(0, 100, n_samples)
    is_festival = np.random.choice([0, 1], n_samples, p=[0.9, 0.1])
    historical_claims = np.random.randint(0, 150, n_samples)
    
    X = pd.DataFrame({
        'avg_predicted_gds': predicted_gds,
        'is_festival_week': is_festival,
        'historical_zone_claims': historical_claims
    })
    
    # 2. We define the "Target" (What XGBoost should learn to predict)
    # The SRS states zone risk adjustment is bounded between -5 and +20
    # Higher GDS = Higher Premium. Festival = Higher Premium.
    y_raw = (predicted_gds * 0.25) + (is_festival * 6.0) + (historical_claims * 0.02) - 10
    y_target = np.clip(y_raw, -5.0, 20.0)
    
    # 3. Train the Model
    model = xgb.XGBRegressor(
        n_estimators=100, 
        max_depth=4, 
        learning_rate=0.1,
        objective='reg:squarederror'
    )
    
    model.fit(X, y_target)
    
    # 4. Save the weights to the API server directory using absolute paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(script_dir, "..", "artifacts", "api-server", "models")
    os.makedirs(output_dir, exist_ok=True)
    model_path = os.path.join(output_dir, "premium_xgb.json")
    
    model.save_model(model_path)
    print(f"✅ XGBoost Model trained and saved to {model_path}")

if __name__ == "__main__":
    train_premium_model()