'use client';

import { ImpressionArea } from '@toss/impression-area';
import { useState } from 'react';
import { fetchTechStackList } from '@/actions/fetchTechStackList';
import { TechStack } from '@/models/techStack';
import { TechStackListItem } from './TechStackListItem';

export function LoadMore() {
  const [pageNo, setPageNo] = useState(2);
  const [data, setData] = useState<TechStack[]>([]);

  return (
    <>
      {
        data.map((x, i) =>
          <TechStackListItem
            key={`${i}-${encodeURIComponent(x.name)}`}
            tech={x.name}
          />,
        )
      }
      <ImpressionArea onImpressionStart={async () => {
        const { data: techStackList } = await fetchTechStackList({ pageNo });
        setData([ ...data, ...techStackList ]);
        setPageNo(pageNo + 1);
      }}>
        <div>loading</div>
      </ImpressionArea>
    </>
  );
}
