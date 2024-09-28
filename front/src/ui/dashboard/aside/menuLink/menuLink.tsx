"use client";
import Link from "next/link";
import cls from "./menuLink.module.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface MenuLinkProps {
  menu: {
    title: string;
    icon: ReactNode;
    path: string;
  };
}

const MenuLink = ({ menu }: MenuLinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={menu.path}
      className={`${cls.container} ${pathname === menu.path && cls.active}`}
    >
      {menu.icon}
      <span>{menu.title}</span>
    </Link>
  );
};

export default MenuLink;
