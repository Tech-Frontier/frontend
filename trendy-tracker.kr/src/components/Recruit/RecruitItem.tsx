import { css } from '@/../styled-system/css';
import { Tag, Text } from '@tech-frontier/ui-desktop';
import Link from 'next/link';
import type { RecruitItemData } from '@/app/page';

export function RecruitItem({ recruit }: { recruit: RecruitItemData }) {
  const { company, url, techList } = recruit;
  return (
    <li className={itemCss}>
      <Link href={url} target='_blank' className={itemTitleCss}>
        <Text color="#49A078" fontWeight='bold' as="span">{company}</Text>
        <Text rank='3' fontWeight='800' color="#DCE1DE" as="span">
          채용공고 제목
        </Text>
      </Link>

      <div className={itemTagsCss}>
        {techList.map((tech: string) => (
          <Tag size='medium' textColor="white" key={tech}>{tech}</Tag>
        ))}
      </div>
    </li>
  );
}

const itemCss = css({
  padding: '28px 30px',
  borderRadius: '25px',

  '&:hover': {
    backgroundColor: '#3B3B3B',
  },
});

const itemTitleCss = css({
  display: 'inline-flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '10px',
  marginBottom: '10px',

  '& > *': {
    wordBreak: 'keep-all',
  },

  '&:hover': {
    '& > *': {
      color: '#49A078 !important',
      transition: 'color 0.4s ease-in-out',
    },
  },

});

const itemTagsCss = css({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '6px',
});
