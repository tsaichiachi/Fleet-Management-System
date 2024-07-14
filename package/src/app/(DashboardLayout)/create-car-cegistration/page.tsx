"use client";
import { Typography,Button } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CarOwnerSetting from "./components/form/CarOwnerSetting";
import CarOwner from "./components/table/CarOwnerTable";

import LoanManagement from "./components/form/LoanManagement";
import PolicyManagement from "./components/form/PolicyManagement";
import PolicyManagmentDetail from "./components/table/PolicyManagementTable";
import TaxManagementDetail from "./components/table/TaxManagementTable";


const SamplePage = () => {
  return (
    <PageContainer title="車籍資料建立" description="this is Sample page">
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
            <Button variant="contained">新增車主</Button>
          </Box>
          <h3>車主列表</h3>
          <CarOwner />
          <CarOwnerSetting />
          <h3>保單管理</h3>
          <PolicyManagmentDetail />
          <PolicyManagement />
          <h3>貸款管理</h3>
          <TaxManagementDetail />
        </Box>
      </DashboardCard>
    </PageContainer>
    //
  );
};

export default SamplePage;
