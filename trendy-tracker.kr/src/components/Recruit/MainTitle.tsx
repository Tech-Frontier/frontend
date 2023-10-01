import { ReactNode } from 'react';
import { css } from '@/../styled-system/css';
import Twemoji from '@/components/Twemoji';

export function MainTitle({ emoji, children }: { emoji: string; children: ReactNode }) {
  return (
    <div className={titleCss}>
      <Twemoji emoji={emoji} width={48} height={48} />
      {children}
    </div>
  );
}

const titleCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
