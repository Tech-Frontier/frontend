'use server';

import { BASE_URL } from './constants';

interface FetchRecruitListOptions {
  pageNo?: number;
  pageSize?: number;
  tech?: string[];
}

export const fetchRecruitList = async ({ pageNo = 1, pageSize = 10, tech = [] }: FetchRecruitListOptions = {}) => {
  const encodedTech = tech.map((x: string) => encodeURIComponent(x));

  const techQuerystring = tech.length > 0 ? `&tech=${encodedTech.join('&tech=')}` : '';

  const querystring = `pageNo=${pageNo}&pageSize=${pageSize}${techQuerystring}`;

  const response = await fetch(`${BASE_URL}/api/recruit/list?${querystring}`, {
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
