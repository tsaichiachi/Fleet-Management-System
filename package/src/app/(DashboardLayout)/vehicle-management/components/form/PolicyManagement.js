"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid, TextField, Divider, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import TaiwanDatePicker from "../TaiwanDatePicker";
import {
  useAddInsurance,
  useGetInsuranceComDropDownList,
  useGetSingleInsuranceFee,
  useEditInsurance,
} from "../../apihooks";

const PolicyManagement = ({ mode }) => {
  console.log("mode:", mode);
  const router = useRouter();
  const searchParams = useSearchParams();
  const insuranceCardNum = searchParams.get("insuranceCardNum");
  console.log("insuranceCardNum:", insuranceCardNum);
  const [carLicenseNum, setCarLicenseNum] = useState("");
  const { mutate: addInsurance, isLoading } = useAddInsurance();
  const { mutate: editInsurance } = useEditInsurance();
  const { data: InsuranceComs } = useGetInsuranceComDropDownList();
  const { data: InsuranceFee } = useGetSingleInsuranceFee(
    mode === "add" ? null : carLicenseNum,
    insuranceCardNum,
    mode
  );
  //console.log("InsuranceFeear:", InsuranceFee);

  const handleCancelClick = () => {
    router.push(`/vehicle-management/${carLicenseNum}/PolicyManagement`);
  };

    const {
      register,
      handleSubmit,
      setValue,
      trigger,
      formState: { errors },
      watch,
      reset,
    } = useForm();

  const onSubmit = (data) => {

    // 定義提交數據
    const submissionData = {
      ...data,
      carLicenseNum,
    };

    console.log("submissionData:", submissionData);

    // if (mode === "add") {
    //   // 新增模式處理
    //   submissionData.insuranceCardNum = data.insuranceCardNum; // 保留 insuranceCardNum
    //   delete submissionData.NewinsuranceCardNum; // 移除 NewinsuranceCardNum
    // } else if (mode === "edit") {
    //   // 編輯模式處理
    //   if (data.NewinsuranceCardNum) {
    //     submissionData.originalInsuranceCardNum = data.insuranceCardNum; // 將新值設置為 insuranceCardNum
    //     submissionData.insuranceCardNum = data.NewinsuranceCardNum; // 將新值設置為 insuranceCardNum
    //   } else {
    //     submissionData.originalInsuranceCardNum = data.insuranceCardNum; // 將原值設置為 originalInsuranceCardNum
    //   }
    //   delete submissionData.NewinsuranceCardNum; // 編輯後清除 NewinsuranceCardNum
    // }

    // 提交數據
    if (mode === "add") {
      addInsurance(submissionData); // 新增模式
    } else if (mode === "edit") {
      editInsurance(submissionData); // 編輯模式
    }
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
    if (mode === "add") {
      reset();
    } else if (mode === "edit" && InsuranceFee) {
      Object.entries(InsuranceFee).forEach(([key, value]) => {
        setValue(key, value || "");
      });
    }
  }, [mode, InsuranceFee, reset, setValue]);

  useEffect(() => {
    if (InsuranceFee) {
      setValue("insuranceCom", InsuranceFee.insuranceCom || "");
    }
  }, [InsuranceFee, setValue]);

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
            error={!!errors.carLicenseNum}
            {...register("carLicenseNum", { required: false })}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            disabled={mode === "edit"}
            required
            id="insuranceCardNum"
            label="保卡資料"
            type="text"
            error={!!errors.insuranceCardNum}
            {...register("insuranceCardNum", { required: true })}
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

        {/* 保險公司 */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            required
            value={watch("insuranceCom") || ""}
            onChange={(e) => setValue("insuranceCom", e.target.value)}
            label="保險公司"
            error={!!errors.insuranceCom}
            {...register("insuranceCom", { required: true })}
            fullWidth
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="" disabled>
              請選擇
            </MenuItem>
            {InsuranceComs?.map((InsuranceCom) => (
              <MenuItem key={InsuranceCom.key} value={InsuranceCom.value}>
                {`${InsuranceCom.name}`}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="insuranceCom"
            label="保險公司"
            type="text"
            autoComplete="off"
            error={!!errors.insuranceCom}
            {...register("insuranceCom", { required: true })}
          />
        </Grid> */}

        {/* 起日 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="起日"
            fieldName="startDate"
            required={true}
            defaultValue={InsuranceFee?.startDate || ""}
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
            defaultValue={InsuranceFee?.endDate || ""}
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
            defaultValue={InsuranceFee?.payUsDate || ""}
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
            InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 保卡資料 */}
        {/* {mode === "edit" && (
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="NewinsuranceCardNum"
              label="變更保卡資料"
              type="text"
              autoComplete="off"
              error={!!errors.NewinsuranceCardNum}
              {...register("NewinsuranceCardNum", { required: false })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        )} */}

        {/* 退日 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="退日"
            fieldName="quitDate"
            required={true}
            defaultValue={InsuranceFee?.quitDate || ""}
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
