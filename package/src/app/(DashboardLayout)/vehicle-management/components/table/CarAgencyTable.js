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

const CarAgencyTable = () => {
  const [taxData, setTaxData] = useState([]); // 表格數據
  const [currentPage, setCurrentPage] = useState(1); // 當前頁數
  const [totalPages, setTotalPages] = useState(1); // 總頁數
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRow, setEditedRow] = useState(null);
  const rowsPerPage = 10; // 每頁顯示的行數

  // 抓取數據函數
  const fetchInitialData = async (page = 1) => {
    try {
      const response = await requestHttp("carAgency/getCarAgency", {
        method: "POST",
        data: { page, size: rowsPerPage },
      });

      const processedData = response.data.pageList.map((item) => ({
        ...item,
      }));

      setTaxData(processedData);
      setTotalPages(response.data.totalPages || 1); // 設置總頁數
    } catch (error) {
      console.error("刷新數據失敗:", error);
    }
  };

  useEffect(() => {
    fetchInitialData(currentPage);
  }, [currentPage]); // 當前頁數改變時重新請求數據

  const handleEditClick = (rowId) => {
    setEditingRowId(rowId);
    const row = taxData.find((item) => item.id === rowId);
    setEditedRow({ ...row });
  };

  const handleCancelClick = () => {
    setEditingRowId(null);
    setEditedRow(null);
  };

  const handleSaveClick = async () => {
    try {
      const dataToSave = { ...editedRow };

      if (editingRowId === "new") {
        const response = await requestHttp("carAgency/addCarAgency", {
          method: "POST",
          data: dataToSave,
        });

        if (response?.code === "G_0000") {
          alert("新增成功！");
          fetchInitialData(currentPage);
          setEditingRowId(null);
          setEditedRow(null);
        } else {
          alert(`新增失敗: ${response?.message || "未知錯誤"}`);
        }
      } else {
        const response = await requestHttp("carAgency/updateCarAgency", {
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
      agencyName: "",
      address: "",
      owner: "",
      taxId: "",
      phone1: "",
    });
  };

  //刪除
  const handleDeleteClick = async (rowId) => {
    if (!window.confirm("確定要刪除這筆資料嗎？")) return;  
    try {
      const response = await requestHttp(`carAgency/deleteCarAgency/${rowId}`, {
        method: "POST",
      }); 

      if (response?.code === "G_0000") {
        alert("刪除成功！");
        fetchInitialData(currentPage);
      } else {
        alert(`刪除失敗: ${response?.message || "未知錯誤"}`);
      }
    } catch (error) {
      console.error("刪除失敗:", error);
      alert("刪除失敗，請稍後再試！");
    }
  };

  return (
    <Box sx={{ overflow: "auto", width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          新增
        </Button>
      </Box>

      <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
        <TableHead>
          <TableRow>
            {["名稱", "地址", "負責人", "統一編號", "電話", "操作"].map(
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
              {["agencyName", "address", "owner", "taxId", "phone1"].map(
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
              {["agencyName", "address", "owner", "taxId", "phone1"].map(
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
                      aria-label="edit"
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

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={totalPages} // 總頁數
          page={currentPage} // 當前頁數
          onChange={(event, value) => setCurrentPage(value)} // 切換頁數
        />
      </Box>
    </Box>
  );
};

export default CarAgencyTable;
