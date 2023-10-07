'use client';

import { Button } from '@tech-frontier/ui-desktop';
import { removeRecruit } from '@/actions/removeRecruit';
import { withAlert } from '@/utils/request/common';
import { css } from '@styled-system/css';

export function RemoveButton({ width, id }: { width: number; id: number }) {
  return (
    <Button
      className={css({ width: `${width}px` })}
      onClick={withAlert(async () => {
        await removeRecruit({ id });
        window.location.reload();
      })}
    >삭제</Button>
  );
}
