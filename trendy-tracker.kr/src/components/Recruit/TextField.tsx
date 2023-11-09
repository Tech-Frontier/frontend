import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useControllableState } from '@/utils/useControllableState';
import { css, cx } from '../../../styled-system/css';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  register?: UseFormRegisterReturn;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

// TODO: ui-desktop package에 TextField 컴포넌트 구현
export function TextField(props: TextFieldProps) {
  const {
    error = false,
    value: valueFromProps,
    defaultValue,
    onValueChange,
    className: classNameFromProps,
    register,
    ...restProps
  } = props;

  const [value, setValue] = useControllableState({
    prop: valueFromProps,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  if (register) {
    return <input className={cx(inputCss, error && inputErrorCss, classNameFromProps)} {...register} {...props} />;
  }

  return (
    <input
      className={cx(inputCss, error && inputErrorCss, classNameFromProps)}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...restProps}
    />
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
