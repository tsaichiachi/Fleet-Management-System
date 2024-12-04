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

// 檢查日期格式 (民國年)
export const validateDate = (date, format = "YYY-MM-DD") => {
  const regex =
    format === "YYY-MM-DD" ? /^\d{3}-\d{2}-\d{2}$/ : /^\d{3}-\d{2}$/; // 民國年格式
  if (!regex.test(date)) return false;

  const [year, month, day] = date.split("-").map(Number);

  // 將民國年轉為西元年
  const fullYear = year + 1911;

  if (format === "YYY-MM-DD") {
    const dateObj = new Date(fullYear, month - 1, day);
    return (
      dateObj.getFullYear() === fullYear &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  } else if (format === "YYY-MM") {
    return year > 0 && month > 0 && month <= 12;
  }

  return false;
};

// 檢查多個日期欄位是否在指定的民國年月區間
export const areDatesInExpenseMonth = (dates, expenseYearMonth) => {
  if (!dates || !expenseYearMonth) return false;

  // 確保傳入的是陣列
  const dateArray = Array.isArray(dates) ? dates : [dates];

  // 檢查每個日期是否在區間內
  return dateArray.every((date) => {
    if (!date) return false;

    const [expenseYear, expenseMonth] = expenseYearMonth.split("-").map(Number);
    const [dateYear, dateMonth] = date.split("-").slice(0, 2).map(Number);

    return expenseYear === dateYear && expenseMonth === dateMonth;
  });
};



