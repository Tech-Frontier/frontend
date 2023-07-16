'use client';

import { ReactNode, useEffect, useState } from 'react';
import { RecruitItem } from './RecruitItem';
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
      <ul>
        {children}
        {list.map(x => <RecruitItem key={`${x.company}-${encodeURIComponent(x.url)}`} data={x}/>)}
      </ul>

      { showMore && <button onClick={() => setPageNo(pageNo + 1)}>더보기</button> }
    </>
  );
}
