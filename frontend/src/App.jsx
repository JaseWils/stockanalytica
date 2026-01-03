import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Search, User, Wallet, ArrowUpRight, ArrowDownRight, Activity, LogOut, X, BarChart3, Target, Loader2 } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { stocksAPI, portfolioAPI, paymentAPI } from './services/api';

// Prediction API URL
const PREDICTION_API_URL = process.env.REACT_APP_PREDICTION_API_URL || 'http://localhost:5001/api';

const App = () => {
  const { user, loading:  authLoading, login, register, logout, updateBalance } = useAuth();
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedSector, setSelectedSector] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('market');
  const [loading, setLoading] = useState(false);
  
  // Prediction states
  const [predictionData, setPredictionData] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [predictionError, setPredictionError] = useState(null);
  const [modalTab, setModalTab] = useState('prediction');
  
  // Auth states
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: '',
    profileType: 'diversified'
  });

  useEffect(() => {
    fetchStocks();
    if (user) {
      fetchPortfolio();
      fetchTransactions();
    }
  }, [user]);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const { data } = await stocksAPI.getAll({ sector: selectedSector, search: searchTerm });
      const validStocks = (Array.isArray(data) ? data : []).filter(stock => 
        stock && 
        stock._id && 
        stock. symbol && 
        stock.name && 
        stock.sector &&
        stock.currentPrice !== undefined
      );
      setStocks(validStocks);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const { data } = await portfolioAPI.get();
      setPortfolio(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setPortfolio([]);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data } = await portfolioAPI.getTransactions();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    }
  };

  // Fetch AI Prediction
  const fetchPrediction = async (stock) => {
    setPredictionLoading(true);
    setPredictionError(null);
    setPredictionData(null);
    
    try {
      const response = await fetch(`${PREDICTION_API_URL}/predict/${stock.symbol}? days=90`);
      const data = await response. json();
      
      if (data.success) {
        setPredictionData(data);
      } else {
        setPredictionError(data.error || 'Failed to fetch prediction');
      }
    } catch (err) {
      setPredictionError('Failed to connect to prediction service.  Make sure it is running on port 5001.');
      console.error('Prediction error:', err);
    } finally {
      setPredictionLoading(false);
    }
  };

  // Handle stock selection
  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    setModalTab('prediction');
    setQuantity(1);
    fetchPrediction(stock);
  };

  // Close modal
  const closeModal = () => {
    setSelectedStock(null);
    setPredictionData(null);
    setPredictionError(null);
    setModalTab('prediction');
  };

  useEffect(() => {
    if (user) {
      fetchStocks();
    }
  }, [selectedSector, searchTerm, user]);

  const sectors = useMemo(() => {
    const uniqueSectors = new Set(
      stocks
        .filter(s => s && s.sector)
        .map(s => s.sector)
    );
    return ['all', ...Array.from(uniqueSectors)];
  }, [stocks]);

  const filteredStocks = useMemo(() => {
    return stocks.filter(stock => {
      if (! stock || !stock.sector || !stock.name || !stock.symbol) return false;
      
      const matchesSector = selectedSector === 'all' || stock.sector === selectedSector;
      const matchesSearch = 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock. symbol.toLowerCase().includes(searchTerm. toLowerCase());
      
      return matchesSector && matchesSearch;
    });
  }, [stocks, selectedSector, searchTerm]);

  const calculateCommission = (amount) => amount * 0.04;

  const handleBuyStock = async (stock) => {
    try {
      setLoading(true);
      const { data } = await paymentAPI.buyStock({
        stockId: stock._id,
        quantity
      });
      
      updateBalance(data.newBalance);
      await fetchPortfolio();
      await fetchTransactions();
      
      alert(`Successfully purchased ${quantity} shares of ${stock.symbol}!\nCommission: $${data.transaction.commission. toFixed(2)}`);
      closeModal();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to purchase stock');
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (authMode === 'login') {
        await login(authForm. email, authForm. password);
      } else {
        await register(authForm. email, authForm.password, authForm.name, authForm.profileType);
      }
      setAuthForm({ email: '', password:  '', name: '', profileType: 'diversified' });
    } catch (error) {
      alert(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'high': return 'text-emerald-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getRiskBg = (risk) => {
    switch(risk) {
      case 'high': return 'bg-emerald-500/10 border-emerald-500/30';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'low':  return 'bg-red-500/10 border-red-500/30';
      default: return 'bg-gray-500/10 border-gray-500/30';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">StockAnalytica</h1>
              <p className="text-xs text-slate-400">AI-Powered Trading Platform</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                authMode === 'login'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                authMode === 'register'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                required
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e. target.value })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                required
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e. target.value })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Profile Type</label>
                <select
                  value={authForm.profileType}
                  onChange={(e) => setAuthForm({ ... authForm, profileType: e.target. value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                >
                  <option value="diversified">Diversified (Multiple Sectors)</option>
                  <option value="focused">Focused (Single Sector)</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover: to-purple-700 rounded-lg font-semibold text-white transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : authMode === 'login' ? 'Login' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  StockAnalytica
                </h1>
                <p className="text-xs text-slate-400">Welcome, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                <Wallet className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold">${user.balance?. toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                <User className="w-4 h-4 text-purple-400" />
                <span className="text-sm capitalize">{user.profileType}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-4 py-2 rounded-lg text-red-400 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-700 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('market')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                activeTab === 'market'
                  ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Market Overview
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                activeTab === 'portfolio'
                  ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800/50'
                  :  'text-slate-400 hover: text-white'
              }`}
            >
              My Portfolio
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                activeTab === 'transactions'
                  ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800/50'
                  :  'text-slate-400 hover: text-white'
              }`}
            >
              Transactions
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'market' ?  (
          <>
            {/* Filters */}
            <div className="mb-6 flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search stocks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e. target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {sectors.map(sector => (
                  <button
                    key={sector}
                    onClick={() => setSelectedSector(sector)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      selectedSector === sector
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {sector === 'all' ?  'All Sectors' : sector}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg: grid-cols-3 gap-4">
              {filteredStocks.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Activity className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                  <p className="text-slate-400 text-lg">
                    {loading ? 'Loading stocks...' : 'No stocks available.  Please seed the database. '}
                  </p>
                  {! loading && (
                    <p className="text-slate-500 text-sm mt-2">
                      Visit:  <code className="bg-slate-800 px-2 py-1 rounded">http://localhost:5000/api/stocks/seed</code>
                    </p>
                  )}
                </div>
              ) : (
                filteredStocks. map(stock => {
                  if (!stock || !stock._id) return null;

                  return (
                    <div
                      key={stock._id}
                      className={`bg-slate-800/50 backdrop-blur-sm border rounded-xl p-5 hover:border-blue-500/50 transition-all cursor-pointer hover:scale-[1.02] ${getRiskBg(stock.risk || 'medium')}`}
                      onClick={() => handleStockClick(stock)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold">{stock.symbol || 'N/A'}</h3>
                          <p className="text-xs text-slate-400">{stock.name || 'Unknown'}</p>
                          <span className="text-xs px-2 py-1 bg-slate-700 rounded mt-1 inline-block">
                            {stock.sector || 'Unknown'}
                          </span>
                        </div>
                        <div className={`flex items-center gap-1 text-sm font-semibold ${(stock.change || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {(stock.change || 0) >= 0 ?  <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                          {Math.abs(stock.change || 0)}%
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="text-2xl font-bold">${(stock.currentPrice || 0).toFixed(2)}</div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <div className="text-slate-400">Volume</div>
                          <div className="font-semibold">{stock.volume || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-slate-400">P/E</div>
                          <div className="font-semibold">{stock.pe || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Risk</div>
                          <div className={`font-semibold capitalize ${getRiskColor(stock.risk || 'medium')}`}>
                            {stock.risk || 'medium'}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-700 flex justify-between items-center">
                        <div className="text-xs text-slate-400">Market Cap:  {stock.marketCap || 'N/A'}</div>
                        <div className="text-xs text-blue-400 flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" />
                          AI Prediction
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        ) : activeTab === 'portfolio' ? (
          <div className="space-y-6">
            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-slate-400">Total Value</span>
                </div>
                <div className="text-3xl font-bold">
                  ${portfolio.reduce((sum, p) => sum + (p.currentValue || 0), 0).toFixed(2)}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-slate-400">Holdings</span>
                </div>
                <div className="text-3xl font-bold">{portfolio.length}</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-slate-400">Total P&L</span>
                </div>
                <div className={`text-3xl font-bold ${portfolio.reduce((sum, p) => sum + (p.profitLoss || 0), 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  ${portfolio. reduce((sum, p) => sum + (p.profitLoss || 0), 0).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Portfolio Holdings */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Your Holdings</h2>
              {portfolio.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <PieChart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No holdings yet. Start investing in the Market Overview tab! </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {portfolio.map(holding => {
                    if (!holding || !holding.stock) return null;
                    
                    return (
                      <div key={holding.stock._id} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{holding.stock.symbol}</h3>
                            <p className="text-sm text-slate-400">{holding.stock.name}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              {holding.quantity} shares @ ${(holding.avgPrice || 0).toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">${(holding.currentValue || 0).toFixed(2)}</div>
                            <div className={`text-sm font-semibold ${(holding.profitLoss || 0) >= 0 ? 'text-emerald-400' :  'text-red-400'}`}>
                              {(holding.profitLoss || 0) >= 0 ?  '+' : ''}{(holding.profitLoss || 0).toFixed(2)} 
                              ({(((holding.profitLoss || 0) / ((holding.avgPrice || 1) * (holding.quantity || 1))) * 100).toFixed(2)}%)
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            {transactions.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No transactions yet. </p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map(trans => {
                  if (!trans || ! trans.stock) return null;
                  
                  return (
                    <div key={trans._id} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              trans.type === 'buy' ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'
                            }`}>
                              {(trans.type || 'buy').toUpperCase()}
                            </span>
                            <h3 className="font-bold">{trans.stock.symbol}</h3>
                          </div>
                          <p className="text-sm text-slate-400 mt-1">
                            {trans.quantity} shares @ ${(trans.pricePerShare || 0).toFixed(2)}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(trans.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${(trans.totalAmount || 0).toFixed(2)}</div>
                          <div className="text-xs text-slate-400">Commission: ${(trans. commission || 0).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI Prediction Modal */}
      {selectedStock && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedStock.symbol}</h2>
                <p className="text-blue-100">{selectedStock.name}</p>
              </div>
              <button 
                onClick={closeModal}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-700">
              <button
                onClick={() => setModalTab('prediction')}
                className={`flex-1 py-4 px-6 font-medium transition-colors flex items-center justify-center gap-2 ${
                  modalTab === 'prediction' 
                    ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800/50' 
                    :  'text-slate-400 hover: text-white'
                }`}
              >
                <BarChart3 size={18} />
                AI Prediction
              </button>
              <button
                onClick={() => setModalTab('buy')}
                className={`flex-1 py-4 px-6 font-medium transition-colors flex items-center justify-center gap-2 ${
                  modalTab === 'buy' 
                    ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800/50' 
                    :  'text-slate-400 hover: text-white'
                }`}
              >
                <DollarSign size={18} />
                Buy Stock
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {modalTab === 'prediction' && (
                <div>
                  {predictionLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                      <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                      <p className="text-slate-400">Analyzing stock data with LSTM model...</p>
                      <p className="text-slate-500 text-sm mt-2">This may take 10-30 seconds</p>
                    </div>
                  ) : predictionError ? (
                    <div className="text-center py-20">
                      <div className="text-red-500 text-6xl mb-4">⚠️</div>
                      <p className="text-red-400 mb-4">{predictionError}</p>
                      <button 
                        onClick={() => fetchPrediction(selectedStock)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  ) : predictionData && (
                    <div className="space-y-6">
                      {/* Prediction Summary Cards */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-slate-800 rounded-xl p-4">
                          <p className="text-slate-400 text-sm">Current Price</p>
                          <p className="text-2xl font-bold text-white">
                            ${predictionData.prediction.current_price}
                          </p>
                        </div>
                        <div className="bg-slate-800 rounded-xl p-4">
                          <p className="text-slate-400 text-sm">Predicted (90 days)</p>
                          <p className="text-2xl font-bold text-white">
                            ${predictionData.prediction.predicted_price}
                          </p>
                        </div>
                        <div className="bg-slate-800 rounded-xl p-4">
                          <p className="text-slate-400 text-sm">Expected Change</p>
                          <p className={`text-2xl font-bold ${
                            predictionData.prediction.price_change >= 0 ? 'text-emerald-400' :  'text-red-400'
                          }`}>
                            {predictionData.prediction.price_change >= 0 ? '+' :  ''}
                            {predictionData. prediction.price_change_percent}%
                          </p>
                        </div>
                        <div className="bg-slate-800 rounded-xl p-4">
                          <p className="text-slate-400 text-sm">Recommendation</p>
                          <p 
                            className="text-xl font-bold"
                            style={{ color: predictionData.prediction.recommendation_color }}
                          >
                            {predictionData.prediction.recommendation}
                          </p>
                        </div>
                      </div>

                      {/* Chart */}
                      <div className="bg-slate-800 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Activity size={20} />
                          LSTM Price Prediction Analysis
                        </h3>
                        <img 
                          src={`data:image/png;base64,${predictionData.chart}`}
                          alt="Stock Prediction Chart"
                          className="w-full rounded-lg"
                        />
                      </div>

                      {/* Model Metrics */}
                      <div className="bg-slate-800 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Target size={20} />
                          Model Performance Metrics
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-slate-400 text-sm">Mean Squared Error (MSE)</p>
                            <p className="text-xl font-mono text-white">{predictionData.model_metrics.mse}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-sm">R² Score</p>
                            <p className="text-xl font-mono text-white">{predictionData.model_metrics.r2_score}</p>
                          </div>
                        </div>
                      </div>

                      {/* Stock Info */}
                      <div className="bg-slate-800 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-white mb-4">Stock Information</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-slate-400">Sector</p>
                            <p className="text-white">{predictionData.stock_info.sector}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Market Cap</p>
                            <p className="text-white">
                              ${(predictionData.stock_info.market_cap / 1e9).toFixed(2)}B
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-400">P/E Ratio</p>
                            <p className="text-white">
                              {predictionData.stock_info.pe_ratio?. toFixed(2) || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-400">52 Week High</p>
                            <p className="text-emerald-400">
                              ${predictionData.stock_info.fifty_two_week_high?. toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-400">52 Week Low</p>
                            <p className="text-red-400">
                              ${predictionData.stock_info.fifty_two_week_low?.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-400">Volume</p>
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

              {modalTab === 'buy' && (
                <div className="space-y-6">
                  {/* Current Price Card */}
                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-slate-400">Current Price</p>
                        <p className="text-3xl font-bold text-white">${selectedStock.currentPrice.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400">Sector</p>
                        <p className="text-lg text-blue-400">{selectedStock.sector}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Input */}
                  <div className="bg-slate-800 rounded-xl p-6">
                    <label className="block text-slate-400 mb-2">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Order Summary */}
                  <div className="bg-slate-800 rounded-xl p-6 space-y-4">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span className="text-white">${(selectedStock.currentPrice * quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Commission (4%)</span>
                      <span className="text-orange-400">${calculateCommission(selectedStock. currentPrice * quantity).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-700 pt-4 flex justify-between">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <span className="text-2xl font-bold text-white">
                        ${(selectedStock.currentPrice * quantity + calculateCommission(selectedStock.currentPrice * quantity)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={closeModal}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleBuyStock(selectedStock)}
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] disabled:opacity-50"
                    >
                      {loading ?  'Processing...' : 'Confirm Purchase'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;