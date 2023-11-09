import { ReactNode } from 'react';
import Twemoji from '@/components/Twemoji';
import { css } from '../../../styled-system/css';

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
