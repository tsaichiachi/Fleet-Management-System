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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";

// 假資料
const mockData = [
  {
    id: 1,
    plateNumber: "ABC-1234", // 車牌號碼
    ownerName: "王小明", // 車主名稱
    phoneNumber: "0912-345678", // 電話號碼
    vehicleModel: "xxx", // 車輛型號
    joinDate: "2023-01-01", // 加入日期
  },
  {
    id: 2,
    plateNumber: "XYZ-5678",
    ownerName: "李大華",
    phoneNumber: "0913-876543",
    vehicleModel: "xxx",
    joinDate: "2022-12-15",
  },
  {
    id: 3,
    plateNumber: "LMN-9101",
    ownerName: "張小美",
    phoneNumber: "0922-135724",
    vehicleModel: "xxx",
    joinDate: "2021-11-30",
  },
];

const VehicleTable = () => {
    const router = useRouter();
    const handleViewClick = (id: any) => {
      //console.log(`查看車主 ID: ${id}`);
      router.push(`/vehicle-management/${id}`);
    };
    const handleEditClick = (id: any) => {
      //console.log(`查看車主 ID: ${id}`);
      router.push(`/vehicle-management/${id}/Edit`);
    };

    const handleDeleteClick = (id: any) => {
      console.log(`刪除車主 ID: ${id}`);
    };

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
            <TableCell sx={{ width: "6%" }}>
              <Typography variant="subtitle2" fontWeight={600}>
                ID
              </Typography>
            </TableCell>
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
                車輛型號
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                加入日期
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
          {mockData.map((owner) => (
            <TableRow key={owner.id}>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  {owner.id}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {owner.plateNumber} {/* 車牌號碼 */}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontWeight={400}
                >
                  {owner.ownerName} {/* 車主名稱 */}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontWeight={400}
                >
                  {owner.vehicleModel}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontWeight={400}
                >
                  {owner.joinDate}
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
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default VehicleTable;
