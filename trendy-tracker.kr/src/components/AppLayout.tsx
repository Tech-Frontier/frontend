import { Header } from '@tech-frontier/ui-desktop';
import { ReactNode } from 'react';
import { css } from '../../styled-system/css';

const HEADER_LOGO_SRC = 'https://cdn.trendy-tracker.kr/logo.png';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header>
        <Header.Logo src={HEADER_LOGO_SRC} />
      </Header>
      <main className={layoutCss}>
        {children}
      </main>
    </>
  );
}

const layoutCss = css({
  maxWidth: '1200px',
  margin: '0 auto',
});
