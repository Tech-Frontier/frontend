import { pbkdf2Sync } from 'crypto';
import { ensureEnv } from '@divops-packages/node-utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { id, password } = await req.json();

  try {
    if (ensureEnv('ADMIN_ID') !== id) {
      return NextResponse.json({ message: 'ID 가 올바르지 않습니다.' }, { status: 403 });
    }

    if (ensureEnv('ADMIN_PASSWORD') !== password) {
      return NextResponse.json({ message: 'PW 가 올바르지 않습니다.' }, { status: 403 });
    }

    const secretKey = ensureEnv('TTAPI_TOKEN') + `:${id}`;

    // 암호화된 문자열
    const cryptedToken = pbkdf2Sync(`${id}:${new Date().toISOString().slice(0, 7)}`, secretKey, 1000, 64, 'sha512').toString('base64url');

    return NextResponse.json(
      { message: 'ok' },
      {
        status: 200,
        headers: {
          'Set-Cookie': `Authorization=${cryptedToken}:${id}; path=/; HttpOnly;`,
        },
      },
    );
  } catch (error:any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
