'use client';

import { Button, Text, Tag } from '@tech-frontier/ui-desktop';
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

function parseQuery(query) {
  return new URLSearchParams(query).getAll('tech');
}

export function RecruitFilter({ tech = [] }: { tech?: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [stackList, setStackList] = useState<StackListData[]>([]);
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

  const applyFilter = () => {
    const query = selectedStack.map((stack) => `tech=${stack}`).join('&');
    router.push(`${pathname}?${query}`);
  };

  useEffect(() => {
    fetchStackList().then((x) => setStackList(x.data));
  }, []);

  useEffect(() => {
    if (tech.length === 0) {
      return;
    }

    setSelectedStack(tech);
  }, [tech]);

  return (
    <div>
      <div className={selectedStackTagCss}>
        {selectedStack.map((stack, index) => (
          <Tag bgColor="#6e6e6e" size="small" key={index}>
            {stack}
          </Tag>
        ))}
      </div>
      <div className={filterContainerCss}>
        <div className={stackMultiSelectCss}>
          <MultiSelect
            value={selectedStack}
            onValueChange={setSelectedStack}
            open={open기술스택Select}
            onOpenChange={setOpen기술스택Select}
          >
            <MultiSelect.Trigger>
              <Button bgColor="#DEC9E9">
                <span className={buttonTitleCss}>
                  <Twemoji emoji="⚙️" width={24} height={24} />
                  <span>기술 스택으로 필터링하기</span>
                </span>
              </Button>
            </MultiSelect.Trigger>
            <MultiSelect.Content
              align="end"
              className={stackListGroupCss}
              onInteractOutside={() => {
                const prevSelectValue = parseQuery(window.location.search);
                if (prevSelectValue.toString() === selectedStack.toString()) {
                  return;
                }
                applyFilter();
              }}
            >
              <TextField
                value={searchValue}
                onValueChange={setSearchValue}
                placeholder="기술 스택을 검색해주세요"
                className={filterSearchFieldCss}
              />
              <ScrollArea>
                <ul>
                  {stackList
                    .filter((stack) => stack.name.toUpperCase().includes(searchValue.toUpperCase()))
                    .map((stack, index) => (
                      <li key={index}>
                        <label htmlFor={stack.name} className={checkboxLabelCss}>
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
              <div className={stackListGroupButtonCss}>
                <Button size="small" bgColor="#d6d6d6" className={resetButtonCss} onClick={() => setSelectedStack([])}>
                  전체 선택 해제
                </Button>
                <Button size="small" bgColor="#d6d6d6" onClick={() => setOpen기술스택Select(false)}>
                  닫기
                </Button>
                <Button size="small" onClick={applyFilter}>
                  적용
                </Button>
              </div>
            </MultiSelect.Content>
          </MultiSelect>
        </div>
      </div>
    </div>
  );
}

const resetButtonCss = css({
  marginRight: 'auto',
});

const buttonTitleCss = css({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: 'auto 1fr',
  gap: '10px',
});

const stackListGroupCss = css({
  background: 'rgba(58, 58, 58, 0.9)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(9.3px)',
  padding: '20px',
  borderRadius: '10px',
});

const stackListGroupButtonCss = css({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  paddingTop: '10px',
});

const checkboxLabelCss = css({
  cursor: 'pointer',
  color: '#fff',

  '& input': {
    cursor: 'pointer',
    marginRight: '5px',
  },
});

const filterContainerCss = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

const filterSearchFieldCss = css({
  marginBottom: '10px',
});

const stackMultiSelectCss = css({
  marginBottom: '10px',
});

const selectedStackTagCss = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  justifyContent: 'flex-end',
  minHeight: '30px',
  marginBottom: '10px',
});
