export interface RequestContext {
  baseURL?: string;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'DELETE';
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
    body: method !== 'GET' ? JSON.stringify(params) : undefined,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    try {
      console.log(`error: ${await response.text()}`);
    } catch {
      //
    }

    console.log({
      url,
      options,
    });

    throw new Error(`[Error] ${method} ${pathname} (${response.statusText})`);
  }

  return response.json();
}
