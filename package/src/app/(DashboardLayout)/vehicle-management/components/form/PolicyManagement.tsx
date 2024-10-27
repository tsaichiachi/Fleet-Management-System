//保單管理表單
"use client";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface VehicleSettingProps {
  mode: string;
}

const PolicyManagement: React.FC<VehicleSettingProps> = ({ mode }) => {
  console.log(mode);
  const router = useRouter();
  const handleCancelClick = (id: any) => {
    router.push(`/vehicle-management/${id}/PolicyManagement`);
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
            id="outlined-insurance-company"
            label="保險公司"
            type="text"
            autoComplete="off"
            error={!!errors.insuranceCompany}
            {...register("insuranceCompany", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-start-date"
            label="起日"
            type="date"
            InputLabelProps={{ shrink: true }}
            autoComplete="off"
            error={!!errors.startDate}
            {...register("startDate", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-end-date"
            label="止日"
            type="date"
            InputLabelProps={{ shrink: true }}
            autoComplete="off"
            error={!!errors.endDate}
            {...register("endDate", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-entry-month"
            label="入帳月"
            type="month"
            InputLabelProps={{ shrink: true }}
            autoComplete="off"
            error={!!errors.entryMonth}
            {...register("entryMonth", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-premium"
            label="保費"
            type="number"
            autoComplete="off"
            error={!!errors.premium}
            {...register("premium", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-insurance-type"
            label="保險種類"
            type="text"
            autoComplete="off"
            error={!!errors.insuranceType}
            {...register("insuranceType", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-policy-number"
            label="保單號碼"
            type="text"
            autoComplete="off"
            error={!!errors.policyNumber}
            {...register("policyNumber", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-insurance-card-data"
            label="保卡資料"
            type="text"
            autoComplete="off"
            error={!!errors.insuranceCardData}
            {...register("insuranceCardData", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-refund-date"
            label="退日"
            type="date"
            InputLabelProps={{ shrink: true }}
            autoComplete="off"
            error={!!errors.refundDate}
            {...register("refundDate", { required: true })}
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




export default PolicyManagement;
