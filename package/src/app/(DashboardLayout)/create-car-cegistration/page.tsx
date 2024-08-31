"use client";
import React from "react";
import { Typography,Button } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Select, MenuItem } from "@mui/material";
import CarOwnerTable from "./components/CarOwnerTable";
import { useRouter } from "next/navigation";

function SamplePage() {
  // select
  const [searchItems, setSearchItems] = React.useState("1");
  const handleChange = (event: any) => {
    setSearchItems(event.target.value);
  };

  const router = useRouter();
  const handleAddNewClick = (id: any) => {
    router.push(`/create-car-cegistration/AddNew`);
    localStorage.setItem("carOwnerId", id);
  };


  return (
    <PageContainer title="車籍資料建立" description="this is Sample page">
      <DashboardCard title="車主資料">
        {/* xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 */}
        <Box sx={{ overflow: "auto", width: { xs: "400px", sm: "auto" } }}>
          <Box>
            <Select
              labelId="searchItems"
              id="searchItems"
              value={searchItems}
              size="small"
              onChange={handleChange}
              sx={{ marginRight: "1%" }}
            >
              <MenuItem value={1}>請選擇</MenuItem>
              <MenuItem value={2}>車主</MenuItem>
              <MenuItem value={3}>車牌</MenuItem>
            </Select>
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
          <CarOwnerTable />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
