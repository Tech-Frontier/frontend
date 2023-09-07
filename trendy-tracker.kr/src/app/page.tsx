import { Text } from '@tech-frontier/ui-desktop';
import { MainTitle } from '@/components/Recruit/MainTitle';
import { RecruitItem } from '@/components/Recruit/RecruitItem';
import { RecruitSectionTitle } from '@/components/Recruit/RecruitSectionTitle';
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
      <MainTitle>
        <Text as="h1" rank='1' fontWeight='800' color="#DEC9E9">새로운 공고가 올라오면 알려드릴게요</Text>
      </MainTitle>

      <RecruitSectionTitle>
        <Text rank="4" color="#FFFFFF">{totalCount}</Text>
        <Text rank="4" color="#9CC5A1">개의 채용공고가 있어요</Text>
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
