//貸款管理
"use client";
import React, { useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Box from "@mui/material/Box";
import LoanManagementForm from "../../components/form/LoanManagement";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import LoanCompanyTable from "../../components/table/LoanCompanyTable";


const LoanManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);

  //貸款公司彈跳視窗
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <PageContainer title="" description="">
      <DashboardCard title="">
        <Box>
          {/* <Button
            variant="contained"
            onClick={handleOpenDialog}
            sx={{ marginLeft: "1%", marginTop: "1%", marginBottom: "2%" }}
          >
            貸款公司
          </Button> */}
        </Box>
        <Box sx={{ width: { xs: "400px", sm: "auto" } }}>
          <Box>
            <LoanManagementForm />
          </Box>
        </Box>
      </DashboardCard>
      {/* <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>貸款公司列表</DialogTitle>
        <DialogContent><LoanCompanyTable /></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>關閉</Button>
        </DialogActions>
      </Dialog> */}
    </PageContainer>
  );
};

export default LoanManagement;
