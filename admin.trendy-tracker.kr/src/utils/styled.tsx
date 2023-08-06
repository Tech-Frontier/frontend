import { createElement } from 'react';
import type { SystemStyleObject } from '../../styled-system/types';
import { cx, css } from '../../styled-system/css';

type Element = Parameters<typeof createElement>[0];

export function styled(el: Element, styles: SystemStyleObject) {
  return function StyledComponent(props: any) {
    return createElement(el, {
      ...props,
      className: cx(props.className, css(styles)),
    });
  };
}
