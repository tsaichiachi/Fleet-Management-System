//抵油單額
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
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { requestHttp } from "@/utils/requestHttp";
import { validateDate, areDatesInExpenseMonth } from "@/utils/tool";
import { useGetCarAgencyDropDownList } from "../../apihooks";

const InvoiceGasAmountTable = ({
  carLicenseNum,
  type,
  expenseYearMonth,
  refetch,
}) => {
  const [taxData, setTaxData] = useState([]); // 表格數據
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRow, setEditedRow] = useState(null);

  const { data: carAgencyList } = useGetCarAgencyDropDownList();
  //console.log("carAgencyList", carAgencyList);

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
      const { handleDate, invoiceDate, taxMonth } = editedRow;

      // 驗證處理日期和發票日期的格式
      if (!validateDate(handleDate, "YYY-MM-DD")) {
        alert("處理日期格式錯誤，應為 YYY-MM-DD");
        return;
      }
      if (!validateDate(invoiceDate, "YYY-MM-DD")) {
        alert("發票日期格式錯誤，應為 YYY-MM-DD");
        return;
      }
      if (!validateDate(taxMonth, "YYY-MM")) {
        alert("稅捐月份格式錯誤，應為 YYY-MM");
        return;
      }

      if (!areDatesInExpenseMonth(handleDate, expenseYearMonth)) {
        alert(`處理日期必須在 ${expenseYearMonth} 當月內`);
        return;
      }

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
          setEditingRowId(null);
          setEditedRow(null);
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
    if (!expenseYearMonth) {
      setEditingRowId(null);
      alert("請先提供有效的年月份搜尋資料再進行新增");
      return;
    }
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            color: "red",
            fontWeight: "bold",
            //textAlign: "center",
          }}
        >
          車牌:{carLicenseNum}，查詢年月:{expenseYearMonth}
          <br />
          {expenseYearMonth ? (
            <>
              1. 根據[處理日期]來判斷當月帳單。ex: 處理日期為12月5號,
              則算於12月的帳單
              <br />
              2. 發票作廢後, 不可復原, 需重新輸入一張
              <br />
              3. [稅]計算公式: 抵油單額 * 油單稅率
            </>
          ) : (
            "請提供有效的年月份進行資料搜尋"
          )}
        </Box>

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
              "抵油單額",
              "稅",
              "摘要",
              "稅捐月份(YYY-MM)",
              "車行名稱",
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
          {/* Adding a new row */}
          {/* 新增行的渲染 */}
          {editingRowId === "new" && (
            <TableRow>
              {[
                "handleDate",
                "invoiceDate",
                "invoiceNum",
                "amount",
                "amountTax", // 銷貨稅
                "note",
                "taxMonth",
              ].map((field, index) => (
                <TableCell key={index}>
                  <TextField
                    value={editedRow?.[field] || ""}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    disabled={field === "amountTax"} // 禁用銷貨稅輸入框
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor: "#f0f0f0", // 禁用時的背景色
                        color: "#999999", // 禁用時的文字顏色
                      },
                    }}
                  />
                </TableCell>
              ))}
              {/* 新增行中的車行名稱欄位 */}
              <TableCell>
                <Select
                  value={editedRow?.carAgency || ""}
                  onChange={(e) =>
                    handleInputChange("carAgency", e.target.value)
                  }
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    請選擇
                  </MenuItem>
                  {carAgencyList?.map((agency) => (
                    <MenuItem key={agency.id} value={agency.name}>
                      {agency.name}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              {/* 新增時隱藏「作廢」 */}
              <TableCell />
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

          {/* Existing rows */}
          {taxData?.map((row) => (
            <TableRow key={row.id}>
              {[
                "handleDate",
                "invoiceDate",
                "invoiceNum",
                "amount",
                "amountTax",
                "note",
                "taxMonth",
              ].map((field, index) => (
                <TableCell key={index}>
                  {editingRowId === row.id ? (
                    <TextField
                      value={editedRow?.[field] || ""}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      disabled={field === "amountTax"} // Disable editing for 銷貨稅
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          backgroundColor: "#f0f0f0", // 禁用時的背景色
                          color: "#999999", // 禁用時的文字顏色
                        },
                      }}
                    />
                  ) : (
                    <Typography>{row[field]}</Typography>
                  )}
                </TableCell>
              ))}
              {/* Dropdown for car agency */}
              <TableCell>
                {editingRowId === row.id ? (
                  <Select
                    value={editedRow?.carAgency || ""}
                    onChange={(e) =>
                      handleInputChange("carAgency", e.target.value)
                    }
                    fullWidth
                  >
                    {carAgencyList?.map((agency) => (
                      <MenuItem key={agency.id} value={agency.name}>
                        {agency.name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <Typography>{row.carAgency}</Typography>
                )}
              </TableCell>
              {/* Disable editing 作廢 */}
              <TableCell>
                {editingRowId === row.id ? (
                  <Switch
                    checked={editedRow?.disable === "1"}
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
                {row.disable === "1" ? (
                  <Typography color="error" fontWeight="bold">
                    已作廢
                  </Typography>
                ) : editingRowId === row.id ? (
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
        </TableBody>
      </Table>
    </Box>
  );
};

export default InvoiceGasAmountTable;
