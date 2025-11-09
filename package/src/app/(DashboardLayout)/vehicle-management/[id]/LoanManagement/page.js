//貸款管理
"use client";
import React, { useState, useEffect } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Box from "@mui/material/Box";
import LoanManagementForm from "../../components/form/LoanManagement";
import { useRouter } from "next/navigation";
import { requestHttp } from "@/utils/requestHttp";
import { Button, TextField, Typography, Pagination } from "@mui/material";
import LoanManagementTable from "../../components/table/LoanManagementTable";

const LoanManagement = () => {
  const router = useRouter();

  // 狀態：貸款資料與搜尋條件
  const [loanList, setLoanList] = useState([]);
  const [filteredLoan, setFilteredLoan] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);

  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // 每頁顯示筆數
  const [totalPages, setTotalPages] = useState(0);

  // 車輛牌照號碼
  const [carLicenseNum, setCarLicenseNumber] = useState("");

  // 呼叫 API 獲取貸款資料
  const fetchLoanList = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await requestHttp(
        "loanFeeSetting/queryByCarLicenseNum",
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
      setLoanList(response.data?.pageList || []);
      setFilteredLoan(response.data?.pageList || []);
      setTotalPages(Math.ceil(totalItems / pageSize));
      setTotalRecords(totalItems);
    } catch (err) {
      console.error("Error fetching loan list:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始化獲取貸款資料
  useEffect(() => {
    const storedLicenseNumber = localStorage.getItem("licenseNumber");
    if (storedLicenseNumber) {
      setCarLicenseNumber(storedLicenseNumber);
    }
  }, []);

  useEffect(() => {
    if (carLicenseNum) fetchLoanList();
  }, [carLicenseNum, currentPage]);

  // 分頁處理
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // 新增貸款按鈕
  const handleAddNewClick = () => {
    router.push(`/vehicle-management/${carLicenseNum}/LoanManagement/AddNew`);
  };

  return (
    <PageContainer title="貸款管理" description="管理車輛貸款相關資料">
      {/* <DashboardCard title="">
        <Box sx={{ width: { xs: "400px", sm: "auto" } }}>
          <Box>
            <LoanManagementForm />
          </Box>
        </Box>
      </DashboardCard> */}
      <DashboardCard title="">
        <Box sx={{ overflow: "auto", width: { xs: "400px", sm: "auto" } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
                新增貸款
              </Button>
              <Box sx={{ color: "red", fontWeight: "bold" }}>
                若資料輸入錯誤，請點選垃圾桶將整筆作廢並重新新增貸款
              </Box>
            </Box>

            <Typography variant="body2">
              共 {totalRecords} 筆資料，第 {currentPage} 頁 / 共 {totalPages} 頁
            </Typography>
          </Box>

          {/* 貸款列表 */}
          {isLoading ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography>資料加載中...</Typography>
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography>無法載入資料，請稍後再試</Typography>
            </Box>
          ) : filteredLoan.length === 0 ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography>尚無資料</Typography>
            </Box>
          ) : (
            <>
              <LoanManagementTable
                data={filteredLoan}
                carLicenseNum={carLicenseNum}
                refreshData={fetchLoanList}
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

export default LoanManagement;
