'use server';

import { requestTTAPI } from '@/utils/request';

export async function updateRecruitTechList({ id, techList }: { id: number; techList: string[] }) {
  const querystring = `${techList.map(x => `tech=${x}`).join('&')}`;
  return requestTTAPI<{ msg?: string; error?: string }>({
    pathname: `/api/recruit/update/id/${id}?${querystring}`,
    method: 'PUT',
  });
}
