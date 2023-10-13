import Link from 'next/link';
import { ReactNode } from 'react';
import { Recruit } from '@/models/recruit';
import { css } from '@styled-system/css';
import { RemoveButton } from './RemoveButton';

const Text = ({ w, f, children }: { w: number; f: number; children: ReactNode }) => {
  return (
    <p style={{
      width: `${w}px`,
      fontSize: `${f}px`,
    }}>
      {children}
    </p>
  );
};

export function RecruitItem({ data }: { data: Recruit }) {
  return (
    <li className={css({
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderBottom: '1px solid',
      minHeight: '80px',
    })}>
      <Text w={30} f={10}>{data.id}</Text>
      <Text w={50} f={12}>{data.company}</Text>
      <Text w={60} f={12}>{data.jobCategory}</Text>
      <Link
        href={data.url}
        target='_blank'
        className={css({
          width: '300px',
          color: 'blue',
        })}>
        {data.title}
      </Link>
      <Text w={150} f={12}>{data.techList?.join(', ')}</Text>
      <RemoveButton w={60} f={12} id={data.id} />
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
      padding: '10px 0',
    })}>
      <Text w={30} f={12}>No</Text>
      <Text w={50} f={12}>회사명</Text>
      <Text w={60} f={12}>직군명</Text>
      <Text w={300} f={12}>제목</Text>
      <Text w={150} f={12}>기술스택</Text>
      <Text w={60} f={12}>제거</Text>
    </li>
  );
}
