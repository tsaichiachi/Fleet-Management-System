"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getLocalStorage, removeLocalStorage } from "@/utils/tool";
import { useGetCarFee, useAddOrUpdateCarFee } from "../../apihooks";

const ManagementFeeSettingForm = () => {
  const router = useRouter();
  const [carLicenseNum, setCarLicenseNum] = useState("");
  const { data: carFeeData } = useGetCarFee(carLicenseNum);
  //console.log(carFeeData);  
  const { mutate: saveCarFee } = useAddOrUpdateCarFee();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const handleCancelClick = () => {
    router.push(`/vehicle-management`);
    removeLocalStorage("licenseNumber");
  };

 const onSubmit = (data) => {
   // 確保所有數字字段是數字格式
   const submissionData = {
     carLicenseNum, // 車牌號碼從 localStorage 獲取並已設置到狀態中
     manageFee: Number(data.manageFee),
     unionFee: Number(data.unionFee),
     laborFee: Number(data.laborFee),
     healthyFee: Number(data.healthyFee),
     readyFee: Number(data.readyFee),
     peopleHelpFee: Number(data.peopleHelpFee),
     saleTax: Number(data.saleTax),
     buyTax: Number(data.buyTax),
     gasTax: Number(data.gasTax),
     oweTax: Number(data.oweTax),
     receipTax: Number(data.receipTax),
     licenseTaxFirstHalf: Number(data.licenseTaxFirstHalf),
     licenseTaxSecondHalf: Number(data.licenseTaxSecondHalf),
     fuelTaxSpring: Number(data.fuelTaxSpring),
     fuelTaxSummer: Number(data.fuelTaxSummer),
     fuelTaxAutumn: Number(data.fuelTaxAutumn),
     fuelTaxWinter: Number(data.fuelTaxWinter),
   };

   //console.log("提交的資料：", submissionData);

   saveCarFee(submissionData, {
     onSuccess: () => {
       alert("執行成功！");
       //router.push(`/vehicle-management`);
     },
     onError: (error) => {
      alert("執行失敗！");
       console.error("操作失敗：", error);
     },
   });
 };


  // 從 localStorage 獲取車牌號碼
  useEffect(() => {
    const licenseNum = localStorage.getItem("licenseNumber");
    //console.log(licenseNum);
    if (licenseNum) {
      setCarLicenseNum(licenseNum);
    } else {
      console.error("車牌號碼不存在於 localStorage");
    }
  }, []);

  // 預設值綁定到表單
  useEffect(() => {
    if (carFeeData) {
      Object.entries(carFeeData).forEach(([key, value]) => {
        setValue(key, value || ""); // 設置預設值
      });
    }
  }, [carFeeData, setValue]);


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
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            required
            id="carLicenseNum"
            label="車牌號碼"
            value={carLicenseNum}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Divider
            sx={{
              borderStyle: "dashed",
              borderColor: "grey.300",
              marginY: 2, // 垂直間距
            }}
          />
        </Grid>
        {/* 計算方式??? */}
        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="licenseNumber"
            label="計息方式(Y:電腦 N:手動)"
            type="text"
            error={!!errors.calculationMethod}
            {...register("calculationMethod", { required: true })}
          />
        </Grid> */}

        {/* 無息基準???? */}
        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="licenseNumber"
            label="無息基準"
            type="number"
            error={!!errors.noInterestBasis}
            {...register("noInterestBasis", { required: true })}
          />
        </Grid> */}

        {/* 管理費 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="manageFee"
            label="管理費"
            type="number"
            error={!!errors.manageFee}
            {...register("manageFee", { required: true })}
            InputLabelProps={{ shrink: true }} // 確保標籤不被擋住
          />
        </Grid>
        {/* 公會費 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="unionFee"
            label="公會費"
            type="number"
            error={!!errors.unionFee}
            {...register("unionFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 勞保費 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="laborFee"
            label="勞保費"
            type="number"
            error={!!errors.laborFee}
            {...register("laborFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 健保費 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="healthyFee"
            label="健保費"
            type="number"
            error={!!errors.healthyFee}
            {...register("healthyFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 準備金 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="readyFee"
            label="準備金"
            type="number"
            error={!!errors.readyFee}
            {...register("readyFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="peopleHelpFee"
            label="互助金"
            type="number"
            error={!!errors.peopleHelpFee}
            {...register("peopleHelpFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Divider
            sx={{
              borderStyle: "dashed",
              borderColor: "grey.300",
              marginY: 2, // 垂直間距
            }}
          />
        </Grid>

        {/* 銷項稅率 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="saleTax"
            label="銷項稅率"
            type="number"
            error={!!errors.saleTax}
            {...register("saleTax", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 進項稅率 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="buyTax"
            label="進項稅率"
            type="number"
            error={!!errors.buyTax}
            {...register("buyTax", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 油單稅率 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="gasTax"
            label="油單稅率"
            type="number"
            error={!!errors.gasTax}
            {...register("gasTax", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 欠款利息 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="oweTax"
            label="欠款利息"
            type="number"
            error={!!errors.oweTax}
            {...register("oweTax", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 收據稅率 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="receipTax"
            label="收據稅率"
            type="number"
            error={!!errors.receipTax}
            {...register("receipTax", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Divider
            sx={{
              borderStyle: "dashed",
              borderColor: "grey.300",
              marginY: 2, // 垂直間距
            }}
          />
        </Grid>

        {/* 上牌照稅 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="licenseTaxFirstHalf"
            label="上牌照稅（上半年）"
            type="number"
            error={!!errors.licenseTaxFirstHalf}
            {...register("licenseTaxFirstHalf", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 下牌照稅 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="licenseTaxSecondHalf"
            label="下牌照稅（下半年）"
            type="number"
            error={!!errors.licenseTaxSecondHalf}
            {...register("licenseTaxSecondHalf", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Divider
            sx={{
              borderStyle: "dashed",
              borderColor: "grey.300",
              marginY: 2, // 垂直間距
            }}
          />
        </Grid>

        {/* 春燃料費 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="fuelTaxSpring"
            label="春燃料費"
            type="number"
            error={!!errors.fuelTaxSpring}
            {...register("fuelTaxSpring", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 夏燃料費 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="fuelTaxSummer"
            label="夏燃料費"
            type="number"
            error={!!errors.fuelTaxSummer}
            {...register("fuelTaxSummer", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 秋燃料費 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="fuelTaxAutumn"
            label="秋燃料費"
            type="number"
            error={!!errors.fuelTaxAutumn}
            {...register("fuelTaxAutumn", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 冬燃料費 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="fuelTaxWinter"
            label="冬燃料費"
            type="number"
            error={!!errors.fuelTaxWinter}
            {...register("fuelTaxWinter", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      {/* 按鈕 */}
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
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
      </Grid>
    </Box>
  );
};

export default ManagementFeeSettingForm;
