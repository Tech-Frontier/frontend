import { pbkdf2Sync } from 'crypto';
import { ensureEnv } from '@divops-packages/node-utils';
import { NextRequest, NextResponse } from 'next/server';

class AuthError extends Error {
  code;

  constructor() {
    super('Not Allowed');
    this.code = 403;
  }
}

export function requireAuth(req: NextRequest) {
  const [token, id] = req.cookies.get('Authorization')?.value.split(':') ?? [];

  const secretKey = ensureEnv('TTAPI_TOKEN') + `:${id}`;

  // 암호화된 문자열
  const cryptedToken = pbkdf2Sync(`${id}:${new Date().toISOString().slice(0, 7)}`, secretKey, 1000, 64, 'sha512').toString('base64url');

  // 암호화된 문자열이 secret 으로 암호화되었는지 확인
  if (token !== cryptedToken) {
    throw new AuthError();
  }
}

export function GET(req: NextRequest) {
  try {
    requireAuth(req);

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error:any) {
    if (error.code != null) {
      return NextResponse.json({ message: error.message }, { status: error.code });
    }
  }
}
