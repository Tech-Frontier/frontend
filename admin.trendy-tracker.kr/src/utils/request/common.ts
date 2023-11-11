export interface RequestContext {
  baseURL?: string;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT';
  pathname: string;
  contentType?: string;
  params?: Record<string, any>
  additionalHeaders?: Record<string, any>
}

const DEFAULT_METHOD = 'GET';
const DEFAULT_CONTENT_TYPE = 'application/json';

export function convertToQueryString(params: Record<string, any>) {
  return (
    new URLSearchParams(
      Object.entries(params)
        .filter(([, value]) => value != null)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map(x => [key, x]);
          }
          return [[key, value]];
        })
        .flat(),
    )
      .toString()
      .replace(/\+/g, '%20')
  );
}

export async function request(
  {
    method = DEFAULT_METHOD,
    pathname,
    contentType = DEFAULT_CONTENT_TYPE,
    params,
    additionalHeaders = {},
  }: RequestOptions,
  context: RequestContext = {}) {
  const { baseURL = '' } = context;
  if (!pathname.startsWith('/')) {
    throw new Error(`pathname must starts with "/".(${pathname})`);
  }

  console.log(`${method} ${baseURL}${pathname}${params != null && method === 'GET' ? `?${convertToQueryString(params)}` : ''}`);

  const url = `${baseURL}${pathname}${params != null && method === 'GET' ? `?${convertToQueryString(params)}` : ''}`;
  const options = {
    method,
    headers: {
      'Content-Type': contentType,
      ...additionalHeaders,
    },
    ...(
      method !== 'GET' ? { body: JSON.stringify(params) } : {}
    ),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    let message;
    try {
      message = JSON.stringify(await response.json(), null, 2);
    } catch {
      try {
        message = await response.text();
      } catch {
        message = response.statusText;
      }
    }

    throw new Error(`[Error] ${method} ${pathname} ${message}`);
  }

  return response.json();
}

export function withAlert<T>(fn: () => Promise<T>) {
  return async () => {
    try {
      return await fn();
    } catch (error: any) {
      if (typeof window != 'undefined') {
        alert(error.message ?? '오류가 발생했습니다.');
      } else {
        throw error;
      }
    }
  };
}
