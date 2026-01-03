const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const keysDir = path.join(__dirname, '../keys');

// Ensure keys directory exists
if (! fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir, { recursive: true });
}

const privateKeyPath = path.join(keysDir, 'private. pem');
const publicKeyPath = path. join(keysDir, 'public. pem');

// Generate RSA key pair if not exists
const generateKeyPair = () => {
  if (! fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
    console.log('Generating new RSA key pair.. .');
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding:  {
        type:  'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });

    fs.writeFileSync(privateKeyPath, privateKey);
    fs.writeFileSync(publicKeyPath, publicKey);
    
    console.log('RSA key pair generated successfully! ');
  }
};

// Get public key
const getPublicKey = () => {
  generateKeyPair();
  return fs.readFileSync(publicKeyPath, 'utf8');
};

// Get private key
const getPrivateKey = () => {
  generateKeyPair();
  return fs.readFileSync(privateKeyPath, 'utf8');
};

// Decrypt password using RSA private key
// JSEncrypt uses PKCS1 padding by default, NOT OAEP
const decryptPassword = (encryptedPassword) => {
  try {
    const privateKey = getPrivateKey();
    const buffer = Buffer.from(encryptedPassword, 'base64');
    
    // Use PKCS1 padding (this is what JSEncrypt uses)
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
      },
      buffer
    );
    
    return decrypted.toString('utf8');
  } catch (error) {
    console.error('RSA Decryption error:', error. message);
    throw new Error('Failed to decrypt password');
  }
};

module.exports = {
  generateKeyPair,
  getPublicKey,
  getPrivateKey,
  decryptPassword
};