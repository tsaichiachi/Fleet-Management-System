"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import VehicleSetting from "../../components/form/VehicleSettingForm";



const VehicleEdit = () => {
  return (
    <PageContainer title="" description="">
      <DashboardCard title="編輯車籍資料">
        <VehicleSetting mode="edit" />
      </DashboardCard>
    </PageContainer>
  );
};

export default VehicleEdit;
