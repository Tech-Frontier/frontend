'use client';

import { Spacing } from '@tech-frontier/spacing';
import { ReactNode, useEffect, useState } from 'react';
import { css } from '@styled-system/css';
import { RecruitItem, RecruitItemHeader } from './RecruitItem';
import { fetchRecruitList } from '../actions/fetchRecruitList';

type RecruitList = Awaited<ReturnType<typeof fetchRecruitList>>['data'];

export function RecruitListClient({ children }: { children: ReactNode }) {
  const [list, setList] = useState<RecruitList>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    if (pageNo === 1) {
      return;
    }

    (async () => {
      const { data, isEnd } = await fetchRecruitList({ pageNo });
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
        <RecruitItemHeader />
        {children}
        {list.map(x => <RecruitItem key={`${x.company}-${encodeURIComponent(x.url)}`} data={x}/>)}
      </ul>

      <Spacing size={20}/>

      {
        showMore &&
          (
            <div className={css({ textAlign: 'center' })}>
              <button onClick={() => setPageNo(pageNo + 1)}>더보기</button>
            </div>
          )
      }

      <Spacing size={40}/>
    </>
  );
}
