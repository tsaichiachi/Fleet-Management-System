//貸款管理Form
"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Select, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import TaiwanDatePicker from "../TaiwanDatePicker";
import {
  useGetLoanFee,
  useAddLoanFee,
  useUpdateLoanFee,
  useGetSingleLoanFee,
} from "../../apihooks";
import { useGetLoanCompanyDropDownList,useGetLoanCompanyDropDownListNew } from "../../apihooks";

const LoanManagementForm = ({ mode }) => {
  const router = useRouter();
  const [carLicenseNum, setCarLicenseNum] = useState("");
  const { data: LoanFeeData, isLoading } = useGetLoanFee(carLicenseNum);
  const { mutate: addLoanFee } = useAddLoanFee();
  const { mutate: updateLoanFee } = useUpdateLoanFee();
  const { data: loanCompanyList } = useGetLoanCompanyDropDownListNew();
  //取單筆編輯資料，從URL參數insuranceCardNum取得
  const [loanFeeId, setLoanFeeId] = useState(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("insuranceCardNum");
    setLoanFeeId(id);
  }, []);
  const { data: singleLoanFeeData } = useGetSingleLoanFee(loanFeeId);

 

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    watch,
  } = useForm();


  // 提交表單的處理邏輯
 const onSubmit = (data) => {
   const { startDate, endDate } = data;

   if (!startDate || !endDate) {
     alert("請選擇起日和止日");
     return;
   }

   //  民國年轉西元年（若年份小於1911，視為民國年）
   const toADDate = (rocDate) => {
     const [y, m, d] = rocDate.split("-");
     const year = Number(y);
     const adYear = year < 1911 ? year + 1911 : year;
     return new Date(`${adYear}-${m}-${d}`);
   };

   const start = toADDate(startDate);
   const end = toADDate(endDate);

   // 比較日期
   if (start >= end) {
     alert("止日必須晚於起日，請重新選擇日期");
     return;
   }

   const submissionData = {
     ...data,
     carLicenseNum, // 車牌號碼
   };

   // 根據模式執行不同的操作
   if (mode === "add") {
     // 新增模式
     addLoanFee(submissionData, {
       onSuccess: (response) => {
         // 檢查回傳的 code
         if (response?.code === "G_0000") {
           alert("新增成功！");
           router.push(`/vehicle-management/${carLicenseNum}/LoanManagement`);
         } else {
           // 處理其他成功但有警告的情況
           alert(response?.message || "新增完成，但請檢查回傳訊息");
         }
       },
       onError: (error) => {
         // 檢查是否為特定的業務邏輯錯誤
         if (error?.response?.data?.code === "G_0002") {
           alert(
             error.response.data.message ||
               "該車輛已有啟用的車貸設定，若要新增車貸，請先將舊有車貸失效"
           );
         } else if (error?.code === "G_0002") {
           alert(
             error.message ||
               "該車輛已有啟用的車貸設定，若要新增車貸，請先將舊有車貸失效"
           );
         } else {
           alert("新增失敗！請稍後再試");
         }
         console.error("新增失敗：", error);
       },
     });
   } else if (mode === "edit") {
     // 編輯模式
     updateLoanFee(submissionData, {
       onSuccess: (response) => {
         // 檢查回傳的 code
         if (response?.code === "G_0000") {
           alert("修改成功！");
           router.push(`/vehicle-management/${carLicenseNum}/LoanManagement`);
         } else {
           // 處理其他成功但有警告的情況
           alert(response?.message || "修改完成，但請檢查回傳訊息");
         }
       },
       onError: (error) => {
         // 檢查是否為特定的業務邏輯錯誤
         if (error?.response?.data?.code === "G_0002") {
           alert(error.response.data.message || "修改失敗，請檢查車貸設定");
         } else if (error?.code === "G_0002") {
           alert(error.message || "修改失敗，請檢查車貸設定");
         } else {
           alert("修改失敗！請稍後再試");
         }
         console.error("修改失敗：", error);
       },
     });
   }
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
    if (mode !== "add" && singleLoanFeeData) {
      // 逐一設定表單欄位的值 
      for (const [key, value] of Object.entries(singleLoanFeeData)) {
        setValue(key, value);
      }
    }
  }, [mode, singleLoanFeeData, setValue]);
  

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
              setValue("startDate", value || undefined, {
                shouldValidate: true,
              });
              trigger("startDate");
            }}
            error={!!errors.startDate}
            register={register("startDate", { required: true })}
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
              setValue("endDate", value || undefined, {
                shouldValidate: true,
              });
              trigger("endDate");
            }}
            error={!!errors.endDate}
            register={register("endDate", { required: true })}
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
              onClick={() =>
                router.push(
                  `/vehicle-management/${carLicenseNum}/LoanManagement`
                )
              }
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
