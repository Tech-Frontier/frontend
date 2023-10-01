'use client';

import { Button, Text } from '@tech-frontier/ui-desktop';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail, verifyEmail } from '@/utils/api/verify';
import { TextField } from './TextField';
import { css } from '../../../styled-system/css';

interface NotiFieldInput {
  email: string;
}

interface AuthCodeInput {
  authCode: string;
}

export function NotiField() {
  const {
    register: notiRegister,
    handleSubmit: handleNotiSubmit,
    formState: { errors: notiErrors },
  } = useForm<NotiFieldInput>({ mode: 'onChange' });

  const {
    register: authRegister,
    handleSubmit: authHandleSubmit,
    formState: { errors: authErrors },
  } = useForm<AuthCodeInput>({ mode: 'onChange' });

  const [fieldError, setFieldError] = useState(false);
  const [email, setEmail] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const onEmailSubmit = async (data: { email: string }) => {
    try {
      await sendEmail(data);
      setEmail(data.email);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
      alert('다시 시도해주세요');
    }
  };

  const onEmailErrors = (error: any) => {
    if (error.email) {
      setFieldError(true);
    }

    setTimeout(() => {
      setFieldError(false);
    }, 1000);
  };

  const onAuthCodeSubmit = async (data: { authCode: string }) => {
    if (email == null) {
      return;
    }

    try {
      const { httpStatusCode, msg } = await verifyEmail({
        email,
        code: data.authCode,
      });

      if (httpStatusCode !== 200) {
        alert(msg);
        return;
      }

      alert('구독이 완료되었습니다!');

    } catch (error) {
      console.log(error);
      alert('다시 시도해주세요');
    }
  };

  const onAuthCodeErrors = (error: any) => {
    if (error.authCode) {
      setFieldError(true);
    }

    setTimeout(() => {
      setFieldError(false);
    }, 1000);
  };

  return (
    <>
      <div className={fieldCss}>
        <TextField
          error={fieldError}
          placeholder="이메일을 입력해주세요"
          register={notiRegister('email', {
            pattern: {
              value: reg,
              message: '유효하지 않는 이메일 입니다.',
            },
            validate: {
              empty: (value) => value !== '' || '이메일을 입력해주세요',
            },
          })}
        />
        <Button onClick={handleNotiSubmit(onEmailSubmit, onEmailErrors)}>
          알림 받기
        </Button>
        {notiErrors.email && <Text className={errorMessageCss} rank='6'>{notiErrors.email.message}</Text>}
      </div>
      <div className={fieldCss}>
        {submitted && (
          <>
            <TextField
              placeholder="인증번호를 입력해주세요"
              register={authRegister('authCode', {
                validate: {
                  empty: (value) => value !== '' || '인증번호를 입력해주세요',
                },
              })}
            />
            <Button onClick={authHandleSubmit(onAuthCodeSubmit, onAuthCodeErrors)}>
              인증하기
            </Button>
          </>
        )}
        {authErrors.authCode && <Text className={errorMessageCss} rank='6'>{authErrors.authCode.message}</Text>}
      </div>
    </>
  );
}

const fieldCss = css({
  display: 'flex',
  alignItems: 'stretch',
  position: 'relative',

  '& > * + *': {
    marginLeft: '10px',
  },

  // TODO: Button text bold로 수정
  '& > button': {
    fontWeight: 'bold',
  },
});

const errorMessageCss = css({
  color: '#FF0000',
  position: 'absolute',
  marginLeft: 0,
  transform: 'translateY(50px)',
});
