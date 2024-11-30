"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid, TextField, Divider, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import TaiwanDatePicker from "../TaiwanDatePicker";
import {
  useAddInsurance,
  useGetInsuranceComDropDownList,
} from "../../apihooks";

const PolicyManagement = ({ mode }) => {
  const router = useRouter();
  const [carLicenseNum, setCarLicenseNum] = useState("");
  const { mutate: addInsurance, isLoading } = useAddInsurance();
  //const { data: InsuranceComs } = useGetInsuranceComDropDownList();
  //console.log(carLicenseNum);

  const handleCancelClick = () => {
    router.push(`/vehicle-management/${carLicenseNum}/PolicyManagement`);
  };

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
    const formData = {
      ...data,
      carLicenseNum,
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

        {/* 保險公司 */}
        {/* <Grid item xs={12} sm={6}>
          <TextField
            select
            required
            label="保險公司"
            error={!!errors.insuranceCom}
            {...register("insuranceCom", { required: true })}
            fullWidth
            disabled={mode === "view"}
          >
            {InsuranceComs?.map((importnsuranceCom) => (
              <MenuItem
                key={importnsuranceCom.key}
                value={importnsuranceCom.value}
              >
                {`${importnsuranceCom.name}`}
              </MenuItem>
            ))}
          </TextField>
        </Grid> */}
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
            required
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
            required
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
            required
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
            required
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
