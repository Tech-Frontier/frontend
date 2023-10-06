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

    console.log(`[API] ${BASE_URL}${pathname}${search}`);

    const res = await fetch(`${BASE_URL}${pathname}${search}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TTAPI_TOKEN}`,
      },
    });

    try {
      const data = await res.json();

      return NextResponse.json(data);
    } catch (error: any) {
      if (error.message.includes('JSON at position')) {
        const data = await res.text();
        return NextResponse.json({ message: data }, { status: 500 });
      }

      throw error;
    }
  } catch (error:any) {
    console.error(`Server Error(${BASE_URL}): ${error.message}`);

    if (error.code != null) {
      return NextResponse.json({ message: error.message }, { status: error.code });
    }

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAuth(req);
    const pathname = (new URL(req.url)).pathname.replace('/ttapi', '');

    if (TTAPI_TOKEN === '') {
      return NextResponse.json({ error: 'Internal Server Error[KEY]' }, { status: 500 });
    }

    const body = await req.json();

    const url = `${BASE_URL}${pathname}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${TTAPI_TOKEN}`,
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(url, options);

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error:any) {
    try {
      console.log(`error: ${await error.text()}`);
    } catch {
      //
    }
    console.error(`error from ${BASE_URL}: ${error.message}`);

    if (error.code != null) {
      return NextResponse.json({ message: error.message }, { status: error.code });
    }

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    requireAuth(req);
    const url = new URL(req.url);

    const pathname = url.pathname.replace('/ttapi', '');

    if (TTAPI_TOKEN === '') {
      return NextResponse.json({ error: 'Internal Server Error[KEY]' }, { status: 500 });
    }

    const body = await req.json();

    const res = await fetch(`${BASE_URL}${pathname}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${TTAPI_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error:any) {
    console.error(`error from ${BASE_URL}: ${error.message}`);

    if (error.code != null) {
      return NextResponse.json({ message: error.message }, { status: error.code });
    }

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
