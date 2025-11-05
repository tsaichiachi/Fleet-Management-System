"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Button, Pagination, Box, TextField, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useRouter } from "next/navigation";
import CarOwnerTable from "./components/CarOwnerTable";
import { requestHttp } from "@/utils/requestHttp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function DriverManagementPage() {
  const router = useRouter();

  // 狀態：分頁參數與搜尋條件
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [owners, setOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0); // 總筆數

  // 整合 API 請求參數
  const fetchParams = useMemo(
    () => ({ page: currentPage, size: pageSize, name: searchName }),
    [currentPage, pageSize, searchName]
  );

  // 呼叫 API 取得車主資料
  const fetchCarOwners = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { page, size, name } = fetchParams;
      const response = await requestHttp("car/getCarOwner", {
        method: "POST",
        data: {
          page: page,
          size: size,
          searchName: name || "",
        },
      });

      const total = response.data?.total || 0;
      setOwners(response.data?.pageList || []);
      setTotalPages(Math.ceil(total / pageSize));
      setTotalRecords(total);
    } catch (err) {
      console.error("Error fetching car owners:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 當 `fetchParams` 改變時，重新獲取資料
  useEffect(() => {
    fetchCarOwners();
  }, [fetchParams]);

  // 搜尋條件變更
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // 搜尋按鈕點擊
  const handleSearchClick = () => {
    setCurrentPage(1); // 重置分頁
    setSearchName(searchInput.trim());
  };

  // 分頁變更
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    const startIndex = (value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = owners.slice(startIndex, endIndex);
    setOwners(currentPageData);
  };

  // 新增車主按鈕點擊
  const handleAddNewClick = () => {
    router.push(`/driver-management/AddNew`);
  };

  

  return (
    <PageContainer title="車主管理" description="管理車主相關資料">
      <DashboardCard
        title="車主資料"
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
                  新增車主
                </Button>
              </Box>

              <Typography variant="body2" noWrap>
                共 {totalRecords} 筆資料，第 {currentPage} 頁 / 共 {totalPages}
                頁
              </Typography>
            </Box>
          </Box>

          {/* 車主列表 */}
          {isLoading ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography>資料加載中...</Typography>
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography>請重新搜尋</Typography>
            </Box>
          ) : owners.length === 0 ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography>尚無資料</Typography>
            </Box>
          ) : (
            <>
              <CarOwnerTable data={owners} refetch={fetchCarOwners} />
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

export default DriverManagementPage;
