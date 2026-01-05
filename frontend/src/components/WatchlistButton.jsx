import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { watchlistAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const WatchlistButton = ({ stock, onUpdate, size = 'default' }) => {
  const { isDark } = useTheme();
  const [inWatchlist, setInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkWatchlistStatus();
  }, [stock._id]);

  const checkWatchlistStatus = async () => {
    try {
      const { data } = await watchlistAPI.check(stock._id);
      setInWatchlist(data.inWatchlist);
    } catch (error) {
      console.error('Error checking watchlist status:', error);
    }
  };

  const toggleWatchlist = async (e) => {
    e.stopPropagation(); // Prevent card click
    
    try {
      setLoading(true);
      
      if (inWatchlist) {
        await watchlistAPI.remove(stock._id);
        setInWatchlist(false);
      } else {
        await watchlistAPI. add(stock._id);
        setInWatchlist(true);
      }
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console. error('Error toggling watchlist:', error);
      alert(error.response?.data?.error || 'Failed to update watchlist');
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    small: 'p-1',
    default: 'p-2',
    large: 'p-3'
  };

  const iconSize = {
    small: 16,
    default:  20,
    large: 24
  };

  return (
    <button
      onClick={toggleWatchlist}
      disabled={loading}
      className={`
        ${sizeClasses[size]}
        rounded-lg transition-all duration-200
        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
        ${inWatchlist 
          ? 'text-yellow-400 hover:text-yellow-300' 
          : isDark 
            ? 'text-slate-500 hover:text-yellow-400' 
            : 'text-gray-400 hover:text-yellow-500'
        }
      `}
      title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    >
      <Star 
        size={iconSize[size]} 
        fill={inWatchlist ? 'currentColor' : 'none'}
        className={`transition-all duration-200 ${loading ? 'animate-pulse' : ''}`}
      />
    </button>
  );
};

export default WatchlistButton;