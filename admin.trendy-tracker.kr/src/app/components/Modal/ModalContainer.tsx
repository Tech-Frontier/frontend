import { Spacing } from '@tech-frontier/spacing';
import { Button, Text } from '@tech-frontier/ui-desktop';
import { ReactNode } from 'react';
import { css } from '@styled-system/css';

interface ModalProps {
  title?: string;
  subtitle?: string;
  onClose: () => void;
  children?: ReactNode;
}

export function ModalContainer({
  title = '안내',
  subtitle,
  onClose,
  children,
}: ModalProps) {
  return (
    <div className={css({
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      width: '300px',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #0f0f0f',
      borderRadius: '16px',
      padding: '12px',
    })}>
      <div className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2',
      })}>
        <div>
          <Text rank='4'>{title}</Text>
          <Text rank='5'>{subtitle}</Text>
        </div>

        <Button
          className={css({
            fontSize: '12px',
            padding: '0px 6px',
            height: '20px',
            borderRadius: '4px',
          })}
          onClick={onClose}
        >
          x
        </Button>
      </div>
      <Spacing size={20} />

      <div className={css({
        padding: '0 12px',
      })}>
        {children}
      </div>

      <Spacing size={20} />
    </div>
  );
}
