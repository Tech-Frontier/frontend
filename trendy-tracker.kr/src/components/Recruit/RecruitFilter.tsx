'use client';

import { css } from '@/../styled-system/css';
import { Button, Text } from '@tech-frontier/ui-desktop';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { fetchStackList } from '@/utils/api/stack';
import Twemoji from '../Twemoji';

interface StackListData {
  name: string;
  language: string;
}

export function RecruitFilter({ tech = [] } : { tech?: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [stackList, setStackList] = useState<StackListData[]>([]);
  const [open조건, setOpen조건] = useState<boolean>(false);
  const [selectedStack, setSelectedStack] = useState<string[]>([]);

  const onSelectStack = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedStack([...selectedStack, event.target.value]);
    } else {
      setSelectedStack(selectedStack.filter((stack) => stack !== event.target.value));
    }
  };

  useEffect(() => {
    if (open조건 === false) {
      return;
    }

    fetchStackList().then((x) => setStackList(x.data));
  }, [open조건]);

  useEffect(() => {
    if (tech.length === 0) {
      return;
    }

    setSelectedStack(tech);
  }, [tech]);

  const applyFilter = () => {
    setOpen조건(false);
    const query = selectedStack.map((stack) => `tech=${stack}`).join('&');
    router.push(`${pathname}?${query}`);
  };

  return (
    <div>
      <Button bgColor="#DCE1DE" size="small" className={buttonCss} onClick={() => setOpen조건(!open조건)}>
        <span className={buttonTitle}>
          <Twemoji emoji='⚙️' width={24} height={24}/>
          <span>검색 조건 추가하기</span>
        </span>
      </Button>
      {open조건 && (
        <div>
         <Text color="#DEC9E9">기술 스택</Text>
          <ul className={stackListGroup}>
            {stackList.map((stack, index) => (
              <li key={index}>
                <label htmlFor={stack.name} className={checkboxLabel}>
                  <input
                    type="checkbox"
                    id={stack.name}
                    value={stack.name}
                    name={stack.name}
                    onChange={onSelectStack}
                    checked={selectedStack.includes(stack.name)}
                  />
                  <Text as="span" color="#DCE1DE">{stack.name}</Text>
                </label>
              </li>
            ))}
          </ul>

          <Button size="small" bgColor="#DEC9E9" className={buttonCss} onClick={applyFilter}>
            적용하기
          </Button>
        </div>
      )}
    </div>
  );
}

const buttonCss = css({
  display: 'block',
  marginLeft: 'auto',
});

const buttonTitle = css({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: 'auto 1fr',
  gap: '10px',
});

const stackListGroup = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
});

const checkboxLabel = css({
  cursor: 'pointer',

  '& input': {
    cursor: 'pointer',
    marginRight: '5px',
  },
});
