"use client";
import PrivateRoute from "@/components/PrivateRoute";
import { useDate } from "@/contexts/DateContext";
import { useGetApplications } from "@/hook/useApplication";
import Pagination from "@/ui/dashboard/table/pagination/pagination";
import Table from "@/ui/dashboard/table/table";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { date } = useDate();
  const { data, isLoading, isRefetching } = useGetApplications({
    limit: 50,
    offset: currentPage,
    month: date?.getMonth() ? date?.getMonth() + 1 : 1,
    year: date?.getFullYear() && date?.getFullYear(),
  });
  const totalPages = data ? Math.ceil(data?.count / 50) : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [date]);

  return (
    <PrivateRoute allowedRoles={["superadmin", "user"]}>
      <main>
        <Table isLoading={isLoading || isRefetching} data={data?.results} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </PrivateRoute>
  );
};

export default DashboardPage;
