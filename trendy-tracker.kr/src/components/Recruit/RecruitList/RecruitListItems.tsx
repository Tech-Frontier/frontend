import { RecruitItem } from '@/components/Recruit';
import type { RecruitItemData } from '@/types/Recruit/RecruitItemData';
import { fetchRecruitList } from '@/utils/api/recruit';

export async function RecruitListItems({ tech }: { tech: string[] }) {
  const { data } = await fetchRecruitList({ tech });
  const { recruitList } = data;

  // API 요청 예시 : https://api.trendy-tracker.kr/api/recruit/list?tech=Javascript&tech=react'

  return (
    <>
      {recruitList.map((recruit: RecruitItemData) => (
        <RecruitItem recruit={recruit} key={recruit.id} />
      ))}
    </>
  );
}
