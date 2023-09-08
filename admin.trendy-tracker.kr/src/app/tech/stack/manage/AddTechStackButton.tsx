'use client';

import { Button } from '@tech-frontier/ui-desktop';
import { delay } from '@toss/utils';
import { useRouter } from 'next/navigation';
import { createTechStack } from '@/actions/createTechStack';

export function AddTechStackButton() {
  const router = useRouter();
  return (
    <Button
      size="small"
      onClick={async () => {
        const techName = prompt('추가할 기술 스택을 작성해주세요.');

        if (techName == null || techName === '') {
          return alert('올바른 값을 입력해주세요.');
        }

        try {
          const response = await createTechStack({ techName });

          await delay(300);

          alert([response?.msg, `techName: ${techName}`].join('\n'));

          router.refresh();
        } catch (error: any) {
          console.log(error);
          alert(error.message);
        }
      }}
    >
      추가하기
    </Button>
  );
}
