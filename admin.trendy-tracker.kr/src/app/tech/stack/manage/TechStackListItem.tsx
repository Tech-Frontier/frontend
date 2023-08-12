'use client';

import { Button } from '@tech-frontier/ui-desktop';
import { css } from '@styled-system/css';

export function TechStackListItem({ tech }: { tech: string }) {
  return (
    <li className={css({
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderBottom: '1px solid',
      minHeight: '60px',
    })}>
      <p className={css({ width: '200px' })}>{tech}</p>
      <Button
        size="small"
        className={css({ width: '100px' })}
        onClick={() => {
          confirm('기능 추가 예정입니다.');
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
