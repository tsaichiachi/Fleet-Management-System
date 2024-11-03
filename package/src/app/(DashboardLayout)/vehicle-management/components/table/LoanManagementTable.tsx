//貸款管理 
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
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";


const products = [
  {
    id: "1",
    name: "陳春男",
    phone: "0965383316",
    licensePlate: "003-M9",
  },
  {
    id: "2",
    name: "陳春男",
    phone: "0965383316",
    licensePlate: "003-M9",
  },
  {
    id: "3",
    name: "陳春男",
    phone: "0965383316",
    licensePlate: "003-M9",
  },
  {
    id: "4",
    name: "陳春男",
    phone: "0965383316",
    licensePlate: "003-M9",
  },
];

const LoanManagementTable = () => {
  const router = useRouter();

  const handleEditClick = (id: any) => {
    router.push(`/vehicle-management/${id}/LoanManagement/Edit`);
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
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                貸款公司
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                起日
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                止日
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                貸款總額
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                每月還款
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                是否入帳
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                備註
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
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {product.name}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontWeight={400}
                >
                  {product.phone}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontWeight={400}
                >
                  {product.licensePlate}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontWeight={400}
                >
                  {product.licensePlate}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontWeight={400}
                >
                  {product.licensePlate}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontWeight={400}
                >
                  {product.licensePlate}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontWeight={400}
                >
                  {product.licensePlate}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(product.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Typography>
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

export default LoanManagementTable;
