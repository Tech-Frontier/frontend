'use client';

import { Spacing } from '@tech-frontier/spacing';
import { Button } from '@tech-frontier/ui-desktop';
import { ReactNode, useEffect, useState } from 'react';
import { css } from '@styled-system/css';
import { TechStackListItem, TechStackListItemHeader } from './TechStackListItem';
import { fetchTechStackList } from './actions';

type TechStackList = Awaited<ReturnType<typeof fetchTechStackList>>['data'];

export function TechStackListClient({ children }: { children: ReactNode }) {
  const [list, setList] = useState<TechStackList>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    if (pageNo === 1) {
      return;
    }

    (async () => {
      const { data, isEnd } = await fetchTechStackList({ pageNo });
      const nextList = [...list, ...data];

      setList(nextList);
      setShowMore(!isEnd);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  return (
    <>
      <Spacing size={40}/>

      <ul className={css({
        borderTop: '1px solid',
        '& li': {
          padding: '10px',
        },
      })}>
        <TechStackListItemHeader />
        {children}
        {list.map((x, i) => <TechStackListItem key={`${i}-${encodeURIComponent(x)}`} tech={x}/>)}
      </ul>

      <Spacing size={20}/>

      {
        showMore &&
          (
            <div className={css({
              textAlign: 'center',
            })}>
              <Button onClick={() => setPageNo(pageNo + 1)} bgColor="#F6F5F4">More</Button>
            </div>
          )
      }

      <Spacing size={40}/>
    </>
  );
}
