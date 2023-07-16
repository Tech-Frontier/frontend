import { h, styled } from '@/utils/styled';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Spacing } from './components/Spacing';
import './globals.css';

export const metadata = {
  title: 'Trendy Tracker 어드민',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header className={h(40)}/>

        <Spacing h={40} />

        <Wrapper>
          {children}
        </Wrapper>

        <Footer className={h(40)}/>
      </body>
    </html>
  );
}

const Wrapper = styled('div', {
  maxWidth: '1024px',
  margin: '0 auto',
  minHeight: 'calc(100vh - 120px)',
});
