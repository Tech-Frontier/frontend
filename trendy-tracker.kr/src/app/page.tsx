import { Text } from '@tech-frontier/ui-desktop';
import { MainTitle, RecruitSectionTitle, RecruitList } from '@/components/Recruit';
import { NotiField } from '@/components/Recruit/NotiField';
import { RecruitFilter } from '@/components/Recruit/RecruitFilter';
import Twemoji from '@/components/Twemoji';
import { css } from '../../styled-system/css';

export default function Recruit({ searchParams }:{ searchParams: any }) {
  return (
    <div className={wrapperCss}>
      <div className={mainTitleContainerCss}>
        <MainTitle emoji={'🔔'}>
          <Text as="h1" rank="1" fontWeight="800" color="#DEC9E9">
            새로운 공고가 올라오면 알려드릴게요
          </Text>
        </MainTitle>

        <NotiField />
      </div>

      <RecruitSectionTitle>
        <Twemoji emoji="🔎" width={48} height={48}/>
        <Text as="h2" rank='1' fontWeight='800' color="#49A078">현재 올라온 채용 공고</Text>
      </RecruitSectionTitle>

      <RecruitFilter tech={parseTechSearchParam(searchParams.tech)} />

      <RecruitList>
        <RecruitList.Items tech={parseTechSearchParam(searchParams.tech)} />
        <RecruitList.LoadMore tech={parseTechSearchParam(searchParams.tech)} />
      </RecruitList>
    </div>
  );
}

function parseTechSearchParam(tech: string | string[] | undefined) {
  if (tech == null) {
    return [];
  }

  if (Array.isArray(tech)) {
    return tech;
  }

  return [tech];
}

const wrapperCss = css({
  margin: '0 50px',
});

const mainTitleContainerCss = css({
  padding: '100px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '& > * + *': {
    marginTop: '30px',
  },
});
