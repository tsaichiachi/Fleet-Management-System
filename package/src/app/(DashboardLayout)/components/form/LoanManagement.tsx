//貸款管理表單
"use client";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";

const LoanManagement = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%", maxWidth: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ width: "100%" }}>
        <TextField
          id="outlined-password-input"
          label="保險公司"
          type=" "
          autoComplete="current-password"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="起日" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="止日" />
        </LocalizationProvider>
        <TextField
          id="outlined-password-input"
          label="貸款總額"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="每月還款"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="是否入帳"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="備註"
          type=" "
          autoComplete="current-password"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" sx={{ marginRight: "1%" }}>
          取消
        </Button>
        <Button variant="contained">儲存</Button>
      </div>
    </Box>
  );
};

export default LoanManagement;
