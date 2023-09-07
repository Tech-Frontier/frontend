import { css } from '@/../styled-system/css';
import { Button } from '@tech-frontier/ui-desktop';
import { ReactNode } from 'react';
import Twemoji from '@/components/Twemoji';
import { TextField } from './TextField';

export function MainTitle({ children }:{ children: ReactNode }) {
  return (
    <div className={titleCss}>
      <div>
        <Twemoji emoji="🔔" width={48} height={48}/>
      </div>
      {children}
      <div className={fieldCss}>
        <TextField placeholder='이메일을 입력해주세요'/>
        <Button>알림 받기</Button>
      </div>
    </div>
  );
}

const titleCss = css({
  padding: '100px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '& > * + *': {
    marginTop: '30px',
  },
});

const fieldCss = css({
  display: 'flex',
  alignItems: 'stretch',

  '& > * + *': {
    marginLeft: '10px',
  },

  // TODO: Button text bold로 수정
  '& > button': {
    fontWeight: 'bold',
  },
});
