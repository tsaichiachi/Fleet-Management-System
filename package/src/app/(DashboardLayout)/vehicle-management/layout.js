"use client";
import { styled, Container, Box, Tabs, Tab } from "@mui/material";
import React, { useState, useEffect } from "react";
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

  // 從LocalStorage取得車牌號碼
  useEffect(() => {
    const storedLicenseNumber = localStorage.getItem("licenseNumber");
    if (storedLicenseNumber) {
      setLicenseNumber(storedLicenseNumber);
    } else {
      console.error("在 LocalStorage 中未找到車牌號碼");
    }
  }, []);

  const Tabitem = [
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
    // {
    //   label: "稅金管理",
    //   url: `/vehicle-management/${licenseNumber}/TaxManagement`,
    // },
    {
      label: "車輛總帳",
      url: `/vehicle-management/${licenseNumber}/Ledger`,
    },
  ];

  useEffect(() => {
    const currentIndex = Tabitem.findIndex((item) =>
      pathname.includes(item.url)
    );
    if (currentIndex !== -1) {
      setValue(currentIndex);
    }
  }, [pathname, licenseNumber]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    router.push(Tabitem[newValue].url);
  };

  const shouldRenderTabs = !(
    pathname === "/vehicle-management" ||
    pathname === "/vehicle-management/AddNew" ||
    pathname.match(/\/vehicle-management\/\d+\/Edit/)
  );

  return (
    <MainWrapper className="mainwrapper">
      <PageWrapper className="page-wrapper">
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          {shouldRenderTabs && licenseNumber && (
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
