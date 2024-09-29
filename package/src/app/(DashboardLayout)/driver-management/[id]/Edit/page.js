"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import CarOwnerSetting from "../../components/CarOwnerSettingForm";


const OwnerEdit = () => {
  return (
    <PageContainer title="車籍資料建立" description="this is Sample page">
      {/* <PageTabs /> */}
      <DashboardCard title="編輯車主資料">
        <CarOwnerSetting mode="edit" />
      </DashboardCard>
    </PageContainer>
  );
};

export default OwnerEdit;
