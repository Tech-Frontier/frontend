'use client';

import { ImpressionArea } from '@toss/impression-area';
import { useState, useCallback } from 'react';
import { Spinner } from '@/components/Spinner';
import { fetchRecruitList } from '@/utils/api/recruit';
import type { RecruitItemData } from '@/app/page';
import { RecruitItem } from '../RecruitItem';

const PAGE_SIZE = 10;

export function LoadMore() {
  const [pageNo, setPageNo] = useState(2);
  const [totalCount, setTotalCount] = useState(0);
  const [recruitList, setRecruitList] = useState<RecruitItemData[]>([]);
  const hasMore = (PAGE_SIZE + recruitList.length) < totalCount;

  const onImpressionStart = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { data: { recruitList: more, totalCount } } = await fetchRecruitList({
      pageNo,
      pageSize: PAGE_SIZE,
    });

    setRecruitList([ ...recruitList, ...more ]);
    setPageNo(pageNo + 1);
    setTotalCount(totalCount);
  }, [pageNo, recruitList]);

  return (
    <>
      {recruitList.map((recruit: RecruitItemData) => (
        <RecruitItem recruit={recruit} key={recruit.id} />
      ))}

      <ImpressionArea onImpressionStart={onImpressionStart}>
        { hasMore ? <Spinner /> : null }
      </ImpressionArea>
    </>
  );
}
