//貸款管理明細表格
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const taxManagement = [
  {
    id: "1",
    name: "陳春男",
    phone: "0965383316",
    licensePlate: "003-M9",
    insuranceCompany: "保險公司A",
    startDate: "2022-01-01",
    endDate: "2023-01-01",
    accountMonth: "2022-02",
    premium: 5000,
    insuranceType: "汽車保險",
    policyNumber: "POLICY001",
    cardNumber: "CARD001",
    returnDate: "2023-01-02",
  },
  {
    id: "2",
    name: "陳春男",
    phone: "0965383316",
    licensePlate: "003-M9",
    insuranceCompany: "保險公司B",
    startDate: "2022-02-01",
    endDate: "2023-02-01",
    accountMonth: "2022-03",
    premium: 6000,
    insuranceType: "汽車保險",
    policyNumber: "POLICY002",
    cardNumber: "CARD002",
    returnDate: "2023-02-02",
  },
  {
    id: "3",
    name: "陳春男",
    phone: "0965383316",
    licensePlate: "003-M9",
    insuranceCompany: "保險公司C",
    startDate: "2022-03-01",
    endDate: "2023-03-01",
    accountMonth: "2022-04",
    premium: 7000,
    insuranceType: "汽車保險",
    policyNumber: "POLICY003",
    cardNumber: "CARD003",
    returnDate: "2023-03-02",
  },
  {
    id: "4",
    name: "陳春男",
    phone: "0965383316",
    licensePlate: "003-M9",
    insuranceCompany: "保險公司D",
    startDate: "2022-04-01",
    endDate: "2023-04-01",
    accountMonth: "2022-05",
    premium: 8000,
    insuranceType: "汽車保險",
    policyNumber: "POLICY004",
    cardNumber: "CARD004",
    returnDate: "2023-04-02",
  },
];

const TaxManagementDetail = () => {
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
                編輯
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taxManagement.map((product) => (
            <TableRow key={product.id}>
              <TableCell
                sx={{
                  height: "auto", // 讓行高根據內容自動調整
                }}
              >
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {product.id}
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  height: "auto", // 讓行高根據內容自動調整
                }}
              >
                <Typography
                  fontWeight={400}
                  sx={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {product.insuranceCompany}
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  height: "auto", // 讓行高根據內容自動調整
                }}
              >
                <Typography
                  fontWeight={400}
                  sx={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {product.startDate}
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  height: "auto", // 讓行高根據內容自動調整
                }}
              >
                <Typography
                  fontWeight={400}
                  sx={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {product.endDate}
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  height: "auto", // 讓行高根據內容自動調整
                }}
              >
                <Typography
                  fontWeight={400}
                  sx={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {product.accountMonth}
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  height: "auto", // 讓行高根據內容自動調整
                }}
              >
                <Typography
                  fontWeight={400}
                  sx={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {product.premium}
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  height: "auto", // 讓行高根據內容自動調整
                }}
              >
                <Typography
                  fontWeight={400}
                  sx={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {product.insuranceType}
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  height: "auto", // 讓行高根據內容自動調整
                }}
              >
                <Typography
                  fontWeight={400}
                  sx={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {product.policyNumber}
                </Typography>
              </TableCell>

             

              
              <TableCell
                sx={{
                  height: "auto", // 讓行高根據內容自動調整
                }}
              >
                <Typography>
                  <IconButton aria-label="edit">
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
    </Box>
  );
};

export default TaxManagementDetail;
