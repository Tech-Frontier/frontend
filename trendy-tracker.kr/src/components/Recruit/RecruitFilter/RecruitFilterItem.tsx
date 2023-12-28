import { Text } from '@tech-frontier/ui-desktop';
import { ChangeEvent } from 'react';
import { StackListData } from './RecruitFilter';
import { css } from '../../../../styled-system/css';

interface RecruitFilterItemProps {
  stack: StackListData;
  selectedStack: string[];
  onSelectStack: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function RecruitFilterItem({ stack, selectedStack, onSelectStack }: RecruitFilterItemProps) {
  const { name } = stack;

  return (
    <li>
      <label htmlFor={name} className={checkboxLabelCss}>
        <input
          type="checkbox"
          id={name}
          value={name}
          name={name}
          onChange={onSelectStack}
          checked={selectedStack.includes(name)}
        />
        <Text as="span">{name}</Text>
      </label>
    </li>
  );
}

export function RecruitFilterEmptyItem() {
  return (
    <li>검색 결과가 없습니다.</li>
  );
}

const checkboxLabelCss = css({
  cursor: 'pointer',
  color: '#fff',

  '& input': {
    cursor: 'pointer',
    marginRight: '5px',
  },
});
