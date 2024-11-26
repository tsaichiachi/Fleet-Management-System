import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TaiwanDatePicker from "../../vehicle-management/components/TaiwanDatePicker";
import { useAddCarOwner } from "../apihooks";



interface CarOwnerSettingProps {
  mode: string; 
}

const CarOwnerSetting: React.FC<CarOwnerSettingProps> = ({ mode }) => {
  console.log(mode);
  const router = useRouter();
   const { mutate: addCarOwner } = useAddCarOwner();
  const handleCancleClick = () => {
    router.push(`/driver-management`);
  };

    const {
      register,
      handleSubmit,
      setValue,
      trigger,
      formState: { errors },
    } = useForm();

  const onSubmit = (data: any) => {
    //console.log("提交的資料：", data);

    // 使用 API 新增車主
    addCarOwner(data, {
      onSuccess: () => {
        console.log("新增成功！");
        router.push(`/driver-management`); // 成功後跳轉到列表頁
      },
      onError: (error) => {
        console.error("新增失敗：", error);
      },
    });
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
            id="outlined-name"
            label="姓名"
            {...register("name", { required: true })}
            fullWidth
            error={!!errors.name} // 顯示錯誤狀態
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="性別"
            {...register("gender")}
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
            fieldName="birthDate"
            required={true} // 必填
            defaultValue=""
            onChange={(value) => {
              setValue("birthDate", value);
              trigger("birthDate");
            }}
            error={!!errors.birthDate} // 動態顯示錯誤樣式
            //helperText={errors.entryDate?.message} // 顯示錯誤訊息
            register={register}
            trigger={trigger}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-company"
            label="車行"
            {...register("company")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-phone1"
            label="電話1"
            {...register("phone1")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-phone2"
            label="電話2"
            {...register("phone2")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-mobile"
            label="手機"
            {...register("mobile")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-fax"
            label="傳真"
            {...register("fax")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-address1"
            label="通訊地址"
            {...register("address1")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-address2"
            label="戶籍地址"
            {...register("address2")}
            fullWidth
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-notes"
            label="備註"
            multiline
            rows={4}
            {...register("notes")}
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
                onClick={handleCancleClick}
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
