//保單管理
"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PolicyManagmentTable from "./components/PolicyManagementTable";

const PolicyManagement = () => {
  const [value, setValue] = React.useState("one");
  const handleChangePage = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <PageContainer title="車籍資料建立" description="this is Sample page">
      <DashboardCard title="保單管理">
        <PolicyManagmentTable />
      </DashboardCard>
    </PageContainer>
  );
};

export default PolicyManagement;
