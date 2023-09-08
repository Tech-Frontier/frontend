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
    const { data } = await requestTTAPI<{ data: TechStack[] }>({
      pathname: '/api/tech/stack/list',
    });

    return {
      data: data.slice( (pageNo - 1) * pageSize, pageNo * pageSize),
      isEnd: pageNo * pageSize >= data.length,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      data: [],
      isEnd: false,
    };
  }
}
