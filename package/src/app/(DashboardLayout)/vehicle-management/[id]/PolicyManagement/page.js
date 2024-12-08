"use client";
import React, { useState, useEffect } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Box from "@mui/material/Box";
import PolicyManagmentTable from "../../components/table/PolicyManagementTable";
import { useRouter } from "next/navigation";
import { Button, TextField, Typography, Pagination } from "@mui/material";
import { requestHttp } from "@/utils/requestHttp";

const PolicyManagement = () => {
  const router = useRouter();

  // 狀態：保單資料與搜尋條件
  const [insuranceList, setInsuranceList] = useState([]);
  const [filteredInsurance, setFilteredInsurance] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // 每頁顯示筆數
  const [totalPages, setTotalPages] = useState(0);

  // 車輛牌照號碼
  const [carLicenseNum, setCarLicenseNumber] = useState("");

  // 呼叫 API 獲取保險資料
  const fetchInsuranceList = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await requestHttp(
        "insuranceFeeSetting/getInsuranceFeeSetting",
        {
          method: "POST",
          data: {
            carLicenseNum,
            size: pageSize,
            page: currentPage,
          },
        }
      );

      if (response?.code !== "G_0000") {
        throw new Error(response?.message || "無法獲取保險列表");
      }

      const totalItems = response.data?.total || 0;
      setInsuranceList(response.data?.pageList || []);
      setFilteredInsurance(response.data?.pageList || []);
      setTotalPages(Math.ceil(totalItems / pageSize));
    } catch (err) {
      console.error("Error fetching insurance list:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始化獲取保險資料
  useEffect(() => {
    const storedLicenseNumber = localStorage.getItem("licenseNumber");
    if (storedLicenseNumber) {
      setCarLicenseNumber(storedLicenseNumber);
    }
  }, []);

  useEffect(() => {
    if (carLicenseNum) fetchInsuranceList();
  }, [carLicenseNum, currentPage]);

  // 搜尋處理
  const handleSearchClick = () => {
    const query = search.trim();
    const filtered = insuranceList.filter((item) =>
      item.insuranceCardNum?.includes(query)
    );
    setFilteredInsurance(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize));
    setCurrentPage(1); // 搜尋後重置到第一頁
  };

  // 分頁處理
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // 新增保單按鈕
  const handleAddNewClick = () => {
    router.push(`/vehicle-management/${carLicenseNum}/PolicyManagement/AddNew`);
  };

  return (
    <PageContainer title="保單管理" description="管理車輛保險相關資料">
      <DashboardCard title="">
        <Box sx={{ overflow: "auto", width: { xs: "400px", sm: "auto" } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* 搜尋框和搜尋按鈕 */}
              {/* <TextField
      label="搜尋"
      id="outlined-size-small"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      size="small"
      sx={{ marginRight: "8px" }}
    />
    <Button
      variant="contained"
      onClick={handleSearchClick}
      sx={{ marginRight: "8px" }}
    >
      搜尋
    </Button> */}
              <Button
                variant="contained"
                onClick={handleAddNewClick}
                sx={{ marginRight: "8px" }}
              >
                新增保單
              </Button>
            </Box>
            <Box sx={{ color: "red", fontWeight: "bold" }}>
              若保卡號碼輸入錯誤，請點選垃圾桶進行整筆作廢並重新新增保單
            </Box>
          </Box>

          {/* 保單列表 */}
          {isLoading ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography>資料加載中...</Typography>
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography>無法載入資料，請稍後再試</Typography>
            </Box>
          ) : (
            <>
              <PolicyManagmentTable
                data={filteredInsurance}
                carLicenseNum={carLicenseNum}
                refreshData={fetchInsuranceList}
              />
              {/* 分頁元件 */}
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
};

export default PolicyManagement;
