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
import { useDeleteInsurance } from "../../apihooks";

const PolicyManagmentTable = ({ data, carLicenseNum, refreshData }) => {

  //console.log("data:", data);
  const router = useRouter();

  const { mutate: deleteInsurance } = useDeleteInsurance();

  const handleEditClick = (carLicenseNum, insuranceCardNum) => {
    router.push(
      `/vehicle-management/${carLicenseNum}/PolicyManagement/Edit?insuranceCardNum=${insuranceCardNum}`
    );
  };

  const handleDeleteClick = (carLicenseNum, insuranceCardNum) => {
    deleteInsurance(
      { carLicenseNum, insuranceCardNum },
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
                    {product.insuranceCom}
                  </Typography>
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
                  <Typography fontWeight={400}>
                    {product.insuranceNum}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={400}>
                    {product.insuranceCardNum}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={400}>{product.quitDate}</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={400}>
                    {product.status === "DISABLE"
                      ? "是"
                      : product.status === "ENABLE"
                      ? "否"
                      : ""}
                  </Typography>
                </TableCell>
                <TableCell>
                  {product.status === "ENABLE" ? (
                    <>
                      <IconButton
                        aria-label="edit"
                        onClick={() =>
                          handleEditClick(
                            carLicenseNum,
                            product.insuranceCardNum
                          )
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          handleDeleteClick(
                            carLicenseNum,
                            product.insuranceCardNum
                          )
                        }
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

export default PolicyManagmentTable;
