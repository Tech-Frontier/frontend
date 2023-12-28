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
    <li className={recruitFilterItemCss} data-tt-checked={selectedStack.includes(name)}>
      <input
        type="checkbox"
        id={name}
        value={name}
        name={name}
        onChange={onSelectStack}
        checked={selectedStack.includes(name)}
      />
      <label htmlFor={name} className={checkboxLabelCss}>
        <Text as="span">{name}</Text>
      </label>
    </li>
  );
}

export function RecruitFilterEmptyItem() {
  return (
    <li className={recruitFilterEmptyItemCss}>검색 결과가 없습니다.</li>
  );
}

const recruitFilterEmptyItemCss = css({
  color: '#fff',
});

const recruitFilterItemCss = css({
  borderRadius: '4px',

  ['&[data-tt-checked="true"]']: {
    backgroundColor: '#4e4e4ee6',
  },

  '& > label': {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '4px 4px',

    '&::before': {
      display: 'inline-block',
      content: '""',
      width: '20px',
      height: '20px',
      marginRight: '6px',
      border: '2px solid #49a078',
      borderRadius: '2px',
    },
  },

  '& input': {
    position: 'absolute',
    clip: 'rect(0 0 0 0)',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
  },

  '& input:checked + label': {
    '&::before': {
      display: 'inline-block',
      content: '""',
      width: '20px',
      height: '20px',
      marginRight: '6px',
      backgroundImage: 'url("/check.svg")',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    },
  },

  '&:hover': {
    backgroundColor: '#4e4e4ee6',
  },
});

const checkboxLabelCss = css({
  cursor: 'pointer',
  color: '#fff',

  '& input': {
    cursor: 'pointer',
    marginRight: '5px',
  },
});
