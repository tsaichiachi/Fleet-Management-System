"use client";
import React, { useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

import InsuranceCompanyTable from "../vehicle-management/components/table/InsuranceCompanyTable";

function DriverManagementPage() {
  

  return (
    <PageContainer title="保險公司管理" description="管理保險公司相關資料">
      <DashboardCard title="保險公司資料">
        <InsuranceCompanyTable />
      </DashboardCard>
    </PageContainer>
  );
}

export default DriverManagementPage;
