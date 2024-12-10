import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import Cookies from "js-cookie";

const AuthLogin = ({ title, subtitle, subtext }) => {
  const router = useRouter();

  // 定義預設帳號和密碼
  const DEFAULT_USERNAME = "admin";
  const DEFAULT_PASSWORD = "123";

  // 使用狀態管理使用者輸入
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // 提示訊息
  const [messageType, setMessageType] = useState(""); // 訊息類型 ("success" 或 "error")

  // 登入邏輯
  const handleLogin = () => {
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
      // 登入成功
      setMessage("登入成功");
      setMessageType("success");
       localStorage.setItem("authToken", "fake-token-123");

      // 5 秒後轉跳到主頁
      setTimeout(() => {
        router.push("/driver-management"); // 目標頁面
      }, 2000);
    } else {
      // 登入失敗
      setMessage("帳號或密碼錯誤");
      setMessageType("error");

      // 2秒後清除提示訊息
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <>
      {subtext}

      {/* 顯示提示訊息 */}
      {message && (
        <Typography
          color={messageType === "success" ? "green" : "error"}
          mt={2}
          textAlign="center"
        >
          {message}
        </Typography>
      )}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            帳號
          </Typography>
          <CustomTextField
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            密碼
          </Typography>
          <CustomTextField
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      </Stack>

      <Box mt={2}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleLogin} // 綁定登入邏輯
        >
          登入
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
