//稅金管理
"use client";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import TaiwanDatePicker from "../TaiwanDatePicker"; 


const TaxManagement= ({ mode }) => {
  console.log(mode);
  const router = useRouter();
  const handleCancelClick = (id) => {
    router.push(`/vehicle-management/${id}/TaxManagement`);
  };

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="plateNumber"
            label="車牌號碼"
            type="text"
            autoComplete="off"
            error={!!errors.plateNumber}
            {...register("plateNumber", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="month"
            label="月份"
            type="text"
            autoComplete="off"
            error={!!errors.month}
            {...register("month", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="lastMonthDebt"
            label="上月欠款"
            type="text"
            autoComplete="off"
            error={!!errors.lastMonthDebt}
            {...register("lastMonthDebt", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="managementFee"
            label="管理費"
            type="text"
            autoComplete="off"
            error={!!errors.managementFee}
            {...register("managementFee", { required: true })}
            
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="mutualFund"
            label="互助金"
            type="text"
            autoComplete="off"
            error={!!errors.mutualFund}
            {...register("mutualFund", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="calculationMethod"
            label="計算方式"
            type="text"
            autoComplete="off"
            error={!!errors.calculationMethod}
            {...register("calculationMethod", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="unionFee"
            label="公會費"
            type="text"
            autoComplete="off"
            error={!!errors.unionFee}
            {...register("unionFee", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="carLoan"
            label="車貸款"
            type="text"
            autoComplete="off"
            error={!!errors.carLoan}
            {...register("carLoan", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="interestFreeBase"
            label="無息基準"
            type="text"
            autoComplete="off"
            error={!!errors.interestFreeBase}
            {...register("interestFreeBase", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="laborInsurance"
            label="勞保費"
            type="text"
            autoComplete="off"
            error={!!errors.laborInsurance}
            {...register("laborInsurance", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="insuranceFee"
            label="保險費"
            type="text"
            autoComplete="off"
            error={!!errors.insuranceFee}
            {...register("insuranceFee", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="calculationAmount"
            label="計算金額"
            type="text"
            autoComplete="off"
            error={!!errors.calculationAmount}
            {...register("calculationAmount", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="healthInsurance"
            label="健保費"
            type="text"
            autoComplete="off"
            error={!!errors.healthInsurance}
            {...register("healthInsurance", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="licenseTax"
            label="牌照稅"
            type="text"
            autoComplete="off"
            error={!!errors.licenseTax}
            {...register("licenseTax", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="lastMonthInterest"
            label="上月利息"
            type="text"
            autoComplete="off"
            error={!!errors.lastMonthInterest}
            {...register("lastMonthInterest", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="reserveFund"
            label="準備金"
            type="text"
            autoComplete="off"
            error={!!errors.reserveFund}
            {...register("reserveFund", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="fuelCost"
            label="燃料費"
            type="text"
            autoComplete="off"
            error={!!errors.fuelCost}
            {...register("fuelCost", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="salesInvoiceAmount"
            label="銷發票額"
            type="text"
            autoComplete="off"
            error={!!errors.salesInvoiceAmount}
            {...register("salesInvoiceAmount", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="offsetInvoiceAmount"
            label="抵發票額"
            type="text"
            autoComplete="off"
            error={!!errors.offsetInvoiceAmount}
            {...register("offsetInvoiceAmount", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="offsetFuelInvoiceAmount"
            label="抵油單額"
            type="text"
            autoComplete="off"
            error={!!errors.offsetFuelInvoiceAmount}
            {...register("offsetFuelInvoiceAmount", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="salesInvoiceTax"
            label="銷發票稅"
            type="text"
            autoComplete="off"
            error={!!errors.salesInvoiceTax}
            {...register("salesInvoiceTax", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="offsetInvoiceTax"
            label="抵發票稅"
            type="text"
            autoComplete="off"
            error={!!errors.offsetInvoiceTax}
            {...register("offsetInvoiceTax", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="offsetFuelTax"
            label="抵油單稅"
            type="text"
            autoComplete="off"
            error={!!errors.offsetFuelTax}
            {...register("offsetFuelTax", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="loanAmount"
            label="貸款金額"
            type="text"
            autoComplete="off"
            error={!!errors.loanAmount}
            {...register("loanAmount", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="depositAmount"
            label="入款金額"
            type="text"
            autoComplete="off"
            error={!!errors.depositAmount}
            {...register("depositAmount", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="otherReceivables"
            label="其他應收"
            type="text"
            autoComplete="off"
            error={!!errors.otherReceivables}
            {...register("otherReceivables", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="borrowedInterest"
            label="借款利息"
            type="text"
            autoComplete="off"
            error={!!errors.borrowedInterest}
            {...register("borrowedInterest", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="depositInterest"
            label="入票利息"
            type="text"
            autoComplete="off"
            error={!!errors.depositInterest}
            {...register("depositInterest", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="otherOffset"
            label="其他抵收"
            type="text"
            autoComplete="off"
            error={!!errors.otherOffset}
            {...register("otherOffset", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="advanceInterest"
            label="代支利息"
            type="text"
            autoComplete="off"
            error={!!errors.advanceInterest}
            {...register("advanceInterest", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="receiptOffset"
            label="收據抵收"
            type="text"
            autoComplete="off"
            error={!!errors.receiptOffset}
            {...register("receiptOffset", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="depositReturn"
            label="入款退回"
            type="text"
            autoComplete="off"
            error={!!errors.depositReturn}
            {...register("depositReturn", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="fines"
            label="罰單"
            type="text"
            autoComplete="off"
            error={!!errors.fines}
            {...register("fines", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="currentMonthDebt"
            label="本月欠款"
            type="text"
            autoComplete="off"
            error={!!errors.currentMonthDebt}
            {...register("currentMonthDebt", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="列印日期"
            fieldName="printDate"
            required={true}
            defaultValue=""
            onChange={(value) => {
              setValue("printDate", value);
              trigger("printDate");
            }}
            error={!!errors.printDate}
            register={register}
            trigger={trigger}
          />
        </Grid>
      </Grid>
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




export default TaxManagement;
