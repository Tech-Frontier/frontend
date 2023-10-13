'use server';

import { BASE_URL } from './constant';

export const fetchRecruitList = async ({ pageNo = 1, pageSize = 10 }: { pageNo?: number; pageSize?: number } = {}) => {
  const response = await fetch(`${BASE_URL}/api/recruit/list?pageNo=${pageNo}&pageSize=${pageSize}`, {
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
