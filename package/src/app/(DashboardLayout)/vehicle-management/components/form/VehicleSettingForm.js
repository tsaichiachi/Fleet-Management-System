"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TaiwanDatePicker from "../TaiwanDatePicker";
import { useAddCars, useGetCarOwnerDropDownList } from "../../apihooks";
import { MenuItem } from "@mui/material";
import { useGetCar, useEditCars } from "../../apihooks";
import TaiwanYearMonthPickerSample from "../TaiwanDatePickerSample";
import { useGetCarAgencyDropDownList } from "../../apihooks";

const VehicleSetting = ({ mode }) => {
  //console.log("VehicleSetting mode:", mode);
  const router = useRouter();
  const { mutate: addCar } = useAddCars();
  const { mutate: editCar } = useEditCars();
  const { data: carOwners } = useGetCarOwnerDropDownList();
  const { data: carAgency } = useGetCarAgencyDropDownList();
  //console.log("carAgency:", carAgency);
  const [carLicenseNum, setCarLicenseNum] = useState("");
  //console.log("carLicenseNum:", carLicenseNum);
  const { data: car } = useGetCar(mode === "add" ? null : carLicenseNum, mode);
  //console.log("car:", car)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    //console.log("data:", data);
    const submissionData = {
      ...data,
      inspectionType: data.inspectionType
        ? parseInt(data.inspectionType, 10)
        : null,
    };

    if (mode === "add") {
      addCar(submissionData, {});
      
    } else if (mode === "edit") {
      editCar({ ...submissionData, carLicenseNum });
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
    if (mode === "add") {
      reset();
    } else if (mode === "edit" && car) {
      Object.entries(car).forEach(([key, value]) => {
        setValue(key, value || "");
      });
    }
  }, [mode, car, reset, setValue]);
 

  useEffect(() => {
    if (car) {
      setValue("ownerName", car.ownerName || "");
    }
  }, [car, setValue]);

  //console.log("errors:", errors.joinDate);

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
        {/* 車牌號碼和車主 */}
        <Grid item xs={12} md={6}>
          <TextField
            disabled={mode === "edit"}
            required
            id="licenseNumber"
            label="車牌"
            type="text"
            error={!!errors.licenseNumber}
            {...register("licenseNumber", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            required
            value={watch("ownerName") || ""}
            onChange={(e) => setValue("ownerName", e.target.value)}
            label="車主"
            error={!!errors.ownerName}
            {...register("ownerName", { required: true })}
            fullWidth
            disabled={mode === "view"}
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="" disabled>
              請選擇
            </MenuItem>
            {carOwners?.map((owner) => (
              <MenuItem key={owner.key} value={owner.name}>
                {`${owner.name}`}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            required
            value={watch("carAgency") || ""}
            onChange={(e) => setValue("carAgency", e.target.value)}
            label="車行"
            error={!!errors.carAgency}
            {...register("carAgency", { required: true })}
            fullWidth
            disabled={mode === "view"}
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="" disabled>
              請選擇
            </MenuItem>
            {carAgency?.map((Agency) => (
              <MenuItem key={Agency.key} value={Agency.name}>
                {`${Agency.name}`}
              </MenuItem>
            ))}
          </TextField>
          {/* <TextField
            required
            id="carAgency"
            label="車行"
            type="text"
            error={!!errors.carAgency}
            {...register("carAgency", { required: true })}
            InputLabelProps={{ shrink: true }}
          /> */}
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
        {/* 遷入日期和遷入金額 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="遷入日期"
            fieldName="joinDate"
            required={true}
            defaultValue={mode === "edit" ? car?.joinDate || "" : ""}
            onChange={(value) => {
              setValue("joinDate", value);
              trigger("joinDate");
            }}
            error={!!errors.joinDate}
            register={register}
            trigger={trigger}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="joinAmount"
            label="遷入金額"
            type="text"
            error={!!errors.joinAmount}
            {...register("joinAmount", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 車料來源 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="carFrom"
            label="車輛來源"
            type="text"
            error={!!errors.carFrom}
            {...register("carFrom", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 遷出日期和遷出金額 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="遷出日期"
            fieldName="quitDate"
            required={false}
            defaultValue={mode === "edit" ? car?.quitDate || "" : ""}
            onChange={(value) => {
              setValue("quitDate", value);
              trigger("quitDate");
            }}
            error={!!errors.quitDate}
            register={register}
            trigger={trigger}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="quitAmount"
            label="遷出金額"
            type="text"
            error={!!errors.quitAmount}
            {...register("quitAmount", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 遷出地點 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="quitPlace"
            label="遷出地點"
            type="text"
            error={!!errors.quitPlace}
            {...register("quitPlace", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={12}></Grid>
        {/* 發照日期和出廠年月 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="發照日期"
            fieldName="licenseIssueDate"
            required={true}
            defaultValue={mode === "edit" ? car?.licenseIssueDate || "" : ""}
            onChange={(value) => {
              setValue("licenseIssueDate", value);
              trigger("licenseIssueDate");
            }}
            error={!!errors.licenseIssueDate}
            register={register}
            trigger={trigger}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TaiwanYearMonthPickerSample
            label="出廠年月(YYY-MM)"
            fieldName="manufactureYearMonth"
            required={true}
            defaultValue={
              mode === "edit" ? car?.manufactureYearMonth || "" : ""
            }
            onChange={(value) => {
              setValue("manufactureYearMonth", value);
              trigger("manufactureYearMonth");
            }}
            error={!!errors.billDate}
            register={register}
            trigger={trigger}
          />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="westYear"
            label="年份(YYYY)"
            type="text"
            error={!!errors.westYear}
            {...register("westYear", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid> */}

        {/* 廠牌 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="brand"
            label="廠牌"
            type="text"
            error={!!errors.brand}
            {...register("brand", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 噸位CC數 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="ton"
            label="噸位"
            type="text"
            error={!!errors.ton}
            {...register("ton", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cc"
            label="CC數"
            type="text"
            error={!!errors.cc}
            {...register("cc", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 引擎號碼 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="engineNum"
            label="引擎號碼"
            type="text"
            error={!!errors.engineNum}
            {...register("engineNum", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 驗車日期 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="驗車日期"
            fieldName="inspectionDate"
            required={true}
            defaultValue={mode === "edit" ? car?.inspectionDate || "" : ""}
            onChange={(value) => {
              setValue("inspectionDate", value);
              trigger("inspectionDate");
            }}
            error={!!errors.inspectionDate}
            register={register}
            trigger={trigger}
          />
        </Grid>
        {/* 換照日期 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="換照日期"
            fieldName="renewLicenseDate"
            required={true}
            defaultValue={mode === "edit" ? car?.renewLicenseDate || "" : ""}
            onChange={(value) => {
              setValue("renewLicenseDate", value);
              trigger("renewLicenseDate");
            }}
            error={!!errors.renewLicenseDate}
            register={register}
            trigger={trigger}
          />
        </Grid>
        {/* 車身式樣 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="carTypeOutlooking"
            label="車身式樣"
            type="text"
            error={!!errors.carTypeOutlooking}
            {...register("carTypeOutlooking", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 通行證 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="passLicense"
            label="通行證"
            type="text"
            error={!!errors.passLicense}
            {...register("passLicense", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 車重 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="carWeight"
            label="車重(噸)"
            type="text"
            error={!!errors.carWeight}
            {...register("carWeight", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* 載重 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="loadingWeight"
            label="載重 (噸)"
            type="text"
            error={!!errors.loadingWeight}
            {...register("loadingWeight", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 車輛種類 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="carType"
            label="車輛種類"
            type="text"
            error={!!errors.carType}
            {...register("carType", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 驗車方式 */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            required
            value={watch("inspectionType") || ""}
            onChange={(e) => setValue("inspectionType", e.target.value)}
            label="驗車方式"
            error={!!errors.carAgency}
            {...register("inspectionType", { required: true })}
            fullWidth
            disabled={mode === "view"}
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="" disabled>
              請選擇
            </MenuItem>
            <MenuItem value={1}>半年</MenuItem>
            <MenuItem value={2}>一年</MenuItem>
            <MenuItem value={3}>無</MenuItem>
          </TextField>
          {/* <TextField
            required
            id="inspectionType"
            label="驗車方式(:1:半/5 2:1/1 3:無)"
            type="text"
            error={!!errors.inspectionType}
            {...register("inspectionType", { required: true })}
            InputLabelProps={{ shrink: true }}
          /> */}
        </Grid>

        {/* 超載到期 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="超載到期"
            fieldName="violationDate"
            required={false}
            defaultValue={mode === "edit" ? car?.violationDate || "" : ""}
            onChange={(value) => {
              setValue("violationDate", value);
              trigger("violationDate");
            }}
            error={!!errors.violationDate}
            register={register}
            trigger={trigger}
          />
        </Grid>

        {/* 報停日期 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="報停日期"
            fieldName="reportStopDate"
            required={false}
            defaultValue={mode === "edit" ? car?.reportStopDate || "" : ""}
            onChange={(value) => {
              setValue("reportStopDate", value);
              trigger("reportStopDate");
            }}
            error={!!errors.reportStopDate}
            register={register}
            trigger={trigger}
          />
        </Grid>

        {/* 報銷日期 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="報銷日期"
            fieldName="reportScrapDate"
            required={false}
            defaultValue={mode === "edit" ? car?.reportScrapDate || "" : ""}
            onChange={(value) => {
              setValue("reportScrapDate", value);
              trigger("reportScrapDate");
            }}
            error={!!errors.reportScrapDate}
            register={register}
            trigger={trigger}
          />
        </Grid>

        {/* 舊車牌號 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="oldLicenseNumber"
            label="舊車牌號"
            type="text"
            error={!!errors.oldLicenseNumber}
            {...register("oldLicenseNumber", { required: false })}
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
        {/* 備註 */}
        <Grid item xs={12}>
          <TextField
            id="note1"
            fullWidth
            label="備註1"
            multiline
            rows={4}
            error={!!errors.note1}
            {...register("note1", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="note2"
            fullWidth
            label="備註2"
            multiline
            rows={4}
            error={!!errors.note2}
            {...register("note2", { required: false })}
            InputLabelProps={{ shrink: true }}
          />
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
      </Grid>
    </Box>
  );
};

export default VehicleSetting;
