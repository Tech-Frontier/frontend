import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React, { ElementRef, ReactNode, forwardRef } from 'react';
import { DropdownProvider } from './context';
import { ScrollArea } from '../ScrollArea/ScrollArea';

interface DropdownProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

type DropdownTriggerElement = ElementRef<typeof DropdownMenu.Trigger>;

interface DropdownTriggerProps {
  children: ReactNode;
}

type DropdownContentElement = ElementRef<typeof DropdownMenu.Content>;

interface DropdownContentProps extends Omit<DropdownMenu.DropdownMenuContentProps, 'align' | 'avoidCollisions'> {
  children: ReactNode;
  // portalContainer?: HTMLElement;
  flip?: boolean;
  align?: 'start' | 'center' | 'end' | 'fit';
}

export function Dropdown(props: DropdownProps) {
  const { open, onOpenChange, children, ...restProps } = props;

  return (
    <DropdownProvider open={open} onOpenChange={onOpenChange}>
      <DropdownMenu.Root open={open} onOpenChange={onOpenChange} {...restProps}>
        {children}
      </DropdownMenu.Root>
    </DropdownProvider>
  );
}

const DropdownTrigger = forwardRef<DropdownTriggerElement, DropdownTriggerProps>((props, ref) => {
  const { children, ...restProps } = props;

  return (
    <DropdownMenu.Trigger ref={ref} asChild={true} {...restProps}>
      <div>{children}</div>
    </DropdownMenu.Trigger>
  );
});

DropdownTrigger.displayName = 'DropdownTrigger';

const DropdownContent = forwardRef<DropdownContentElement, DropdownContentProps>((props, ref) => {
  const { align = 'start', flip = true, collisionPadding = 10, children, ...restProps } = props;

  const dropdownAlign = align === 'fit' ? 'start' : align;

  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        ref={ref}
        align={dropdownAlign}
        avoidCollisions={flip}
        collisionPadding={collisionPadding}
        {...restProps}
      >
        <ScrollArea>{children}</ScrollArea>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
});

DropdownContent.displayName = 'DropdownContent';

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
