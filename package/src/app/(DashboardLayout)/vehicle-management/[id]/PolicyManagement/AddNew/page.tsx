"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import PolicyManagementForm from "../../../components/form/PolicyManagement";

const PolicyManagementAdd = () => {
  return (
    <PageContainer title="" description="">
      <DashboardCard title="保單管理_新增">
        <PolicyManagementForm mode="add" />
      </DashboardCard>
    </PageContainer>
  );
};

export default PolicyManagementAdd;
