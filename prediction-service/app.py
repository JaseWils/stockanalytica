from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, r2_score
import torch
import torch.nn as nn
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

# Stock symbol mapping
STOCK_SYMBOL_MAP = {
    'TECHCORP': 'AAPL',
    'DATASOFT': 'MSFT',
    'CLOUDNET': 'GOOGL',
    'AUTOMAX': 'TSLA',
    'MOTORX': 'F',
    'PETROLIUM': 'XOM',
    'OILGAS': 'CVX',
    'FINBANK': 'JPM',
    'INVESTCO': 'GS',
    'PHARMALIFE': 'JNJ',
    'MEDITECH': 'PFE',
    'NFLX': 'NFLX',
    'AMZN': 'AMZN',
    'META': 'META',
    'NVDA': 'NVDA'
}

# PyTorch LSTM Model
class LSTMModel(nn.Module):
    def __init__(self, input_size=1, hidden_size=50, num_layers=2, output_size=1):
        super(LSTMModel, self).__init__()
        self.hidden_size = hidden_size
        self. num_layers = num_layers
        
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True, dropout=0.2)
        self.fc1 = nn.Linear(hidden_size, 25)
        self.fc2 = nn.Linear(25, output_size)
        self.relu = nn.ReLU()
        
    def forward(self, x):
        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size)
        c0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size)
        
        out, _ = self.lstm(x, (h0, c0))
        out = out[: , -1, :]
        out = self.relu(self.fc1(out))
        out = self.fc2(out)
        return out

def get_stock_data(symbol, period='2y'):
    """Fetch real stock data from Yahoo Finance"""
    try:
        ticker = STOCK_SYMBOL_MAP.get(symbol.upper(), symbol.upper())
        stock = yf.Ticker(ticker)
        df = stock.history(period=period)
        
        if df.empty:
            return None, None
            
        info = stock.info
        current_price = info.get('currentPrice', df['Close'].iloc[-1])
        
        return df, {
            'symbol':  symbol,
            'real_ticker': ticker,
            'current_price':  float(current_price),
            'name': info.get('shortName', symbol),
            'sector': info.get('sector', 'Unknown'),
            'market_cap': info. get('marketCap', 0),
            'pe_ratio': info.get('trailingPE', 0),
            'volume': info.get('volume', 0),
            'fifty_two_week_high': info.get('fiftyTwoWeekHigh', 0),
            'fifty_two_week_low': info.get('fiftyTwoWeekLow', 0)
        }
    except Exception as e: 
        print(f"Error fetching stock data:  {e}")
        return None, None

def prepare_data(df, look_back=60):
    """Prepare data for LSTM model"""
    data = df['Close'].values.reshape(-1, 1)
    
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data)
    
    X, y = [], []
    for i in range(look_back, len(scaled_data)):
        X.append(scaled_data[i-look_back:i, 0])
        y.append(scaled_data[i, 0])
    
    X, y = np.array(X), np.array(y)
    X = X.reshape(X.shape[0], X.shape[1], 1)
    
    return X, y, scaler

def train_model(X_train, y_train, epochs=50):
    """Train PyTorch LSTM model"""
    model = LSTMModel(input_size=1, hidden_size=50, num_layers=2, output_size=1)
    criterion = nn. MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    
    X_tensor = torch.FloatTensor(X_train)
    y_tensor = torch. FloatTensor(y_train).reshape(-1, 1)
    
    model.train()
    for epoch in range(epochs):
        optimizer. zero_grad()
        outputs = model(X_tensor)
        loss = criterion(outputs, y_tensor)
        loss.backward()
        optimizer.step()
    
    return model

def predict_future(model, last_sequence, scaler, days=90):
    """Predict future stock prices"""
    model.eval()
    predictions = []
    current_sequence = last_sequence. copy()
    
    with torch.no_grad():
        for _ in range(days):
            current_input = torch.FloatTensor(current_sequence. reshape(1, -1, 1))
            pred = model(current_input).item()
            predictions.append(pred)
            current_sequence = np.append(current_sequence[1:], pred)
    
    predictions = np. array(predictions).reshape(-1, 1)
    predictions = scaler.inverse_transform(predictions)
    
    return predictions. flatten()

