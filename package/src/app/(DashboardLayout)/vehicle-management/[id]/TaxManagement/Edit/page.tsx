//貸款管理
"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import PageTabs from "@/app/(DashboardLayout)/components/PageTabs";
import LoanManagement from "../../../components/form/LoanManagement";
import TaxManagement from "../../../components/form/TaxManagement";

const Overview = () => {
  return (
    <PageContainer title="" description="">
      {/* <PageTabs /> */}
      <DashboardCard title="編輯稅金管理">
        <TaxManagement mode="edit" />
      </DashboardCard>
    </PageContainer>
  );
};

export default Overview;
