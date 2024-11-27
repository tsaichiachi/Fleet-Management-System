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



const VehicleTable = (data) => {
  //console.log(data);
  const router = useRouter();
  const cars = data?.data;
  //console.log(cars);  


  const handleViewClick = (licenseNumber) => {
    localStorage.setItem("licenseNumber", licenseNumber);
    router.push(`/vehicle-management/${licenseNumber}/ManagementFeeSetting`);
  };
  const handleEditClick = (licenseNumber) => {
    localStorage.setItem("licenseNumber", licenseNumber);
    router.push(`/vehicle-management/${licenseNumber}/Edit`);
  };

  const handleDeleteClick = (licenseNumber) => {
    console.log(`刪除車主 ID: ${licenseNumber}`);
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
                操作
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars?.map((car) => (
            <TableRow key={car.id}>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  {car.id}
                </Typography>
              </TableCell>

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
                    aria-label="view"
                    onClick={() => handleViewClick(car.licenseNumber)}
                  >
                    <VisibilityRoundedIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(car.licenseNumber)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteClick(car.licenseNumber)}
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

export default VehicleTable;
