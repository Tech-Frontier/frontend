'use client';

import { Button, Text } from '@tech-frontier/ui-desktop';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { fetchStackList } from '@/utils/api/stack';
import { TextField } from './TextField';
import { css } from '../../../styled-system/css';
import { MultiSelect } from '../Primitives/MultiSelect/MultiSelect';
import { ScrollArea } from '../Primitives/ScrollArea/ScrollArea';
import Twemoji from '../Twemoji';

interface StackListData {
  name: string;
  language: string;
}

export function RecruitFilter({ tech = [] }: { tech?: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [stackList, setStackList] = useState<StackListData[]>([]);
  const [open조건, setOpen조건] = useState<boolean>(false);
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const [open기술스택Select, setOpen기술스택Select] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

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

  // TODO: 바깥 눌러도 선택되게 하기
  // TODO: 선택한 스택 Tag 형태로 보여주기

  return (
    <div>
      <Button bgColor="#DCE1DE" size="small" className={buttonCss} onClick={() => setOpen조건(!open조건)}>
        <span className={buttonTitle}>
          <Twemoji emoji="⚙️" width={24} height={24} />
          <span>검색 조건 추가하기</span>
        </span>
      </Button>
      {open조건 && (
        <div>
          <Text color="#DEC9E9">기술 스택</Text>
          <MultiSelect
            value={selectedStack}
            onValueChange={setSelectedStack}
            open={open기술스택Select}
            onOpenChange={setOpen기술스택Select}
          >
            <MultiSelect.Trigger>
              <TextField value={searchValue} onValueChange={setSearchValue} placeholder="기술 스택을 선택해주세요" />
            </MultiSelect.Trigger>
            <MultiSelect.Content className={stackListGroup}>
              <ScrollArea>
                <ul>
                  {stackList
                    .filter((stack) => stack.name.toUpperCase().includes(searchValue.toUpperCase()))
                    .map((stack, index) => (
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
                          <Text as="span">{stack.name}</Text>
                        </label>
                      </li>
                    ))}
                </ul>
              </ScrollArea>
              <div className={stackListGroupButton}>
                <Button size="small" bgColor="#d6d6d6" className={resetButtonCss} onClick={() => setSelectedStack([])}>
                  초기화
                </Button>
                <Button size="small" bgColor="#d6d6d6" onClick={() => setOpen기술스택Select(false)}>
                  취소
                </Button>
                <Button size="small" onClick={applyFilter}>
                  적용
                </Button>
              </div>
            </MultiSelect.Content>
          </MultiSelect>
        </div>
      )}
    </div>
  );
}

const buttonCss = css({
  display: 'block',
  marginLeft: 'auto',
});

const resetButtonCss = css({
  marginRight: 'auto',
});

const buttonTitle = css({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: 'auto 1fr',
  gap: '10px',
});

const stackListGroup = css({
  backgroundColor: '#e1f0e3',
  padding: '20px',
  borderRadius: '10px',
});

const stackListGroupButton = css({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  paddingTop: '10px',
});

const checkboxLabel = css({
  cursor: 'pointer',

  '& input': {
    cursor: 'pointer',
    marginRight: '5px',
  },
});
