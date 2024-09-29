import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

interface CarOwnerSettingProps {
  mode: string; 
}

const CarOwnerSetting: React.FC<CarOwnerSettingProps> = ({ mode }) => {
  console.log(mode);
  const router = useRouter();
  const handleCancleClick = () => {
    router.push(`/driver-management`);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // 檢查是否填寫出生年、月、日
    const year = data.birthYear ? String(data.birthYear).padStart(3, "0") : "";
    const month = data.birthMonth
      ? String(data.birthMonth).padStart(2, "0")
      : "";
    const day = data.birthDay ? String(data.birthDay).padStart(2, "0") : "";

    // 生成出生日期，根據是否填寫決定格式
    const birthDate = year && month && day ? `${year}-${month}-${day}` : "";

    // 將出生日期放入 data 中，並移除 birthYear, birthMonth, 和 birthDay
    const { birthYear, birthMonth, birthDay, ...updatedData } = data;
    updatedData.birthDate = birthDate;

    // 打印更新後的資料
    //console.log(updatedData);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="outlined-name"
            label="姓名"
            {...register("name", { required: true })}
            fullWidth
            error={!!errors.name} // 顯示錯誤狀態
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="性別"
            {...register("gender")}
            fullWidth
            disabled={mode === "view"}
          >
            <MenuItem value="male">男</MenuItem>
            <MenuItem value="female">女</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            {/* 出生年 */}
            <Grid item xs={4}>
              <TextField
                select
                label="出生年 (民國)"
                {...register("birthYear")}
                fullWidth
                disabled={mode === "view"}
              >
                {Array.from({ length: 112 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {String(i).padStart(3, "0")} 年
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* 月 */}
            <Grid item xs={4}>
              <TextField
                select
                label="月"
                {...register("birthMonth")}
                fullWidth
                disabled={mode === "view"}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 月
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* 日 */}
            <Grid item xs={4}>
              <TextField
                select
                label="日"
                {...register("birthDay")}
                fullWidth
                disabled={mode === "view"}
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 日
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-company"
            label="車行"
            {...register("company")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-phone1"
            label="電話1"
            {...register("phone1")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-phone2"
            label="電話2"
            {...register("phone2")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-mobile"
            label="手機"
            {...register("mobile")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-fax"
            label="傳真"
            {...register("fax")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-address1"
            label="通訊地址"
            {...register("address1")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-address2"
            label="戶籍地址"
            {...register("address2")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-notes"
            label="備註"
            multiline
            rows={4}
            {...register("notes")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          {mode !== "view" && (
            <>
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
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CarOwnerSetting;
