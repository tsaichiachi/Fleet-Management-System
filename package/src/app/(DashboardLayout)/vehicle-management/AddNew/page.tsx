"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import VehicleSetting from "../components/form/VehicleSettingForm";


const OwnerAdd = () => {
  return (
    <PageContainer title="" description="">
      <DashboardCard title="新增車輛資料">
        <VehicleSetting mode="add"/>
      </DashboardCard>
    </PageContainer>
  );
};

export default OwnerAdd;
