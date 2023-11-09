import { createContext } from '@/utils/createContext';

interface DropdownContextValue {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const [DropdownProvider, useDropdownContext] = createContext<DropdownContextValue>('Dropdown');
