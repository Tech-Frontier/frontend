import { BASE_URL } from './constants';

export const fetchStackList = async () => {
  const response = await fetch(`${BASE_URL}/api/tech/stack/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};
