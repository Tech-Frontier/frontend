'use server';

import { requestTTAPI } from '@/utils/request';
import { Recruit } from '../models/recruit';

interface FetchRecruitListOptions {
  pageNo?: number;
  pageSize?: number;
}

export async function fetchRecruitList({ pageNo = 1, pageSize = 10 }: FetchRecruitListOptions) {
  const { data } = await requestTTAPI<{ data: Recruit[] }>({ pathname: '/api/recruit/list' });

  return {
    data: data.slice( (pageNo - 1) * pageSize, pageNo * pageSize),
    isEnd: pageNo * pageSize >= data.length,
  };
}
