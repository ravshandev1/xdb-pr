"use client";
import API from "@/lib/API";
import { navigateTo } from "@/lib/navigation";
import { BaseFormValues, IUser, RoleType, SettingsFormValues } from "@/types";
import { isAxiosError } from "axios";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";

interface AuthContextType {
  user: IUser | null;
  role: RoleType | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setRole: React.Dispatch<React.SetStateAction<RoleType | null>>;
  login: (data: BaseFormValues) => void;
  logout: () => void;
  changePassword: (data: SettingsFormValues) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [role, setRole] = useState<RoleType | null>("user");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (data: BaseFormValues) => {
    setIsLoading(true);
    try {
      const response = await API.post("/login", data);
      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      navigateTo("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data.message);
      }
    }
    setIsLoading(false);
  };

  const changePassword = async (data: SettingsFormValues) => {
    setIsLoading(true);
    try {
      const response = await API.patch("/change-password/", {
        old_password: data.password,
        new_password: data.new_password,
        confirm_password: data.new_password,
      });

      if (response.status === 200) {
        toast.success("Password changed successfully");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data.message);
      }
    }
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setUser,
        setRole,
        login,
        logout,
        isLoading,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
