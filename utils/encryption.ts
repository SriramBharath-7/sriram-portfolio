// Encryption key - in production, this should be stored securely and not in the code
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'your-secure-encryption-key';

/**
 * Check if the current window is potentially being monitored or scanned
 */
export function detectSecurityThreats(): boolean {
  try {
    // Check if the window is being framed
    if (window.self !== window.top) {
      console.warn('Detected potential security threat: Application is framed');
      return true;
    }

    // Check for suspicious properties that might indicate automated tools
    const suspiciousProps = [
      '__nightmare',
      '__selenium',
      '__webdriver_evaluate',
      '__driver_evaluate',
      'callPhantom',
      '_phantom',
      'phantom',
      'webdriver'
    ];

    const hasSuspiciousProps = suspiciousProps.some(prop => 
      prop in window || prop in document
    );

    if (hasSuspiciousProps) {
      console.warn('Detected potential security threat: Automated tools detected');
      return true;
    }

    return false;
  } catch (error) {
    console.warn('Security check failed:', error);
    return true; // Fail secure
  }
}

/**
 * Encrypt a string using AES encryption
 */
export async function encrypt(text: string): Promise<string> {
  // Check for security threats before proceeding
  if (detectSecurityThreats()) {
    throw new Error('Operation blocked due to security concerns');
  }

  try {
    // Generate a random initialization vector
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Convert the encryption key to a CryptoKey
    const encoder = new TextEncoder();
    const keyData = encoder.encode(ENCRYPTION_KEY);
    
    // Import the key
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );
    
    // Encrypt the data
    const data = encoder.encode(text);
    const encryptedData = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    
    // Combine IV and encrypted data
    const encryptedArray = new Uint8Array(iv.length + encryptedData.byteLength);
    encryptedArray.set(iv);
    encryptedArray.set(new Uint8Array(encryptedData), iv.length);
    
    // Convert to base64 for storage
    return btoa(String.fromCharCode(...encryptedArray));
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt a string using AES encryption
 */
export async function decrypt(encryptedText: string): Promise<string> {
  try {
    // Convert from base64
    const encryptedArray = new Uint8Array(
      atob(encryptedText).split('').map(char => char.charCodeAt(0))
    );
    
    // Extract IV and encrypted data
    const iv = encryptedArray.slice(0, 12);
    const data = encryptedArray.slice(12);
    
    // Convert the encryption key to a CryptoKey
    const encoder = new TextEncoder();
    const keyData = encoder.encode(ENCRYPTION_KEY);
    
    // Import the key
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );
    
    // Decrypt the data
    const decryptedData = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    
    // Convert back to string
    return new TextDecoder().decode(decryptedData);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt data');
  }
} 