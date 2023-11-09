'use client';

import { ImpressionArea } from '@toss/impression-area';
import { useState, useCallback } from 'react';
import { Spinner } from '@/components/Spinner';
import { fetchRecruitList } from '@/utils/api/recruit';
import type { RecruitItemData } from '@/types/Recruit/RecruitItemData';
import { RecruitItem } from '../RecruitItem';

const PAGE_SIZE = 10;

export function LoadMore({ tech }: { tech: string[] }) {
  const [pageNo, setPageNo] = useState(2);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [recruitList, setRecruitList] = useState<RecruitItemData[]>([]);
  const hasMore = totalCount == null || PAGE_SIZE + recruitList.length < totalCount;

  const onImpressionStart = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const {
      data: { recruitList: more, totalCount: dataTotalCount },
    } = await fetchRecruitList({
      pageNo,
      pageSize: PAGE_SIZE,
      tech,
    });

    setRecruitList([...recruitList, ...more]);
    setPageNo(pageNo + 1);
    setTotalCount(dataTotalCount);
  }, [pageNo, recruitList, tech]);

  return (
    <>
      {recruitList.map((recruit: RecruitItemData) => (
        <RecruitItem recruit={recruit} key={recruit.id} />
      ))}

      <ImpressionArea onImpressionStart={onImpressionStart}>{hasMore ? <Spinner /> : null}</ImpressionArea>
    </>
  );
}
