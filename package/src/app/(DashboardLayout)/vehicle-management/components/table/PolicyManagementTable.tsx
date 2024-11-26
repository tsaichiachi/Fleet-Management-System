import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";

interface Policy {
  id: number;
  insuranceCom: string;
  startDate: string;
  endDate: string;
  payUsDate: string;
  amount: number;
  insuranceType: string;
  insuranceNum: string;
  insuranceCardNum: string;
  
}

interface PolicyManagmentTableProps {
  data: Policy[];
}

const PolicyManagmentTable: React.FC<PolicyManagmentTableProps> = ({
  data,
}) => {
  console.log("data:", data);
  const router = useRouter();

  const handleEditClick = (id: number) => {
    router.push(`/vehicle-management/${id}/PolicyManagement/Edit`);
  };

  const handleDeleteClick = (id: number) => {
    console.log(`Deleting policy with ID: ${id}`);
  };

  return (
    <Box sx={{ overflow: "auto", width: { xs: "auto", sm: "auto" } }}>
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: "nowrap",
          mt: 2,
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
                保險公司
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
                入帳月
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                保費
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                保險種類
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                保單號碼
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                保卡號碼
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                退日
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
          {data?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Typography fontWeight={500}>{product.id}</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={400}>{product.insuranceCom}</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={400}>{product.startDate}</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={400}>{product.endDate}</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={400}>{product.payUsDate}</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={400}>{product.amount}</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={400}>
                  {product.insuranceType}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={400}>{product.insuranceNum}</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={400}>
                  {product.insuranceCardNum}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={400}>{product.endDate}</Typography>
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditClick(product.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteClick(product.id)}
                >
                  <DeleteIcon />
                </IconButton>
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

export default PolicyManagmentTable;
