import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import config from '@/config';

export interface ApiKeyMetadata {
  systemName: string;
  environment: 'dev' | 'live';
}

export const generateAdvancedApiKey = (metadata: ApiKeyMetadata) => {
  const { systemName, environment } = metadata;
  const secret = config.server.API_KEY_SECRET;

  // 1. Generate a random Salt (Nonce)
  const salt = randomBytes(16).toString('hex');

  // 2. Generate HMAC signature: HMAC(secret, payload + salt)
  const signature = createHmac('sha256', secret).update(`${systemName}:${salt}`).digest('hex');

  return {
    fullKey: signature, // ← เฉพาะ Signature, ไม่มี prefix
    systemName,
    environment,
    salt,
    signature,
  };
};

export const verifyApiKeySignature = (systemName: string, salt: string, signatureReceived: string): boolean => {
  const secret = config.server.API_KEY_SECRET;

  // Re-calculate the expected signature
  const expectedSignature = createHmac('sha256', secret).update(`${systemName}:${salt}`).digest('hex');

  const expectedBuffer = Buffer.from(expectedSignature, 'hex');
  const receivedBuffer = Buffer.from(signatureReceived, 'hex');

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  // Prevent timing attacks
  return timingSafeEqual(expectedBuffer, receivedBuffer);
};
