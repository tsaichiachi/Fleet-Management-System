//保單管理表單
"use client";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const PolicyManagement = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch", maxWidth: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <h3>保單管理</h3>
        <TextField
          required
          id="outlined-password-input"
          label="保險公司"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="起日"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="止日"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="入帳月"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="保費"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="保險種類"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="保單號碼"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="保卡資料"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="退日"
          type=" "
          autoComplete="current-password"
        />
      </div>
    </Box>
  );
};

export default PolicyManagement;
