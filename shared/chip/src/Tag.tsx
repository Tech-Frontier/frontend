import { CSSProperties } from 'react';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'border' | 'default';
  bgColor?: CSSProperties['backgroundColor'];
  textColor?: CSSProperties['color'];

  /** @description variant가 border일 때만 적용됩니다. */
  borderColor?: CSSProperties['borderColor'];
}

// NOTE: leftAddon, rightAddon 추후 지원... 

export function Tag(
  { 
    bgColor, 
    textColor, 
    size = 'medium', 
    variant = 'default', 
    borderColor,
    ...restProps 
  }: TagProps) {
  return ( 
    <span 
      style={{ 
        ...getTagBaseStyle,
        ...getTagSizeStyle(size),
        ...getTagVariantStyle(variant, borderColor),
        ...getTagColorStyle(bgColor, textColor), 
      }}
      {...restProps}
    />
  );
}

const getTagBaseStyle =  {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '700',
  cursor: 'pointer',
};

const getTagSizeStyle = (size: TagProps['size']) => {
  switch (size) {
    case 'small':
      return {
        fontSize: '13px',
        padding: '1px 8px',
        borderRadius: '18px',

      };
    case 'large':
      return {
        fontSize: '15px',
        padding: '4px 12px',
        borderRadius: '16px',
      };
    default:
    case 'medium':
      return {
        fontSize: '14px',
        padding: '2px 10px',
        borderRadius: '20px',
      };
  }
};

const getTagVariantStyle = (variant: TagProps['variant'], borderColor?: TagProps['borderColor']) => {
  switch (variant) {
    case 'border':
      return {
        border: `1px solid ${borderColor ?? '#9CC5A1'}`,
      };
    default:
    case 'default':
      return {
        border: 'none',
      };
  }
};

const getTagColorStyle = (bgColor: TagProps['bgColor'], textColor: TagProps['textColor']) => {
  return {
    backgroundColor: bgColor ?? '#9CC5A1',
    color: textColor ?? '#DCE1DE',
  };
};
