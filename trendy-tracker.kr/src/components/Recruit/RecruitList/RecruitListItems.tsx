import { RecruitItem } from '@/components/Recruit';
import { fetchRecruitList } from '@/utils/api/recruit';
import type { RecruitItemData } from '@/types/Recruit/RecruitItemData';

export async function RecruitListItems() {
  const { data } = await fetchRecruitList();
  const { recruitList } = data;

  return (
    <>
      {recruitList.map((recruit: RecruitItemData) => (
        <RecruitItem recruit={recruit} key={recruit.id} />
      ))}
    </>
  );
}
