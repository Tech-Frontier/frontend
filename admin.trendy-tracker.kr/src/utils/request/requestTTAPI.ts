import { headers } from 'next/headers';
import { RequestOptions, request } from './common';

function getBaseURL() {
  if (typeof window === 'undefined') {
    if (process.env.LOCAL === 'true') {
      return 'http://localhost:3000';
    }

    return `https://${process.env.VERCEL_URL}`;
  }

  return window.location.origin;
}

export async function requestTTAPI<T>(options: RequestOptions): Promise<T> {
  const headersList = headers();
  const cookie = headersList.get('Cookie');

  const baseURL = `${getBaseURL()}/ttapi`;

  return request({
    ...options,
    additionalHeaders: {
      // NOTE: 권한 체크가 필요하여 캐시하지 않음
      cache: 'no-store',
      ...(cookie != null ? { cookie } : {}),
      ...options.additionalHeaders,
    },
  }, { baseURL });
}
