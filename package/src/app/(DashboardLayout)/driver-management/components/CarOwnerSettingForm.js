import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, MenuItem } from "@mui/material";
import TaiwanDatePicker from "../../vehicle-management/components/TaiwanDatePicker";
import { useAddCarOwner, useEditCarOwner } from "../apihooks";
import { useGetCarOwnerInfo } from "../../vehicle-management/apihooks";

const CarOwnerSetting = ({ mode }) => {
  const router = useRouter();
  const { id } = useParams(); // 從網址獲取車主 ID
  const carOwnerId = mode === "edit" || mode === "view" ? id : null;

  console.log("carOwnerId from URL:", carOwnerId);

  const { data: carOwnerInfo, isLoading } = useGetCarOwnerInfo(carOwnerId);
  const { mutate: addCarOwner } = useAddCarOwner();
  const { mutate: editCarOwner } = useEditCarOwner();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    watch,
  } = useForm();

  // 當 carOwnerInfo 變更時，更新表單資料
  useEffect(() => {
    if (carOwnerId && carOwnerInfo) {
      Object.entries(carOwnerInfo).forEach(([key, value]) => {
        if (value !== undefined) setValue(key, value);
      });
    }
  }, [carOwnerId, carOwnerInfo, setValue]);

  // 清除新增模式下的性別與生日
  useEffect(() => {
    if (mode === "add") {
      setValue("sex", "");
      setValue("birthday", "");
    }
  }, [mode, setValue]);

  const onSubmit = (formData) => {
    if (mode === "add") {
      const submissionData = {
        ...formData,
        idNum: formData.idNum || "defaultID",
      };
      addCarOwner(submissionData, {
        onSuccess: () => router.push(`/driver-management`),
        onError: (error) => alert("新增失敗，請檢查輸入資料！"),
      });
    } else if (mode === "edit") {
      const submissionData = {
        ...formData,
        id: parseInt(carOwnerId || "0", 10),
      };
      editCarOwner(submissionData, {
        onSuccess: () => router.push(`/driver-management`),
        onError: (error) => console.error("編輯失敗：", error),
      });
    }
  };

  const handleCancelClick = () => {
    router.push(`/driver-management`);
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
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            label="姓名"
            {...register("name", { required: true })}
            fullWidth
            error={!!errors.name}
            disabled={mode === "view"}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="idNum"
            label="身分證字號"
            {...register("idNum", { required: true })}
            fullWidth
            error={!!errors.idNum}
            disabled={mode === "view"}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="性別"
            defaultValue={carOwnerInfo?.sex || ""}
            onChange={(e) => setValue("sex", e.target.value)}
            error={!!errors.sex}
            {...register("sex")}
            fullWidth
            disabled={mode === "view"}
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="" disabled>
              請選擇
            </MenuItem>
            <MenuItem value="Male">男</MenuItem>
            <MenuItem value="Female">女</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TaiwanDatePicker
            label="生日"
            fieldName="birthday"
            required={true}
            defaultValue={mode === "add" ? "" : carOwnerInfo?.birthday || ""}
            onChange={(value) => {
              setValue("birthday", value || undefined, {
                shouldValidate: true,
              }); // 空字串轉換成 undefined
              trigger("birthday");
            }}
            error={!!errors.birthday}
            // helperText={errors.birthday ? "此欄位為必填" : ""}
            register={register("birthday", { required: "生日為必填欄位" })}
            trigger={trigger}
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone1"
            label="電話1"
            required
            {...register("phone1", { required: true })}
            fullWidth
            disabled={mode === "view"}
            InputLabelProps={{ shrink: true }}
            error={!!errors.phone1}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone2"
            label="電話2"
            {...register("phone2")}
            fullWidth
            disabled={mode === "view"}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="mobile"
            label="手機"
            {...register("mobile")}
            fullWidth
            disabled={mode === "view"}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="fax"
            label="傳真"
            {...register("fax")}
            fullWidth
            disabled={mode === "view"}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            label="通訊地址"
            {...register("address")}
            fullWidth
            disabled={mode === "view"}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="mailAddress"
            label="戶籍地址"
            {...register("mailAddress")}
            fullWidth
            disabled={mode === "view"}
            InputLabelProps={{ shrink: true }}
          />
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
      </Grid>
    </Box>
  );
};

export default CarOwnerSetting;
