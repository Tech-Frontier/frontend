import { NextResponse, NextRequest } from 'next/server';
import { requireAuth } from '@/app/auth/health/route';

const BASE_URL = 'https://api.trendy-tracker.kr';

const TTAPI_TOKEN = process.env.TTAPI_TOKEN ?? '';

export async function GET(req: NextRequest) {
  try {
    requireAuth(req);
    const url = new URL(req.url);
    const search = url.search;
    const pathname = url.pathname.replace('/ttapi', '');

    if (TTAPI_TOKEN === '') {
      return NextResponse.json({ error: 'Internal Server Error[KEY]' }, { status: 500 });
    }

    const res = await fetch(`${BASE_URL}${pathname}${search}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TTAPI_TOKEN}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error:any) {
    console.error(error.message);

    if (error.code != null) {
      return NextResponse.json({ message: error.message }, { status: error.code });
    }

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAuth(req);
    const url = new URL(req.url);

    const pathname = url.pathname.replace('/ttapi', '');

    if (TTAPI_TOKEN === '') {
      return NextResponse.json({ error: 'Internal Server Error[KEY]' }, { status: 500 });
    }

    const res = await fetch(`${BASE_URL}${pathname}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TTAPI_TOKEN}`,
      },
      body: await req.json(),
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error:any) {
    console.error(error.message);

    if (error.code != null) {
      return NextResponse.json({ message: error.message }, { status: error.code });
    }

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
