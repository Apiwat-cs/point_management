import { successRes, errRes } from '@/controllers/main';
import type { ITypeSignIn } from './type';
import { query } from '@/databases/postgres';
import { jwtHelper, hashHelper } from '@/utility';
import crypto from 'crypto';

function mapUserResponse(user: any) {
  const activeAccount = {
    id: user.id.toString(),
    userId: user.id.toString(),
    username: user.username,
    fullName: user.full_name || user.username,
    avatar: user.avatar,
    isActive: user.is_active,
    permission: user.permission || 'ADMIN',
    userRole: user.user_role || 'ADMIN',
  };

  return {
    id: user.id.toString(),
    username: user.username,
    name: user.full_name || user.username,
    activeAccount,
    Accounts: [activeAccount],
    unActiveAccounts: [],
  };
}

async function signIn({ username, password }: ITypeSignIn): Promise<ITypeReturnResponse<any>> {
  try {
    if (!username) {
      return errRes.DATA_NOT_FOUND({ message: 'username not found' });
    }

    if (!password) {
      return errRes.DATA_NOT_FOUND({ message: 'password not found' });
    }

    const { rows } = await query('SELECT * FROM sp_get_user_by_username($1)', [username]);
    const user = rows[0];

    if (!user) {
      return errRes.UNAUTHORIZED({ message: 'Invalid username or password' });
    }

    if (!user.is_active) {
      return errRes.UNAUTHORIZED({ message: 'User account is inactive' });
    }

    // Hash logic check uses SHA-512 in this system
    const hashedPassword = hashHelper.hashToken(password);

    if (hashedPassword !== user.password) {
      return errRes.UNAUTHORIZED({ message: 'Invalid username or password' });
    }

    // Create Token Data
    const jti = crypto.randomUUID();
    const { accessToken, refreshToken } = jwtHelper.generateTokens(user.id.toString(), jti);

    const payload = {
      accessToken,
      refreshToken,
      user: mapUserResponse(user),
    };

    return successRes(payload);
  } catch (error) {
    return errRes.INTERNAL_SERVER_ERROR({ message: error instanceof Error ? error.message : 'Unknown error' });
  }
}

async function getMe(userId: string): Promise<ITypeReturnResponse<any>> {
  try {
    const { rows } = await query('SELECT id, username, is_active, full_name, avatar, user_role, permission FROM users WHERE id = $1', [userId]);
    const user = rows[0];

    if (!user) {
      return errRes.DATA_NOT_FOUND({ message: 'User not found' });
    }

    const payload = {
      user: mapUserResponse(user),
    };

    return successRes(payload);
  } catch (error) {
    return errRes.INTERNAL_SERVER_ERROR({ message: error instanceof Error ? error.message : 'Unknown error' });
  }
}

export default {
  signIn,
  getMe,
};
