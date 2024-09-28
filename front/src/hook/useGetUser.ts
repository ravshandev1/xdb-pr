"use client";

import { useAuth } from "@/contexts/AuthContext";
import API from "@/lib/API";
import { navigateTo } from "@/lib/navigation";
import { IUser } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { setUser, setRole } = useAuth();
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await API.get("/user");
        setRole(res.data.superuser ? "superadmin" : "user");
        setUser(res.data);
        return res.data as IUser;
      } catch (err) {
        navigateTo("/login");
      }
    },
  });
};
