"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import CarOwnerSetting from "../components/CarOwnerSettingForm";


const OwnerAdd = () => {
  return (
    <PageContainer title="" description="">
      <DashboardCard title="新增車主資料">
        <CarOwnerSetting mode="add" />
      </DashboardCard>
    </PageContainer>
  );
};

export default OwnerAdd;
