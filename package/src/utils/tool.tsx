import { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import moment from 'moment';


export const getLocalStorage = (localStorageKey) =>
  localStorage.getItem(localStorageKey);