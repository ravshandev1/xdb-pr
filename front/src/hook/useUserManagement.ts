import API from "@/lib/API";
import { CreateUserFormValues, UpdateUserFormValues } from "@/types";
import { AxiosError, isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useUserManagement = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const createUser = async (data: CreateUserFormValues) => {
    try {
      const res = await API.post("/register", data);
      if (res.status === 200) {
        toast.success("User created successfully");
        return res.data;
      }

      setIsLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data.message);
      }
      setIsLoading(false);
      setError(isAxiosError(error) ? error : null);
    }
  };

  const updateUser = async (id: string, data: UpdateUserFormValues) => {
    setIsLoading(true);
    try {
      const res = await API.patch(`/user/${id}`, data);
      if (res.status === 200) {
        toast.success("User updated successfully");
        return res.data;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data.message || "Failed to update user");
      }
      setError(isAxiosError(error) ? error : null);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await API.delete(`/user/${id}`);
      if (res.status === 200) {
        toast.success("User deleted successfully");
        return res.data;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data.message || "Failed to delete user");
      }
      setError(isAxiosError(error) ? error : null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateUser,
    createUser,
    deleteUser,
    isLoading,
    error,
  };
};

export default useUserManagement;
