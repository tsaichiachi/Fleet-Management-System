"use client";
import { styled, Container, Box, Tabs, Tab } from "@mui/material";
import React, { useState , useEffect} from "react";
import { useRouter,usePathname } from "next/navigation";

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

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(0);

const id = 1; 
const Tabitem = [
  {
    label: "管費設定",
    url: `/vehicle-management/${id}/ManagementFeeSetting`,
  },
  {
    label: "保單管理",
    url: `/vehicle-management/${id}/PolicyManagement`,
  },
  {
    label: "貸款管理",
    url: `/vehicle-management/${id}/LoanManagement`,
  },
  {
    label: "稅金管理",
    url: `/vehicle-management/${id}/TaxManagement`,
  },
];

const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
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
