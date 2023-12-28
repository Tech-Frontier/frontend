import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import { ReactNode } from 'react';
import { css } from '../../../../styled-system/css';

export function ScrollArea({ width = 200, height = 225, children }: { width?: number, height?: number, children: ReactNode }) {
  return (
    <RadixScrollArea.Root className={rootCss({ width, height })}>
      <RadixScrollArea.Viewport className={viewportCss({ height })}>{children}</RadixScrollArea.Viewport>
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

const rootCss = ({ width, height } : { width:number; height:number }) => css({
  width: width,
  maxHeight: height,
});

const viewportCss = ({ height } : { height:number }) => css({
  width: '100%',
  maxHeight: height,

  '& > div[style]': {
    display: 'block !important',
    maxHeight: height,
  },
});
