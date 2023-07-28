import { HTMLAttributes, CSSProperties, ElementType, ReactNode } from 'react';
import { Typography, FontWeight } from './types';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  typography?: Typography;
  color?: CSSProperties['color'];
  fontWeight?: FontWeight;
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Text({
  typography = 'Normal',
  as: Component = 'p',
  color,
  fontWeight,
  ...restProps
}: TextProps) {
  return (
    <Component style={getTextStyle(typography, fontWeight)} {...restProps} />
  );
}

const getTextStyle = (typography: Typography, fontWeight?: FontWeight) => {
  switch (typography) {
    case 'Large':
      return {
        fontSize: '32px',
        fontWeight: fontWeight ?? 'bold',
      };
    case 'T1':
      return {
        fontSize: '26px',
        fontWeight: fontWeight ?? 'bold',
      };
    case 'T2':
      return {
        fontSize: '22px',
        fontWeight: fontWeight ?? 'bold',
      };
    case 'T3':
      return {
        fontSize: '20px',
        fontWeight: fontWeight ?? 'bold',
      };
    case 'Small':
      return {
        fontSize: '14px',
        fontWeight: fontWeight ?? 'normal',
      };
    case 'Normal':
    default:
      return {
        fontSize: '16px',
        fontWeight: fontWeight ?? 'normal',
      };
  }
};
