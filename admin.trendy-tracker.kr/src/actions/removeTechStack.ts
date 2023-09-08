'use server';

import { requestTTAPI } from '@/utils/request';

export async function removeTechStack({ techName }: { techName: string }) {
  return requestTTAPI<{ msg?: string; error?: string }>({
    pathname: '/api/tech/stack/delete',
    method: 'DELETE',
    params: {
      tech: techName,
    },
  });
}
