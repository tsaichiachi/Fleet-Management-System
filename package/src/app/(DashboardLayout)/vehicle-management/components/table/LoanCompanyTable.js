//貸款公司
"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { requestHttp } from "@/utils/requestHttp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const LoanCompanyTable = () => {
  const [taxData, setTaxData] = useState([]); // 表格數據
  const [currentPage, setCurrentPage] = useState(1); // 當前頁數
  const [totalPages, setTotalPages] = useState(1); // 總頁數
  const [totalRecords, setTotalRecords] = useState(0); // 總筆數
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRow, setEditedRow] = useState(null);
  const rowsPerPage = 10; // 每頁顯示的行數

  // 抓取數據函數
  const fetchInitialData = async (page = 1) => {
    try {
      const response = await requestHttp("loanCompany/getLoanCompany", {
        method: "POST",
        data: { page, size: rowsPerPage },
      });

      if (response?.code === "G_0000" && response?.data) {
        const processedData = response.data.pageList.map((item) => ({
          ...item,
        }));

        setTaxData(processedData);
        setTotalRecords(response.data.total || 0); // 設置總筆數

        // 計算總頁數
        const calculatedTotalPages = Math.ceil(
          (response.data.total || 0) / rowsPerPage
        );
        setTotalPages(calculatedTotalPages);

        console.log(
          `總筆數: ${response.data.total}, 每頁筆數: ${rowsPerPage}, 總頁數: ${calculatedTotalPages}`
        );
      } else {
        console.error("API 回應格式錯誤:", response);
        setTaxData([]);
        setTotalRecords(0);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("刷新數據失敗:", error);
      setTaxData([]);
      setTotalRecords(0);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchInitialData(currentPage);
  }, [currentPage]); // 當前頁數改變時重新請求數據

  // 進入編輯模式
  const handleEditClick = (rowId) => {
    setEditingRowId(rowId);
    const row = taxData.find((item) => item.id === rowId);
    setEditedRow({ ...row });
  };

  // 取消編輯模式
  const handleCancelClick = () => {
    setEditingRowId(null);
    setEditedRow(null);
  };

  const handleSaveClick = async () => {
    try {
      const dataToSave = {
        ...editedRow,
      };

      if (editingRowId === "new") {
        const response = await requestHttp("loanCompany/addLoanCompany", {
          method: "POST",
          data: dataToSave,
        });

        if (response?.code === "G_0000") {
          alert("新增成功！");
          // 新增後回到第一頁，因為總筆數可能改變
          setCurrentPage(1);
          fetchInitialData(1);
          setEditingRowId(null);
          setEditedRow(null);
        } else {
          alert(`新增失敗: ${response?.message || "未知錯誤"}`);
        }
      } else {
        const response = await requestHttp("loanCompany/updateLoanCompany", {
          method: "POST",
          data: dataToSave,
        });

        if (response?.code === "G_0000") {
          alert("修改成功！");
          fetchInitialData(currentPage);
          setEditingRowId(null);
          setEditedRow(null);
        } else {
          alert(`修改失敗: ${response?.message || "未知錯誤"}`);
        }
      }
    } catch (error) {
      console.error("保存失敗:", error);
      alert("保存失敗，請稍後再試！");
    }
  };

  const handleInputChange = (field, value) => {
    setEditedRow((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddRow = () => {
    setEditingRowId("new");
    setEditedRow({
      companyName: "",
      shortName: "",
      contactor: "",
      phone: "",
      note: "",
    });
  };

  //刪除
  const handleDeleteClick = async (rowId) => {
    if (!window.confirm("確定要刪除這筆資料嗎？")) return;
    try {
      const response = await requestHttp(`loanCompany/disableLoanCompany`, {
        method: "POST",
        data: {
          id: rowId,
          status: "disable",
        },
      });

      if (response?.code === "G_0000") {
        alert("刪除成功！");
        // 刪除後檢查當前頁是否還有數據，如果沒有則回到上一頁
        const remainingRecords = totalRecords - 1;
        const maxPossiblePage = Math.ceil(remainingRecords / rowsPerPage);
        const targetPage =
          currentPage > maxPossiblePage
            ? Math.max(1, maxPossiblePage)
            : currentPage;

        setCurrentPage(targetPage);
        fetchInitialData(targetPage);
      } else {
        alert(`刪除失敗: ${response?.message || "未知錯誤"}`);
      }
    } catch (error) {
      console.error("刪除失敗:", error);
      alert("刪除失敗，請稍後再試！");
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ overflow: "auto", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          新增
        </Button>
        <Typography variant="body2">
          共 {totalRecords} 筆資料，第 {currentPage} 頁 / 共 {totalPages} 頁
        </Typography>
      </Box>

      <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
        <TableHead>
          <TableRow>
            {["名稱", "簡稱", "聯絡人", "電話", "備註", "操作"].map(
              (header, index) => (
                <TableCell key={index}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {header}
                  </Typography>
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {editingRowId === "new" && (
            <TableRow>
              {["companyName", "shortName", "contactor", "phone", "note"].map(
                (field, index) => (
                  <TableCell key={index}>
                    <TextField
                      value={editedRow?.[field] || ""}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                    />
                  </TableCell>
                )
              )}
              <TableCell>
                <IconButton onClick={handleSaveClick} color="primary">
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancelClick} color="secondary">
                  <CancelIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )}
          {taxData?.map((row) => (
            <TableRow key={row.id}>
              {["companyName", "shortName", "contactor", "phone", "note"].map(
                (field, index) => (
                  <TableCell key={index}>
                    {editingRowId === row.id ? (
                      <TextField
                        value={editedRow?.[field] || ""}
                        onChange={(e) =>
                          handleInputChange(field, e.target.value)
                        }
                      />
                    ) : (
                      <Typography>{row[field]}</Typography>
                    )}
                  </TableCell>
                )
              )}
              <TableCell>
                {editingRowId === row.id ? (
                  <>
                    <IconButton onClick={handleSaveClick} color="primary">
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancelClick} color="secondary">
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditClick(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteClick(row.id)}
                      color="error"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 修正：只有在總頁數大於 1 時才顯示分頁組件 */}
      {totalPages >= 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages} // 總頁數
            page={currentPage} // 當前頁數
            onChange={handlePageChange} // 切換頁數
            // color="primary"
            // showFirstButton
            // showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default LoanCompanyTable;
