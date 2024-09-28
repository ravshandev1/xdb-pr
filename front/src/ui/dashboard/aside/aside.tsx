import Link from "next/link";
import cls from "./aside.module.css";
import Image from "next/image";
import { menuItems } from "@/constants";
import MenuLink from "./menuLink/menuLink";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { CiLogout } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthContext";
import { navigateTo } from "@/lib/navigation";

interface AsideProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

const Aside = ({ isOpen, toggleOpen }: AsideProps) => {
  const { role, logout, user } = useAuth();
  const handleLogout = () => {
    logout();
    navigateTo("/login");
  };

  return (
    <aside className={cls.container} data-open={isOpen}>
      <div>
        <Link href="/">
          <Image src="/images/logo.png" alt="" width={80} height={40} />
        </Link>

        <button className={cls.asideBtn} onClick={toggleOpen}>
          {isOpen ? <MdOutlineArrowRight /> : <MdOutlineArrowLeft />}
        </button>

        <div className={cls.user}>
          <Avatar bg="teal.500" name={user?.name} src={user?.image} />
          <div className="flex flex-col">
            <p className={cls.userName}>{user?.name}</p>
            <p className={`text-sm ${cls.userName}`}>{user?.phone}</p>
          </div>

          <Menu>
            <MenuButton className={cls.dots}>
              <BsThreeDots />
            </MenuButton>
            <MenuList className="!z-10">
              <MenuItem
                onClick={() => {
                  navigateTo("/dashboard/settings");
                }}
                icon={<IoSettingsOutline />}
              >
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout} icon={<CiLogout />}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        <ul className={cls.list}>
          {menuItems
            .filter((item) => item.allowedRules.includes(role!))
            .map((menu) => (
              <li className={cls.listItem} key={menu.title}>
                <MenuLink menu={menu} />
              </li>
            ))}
        </ul>
      </div>

      <Button
        className="flex !justify-start gap-3 !p-4 hover:bg-slate-300 w-full"
        colorScheme="blue"
        variant="ghost"
        onClick={handleLogout}
      >
        <CiLogout className="text-2xl" />
        <span className={cls.logout}>Logout</span>
      </Button>
    </aside>
  );
};

export default Aside;
