"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Typography, Button, Box, TextField, Pagination } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import VehicleTable from "./components/VehicleTable";
import { requestHttp } from "@/utils/requestHttp";
import { useRouter } from "next/navigation";

function VehicleManagementPage() {
  const router = useRouter();

  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1); // 當前頁碼
  const [pageSize, setPageSize] = useState(2);
  const [searchName, setSearchName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0); // 總筆數

  // 整合 API 請求參數
  const fetchParams = useMemo(
    () => ({ page: currentPage, size: pageSize, name: searchName }),
    [currentPage, pageSize, searchName]
  );

  // 呼叫 API 獲取車輛資料
  const fetchCars = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { page, size, name } = fetchParams;
      const response = await requestHttp("car/searchCarByLicenseNum", {
        method: "POST",
        data: {
          page: page,
          size: size,
          licenseNumber: name || "",
        },
      });

      const total = response.data?.total || 0;
      setCars(response.data?.pageList || []);
      setTotalPages(Math.ceil(total / pageSize));
      setTotalRecords(total);
    } catch (err) {
      console.error("Error fetching car:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始化獲取車輛資料
  useEffect(() => {
    fetchCars();
  }, [fetchParams]);

  // 搜尋條件變更處理
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // 處理搜尋按鈕點擊
  const handleSearchClick = () => {
    setCurrentPage(1); // 重置分頁
    setSearchName(searchInput.trim());
  };

  // 分頁變更
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    const startIndex = (value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = cars.slice(startIndex, endIndex);
    setCars(currentPageData);
  };

  // 新增車輛按鈕點擊
  const handleAddNewClick = () => {
    router.push(`/vehicle-management/AddNew`);
  };

  return (
    <PageContainer title="車籍管理" description="管理車籍相關資料">
      <DashboardCard
        title="車籍資料"
        sx={{ width: "100%", maxWidth: "100%", margin: "0 auto" }}
      >
        <Box
          sx={{
            width: "100%",
            overflow: "auto",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* 搜尋框與按鈕 */}
          <Box sx={{ width: "100%", mt: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  label="搜尋"
                  id="outlined-size-small"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  size="small"
                />
                <Button variant="contained" onClick={handleSearchClick}>
                  搜尋
                </Button>
                <Button variant="contained" onClick={handleAddNewClick}>
                  新增車輛
                </Button>
              </Box>
              <Typography variant="body2" noWrap>
                共 {totalRecords} 筆資料，第 {currentPage} 頁 / 共 {totalPages}
                頁
              </Typography>
            </Box>
          </Box>

          {/* 車輛列表 */}
          {isLoading ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography>資料加載中...</Typography>
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography>無法載入資料，請稍後再試</Typography>
            </Box>
          ) : cars.length === 0 ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography>尚無資料</Typography>
            </Box>
          ) : (
            <>
              <VehicleTable data={cars} refetch={fetchCars} />
              {totalPages >= 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
}

export default VehicleManagementPage;
