import { ImStatsDots } from "react-icons/im";
import { FaUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

export const menuItems = [
  {
    title: "Asosiy Panel",
    path: "/dashboard",
    icon: <ImStatsDots />,
    allowedRules: ["superadmin", "user"],
  },
  {
    title: "Foydalanuvchilar",
    path: "/dashboard/users",
    icon: <FaUser />,
    allowedRules: ["superadmin"],
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: <IoSettingsOutline />,
    allowedRules: ["superadmin", "user"],
  },
];

export const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;
