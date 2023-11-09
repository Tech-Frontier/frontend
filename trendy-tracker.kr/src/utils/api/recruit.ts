'use server';

import { BASE_URL } from './constants';

interface FetchRecruitListOptions {
  pageNo?: number;
  pageSize?: number;
  tech?: string[];
}

export const fetchRecruitList = async ({ pageNo = 1, pageSize = 10, tech = [] }: FetchRecruitListOptions = {}) => {
  const techQuerystring = tech.length > 0 ? `&tech=${tech.join('&tech=')}` : '';
  const querystring = `pageNo=${pageNo}&pageSize=${pageSize}${techQuerystring}`;
  const response = await fetch(`${BASE_URL}/api/recruit/list?${querystring}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    // TODO: 응답이 NOT_FOUND 가 아닌 빈 배열로 오면 지우기
    try {
      const { status } = await response.json();
      if (status === 'NOT_FOUND') {
        return {
          data: {
            recruitList: [],
            totalCount: 0,
          },
        };
      }
    } catch {
      throw new Error(await response.text());
    }
  }

  return response.json();
};
