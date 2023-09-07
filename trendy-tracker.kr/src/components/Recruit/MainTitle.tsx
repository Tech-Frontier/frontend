import { css } from '@/../styled-system/css';
import { Button } from '@tech-frontier/ui-desktop';
import React, { ReactNode } from 'react';
import Twemoji from '@/components/Twemoji';

export function MainTitle({ children }:{ children: ReactNode }) {
  return (
    <div className={titleCss}>
      <div>
        <Twemoji emoji="🔔" width={48} height={48}/>
      </div>
      {children}
      <div className={textfieldCss}>
        <input className={inputCss} placeholder='이메일을 입력해주세요'/>
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

const inputCss = css({
  width: '250px',
  appearance: 'none',
  borderRadius: '8px',
  backgroundColor: '#262626',
  padding: '12px',
  fontSize: '15px',
  color: '#9CC5A1',
  transition: 'box-shadow 0.2s ease-in-out',

  '&:focus': {
    outline: 'none',
    boxShadow: 'inset 0px 0px 2px 1px #9CC5A1',
    transition: 'box-shadow 0.2s ease-in-out',
  },
});

const textfieldCss = css({
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
