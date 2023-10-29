import { createContext } from '@/utils/createContext';

interface DropdownContextValue {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  portalContainer?: HTMLElement;
}

export const [DropdownProvider, useDropdownContext] = createContext<DropdownContextValue>('Dropdown');
