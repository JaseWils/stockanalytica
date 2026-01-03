import JSEncrypt from 'jsencrypt';

let publicKey = null;
let encryptor = null;

// Fetch public key from server
export const fetchPublicKey = async (apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/auth/public-key`);
    const data = await response.json();
    publicKey = data.publicKey;
    
    // Initialize encryptor
    encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    
    return publicKey;
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
  
  const encrypted = encryptor.encrypt(password);
  if (!encrypted) {
    throw new Error('Encryption failed');
  }
  
  return encrypted;
};

// Check if public key is loaded
export const isPublicKeyLoaded = () => {
  return publicKey !== null;
};