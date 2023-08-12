import { styled } from '@/utils/styled';
import { css } from '@styled-system/css';
import { AuthCheckClient } from './AuthCheckClient';
import { AuthCheckServer } from './AuthCheckServer';
import { AdminHeader } from './components/AdminHeader';
import { Footer } from './components/Footer';
import '@tech-frontier/ui-desktop/style.css';
import './globals.css';

export const metadata = {
  title: 'Trendy Tracker 어드민',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AdminHeader className={css({
          height: '60px',
        })} />

        <Wrapper>
          {children}
        </Wrapper>

        <Footer className={css({
          height: '40px',
        })}/>
        <AuthCheckClient />
        <AuthCheckServer />
      </body>
    </html>
  );
}

const Wrapper = styled('div', {
  maxWidth: '1024px',
  margin: '0 auto',
  minHeight: 'calc(100vh - 120px)',
});
