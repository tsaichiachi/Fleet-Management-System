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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { requestHttp } from "@/utils/requestHttp";

const InvoiceSaleAmountTable = ({ carLicenseNum, type, expenseYearMonth }) => {
  console.log("carLicenseNum:", carLicenseNum);
  console.log("type:", type);
  console.log("expenseYearMonth:", expenseYearMonth);
  const [taxData, setTaxData] = useState([]); // 表格數據
  console.log("taxData:", taxData);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRow, setEditedRow] = useState(null);

  // 初始化抓取預設資料
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await requestHttp("invoice/getInvoice", {
          method: "POST",
          data: { carLicenseNum, type, expenseYearMonth },
        });
        setTaxData(response.data.pageList);
      } catch (error) {
        console.error("抓取預設資料失敗:", error);
      }
    };
    fetchInitialData();
  }, []);

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

  // 保存編輯數據
  const handleSaveClick = async () => {
    try {
      if (editingRowId === "new") {
        // 新增資料
        const response = await requestHttp("invoice/addInvoice", {
          method: "POST",
          data: editedRow,
        });
        setTaxData((prev) => [...prev, { ...editedRow,  }]);
      } else {
        // 修改資料
        await requestHttp("invoice/updateInvoice", {
          method: "POST",
          data: editedRow,
        });
        setTaxData((prev) =>
          prev.map((item) => (item.id === editingRowId ? editedRow : item))
        );
      }
      setEditingRowId(null);
      setEditedRow(null);
    } catch (error) {
      console.error("保存失敗:", error);
    }
  };

  // 更新編輯行的值
  const handleInputChange = (field, value) => {
    setEditedRow((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 新增行
  const handleAddRow = () => {
    setEditingRowId("new");
    setEditedRow({
      id: "new",
      handleDate: "",
      invoiceDate: "",
      invoiceNum: "",
      invoiceAmount: "",
      invoiceTax: "",
      carAgency: "",
      note: "",
      taxMonth: "",
      disable: "",
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
              "處理日期",
              "發票日期",
              "發票號碼",
              "銷貨金額",
              "銷貨稅",
              "車行名稱",
              "摘要",
              "稅捐月份",
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
          {taxData?.map((row) => (
            <TableRow key={row.id}>
              {[
                "handleDate",
                "invoiceDate",
                "invoiceNum",
                "invoiceAmount",
                "invoiceTax",
                "carAgency",
                "note",
                "taxMonth",
                "disable",
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
                      onClick={() =>
                        setTaxData((prev) =>
                          prev.filter((item) => item.id !== row.id)
                        )
                      }
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
          {editingRowId === "new" && (
            <TableRow>
              {[
                "handleDate",
                "invoiceDate",
                "invoiceNum",
                "invoiceAmount",
                "invoiceTax",
                "carAgency",
                "note",
                "taxMonth",
                "disable",
              ].map((field, index) => (
                <TableCell key={index}>
                  <TextField
                    value={editedRow?.[field] || ""}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                  />
                </TableCell>
              ))}
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
