"use client";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";

interface VehicleSettingProps {
  mode: string;
}

const VehicleSetting: React.FC<VehicleSettingProps> = ({ mode }) => {
  console.log(mode);
  const router = useRouter();
  const handleCancleClick = (id: any) => {
    router.push(`/vehicle-management`);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
        {/* 車牌號碼和車主 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="plate-number"
            label="車牌號碼"
            type="text"
            autoComplete="current-password"
            error={!!errors.plateNumber} // 顯示錯誤狀態
            {...register("plateNumber", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="owner-name"
            label="車主"
            type="text"
            autoComplete="current-password"
            error={!!errors.ownerName}
            {...register("ownerName", { required: true })}
          />
        </Grid>

        {/* 遷入日期和簽入金額 */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                select
                label="遷入年 (民國)"
                error={!!errors.entryYear}
                {...register("entryYear", { required: true })}
                fullWidth
              >
                {Array.from({ length: 112 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {String(i).padStart(3, "0")} 年
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="月"
                error={!!errors.entryMonth}
                {...register("entryMonth", { required: true })}
                fullWidth
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 月
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="日"
                error={!!errors.entryDay}
                {...register("entryDay", { required: true })}
                fullWidth
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
        <Grid item xs={12} md={6}>
          <TextField
            id="entry-amount"
            label="遷入金額"
            type="number"
            autoComplete="current-password"
            {...register("entryAmount", { required: false })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="vehicle-source"
            label="車輛來源"
            type="text"
            autoComplete="current-password"
            {...register("vehicleSource", { required: false })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                select
                label="遷出年 (民國)"
                {...register("exitYear")}
                fullWidth
              >
                {Array.from({ length: 112 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {String(i).padStart(3, "0")} 年
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField select label="月" {...register("exitMonth")} fullWidth>
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 月
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField select label="日" {...register("exitDay")} fullWidth>
                {Array.from({ length: 31 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 日
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="exit-amount"
            label="遷出金額"
            type="number"
            autoComplete="current-password"
            {...register("exitAmount", { required: false })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="exit-location"
            label="遷出地點"
            type="text"
            autoComplete="current-password"
            {...register("exitLocation", { required: false })}
          />
        </Grid>

        {/* 車輛資料 */}
        <Grid item xs={12}>
          <h3>車輛資料</h3>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                select
                label="發照年 (民國)"
                error={!!errors.exitYear}
                {...register("exitYear", { required: true })}
                fullWidth
              >
                {Array.from({ length: 112 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {String(i).padStart(3, "0")} 年
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="月"
                error={!!errors.exitMonth}
                {...register("exitMonth", { required: true })}
                fullWidth
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 月
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="日"
                error={!!errors.exitDay}
                {...register("exitDay", { required: true })}
                fullWidth
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

        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                select
                label="出廠年 (民國)"
                error={!!errors.exitYear}
                {...register("exitYear", { required: true })}
                fullWidth
              >
                {Array.from({ length: 112 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {String(i).padStart(3, "0")} 年
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="月"
                error={!!errors.exitMonth}
                {...register("exitMonth", { required: true })}
                fullWidth
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 月
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="日"
                error={!!errors.exitDay}
                {...register("exitDay", { required: true })}
                fullWidth
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
        <Grid item xs={12} md={6}>
          <TextField
            id="year"
            label="年份"
            type="text"
            helperText="西式(1999)"
            autoComplete="current-password"
            error={!!errors.year}
            {...register("year", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="brand"
            label="廠牌"
            type="text"
            autoComplete="current-password"
            error={!!errors.brand}
            {...register("brand", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="cc"
            label="噸位CC數"
            type="number"
            autoComplete="current-password"
            error={!!errors.cc}
            {...register("cc", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="engine-number"
            label="引擎號碼"
            type="text"
            autoComplete="current-password"
            error={!!errors.engineNumber}
            {...register("engineNumber", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                select
                label="驗車日期_年 (民國)"
                error={!!errors.exitYear}
                {...register("exitYear", { required: true })}
                fullWidth
              >
                {Array.from({ length: 112 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {String(i).padStart(3, "0")} 年
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="月"
                error={!!errors.exitMonth}
                {...register("exitMonth", { required: true })}
                fullWidth
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 月
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="日"
                error={!!errors.exitDay}
                {...register("exitDay", { required: true })}
                fullWidth
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
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                select
                label="換照日期_年 (民國)"
                error={!!errors.exitYear}
                {...register("exitYear", { required: true })}
                fullWidth
              >
                {Array.from({ length: 112 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {String(i).padStart(3, "0")} 年
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="月"
                error={!!errors.exitMonth}
                {...register("exitMonth", { required: true })}
                fullWidth
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 月
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="日"
                error={!!errors.exitDay}
                {...register("exitDay", { required: true })}
                fullWidth
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
        <Grid item xs={12} md={6}>
          <TextField
            id="body-style"
            label="車身樣式"
            type="text"
            autoComplete="current-password"
            error={!!errors.bodyStyle}
            {...register("bodyStyle", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="permit"
            label="通行證"
            type="text"
            autoComplete="current-password"
            {...register("permit", { required: false })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="vehicle-weight"
            label="車重"
            type="number"
            autoComplete="current-password"
            error={!!errors.vehicleWeight}
            {...register("vehicleWeight", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="load"
            label="載重"
            type="number"
            autoComplete="current-password"
            error={!!errors.load}
            {...register("load", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="vehicle-type"
            label="車輛種類"
            type="text"
            autoComplete="current-password"
            error={!!errors.vehicleType}
            {...register("vehicleType", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="inspection-method"
            label="驗車方式"
            type="text"
            autoComplete="current-password"
            helperText="1:半/5 2:1/1 3:無"
            error={!!errors.inspectionMethod}
            {...register("inspectionMethod", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                select
                label="超載到期_年 (民國)"
                {...register("exitYear")}
                fullWidth
              >
                {Array.from({ length: 112 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {String(i).padStart(3, "0")} 年
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField select label="月" {...register("exitMonth")} fullWidth>
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 月
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField select label="日" {...register("exitDay")} fullWidth>
                {Array.from({ length: 31 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 日
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                select
                label="停報日期年 (民國)"
                {...register("exitYear")}
                fullWidth
              >
                {Array.from({ length: 112 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {String(i).padStart(3, "0")} 年
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField select label="月" {...register("exitMonth")} fullWidth>
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 月
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField select label="日" {...register("exitDay")} fullWidth>
                {Array.from({ length: 31 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 日
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                select
                label="報銷日期_年 (民國)"
                {...register("exitYear")}
                fullWidth
              >
                {Array.from({ length: 112 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {String(i).padStart(3, "0")} 年
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField select label="月" {...register("exitMonth")} fullWidth>
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 月
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField select label="日" {...register("exitDay")} fullWidth>
                {Array.from({ length: 31 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1).padStart(2, "0")} 日
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="old-plate-number"
            label="舊車牌號"
            type="text"
            autoComplete="current-password"
            {...register("oldPlateNumber", { required: false })}
          />
        </Grid>

        {/* 備註 */}
        <Grid item xs={12}>
          <h3>備註</h3>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="remarks"
            fullWidth
            label="備註"
            multiline
            rows={4}
            {...register("remarks")}
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

export default VehicleSetting;
