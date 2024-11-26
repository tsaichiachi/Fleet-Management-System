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
import { format } from "date-fns";

// Define the CarOwner type
interface CarOwner {
  id: number;
  ownerName: string;
  licenseNumber: string;
}

interface CarOwnerTableProps {
  data: CarOwner[];
  // totalPages: number;
  // currentPage: number;
  //onPageChange: (page: number) => void;
}

const CarOwnerTable: React.FC<CarOwnerTableProps> = ({
  data,
  // totalPages,
  // currentPage,
}) => {
  const router = useRouter();

  const handleViewClick = (id: number) => {
    router.push(`/driver-management/${id}/View`);
  };

  const handleEditClick = (id: number) => {
    router.push(`/driver-management/${id}/Edit`);
  };

  const handleDeleteClick = (id: number) => {
    console.log(`Deleting owner ID: ${id}`);
  };

  if (!data || data.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>No data available</Typography>
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
                車牌號碼
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
          {data.map((owner) => (
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
                  {owner.licenseNumber}
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          // count={totalPages}
          // page={currentPage}
          //onChange={(event, value) => onPageChange(value)}
        />
      </Box>
    </Box>
  );
};

export default CarOwnerTable;
