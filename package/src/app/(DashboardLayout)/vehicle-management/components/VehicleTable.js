"use client";

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
import React from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { requestHttp } from "@/utils/requestHttp";

const VehicleTable = ({ data, refetch }) => {
  const router = useRouter();
  const cars = data;

  const handleViewClick = (licenseNumber, ownerName) => {
    localStorage.setItem("licenseNumber", licenseNumber);
    localStorage.setItem("ownerName", ownerName);
    router.push(`/vehicle-management/${licenseNumber}/ManagementFeeSetting`);
  };

  const handleEditClick = (licenseNumber, ownerName) => {
    localStorage.setItem("licenseNumber", licenseNumber);
    localStorage.setItem("ownerName", ownerName);
    router.push(`/vehicle-management/${licenseNumber}/Edit`);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("確定要刪除這筆資料嗎？")) return;
    try {
      const response = await requestHttp(`car/disableCar`, {
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
        aria-label="simple table"
        sx={{
          whiteSpace: "nowrap",
          mt: 2,
          tableLayout: "fixed",
          overflow: "auto",
        }}
      >
        <TableHead>
          <TableRow>
            {/* <TableCell sx={{ width: "6%" }}>
              <Typography variant="subtitle2" fontWeight={600}>
                ID
              </Typography>
            </TableCell> */}
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                車牌號碼
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                車主
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
          {data && data.length > 0 ? (
            data.map((car) => (
              <TableRow key={car.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {car.licenseNumber}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {car.ownerName}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      aria-label="edit"
                      onClick={() =>
                        handleEditClick(car.licenseNumber, car.ownerName)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="view"
                      onClick={() =>
                        handleViewClick(car.licenseNumber, car.ownerName)
                      }
                    >
                      <LibraryBooksIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteClick(car.id)}
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

export default VehicleTable;
