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
}) => {
  console.log("TaiwanDatePicker defaultValue:", defaultValue);
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(defaultValue);
  console.log("TaiwanDatePicker value:", value);
  const [taiwanYear, setTaiwanYear] = useState(
    defaultValue ? parseInt(defaultValue.split("-")[0]) : 1
  );
  const [month, setMonth] = useState(
    defaultValue ? parseInt(defaultValue.split("-")[1]) : 1
  );
  const [day, setDay] = useState(
    defaultValue ? parseInt(defaultValue.split("-")[2]) : 1
  );

  // 在元件初始化時，註冊該欄位
  useEffect(() => {
    register(fieldName, {
      required: required ? `${label}是必填項目` : false,
    });
  }, [register, fieldName, required, label]);

  // 在元件初始化時，設置預設值
  useEffect(() => {
    if (defaultValue) {
      const [year, month, day] = defaultValue.split("-");
      setTaiwanYear(parseInt(year));
      setMonth(parseInt(month));
      setDay(parseInt(day));
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleOpen = (event) => {
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
