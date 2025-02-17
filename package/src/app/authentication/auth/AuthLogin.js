import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import {
  useLogin,
  useGetPublicKey,
} from "@/app/(DashboardLayout)/vehicle-management/apihooks";
import JSEncrypt from "jsencrypt";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";

const AuthLogin = ({ title, subtitle, subtext }) => {
  const router = useRouter();


  // 使用狀態管理使用者輸入
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // 提示訊息
  const [messageType, setMessageType] = useState(""); // 訊息類型 ("success" 或 "error")

  const { mutate: login, isLoading } = useLogin();
  const { data: publicKeyData, isLoading: isPublicKeyLoading } =
    useGetPublicKey();

  // const encryptPassword = (password) => {
  //   const hashedPassword = sha256(password).toString(Base64); // 先做 SHA-256 雜湊
  //   const encrypt = new JSEncrypt();
  //   encrypt.setPublicKey(publicKeyData);
  //   return encrypt.encrypt(hashedPassword);
  // };


  const encryptPassword = (password) => {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKeyData);
    const base64Password = btoa(password); // 先做 Base64 編碼
    return encrypt.encrypt(base64Password);
  };


  // 登入邏輯
  const handleLogin = () => {
    if (!publicKeyData) {
      setMessage("登入驗證失敗，請重新整理頁面或稍後再試");
      setMessageType("error");
      return;
    }

    const encryptedPassword = encryptPassword(password);
    if (!encryptedPassword) {
      setMessage("密碼加密失敗，請重試");
      setMessageType("error");
      return;
    }

    console.log("加密後的密碼", encryptedPassword);

    login(
      { userId, password: encryptedPassword },
      {
        onSuccess: (response) => {
          if (response.code === "G_0000") {
            setMessage("登入成功");
            setMessageType("success");

            // 儲存 token
            localStorage.setItem("authToken", response.data.token);

            // 2 秒後跳轉到 `driver-management`
            setTimeout(() => {
              router.push("/driver-management");
            }, 2000);
          } else {
            setMessage("帳號或密碼錯誤");
            setMessageType("error");

            setTimeout(() => {
              setMessage("");
            }, 2000);
          }
        },
        onError: (error) => {
          setMessage(`登入失敗：${error.message}`);
          setMessageType("error");

          setTimeout(() => {
            setMessage("");
          }, 2000);
        },
      }
    );
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
            htmlFor="userId"
            mb="5px"
          >
            帳號
          </Typography>
          <CustomTextField
            variant="outlined"
            fullWidth
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
