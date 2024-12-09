//借款金額
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

const BorrowingAmountTable = ({
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
      const response = await requestHttp("lendMoney/getLendMoney", {
        method: "POST",
        data: { carLicenseNum, expenseYearMonth },
      });

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
    //console.log("editedRow", editedRow);

    try {
      const { lendDate, expireDate } = editedRow;

      // 验证日期格式
      if (!validateDate(lendDate, "YYY-MM-DD")) {
        alert("借款日期格式錯誤，應為 YYY-MM-DD");
        return;
      }
      if (!validateDate(expireDate, "YYY-MM-DD")) {
        alert("到期日格式錯誤，應為 YYY-MM-DD");
        return;
      }

      if (!areDatesInExpenseMonth(lendDate, expenseYearMonth)) {
        alert(`借款日期必須在 ${expenseYearMonth} 當月內`);
        return;
      }

      const dataToSave = {
        ...editedRow,
        lendDate,
        expireDate,
        carLicenseNum,
      };

      console.log("dataToSave", dataToSave);

      if (editingRowId === "new") {
        const response = await requestHttp("lendMoney/addLendMoney", {
          method: "POST",
          data: dataToSave,
        });

        if (response?.code === "G_0000") {
          alert("新增成功！");
          refetch();
          await fetchInitialData(); // 刷新数据

          // 只在新增成功時清空數據
          setEditingRowId(null);
          setEditedRow(null);
        } else {
          alert(`新增失敗: ${response?.message || "未知錯誤"}`);
        }
      } else {
        const response = await requestHttp("lendMoney/updateLendMoney", {
          method: "POST",
          data: dataToSave,
        });

        if (response?.code === "G_0000") {
          alert("修改成功！");
          refetch();
          await fetchInitialData(); // 刷新数据

          // 只在修改成功清空數據
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
      lendDate: "",
      amount: "",
      expireDate: "",
      interestAmount: "",
      type: "",
      note: "",
      //   disable: "0", // 預設為 "否"
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
              1. 根據[借款日期]來判斷當月帳單。ex: 處理日期為12月5號,
              則算於12月的帳單
              <br />
              2. [借款利息]計算公式: 借款金額 * 欠款利率
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
              "借款日期(YYY-MM-DD)",
              "借款金額",
              "到期日(YYY-MM-DD)",
              "借款利息",
              "借款方式",
              "備註",
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
          {/* 新增行 */}
          {editingRowId === "new" && (
            <TableRow>
              {[
                "lendDate",
                "amount",
                "expireDate",
                "interestAmount", // 借款利息
                "type",
                "note",
              ].map((field, index) => (
                <TableCell key={index}>
                  {field === "type" ? (
                    <Select
                      value={editedRow?.type || ""}
                      onChange={(e) =>
                        handleInputChange("type", e.target.value)
                      }
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        請選擇
                      </MenuItem>
                      <MenuItem value="CASH">現金</MenuItem>
                      <MenuItem value="CHECK">支票</MenuItem>
                    </Select>
                  ) : (
                    <TextField
                      value={editedRow?.[field] || ""}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      disabled={field === "interestAmount"} // 禁用借款利息
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          backgroundColor: "#f0f0f0", // 禁用時的背景色
                          color: "#999999", // 禁用時的文字顏色
                        },
                      }}
                    />
                  )}
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
          {/* 現有數據行 */}
          {taxData?.map((row) => (
            <TableRow key={row.id}>
              {[
                "lendDate",
                "amount",
                "expireDate",
                "interestAmount", // 借款利息
                "type",
                "note",
              ].map((field, index) => (
                <TableCell key={index}>
                  {editingRowId === row.id && field === "type" ? (
                    <Select
                      value={editedRow?.type || ""}
                      onChange={(e) =>
                        handleInputChange("type", e.target.value)
                      }
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        請選擇
                      </MenuItem>
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
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      disabled={field === "interestAmount"} // 禁用借款利息
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
        </TableBody>
      </Table>
    </Box>
  );
};

export default BorrowingAmountTable;
