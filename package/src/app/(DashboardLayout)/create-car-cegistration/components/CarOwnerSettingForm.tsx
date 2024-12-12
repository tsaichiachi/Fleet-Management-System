//車主管理表單
"use client";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const CarOwnerSetting = () => {

   const router = useRouter();
   const handleCancleClick = (id: any) => {
     router.push(`/create-car-cegistration`);
     localStorage.setItem("carOwnerId", id);
   };

   const {
     register,
     handleSubmit,
     setValue,
     formState: { errors },
   } = useForm();

   const onSubmit = (data:any) => {
      //console.log(data);
  }


  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%", maxWidth: "100%" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div style={{ width: "100%" }}>
        <TextField
          required
          id="outlined-password-input"
          label="車牌號碼"
          type="text"
          autoComplete="current-password"
          {...register("name", { required: true })}
        />
        <TextField
          id="outlined-password-input"
          label="姓名"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="車行"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="性別"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="身分證字號"
          type="text"
          autoComplete="current-password"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="出生日期" />
        </LocalizationProvider>
        <TextField
          id="outlined-password-input"
          label="電話1"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="電話2"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="傳真"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="手機"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="通訊地址"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="戶籍地址"
          type="text"
          autoComplete="current-password"
        />
      </div>
      <div>
        <h3>不知道這啥東東</h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="遷入日期" />
        </LocalizationProvider>
        <TextField
          id="outlined-password-input"
          label="簽入金額"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="車輛來源"
          type="text"
          autoComplete="current-password"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="遷出日期" />
        </LocalizationProvider>
        <TextField
          id="outlined-password-input"
          label="遷出金額"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="遷出地點"
          type="text"
          autoComplete="current-password"
        />
      </div>
      <div>
        <h3>車輛資料</h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="發照日期" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="出廠年月" />
        </LocalizationProvider>
        <TextField
          id="outlined-password-input"
          label="年份"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="廠牌"
          type="text"
          autoComplete="current-password"
          helperText="西式(1999)"
        />
        <TextField
          id="outlined-password-input"
          label="噸位CC數"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="引擎號碼"
          type="text"
          autoComplete="current-password"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="驗車日期" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="換照日期" />
        </LocalizationProvider>
        <TextField
          id="outlined-password-input"
          label="車身樣式"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="通行證"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="車重"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="載重"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="車輛種類"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="驗車方式"
          type=" "
          autoComplete="current-password"
          helperText="1:半/5 2:1/1 3:無"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="超載到期" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="報停日期" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="報銷日期" />
        </LocalizationProvider>
        <TextField
          id="outlined-password-input"
          label="舊車牌號"
          type=" "
          autoComplete="current-password"
        />
      </div>
      <div style={{ width: "100%" }}>
        <h3>備註</h3>
        <TextField
          id="outlined-password-input"
          fullWidth
          label="備註"
          type=" "
          autoComplete="current-password"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ marginRight: "1%" }}
          onClick={handleCancleClick}
        >
          取消
        </Button>
        <Button variant="contained" type="submit">
          儲存
        </Button>
      </div>
    </Box>
  );
};

export default CarOwnerSetting;
