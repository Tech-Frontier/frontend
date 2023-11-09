import { createContext } from '@/utils/createContext';

interface MultiSelectContextValue {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  portalContainer?: HTMLElement;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  triggerElement: HTMLButtonElement | null;
  onTriggerElementChange(element: HTMLButtonElement | null): void;
}

export const [MultiSelectProvider, useMultiSelectContext] = createContext<MultiSelectContextValue>('MultiSelect');
