import PrivateRoute from "@/components/PrivateRoute";
import UserTable from "@/ui/dashboard/users/userTable/userTable";

const UsersPage = () => {
  return (
    <PrivateRoute allowedRoles={["superadmin"]} redirectPath="/dashboard">
      <main>
        <UserTable />
      </main>
    </PrivateRoute>
  );
};

export default UsersPage;
