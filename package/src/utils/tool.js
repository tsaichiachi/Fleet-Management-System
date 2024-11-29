import { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export const storeLocalStorage = (localStorageKey, data) => {
  // data需要string化後傳入
  localStorage.setItem(localStorageKey, data || "");
  return data;
};
export const getLocalStorage = (localStorageKey) =>
  localStorage.getItem(localStorageKey);

export const removeLocalStorage = (localStorageKey) =>
  localStorage.removeItem(localStorageKey);