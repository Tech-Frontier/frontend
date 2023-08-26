'use server';

import { requestTTAPI } from '@/utils/request';

export async function createTechStack({ techName }: { techName: string }) {
  await requestTTAPI({
    pathname: '/api/tech/stack/create',
    method: 'POST',
    params: {
      tech: techName,
    },
  });
}
