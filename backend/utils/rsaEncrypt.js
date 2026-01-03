import JSEncrypt from 'jsencrypt';

let publicKey = null;
let encryptor = null;

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fetch public key from server
export const fetchPublicKey = async () => {
  try {
    console.log('Fetching RSA public key from server...');
    const response = await fetch(`${API_URL}/auth/public-key`);
    const data = await response. json();
    
    if (data.publicKey) {
      publicKey = data.publicKey;
      
      // Initialize encryptor
      encryptor = new JSEncrypt();
      encryptor.setPublicKey(publicKey);
      
      console.log('RSA public key loaded successfully');
      return publicKey;
    } else {
      throw new Error('No public key in response');
    }
  } catch (error) {
    console.error('Failed to fetch public key:', error);
    throw error;
  }
};

// Encrypt password using RSA public key
export const encryptPassword = (password) => {
  if (!encryptor) {
    throw new Error('Encryptor not initialized.  Call fetchPublicKey first.');
  }
  
  const encrypted = encryptor. encrypt(password);
  if (!encrypted) {
    throw new Error('Encryption failed');
  }
  
  console.log('Password encrypted successfully');
  return encrypted;
};

// Check if public key is loaded
export const isPublicKeyLoaded = () => {
  return publicKey !== null && encryptor !== null;
};