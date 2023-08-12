'use server';

import { headers } from 'next/headers';
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
    const headersList = headers();
    const cookie = headersList.get('Cookie');
    const { data } = await requestTTAPI<{ data: TechStack['name'][] }>({
      pathname: '/api/tech/stack/list',
      additionalHeaders: { ...(cookie != null ? { cookie } : {}) },
    });

    return {
      data: data.slice( (pageNo - 1) * pageSize, pageNo * pageSize),
      isEnd: pageNo * pageSize >= data.length,
    };
  } catch (error:any) {
    console.log(error.message);
    return {
      data: [],
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
