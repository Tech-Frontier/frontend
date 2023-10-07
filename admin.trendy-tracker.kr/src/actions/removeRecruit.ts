'use server';

import { requestTTAPI } from '@/utils/request';

export async function removeRecruit({ id }: { id: number }) {
  return requestTTAPI<{ msg?: string; error?: string }>({
    pathname: `/api/recruit/delete/id/${id}`,
    method: 'DELETE',
  });
}
