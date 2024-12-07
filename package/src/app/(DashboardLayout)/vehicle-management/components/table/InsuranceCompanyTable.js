//保險公司
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { requestHttp } from "@/utils/requestHttp";
import { validateDate, areDatesInExpenseMonth } from "@/utils/tool";

const InsuranceCompanyTable = () => {
  const [taxData, setTaxData] = useState([]); // 表格數據
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRow, setEditedRow] = useState(null);

  // 抓取數據函數
  const fetchInitialData = async () => {
    try {
      const response = await requestHttp(
        "insuranceCompany/getInsuranceCompany",
        {
          method: "POST",
          data: { size: 1000, page: 1 },
        }
      );

      const processedData = response.data.pageList.map((item) => ({
        ...item,
        //disable: String(item.disable), // 將 disable 轉換為字串
      }));

      //console.log("processedData", processedData);

      setTaxData(processedData);
      //console.log("刷新數據成功:", response.data.pageList);
    } catch (error) {
      //console.error("刷新數據失敗:", error);
      //alert("刷新數據失敗，請稍後再試！");
    }
  };

  // 組件加載時調用
  useEffect(() => {
    fetchInitialData();
  }, []); // 空依賴陣列，確保只執行一次

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

      //console.log("dataToSave", dataToSave);

      if (editingRowId === "new") {
        const response = await requestHttp(
          "insuranceCompany/addInsuranceCompany",
          {
            method: "POST",
            data: dataToSave,
          }
        );

        if (response?.code === "G_0000") {
          alert("新增成功！");
          await fetchInitialData(); // 刷新數據
        } else {
          alert(`新增失敗: ${response?.message || "未知錯誤"}`);
        }
      } else {
        const response = await requestHttp(
          "insuranceCompany/updateInsuranceCompany",
          {
            method: "POST",
            data: dataToSave,
          }
        );

        if (response?.code === "G_0000") {
          alert("修改成功！");
       
          await fetchInitialData(); 
        } else {
          alert(`修改失敗: ${response?.message || "未知錯誤"}`);
        }
      }
      setEditingRowId(null);
      setEditedRow(null);
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

  return (
    <Box sx={{ overflow: "auto", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          新增
        </Button>
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
          {taxData?.map((row) => (
            <TableRow key={row.id}>
              {["companyName", "shortName", "contactor", "phone", "note"].map(
                (field, index) => (
                  <TableCell key={index}>
                    {editingRowId === row.id && field === "type" ? (
                      <Select
                        value={editedRow?.type || "CASH"}
                        onChange={(e) =>
                          handleInputChange("type", e.target.value)
                        }
                        fullWidth
                      >
                        <MenuItem value="CASH">現金</MenuItem>
                        <MenuItem value="CHECK">支票</MenuItem>
                      </Select>
                    ) : field === "type" ? (
                      <Typography>
                        {row[field] === "CASH" ? "現金" : "支票"}
                      </Typography>
                    ) : editingRowId === row.id ? (
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
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}

          {editingRowId === "new" && (
            <TableRow>
              {["companyName", "shortName", "contactor", "phone", "note"].map(
                (field, index) => (
                  <TableCell key={index}>
                    {field === "type" ? (
                      <Select
                        value={editedRow?.type || "CASH"}
                        onChange={(e) =>
                          handleInputChange("type", e.target.value)
                        }
                        fullWidth
                      >
                        <MenuItem value="CASH">現金</MenuItem>
                        <MenuItem value="CHECK">支票</MenuItem>
                      </Select>
                    ) : (
                      <TextField
                        value={editedRow?.[field] || ""}
                        onChange={(e) =>
                          handleInputChange(field, e.target.value)
                        }
                      />
                    )}
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
        </TableBody>
      </Table>
    </Box>
  );
};

export default InsuranceCompanyTable;
