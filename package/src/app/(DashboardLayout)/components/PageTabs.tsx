import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

export default function PageTabs() {
  const [value, setValue] = React.useState("one");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

const router = useRouter();
const handleEditClick = (id: any) => {
  router.push(`/create-car-cegistration/${id}/overview`);
};

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="車籍資料" />
        <Tab
          value="two"
          label="管費設定"
        />
        <Tab value="three" label="保單管理" />
        <Tab value="four" label="貸款管理" />
        <Tab value="five" label="稅金管理" />
      </Tabs>
    </Box>
  );
}
