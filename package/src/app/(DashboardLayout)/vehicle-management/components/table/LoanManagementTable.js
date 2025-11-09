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
import { useDeleteLoan } from "../../apihooks";

const LoanManagementTable = ({ data, carLicenseNum, refreshData }) => {
  //console.log("data:", data);
  const router = useRouter();

  const { mutate: deleteLoan } = useDeleteLoan();

  const handleEditClick = (id) => {
    router.push(
      `/vehicle-management/${carLicenseNum}/LoanManagement/Edit?insuranceCardNum=${id}`
    );
  };

  const handleDeleteClick = (id) => {
    const isConfirmed = window.confirm(
      "確定要作廢這筆資料嗎？此操作無法還原！"
    );
    if (!isConfirmed) return;

    deleteLoan(
      { id },
      {
        onSuccess: () => {
          alert("作廢成功");
          refreshData();
        },
        onError: (error) => {
          alert("作廢失敗");
          console.error("删除失败：", error);
        },
      }
    );
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
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                車牌號碼
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
                作廢
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
            data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Typography fontWeight={400}>
                    {product.carLicenseNum}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={400}>
                    {product.loanCompany}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={400}>{product.startDate}</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={400}>{product.endDate}</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={400}>
                    {product.totalAmount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={400}>
                    {product.monthPayAmount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={400}>
                    {product.status === "disable"
                      ? "是"
                      : product.status === "enable"
                      ? "否"
                      : ""}
                  </Typography>
                </TableCell>
                <TableCell>
                  {product.status === "enable" ? (
                    <>
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
                    </>
                  ) : (
                    "已作廢"
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11} align="center">
                <Typography fontWeight={400}>尚無資料</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination count={10} />
      </Box> */}
    </Box>
  );
};

export default LoanManagementTable;
