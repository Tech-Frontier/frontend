'use client';

import { ImpressionArea } from '@toss/impression-area';
import { useState } from 'react';
import { fetchRecruitList } from '@/actions/fetchRecruitList';
import { Recruit } from '@/models/recruit';
import { RecruitItem } from './RecruitItem';

export function LoadMore() {
  const [pageNo, setPageNo] = useState(2);
  const [data, setData] = useState<Recruit[]>([]);

  return (
    <>
      {
        data.map((x, i) =>
          <RecruitItem
            key={`${i}-${x.company}-${encodeURIComponent(x.url)}`}
            data={x}
          />,
        )
      }
    <ImpressionArea onImpressionStart={async () => {
      const { data: recruitList } = await fetchRecruitList({ pageNo });
      setData([ ...data, ...recruitList ]);
      setPageNo(pageNo + 1);
    }}>
      <div>loading</div>
    </ImpressionArea>
    </>
  );
}
