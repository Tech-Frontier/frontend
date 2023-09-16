import { Text } from '@tech-frontier/ui-desktop';
import { MainTitle, RecruitItem, RecruitSectionTitle } from '@/components/Recruit';
import { NotiField } from '@/components/Recruit/NotiField';
import { fetchRecruitList } from '@/utils/api/recruit';
import { css } from '../../styled-system/css';

export interface RecruitItemData {
  id: number;
  company: string;
  occupation: string;
  url: string;
  createdTime: Date;
  techList: string[];
}
export default async function Recruit() {
  const { data } = await fetchRecruitList();
  const { recruitList, totalCount } = data;

  // NOTE: https://gist.github.com/chibicode/fe195d792270910226c928b69a468206
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
        <Text rank="4" color="#9CC5A1">
          <span style={{ color: '#FFFFFF' }}>{totalCount}</span> 개의 채용공고가 있어요
        </Text>
      </RecruitSectionTitle>

      <ul>
        {recruitList.map((recruit: RecruitItemData) => (
          <RecruitItem recruit={recruit} key={recruit.id} />
        ))}
      </ul>
    </div>
  );
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
