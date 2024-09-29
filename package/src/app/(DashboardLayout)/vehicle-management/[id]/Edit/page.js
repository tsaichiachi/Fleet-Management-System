"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import VehicleSetting from "../../components/VehicleSettingForm";


const VehicleEdit = () => {
  return (
    <PageContainer title="" description="">
      {/* <PageTabs /> */}
      <DashboardCard title="編輯車籍資料">
        <VehicleSetting />
      </DashboardCard>
    </PageContainer>
  );
};

export default VehicleEdit;
