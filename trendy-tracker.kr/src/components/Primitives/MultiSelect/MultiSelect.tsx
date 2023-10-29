import {
  Popover,
  Portal,
  PopoverContent,
  // eslint-disable-next-line import/named
  PopoverContentProps,
  PopoverTrigger,
  // eslint-disable-next-line import/named
  PopoverTriggerProps,
} from '@radix-ui/react-popover';
import React, { ReactNode, forwardRef, useState } from 'react';
import { composeEventHandlers } from '@/utils/composeEventHandlers';
import { useCombinedRefs } from '@/utils/useCombinedRefs';
import { useControllableState } from '@/utils/useControllableState';
import { MultiSelectProvider, useMultiSelectContext } from './context';
import { ScrollArea } from '../ScrollArea/ScrollArea';

type MultiSelectTriggerProps = Omit<PopoverTriggerProps, 'asChild'>;

const MultiSelectTrigger = forwardRef<HTMLButtonElement, MultiSelectTriggerProps>((props, ref) => {
  const { children, onClick: onClickFromProps, ...restProps } = props;
  const { onOpenChange, onTriggerElementChange } = useMultiSelectContext('MultiSelect.Trigger');

  const combinedRefs = useCombinedRefs(ref, onTriggerElementChange);

  return (
    <PopoverTrigger
      asChild
      ref={combinedRefs}
      onClick={(e) => {
        e.preventDefault();
        onOpenChange?.(true);
        onClickFromProps?.(e);
      }}
      {...restProps}
    >
      <div style={{ display: 'flex' }}>{children}</div>
    </PopoverTrigger>
  );
});

MultiSelectTrigger.displayName = 'MultiSelectTrigger';

interface MultiSelectProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  defaultValue?: string[];
}

export function MultiSelect(props: MultiSelectProps) {
  const {
    open: openFromProps,
    defaultOpen,
    onOpenChange,
    value: valueFromProps,
    onValueChange,
    defaultValue,
    children,
    ...restProps
  } = props;

  const [triggerElement, setTriggerElement] = useState<HTMLButtonElement | null>(null);

  const [value = [], setValue] = useControllableState({
    prop: valueFromProps,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const [open, setOpen] = useControllableState({
    prop: openFromProps,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <MultiSelectProvider
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={setValue}
      triggerElement={triggerElement}
      onTriggerElementChange={setTriggerElement}
    >
      <Popover open={open} onOpenChange={onOpenChange} {...restProps}>
        {children}
      </Popover>
    </MultiSelectProvider>
  );
}

export interface MultiSelectContentProps extends Omit<PopoverContentProps, 'modal' | 'asChild'> {
  portalContainer?: HTMLElement;
  flip?: boolean;
  bottomAddon?: ReactNode;
  direction?: 'top' | 'bottom';
}

const MultiSelectContent = forwardRef<HTMLDivElement, MultiSelectContentProps>((props, ref) => {
  const { align, portalContainer, children, onPointerDownOutside, onFocusOutside, ...restProps } = props;
  const { triggerElement, onOpenChange } = useMultiSelectContext('MultiSelect.Content');

  return (
    <Portal container={portalContainer}>
      <PopoverContent
        ref={ref}
        align="start"
        sideOffset={5}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={composeEventHandlers(onPointerDownOutside, (e) => {
          if (triggerElement?.contains(e.target as Node)) return;
          onOpenChange?.(false);
        })}
        onFocusOutside={composeEventHandlers(onFocusOutside, (e) => {
          //   if (triggerElement?.contains(e.target as Node)) return;
          onOpenChange?.(false);
        })}
        {...restProps}
      >
        {children}
      </PopoverContent>
    </Portal>
  );
});

MultiSelectContent.displayName = 'MultiSelectContent';

MultiSelect.Trigger = MultiSelectTrigger;
MultiSelect.Content = MultiSelectContent;
