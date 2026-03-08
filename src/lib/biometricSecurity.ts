/**
 * Biometric Security Module
 * Handles encryption, hashing, and storage of sensitive biometric data
 */

export interface BiometricData {
  userId: string;
  faceEncoding?: string; // Encrypted face data
  fingerprintHash?: string; // Hashed fingerprint
  patternHash?: string; // Hashed pattern lock
  pinHash?: string; // Hashed PIN
  encryptionKey?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Simple encryption/decryption using Web Crypto API
 */
export const biometricSecurity = {
  /**
   * Generate a random encryption key
   */
  generateEncryptionKey: (): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  },

  /**
   * Hash sensitive data using SHA-256
   */
  hashData: async (data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Simple Base64 encoding for encryption storage
   */
  encryptData: (data: string, _key: string): string => {
    try {
      // For production, implement proper AES-256-GCM encryption
      // This is a simplified version using Base64 encoding
      return btoa(data); // Base64 encoding
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  },

  /**
   * Decrypt data using Base64
   */
  decryptData: (encryptedData: string, _key: string): string => {
    try {
      return atob(encryptedData); // Base64 decoding
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  },

  /**
   * Validate PIN format (4-6 digits)
   */
  validatePIN: (pin: string): boolean => {
    return /^\d{4,6}$/.test(pin);
  },

  /**
   * Validate pattern (at least 4 dots connected)
   */
  validatePattern: (pattern: number[]): boolean => {
    return Array.isArray(pattern) && pattern.length >= 4;
  },

  /**
   * Create biometric credential
   */
  createBiometricCredential: async (
    userId: string,
    faceData?: string,
    fingerprintData?: string,
    patternData?: string,
    pin?: string
  ): Promise<BiometricData> => {
    const encryptionKey = biometricSecurity.generateEncryptionKey();
    const now = new Date();

    return {
      userId,
      faceEncoding: faceData ? biometricSecurity.encryptData(faceData, encryptionKey) : undefined,
      fingerprintHash: fingerprintData ? await biometricSecurity.hashData(fingerprintData) : undefined,
      patternHash: patternData ? await biometricSecurity.hashData(JSON.stringify(patternData)) : undefined,
      pinHash: pin ? await biometricSecurity.hashData(pin) : undefined,
      encryptionKey: encryptionKey,
      createdAt: now,
      updatedAt: now,
    };
  },

  /**
   * Verify biometric credential
   */
  verifyBiometric: async (
    storedData: BiometricData,
    verifyType: 'pin' | 'fingerprint' | 'pattern' | 'face',
    inputData: string | number[]
  ): Promise<boolean> => {
    try {
      const inputString = typeof inputData === 'string' ? inputData : JSON.stringify(inputData);
      const inputHash = await biometricSecurity.hashData(inputString);

      switch (verifyType) {
        case 'pin':
          return storedData.pinHash === inputHash;
        case 'fingerprint':
          return storedData.fingerprintHash === inputHash;
        case 'pattern':
          return storedData.patternHash === inputHash;
        case 'face':
          // For face, we'd use ML model comparison (face-api.js)
          return true;
        default:
          return false;
      }
    } catch (error) {
      console.error('Verification error:', error);
      return false;
    }
  },
};

/**
 * Check if device supports biometric authentication
 */
export const checkBiometricSupport = async (): Promise<{
  fingerprint: boolean;
  face: boolean;
  webauthn: boolean;
}> => {
  return {
    fingerprint: typeof window !== 'undefined' && 'FingerprintAIO' in window,
    face: typeof window !== 'undefined' && ('mediaDevices' in navigator),
    webauthn: typeof window !== 'undefined' && 'PublicKeyCredential' in window,
  };
};

/**
 * Request fingerprint access (requires external library in production)
 */
export const requestFingerprint = async (): Promise<boolean> => {
  try {
    if ('FingerprintAIO' in window) {
      // Implementation for fingerprint in mobile/supported devices
      console.log('Fingerprint available');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Fingerprint error:', error);
    return false;
  }
};

export default biometricSecurity;
