/**
 * Retrieve a SignupApplication and decrypt sensitive fields
 * Returns the full record with IBAN and bank details decrypted
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

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

async function decryptValue(encrypted, key) {
  if (!encrypted) return null;

  try {
    const combined = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const payload = await req.json();
    const { id } = payload;

    if (!id) {
      return Response.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const encryptionSecret = Deno.env.get('BASE44_ENCRYPTION_KEY');

    if (!encryptionSecret) {
      console.error('BASE44_ENCRYPTION_KEY not set');
      return Response.json(
        { error: 'Encryption configuration missing' },
        { status: 500 }
      );
    }

    // Fetch the record
    const record = await base44.asServiceRole.entities.SignupApplication.filter(
      { id }
    );

    if (!record || record.length === 0) {
      return Response.json(
        { error: 'Signup application not found' },
        { status: 404 }
      );
    }

    const data = record[0];

    // Decrypt sensitive fields
    const keyBytes = await deriveKeyFromSecret(encryptionSecret);
    const key = await importEncryptionKey(keyBytes);

    const decrypted = { ...data };

    if (data.bank_iban) {
      decrypted.bank_iban = await decryptValue(data.bank_iban, key);
    }
    if (data.bank_account_name) {
      decrypted.bank_account_name = await decryptValue(
        data.bank_account_name,
        key
      );
    }

    return Response.json(decrypted);
  } catch (error) {
    console.error('Error retrieving signup application:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});