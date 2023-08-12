'use server';

import { requestTTAPI } from '@/utils/request';

export interface TechStack {
  name: string;
}

interface FetchTechListOptions {
  pageNo?: number;
  pageSize?: number;
}

export async function fetchTechStackList({ pageNo = 1, pageSize = 10 }: FetchTechListOptions) {
  try {
    const { data } = await requestTTAPI<{ data: TechStack['name'][] }>({ pathname: '/api/tech/stack/list' });

    return {
      data: data.slice( (pageNo - 1) * pageSize, pageNo * pageSize),
      isEnd: pageNo * pageSize >= data.length,
    };
  } catch {
    return {
      data: ['가짜 데이터', 'Kotlin', 'JavaScript'],
      isEnd: false,
    };
  }
}

export async function createTachStack({ techName }: { techName: string }) {
  await requestTTAPI({
    pathname: '/api/tech/stack/create',
    method: 'POST',
    params: {
      tech: techName,
    },
  });
}
