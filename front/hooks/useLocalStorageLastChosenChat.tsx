import { useState, useCallback } from "react";

// interfaces
import type { TChat } from "@/interfaces/interfaces";

export function useLocalStorageLastChosenChat(
  key: string,
  initialValue: TChat | null
) {
  const [storedValue, setStoredValue] = useState<TChat | null>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = useCallback(
    (value: TChat | null) => {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  return { storedValue, setValue };
}
