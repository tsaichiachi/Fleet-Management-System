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

// 年选项生成函数
const generateOptions = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const TaiwanDatePicker = ({
  label,
  defaultValue = null,
  onChange,
  error = false,
  helperText = "",
  required = false,
  register,
  fieldName,
  trigger,
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(""); // 输入框初始化为空
  const [taiwanYear, setTaiwanYear] = useState(1);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  // 初始化日期（仅设置下拉选项，不设置输入框的值）
  useEffect(() => {
    const today = new Date();
    const currentTaiwanYear = today.getFullYear() - 1911; // 转为台湾年
    const currentMonth = today.getMonth() + 1; // 月份从0开始
    const currentDay = today.getDate();

    if (defaultValue) {
      const [year, month, day] = defaultValue.split("-");
      setTaiwanYear(parseInt(year, 10));
      setMonth(parseInt(month, 10));
      setDay(parseInt(day, 10));
    } else {
      setTaiwanYear(currentTaiwanYear);
      setMonth(currentMonth);
      setDay(currentDay);
    }
  }, [defaultValue]);

  const handleOpen = (event) => {
    if (!disabled) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
    const formattedDate = `${String(taiwanYear).padStart(3, "0")}-${String(
      month
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setValue(formattedDate); // 用户确认后才填入输入框的值
    if (onChange) onChange(formattedDate);
    if (trigger) trigger(fieldName); // 手动触发验证
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <TextField
        label={
          <Box component="span" style={{ color: error ? "red" : "inherit" }}>
            {label}
            {required && (
              <span style={{ color: error ? "red" : "inherit" }}> *</span>
            )}
          </Box>
        }
        value={value} // 输入框默认值为空
        error={error}
        helperText={helperText}
        onClick={handleOpen}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <CalendarMonthIcon
                sx={{ cursor: disabled ? "not-allowed" : "pointer" }}
              />
            </InputAdornment>
          ),
        }}
        fullWidth
        disabled={disabled}
      />

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
            <Grid item xs={4}>
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
