'use server';

import { headers } from 'next/headers';
import { Recruit } from '@/models/recruit';
import { requestTTAPI } from '@/utils/request';

interface FetchRecruitListOptions {
  pageNo?: number;
  pageSize?: number;
}

export async function fetchRecruitList({ pageNo = 1, pageSize = 10 }: FetchRecruitListOptions = {}) {
  const headersList = headers();
  const cookie = headersList.get('Cookie');
  const { data } = await requestTTAPI<{ data: { recruitList:Recruit[] } }>({
    pathname: '/api/recruit/list',
    additionalHeaders: { ...(cookie != null ? { cookie } : {}) },
  });

  return {
    data: data.recruitList.slice( (pageNo - 1) * pageSize, pageNo * pageSize),
    isEnd: pageNo * pageSize >= data.recruitList.length,
  };
}
