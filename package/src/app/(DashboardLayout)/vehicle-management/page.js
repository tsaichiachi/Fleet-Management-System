"use client";
import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import VehicleTable from "./components/VehicleTable";
import { useGetCars } from "./apihooks";

function VehicleManagementPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const { data } = useGetCars();
  //console.log("Fetched car data:", data);

  // 處理搜尋按鈕點擊
  const handleSearchClick = () => {
    setQuery(search.trim());
  };

  // 根據搜尋條件篩選車輛列表
  const filteredCars = query
    ? data?.filter(
        (car) =>
          car.licenseNumber?.includes(query) || car.ownerName?.includes(query)
      )
    : data || [];

  const handleAddNewClick = () => {
    router.push(`/vehicle-management/AddNew`);
  };

  return (
    <PageContainer title="車籍管理" description="管理車籍相關資料">
      <DashboardCard title="車籍資料">
        <Box sx={{ overflow: "auto", width: { xs: "400px", sm: "auto" } }}>
          <Box>
            <TextField
              label="搜尋"
              id="outlined-size-small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{ marginRight: "1%", marginTop: "1%" }}
            />
            <Button
              variant="contained"
              sx={{ marginRight: "1%", marginTop: "1%" }}
              onClick={handleSearchClick}
            >
              搜尋
            </Button>
            <Button
              variant="contained"
              onClick={handleAddNewClick}
              sx={{ marginRight: "1%", marginTop: "1%" }}
            >
              新增車輛
            </Button>
          </Box>
          <VehicleTable data={filteredCars} />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
}

export default VehicleManagementPage;
