import { ButtonHTMLAttributes, CSSProperties, Ref, forwardRef } from 'react';

// TODO: disable의 경우도 챙겨야 함

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  display?: 'inline' | 'block';
  size?: 'small' | 'medium' | 'large';
  bgColor?: CSSProperties['backgroundColor'];
  textColor?: CSSProperties['color'];
};

export const Button = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { display = 'inline', size = 'medium', bgColor, textColor, children, ...restProps } = props;

  return (
   <button
    ref={ref}
    style={{
      ...getButtonBaseStyle,
      ...getDisplayStyle(display),
      ...getSizeStyle(size),
      ...getButtonColorStyle(bgColor, textColor),
    }}
    {...restProps}
  >
    {children}
   </button>
  );
});

Button.displayName = 'Button';

const getButtonBaseStyle = {
  margin: 0,
  fontWeight: 600,
  verticalAlign: 'middle',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '10px',
};

const getDisplayStyle = (display: ButtonProps['display']) => {
  switch (display) {
    case 'block':
      return {
        display: 'block',
        width: '100%',
      };
    default:
    case 'inline':
      return {
        display: 'inline-block',
      };
  }
};

const getSizeStyle = (size: ButtonProps['size']) => {
  switch (size) {
    case 'small':
      return {
        padding: '7px 12px',
        borderRadius: '6px',
        fontSize: '14px',
      };
    case 'large':
      return {
        padding: '11px 22px',
        borderRadius: '8px',
        fontSize: '16px',
      };
    default:
    case 'medium':
      return {
        padding: '9px 16px',
        borderRadius: '7px',
        fontSize: '15px',
      };
  }
};

const getButtonColorStyle = (bgColor: ButtonProps['bgColor'], textColor: ButtonProps['textColor']) => {
  return {
    backgroundColor: bgColor ?? '#9CC5A1',
    color: textColor ?? '#1F2421',
  };
};
