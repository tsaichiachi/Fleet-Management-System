//貸款管理
"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import TaxManagement from "../../../components/form/TaxManagement";

const Overview = () => {
  return (
    <PageContainer title="" description="">
      <DashboardCard title="稅金管理_編輯">
        <TaxManagement mode="edit" />
      </DashboardCard>
    </PageContainer>
  );
};

export default Overview;
