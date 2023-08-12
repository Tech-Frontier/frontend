'use server';

import { headers } from 'next/headers';
import { requestTTAPI } from '@/utils/request';
import { Recruit } from '../models/recruit';

interface FetchRecruitListOptions {
  pageNo?: number;
  pageSize?: number;
}

export async function fetchRecruitList({ pageNo = 1, pageSize = 10 }: FetchRecruitListOptions) {
  try {
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
  } catch (error: any) {
    console.log(error.message);
    return {
      data: [],
      isEnd: true,
    };
  }
}
