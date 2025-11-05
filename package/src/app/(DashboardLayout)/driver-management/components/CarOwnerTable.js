"use client";
import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { requestHttp } from "@/utils/requestHttp";


const CarOwnerTable = ({
  data,
  refetch,
}) => {
  const owner = data;
  const router = useRouter();

  const handleViewClick = (id) => {
    localStorage.setItem("owner_edit", id);
    router.push(`/driver-management/${id}/View`);
  };

  const handleEditClick = (id) => {
    localStorage.setItem("owner", id);
    router.push(`/driver-management/${id}/Edit`);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("確定要刪除這筆資料嗎？")) return;
    try {
      const response = await requestHttp(`car/disableCarOwner`, {
        method: "POST",
        data: {
          id: id,
          status: "disable",
        },
      });

      if (response?.code === "G_0000") {
        alert("刪除成功！");
        refetch(); // 重新抓取資料以更新表格
      } else {
        alert(`刪除失敗: ${response?.message || "未知錯誤"}`);
      }
    } catch (error) {
      console.error("刪除失敗:", error);
      alert("刪除失敗，請稍後再試！");
    }
  };

  if (!data || data.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>資料加載中...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ overflow: "auto", width: { xs: "auto", sm: "auto" } }}>
      <Table
        aria-label="car owner table"
        sx={{
          whiteSpace: "nowrap",
          mt: 2,
          tableLayout: "fixed",
          overflow: "auto",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                車主姓名
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                手機
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
          {data?.length > 0 ? (
            data.map((owner) => (
              <TableRow key={owner.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {owner.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {owner.mobile}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      aria-label="view"
                      onClick={() => handleViewClick(owner.id)}
                    >
                      <VisibilityRoundedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditClick(owner.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteClick(owner.id)}
                      color="error"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="subtitle2" fontWeight={400}>
                  尚無資料
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CarOwnerTable;
