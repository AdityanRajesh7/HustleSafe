import xgboost as xgb
import numpy as np
import os

class AdaptivePremiumEngine:
    def __init__(self):
        self.model = xgb.XGBRegressor()
        
        # Safely locate and load the trained model
        script_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(script_dir, "..", "..", "models", "premium_xgb.json")
        
        try:
            self.model.load_model(model_path)
            print(f"✅ Successfully loaded XGBoost Premium Engine")
        except Exception as e:
            print(f"⚠️ Warning: Could not load XGBoost model from {model_path}. Ensure the file exists.")
        
        # Base rates per SRS
        self.base_rates = {"basic": 15, "standard": 25, "pro": 40}

    def calculate_premium(self, worker_profile: dict, forecast_data: dict) -> tuple:
        # 1. Determine Base Rate
        tier = worker_profile.get('tier', 'standard').lower()
        base_rate = self.base_rates.get(tier, 25)

        # 2. Zone Risk Adjustment via XGBoost (-5 to +20)
        features = np.array([[
            forecast_data['avg_predicted_gds'],
            forecast_data['is_festival_week'],
            forecast_data['historical_zone_claims']
        ]])
        
        # 🔥 THIS IS WHERE THE MAGIC HAPPENS. The real model makes the prediction.
        raw_zone_adj = self.model.predict(features)[0]
        
        # Cap adjustments per SRS specifications
        zone_adj = max(-5.0, min(20.0, float(raw_zone_adj)))

        # 3. Worker Risk Adjustment (-2 to +5)
        worker_adj = 0.0
        if worker_profile['rating'] >= 4.8 and worker_profile['fraud_score'] < 0.2:
            worker_adj = -2.0
        elif worker_profile['rating'] < 4.0 or worker_profile['fraud_score'] > 0.6:
            worker_adj = 5.0

        # 4. Final Calculation
        final_premium = base_rate + zone_adj + worker_adj
        final_premium = max(8.0, min(40.0, final_premium))

        # 5. Explainability Vector
        explanation = self._generate_explainability(zone_adj, worker_adj, final_premium, forecast_data)

        return round(final_premium, 2), round(zone_adj, 2), round(worker_adj, 2), explanation

    def _generate_explainability(self, zone_adj, worker_adj, final, forecast_data):
        if forecast_data['is_festival_week'] == 1:
             return f"Your premium is ₹{final} this week. Festival demand variations have affected zone risk."
        if zone_adj > 10:
            return f"Your premium is ₹{final} this week because high disruption (GDS {forecast_data['avg_predicted_gds']:.0f}) is forecasted."
        elif zone_adj < 0:
            return f"Your premium is ₹{final} this week. Safe weather is expected, lowering your rate!"
        elif worker_adj < 0:
            return f"Your premium is ₹{final}. Thanks to your 4.8+ rating, you received a safe-rider discount."
        return f"Your premium is ₹{final} this week based on standard conditions."