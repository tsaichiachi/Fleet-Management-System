"use client";
import React, { useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import CarAgencyTable from "../vehicle-management/components/table/CarAgencyTable";

function DriverManagementPage() {
  

  return (
    <PageContainer title="車行管理" description="管理車行相關資料">
      <DashboardCard title="車行資料">
        <CarAgencyTable />
      </DashboardCard>
    </PageContainer>
  );
}

export default DriverManagementPage;
