"use client";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { navigateTo } from "@/lib/navigation";

const HomePage = () => {
  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token || user) {
      navigateTo("/dashboard");
    } else {
      navigateTo("/login");
    }
  }, [user]);

  return null;
};

export default HomePage;
