import React, { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, BarChart3, Activity, DollarSign, Target, Loader2 } from 'lucide-react';

const PREDICTION_API_URL = process.env.REACT_APP_PREDICTION_API_URL || 'http://localhost:5001/api';

const StockPredictionModal = ({ stock, isOpen, onClose, onBuy }) => {
  const [loading, setLoading] = useState(true);
  const [predictionData, setPredictionData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('prediction');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen && stock) {
      fetchPrediction();
    }
  }, [isOpen, stock]);

  const fetchPrediction = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${PREDICTION_API_URL}/predict/${stock.symbol}? days=90`);
      const data = await response. json();
      
      if (data.success) {
        setPredictionData(data);
      } else {
        setError(data.error || 'Failed to fetch prediction');
      }
    } catch (err) {
      setError('Failed to connect to prediction service');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const commission = stock.price * quantity * 0.04;
  const total = stock.price * quantity + commission;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">{stock.symbol}</h2>
            <p className="text-purple-200">{stock.name || stock.sector}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('prediction')}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === 'prediction' 
                ? 'text-purple-400 border-b-2 border-purple-400 bg-gray-800/50' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BarChart3 className="inline mr-2" size={18} />
            AI Prediction
          </button>
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === 'buy' 
                ? 'text-purple-400 border-b-2 border-purple-400 bg-gray-800/50' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <DollarSign className="inline mr-2" size={18} />
            Buy Stock
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'prediction' && (
            <div>
              {loading ?  (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                  <p className="text-gray-400">Analyzing stock data with LSTM model...</p>
                  <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <div className="text-red-500 text-6xl mb-4">⚠️</div>
                  <p className="text-red-400 mb-4">{error}</p>
                  <button 
                    onClick={fetchPrediction}
                    className="bg-purple-600 hover: bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : predictionData && (
                <div className="space-y-6">
                  {/* Prediction Summary Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800 rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Current Price</p>
                      <p className="text-2xl font-bold text-white">
                        ${predictionData.prediction.current_price}
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Predicted (90 days)</p>
                      <p className="text-2xl font-bold text-white">
                        ${predictionData.prediction.predicted_price}
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Expected Change</p>
                      <p className={`text-2xl font-bold ${
                        predictionData.prediction.price_change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {predictionData.prediction.price_change >= 0 ? '+' : ''}
                        {predictionData.prediction.price_change_percent}%
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Recommendation</p>
                      <p 
                        className="text-xl font-bold"
                        style={{ color: predictionData.prediction.recommendation_color }}
                      >
                        {predictionData.prediction.recommendation}
                      </p>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="bg-gray-800 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Activity className="mr-2" size={20} />
                      LSTM Price Prediction Analysis
                    </h3>
                    <img 
                      src={`data:image/png;base64,${predictionData.chart}`}
                      alt="Stock Prediction Chart"
                      className="w-full rounded-lg"
                    />
                  </div>

                  {/* Model Metrics */}
                  <div className="bg-gray-800 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Target className="mr-2" size={20} />
                      Model Performance Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Mean Squared Error (MSE)</p>
                        <p className="text-xl font-mono text-white">{predictionData.model_metrics.mse}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">R² Score</p>
                        <p className="text-xl font-mono text-white">{predictionData.model_metrics.r2_score}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stock Info */}
                  <div className="bg-gray-800 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Stock Information</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Sector</p>
                        <p className="text-white">{predictionData.stock_info.sector}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Market Cap</p>
                        <p className="text-white">
                          ${(predictionData.stock_info.market_cap / 1e9).toFixed(2)}B
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">P/E Ratio</p>
                        <p className="text-white">
                          {predictionData.stock_info.pe_ratio?. toFixed(2) || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">52 Week High</p>
                        <p className="text-green-400">
                          ${predictionData.stock_info.fifty_two_week_high?. toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">52 Week Low</p>
                        <p className="text-red-400">
                          ${predictionData.stock_info.fifty_two_week_low?. toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Volume</p>
                        <p className="text-white">
                          {(predictionData.stock_info.volume / 1e6).toFixed(2)}M
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-4">
                    <p className="text-yellow-400 text-sm">
                      ⚠️ <strong>Disclaimer:</strong> This prediction is generated using an LSTM machine learning model 
                      and is for informational purposes only. Past performance does not guarantee future results.  
                      Always do your own research before making investment decisions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'buy' && (
            <div className="space-y-6">
              {/* Current Price Card */}
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-400">Current Price</p>
                    <p className="text-3xl font-bold text-white">${stock.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">Sector</p>
                    <p className="text-lg text-purple-400">{stock.sector}</p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="bg-gray-800 rounded-xl p-6">
                <label className="block text-gray-400 mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Order Summary */}
              <div className="bg-gray-800 rounded-xl p-6 space-y-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">${(stock.price * quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Commission (4%)</span>
                  <span className="text-orange-400">${commission.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-4 flex justify-between">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onBuy(stock, quantity)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02]"
                >
                  Confirm Purchase
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockPredictionModal;