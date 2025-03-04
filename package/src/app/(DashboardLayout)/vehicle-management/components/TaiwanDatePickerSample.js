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

const TaiwanYearMonthPickerSample = ({
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");
  const [taiwanYear, setTaiwanYear] = useState(null);
  const [month, setMonth] = useState(null);

  useEffect(() => {
    const today = new Date();
    const currentTaiwanYear = today.getFullYear() - 1911;
    const currentMonth = today.getMonth() + 1;

    if (defaultValue) {
      const [year, month] = defaultValue.split("-");
      setTaiwanYear(parseInt(year, 10));
      setMonth(parseInt(month, 10));
      setValue(defaultValue);
    } else {
      setTaiwanYear(currentTaiwanYear);
      setMonth(currentMonth);
      setValue("");
    }
  }, [defaultValue]);

  const handleConfirm = () => {
    const formattedDate = `${String(taiwanYear).padStart(3, "0")}-${String(
      month
    ).padStart(2, "0")}`;
    setValue(formattedDate);
    if (onChange) onChange(formattedDate);
    if (trigger) trigger(fieldName);
    handleClose();
  };

  useEffect(() => {
    if (register && typeof register === "function") {
      register(fieldName, {
        required: required ? `${label}是必填項目` : false,
      });
    }
  }, [register, fieldName, required, label]);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <TextField
        {...register(fieldName, {
          required: required ? `${label}是必填項目` : false,
        })}
        label={label}
        value={value}
        error={Boolean(error)}
        helperText={helperText}
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

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 2, width: 300 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6}>
              <Typography align="center">年</Typography>
              <TextField
                select
                value={taiwanYear || ""}
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
            <Grid item xs={6}>
              <Typography align="center">月</Typography>
              <TextField
                select
                value={month || ""}
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
