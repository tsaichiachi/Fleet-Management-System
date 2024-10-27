"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import ManagementFeeSettingForm from "../../../components/form/ManagementFeeSetting";
import LoanManagement from "../../../components/form/LoanManagement";


const OwnerAdd = () => {
  return (
    <PageContainer title="" description="">
      <DashboardCard title="新增貸款">
        <LoanManagement mode="add" />
      </DashboardCard>
    </PageContainer>
  );
};

export default OwnerAdd;
