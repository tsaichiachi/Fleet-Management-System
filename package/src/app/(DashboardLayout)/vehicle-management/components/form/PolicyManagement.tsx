"use client";
import React from "react";
import Box from "@mui/material/Box";
import { Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import TaiwanDatePicker from "../TaiwanDatePicker";
import { useAddInsurance } from "../../apihooks";

interface VehicleSettingProps {
  mode: string;
}

const PolicyManagement: React.FC<VehicleSettingProps> = ({ mode }) => {
  const router = useRouter();
  const { mutate: addInsurance, isLoading } = useAddInsurance();

  const handleCancelClick = (id: any) => {
    router.push(`/vehicle-management/${id}/PolicyManagement`);
  };

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

   const onSubmit = (data: any) => {
     const carLicenseNum = "ABC1234"; // 假设车牌号是静态的，也可以从其他来源动态获取
     const formData = {
       ...data,
       carLicenseNum, // 添加车牌号字段
     };

     console.log("表單提交數據：", formData);

     addInsurance(formData, {
       onSuccess: () => {
         alert("保單新增成功！");
         router.push(
           `/vehicle-management/${formData.carLicenseNum}/PolicyManagement`
         );
       },
       onError: (error) => {
         console.error("新增保單失敗：", error);
         alert("新增失敗，請檢查表單資料！");
       },
     });
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
        {/* 保險公司 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="insuranceCom"
            label="保險公司"
            type="text"
            autoComplete="off"
            error={!!errors.insuranceCom}
            {...register("insuranceCom", { required: true })}
          />
        </Grid>

        {/* 起日 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="起日"
            fieldName="startDate"
            required={true}
            defaultValue=""
            onChange={(value) => {
              setValue("startDate", value);
              trigger("startDate");
            }}
            error={!!errors.startDate}
            register={register}
            trigger={trigger}
          />
        </Grid>

        {/* 止日 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="止日"
            fieldName="endDate"
            required={true}
            defaultValue=""
            onChange={(value) => {
              setValue("endDate", value);
              trigger("endDate");
            }}
            error={!!errors.endDate}
            register={register}
            trigger={trigger}
          />
        </Grid>

        {/* 入帳月 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="入帳月"
            fieldName="payUsDate"
            required={true}
            defaultValue=""
            onChange={(value) => {
              setValue("payUsDate", value);
              trigger("payUsDate");
            }}
            error={!!errors.payUsDate}
            register={register}
            trigger={trigger}
          />
        </Grid>

        {/* 保費 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-amount"
            label="保費"
            type="number"
            autoComplete="off"
            error={!!errors.amount}
            {...register("amount", { required: true })}
          />
        </Grid>

        {/* 保險種類 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="insuranceType"
            label="保險種類"
            type="text"
            autoComplete="off"
            error={!!errors.insuranceType}
            {...register("insuranceType", { required: true })}
          />
        </Grid>

        {/* 保單號碼 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="insuranceNum"
            label="保單號碼"
            type="text"
            autoComplete="off"
            error={!!errors.insuranceNum}
            {...register("insuranceNum", { required: true })}
          />
        </Grid>

        {/* 保卡資料 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="insuranceCardNum"
            label="保卡資料"
            type="text"
            autoComplete="off"
            error={!!errors.insuranceCardNum}
            {...register("insuranceCardNum", { required: true })}
          />
        </Grid>

        {/* 退日 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="退日"
            fieldName="quitDate"
            required={true}
            defaultValue=""
            onChange={(value) => {
              setValue("quitDate", value);
              trigger("quitDate");
            }}
            error={!!errors.quitDate}
            register={register}
            trigger={trigger}
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
              onClick={handleCancelClick}
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

export default PolicyManagement;
