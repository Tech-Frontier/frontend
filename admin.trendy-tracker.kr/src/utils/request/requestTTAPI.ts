import { RequestOptions, request } from './common';

function getBaseURL() {
  if (typeof window === 'undefined') {
    if (process.env.LOCAL === 'true') {
      return 'http://localhost:3000';
    }
    return 'https://admin.trendy-tracker.kr';
  }

  return window.location.origin;
}

export async function requestTTAPI<T>(options: RequestOptions): Promise<T> {
  const baseURL = `${getBaseURL()}/ttapi`;

  return request(options, { baseURL });
}
