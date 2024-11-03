//管費管理ManagementFeeSetting
"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import PolicyManagementForm from "../../../components/form/PolicyManagement";

const PolicyManagementEdit = () => {
  return (
    <PageContainer title="" description="">
      <DashboardCard title="保費管理_編輯">
        <PolicyManagementForm mode="edit" />
      </DashboardCard>
    </PageContainer>
  );
};

export default PolicyManagementEdit;
