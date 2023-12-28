'use client';

import { fetchStackList } from '@/utils/api/stack';
import { Tag } from '@tech-frontier/ui-desktop';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { RecruitFilterItem, RecruitFilterEmptyItem } from './RecruitFilterItem';
import { css } from '../../../../styled-system/css';
import { MultiSelect } from '../../Primitives/MultiSelect/MultiSelect';
import { ScrollArea } from '../../Primitives/ScrollArea/ScrollArea';
import { TextField } from '../TextField';

export interface StackListData {
  name: string;
  language: string;
}
export function RecruitFilter({ tech = [] }: { tech?: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [stackList, setStackList] = useState<StackListData[]>([]);
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const [open기술스택Select, setOpen기술스택Select] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const applyFilter = (newSelectedStack: string[]) => {
    const query = newSelectedStack
      .map((stack) => `tech=${encodeURIComponent(stack)}`)
      .join('&');
    router.push(`${pathname}?${query}`, { scroll: false });
  };

  const onSelectStack = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedStack((prevSelectedStack) => {
        const newSelectedStack = [...prevSelectedStack, event.target.value];
        applyFilter(newSelectedStack);
        return newSelectedStack;
      });
    } else {
      setSelectedStack((prevSelectedStack) => {
        const newSelectedStack = prevSelectedStack.filter(
          (stack) => stack !== event.target.value,
        );
        applyFilter(newSelectedStack);
        return newSelectedStack;
      });
    }
  };

  const filteredStackList = stackList.filter((stack) =>
    stack.name.toUpperCase().includes(searchValue.toUpperCase()),
  );

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
            open={open기술스택Select && searchValue.length > 0}
            onOpenChange={setOpen기술스택Select}
          >
            <MultiSelect.Trigger>
              <TextField
                value={searchValue}
                onValueChange={setSearchValue}
                placeholder="기술 스택을 검색해주세요"
                className={filterSearchFieldCss}
              />
            </MultiSelect.Trigger>
            <MultiSelect.Content align="end" className={stackListGroupCss}>
              <ScrollArea>
                <ul>
                  {filteredStackList.length > 0 ? (
                    filteredStackList.map((stack, index) => (
                      <RecruitFilterItem
                        stack={stack}
                        key={index}
                        selectedStack={selectedStack}
                        onSelectStack={onSelectStack}
                      />
                    ))
                  ) : (
                    <RecruitFilterEmptyItem />
                  )}
                </ul>
              </ScrollArea>
            </MultiSelect.Content>
          </MultiSelect>
        </div>
      </div>
    </div>
  );
}

const stackListGroupCss = css({
  background: 'rgba(58, 58, 58, 0.9)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(9.3px)',
  padding: '20px',
  borderRadius: '10px',
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
