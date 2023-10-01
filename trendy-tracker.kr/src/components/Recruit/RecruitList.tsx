import { RecruitItem } from '@/components/Recruit';
import { fetchRecruitList } from '@/utils/api/recruit';
import type { RecruitItemData } from '@/app/page';

export async function RecruitList() {
  const { data } = await fetchRecruitList();
  const { recruitList } = data;

  return (
    <ul>
      {recruitList.map((recruit: RecruitItemData) => (
        <RecruitItem recruit={recruit} key={recruit.id} />
      ))}
    </ul>
  );
}
