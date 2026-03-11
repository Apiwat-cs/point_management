import jwt from 'jsonwebtoken';
import config from '@/config';

// Usually I keep the token between 5 minutes - 15 minutes
function generateAccessToken(userId: string, permission?: string) {
  return jwt.sign({ userId, permission }, config.encryption.JWT_ACCESS_SECRET, {
    expiresIn: parseInt(config.encryption.EXPIRE_ACCESS_TOKEN, 10),
  });
}

function generateRefreshToken(userId: string, jti: string, permission?: string) {
  return jwt.sign(
    {
      userId,
      jti,
      permission,
    },
    config.encryption.JWT_REFRESH_SECRET,
    {
      expiresIn: parseInt(config.encryption.EXPIRE_REFRESH_TOKEN, 10),
    },
  );
}

function generateTokens(userId: string, jti: string, permission?: string) {
  const accessToken = generateAccessToken(userId, permission);
  const refreshToken = generateRefreshToken(userId, jti, permission);

  return {
    accessToken,
    refreshToken,
  };
}

export default {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
