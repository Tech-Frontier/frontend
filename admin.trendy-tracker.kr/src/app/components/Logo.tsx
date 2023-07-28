import Link from 'next/link';
import { css } from '@styled-system/css';

export function Logo() {
  return (
    <Link
      href="/"
      className={css({
        fontFamily: 'Noto Sans KR',
        fontWeight: 'bold',
        fontSize: '1.4rem',
      })}
    >
      Tech Trendy Admin
    </Link>
  );
}
