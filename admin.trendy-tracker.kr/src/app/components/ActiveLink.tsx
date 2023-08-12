'use client';

import { usePathname, useRouter } from 'next/navigation';
import { request } from '@/utils/request/common';
import { css } from '@styled-system/css';

export function ActiveLink({ path, title }: { path: string; title: string; }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <a className={css({
      fontWeight: pathname === path ? 'bold' : 'unset',
      cursor: 'pointer',
    })}
    onClick={async () => {
      (async () => {
        try {
          await request({ pathname: '/auth/health' });

          router.push(path);
        } catch {
          router.push('/login');
        }
      })();
    }}
    >
      {title}
    </a>
  );
}
