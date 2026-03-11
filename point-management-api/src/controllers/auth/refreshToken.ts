import { successRes, errRes } from '@/controllers/main';
import jwt from 'jsonwebtoken';
import conf from '@/config';
import { jwtHelper } from '@/utility';
import type { ITyperefreshToken } from './type';
import crypto from 'crypto';

export default async function refreshTokenFunc({ refToken }: ITyperefreshToken): Promise<ITypeReturnResponse<any>> {
  try {
    let payload_decoded: any;
    try {
      payload_decoded = jwt.verify(refToken, conf.encryption.JWT_REFRESH_SECRET);
      // eslint-disable-next-line
    } catch (err) {
      return errRes.UNAUTHORIZED({ message: 'Invalid refresh token' });
    }

    if (!payload_decoded || !payload_decoded.userId) {
      return errRes.UNAUTHORIZED({ message: 'Invalid refresh token' });
    }

    const userId = payload_decoded.userId.toString();
    const jti = crypto.randomUUID();
    const { accessToken, refreshToken } = jwtHelper.generateTokens(userId, jti);

    return successRes({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return errRes.INTERNAL_SERVER_ERROR({ message: error instanceof Error ? error.message : 'Unknown error' });
  }
}
