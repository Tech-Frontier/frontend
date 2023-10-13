import { RecruitItem } from '@/components/Recruit';
import { fetchRecruitList } from '@/utils/api/recruit';
import type { RecruitItemData } from '@/types/Recruit/RecruitItemData';

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
