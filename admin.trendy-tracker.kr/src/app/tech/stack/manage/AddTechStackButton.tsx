'use client';

import { Button } from '@tech-frontier/ui-desktop';
import { css } from '@styled-system/css';
// import { createTachStack } from './actions';

export function AddTechStackButton() {
  return (
    <div className={css({ textAlign: 'right' })}>
      <Button
        size="small"
        onClick={async () => {
          const techName = prompt('추가할 기술 스택을 작성해주세요.');

          if (techName == null || techName === '') {
            return alert('올바른 값을 입력해주세요.');
          }

          try {
            alert('기능 추가 예정입니다.');
            // await createTachStack({ techName });
            return;
          } catch (error: any) {
            console.log(error);
            alert(error.message);
          }
        }}
      >
        추가하기
      </Button>
    </div>
  );
}
