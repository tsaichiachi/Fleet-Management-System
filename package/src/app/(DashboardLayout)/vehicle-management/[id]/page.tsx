"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { Tabs, Tab, Box } from "@mui/material";
import PolicyManagmentTable from "../components/table/PolicyManagementTable";
import PolicyManagement from "../components/form/PolicyManagement";
import LoanManagement from "../components/form/LoanManagement";
import LoanManagementTable from "../components/table/LoanManagementTable";
import ManagementFeeSettingForm from "../components/form/ManagementFeeSetting";
import ManagementFeeSettingTable from "../components/table/ManagementFeeSettingTable";
import TaxManagementTable from "../components/table/TaxManagementTable";

const VehicleView = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 狀態以管理選中的選項卡
  const [value, setValue] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 根據 URL 中的查詢參數設置選項卡的初始狀態
  useEffect(() => {
    if (isClient) {
      const tab = searchParams.get("tab");
      if (tab) {
        setValue(Number(tab));
      }
    }
  }, [isClient, searchParams]);

  // 處理選項卡改變
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (isClient) {
      router.push(`${pathname}?tab=${newValue}`);
    }
  };

  return (
    <PageContainer title="" description="">
      <DashboardCard title="">
        {/* 選項卡 */}
        <Box sx={{ width: "100%" }}>
          {/* <Tabs value={value} onChange={handleChange} aria-label="vehicle tabs">
            <Tab label="管費設定" />
            <Tab label="保單管理" />
            <Tab label="貸款管理" />
            <Tab label="稅金管理" />
          </Tabs> */}
          {/* 根據選中的選項卡顯示內容 */}
          {/* {value === 0 && (
            <div>
              <ManagementFeeSettingTable />
            </div>
          )}
          {value === 1 && (
            <div>
              <PolicyManagmentTable />
            </div>
          )}
          {value === 2 && (
            <div>
              <LoanManagementTable />
            </div>
          )}
          {value === 3 && (
            <div>
              <TaxManagementTable />{" "}
            </div>
          )} */}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default VehicleView;
