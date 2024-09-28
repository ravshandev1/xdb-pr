import API from "@/lib/API";
import { IApplication } from "@/types";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface GetApplicationsParams {
  limit?: number;
  offset?: number;
  year?: number;
  month?: number;
}

export const useGetApplications = (params?: GetApplicationsParams) => {
  const query = useQuery({
    queryKey: ["applications", params],
    queryFn: async () => {
      try {
        const res = await API.get("/applications", {
          params: {
            limit: params?.limit,
            offset: params?.offset,
            year: params?.year,
            month: params?.month,
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
      query.refetch();
    },
  });

  return {
    ...query,
    uploadFile,
  };
};
