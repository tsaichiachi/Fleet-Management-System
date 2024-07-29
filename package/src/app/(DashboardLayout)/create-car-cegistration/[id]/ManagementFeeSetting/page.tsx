//管費設定ManagementFeeSetting
"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import CarOwnerSetting from "../../components/form/CarOwnerSetting";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ManagementFeeSettingTable from "../../components/table/ManagementFeeSettingTable";
import ManagementFeeSettingForm from "../../components/form/ManagementFeeSetting";

const ManagementFeeSetting = () => {
  const [value, setValue] = React.useState("one");
  const handleChangePage = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <PageContainer title="車籍資料建立" description="this is Sample page">
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChangePage}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="車籍資料" />
          <Tab value="two" label="管費設定" />
          <Tab value="three" label="保單管理" />
          <Tab value="four" label="貸款管理" />
          <Tab value="five" label="稅金管理" />
        </Tabs>
      </Box>
      <DashboardCard title="管費設定">
        <ManagementFeeSettingForm />
      </DashboardCard>
    </PageContainer>
  );
};

export default ManagementFeeSetting;
