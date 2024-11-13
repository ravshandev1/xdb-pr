import API from "@/lib/API";
import { IApplication } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface GetApplicationsParams {
  limit?: number;
  offset?: number;
  year?: number;
  month?: number;
  stir?: number;
}

export const useGetApplications = (params?: GetApplicationsParams) => {
  const queryClient = useQueryClient();
  const queryKey = params ? ["applications", params] : ["applications"];
  const query = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const res = await API.get("/applications", {
          params: {
            limit: params?.limit,
            offset: params?.offset,
            year: params?.year,
            month: params?.month,
            stir: params?.stir,
          },
        });
        return res.data as IApplication;
      } catch (err) {
        toast.error("Something went wrong");
        throw err;
      }
    },
  });

  const uploadFile = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await API.post("/applications", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return res.data;
      } catch (err) {
        toast.error("Failed to upload file");
        throw err;
      }
    },
    onSuccess: () => {
      toast.success("File uploaded successfully");
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  const sendAppliction = useMutation({
    mutationFn: async (id: number) => {
      try {
        const res = await API.get(`/application/${id}`);
        return res.data;
      } catch (err) {
        toast.error("Failed to send application");
        throw err;
      }
    },
    onSuccess: () => {
      toast.success("Application sent successfully");
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return {
    ...query,
    sendAppliction,
    uploadFile,
  };
};
