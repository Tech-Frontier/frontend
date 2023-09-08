'use server';

import { Recruit } from '@/models/recruit';
import { requestTTAPI } from '@/utils/request';

interface FetchRecruitListOptions {
  pageNo?: number;
  pageSize?: number;
}

export async function fetchRecruitList({ pageNo = 1, pageSize = 10 }: FetchRecruitListOptions = {}) {
  const { data } = await requestTTAPI<{ data: { recruitList:Recruit[] } }>({
    pathname: '/api/recruit/list',
    params: {
      pageNo,
      pageSize,
    },
  });

  return {
    // FIXME: 빈배열로 내려오도록 고쳐지면 ? 뺴기 (https://techfrontierhq.slack.com/archives/C05BRRQQBM4/p1694172793044849)
    data: data?.recruitList ?? [],
    isEnd: pageNo * pageSize >= data?.recruitList.length,
  };
}
