import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPublicKey, encryptPassword, isPublicKeyLoaded } from '../utils/rsaEncrypt';

const AuthContext = createContext(null);

const API_URL = process.env. REACT_APP_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [rsaReady, setRsaReady] = useState(false);

  // Initialize RSA public key on mount
  useEffect(() => {
    const initRSA = async () => {
      try {
        await fetchPublicKey(API_URL);
        setRsaReady(true);
      } catch (error) {
        console.error('Failed to initialize RSA:', error);
      }
    };
    initRSA();
  }, []);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers:  {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (error) {
          console. error('Auth check failed:', error);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    if (!isPublicKeyLoaded()) {
      await fetchPublicKey(API_URL);
    }

    // Encrypt password with RSA before sending
    const encryptedPassword = encryptPassword(password);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, encryptedPassword })
    });

    const data = await response. json();

    if (! response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const register = async (email, password, name, profileType) => {
    if (!isPublicKeyLoaded()) {
      await fetchPublicKey(API_URL);
    }

    // Encrypt password with RSA before sending
    const encryptedPassword = encryptPassword(password);

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json'
      },
      body: JSON. stringify({ email, encryptedPassword, name, profileType })
    });

    const data = await response. json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    localStorage.setItem('token', data. token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const updateBalance = (newBalance) => {
    setUser(prev => ({ ...prev, balance: newBalance }));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading, 
      rsaReady,
      login, 
      register, 
      logout,
      updateBalance 
    }}>
      {children}
    </AuthContext. Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;