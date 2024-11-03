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
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { requestHttp } from "@/utils/requestHttp";
import { useEffect, useState } from "react";



const CarOwnerTable = () => {
  const router = useRouter();
  const handleEditClick = (id: any) => {
   router.push(`/create-car-cegistration/Edit`);
   localStorage.setItem("carOwnerId", id);
  };

   const [singleData, setSingleData] = useState<any[]>([]);

   const fetchData = async () => {
     try {
       const data = await requestHttp("car/carInfo", {
         method: "POST",
         isDefault: false,
       });
       //console.log(data);
       const fetchedData = data.data;
       //console.log(fetchedData);
       setSingleData(fetchedData);
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };

   useEffect(() => {
     fetchData();
   }, []);

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
                車主
              </Typography>
            </TableCell>

            {/* <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                行動電話
              </Typography>
            </TableCell> */}
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                車牌號碼
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
          {singleData.map((owner) => (
            <TableRow key={owner.id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {owner.id}
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
                      {owner.ownerName}
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
                  {owner.licenseNumber}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(owner.id)}
                  >
                    <VisibilityRoundedIcon />
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

export default CarOwnerTable;
