'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { css } from '@styled-system/css';

export function ActiveLink({ path, title }: { path: string; title: string; }) {
  const pathname = usePathname();

  return (
    <Link href={path} className={css({
      fontWeight: pathname === path ? 'bold' : 'unset',
    })}>
      {title}
    </Link>
  );
}
