"use client";
import React, { useState, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";

const Loading = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300); // 延遲 300 毫秒後顯示
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null; // 不顯示任何內容
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // 全頁面垂直置中
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
