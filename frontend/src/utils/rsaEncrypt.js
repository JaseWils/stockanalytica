import JSEncrypt from 'jsencrypt';

const API_URL = 'http://localhost:5000/api';

let publicKey = null;
let encryptor = null;

// Fetch public key from server
export const fetchPublicKey = async () => {
  try {
    console.log('Fetching RSA public key from server...');
    
    const response = await fetch(`${API_URL}/auth/public-key`, {
      method:  'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch public key:  ${response.status}`);
    }
    
    const data = await response.json();
    
    if (! data. publicKey) {
      throw new Error('No public key in response');
    }
    
    publicKey = data.publicKey;
    
    // Initialize JSEncrypt with the public key
    encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    
    console. log('RSA public key loaded successfully');
    return publicKey;
  } catch (error) {
    console. error('Error fetching public key:', error);
    publicKey = null;
    encryptor = null;
    throw error;
  }
};

// Encrypt password using RSA public key
export const encryptPassword = (password) => {
  if (!encryptor) {
    throw new Error('Encryptor not initialized.  Call fetchPublicKey first.');
  }
  
  if (!password) {
    throw new Error('Password is required');
  }
  
  const encrypted = encryptor. encrypt(password);
  
  if (!encrypted) {
    throw new Error('Encryption failed.  Please refresh the page and try again.');
  }
  
  console.log('Password encrypted successfully');
  return encrypted;
};

// Check if public key is loaded
export const isPublicKeyLoaded = () => {
  return publicKey !== null && encryptor !== null;
};

// Force refresh the public key (THIS WAS MISSING!)
export const refreshPublicKey = async () => {
  publicKey = null;
  encryptor = null;
  return await fetchPublicKey();
};