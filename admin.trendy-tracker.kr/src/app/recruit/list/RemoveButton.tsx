'use client';

import { Button } from '@tech-frontier/ui-desktop';
import { removeRecruit } from '@/actions/removeRecruit';
import { withAlert } from '@/utils/request/common';
import { css } from '@styled-system/css';

export function RemoveButton({ w, f, id }: { w: number; f: number; id: number }) {
  return (
    <Button
      size='small'
      className={css({
        width: `${w}px`,
        fontSize: `${f}px`,
      })}
      onClick={withAlert(async () => {
        await removeRecruit({ id });
        window.location.reload();
      })}
    >삭제</Button>
  );
}
