import pandas as pd
import numpy as np
import torch
import torch.nn as nn
import os
from sklearn.preprocessing import StandardScaler

# Define the PyTorch Model (Must match the architecture in your API)
class DemandLSTM(nn.Module):
    def __init__(self, input_size=3, hidden_layer_size=50, output_size=1):
        super().__init__()
        self.hidden_layer_size = hidden_layer_size
        self.lstm = nn.LSTM(input_size, hidden_layer_size, batch_first=True)
        self.linear = nn.Linear(hidden_layer_size, output_size)

    def forward(self, input_seq):
        lstm_out, _ = self.lstm(input_seq)
        predictions = self.linear(lstm_out[:, -1, :])
        return predictions

def train_demand_lstm():
    print("Loading synthetic order dataset...")
    
    # Safely resolve paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(script_dir, "..", "artifacts", "api-server", "data", "bangalore_delivery_orders.csv")
    output_dir = os.path.join(script_dir, "..", "artifacts", "api-server", "models")
    os.makedirs(output_dir, exist_ok=True)
    
    # Load dataset
    try:
        df = pd.read_csv(data_path)
    except FileNotFoundError:
        print(f"❌ Error: Could not find dataset at {data_path}")
        return

    print("Preprocessing data and creating sequences...")
    # We'll train it on a single high-volume zone for the baseline model (e.g., Koramangala)
    zone_df = df[df['zone_id'] == 'Koramangala'].copy()
    
    # Features: Base predicted, Rainfall, Is Holiday
    features = zone_df[['base_predicted_orders', 'rainfall_mm', 'is_holiday']].values
    targets = zone_df['actual_orders'].values
    
    # Scale the data for the Neural Network
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features)
    targets_scaled = targets / np.max(targets) # Simple max normalization for orders
    
    # Create sequences (Look back 2 hours = 4 timesteps of 30 mins)
    sequence_length = 4
    X, y = [], []
    for i in range(len(features_scaled) - sequence_length):
        X.append(features_scaled[i:i+sequence_length])
        y.append(targets_scaled[i+sequence_length])
        
    X_tensor = torch.FloatTensor(np.array(X))
    y_tensor = torch.FloatTensor(np.array(y)).view(-1, 1)

    print("Initializing PyTorch LSTM...")
    model = DemandLSTM(input_size=3)
    loss_function = nn.MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

    # Train the model (Keep epochs low for the hackathon prototype to save time)
    epochs = 15
    print(f"Training for {epochs} epochs...")
    for epoch in range(epochs):
        optimizer.zero_grad()
        y_pred = model(X_tensor)
        loss = loss_function(y_pred, y_tensor)
        loss.backward()
        optimizer.step()
        
        if epoch % 5 == 0:
            print(f"Epoch {epoch:2} | Loss: {loss.item():.5f}")

    # Save the PyTorch weights
    model_path = os.path.join(output_dir, "demand_lstm.pth")
    torch.save(model.state_dict(), model_path)
    print(f"✅ LSTM Model trained and saved to {model_path}")

if __name__ == "__main__":
    train_demand_lstm()