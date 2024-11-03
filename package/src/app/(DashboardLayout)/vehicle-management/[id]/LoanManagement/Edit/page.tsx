//貸款管理
"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import LoanManagement from "../../../components/form/LoanManagement";

const Overview = () => {
  return (
    <PageContainer title="" description="">
      <DashboardCard title="貸款管理_編輯">
        <LoanManagement mode="edit" />
      </DashboardCard>
    </PageContainer>
  );
};

export default Overview;
