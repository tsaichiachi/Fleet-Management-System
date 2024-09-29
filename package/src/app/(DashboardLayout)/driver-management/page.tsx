"use client";
import React from "react";
import { Typography,Button } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import CarOwnerTable from "./components/CarOwnerTable";

function DriverManagementPage() {
  const router = useRouter();
  const handleAddNewClick = (id: any) => {
    router.push(`/driver-management/AddNew`);
    localStorage.setItem("carOwnerId", id);
  };

  return (
    <PageContainer title="" description="">
      <DashboardCard title="車主資料">
        {/* xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 */}
        <Box sx={{ overflow: "auto", width: { xs: "400px", sm: "auto" } }}>
          <Box>
            <TextField
              label=""
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{ marginRight: "1%" }}
            />
            <Button variant="contained" sx={{ marginRight: "1%" }}>
              搜尋
            </Button>
            <Button variant="contained" onClick={handleAddNewClick}>
              新增車主
            </Button>
          </Box>
          <CarOwnerTable/>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default DriverManagementPage;
