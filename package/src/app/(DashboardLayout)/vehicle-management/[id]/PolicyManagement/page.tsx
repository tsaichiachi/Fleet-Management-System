//保單管理
"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Box from "@mui/material/Box";
import PolicyManagmentTable from "../../components/table/PolicyManagementTable";
import { useRouter } from "next/navigation";
import { Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";

const PolicyManagement = () => {
  // select
  const [searchItems, setSearchItems] = React.useState("1");
  const handleChange = (event: any) => {
    setSearchItems(event.target.value);
  };

  const router = useRouter();

  const id = 1;
  const handleAddNewClick = (id: any) => {
    router.push(`/vehicle-management/${id}/PolicyManagement/AddNew`);
  };

  return (
    <PageContainer title="" description="">
      <DashboardCard title="">
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
          <PolicyManagmentTable />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default PolicyManagement;
