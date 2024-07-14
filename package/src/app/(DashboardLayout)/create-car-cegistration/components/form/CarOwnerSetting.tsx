//車主管理表單
"use client";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const CarOwnerSetting = () => {
  return (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" , maxWidth:'100%'},
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <h3>車主資料1111</h3>
            <TextField
              required
              id="outlined-password-input"
              label="車牌號碼"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="姓名"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="車行"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="性別"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="身分證字號"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="出生日期"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="電話1"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="電話2"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="傳真"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="手機"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="通訊地址"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="戶籍地址"
              type=" "
              autoComplete="current-password"
            />
          </div>
          <div>
            <h3>不知道這啥東東</h3>
            <TextField
              id="outlined-password-input"
              label="遷入日期"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="簽入金額"
              type=" "
              autoComplete="current-password"
            />
             <TextField
              id="outlined-password-input"
              label="車輛來源"
              type=" "
              autoComplete="current-password"
            />
             <TextField
              id="outlined-password-input"
              label="遷出日期"
              type=" "
              autoComplete="current-password"
            />
             <TextField
              id="outlined-password-input"
              label="遷出金額"
              type=" "
              autoComplete="current-password"
            />
             <TextField
              id="outlined-password-input"
              label="遷出地點"
              type=" "
              autoComplete="current-password"
            />
          </div>
          <div>
            <h3>車輛資料</h3>
             <TextField
              id="outlined-password-input"
              label="發照日期"
              type=" "
              autoComplete="current-password"
            />
             <TextField
              id="outlined-password-input"
              label="出廠年月"
              type=" "
              autoComplete="current-password"
              helperText="中式88-06"
            />
            <TextField
              id="outlined-password-input"
              label="年份"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="廠牌"
              type=" "
              autoComplete="current-password"
              helperText="西式(1999)"
            />
            <TextField
              id="outlined-password-input"
              label="噸位CC數"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="引擎號碼"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="驗車日期"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="換照日期"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="車身樣式"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="通行證"
              type=" "
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
            <TextField
              id="outlined-password-input"
              label="超載到期"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="報停日期"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="報銷日期"
              type=" "
              autoComplete="current-password"
            />
            <TextField
              id="outlined-password-input"
              label="舊車牌號"
              type=" "
              autoComplete="current-password"
            />
          </div>
          <div>
            <h3>備註</h3>
            <TextField
              id="outlined-password-input"
              fullWidth 
              label="備註"
              type=" "
              autoComplete="current-password"
            />
          </div>
        </Box>
  );
};

export default CarOwnerSetting;
