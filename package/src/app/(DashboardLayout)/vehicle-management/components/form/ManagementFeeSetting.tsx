"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Grid, MenuItem, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import TaiwanDatePicker from "../TaiwanDatePicker";
import { useRouter } from "next/navigation";

interface VehicleSettingProps {
  mode: string;
}

const ManagementFeeSettingForm: React.FC<VehicleSettingProps> = ({ mode }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  // 燃料費月份狀態
  const [springMonth, setSpringMonth] = useState("");
  const [summerMonth, setSummerMonth] = useState("");
  const [autumnMonth, setAutumnMonth] = useState("");
  const [winterMonth, setWinterMonth] = useState("");

  const handleCancelClick = (id: any) => {
    router.push(`/vehicle-management/${id}/ManagementFeeSetting`);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
        {/* 車牌號碼 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="車牌號碼"
            error={!!errors.plateNumber}
            {...register("plateNumber", { required: true })}
          />
        </Grid>

        {/* 計算方式 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="計算方式"
            error={!!errors.calculationMethod}
            {...register("calculationMethod", { required: true })}
          />
        </Grid>

        {/* 無息基準 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="無息基準"
            error={!!errors.noInterestBasis}
            {...register("noInterestBasis", { required: true })}
          />
        </Grid>

        {/* 管理費 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="管理費"
            error={!!errors.managementFee}
            {...register("managementFee", { required: true })}
          />
        </Grid>

        {/* 勞保費 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="勞保費"
            error={!!errors.laborInsuranceFee}
            {...register("laborInsuranceFee", { required: true })}
          />
        </Grid>

        {/* 健保費 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="健保費"
            error={!!errors.healthInsuranceFee}
            {...register("healthInsuranceFee", { required: true })}
          />
        </Grid>

        {/* 銷項稅率 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="銷項稅率"
            error={!!errors.outputTaxRate}
            {...register("outputTaxRate", { required: true })}
          />
        </Grid>

        {/* 進項稅率 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="進項稅率"
            error={!!errors.inputTaxRate}
            {...register("inputTaxRate", { required: true })}
          />
        </Grid>

        {/* 油單稅率 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="油單稅率"
            error={!!errors.oilTaxRate}
            {...register("oilTaxRate", { required: true })}
          />
        </Grid>

        {/* 上牌照稅 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="上牌照稅"
            error={!!errors.upperLicenseTax}
            {...register("upperLicenseTax", { required: true })}
          />
        </Grid>

        {/* 下牌照稅 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="下牌照稅"
            error={!!errors.lowerLicenseTax}
            {...register("lowerLicenseTax", { required: true })}
          />
        </Grid>

        {/* 春燃料費 */}
        <Grid container spacing={2} alignItems="center" item xs={12} md={12}>
          <Grid item xs={9}>
            <TextField
              required
              label="春燃料費"
              error={!!errors.springFuelFee}
              {...register("springFuelFee", { required: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth error={!!errors.springMonth}>
              <InputLabel id="springMonth-label">月份</InputLabel>
              <Select
                labelId="springMonth-label"
                value={springMonth}
                onChange={(e) => setSpringMonth(e.target.value)}
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
              required
              label="夏燃料費"
              error={!!errors.summerFuelFee}
              {...register("summerFuelFee", { required: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth error={!!errors.summerMonth}>
              <InputLabel id="summerMonth-label">月份</InputLabel>
              <Select
                labelId="summerMonth-label"
                value={summerMonth}
                onChange={(e) => setSummerMonth(e.target.value)}
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
              required
              label="秋燃料費"
              error={!!errors.autumnFuelFee}
              {...register("autumnFuelFee", { required: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth error={!!errors.autumnMonth}>
              <InputLabel id="autumnMonth-label">月份</InputLabel>
              <Select
                labelId="autumnMonth-label"
                value={autumnMonth}
                onChange={(e) => setAutumnMonth(e.target.value)}
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

        {/* 冬燃料費 */}
        <Grid container spacing={2} alignItems="center" item xs={12} md={12}>
          <Grid item xs={9}>
            <TextField
              required
              label="冬燃料費"
              error={!!errors.winterFuelFee}
              {...register("winterFuelFee", { required: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth error={!!errors.winterMonth}>
              <InputLabel id="winterMonth-label">月份</InputLabel>
              <Select
                labelId="winterMonth-label"
                value={winterMonth}
                onChange={(e) => setWinterMonth(e.target.value)}
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
