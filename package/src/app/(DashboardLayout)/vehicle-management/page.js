"use client";
import React, { useState, useEffect } from "react";
import { Typography, Button, Box, TextField, Pagination } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import VehicleTable from "./components/VehicleTable";
import { requestHttp } from "@/utils/requestHttp";
import { useRouter } from "next/navigation";

function VehicleManagementPage() {
  const router = useRouter();

  // 狀態：車輛資料與搜尋條件
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1); // 當前頁碼
  const [pageSize] = useState(10); // 每頁筆數
  const [totalPages, setTotalPages] = useState(0); // 總頁數

  // 呼叫 API 獲取車輛資料
  const fetchCars = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await requestHttp("car/carInfoDropDownList", {
        method: "POST",
      });
      //console.log("Cars API Response:", response);

      // 檢查 API 響應
      if (response.code !== "G_0000") {
        throw new Error(response.message || "Failed to fetch cars");
      }

      // 設置車輛資料
      setCars(response.data || []);
      const totalItems = response.data?.length || 0;
      setTotalPages(Math.ceil(totalItems / pageSize));
      // 初始化篩選結果
      const initialFiltered = response.data.slice(0, pageSize);
      setFilteredCars(initialFiltered);
    } catch (err) {
      console.error("Error fetching cars:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始化獲取車輛資料
  useEffect(() => {
    fetchCars();
  }, []);

  // 分頁處理
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    const startIndex = (value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = cars.slice(startIndex, endIndex);
    setFilteredCars(currentPageData);
  };

  // 搜尋條件變更處理
  const handleSearchInputChange = (event) => {
    setSearch(event.target.value);
  };

  // 處理搜尋按鈕點擊
  const handleSearchClick = () => {
    const query = search.trim().toLowerCase();
    const filtered = cars.filter(
      (car) =>
        car.licenseNumber?.toLowerCase().includes(query) ||
        car.ownerName?.toLowerCase().includes(query)
    );
    setFilteredCars(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize));
    setCurrentPage(1); // 重置分頁到第一頁
  };

  // 新增車輛按鈕點擊
  const handleAddNewClick = () => {
    router.push(`/vehicle-management/AddNew`);
  };

  return (
    <PageContainer title="車籍管理" description="管理車籍相關資料">
      <DashboardCard title="車籍資料">
        <Box sx={{ overflow: "auto", width: { xs: "400px", sm: "auto" } }}>
          {/* 搜尋框與按鈕 */}
          <Box>
            <TextField
              label="搜尋"
              id="outlined-size-small"
              value={search}
              onChange={handleSearchInputChange}
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
          {/* 車輛列表 */}
          {isLoading ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography>資料加載中...</Typography>
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography>無法載入資料，請稍後再試</Typography>
            </Box>
          ) : filteredCars.length === 0 ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography>尚無資料</Typography>
            </Box>
          ) : (
            <>
              <VehicleTable data={filteredCars} />
              {totalPages > 0 && (
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
