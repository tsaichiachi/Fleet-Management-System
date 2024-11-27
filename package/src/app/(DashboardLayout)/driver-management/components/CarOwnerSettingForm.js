import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import TaiwanDatePicker from "../../vehicle-management/components/TaiwanDatePicker";
import { useAddCarOwner, useEditCarOwner } from "../apihooks";


const CarOwnerSetting = ({ mode, data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carOwnerId = searchParams.get("id");

  const { mutate: addCarOwner } = useAddCarOwner();
  const { mutate: editCarOwner } = useEditCarOwner(); // 引入修改車主的 API

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  // 編輯模式或檢視模式預填表單數據
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && carOwnerId && data) {
      const owner = data.find((owner) => owner.id === parseInt(carOwnerId));
      if (owner) {
        Object.entries(owner).forEach(([key, value]) => {
          setValue(key, value || ""); // 填充表單數據
        });
      }
    }
  }, [mode, carOwnerId, data, setValue]);

  const onSubmit = (formData) => {
    if (mode === "add") {
      const submissionData = {
        ...formData,
        idNum: formData.idNum || "defaultID",
      };
      addCarOwner(submissionData, {
        onSuccess: () => {
          console.log("新增成功！");
          router.push(`/driver-management`); // 新增成功後跳轉列表頁
        },
        onError: (error) => {
          console.error("新增失敗：", error);
        },
      });
    } else if (mode === "edit") {
      const submissionData = {
        ...formData,
        id: parseInt(carOwnerId), // 確保包含車主 ID
      };
      editCarOwner(submissionData, {
        onSuccess: () => {
          console.log("編輯成功！");
          router.push(`/driver-management`); // 編輯成功後跳轉列表頁
        },
        onError: (error) => {
          console.error("編輯失敗：", error);
        },
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="性別"
            {...register("sex")}
            fullWidth
            disabled={mode === "view"}
          >
            <MenuItem value="male">男</MenuItem>
            <MenuItem value="female">女</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TaiwanDatePicker
            label="生日"
            fieldName="birthday"
            required={true}
            defaultValue=""
            onChange={(value) => {
              setValue("birthday", value);
              trigger("birthday");
            }}
            error={!!errors.birthday}
            register={register}
            trigger={trigger}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone1"
            label="電話1"
            {...register("phone1")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone2"
            label="電話2"
            {...register("phone2")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="mobile"
            label="手機"
            {...register("mobile")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="fax"
            label="傳真"
            {...register("fax")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            label="通訊地址"
            {...register("address")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="mailAddress"
            label="戶籍地址"
            {...register("mailAddress")}
            fullWidth
            disabled={mode === "view"}
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
