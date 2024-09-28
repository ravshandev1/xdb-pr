"use client";
import React, { useEffect, useState } from "react";
import Aside from "@/ui/dashboard/aside/aside";
import Navbar from "@/ui/dashboard/navbar/navbar";
import cls from "@/ui/dashboard/dashboard.module.css";
import { useGetUser } from "@/hook/useGetUser";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { refetch } = useGetUser();

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className={cls.container}>
      <div className={cls.aside} data-open={isOpen}>
        <Aside isOpen={isOpen} toggleOpen={toggleOpen} />
      </div>
      <div className={cls.content}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
