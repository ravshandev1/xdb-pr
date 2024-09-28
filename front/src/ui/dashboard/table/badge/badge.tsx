import React from "react";
import cls from "./badge.module.css";
import { IStatus } from "@/types";

interface BadgeProps {
  status: string;
  errorMessage?: string;
}

const Badge: React.FC<BadgeProps> = ({ status, errorMessage }) => {
  let text = "";
  let colorClass = "";

  switch (status) {
    case IStatus.Yuborilmagan:
      text = IStatus.Yuborilmagan;
      colorClass = cls.blue;
      break;
    case IStatus.Muvaffaqiyatli:
      text = IStatus.Muvaffaqiyatli;
      colorClass = cls.green;
      break;
    case IStatus.Xatolik:
      text = IStatus.Xatolik;
      colorClass = cls.red;
      break;
  }

  return (
    <div className={cls.badgeContainer}>
      <span className={`${cls.badge} ${colorClass}`}>{text}</span>
      {status === "Xatolik" && errorMessage && (
        <div className={cls.tooltip}>{errorMessage}</div>
      )}
    </div>
  );
};

export default Badge;
