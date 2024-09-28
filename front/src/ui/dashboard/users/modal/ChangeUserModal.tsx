import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { IUser, UpdateUserFormValues } from "@/types";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "@/ui/login/PhoneInput/PhoneInput";
import PasswordInput from "@/ui/login/PasswordInput/PasswordInput";
import Input from "@/ui/login/Input/Input";
import useUserManagement from "@/hook/useUserManagement";
import { useGetUsers } from "@/hook/useGetUsers";

interface ChangeUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
}

export function ChangeUserModal({
  isOpen,
  onClose,
  user,
}: ChangeUserModalProps) {
  const { updateUser } = useUserManagement();
  const { refetch } = useGetUsers();
  const methods = useForm<UpdateUserFormValues>({
    values: {
      name: user.name,
      phone: user.phone,
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<UpdateUserFormValues> = (data) => {
    updateUser(user.id, data).finally(() => {
      methods.reset();
      onClose();
      refetch();
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change User Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input error={errors.name} name="name" />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <PhoneInput className="w-full" name="phone" />
              </FormControl>
              <FormControl className="mt-3">
                <FormLabel>Password</FormLabel>
                <PasswordInput error={errors.password} />
              </FormControl>
              <div className="flex justify-end mt-3 gap-4">
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
