import crypto from 'crypto';

function hashToken(token: string): string {
  return crypto.createHash('sha512').update(token).digest('hex');
}

export default { hashToken };
