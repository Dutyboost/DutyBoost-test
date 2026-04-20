/**
 * Create a SignupApplication with AES-256 encryption for sensitive fields
 * This function encrypts IBAN and bank account details before saving to the database
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Simple encryption/decryption functions (matching frontend utils)
async function deriveKeyFromSecret(secret) {
  const encoder = new TextEncoder();
  const data = encoder.encode(secret);

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
    256
  );

  return new Uint8Array(derivedBits);
}

async function importEncryptionKey(keyBytes) {
  return await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptValue(plaintext, key) {
  if (!plaintext) return null;

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);

  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  const combined = new Uint8Array(iv.length + encryptedData.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encryptedData), iv.length);

  return btoa(String.fromCharCode(...combined));
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await req.json();
    const encryptionSecret = Deno.env.get('BASE44_ENCRYPTION_KEY');

    if (!encryptionSecret) {
      console.error('BASE44_ENCRYPTION_KEY not set');
      return Response.json(
        { error: 'Encryption configuration missing' },
        { status: 500 }
      );
    }

    // Encrypt sensitive fields
    const keyBytes = await deriveKeyFromSecret(encryptionSecret);
    const key = await importEncryptionKey(keyBytes);

    const dataToSave = { ...payload };

    if (payload.bank_iban) {
      dataToSave.bank_iban = await encryptValue(payload.bank_iban, key);
    }
    if (payload.bank_account_name) {
      dataToSave.bank_account_name = await encryptValue(
        payload.bank_account_name,
        key
      );
    }

    // Create the signup application with encrypted fields
    const result = await base44.asServiceRole.entities.SignupApplication.create(
      dataToSave
    );

    // Return the created record (with encrypted fields as-is)
    return Response.json({
      success: true,
      id: result.id,
      message: 'Signup application created with encrypted sensitive data',
    });
  } catch (error) {
    console.error('Error creating signup application:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});