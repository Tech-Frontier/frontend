'use client';

import { Button } from '@tech-frontier/ui-desktop';
import { useOverlay } from '@toss/use-overlay';
import { ReactNode, useCallback, useState } from 'react';
import { css } from '@styled-system/css';
import { RecruitItemTechStackModal } from './RecruitItemTechStackModal';

const Text = ({ w, f, children }: { w: number; f: number; children: ReactNode }) => {
  return (
    <p style={{
      width: `${w}px`,
      fontSize: `${f}px`,
    }}>
      {children}
    </p>
  );
};

interface RecruitItemTechStackProps {
  id: number;
  techList: string[];
}

export function RecruitItemTechStack({ id, techList }: RecruitItemTechStackProps) {
  const [mode, setMode] = useState('view');
  const overlay = useOverlay();

  const openModal = () => {
    return new Promise<boolean>(resolve => {
      overlay.open(({ exit }) => (
        <RecruitItemTechStackModal
          id={id}
          techList={techList}
          exit={(result: boolean) => {
            resolve(result);
            exit();
          }}
        />
      ));
    });
  };

  return (
    <div className={css({
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      gap: '5',
    })}>
      {
        mode === 'view' ? (
          <>
            <Text w={150} f={12} >
              {techList?.join(', ')}
            </Text>
            <Button size="small" onClick={() => openModal()}>수정</Button>
          </>
        ) : (
          <RecruitItemTechStackForm techList={techList} onSuccess={() => setMode('view')}/>
        )
      }
    </div>
  );
}

function RecruitItemTechStackForm({ techList, onSuccess }: { techList?: string[]; onSuccess: () => void; }) {
  const [value, setValue] = useState(techList?.join(', '));

  const requestChangeTechStack = useCallback(() => {
    if (value === techList?.join(', ')) {
      alert('기술스택이 바뀌지 않았습니다.');
      return;
    }

    const message = `기술스택을 ${value?.split(',').map(x => x.trim())}으로 바꾸시겠습니까?`;

    if (confirm(message)) {
      console.log('UPDATE!');
    }

    onSuccess();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, techList]);

  return (
    <>
      <textarea style={{
        width: '150px',
        fontSize: '12px',
      }} value={value} onChange={(e) => setValue(e.target.value)} />
      <Button size="small" onClick={requestChangeTechStack}>적용</Button>
    </>
  );
}
