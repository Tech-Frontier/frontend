import { AppLayout } from '@/components/AppLayout';
import './globals.css';
import '@tech-frontier/ui-desktop/style.css';
import { Footer, Text } from '@tech-frontier/ui-desktop';
import Link from 'next/link';
import type { Metadata } from 'next';

// NOTE: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: 'Trendy Tracker',
  description: '당신의 성장 실버 불렛 TT',
  openGraph: {
    url: 'https://trendy-tracker.kr',
    title: 'Trendy Tracker',
    description: '당신의 성장 실버 불렛 TT',
    siteName: 'Trendy Tracker',
    images: [{
      url: 'https://cdn.trendy-tracker.kr/og-202311112156.jpeg',
    }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AppLayout>{children}</AppLayout>
        <Footer>
          <Link href="https://github.com/Tech-Frontier">
            <Text rank="3" fontWeight="800" color="#DCE1DE" as="span">
              ⓒ Tech-Frontier
            </Text>
          </Link>
        </Footer>
      </body>
    </html>
  );
}
