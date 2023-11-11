'use client';

import { OverlayProvider } from '@toss/use-overlay';
import { ReactNode } from 'react';

export function OverlayWrapper({ children }: { children: ReactNode }) {
  return (
    <OverlayProvider>
      {children}
    </OverlayProvider>
  );
}
