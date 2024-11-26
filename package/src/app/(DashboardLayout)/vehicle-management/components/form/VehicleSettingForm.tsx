"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TaiwanDatePicker from "../TaiwanDatePicker";

interface VehicleSettingProps {
  mode: string;
}

const VehicleSetting: React.FC<VehicleSettingProps> = ({ mode }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data); // 提交表單數據
    
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
            error={!!errors.plateNumber}
            {...register("plateNumber", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="owner-name"
            label="車主"
            type="text"
            error={!!errors.ownerName}
            {...register("ownerName", { required: true })}
          />
        </Grid>

        {/* 遷入日期 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="遷入日期"
            fieldName="entryDate"
            required={true} // 必填
            defaultValue=""
            onChange={(value) => {
              setValue("entryDate", value);
              trigger("entryDate");
            }}
            error={!!errors.entryDate} // 動態顯示錯誤樣式
            //helperText={errors.entryDate?.message} // 顯示錯誤訊息
            register={register}
            trigger={trigger}
          />
        </Grid>

        {/* 遷入金額 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="entry-amount"
            label="遷入金額"
            type="number"
            {...register("entryAmount")}
          />
        </Grid>

        {/* 遷出日期 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="遷出日期"
            fieldName="exitDate"
            required={true}
            defaultValue=""
            onChange={(value) => {
              setValue("exitDate", value);
              trigger("exitDate");
            }}
            error={!!errors.exitDate} // 顯示錯誤樣式
            //helperText={errors.inspectionDate?.message} // 錯誤提示
            register={register}
            trigger={trigger}
          />
        </Grid>

        {/* 遷出金額 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="exit-amount"
            label="遷出金額"
            type="number"
            {...register("exitAmount")}
          />
        </Grid>

        {/* 驗車日期 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="驗車日期"
            fieldName="inspectionDate"
            required={true}
            defaultValue=""
            onChange={(value) => {
              setValue("inspectionDate", value);
              trigger("inspectionDate");
            }}
            error={!!errors.inspectionDate} // 顯示錯誤樣式
            //helperText={errors.inspectionDate?.message} // 錯誤提示
            register={register}
            trigger={trigger}
          />
        </Grid>

        {/* 換照日期 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="換照日期"
            fieldName="renewalDate"
            required={true}
            defaultValue=""
            onChange={(value) => {
              setValue("renewalDate", value);
              trigger("renewalDate");
            }}
            error={!!errors.renewalDate} // 顯示錯誤樣式
            //helperText={errors.inspectionDate?.message} // 錯誤提示
            register={register}
            trigger={trigger}
          />
        </Grid>

        {/* 超載到期日期 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="超載到期日期"
            fieldName="overloadExpirationDate"
            required={true}
            defaultValue=""
            onChange={(value) => {
              setValue("overloadExpirationDate", value);
              trigger("overloadExpirationDate");
            }}
            error={!!errors.overloadExpirationDate} // 顯示錯誤樣式
            //helperText={errors.inspectionDate?.message} // 錯誤提示
            register={register}
            trigger={trigger}
          />
        </Grid>

        {/* 停報日期 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="停報日期"
            fieldName="suspensionDate"
            required={true}
            defaultValue=""
            onChange={(value) => {
              setValue("suspensionDate", value);
              trigger("suspensionDate");
            }}
            error={!!errors.suspensionDate} // 顯示錯誤樣式
            //helperText={errors.inspectionDate?.message} // 錯誤提示
            register={register}
            trigger={trigger}
          />
        </Grid>

        {/* 報銷日期 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="停報日期"
            fieldName="writeOffDate"
            required={true}
            defaultValue=""
            onChange={(value) => {
              setValue("writeOffDate", value);
              trigger("writeOffDate");
            }}
            error={!!errors.writeOffDate} // 顯示錯誤樣式
            //helperText={errors.inspectionDate?.message} // 錯誤提示
            register={register}
            trigger={trigger}
          />
        </Grid>

        {/* 其他欄位 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="old-plate-number"
            label="舊車牌號"
            type="text"
            {...register("oldPlateNumber")}
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

        {/* 按鈕 */}
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          {mode !== "view" && (
            <>
              <Button
                variant="contained"
                sx={{ marginRight: "1%" }}
                onClick={() => router.push(`/vehicle-management`)}
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
