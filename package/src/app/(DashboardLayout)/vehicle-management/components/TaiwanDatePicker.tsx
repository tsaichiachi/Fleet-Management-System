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

type TaiwanDatePickerProps = {
  label: string;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  error?: boolean; // 是否顯示錯誤樣式
  helperText?: string; // 錯誤提示訊息
  required?: boolean; // 是否必填
  register: (name: string, options?: any) => void; // React Hook Form 的 `register`
  fieldName: string; // 表單欄位名稱
  trigger?: (name: string) => Promise<boolean>; // React Hook Form 的 `trigger`
};

const generateOptions = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const TaiwanDatePicker: React.FC<TaiwanDatePickerProps> = ({
  label,
  defaultValue = null,
  onChange,
  error = false,
  helperText = "",
  required = false,
  register,
  fieldName,
  trigger,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>(defaultValue);
  const [taiwanYear, setTaiwanYear] = useState<number>(
    defaultValue ? parseInt(defaultValue.split("-")[0]) : 1
  );
  const [month, setMonth] = useState<number>(
    defaultValue ? parseInt(defaultValue.split("-")[1]) : 1
  );
  const [day, setDay] = useState<number>(
    defaultValue ? parseInt(defaultValue.split("-")[2]) : 1
  );

  // 在元件初始化時，註冊該欄位
  useEffect(() => {
    register(fieldName, {
      required: required ? `${label}是必填項目` : false,
    });
  }, [register, fieldName, required, label]);

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
    const formattedDate = `${String(taiwanYear).padStart(3, "0")}-${String(
      month
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setValue(formattedDate);
    if (onChange) onChange(formattedDate);
    if (trigger) trigger(fieldName); // 手動觸發驗證
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      {/* 顯示輸入框 */}
      <TextField
        label={
          <Box component="span" style={{ color: error ? "red" : "inherit" }}>
            {label}
            {required && (
              <span style={{ color: error ? "red" : "inherit" }}> *</span>
            )}
          </Box>
        }
        value={value || ""}
        error={error} // 錯誤狀態
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

      {/* 彈出日期選擇器 */}
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
          {/* 年月日選擇 */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={4}>
              <Typography align="center">年</Typography>
              <TextField
                select
                value={taiwanYear}
                onChange={(e) => setTaiwanYear(Number(e.target.value))}
                fullWidth
              >
                {generateOptions(1, 150).map((year) => (
                  <MenuItem key={year} value={year}>
                    {String(year).padStart(3, "0")} 
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <Typography align="center">日</Typography>
              <TextField
                select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                fullWidth
              >
                {generateOptions(1, 31).map((day) => (
                  <MenuItem key={day} value={day}>
                    {String(day).padStart(2, "0")} 
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* 確認和取消按鈕 */}
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

export default TaiwanDatePicker;
