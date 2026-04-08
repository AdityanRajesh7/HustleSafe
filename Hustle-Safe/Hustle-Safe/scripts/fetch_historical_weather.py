import requests
import pandas as pd
from datetime import datetime, timedelta

def fetch_bangalore_historical_weather():
    print("Fetching 24 months of historical weather for Bangalore...")
    
    # Bangalore Coordinates: 12.9716° N, 77.5946° E
    url = "https://archive-api.open-meteo.com/v1/archive"
    
    # 24 months ago to yesterday
    end_date = (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=730)).strftime('%Y-%m-%d')
    
    params = {
        "latitude": 12.9716,
        "longitude": 77.5946,
        "start_date": start_date,
        "end_date": end_date,
        "hourly": ["temperature_2m", "rain", "wind_speed_10m", "visibility"],
        "timezone": "Asia/Kolkata"
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    # Convert to Pandas DataFrame
    df = pd.DataFrame({
        "timestamp": pd.to_datetime(data["hourly"]["time"]),
        "temperature": data["hourly"]["temperature_2m"],
        "rainfall_mm": data["hourly"]["rain"],
        "wind_speed": data["hourly"]["wind_speed_10m"],
        "visibility": data["hourly"]["visibility"]
    })
    
    # Save to CSV for model training
    csv_path = "../artifacts/api-server/data/bangalore_weather_24mo.csv"
    df.to_csv(csv_path, index=False)
    print(f"✅ Successfully saved {len(df)} hourly records to {csv_path}")

if __name__ == "__main__":
    fetch_bangalore_historical_weather()