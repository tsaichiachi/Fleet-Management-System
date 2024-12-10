"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  useEffect(() => {
    // 檢查 localStorage 中是否存在 authToken
    const token = localStorage.getItem("authToken");

    if (!token) {
      // 如果沒有 token，跳轉到登入頁
      router.push("/authentication/login");
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            {children}
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
