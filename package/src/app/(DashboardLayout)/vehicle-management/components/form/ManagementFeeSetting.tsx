//管費設定表單
"use client";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface VehicleSettingProps {
  mode: string;
}

const ManagementFeeSettingForm:React.FC<VehicleSettingProps> = ({ mode }) => {
  console.log(mode);
  const router = useRouter();
  const handleCancelClick = (id: any) => {
    router.push(`/vehicle-management/${id}/ManagementFeeSetting`);
  };

  // select
  const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];
  const [searchMonth, setSearchMonth] = React.useState("1");
  const handleChange = (event: any) => {
    setSearchMonth(event.target.value);
  };

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
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
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-password-input"
            label="車牌"
            type="text "
            autoComplete="current-password"
            error={!!errors.plateNumber} // 顯示錯誤狀態
            {...register("plateNumber", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="owner-name"
            label="車主"
            type="text"
            autoComplete="current-password"
            error={!!errors.ownerName}
            {...register("ownerName", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-calculation-method"
            label="計算方式"
            type="text"
            autoComplete="off"
            error={!!errors.calculationMethod}
            {...register("calculationMethod", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-no-interest-basis"
            label="無息基準"
            type="text"
            autoComplete="off"
            error={!!errors.noInterestBasis}
            {...register("noInterestBasis", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-management-fee"
            label="管理費"
            type="text"
            autoComplete="off"
            error={!!errors.managementFee}
            {...register("managementFee", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-association-fee"
            label="公會費"
            type="text"
            autoComplete="off"
            error={!!errors.associationFee}
            {...register("associationFee", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-labor-insurance-fee"
            label="勞保費"
            type="text"
            autoComplete="off"
            error={!!errors.laborInsuranceFee}
            {...register("laborInsuranceFee", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-health-insurance-fee"
            label="健保費"
            type="text"
            autoComplete="off"
            error={!!errors.healthInsuranceFee}
            {...register("healthInsuranceFee", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-reserve-fund"
            label="準備金"
            type="text"
            autoComplete="off"
            error={!!errors.reserveFund}
            {...register("reserveFund", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-mutual-aid-fund"
            label="互助金"
            type="text"
            autoComplete="off"
            error={!!errors.mutualAidFund}
            {...register("mutualAidFund", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-output-tax-rate"
            label="銷項稅率"
            type="text"
            autoComplete="off"
            error={!!errors.outputTaxRate}
            {...register("outputTaxRate", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-input-tax-rate"
            label="進項稅率"
            type="text"
            autoComplete="off"
            error={!!errors.inputTaxRate}
            {...register("inputTaxRate", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-oil-tax-rate"
            label="油單稅率"
            type="text"
            autoComplete="off"
            error={!!errors.oilTaxRate}
            {...register("oilTaxRate", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-debt-interest"
            label="欠款利息"
            type="text"
            autoComplete="off"
            error={!!errors.debtInterest}
            {...register("debtInterest", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-receipt-tax-rate"
            label="收據稅率"
            type="text"
            autoComplete="off"
            error={!!errors.receiptTaxRate}
            {...register("receiptTaxRate", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-license-tax-up"
            label="上牌照稅"
            type="text"
            autoComplete="off"
            error={!!errors.licenseTaxUp}
            {...register("licenseTaxUp", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-license-tax-down"
            label="下牌照稅"
            type="text"
            autoComplete="off"
            error={!!errors.licenseTaxDown}
            {...register("licenseTaxDown", { required: true })}
          />
        </Grid>

        <Grid container spacing={2} alignItems="center" item xs={12} md={12}>
          <Grid item xs={9}>
            <TextField
              id="outlined-winter-fuel-fee"
              label="春燃料費"
              type="text"
              autoComplete="off"
              fullWidth
              error={!!errors.springFuelFee}
              {...register("springFuelFee", { required: true })}
            />
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth error={!!errors.winterFuelFee}>
              <InputLabel id="select-month-label">月份</InputLabel>
              <Select
                labelId="select-month-label"
                id="select-month"
                value={searchMonth}
                label="月份"
                onChange={handleChange}
              >
                {monthNames.map((month, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* 夏燃料費 */}
        <Grid container spacing={2} alignItems="center" item xs={12} md={12}>
          <Grid item xs={9}>
            <TextField
              id="outlined-winter-fuel-fee"
              label="夏燃料費"
              type="text"
              autoComplete="off"
              fullWidth
              error={!!errors.summerFuelFee}
              {...register("summerFuelFee", { required: true })}
            />
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth error={!!errors.winterFuelFee}>
              <InputLabel id="select-month-label">月份</InputLabel>
              <Select
                labelId="select-month-label"
                id="select-month"
                value={searchMonth}
                label="月份"
                onChange={handleChange}
              >
                {monthNames.map((month, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* 秋燃料費 */}
        <Grid container spacing={2} alignItems="center" item xs={12} md={12}>
          <Grid item xs={9}>
            <TextField
              id="outlined-winter-fuel-fee"
              label="秋燃料費"
              type="text"
              autoComplete="off"
              fullWidth
              error={!!errors.autumnFuelFee}
              {...register("autumnFuelFee", { required: true })}
            />
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth error={!!errors.winterFuelFee}>
              <InputLabel id="select-month-label">月份</InputLabel>
              <Select
                labelId="select-month-label"
                id="select-month"
                value={searchMonth}
                label="月份"
                onChange={handleChange}
              >
                {monthNames.map((month, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" item xs={12} md={12}>
          <Grid item xs={9}>
            <TextField
              id="outlined-winter-fuel-fee"
              label="冬燃料費"
              type="text"
              autoComplete="off"
              fullWidth
              error={!!errors.winterFuelFee}
              {...register("winterFuelFee", { required: true })}
            />
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth error={!!errors.winterFuelFee}>
              <InputLabel id="select-month-label">月份</InputLabel>
              <Select
                labelId="select-month-label"
                id="select-month"
                value={searchMonth}
                label="月份"
                onChange={handleChange}
              >
                {monthNames.map((month, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            required
            id="outlined-note"
            label="備註"
            type="text"
            autoComplete="off"
            error={!!errors.note}
            {...register("note", { required: true })}
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

export default ManagementFeeSettingForm;
