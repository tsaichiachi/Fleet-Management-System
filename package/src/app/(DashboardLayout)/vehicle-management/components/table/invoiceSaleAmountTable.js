import React, { useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const initialTaxManagement = [
  {
    id: "1",
    month: "2023-01",
    taxName: "車輛牌照稅",
    taxAmount: 5000,
    paidDate: "2023-01-15",
    remarks: "已繳稅",
  },
  {
    id: "2",
    month: "2023-02",
    taxName: "燃料使用費",
    taxAmount: 3000,
    paidDate: "2023-02-20",
    remarks: "已繳稅",
  },
];

const TaxManagementTable = () => {
  const [taxData, setTaxData] = useState(initialTaxManagement);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRow, setEditedRow] = useState(null);

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
  const handleSaveClick = () => {
    // 如果是新增模式
    if (editingRowId === "new") {
      setTaxData((prev) => [...prev, { ...editedRow, id: String(Date.now()) }]);
    } else {
      // 如果是編輯模式
      setTaxData((prev) =>
        prev.map((item) => (item.id === editingRowId ? editedRow : item))
      );
    }
    setEditingRowId(null);
    setEditedRow(null);
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
      month: "",
      taxName: "",
      taxAmount: "",
      paidDate: "",
      remarks: "",
    });
  };

  return (
    <Box sx={{ overflow: "auto", width: { xs: "auto", sm: "auto" } }}>
      
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          新增
        </Button>
      </Box>
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: "nowrap",
          mt: 2,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                處理日期
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                發票日期
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                發票號碼
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                銷貨金額
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                銷貨稅
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                操作
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taxData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {editingRowId === row.id ? (
                  <TextField
                    value={editedRow?.month || ""}
                    onChange={(e) => handleInputChange("month", e.target.value)}
                  />
                ) : (
                  <Typography>{row.month}</Typography>
                )}
              </TableCell>
              <TableCell>
                {editingRowId === row.id ? (
                  <TextField
                    value={editedRow?.taxName || ""}
                    onChange={(e) =>
                      handleInputChange("taxName", e.target.value)
                    }
                  />
                ) : (
                  <Typography>{row.taxName}</Typography>
                )}
              </TableCell>
              <TableCell>
                {editingRowId === row.id ? (
                  <TextField
                    type="number"
                    value={editedRow?.taxAmount || ""}
                    onChange={(e) =>
                      handleInputChange("taxAmount", e.target.value)
                    }
                  />
                ) : (
                  <Typography>{row.taxAmount}</Typography>
                )}
              </TableCell>
              <TableCell>
                {editingRowId === row.id ? (
                  <TextField
                    value={editedRow?.paidDate || ""}
                    onChange={(e) =>
                      handleInputChange("paidDate", e.target.value)
                    }
                  />
                ) : (
                  <Typography>{row.paidDate}</Typography>
                )}
              </TableCell>
              <TableCell>
                {editingRowId === row.id ? (
                  <TextField
                    value={editedRow?.remarks || ""}
                    onChange={(e) =>
                      handleInputChange("remarks", e.target.value)
                    }
                  />
                ) : (
                  <Typography>{row.remarks}</Typography>
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
                  <>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditClick(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
          {/* 新增行 */}
          {editingRowId === "new" && (
            <TableRow>
              <TableCell>
                <TextField
                  value={editedRow?.month || ""}
                  onChange={(e) => handleInputChange("month", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={editedRow?.taxName || ""}
                  onChange={(e) => handleInputChange("taxName", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={editedRow?.taxAmount || ""}
                  onChange={(e) =>
                    handleInputChange("taxAmount", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={editedRow?.paidDate || ""}
                  onChange={(e) =>
                    handleInputChange("paidDate", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={editedRow?.remarks || ""}
                  onChange={(e) => handleInputChange("remarks", e.target.value)}
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

export default TaxManagementTable;
