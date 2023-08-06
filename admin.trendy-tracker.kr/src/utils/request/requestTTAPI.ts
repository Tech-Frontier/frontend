import { RequestOptions, request } from './common';

function getBaseURL() {
  if (typeof window === 'undefined') {
    return 'http://127.0.0.1:3000';
  }

  return window.location.origin;
}

export async function requestTTAPI<T>(options: RequestOptions): Promise<T> {
  const baseURL = `${getBaseURL()}/ttapi`;

  return request(options, { baseURL });
}
