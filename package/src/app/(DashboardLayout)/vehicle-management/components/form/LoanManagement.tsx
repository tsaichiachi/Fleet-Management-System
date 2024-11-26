import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import TaiwanDatePicker from "../TaiwanDatePicker";

interface VehicleSettingProps {
  mode: string;
}

const LoanManagement: React.FC<VehicleSettingProps> = ({ mode }) => {
  const router = useRouter();
   const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  // 提交表單的處理邏輯
  const onSubmit = (data: any) => {
    console.log("提交的資料：", data);
    // 您可以將資料發送到 API
  };

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
      <Grid container spacing={2}>
        {/* 其他欄位 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-insurance-company"
            label="保險公司"
            type="text"
            autoComplete="off"
            error={!!errors.insuranceCompany}
            {...register("insuranceCompany", { required: true })}
          />
        </Grid>

        {/* 發票日期 (TaiwanDatePicker 整合) */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="起日"
            fieldName="startDate"
            required={true} // 必填
            defaultValue=""
            onChange={(value) => {
              setValue("startDate", value);
              trigger("startDate");
            }}
            error={!!errors.startDate} // 動態顯示錯誤樣式
            //helperText={errors.entryDate?.message} // 顯示錯誤訊息
            register={register}
            trigger={trigger}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="止日"
            fieldName="endDate"
            required={true} // 必填
            defaultValue=""
            onChange={(value) => {
              setValue("endDate", value);
              trigger("endDate");
            }}
            error={!!errors.endDate} // 動態顯示錯誤樣式
            //helperText={errors.entryDate?.message} // 顯示錯誤訊息
            register={register}
            trigger={trigger}
          />
       
        </Grid>

        {/* 其他表單欄位 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-loan-amount"
            label="貸款總額"
            type="number"
            autoComplete="off"
            error={!!errors.loanAmount}
            {...register("loanAmount", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-monthly-repayment"
            label="每月還款"
            type="number"
            autoComplete="off"
            error={!!errors.monthlyRepayment}
            {...register("monthlyRepayment", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            id="outlined-note"
            label="備註"
            type="text"
            autoComplete="off"
            multiline
            rows={4}
            error={!!errors.note}
            {...register("note")}
          />
        </Grid>
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
    </Box>
  );
};

export default LoanManagement;
