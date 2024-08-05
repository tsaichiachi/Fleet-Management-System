import { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// interface ToolProps {
//   localStorageKey: any;
// }

// export const getLocalStorage = (props: CalendarProps) =>
//   localStorage.getItem(localStorageKey);

// export default getLocalStorage;

interface ToolProps {
  localStorageKey: string;
}

export const getLocalStorage = ({ localStorageKey }: ToolProps) =>
  localStorage.getItem(localStorageKey);
export default getLocalStorage;