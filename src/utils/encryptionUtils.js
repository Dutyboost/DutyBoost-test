/**
 * AES-256-GCM encryption utilities for sensitive data fields
 * Used for encrypting IBAN, bank account details before storing in database
 */

// Field names that should be encrypted
export const ENCRYPTED_FIELDS = ['bank_iban', 'bank_account_name'];

/**
 * Encrypt a single value using AES-256-GCM
 * @param {string} plaintext - The data to encrypt
 * @param {Uint8Array} key - The encryption key (32 bytes for AES-256)
 * @returns {string} Base64 encoded string containing iv + ciphertext + authTag
 */
export async function encryptValue(plaintext, key) {
  if (!plaintext) return null;

  // Generate random IV (12 bytes for GCM)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Encode plaintext to bytes
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);

  // Encrypt using AES-256-GCM
  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  // Combine IV + ciphertext and return as base64
  const combined = new Uint8Array(iv.length + encryptedData.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encryptedData), iv.length);

  return btoa(String.fromCharCode(...combined));
}

/**
 * Decrypt a value encrypted with encryptValue
 * @param {string} encrypted - Base64 encoded string (iv + ciphertext)
 * @param {Uint8Array} key - The encryption key (32 bytes for AES-256)
 * @returns {string} The decrypted plaintext
 */
export async function decryptValue(encrypted, key) {
  if (!encrypted) return null;

  try {
    // Decode base64
    const combined = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));

    // Extract IV (first 12 bytes) and ciphertext (remaining)
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);

    // Decrypt using AES-256-GCM
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    );

    // Convert decrypted bytes back to string
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}

/**
 * Derive encryption key from a secret string
 * @param {string} secret - The secret string (at least 32 characters)
 * @returns {Uint8Array} The 256-bit encryption key
 */
export async function deriveKeyFromSecret(secret) {
  const encoder = new TextEncoder();
  const data = encoder.encode(secret);

  // Use PBKDF2 to derive a key
  const baseKey = await crypto.subtle.importKey(
    'raw',
    data,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode('dutyboost-encryption-salt'),
      iterations: 100000,
      hash: 'SHA-256',
    },
    baseKey,
    256 // 256 bits for AES-256
  );

  return new Uint8Array(derivedBits);
}

/**
 * Import raw key bytes as an AES-GCM key
 * @param {Uint8Array} keyBytes - The 32-byte key
 * @returns {CryptoKey} The imported key ready for encryption/decryption
 */
export async function importEncryptionKey(keyBytes) {
  return await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt specified fields in an object
 * @param {object} data - The object containing fields to encrypt
 * @param {Uint8Array} key - The encryption key
 * @param {string[]} fieldsToEncrypt - List of field names to encrypt
 * @returns {object} New object with encrypted fields
 */
export async function encryptFields(data, key, fieldsToEncrypt = ENCRYPTED_FIELDS) {
  const encrypted = { ...data };

  for (const field of fieldsToEncrypt) {
    if (encrypted[field]) {
      encrypted[field] = await encryptValue(encrypted[field], key);
    }
  }

  return encrypted;
}

/**
 * Decrypt specified fields in an object
 * @param {object} data - The object containing encrypted fields
 * @param {Uint8Array} key - The encryption key
 * @param {string[]} fieldsToDecrypt - List of field names to decrypt
 * @returns {object} New object with decrypted fields
 */
export async function decryptFields(data, key, fieldsToDecrypt = ENCRYPTED_FIELDS) {
  const decrypted = { ...data };

  for (const field of fieldsToDecrypt) {
    if (decrypted[field]) {
      decrypted[field] = await decryptValue(decrypted[field], key);
    }
  }

  return decrypted;
}