"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useGetMonthBill } from "../../apihooks";
import TaiwanYearMonthPickerSample from "../TaiwanDatePickerSample";
import FieldWithDialog from "../FieldWithDialog";
import InvoiceSaleAmountTable from "../table/invoiceSaleAmountTable";
import axios from "axios";
import BorrowingAmountTable from "../table/BorrowingAmountTable";
import DepositAmountTable from "../table/DepositAmountTable";
import OtherReceivablesTable from "../table/OtherReceivablesTable";
import OtherCreditsTable from "../table/OtherCreditsTable";
import InterestPaymentTable from "../table/InterestPaymentTable"; 
import ReceiptOffsetTable from "../table/ReceiptOffsetTable";
import DepositRefundTable from "../table/DepositRefundTable";
import TrafficTicketTable from "../table/TrafficTicketTable";
import InvoiceGasAmountTable from "../table/invoiceGasAmountTable";
import InvoiceOffectAmountTable from "../table/invoiceOffectAmountTable";


const LedgerForm = () => {
  const router = useRouter();
  const [carLicenseNum, setCarLicenseNum] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [searchParams, setSearchParams] = useState(null);
  //console.log("searchParams", searchParams);
  const [selectedBillDate, setSelectedBillDate] = useState(""); // 用於追蹤選擇的年月份
  const [isSearched, setIsSearched] = useState(false); // 用於追蹤是否已點擊搜尋
  //console.log("isSearched", isSearched);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const licenseNum = localStorage.getItem("licenseNumber");
    const owner = localStorage.getItem("ownerName");

    if (licenseNum && owner) {
      setCarLicenseNum(licenseNum);
      setOwnerName(owner);
    } else {
      console.error("車牌和車主不存在 localStorage");
    }
  }, []);

  const { data: monthBillData, refetch } = useGetMonthBill(searchParams);
  //console.log(monthBillData);

  useEffect(() => {
    if (monthBillData) {
      Object.entries(monthBillData).forEach(([key, value]) => {
        setValue(key, value || "");
      });
    }
  }, [monthBillData, setValue]);

  const onSubmit = (data) => {
    const params = {
      carLicenseNum,
      ownerName,
      billDate: data.billDate,
    };
    setSearchParams(params);
    setIsSearched(true); // 設置為已搜尋
    refetch();
  };
  //console.log("searchParams", searchParams);
  //下載
  const handleDownload = async () => {
    if (!searchParams) {
      alert("請先輸入年月份");
      return;
    }
    try {
      const requestData = {
        carLicenseNum,
        billDateList: [searchParams?.billDate],
        print: "Y",
      };

      //console.log("Request data:", requestData);

      const response = await axios.post(
        "http://127.0.0.1:8082/bill/monthBillDetail",
        requestData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `車輛總帳明細_${carLicenseNum}_${searchParams?.billDate}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("下載成功");
    } catch (error) {
      console.error("下載失敗:", error);

      // 尝试解析错误详细信息
      if (error.response?.data) {
        const errorBlob = error.response.data;
        const errorText = await errorBlob.text();
        console.error("Error details:", JSON.parse(errorText));
      }

      alert("下載失敗，請稍後重試");
    }
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
            disabled
            required
            id="ownerName"
            label="車主"
            value={ownerName}
            error={!!errors.ownerName}
            {...register("ownerName", { required: false })}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        {/* 年月份 */}
        <Grid item xs={12} md={6}>
          <TaiwanYearMonthPickerSample
            label="年月份"
            fieldName="billDate"
            required={true}
            defaultValue=""
            onChange={(value) => {
              setValue("billDate", value);
              trigger("billDate");
              setSelectedBillDate(value); // 更新選擇的年月份
              setIsSearched(false); // 重置為未搜尋狀態
            }}
            error={!!errors.billDate}
            register={register}
            trigger={trigger}
          />
        </Grid>
        {/* 搜尋和下載按鈕 */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* 搜尋按鈕與下載區塊 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px", // 按鈕與說明文字之間的間距
              
            }}
          >
            {/* 搜尋按鈕 */}
            <Button variant="contained" type="submit">
              搜尋
            </Button>

            {/* 說明文字與下載按鈕 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                border: "1px solid #f0f0f0",
                padding: "5px",
                
              }}
            >
              <span>欲下載帳單請先進行年月份搜尋</span>
              <Button
                variant="contained"
                onClick={handleDownload}
                disabled={
                  !searchParams || selectedBillDate !== searchParams?.billDate
                }
              >
                {isSearched && searchParams
                  ? `下載${searchParams.billDate}帳單`
                  : "下載帳單"}
              </Button>
            </Box>
          </Box>
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
            type="text"
            error={!!errors.lastMonthOweAmount}
            {...register("lastMonthOweAmount", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 管理費 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="manageFee"
            label="管理費"
            type="text"
            error={!!errors.manageFee}
            {...register("manageFee", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 互助金 */}
        {/* <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="laborFee"
            label="互助金"
            type="text"
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
            type="text"
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
            type="text"
            error={!!errors.unionFee}
            {...register("unionFee", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 車貸款 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="loanFee"
            label="車貸款"
            type="text"
            error={!!errors.loanFee}
            {...register("loanFee", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 無習基準 ??*/}
        {/* <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="peopleHelpFee"
            label="無習基準"
            type="text"
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
            type="text"
            error={!!errors.laborInsuranceFee}
            {...register("laborInsuranceFee", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 保險費 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="insuranceFee"
            label="保險費"
            type="text"
            error={!!errors.insuranceFee}
            {...register("insuranceFee", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 計息金額 */}
        {/* <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="peopleHelpFee"
            label="計息金額"
            type="text"
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
            type="text"
            error={!!errors.healthFee}
            {...register("healthFee", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 牌照稅 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="licenseTaxFee"
            label="牌照稅"
            type="text"
            error={!!errors.licenseTaxFee}
            {...register("licenseTaxFee", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 上月利息 */}
        {/* <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="peopleHelpFee"
            label="上月利息"
            type="text"
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
            type="text"
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
            type="text"
            error={!!errors.fuelTaxFee}
            {...register("fuelTaxFee", { required: false })}
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
                <InvoiceSaleAmountTable
                  carLicenseNum={carLicenseNum}
                  type={"SALE"}
                  expenseYearMonth={searchParams?.billDate}
                  refetch={refetch}
                />
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
            type="text"
            error={!!errors.invoiceSaleAmountTax}
            {...register("invoiceSaleAmountTax", { required: false })}
            InputLabelProps={{ shrink: true }}
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
                <InvoiceOffectAmountTable
                  carLicenseNum={carLicenseNum}
                  type={"OFFSET"}
                  expenseYearMonth={searchParams?.billDate}
                  refetch={refetch}
                />
              </Box>
            }
          />
        </Grid>
        {/* 抵發稅額 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="receipTax"
            label="抵發稅額"
            type="text"
            error={!!errors.invoiceOffsetAmountTax}
            {...register("invoiceOffsetAmountTax", { required: false })}
            InputLabelProps={{ shrink: true }}
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
                <InvoiceGasAmountTable
                  carLicenseNum={carLicenseNum}
                  type={"GAS"}
                  expenseYearMonth={searchParams?.billDate}
                  refetch={refetch}
                />
              </Box>
            }
          />
        </Grid>

        {/* 抵油單稅 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="invoiceGasAmountTax"
            label="抵發稅額"
            type="text"
            error={!!errors.invoiceGasAmountTax}
            {...register("invoiceGasAmountTax", { required: false })}
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
                <BorrowingAmountTable
                  carLicenseNum={carLicenseNum}
                  // type={"CASH"}
                  expenseYearMonth={searchParams?.billDate}
                  refetch={refetch}
                />
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
            type="text"
            error={!!errors.lendMoneyInterest}
            {...register("lendMoneyInterest", { required: false })}
            InputLabelProps={{ shrink: true }}
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
                <DepositAmountTable
                  carLicenseNum={carLicenseNum}
                  // type={"GAS"}
                  expenseYearMonth={searchParams?.billDate}
                  refetch={refetch}
                />
              </Box>
            }
          />
        </Grid>
        {/* 入款利息 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            id="giveBackInterest"
            label="入款利息"
            type="text"
            error={!!errors.giveBackInterest}
            {...register("giveBackInterest", { required: false })}
            InputLabelProps={{ shrink: true }}
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
                <OtherReceivablesTable
                  carLicenseNum={carLicenseNum}
                  // type={"GAS"}
                  expenseYearMonth={searchParams?.billDate}
                  refetch={refetch}
                />
              </Box>
            }
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
                <OtherCreditsTable
                  carLicenseNum={carLicenseNum}
                  // type={"GAS"}
                  expenseYearMonth={searchParams?.billDate}
                  refetch={refetch}
                />
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
                <InterestPaymentTable
                  carLicenseNum={carLicenseNum}
                  // type={"GAS"}
                  expenseYearMonth={searchParams?.billDate}
                  refetch={refetch}
                />
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
                <ReceiptOffsetTable
                  carLicenseNum={carLicenseNum}
                  // type={"GAS"}
                  expenseYearMonth={searchParams?.billDate}
                  refetch={refetch}
                />
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
                <DepositRefundTable
                  carLicenseNum={carLicenseNum}
                  // type={"GAS"}
                  expenseYearMonth={searchParams?.billDate}
                  refetch={refetch}
                />
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
                <TrafficTicketTable
                  carLicenseNum={carLicenseNum}
                  // type={"GAS"}
                  expenseYearMonth={searchParams?.billDate}
                  refetch={refetch}
                />
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
            type="text"
            error={!!errors.totalSum}
            {...register("totalSum", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LedgerForm;
