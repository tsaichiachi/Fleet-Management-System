//貸款管理
"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import PageTabs from "@/app/(DashboardLayout)/components/PageTabs";
import LoanManagement from "../../../components/form/LoanManagement";

const Overview = () => {
  return (
    <PageContainer title="車籍資料建立" description="this is Sample page">
      <PageTabs />
      <DashboardCard title="貸款管理">
        <LoanManagement />
      </DashboardCard>
    </PageContainer>
  );
};

export default Overview;
