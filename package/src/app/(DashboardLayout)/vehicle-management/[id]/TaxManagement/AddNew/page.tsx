"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import TaxManagement from "../../../components/form/TaxManagement";


const OwnerAdd = () => {
  return (
    <PageContainer title="" description="">
      <DashboardCard title="新增稅金管理">
        <TaxManagement mode="add" />
      </DashboardCard>
    </PageContainer>
  );
};

export default OwnerAdd;
