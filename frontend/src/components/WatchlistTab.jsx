import React, { useState, useEffect } from 'react';
import { Star, Trash2, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Edit2, X, Check, Target } from 'lucide-react';
import { watchlistAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const WatchlistTab = ({ onStockClick }) => {
  const { isDark } = useTheme();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ notes: '', targetPrice: '' });

  const themeClasses = {
    bgSecondary: isDark ?  'bg-slate-800' : 'bg-white',
    bgTertiary:  isDark ? 'bg-slate-700' : 'bg-gray-100',
    textPrimary: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-slate-400' : 'text-gray-600',
    textMuted: isDark ?  'text-slate-500' : 'text-gray-400',
    border: isDark ? 'border-slate-700' : 'border-gray-200',
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const { data } = await watchlistAPI.get();
      setWatchlist(data);
    } catch (error) {
      console. error('Error fetching watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (stockId) => {
    try {
      await watchlistAPI.remove(stockId);
      setWatchlist(prev => prev.filter(item => item. stock._id !== stockId));
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      alert('Failed to remove from watchlist');
    }
  };

  const startEditing = (item) => {
    setEditingId(item._id);
    setEditForm({
      notes: item.notes || '',
      targetPrice: item.targetPrice || ''
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ notes: '', targetPrice: '' });
  };

  const saveEdit = async (stockId) => {
    try {
      await watchlistAPI. update(stockId, {
        notes:  editForm.notes,
        targetPrice:  editForm.targetPrice ?  parseFloat(editForm.targetPrice) : null
      });
      
      setWatchlist(prev => prev. map(item => {
        if (item.stock._id === stockId) {
          return {
            ...item,
            notes: editForm.notes,
            targetPrice: editForm.targetPrice ?  parseFloat(editForm.targetPrice) : null
          };
        }
        return item;
      }));
      
      cancelEditing();
    } catch (error) {
      console. error('Error updating watchlist item:', error);
      alert('Failed to update');
    }
  };

  const getTargetStatus = (currentPrice, targetPrice) => {
    if (!targetPrice) return null;
    const diff = ((targetPrice - currentPrice) / currentPrice) * 100;
    return {
      diff,
      reached: currentPrice >= targetPrice,
      label: diff >= 0 ? '+' + diff.toFixed(2) + '%' : diff.toFixed(2) + '%'
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className={`text-lg ${themeClasses. textSecondary}`}>Loading watchlist...</div>
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="text-center py-20">
        <Star className={`w-16 h-16 mx-auto mb-4 ${themeClasses.textMuted}`} />
        <h3 className={`text-xl font-semibold mb-2 ${themeClasses.textPrimary}`}>Your Watchlist is Empty</h3>
        <p className={themeClasses.textSecondary}>
          Click the star icon on any stock to add it to your watchlist
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className={`${themeClasses. bgSecondary} border ${themeClasses. border} rounded-xl p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
            <span className={`font-semibold ${themeClasses.textPrimary}`}>
              {watchlist. length} {watchlist.length === 1 ? 'Stock' : 'Stocks'} in Watchlist
            </span>
          </div>
          <div className={`text-sm ${themeClasses. textSecondary}`}>
            Click on a stock to view details
          </div>
        </div>
      </div>

      {/* Watchlist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {watchlist.map((item) => {
          const stock = item.stock;
          if (!stock) return null;
          
          const targetStatus = getTargetStatus(stock.currentPrice, item.targetPrice);
          const isEditing = editingId === item._id;

          return (
            <div
              key={item._id}
              className={`${themeClasses. bgSecondary} border ${themeClasses. border} rounded-xl p-4 hover:border-yellow-500/50 transition-all`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div 
                  className="cursor-pointer flex-1"
                  onClick={() => onStockClick(stock)}
                >
                  <div className="flex items-center gap-2">
                    <h3 className={`text-lg font-bold ${themeClasses.textPrimary}`}>{stock.symbol}</h3>
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  </div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>{stock.name}</p>
                  <span className={`text-xs px-2 py-1 ${themeClasses. bgTertiary} rounded mt-1 inline-block`}>
                    {stock.sector}
                  </span>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-1">
                  {! isEditing && (
                    <>
                      <button
                        onClick={() => startEditing(item)}
                        className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
                        title="Edit notes & target"
                      >
                        <Edit2 size={16} className={themeClasses.textSecondary} />
                      </button>
                      <button
                        onClick={() => removeFromWatchlist(stock._id)}
                        className="p-2 rounded-lg transition-colors hover:bg-red-500/10 text-red-400"
                        title="Remove from watchlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Price Info */}
              <div 
                className="flex justify-between items-center mb-3 cursor-pointer"
                onClick={() => onStockClick(stock)}
              >
                <div className={`text-2xl font-bold ${themeClasses. textPrimary}`}>
                  ${stock.currentPrice?. toFixed(2)}
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  (stock.change || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {(stock.change || 0) >= 0 ?  <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {Math.abs(stock. change || 0)}%
                </div>
              </div>

              {/* Target Price */}
              {targetStatus && ! isEditing && (
                <div className={`flex items-center gap-2 mb-3 p-2 rounded-lg ${
                  targetStatus. reached 
                    ? 'bg-emerald-500/10 border border-emerald-500/30' 
                    : isDark ?  'bg-slate-700/50' : 'bg-gray-50'
                }`}>
                  <Target size={16} className={targetStatus.reached ? 'text-emerald-400' : themeClasses.textSecondary} />
                  <span className={`text-sm ${themeClasses.textSecondary}`}>Target: </span>
                  <span className={`font-semibold ${themeClasses. textPrimary}`}>${item.targetPrice?.toFixed(2)}</span>
                  <span className={`text-sm ${targetStatus.diff >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    ({targetStatus.label})
                  </span>
                  {targetStatus.reached && (
                    <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full ml-auto">
                      Reached! 
                    </span>
                  )}
                </div>
              )}

              {/* Notes */}
              {item.notes && ! isEditing && (
                <div className={`text-sm ${themeClasses.textSecondary} p-2 ${themeClasses.bgTertiary} rounded-lg`}>
                  📝 {item. notes}
                </div>
              )}

              {/* Edit Form */}
              {isEditing && (
                <div className={`mt-3 p-3 ${themeClasses. bgTertiary} rounded-lg space-y-3`}>
                  <div>
                    <label className={`block text-xs ${themeClasses. textSecondary} mb-1`}>Target Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editForm.targetPrice}
                      onChange={(e) => setEditForm({ ...editForm, targetPrice: e.target.value })}
                      placeholder="e.g., 150. 00"
                      className={`w-full px-3 py-2 ${themeClasses. bgSecondary} border ${themeClasses. border} rounded-lg text-sm ${themeClasses. textPrimary} focus:outline-none focus:ring-2 focus: ring-blue-500`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs ${themeClasses. textSecondary} mb-1`}>Notes</label>
                    <textarea
                      value={editForm.notes}
                      onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                      placeholder="Add notes about this stock..."
                      rows={2}
                      className={`w-full px-3 py-2 ${themeClasses.bgSecondary} border ${themeClasses.border} rounded-lg text-sm ${themeClasses. textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(stock._id)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <Check size={16} />
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className={`flex-1 flex items-center justify-center gap-1 py-2 ${themeClasses. bgSecondary} ${themeClasses. textSecondary} rounded-lg text-sm font-medium transition-colors hover:opacity-80`}
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Added Date */}
              <div className={`mt-3 text-xs ${themeClasses.textMuted}`}>
                Added {new Date(item. addedAt).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WatchlistTab;