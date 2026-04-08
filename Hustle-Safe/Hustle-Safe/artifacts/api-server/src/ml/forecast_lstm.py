import torch
import torch.nn as nn

class GDSForecastLSTM(nn.Module):
    def __init__(self, input_size=6, hidden_layer_size=50, output_size=1):
        super().__init__()
        self.hidden_layer_size = hidden_layer_size
        # Inputs: [Rainfall_forecast, Wind, Temp, AQI, is_weekend, is_holiday]
        self.lstm = nn.LSTM(input_size, hidden_layer_size, batch_first=True)
        self.linear = nn.Linear(hidden_layer_size, output_size)

    def forward(self, input_seq):
        lstm_out, _ = self.lstm(input_seq)
        # Predict GDS based on the last sequence output
        predictions = self.linear(lstm_out[:, -1, :])
        return predictions

def get_7_day_gds_forecast(zone_weather_data, is_holiday_week):
    """
    Called by the Premium Engine to get the average predicted GDS for next week.
    Also exposed via API for the worker/insurer dashboard 6-hour forecast.
    """
    model = GDSForecastLSTM()
    # In production, load state_dict here: model.load_state_dict(torch.load('lstm_weights.pth'))
    model.eval()
    
    # zone_weather_data shape: (1, 7, 6) -> 1 batch, 7 days, 6 features
    with torch.no_grad():
        predictions = model(zone_weather_data)
        
    avg_weekly_gds = predictions.item()
    return max(0.0, min(100.0, avg_weekly_gds)) # GDS is capped 0-100