def generate_prediction_chart(df, predictions, stock_info, prediction_days=90):
    """Generate matplotlib chart as base64 image"""
    plt.style.use('dark_background')
    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    fig.suptitle(f'{stock_info["name"]} ({stock_info["real_ticker"]}) - Stock Analysis & Prediction', 
                 fontsize=16, fontweight='bold', color='white')
    
    # Historical prices
    ax1 = axes[0, 0]
    hist_data = df['Close']. values[-180:]
    hist_dates = df.index[-180:]
    ax1.plot(hist_dates, hist_data, color='#00d4ff', linewidth=2, label='Historical Price')
    ax1.fill_between(hist_dates, hist_data, alpha=0.3, color='#00d4ff')
    ax1.set_title('Historical Price (Last 6 Months)', color='white', fontsize=12)
    ax1.set_xlabel('Date', color='white')
    ax1.set_ylabel('Price ($)', color='white')
    ax1.legend(loc='upper left')
    ax1.grid(True, alpha=0.3)
    ax1.tick_params(colors='white')
    
    # Future predictions
    ax2 = axes[0, 1]
    future_dates = pd.date_range(start=df. index[-1], periods=prediction_days+1, freq='D')[1:]
    historical_last_30 = df['Close']. values[-30:]
    historical_dates_30 = df. index[-30:]
    
    ax2.plot(historical_dates_30, historical_last_30, color='#00d4ff', linewidth=2, label='Historical')
    ax2.plot(future_dates, predictions, color='#ff6b6b', linewidth=2, label='Predicted', linestyle='--')
    
    upper_bound = predictions * 1.1
    lower_bound = predictions * 0.9
    ax2.fill_between(future_dates, lower_bound, upper_bound, alpha=0.2, color='#ff6b6b', label='Confidence Band')
    
    ax2.set_title(f'Price Prediction (Next {prediction_days} Days)', color='white', fontsize=12)
    ax2.set_xlabel('Date', color='white')
    ax2.set_ylabel('Price ($)', color='white')
    ax2.legend(loc='upper left')
    ax2.grid(True, alpha=0.3)
    ax2.tick_params(colors='white')
    
    # Volume analysis
    ax3 = axes[1, 0]
    volume_data = df['Volume'].values[-60:]
    volume_dates = df.index[-60:]
    close_data = df['Close']. values[-60:]
    open_data = df['Open'].values[-60:]
    colors = ['#00ff88' if close_data[i] >= open_data[i] else '#ff4444' for i in range(len(volume_data))]
    ax3.bar(volume_dates, volume_data, color=colors, alpha=0.7)
    ax3.set_title('Trading Volume (Last 60 Days)', color='white', fontsize=12)
    ax3.set_xlabel('Date', color='white')
    ax3.set_ylabel('Volume', color='white')
    ax3.grid(True, alpha=0.3)
    ax3.tick_params(colors='white')
    
    # Price change distribution
    ax4 = axes[1, 1]
    daily_returns = df['Close'].pct_change().dropna().values[-252: ] * 100
    ax4.hist(daily_returns, bins=50, color='#9b59b6', alpha=0.7, edgecolor='white')
    ax4.axvline(x=0, color='white', linestyle='--', linewidth=2)
    ax4.axvline(x=np.mean(daily_returns), color='#00ff88', linestyle='-', linewidth=2, 
                label=f'Mean: {np.mean(daily_returns):.2f}%')
    ax4.set_title('Daily Returns Distribution (1 Year)', color='white', fontsize=12)
    ax4.set_xlabel('Daily Return (%)', color='white')
    ax4.set_ylabel('Frequency', color='white')
    ax4.legend(loc='upper right')
    ax4.grid(True, alpha=0.3)
    ax4.tick_params(colors='white')
    
    plt. tight_layout()
    
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png', dpi=100, bbox_inches='tight', facecolor='#1a1a2e')
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
    plt.close()
    
    return image_base64

