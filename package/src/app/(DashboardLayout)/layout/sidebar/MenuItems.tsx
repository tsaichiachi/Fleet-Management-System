import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconBusinessplan,
  IconCarCrash,
  IconFileDollar,
  IconHomeDollar,
  IconCarCrane,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Utilities",
  },
  {
    id: uniqueId(),
    title: "Typography",
    icon: IconTypography,
    href: "/utilities/typography",
  },
  {
    id: uniqueId(),
    title: "Shadow",
    icon: IconCopy,
    href: "/utilities/shadow",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/sample-page",
  },
  {
    navlabel: true,
    subheader: "基本代號1",
  },
  {
    id: uniqueId(),
    title: "車籍資料",
    icon: IconCarCrane,
    href: "/create-car-cegistration",
  },
  {
    id: uniqueId(),
    title: "管費設定",
    icon: IconBusinessplan,
    href: "/ManagementFeeSetting",
  },
  {
    id: uniqueId(),
    title: "保單管理",
    icon: IconCarCrash,
    href: "/PolicyManagement",
  },
  {
    id: uniqueId(),
    title: "貸款管理",
    icon: IconFileDollar,
    href: "/LoanManagement",
  },
  {
    id: uniqueId(),
    title: "稅金管理",
    icon: IconHomeDollar,
    href: "/TaxManagement",
  },
];

export default Menuitems;
