'use client';

import { Button } from '@tech-frontier/ui-desktop';
import { delay } from '@toss/utils';
import { useRouter } from 'next/navigation';
import { removeTechStack } from '@/actions/removeTechStack';
import { css } from '@styled-system/css';

export function TechStackListItem({ techName }: { techName: string }) {
  const router = useRouter();

  return (
    <li className={css({
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderBottom: '1px solid',
      minHeight: '60px',
    })}>
      <p className={css({ width: '200px' })}>{techName}</p>
      <Button
        size="small"
        className={css({ width: '100px' })}
        onClick={async () => {
          const response = await removeTechStack({ techName });

          await delay(300);

          alert([response?.msg ?? response?.error, `techName: ${techName}`].join('\n'));

          router.refresh();
        }}
      >비활성화</Button>
    </li>
  );
}

export function TechStackListItemHeader() {
  return (
    <li className={css({
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderBottom: '1px solid',
      fontWeight: 'bold',
      backgroundColor: '#f6f5f4',
    })}>
      <p className={css({ width: '200px' })}>기술스택 명</p>
      <p className={css({
        width: '100px',
        textAlign: 'center',
      })}>제거하기</p>
    </li>
  );
}
