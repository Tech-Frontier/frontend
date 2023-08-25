'use client';

import { Spacing } from '@tech-frontier/spacing';
import { Button, Text } from '@tech-frontier/ui-desktop';
import { delay } from '@toss/utils';
import { useRouter } from 'next/navigation';
import { InputHTMLAttributes, useState } from 'react';
import { request } from '@/utils/request/common';

export default function TestPage() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  return (
    <main>
      <Spacing size={50}/>

      <div style={{
        width: '200px',
        textAlign: 'center',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Text as="span">ID </Text><Input type="text" value={id} onChange={(e) => setId(e.target.value)}></Input>
        </div>

        <Spacing size={10}/>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Text as="span">PW </Text><Input type="password" value={pw} onChange={(e) => setPw(e.target.value)}></Input>
        </div>

        <Spacing size={10}/>

        <div style={{
          width: '200px',
          textAlign: 'right',
        }}>

        <Button
          size="small"
          onClick={async () => {
            await request({
              method: 'POST',
              pathname: '/auth/login',
              params: {
                id: id,
                password: pw,
              },
            });
            await delay(500);
            router.push('/');
          }}
        >로그인</Button>
        </div>
      </div>
    </main>
  );
}

function Input(props:InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input style={{
      width: '150px',
      border: '1px solid',
    }} {...props} />
  );
}
