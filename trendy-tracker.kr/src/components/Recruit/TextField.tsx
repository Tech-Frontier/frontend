import { css } from '@/../styled-system/css';
import { InputHTMLAttributes } from 'react';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

// TODO: ui-desktop package에 TextField 컴포넌트 구현
export function TextField(props: TextFieldProps) {
  return (
    <input className={inputCss} {...props} />
  );
}

const inputCss = css({
  width: '250px',
  appearance: 'none',
  borderRadius: '8px',
  backgroundColor: '#262626',
  padding: '12px',
  fontSize: '15px',
  color: '#9CC5A1',
  transition: 'box-shadow 0.2s ease-in-out',

  '&:focus': {
    outline: 'none',
    boxShadow: 'inset 0px 0px 2px 1px #9CC5A1',
    transition: 'box-shadow 0.2s ease-in-out',
  },
});
