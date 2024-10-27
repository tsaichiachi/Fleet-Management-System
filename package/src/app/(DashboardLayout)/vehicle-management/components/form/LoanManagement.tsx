//貸款管理表單
"use client";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FormControl from "@mui/material/Box";
import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface VehicleSettingProps {
  mode: string;
}

const LoanManagement: React.FC<VehicleSettingProps> = ({ mode }) => {
  console.log(mode);
  const router = useRouter();
  const handleCancelClick = (id: any) => {
    router.push(`/vehicle-management/${id}/LoanManagement`);
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
            id="outlined-loan-amount"
            label="貸款總額"
            type="number"
            autoComplete="off"
            error={!!errors.loanAmount}
            {...register("loanAmount", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-monthly-repayment"
            label="每月還款"
            type="number"
            autoComplete="off"
            error={!!errors.monthlyRepayment}
            {...register("monthlyRepayment", { required: true })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-monthly-repayment"
            label="是否入帳"
            type="number"
            autoComplete="off"
            error={!!errors.isEntry}
            {...register("isEntry", { required: true })}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            id="outlined-note"
            label="備註"
            type="text"
            autoComplete="off"
            multiline
            rows={4}
            error={!!errors.note}
            {...register("note")}
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


export default LoanManagement;