@app.route('/api/predict/<symbol>', methods=['GET'])
def predict_stock(symbol):
    """Main prediction endpoint"""
    try:
        prediction_days = request.args.get('days', 90, type=int)
        
        df, stock_info = get_stock_data(symbol)
        
        if df is None:
            return jsonify({'error': f'Could not fetch data for symbol: {symbol}'}), 404
        
        look_back = 60
        X, y, scaler = prepare_data(df, look_back)
        
        train_size = int(len(X) * 0.8)
        X_train, X_test = X[:train_size], X[train_size:]
        y_train, y_test = y[:train_size], y[train_size:]
        
        model = train_model(X_train, y_train, epochs=50)
        
        # Evaluate
        model.eval()
        with torch.no_grad():
            X_test_tensor = torch.FloatTensor(X_test)
            y_pred = model(X_test_tensor).numpy()
        
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        
        last_sequence = X[-1]. flatten()
        future_predictions = predict_future(model, last_sequence, scaler, prediction_days)
        
        chart_base64 = generate_prediction_chart(df, future_predictions, stock_info, prediction_days)
        
        current_price = stock_info['current_price']
        predicted_end_price = float(future_predictions[-1])
        price_change = predicted_end_price - current_price
        price_change_percent = (price_change / current_price) * 100
        
        if price_change_percent > 10:
            recommendation = 'STRONG BUY'
            recommendation_color = '#00ff88'
        elif price_change_percent > 5:
            recommendation = 'BUY'
            recommendation_color = '#00d4ff'
        elif price_change_percent > -5:
            recommendation = 'HOLD'
            recommendation_color = '#ffd700'
        elif price_change_percent > -10:
            recommendation = 'SELL'
            recommendation_color = '#ff9500'
        else: 
            recommendation = 'STRONG SELL'
            recommendation_color = '#ff4444'
        
        return jsonify({
            'success': True,
            'symbol': symbol,
            'stock_info': stock_info,
            'prediction': {
                'days': prediction_days,
                'current_price': round(current_price, 2),
                'predicted_price': round(predicted_end_price, 2),
                'price_change': round(price_change, 2),
                'price_change_percent': round(price_change_percent, 2),
                'predictions': [round(float(p), 2) for p in future_predictions. tolist()],
                'recommendation': recommendation,
                'recommendation_color':  recommendation_color
            },
            'model_metrics': {
                'mse': round(float(mse), 6),
                'r2_score': round(float(r2), 4)
            },
            'chart':  chart_base64
        })
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app. route('/api/stock/<symbol>', methods=['GET'])
def get_stock_info(symbol):
    """Get real-time stock information"""
    try: 
        df, stock_info = get_stock_data(symbol, period='1mo')
        
        if df is None:
            return jsonify({'error': f'Could not fetch data for symbol: {symbol}'}), 404
        
        daily_change = df['Close']. iloc[-1] - df['Close'].iloc[-2]
        daily_change_percent = (daily_change / df['Close'].iloc[-2]) * 100
        
        return jsonify({
            'success': True,
            'stock_info': stock_info,
            'price_data': {
                'current':  round(float(df['Close']. iloc[-1]), 2),
                'open': round(float(df['Open'].iloc[-1]), 2),
                'high': round(float(df['High'].iloc[-1]), 2),
                'low': round(float(df['Low'].iloc[-1]), 2),
                'daily_change': round(float(daily_change), 2),
                'daily_change_percent': round(float(daily_change_percent), 2)
            },
            'historical':  {
                'dates': df.index[-30:].strftime('%Y-%m-%d').tolist(),
                'prices': [round(float(p), 2) for p in df['Close'].values[-30:]. tolist()],
                'volumes': [int(v) for v in df['Volume']. values[-30:]. tolist()]
            }
        })
        
    except Exception as e:
        return jsonify({'error':  str(e)}), 500

@app.route('/api/market/overview', methods=['GET'])
def market_overview():
    """Get market overview with multiple stocks"""
    try: 
        symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'JPM', 'JNJ', 'XOM']
        stocks_data = []
        
        for symbol in symbols: 
            try:
                ticker = yf.Ticker(symbol)
                info = ticker.info
                hist = ticker.history(period='5d')
                
                if not hist.empty:
                    current_price = hist['Close'].iloc[-1]
                    prev_price = hist['Close'].iloc[-2] if len(hist) > 1 else current_price
                    change = current_price - prev_price
                    change_percent = (change / prev_price) * 100
                    
                    stocks_data.append({
                        'symbol': symbol,
                        'name': info.get('shortName', symbol),
                        'sector': info.get('sector', 'Unknown'),
                        'price': round(float(current_price), 2),
                        'change': round(float(change), 2),
                        'change_percent': round(float(change_percent), 2),
                        'volume': info.get('volume', 0),
                        'market_cap': info. get('marketCap', 0)
                    })
            except: 
                continue
        
        return jsonify({
            'success':  True,
            'stocks': stocks_data,
            'last_updated': datetime. now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status':  'healthy', 'service': 'stock-prediction-api'})

if __name__ == '__main__':
    print("=" * 50)
    print("Stock Prediction Service")
    print("=" * 50)
    print("Starting server on http://localhost:5001")
    print("Endpoints:")
    print("  - GET /api/predict/<symbol>  - Get AI prediction")
    print("  - GET /api/stock/<symbol>    - Get stock info")
    print("  - GET /api/market/overview   - Get market overview")
    print("  - GET /health                - Health check")
    print("=" * 50)
    app.run(host='0.0.0.0', port=5001, debug=True)