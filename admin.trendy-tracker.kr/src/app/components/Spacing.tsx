import { css } from '@styled-system/css';

export function Spacing({ h: height }: { h: number }) {
  return (
    <div
      className={css({
        width: '100%',
        height: `${height}px`,
      })}
    />
  );
}
