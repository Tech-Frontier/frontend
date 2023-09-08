import { Text } from '@tech-frontier/ui-desktop';
import { ReactNode } from 'react';
import { css } from '@/../styled-system/css';
import Twemoji from '@/components/Twemoji';

export function RecruitSectionTitle({ children }: { children: ReactNode }) {
  return (
    <>
      <div className={listTitleCss}>
        <Twemoji emoji="🔎" width={48} height={48}/>
        <Text as="h2" rank='1' fontWeight='800' color="#49A078">현재 올라온 채용 공고</Text>
      </div>
      <div className={listCountTitleCss}>{children}</div>
    </>
  );
}

const listTitleCss = css({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gridGap: '20px',
  marginBottom: '10px',
});

const listCountTitleCss = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginBottom: '10px',
});
