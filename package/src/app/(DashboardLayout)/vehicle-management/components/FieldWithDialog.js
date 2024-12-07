import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const FieldWithDialog = ({
  label,
  fieldName,
  value,
  error,
  register,
  dialogContent,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        {/* 輸入欄位 */}
        <Grid item xs={10}>
          <TextField
            disabled
            label={label}
            type="number"
            id={fieldName}
            error={!!error}
            {...register(fieldName)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        {/* 按鈕 */}
        <Grid item xs={2}>
          <Button
            variant="contained"
            onClick={handleOpenDialog}
            sx={{
              backgroundColor: "#81C0C0",
              color: "white",
              height: "30px",
              width: "20%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "grey.400",
              },
            }}
          >
            <EditIcon />
          </Button>
        </Grid>
      </Grid>

      {/* 彈跳視窗 */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="xl" fullWidth>
        <DialogTitle>{`${label}`}</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          {/* <Button variant="contained" onClick={handleCloseDialog}>
            儲存
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FieldWithDialog;
