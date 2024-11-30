"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { removeLocalStorage } from "@/utils/tool";
import { useGetCarFee, useAddOrUpdateCarFee } from "../../apihooks";
import TaiwanYearMonthPickerSample from "../TaiwanDatePickerSample";
import FieldWithDialog from "../FieldWithDialog";
import LoanManagementTable from "../table/LoanManagementTable";
import InvoiceSaleAmountTable from "../table/InvoiceSaleAmountTable";

const LedgerForm = () => {
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
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            required
            id="ownerName"
            label="車主"
            value={carLicenseNum}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TaiwanYearMonthPickerSample
            label="年月份"
            fieldName="billDate"
            required={true} // 必填
            defaultValue=""
            onChange={(value) => {
              setValue("billDate", value);
              trigger("billDate");
            }}
            error={!!errors.billDate}
            //helperText={errors.entryDate?.message} // 顯示錯誤訊息
            register={register}
            trigger={trigger}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            type="submit"
            sx={{ margin: "10px", marginTop: "15px" }}
          >
            搜尋
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ margin: "10px", marginTop: "15px" }}
          >
            下載
          </Button>
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

        {/* 上月欠款 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="lastMonthOweAmount"
            label="上月欠款"
            type="number"
            error={!!errors.lastMonthOweAmount}
            {...register("lastMonthOweAmount", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 管理費 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="manageFee"
            label="管理費"
            type="number"
            error={!!errors.manageFee}
            {...register("manageFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 互助金 */}
        {/* <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="laborFee"
            label="互助金"
            type="number"
            error={!!errors.laborFee}
            {...register("laborFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid> */}

        {/* 計息方式???? */}
        {/* <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="healthyFee"
            label="計息方式"
            type="number"
            error={!!errors.healthyFee}
            {...register("healthyFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid> */}
        {/* 公會費 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="unionFee"
            label="公會費"
            type="number"
            error={!!errors.unionFee}
            {...register("unionFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 車貸款 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="loanFee"
            label="車貸款"
            type="number"
            error={!!errors.loanFee}
            {...register("loanFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 無習基準 ??*/}
        {/* <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="peopleHelpFee"
            label="無習基準"
            type="number"
            error={!!errors.peopleHelpFee}
            {...register("peopleHelpFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid> */}
        {/* 勞保費 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="laborInsuranceFee"
            label="勞保費"
            type="number"
            error={!!errors.laborInsuranceFee}
            {...register("laborInsuranceFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 保險費 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="insuranceFee"
            label="保險費"
            type="number"
            error={!!errors.insuranceFee}
            {...register("insuranceFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 計息金額 */}
        {/* <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="peopleHelpFee"
            label="計息金額"
            type="number"
            error={!!errors.peopleHelpFee}
            {...register("peopleHelpFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid> */}
        {/* 健保費 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="healthFee"
            label="健保費"
            type="number"
            error={!!errors.healthFee}
            {...register("healthFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 牌照稅 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="licenseTaxFee"
            label="牌照稅"
            type="number"
            error={!!errors.licenseTaxFee}
            {...register("licenseTaxFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 上月利息 */}
        {/* <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="peopleHelpFee"
            label="上月利息"
            type="number"
            error={!!errors.peopleHelpFee}
            {...register("peopleHelpFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid> */}
        {/* 準備金 */}
        {/* <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="peopleHelpFee"
            label="準備金"
            type="number"
            error={!!errors.peopleHelpFee}
            {...register("peopleHelpFee", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid> */}
        {/* 燃料稅 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="fuelTaxFee"
            label="燃料稅"
            type="number"
            error={!!errors.fuelTaxFee}
            {...register("fuelTaxFee", { required: true })}
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

        {/* 銷發票額 */}
        <Grid item xs={12} md={6}>
          <FieldWithDialog
            label="銷發票額"
            fieldName="invoiceSaleAmount"
            register={register}
            error={errors.invoiceSaleAmount}
            dialogContent={
              <Box>
                <InvoiceSaleAmountTable />
              </Box>
            }
          />
        </Grid>

        {/* 抵發票額 */}
        <Grid item xs={12} md={6}>
          <FieldWithDialog
            label="抵發票額"
            fieldName="invoiceOffsetAmount"
            register={register}
            error={errors.invoiceOffsetAmount}
            dialogContent={
              <Box>
                <LoanManagementTable />
              </Box>
            }
          />
        </Grid>

        {/* 抵油單額 */}
        <Grid item xs={12} md={6}>
          <FieldWithDialog
            label="抵油單額"
            fieldName="invoiceGasAmount"
            register={register}
            error={errors.invoiceGasAmount}
            dialogContent={
              <Box>
                <LoanManagementTable />
              </Box>
            }
          />
        </Grid>

        {/* 銷發票稅 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="invoiceSaleAmountTax"
            label="銷發票稅"
            type="number"
            error={!!errors.invoiceSaleAmountTax}
            {...register("invoiceSaleAmountTax", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 抵發稅額 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="receipTax"
            label="抵發稅額"
            type="number"
            error={!!errors.invoiceOffsetAmountTax}
            {...register("invoiceOffsetAmountTax", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 抵油單稅 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="invoiceGasAmountTax"
            label="抵發稅額"
            type="number"
            error={!!errors.invoiceGasAmountTax}
            {...register("invoiceGasAmountTax", { required: true })}
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

        {/* 借款金額 */}
        <Grid item xs={12} md={6}>
          <FieldWithDialog
            label="借款金額"
            fieldName="lendMoney"
            register={register}
            error={errors.lendMoney}
            dialogContent={
              <Box>
                <LoanManagementTable />
              </Box>
            }
          />
        </Grid>

        {/* 入款金額 */}
        <Grid item xs={12} md={6}>
          <FieldWithDialog
            label="入款金額"
            fieldName="giveBackMoney"
            register={register}
            error={errors.giveBackMoney}
            dialogContent={
              <Box>
                <LoanManagementTable />
              </Box>
            }
          />
        </Grid>
        {/* 其他應收 */}
        <Grid item xs={12} md={6}>
          <FieldWithDialog
            label="其他應收"
            fieldName="otherLendMoneyAmount"
            register={register}
            error={errors.otherLendMoneyAmount}
            dialogContent={
              <Box>
                <LoanManagementTable />
              </Box>
            }
          />
        </Grid>
        {/* 借款利息 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="lendMoneyInterest"
            label="借款利息"
            type="number"
            error={!!errors.lendMoneyInterest}
            {...register("lendMoneyInterest", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 入票利息 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="giveBackInterest"
            label="入票利息"
            type="number"
            error={!!errors.giveBackInterest}
            {...register("giveBackInterest", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 其他抵收 */}
        <Grid item xs={12} md={6}>
          <FieldWithDialog
            label="其他抵收"
            fieldName="otherGiveBackMoneyAmount"
            register={register}
            error={errors.otherGiveBackMoneyAmount}
            dialogContent={
              <Box>
                <LoanManagementTable />
              </Box>
            }
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

        {/* 代支利息 */}
        <Grid item xs={12} md={6}>
          <FieldWithDialog
            label="代支利息"
            fieldName="payInterest"
            register={register}
            error={errors.payInterest}
            dialogContent={
              <Box>
                <LoanManagementTable />
              </Box>
            }
          />
        </Grid>

        {/* 收據抵收 */}
        <Grid item xs={12} md={6}>
          <FieldWithDialog
            label="收據抵收"
            fieldName="receiveOffset"
            register={register}
            error={errors.receiveOffset}
            dialogContent={
              <Box>
                <LoanManagementTable />
              </Box>
            }
          />
        </Grid>

        {/* 入款退回 */}
        <Grid item xs={12} md={6}>
          <FieldWithDialog
            label="入款退回"
            fieldName="returnMoney"
            register={register}
            error={errors.returnMoney}
            dialogContent={
              <Box>
                <LoanManagementTable />
              </Box>
            }
          />
        </Grid>

        {/* 罰單 */}
        <Grid item xs={12} md={6}>
          <FieldWithDialog
            label="罰單"
            fieldName="trafficSum"
            register={register}
            error={errors.trafficSum}
            dialogContent={
              <Box>
                <LoanManagementTable />
              </Box>
            }
          />
        </Grid>
      </Grid>

      {/* 按鈕 */}
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} md={6}>
          {" "}
          <TextField
            disabled
            id="totalSum"
            label="本月欠款"
            type="number"
            error={!!errors.totalSum}
            {...register("totalSum", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 本月欠款 */}
      </Grid>
    </Box>
  );
};

export default LedgerForm;
