"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import CarOwnerTable from "./components/CarOwnerTable";
import { useGetCarOwners } from "./apihooks";
import { CarOwnerProvider } from "./context/driverProvider";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CarAgencyTable from "../vehicle-management/components/table/CarAgencyTable";

function DriverManagementPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { data } = useGetCarOwners();
  const owners = data?.data?.pageList || [];

  // 處理搜尋按鈕點擊
  const handleSearchClick = () => {
    setQuery(search.trim());
  };

  // 根據搜尋條件篩選車主列表
  const filteredOwners = query
    ? owners.filter(
        (owner) => owner.name?.includes(query) || owner.idNum?.includes(query)
      )
    : owners;

  //console.log(filteredOwners);

  // 新增車主按鈕處理邏輯
  const handleAddNewClick = () => {
    router.push(`/driver-management/AddNew`);
  };

  //車行彈跳視窗
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  return (
    <PageContainer title="車主管理" description="管理車主相關資料">
      <DashboardCard title="車主資料">
        <CarOwnerProvider>
          <Box sx={{ overflow: "auto", width: { xs: "400px", sm: "auto" } }}>
            {/* 搜尋框與按鈕 */}
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
                新增車主
              </Button>
              <Button
                variant="contained"
                onClick={handleOpenDialog}
                sx={{ marginRight: "1%", marginTop: "1%" }}
              >
                車行
              </Button>
            </Box>
            {/* 車主列表 */}
            <CarOwnerTable data={filteredOwners} />
          </Box>
        </CarOwnerProvider>
      </DashboardCard>
      {/* Modal for Insurance Company */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>車行列表</DialogTitle>
        <DialogContent><CarAgencyTable /></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>關閉</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}

export default DriverManagementPage;
