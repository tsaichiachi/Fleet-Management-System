"use client";
import { styled, Container, Box, Tabs, Tab } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(0);
  const [licenseNumber, setLicenseNumber] = useState("");
  console.log(licenseNumber);

  // Tabs 配置
  const Tabitem = useMemo(
    () => [
      {
        label: "管費設定",
        url: `/vehicle-management/${licenseNumber}/ManagementFeeSetting`,
      },
      {
        label: "保單管理",
        url: `/vehicle-management/${licenseNumber}/PolicyManagement`,
      },
      {
        label: "貸款管理",
        url: `/vehicle-management/${licenseNumber}/LoanManagement`,
      },
      {
        label: "車輛總帳",
        url: `/vehicle-management/${licenseNumber}/Ledger`,
      },
    ],
    [licenseNumber]
  );


  // Tab 切換處理
  const handleTabChange = (event, newValue) => {
    const storedLicenseNumber = localStorage.getItem("licenseNumber");
    if (storedLicenseNumber) {
      setLicenseNumber(storedLicenseNumber);
    }
    setValue(newValue);
    router.push(Tabitem[newValue].url);
  };

  // 從 LocalStorage 取得車牌號碼
  useEffect(() => {
    const storedLicenseNumber = localStorage.getItem("licenseNumber");
    if (storedLicenseNumber) {
      setLicenseNumber(storedLicenseNumber);
    } else {
      setLicenseNumber(""); 
    }
  }, [pathname]); 

  const shouldRenderTabs = !(
    pathname === "/vehicle-management" ||
    pathname === "/vehicle-management/AddNew" ||
    pathname.match(/\/vehicle-management\/[^/]+\/Edit$/) || // 確保 Edit 頁面不顯示 Tabs
    !licenseNumber
  );

  // 更新當前選中的 Tab
  useEffect(() => {
    if (licenseNumber) {
      const currentIndex = Tabitem.findIndex((item) =>
        pathname.includes(item.url)
      );
      setValue(currentIndex !== -1 ? currentIndex : 0);
    }
  }, [pathname, licenseNumber]);



  return (
    <MainWrapper className="mainwrapper">
      <PageWrapper className="page-wrapper">
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          {shouldRenderTabs && (
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="vehicle tabs"
            >
              {Tabitem.map((item, index) => (
                <Tab key={index} label={item.label} />
              ))}
            </Tabs>
          )}
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
