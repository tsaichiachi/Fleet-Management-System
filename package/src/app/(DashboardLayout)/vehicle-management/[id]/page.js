"use client";
import React, { useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { Tabs, Tab, Box } from "@mui/material";

const VehicleView = () => {
  // 狀態以管理選中的選項卡
  const [value, setValue] = useState(0);

  // 處理選項卡改變
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <PageContainer title="" description="">
      <DashboardCard title="">
        {/* 選項卡 */}
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} aria-label="vehicle tabs">
            <Tab label="管費設定" />
            <Tab label="保單管理" />
            <Tab label="貸款管理" />
            <Tab label="稅金管理" />
          </Tabs>
          {/* 根據選中的選項卡顯示內容 */}
          {value === 0 && <div>212121</div>} {/* 基本資料的內容 */}
          {value === 1 && <div>維護紀錄內容</div>} {/* 維護紀錄的內容 */}
          {value === 2 && <div>其他的內容</div>} {/* 其他的內容 */}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default VehicleView;
