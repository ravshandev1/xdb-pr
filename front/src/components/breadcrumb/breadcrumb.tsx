import React from "react";
import cls from "./breadcrumb.module.css";
import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className={cls.breadcrumb}>
      {items.map((item, index) => (
        <span key={index}>
          {index !== items.length - 1 ? (
            <Link href={item.href} className={cls.link}>
              {item.label}
            </Link>
          ) : (
            <span className={cls.current}>{item.label}</span>
          )}
          {index < items.length - 1 && " • "}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
