import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPublicKey, encryptPassword, isPublicKeyLoaded, refreshPublicKey } from '../utils/rsaEncrypt';

const AuthContext = createContext(null);

// Hardcode API URL to avoid . env issues
const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [rsaReady, setRsaReady] = useState(false);

  // Initialize RSA public key on mount
  useEffect(() => {
    const initRSA = async () => {
      try {
        console.log('Initializing RSA...');
        await fetchPublicKey();
        setRsaReady(true);
        console.log('RSA initialized successfully');
      } catch (error) {
        console.error('Failed to initialize RSA:', error);
        setRsaReady(false);
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
              'Authorization':  `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            // Token is invalid, clear it
            localStorage. removeItem('token');
            setToken(null);
          }
        } catch (error) {
          console. error('Auth check failed:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    // Always refresh RSA key before auth operations to ensure we have the latest
    if (!isPublicKeyLoaded()) {
      console.log('RSA not ready, fetching public key...');
      await fetchPublicKey();
    }

    // Encrypt password with RSA
    console.log('Encrypting password with RSA...');
    let encryptedPassword;
    try {
      encryptedPassword = encryptPassword(password);
    } catch (encryptError) {
      // If encryption fails, try refreshing the key
      console.log('Encryption failed, refreshing public key...');
      await refreshPublicKey();
      encryptedPassword = encryptPassword(password);
    }

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
    // Always refresh RSA key before auth operations to ensure we have the latest
    if (!isPublicKeyLoaded()) {
      console.log('RSA not ready, fetching public key.. .');
      await fetchPublicKey();
    }

    // Encrypt password with RSA
    console. log('Encrypting password with RSA.. .');
    let encryptedPassword;
    try {
      encryptedPassword = encryptPassword(password);
    } catch (encryptError) {
      // If encryption fails, try refreshing the key
      console.log('Encryption failed, refreshing public key...');
      await refreshPublicKey();
      encryptedPassword = encryptPassword(password);
    }

    const response = await fetch(`${API_URL}/auth/register`, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, encryptedPassword, name, profileType })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data. error || 'Registration failed');
    }

    localStorage.setItem('token', data.token);
    setToken(data. token);
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