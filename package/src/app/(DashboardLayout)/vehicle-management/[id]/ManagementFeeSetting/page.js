//管費設定ManagementFeeSetting
"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Box from "@mui/material/Box";
import ManagementFeeSettingForm from "../../components/form/ManagementFeeSetting";

const ManagementFeeSetting = () => {
   
  return (
    <PageContainer title="" description="">
      <DashboardCard title="">
        {/* xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 */}
        <Box sx={{  width: { xs: "400px", sm: "auto" } }}>
          <Box>
            <ManagementFeeSettingForm />
          </Box>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ManagementFeeSetting;
