import { useState, useCallback } from "react";

import type { ExtendedLocalStorageType } from "@/interfaces/interfaces";

export function useLocalStorage(
  key: string,
  initialValue: ExtendedLocalStorageType
) {
  const [storedLocalStorageValue, setLocalStorageStoredValue] =
    useState<ExtendedLocalStorageType>(() => {
      const item = window.localStorage.getItem(key);

      if (!item) window.localStorage.setItem(key, JSON.stringify(initialValue));

      return item ? JSON.parse(item) : initialValue;
    });

  const setLocalStorageValue = useCallback(
    (value: ExtendedLocalStorageType) => {
      setLocalStorageStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  return { storedLocalStorageValue, setLocalStorageValue };
}
