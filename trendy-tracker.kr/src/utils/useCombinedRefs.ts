import { useRef, useEffect, RefObject, ForwardedRef } from 'react';

function useCombinedRefs<T>(...refs: ForwardedRef<T>[]): RefObject<T> {
  const targetRef = useRef<T>(null);
  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);
  return targetRef;
}

export { useCombinedRefs };
