"use client";
import React from "react";
import { Typography,Button } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import VehicleTable from "./components/VehicleTable";

function DriverManagementPage() {
  // select
  const [searchItems, setSearchItems] = React.useState("1");
  const handleChange = (event: any) => {
    setSearchItems(event.target.value);
  };

  const router = useRouter();
  const handleAddNewClick = (id: any) => {
    router.push(`/vehicle-management/AddNew`);
    localStorage.setItem("carOwnerId", id);
  };


  return (
    <PageContainer title="" description="">
      <DashboardCard title="車籍資料">
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
              新增車輛
            </Button>
          </Box>
          <VehicleTable />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default DriverManagementPage;
