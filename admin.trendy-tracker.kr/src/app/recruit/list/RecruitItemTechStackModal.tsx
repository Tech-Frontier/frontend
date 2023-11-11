import { ModalContainer } from '@/app/components/Modal/ModalContainer';
import { Button } from '@tech-frontier/ui-desktop';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { css } from '@styled-system/css';
import { updateRecruitTechList } from '../../../actions/updateRecruitTechList';

interface RecruitItemTechStackModalProps {
  id: number;
  techList: string[];
  exit: (status: boolean) => void;
}

export function RecruitItemTechStackModal({ id, techList: defaultTechList, exit }: RecruitItemTechStackModalProps) {
  const [techList, setTechList] = useState<string[]>(defaultTechList);
  const router = useRouter();

  return (
    <ModalContainer
      onClose={() => exit(false)}
      title='기술 스택 수정'
    >
      {techList.map((tech, index) => (
        <div className={css({ display: 'flex',
          alignItems: 'center' })} key={index} >
          <input
            className={css({ border: '1px solid' })}
            value={tech}
            onChange={(e) => {
              const copiedTechList = [...techList];
              copiedTechList[techList.findIndex(x => x === tech)] = e.target.value;
              setTechList(copiedTechList);
            }}
          />
          <Button
            className={css({
              fontSize: '12px',
              marginLeft: '4px',
              padding: '0px 6px',
              height: '20px',
              borderRadius: '4px',
            })}
            onClick={() => {
              setTechList(techList.filter((_, i) => i !== index));
            }}
          >
            -
          </Button>
        </div>
      ))}
      <div
        className={css({
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'flex-end',
        })}
      >
        <Button
          className={css({
            fontSize: '12px',
            marginLeft: '4px',
            padding: '0px 6px',
            height: '20px',
            borderRadius: '4px',
          })}
          onClick={() => {
            setTechList(x => [...x, '']);
          }}
        >
          새로 추가하기
        </Button>

        <Button
          className={css({
            fontSize: '12px',
            marginLeft: '4px',
            padding: '0px 6px',
            height: '20px',
            borderRadius: '4px',
          })}
          onClick={async () => {
            if (techList.some(x => x === '')) {
              alert('빈 값이 존재합니다.');
              return;
            }

            if (defaultTechList.length === techList.length) {
              for (let i = 0; i < defaultTechList.length; i++) {
                if (defaultTechList[i] !== techList[i]) {
                  break;
                }

                if (i === defaultTechList.length - 1) {
                  alert('변경된 값이 없습니다.');
                  return;
                }
              }
            }

            console.log(techList);
            await updateRecruitTechList({ id, techList });
            router.refresh();
          }}
        >
          제출
        </Button>
      </div>

    </ModalContainer>
  );
}
