//管費管理ManagementFeeSetting
"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import PageTabs from "@/app/(DashboardLayout)/components/PageTabs";
import ManagementFeeSetting from "@/app/(DashboardLayout)/create-car-cegistration/components/form/ManagementFeeSetting";

const Overview = () => {
  return (
    <PageContainer title="車籍資料建立" description="this is Sample page">
      <PageTabs />
      <DashboardCard title="貸款管理">
        <ManagementFeeSetting />
      </DashboardCard>
    </PageContainer>
  );
};

export default Overview;
