"use client";

import { useAuth } from "@/contexts/AuthContext";
import API from "@/lib/API";
import { IUser } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  const { role } = useAuth();
  return useQuery({
    queryKey: ["users"],
    refetchInterval: 30_000,
    queryFn: async () => {
      if (role === "superadmin") {
        const res = await API.get("/users");
        return res.data as IUser[];
      }
      return [];
    },
  });
};
