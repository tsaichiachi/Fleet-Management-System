"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import CarOwnerSetting from "../components/CarOwnerSettingForm";


const OwnerAdd = () => {
  return (
    <PageContainer title="車籍資料建立" description="this is Sample page">
      <DashboardCard title="新增車主資料">
        <CarOwnerSetting />
      </DashboardCard>
    </PageContainer>
  );
};

export default OwnerAdd;
