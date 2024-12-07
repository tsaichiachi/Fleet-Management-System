"use client";
import React, { useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

import LoanCompanyTable from "../vehicle-management/components/table/LoanCompanyTable";

function DriverManagementPage() {
  

  return (
    <PageContainer title="貸款公司管理" description="管理貸款公司相關資料">
      <DashboardCard title="貸款公司資料">
        <LoanCompanyTable />
      </DashboardCard>
    </PageContainer>
  );
}

export default DriverManagementPage;
