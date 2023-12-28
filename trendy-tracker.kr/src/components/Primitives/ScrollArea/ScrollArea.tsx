import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import { CSSProperties, ReactNode } from 'react';
import { css } from '../../../../styled-system/css';

export function ScrollArea({ children, style }:{ children: ReactNode, style?: CSSProperties }) {
  return (
    <RadixScrollArea.Root className={rootCss} style={style} >
      <RadixScrollArea.Viewport className={viewportCss}>{children}</RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
        <RadixScrollArea.Thumb className="ScrollAreaThumb" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
        <RadixScrollArea.Thumb className="ScrollAreaThumb" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Corner className="ScrollAreaCorner" />
    </RadixScrollArea.Root>
  );
}

const rootCss = css({
  width: '220px',
  maxHeight: '225px',
});

const viewportCss = css({
  width: '100%',
  maxHeight: '225px',

  '& > div[style]': {
    display: 'block !important',
    maxHeight: '225px',
  },
});
