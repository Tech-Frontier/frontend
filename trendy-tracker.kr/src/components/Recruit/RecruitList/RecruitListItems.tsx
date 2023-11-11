import { Text } from '@tech-frontier/ui-desktop';
import { RecruitItem } from '@/components/Recruit';
import { fetchRecruitList } from '@/utils/api/recruit';
import type { RecruitItemData } from '@/types/Recruit/RecruitItemData';

export async function RecruitListItems({ tech }: { tech: string[] }) {
  const { data } = await fetchRecruitList({ tech });
  const { recruitList } = data;

  if (recruitList.length === 0) {
    return <Text color="white">등록된 공고가 없습니다.</Text>;
  }
  // API 요청 예시 : https://api.trendy-tracker.kr/api/recruit/list?tech=Javascript&tech=react'

  return (
    <>
      {recruitList.map((recruit: RecruitItemData) => (
        <RecruitItem recruit={recruit} key={recruit.id} />
      ))}
    </>
  );
}
