import { ReactNode } from 'react';

interface Props {
  condition: boolean;
  children: ReactNode;
}
export function If(props: Props) {
  return props.condition ? <>{props.children}</> : <></>;
}
