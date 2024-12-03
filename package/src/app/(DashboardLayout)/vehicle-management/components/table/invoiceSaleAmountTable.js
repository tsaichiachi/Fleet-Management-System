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
  Switch,
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { requestHttp } from "@/utils/requestHttp";

const InvoiceSaleAmountTable = ({
  carLicenseNum,
  type,
  expenseYearMonth,
  refetch,
}) => {
  const [taxData, setTaxData] = useState([]); // 表格數據
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRow, setEditedRow] = useState(null);

  // 抓取數據函數
  const fetchInitialData = async () => {
    try {
      const response = await requestHttp("invoice/getInvoice", {
        method: "POST",
        data: { carLicenseNum, type, expenseYearMonth },
      });

      const processedData = response.data.pageList.map((item) => ({
        ...item,
        disable: String(item.disable), // 將 disable 轉換為字串
      }));

      setTaxData(processedData);
      //console.log("刷新數據成功:", response.data.pageList);
    } catch (error) {
      console.error("刷新數據失敗:", error);
      alert("刷新數據失敗，請稍後再試！");
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
      const { handleDate, invoiceDate, taxMonth } = editedRow;

      const dataToSave = {
        ...editedRow,
        handleDate,
        invoiceDate,
        taxMonth,
        type,
        carLicenseNum,
      };

      if (editingRowId === "new") {
        const response = await requestHttp("invoice/addInvoice", {
          method: "POST",
          data: dataToSave,
        });

        if (response?.code === "G_0000") {
          alert("新增成功！");
          refetch();
          await fetchInitialData(); // 刷新數據
        } else {
          alert(`新增失敗: ${response?.message || "未知錯誤"}`);
        }
      } else {
        const response = await requestHttp("invoice/updateInvoice", {
          method: "POST",
          data: dataToSave,
        });

        if (response?.code === "G_0000") {
          alert("修改成功！");
          refetch();
          await fetchInitialData(); // 刷新數據
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
      id: "new",
      handleDate: "",
      invoiceDate: "",
      invoiceNum: "",
      amount: "",
      amountTax: "",
      carAgency: "",
      note: "",
      taxMonth: "",
      disable: "0", // 預設為 "否"
    });
  };

  return (
    <Box sx={{ overflow: "auto", width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          新增
        </Button>
      </Box>
      <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
        <TableHead>
          <TableRow>
            {[
              "處理日期(YYY-MM-DD)",
              "發票日期(YYY-MM-DD)",
              "發票號碼",
              "銷貨金額",
              "銷貨稅",
              "車行名稱",
              "摘要",
              "稅捐月份(YYY-MM)",
              "作廢",
              "操作",
            ].map((header, index) => (
              <TableCell key={index}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {header}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* 已有數據的渲染 */}
          {taxData?.map((row) => (
            <TableRow key={row.id}>
              {[
                "handleDate",
                "invoiceDate",
                "invoiceNum",
                "amount",
                "amountTax",
                "carAgency",
                "note",
                "taxMonth",
              ].map((field, index) => (
                <TableCell key={index}>
                  {editingRowId === row.id ? (
                    <TextField
                      value={editedRow?.[field] || ""}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                    />
                  ) : (
                    <Typography>{row[field]}</Typography>
                  )}
                </TableCell>
              ))}
              <TableCell>
                {editingRowId === row.id ? (
                  <Switch
                    checked={editedRow?.disable === "1"} // 確保字串比較
                    onChange={(e) =>
                      handleInputChange("disable", e.target.checked ? "1" : "0")
                    }
                    color="primary"
                  />
                ) : (
                  <Typography>{row.disable === "1" ? "是" : "否"}</Typography>
                )}
              </TableCell>
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

          {/* 新增行的渲染 */}
          {editingRowId === "new" && (
            <TableRow>
              {[
                "handleDate",
                "invoiceDate",
                "invoiceNum",
                "amount",
                "amountTax",
                "carAgency",
                "note",
                "taxMonth",
              ].map((field, index) => (
                <TableCell key={index}>
                  <TextField
                    value={editedRow?.[field] || ""}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                  />
                </TableCell>
              ))}
              <TableCell>
                <Switch
                  checked={editedRow?.disable === "1"} // 確保字串比較
                  onChange={(e) =>
                    handleInputChange("disable", e.target.checked ? "1" : "0")
                  }
                  color="primary"
                />
              </TableCell>
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

export default InvoiceSaleAmountTable;
