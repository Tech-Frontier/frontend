import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { css, cx } from '../../../styled-system/css';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  register?: UseFormRegisterReturn;
}

// TODO: ui-desktop package에 TextField 컴포넌트 구현
export function TextField(props: TextFieldProps) {
  const { error = false, className: classNameFromProp, register } = props;

  return (
    <input className={cx(inputCss, error ? inputErrorCss : undefined, classNameFromProp)} {...register} {...props} />
  );
}

const inputCss = css({
  width: '250px',
  appearance: 'none',
  borderRadius: '8px',
  backgroundColor: '#262626',
  padding: '12px',
  fontSize: '15px',
  color: '#DCE1DE',
  transition: 'box-shadow 0.2s ease-in-out',

  '&:focus': {
    outline: 'none',
    boxShadow: 'inset 0px 0px 2px 1px #9CC5A1',
    transition: 'box-shadow 0.2s ease-in-out',
  },
});

const inputErrorCss = css({
  boxShadow: 'inset 0px 0px 2px 1px #FF0000',
  transition: 'box-shadow 0.2s ease-in-out',
  animation: 'wiggle 0.2s ease-in-out',
});
