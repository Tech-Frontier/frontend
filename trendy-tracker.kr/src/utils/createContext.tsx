// @see https://github.com/SoYoung210/craft/blob/main/src/components/utility/createContext.tsx
// https://github.com/toss/slash/blob/main/packages/react/react/src/utils/buildContext.tsx

import { createContext as createContextRaw, PropsWithChildren, useContext as useContextRaw, useMemo } from 'react';

export function createContext<ContextValueType extends object | null>(
  rootComponentName: string,
  defaultContext?: ContextValueType
) {
  const Context = createContextRaw<ContextValueType | undefined>(defaultContext);

  function Provider(props: PropsWithChildren<ContextValueType>) {
    const { children, ...contextValues } = props;

    const value = useMemo(() => contextValues, [contextValues]) as ContextValueType;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useContext(consumerName: string) {
    const context = useContextRaw(Context);
    if (context == null) {
      throw new Error(`${consumerName}은 ${rootComponentName}하위에서 사용해야 합니다.`);
    }

    return context;
  }

  Provider.displayName = `${rootComponentName}Provider`;
  return [Provider, useContext] as const;
}
