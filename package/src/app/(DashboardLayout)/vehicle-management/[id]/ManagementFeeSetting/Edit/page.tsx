//管費管理ManagementFeeSetting
"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import ManagementFeeSettingForm from "../../../components/form/ManagementFeeSetting";

const ManagementFeeSettingEdit = () => {
  return (
    <PageContainer title="" description="">
      <DashboardCard title="編輯管費">
        <ManagementFeeSettingForm mode="edit" />
      </DashboardCard>
    </PageContainer>
  );
};

export default ManagementFeeSettingEdit;
