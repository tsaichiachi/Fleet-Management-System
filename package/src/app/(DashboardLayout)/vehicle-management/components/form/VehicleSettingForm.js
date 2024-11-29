"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TaiwanDatePicker from "../TaiwanDatePicker";
import { useAddCars, useGetCarOwnerDropDownList } from "../../apihooks";
import {
  MenuItem,
} from "@mui/material";

const VehicleSetting = ({ mode }) => {
  //console.log("VehicleSetting mode:", mode);
  const router = useRouter();
  const { mutate: addCar } = useAddCars();
  const { data: carOwners } = useGetCarOwnerDropDownList();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //console.log(data);
    if (mode === "add") {
      const submissionData = {
        ...data,
        joinAmount: data.joinAmount ? parseInt(data.joinAmount, 10) : null,
        quitAmount: data.quitAmount ? parseInt(data.quitAmount, 10) : null,
        westYear: data.westYear ? parseInt(data.westYear, 10) : null,
        inspectionType: data.inspectionType
          ? parseInt(data.inspectionType, 10)
          : null,
      };
      addCar(submissionData, {
        onSuccess: () => {
          console.log("新增成功！");
          router.push(`/vehicle-management`); // 新增成功後跳轉列表頁
        },
        onError: (error) => {
          console.error("新增失敗：", error);
        },
      });
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
        {/* 車牌號碼和車主 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="licenseNumber"
            label="車牌號碼"
            type="text"
            error={!!errors.licenseNumber}
            {...register("licenseNumber", { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            required
            label="車主"
            error={!!errors.ownerName}
            {...register("ownerName", { required: true })}
            fullWidth
            disabled={mode === "view"}
          >
            {carOwners?.map((owner) => (
              <MenuItem key={owner.key} value={owner.value}>
                {`${owner.name}`}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="carAgency"
            label="車行"
            type="text"
            error={!!errors.carAgency}
            {...register("carAgency", { required: true })}
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
        {/* 遷入日期和遷入金額 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="遷入日期"
            fieldName="joinDate"
            required={true}
            defaultValue=""
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
            type="number"
            error={!!errors.joinAmount}
            {...register("joinAmount", { required: false })}
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
          />
        </Grid>
        {/* 遷出日期和遷出金額 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="遷出日期"
            fieldName="quitDate"
            required={false}
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
        <Grid item xs={12} md={6}>
          <TextField
            id="quitAmount"
            label="遷出金額"
            type="number"
            error={!!errors.quitAmount}
            {...register("quitAmount", { required: false })}
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
          />
        </Grid>
        <Grid item xs={12} md={12}></Grid>
        {/* 發照日期和出廠年月 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="發照日期"
            fieldName="licenseIssueDate"
            required={true}
            defaultValue=""
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
          <TextField
            required
            id="manufactureDate"
            label="出廠年月(YYY-MM)"
            type="text"
            error={!!errors.manufactureDate}
            {...register("manufactureDate", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="westYear"
            label="年份(YYYY)"
            type="number"
            error={!!errors.westYear}
            {...register("westYear", { required: true })}
          />
        </Grid>

        {/* 廠牌 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="brand"
            label="廠牌"
            type="text"
            error={!!errors.brand}
            {...register("brand", { required: true })}
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
          />
        </Grid>
        {/* 驗車日期 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="驗車日期"
            fieldName="inspectionDate"
            required={true}
            defaultValue=""
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
            defaultValue=""
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
          />
        </Grid>
        {/* 車重 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="carWeight"
            label="車重"
            type="text"
            error={!!errors.carWeight}
            {...register("carWeight", { required: true })}
          />
        </Grid>

        {/* 載重 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="loadingWeight"
            label="載重 (噸)"
            type="text"
            error={!!errors.loadingWeight}
            {...register("loadingWeight", { required: true })}
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
          />
        </Grid>
        {/* 驗車方式 */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="inspectionType"
            label="驗車方式(:1:半/5 2:1/1 3:無)"
            type="number"
            error={!!errors.inspectionType}
            {...register("inspectionType", { required: true })}
          />
        </Grid>

        {/* 超載到期 */}
        <Grid item xs={12} md={6}>
          <TaiwanDatePicker
            label="超載到期"
            fieldName="violationDate"
            required={false}
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
