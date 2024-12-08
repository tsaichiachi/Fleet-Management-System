import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  Box,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTextHeight } from "@fortawesome/free-solid-svg-icons";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import Image from "next/image";

const FontSizeSelector = () => {
  const [fontSize, setFontSize] = useState("medium");
  const [anchorEl, setAnchorEl] = useState(null);

  // 動態修改全域字體大小
  useEffect(() => {
    const sizeMap = {
      small: "var(--font-size-small)",
      medium: "var(--font-size-medium)",
      large: "var(--font-size-large)",
    };
    document.documentElement.style.setProperty(
      "--font-size",
      sizeMap[fontSize]
    );
  }, [fontSize]);

  // 開啟與關閉 Popover
  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      {/* 點擊的圖標按鈕 */}
      <IconButton onClick={handleIconClick} aria-label="font-size-selector">
        <Image
          src="/images/text-formatting.png"
          alt="text"
          height={20}
          width={20}
          priority
        />
      </IconButton>

      {/* Popover 中的下拉選單 */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 2, minWidth: 100 }}>
          {/* <Typography variant="subtitle2" gutterBottom>
            字體大小
          </Typography> */}
          <Select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            fullWidth
          >
            <MenuItem value="small">小</MenuItem>
            <MenuItem value="medium">中</MenuItem>
            <MenuItem value="large">大</MenuItem>
          </Select>
        </Box>
      </Popover>
    </Box>
  );
};

export default FontSizeSelector;
