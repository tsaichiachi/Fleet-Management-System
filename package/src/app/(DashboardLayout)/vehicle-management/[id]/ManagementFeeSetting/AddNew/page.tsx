"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import ManagementFeeSettingForm from "../../../components/form/ManagementFeeSetting";

const OwnerAdd = () => {
  return (
    <PageContainer title="" description="">
      <DashboardCard title="管費管理_新增">
        <ManagementFeeSettingForm mode="add" />
      </DashboardCard>
    </PageContainer>
  );
};

export default OwnerAdd;
