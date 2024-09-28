"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { RoleType } from "@/types";
import { navigateTo } from "@/lib/navigation";

interface PrivateRouteProps {
  allowedRoles: RoleType[];
  redirectPath?: string;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  allowedRoles,
  redirectPath = "/login",
  children,
}) => {
  const { role, user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !role || !allowedRoles.includes(role)) {
      navigateTo(redirectPath);
    }
  }, [role, allowedRoles, user, redirectPath]);

  if (!role || !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
