import React, { useEffect, useRef } from "react";

export function useScrollToBottom<T>(
  dependency: T
): React.MutableRefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dependency]);

  return ref;
}
