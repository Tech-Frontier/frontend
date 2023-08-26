'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { request } from '@/utils/request/common';

export function AuthCheckClient() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/login') {
      return;
    }

    (async () => {
      try {
        await request({ pathname: '/auth/health' });
      } catch {
        router.push('/login');
      }
    })();
  }, [pathname, router]);

  return null;
}
