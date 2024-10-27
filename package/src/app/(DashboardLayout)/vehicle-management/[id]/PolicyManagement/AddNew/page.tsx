"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import PolicyManagementForm from "../../../components/form/PolicyManagement";

const PolicyManagementAdd = () => {
  return (
    <PageContainer title="" description="">
      <DashboardCard title="新增保單管理">
        <PolicyManagementForm mode="add" />
      </DashboardCard>
    </PageContainer>
  );
};

export default PolicyManagementAdd;
