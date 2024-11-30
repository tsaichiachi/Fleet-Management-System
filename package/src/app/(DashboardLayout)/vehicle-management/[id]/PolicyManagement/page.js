"use client";
import React, { useState, useEffect } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Box from "@mui/material/Box";
import PolicyManagmentTable from "../../components/table/PolicyManagementTable";
import { useRouter } from "next/navigation";
import {  Button, TextField } from "@mui/material";
import { useGetInsuranceList } from "@/app/(DashboardLayout)/vehicle-management/apihooks";


const PolicyManagement = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [carLicenseNum, setCarLicenseNumber] = useState("");
  console.log("licenseNumber:", carLicenseNum);

  const { data: insuranceList, isLoading } = useGetInsuranceList(
    // currentPage,
    // pageSize,
    carLicenseNum
  );

  //console.log("insuranceList:", insuranceList);

  const insurance = insuranceList?.pageList;
  //console.log(insurance);

  // 搜尋過濾
  const filteredInsurance =query ? insurance?.filter(
    (item) => item.insuranceCardNum?.includes(query)) : insurance || []
  ;

  const handleSearchClick = () => {
    setQuery(search);
  };

  const handleAddNewClick = () => {
    router.push(`/vehicle-management/${currentPage}/PolicyManagement/AddNew`);
  };

  // 從 LocalStorage 取得車牌號碼
  useEffect(() => {
    const storedLicenseNumber = localStorage.getItem("licenseNumber");
    if (storedLicenseNumber) {
      setCarLicenseNumber(storedLicenseNumber);
    } else {
      //console.warn("在 LocalStorage 中未找到車牌號碼");
      setCarLicenseNumber(""); // 初始化為空字串以避免判斷失效
    }
  }, []);

  return (
    <PageContainer title="保單管理" description="管理車輛保險相關資料">
      <DashboardCard title="保單管理">
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
              新增保單
            </Button>
          </Box>
          <PolicyManagmentTable data={filteredInsurance} />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default PolicyManagement;
