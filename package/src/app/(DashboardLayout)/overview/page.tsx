"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import CarOwnerSetting from "../create-car-cegistration/components/CarOwnerSettingForm";
import PageTabs from "@/app/(DashboardLayout)/components/PageTabs";

const Overview = () => {
  return (
    <PageContainer title="車籍資料建立" description="this is Sample page">
      {/* <PageTabs /> */}
      <DashboardCard title="車主資料">
        <CarOwnerSetting />
      </DashboardCard>
    </PageContainer>
  );
};

export default Overview;
