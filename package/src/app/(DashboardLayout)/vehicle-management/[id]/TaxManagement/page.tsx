//稅金管理
"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import TaxManagementTable from "../../components/table/TaxManagementTable";

const TaxManagement = () => {
  // select
  const [searchItems, setSearchItems] = React.useState("1");
  const handleChange = (event: any) => {
    setSearchItems(event.target.value);
  };

  const router = useRouter();

  const id = 1;
  const handleAddNewClick = (id: any) => {
    router.push(`/vehicle-management/${id}/TaxManagement/AddNew`);
  };

  return (
    <PageContainer title="" description="">
      <DashboardCard title="">
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
              新增
            </Button>
          </Box>
          <TaxManagementTable />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default TaxManagement;
