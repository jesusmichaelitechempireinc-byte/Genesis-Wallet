
"use client";

import { useState, useEffect, useCallback } from 'react';

// This function now returns a stable value on the server
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const isClient = typeof window !== 'undefined';

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isClient) {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    if (!isClient) {
      return;
    }
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue, isClient]);
  
  useEffect(() => {
    if (isClient) {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key && event.newValue) {
          setStoredValue(JSON.parse(event.newValue));
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [key, isClient]);

  return [storedValue, setValue as (value: T) => void];
}
