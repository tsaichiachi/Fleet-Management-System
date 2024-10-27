"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import ManagementFeeSettingForm from "../../../components/form/ManagementFeeSetting";


const OwnerAdd = () => {
  return (
    <PageContainer title="" description="">
      <DashboardCard title="新增管費">
        <ManagementFeeSettingForm mode="add" />
      </DashboardCard>
    </PageContainer>
  );
};

export default OwnerAdd;
