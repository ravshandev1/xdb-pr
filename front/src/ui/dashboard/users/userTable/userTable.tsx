"use client";

import { useEffect, useState, FC } from "react";
import { IUser } from "@/types";
import cls from "./userTable.module.css";
import Image from "next/image";
import { Button, Skeleton, useDisclosure } from "@chakra-ui/react";
import { ChangeUserModal } from "../modal/ChangeUserModal";
import { useGetUsers } from "@/hook/useGetUsers";
import { toast } from "react-toastify";
import { ConfirmModal } from "../modal/ConfirmModal";
import useUserManagement from "@/hook/useUserManagement";

const SkeletonRow: FC = () => (
  <tr className={cls.row}>
    <td className={cls.col}>
      <Skeleton height={5} />
    </td>
    <td className={cls.col}>
      <Skeleton height={5} />
    </td>
    <td className={cls.col}>
      <Skeleton height={5} />
    </td>
    <td className={cls.col}>
      <Skeleton height={5} />
    </td>
    <td className={cls.col}>
      <Skeleton height={5} />
    </td>
  </tr>
);

const EmptyState: FC = () => (
  <tr className={cls.empty}>
    <td colSpan={5}>
      <Image
        className={cls.emptyImage}
        src="/images/illustration_empty_content.svg"
        alt=""
        width={300}
        height={300}
      />
      <p className={cls.emptyText}>Ma&apos;lumotlar topilmadi</p>
    </td>
  </tr>
);

const UserRow: FC<{
  user: IUser;
  onChangeClick: (user: IUser) => void;
  onDeleteClick: (user: IUser) => void;
}> = ({ user, onChangeClick, onDeleteClick }) => (
  <tr className={cls.row} key={user.id}>
    <td className={cls.col}>{user.id}</td>
    <td className={cls.col}>{user.name}</td>
    <td className={cls.col}>{user.phone}</td>
    <td className={cls.col}>******</td>
    <td className={cls.col}>
      <Button className="mr-2" onClick={() => onChangeClick(user)}>
        Change
      </Button>
      <Button colorScheme="red" onClick={() => onDeleteClick(user)}>
        Delete
      </Button>
    </td>
  </tr>
);

const UserTable = () => {
  const { data, isLoading, error, isRefetching, refetch } = useGetUsers();
  const { deleteUser } = useUserManagement();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);

  const handleChangeClick = (user: IUser) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleDeleteClick = (user: IUser) => {
    setSelectedUser(user);
    onConfirmOpen();
  };

  const handleDelete = () => {
    if (!selectedUser) return;
    deleteUser(selectedUser.id).finally(() => {
      refetch();
      setSelectedUser(null);
      onConfirmClose();
    });
  };

  return (
    <>
      <table className={cls.table}>
        <thead className={cls.tableHead}>
          <tr className={cls.tableHeadRow}>
            <th className={cls.tableHeadTitle}>ID</th>
            <th className={cls.tableHeadTitle}>Name</th>
            <th className={cls.tableHeadTitle}>Phone Number</th>
            <th className={cls.tableHeadTitle}>Password</th>
            <th className={cls.tableHeadTitle}>Action</th>
          </tr>
        </thead>
        <tbody className={cls.tableBody}>
          {isLoading || isRefetching ? (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          ) : (
            <>
              {data?.length === 0 ? (
                <EmptyState />
              ) : (
                data?.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onChangeClick={handleChangeClick}
                    onDeleteClick={handleDeleteClick}
                  />
                ))
              )}
            </>
          )}
        </tbody>
      </table>

      {selectedUser && (
        <>
          <ChangeUserModal
            isOpen={isOpen}
            onClose={onClose}
            user={selectedUser}
          />

          <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={onConfirmClose}
            onClick={handleDelete}
            text={`Are you sure delete ${selectedUser.name}?`}
          />
        </>
      )}
    </>
  );
};

export default UserTable;
