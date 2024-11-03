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
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";

// 假資料
const mockData = [
  {
    id: 1,
    ownerName: "王小明",
    phoneNumber: "0912-345678",
    vehicleCount: 3,
    status: "啟用",
    joinDate: "2023-01-01",
  },
  {
    id: 2,
    ownerName: "李大華",
    phoneNumber: "0913-876543",
    vehicleCount: 2,
    status: "停用",
    joinDate: "2022-12-15",
  },
  {
    id: 3,
    ownerName: "張小美",
    phoneNumber: "0922-135724",
    vehicleCount: 5,
    status: "啟用",
    joinDate: "2021-11-30",
  },
];

const CarOwnerTable = () => {
  const router = useRouter();
 const handleViewClick = (id: any) => {
   //console.log(`查看車主 ID: ${id}`);
   router.push(`/driver-management/${id}/View`);
 };
  const handleEditClick = (id:any) => {
    //console.log(`查看車主 ID: ${id}`);
    router.push(`/driver-management/${id}/Edit`); 
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
                車主姓名
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                聯繫電話
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                車輛數量
              </Typography>
            </TableCell>
            {/* <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                車主狀態
              </Typography>
            </TableCell> */}
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
                  {owner.ownerName}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontWeight={400}
                >
                  {owner.phoneNumber}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontWeight={400}
                >
                  {owner.vehicleCount}
                </Typography>
              </TableCell>

              {/* <TableCell>
                <Typography color={owner.status === "啟用" ? "green" : "red"}>
                  {owner.status}
                </Typography>
              </TableCell> */}

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
                    aria-label="view"
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination count={10} />
      </Box>
    </Box>
  );
};

export default CarOwnerTable;
