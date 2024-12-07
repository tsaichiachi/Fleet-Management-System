"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Popover,
  Box,
  Grid,
  MenuItem,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// 產生範圍內的年份或月份選項
const generateOptions = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const TaiwanYearMonthPickerSample = ({
  label, // 標籤
  defaultValue = null, // 預設值
  onChange, // 當日期改變時的回呼
  error = false, // 是否顯示錯誤樣式
  helperText = "", // 錯誤提示訊息
  required = false, // 是否必填
  register, // React Hook Form 的 `register` 方法
  fieldName, // 對應表單的欄位名稱
  trigger, // React Hook Form 的 `trigger` 方法，用於手動觸發驗證
}) => {
  const [anchorEl, setAnchorEl] = useState(null); // 控制彈跳視窗的狀態
  const [value, setValue] = useState(""); // 輸入框的值預設為空白
  const [taiwanYear, setTaiwanYear] = useState(1); // 下拉選單年份
  const [month, setMonth] = useState(1); // 下拉選單月份

  // 初始化預設值（僅設定下拉選單）
  useEffect(() => {
    const today = new Date();
    const currentTaiwanYear = today.getFullYear() - 1911; // 轉為民國年
    const currentMonth = today.getMonth() + 1; // 月份從0開始

    if (defaultValue) {
      const [year, month] = defaultValue.split("-");
      setTaiwanYear(parseInt(year, 10));
      setMonth(parseInt(month, 10));
    } else {
      setTaiwanYear(currentTaiwanYear);
      setMonth(currentMonth);
    }
  }, [defaultValue]);

  // 當元件初始化時，註冊欄位到 React Hook Form
  useEffect(() => {
    if (register) {
      register(fieldName, {
        required: required ? `${label}是必填項目` : false,
      });
    }
  }, [register, fieldName, required, label]);

  // 開啟彈跳視窗
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // 關閉彈跳視窗
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 確認選擇的日期
  const handleConfirm = () => {
    const formattedDate = `${String(taiwanYear).padStart(3, "0")}-${String(
      month
    ).padStart(2, "0")}`;
    setValue(formattedDate); // 使用者確認後才填入輸入框
    if (onChange) onChange(formattedDate); // 傳遞改變的值
    if (trigger) trigger(fieldName); // 手動觸發驗證
    handleClose();
  };

  const open = Boolean(anchorEl); // 判斷彈跳視窗是否開啟

  return (
    <Box>
      {/* 顯示日期輸入框 */}
      <TextField
        label={
          <Box component="span" style={{ color: error ? "red" : "inherit" }}>
            {label}
            {required && (
              <span style={{ color: error ? "red" : "inherit" }}> *</span>
            )}
          </Box>
        }
        value={value} // 輸入框預設為空
        error={error} // 顯示錯誤樣式
        helperText={helperText} // 錯誤提示訊息
        onClick={handleOpen}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <CalendarMonthIcon sx={{ cursor: "pointer" }} />
            </InputAdornment>
          ),
        }}
        fullWidth
      />

      {/* 彈跳視窗 */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 2, width: 300 }}>
          <Grid container spacing={2} justifyContent="center">
            {/* 年份選擇 */}
            <Grid item xs={6}>
              <Typography align="center">年</Typography>
              <TextField
                select
                value={taiwanYear}
                onChange={(e) => setTaiwanYear(Number(e.target.value))}
                fullWidth
              >
                {generateOptions(60, 150).map((year) => (
                  <MenuItem key={year} value={year}>
                    {String(year).padStart(3, "0")}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* 月份選擇 */}
            <Grid item xs={6}>
              <Typography align="center">月</Typography>
              <TextField
                select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                fullWidth
              >
                {generateOptions(1, 12).map((month) => (
                  <MenuItem key={month} value={month}>
                    {String(month).padStart(2, "0")}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* 按鈕區域 */}
          <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
            <Button onClick={handleClose}>取消</Button>
            <Button variant="contained" onClick={handleConfirm}>
              確認
            </Button>
          </Grid>
        </Box>
      </Popover>
    </Box>
  );
};

export default TaiwanYearMonthPickerSample;
