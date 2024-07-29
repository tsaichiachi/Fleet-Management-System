//管費設定表單
"use client";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ManagementFeeSettingForm = () => {
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
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%", maxWidth: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ width: "100%" }}>
        <TextField
          id="outlined-password-input"
          label="車牌"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="車主"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="計算方式"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="無息基準"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="管理費"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="公會費"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="勞保費"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="健保費"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="準備金"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="互助金"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="銷項稅率"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="進項稅率"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="油單稅率"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="欠款利息"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="收據稅率"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="上牌照稅"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="下牌照稅"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="春燃料費"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="夏燃料費"
          type=" "
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="秋燃料費"
          type=" "
          autoComplete="current-password"
        />

        <div>
          <TextField
            id="outlined-password-input"
            label="冬燃料費"
            type=" "
            autoComplete="current-password"
            style={{ width: "75%" }}
          />
          <FormControl style={{ width: "20%" }}>
            <InputLabel id="demo-simple-select-label">月份</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchMonth}
              label="Age"
              onChange={handleChange}
            >
              {monthNames.map((month, index) => (
                <MenuItem key={index} value={index + 1}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <TextField
          id="outlined-password-input"
          label="備註"
          type=" "
          autoComplete="current-password"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" sx={{ marginRight: "1%" }}>
          取消
        </Button>
        <Button variant="contained">儲存</Button>
      </div>
    </Box>
  );
};

export default ManagementFeeSettingForm;
