//貸款管理Form
"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Select, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import TaiwanDatePicker from "../TaiwanDatePicker";
import { useGetLoanFee, useAddOrUpdateLoanFee } from "../../apihooks";
import { useGetLoanCompanyDropDownList } from "../../apihooks";

const LoanManagementForm = ({ mode }) => {
  const router = useRouter();
  const [carLicenseNum, setCarLicenseNum] = useState("");
  const { data: LoanFeeData, isLoading } = useGetLoanFee(carLicenseNum);
  //console.log("LoanFeeData:", LoanFeeData);
  const { mutate: saveLoanFee } = useAddOrUpdateLoanFee();
  const { data: loanCompanyList } = useGetLoanCompanyDropDownList();
  //console.log("loanCompanyList:", loanCompanyList);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    watch
  } = useForm();

  // 提交表單的處理邏輯
  const onSubmit = (data) => {
    const submissionData = {
      ...data,
      carLicenseNum, // 車牌號碼
    };

    saveLoanFee(submissionData, {
      onSuccess: () => {
        alert("執行成功！");
        router.push(`/vehicle-management/${carLicenseNum}/Ledger`);
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
    if (licenseNum) {
      setCarLicenseNum(licenseNum);
    } else {
      console.error("車牌號碼不存在於 localStorage");
    }
  }, []);

  // 預設值綁定到表單
  useEffect(() => {
    if (LoanFeeData && LoanFeeData.length > 0) {
      const loanFee = LoanFeeData[0]; // 提取對象
      //console.log("Setting form values with loanFee:", loanFee);
      Object.entries(loanFee).forEach(([key, value]) => {
       // console.log(`Setting ${key} to ${value}`);
        setValue(key, value || ""); // 設置預設值
      });
    }
  }, [LoanFeeData, setValue]);

 useEffect(() => {
   if (LoanFeeData && LoanFeeData.length > 0) {
     const loanFee = LoanFeeData[0];
     setValue("loanCompany", loanFee.loanCompany || ""); // 設定貸款公司預設值
   }
 }, [LoanFeeData, setValue]);

 
  // 加載中處理
  if (isLoading) {
    return <p>資料加載中...</p>;
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
      <Grid container spacing={2}>
        {/* 車牌號碼 */}
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

        {/* 貸款公司 */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            required
            value={watch("loanCompany") || ""}
            onChange={(e) => setValue("loanCompany", e.target.value)}
            label="貸款公司"
            error={!!errors.loanCompany}
            {...register("loanCompany", { required: true })}
            fullWidth
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="" disabled>
              請選擇
            </MenuItem>
            {loanCompanyList?.map((loanCompany) => (
              <MenuItem key={loanCompany.key} value={loanCompany.value}>
                {`${loanCompany.name}`}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* 起日 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="起日"
            fieldName="startDate"
            required={true}
            defaultValue={LoanFeeData?.[0]?.startDate || ""}
            onChange={(value) => {
              //console.log("Setting startDate to", value);
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
            defaultValue={LoanFeeData?.[0]?.endDate || ""}
            onChange={(value) => {
              //console.log("Setting endDate to", value);
              setValue("endDate", value);
              trigger("endDate");
            }}
            error={!!errors.endDate}
            register={register}
            trigger={trigger}
          />
        </Grid>

        {/* 貸款總額 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="totalAmount"
            label="貸款總額"
            type="text"
            error={!!errors.totalAmount}
            {...register("totalAmount", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 每月還款 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="monthPayAmount"
            label="每月還款"
            type="text"
            error={!!errors.monthPayAmount}
            {...register("monthPayAmount", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 是否入帳 */}
        {/* <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="是否入帳"
            fieldName="payUsDate"
            required={true}
            defaultValue={LoanFeeData?.[0]?.payUsDate || ""}
            onChange={(value) => {
              //console.log("Setting payUsDate to", value);
              setValue("payUsDate", value);
              trigger("payUsDate");
            }}
            error={!!errors.payUsDate}
            register={register}
            trigger={trigger}
          />
        </Grid> */}

        {/* 備註 */}
        <Grid item xs={12} md={12}>
          <TextField
            id="outlined-note"
            label="備註"
            type="text"
            multiline
            rows={4}
            error={!!errors.note}
            {...register("note")}
            InputLabelProps={{ shrink: true }}
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

export default LoanManagementForm;
