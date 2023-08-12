'use server';

import { requestTTAPI } from '@/utils/request';
import { Recruit } from '../models/recruit';

interface FetchRecruitListOptions {
  pageNo?: number;
  pageSize?: number;
}

export async function fetchRecruitList({ pageNo = 1, pageSize = 10 }: FetchRecruitListOptions) {
  try {
    const { data } = await requestTTAPI<{ data: Recruit[] }>({ pathname: '/api/recruit/list' });

    return {
      data: data.slice( (pageNo - 1) * pageSize, pageNo * pageSize),
      isEnd: pageNo * pageSize >= data.length,
    };
  } catch (error: any) {
    return {
      data: [
        {
          id: '1',
          company: '가짜 데이터',
          occupation: '직군',
          url: 'https://admin.trendy-tracker.kr',
          techList: ['API 호출이 실패하여 가데이터'],
        },
      ],
      isEnd: false,
    } as unknown as { data: Recruit[] ; isEnd: boolean };
  }
}
