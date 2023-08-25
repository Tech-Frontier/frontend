import Link from 'next/link';
import { Recruit } from '@/models/recruit';
import { css } from '@styled-system/css';

export function RecruitItem({ data }: { data: Recruit }) {
  return (
    <li className={css({
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderBottom: '1px solid',
      minHeight: '80px',
    })}>
      <p className={css({ width: '40px' })}>{data.id}</p>
      <p className={css({ width: '80px' })}>{data.company}</p>
      <p className={css({ width: '80px' })}>{data.occupation}</p>
      <p className={css({ width: '400px' })}>{data.techList?.join(',')}</p>
      <Link
        href={data.url}
        target='_blank'
        className={css({
          width: '100px',
          color: 'blue',
        })}>
        👉 보러가기
      </Link>
    </li>
  );
}

export function RecruitItemHeader() {
  return (
    <li className={css({
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderBottom: '1px solid',
      fontWeight: 'bold',
      backgroundColor: '#f6f5f4',
    })}>
      <p className={css({ width: '40px' })}>No</p>
      <p className={css({ width: '80px' })}>회사명</p>
      <p className={css({ width: '80px' })}>직군명</p>
      <p className={css({ width: '400px' })}>기술스택</p>
      <p className={css({ width: '100px' })}>URL</p>
    </li>
  );
}
