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


const CarOwnerTable = ({
  data,
  // totalPages,
  // currentPage,
}) => {
  //console.log(data);
  const owner = data;
  //console.log(owner);
  const router = useRouter();


  const handleViewClick = (id) => {
    localStorage.setItem("owner_edit", id);
    router.push(`/driver-management/${id}/View`);
  };

  const handleEditClick = (id) => {
    localStorage.setItem("owner", id);
    router.push(`/driver-management/${id}/Edit`);
  };

  const handleDeleteClick = (id) => {
    localStorage.setItem("owner", id);
    console.log(`Deleting owner ID: ${id}`);
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
      {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => onPageChange(value)}
        />
      </Box> */}
    </Box>
  );
};

export default CarOwnerTable;
