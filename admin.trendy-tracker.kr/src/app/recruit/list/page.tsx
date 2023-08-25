import { Spacing } from '@tech-frontier/spacing';
import { Text } from '@tech-frontier/ui-desktop';
import { fetchRecruitList } from '@/actions/fetchRecruitList';
import { LoadMore } from './LoadMore';
import { RecruitItem, RecruitItemHeader } from './RecruitItem';

export default async function RecruitListPage() {
  const { data } = await fetchRecruitList({ pageNo: 1 });
  return (
    <main>
      <Spacing size={40}/>
      <Text rank="1">채용 공고 리스트</Text>

      <RecruitItemHeader />
      {
        data.map((x, i) =>
          <RecruitItem
            key={`${i}-${x.company}-${encodeURIComponent(x.url)}`}
            data={x}
          />,
        )
      }

      <LoadMore />
    </main>
  );
}
