import { sign, verify } from 'hono/jwt';

// JWT Configuration
export const JWT_CONFIG = {
  ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_SECRET,
  REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRES_IN: '15m', // 15 minutes
  REFRESH_TOKEN_EXPIRES_IN: '7d', // 7 days
  ALGORITHM: 'HS256' as const
};

// JWT Payload Interface
export interface JWTPayload {
  sub: string; // user id
  email: string;
  iat: number;
  exp: number;
  type: 'access' | 'refresh';
  [key: string]: string | number | 'access' | 'refresh'; // Add index signature for string type
}

export async function generateAccessToken(userId: string, email: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: JWTPayload = {
    sub: userId,
    email,
    iat: now,
    exp: now + (15 * 60), // 15 minutes
    type: 'access'
  };

  return await sign(payload, JWT_CONFIG.ACCESS_TOKEN_SECRET as string, JWT_CONFIG.ALGORITHM);
}

export async function generateRefreshToken(userId: string, email: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: JWTPayload = {
    sub: userId,
    email,
    iat: now,
    exp: now + (7 * 24 * 60 * 60), // 7 days
    type: 'refresh'
  };

  return await sign(payload, JWT_CONFIG.REFRESH_TOKEN_SECRET as string, JWT_CONFIG.ALGORITHM);
}

export async function verifyAccessToken(token: string): Promise<JWTPayload | null> {
  try {
    const payload = await verify(token, JWT_CONFIG.ACCESS_TOKEN_SECRET as string, JWT_CONFIG.ALGORITHM) as JWTPayload;

    if (payload.type !== 'access') {
      throw new Error('Invalid token type');
    }

    return payload;
  } catch (error) {
    console.error('Access token verification failed:', error);
    return null;
  }
}

export async function verifyRefreshToken(token: string): Promise<JWTPayload | null> {
  try {
    const payload = await verify(token, JWT_CONFIG.REFRESH_TOKEN_SECRET as string, JWT_CONFIG.ALGORITHM) as JWTPayload;

    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    return payload;
  } catch (error) {
    console.error('Refresh token verification failed:', error);
    return null;
  }
}

export async function generateTokenPair(userId: string, email: string) {
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(userId, email),
    generateRefreshToken(userId, email)
  ]);

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: 'Bearer',
    expires_in: 15 * 60 // 15 minutes in seconds
  };
}