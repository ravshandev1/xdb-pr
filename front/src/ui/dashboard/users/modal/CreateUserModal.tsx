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
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CreateUserFormValues } from "@/types";
import PhoneInput from "@/ui/login/PhoneInput/PhoneInput";
import PasswordInput from "@/ui/login/PasswordInput/PasswordInput";
import Input from "@/ui/login/Input/Input";
import useUserManagement from "@/hook/useUserManagement";
import { useGetUsers } from "@/hook/useGetUsers";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  const { refetch } = useGetUsers();
  const methods = useForm<CreateUserFormValues>();
  const { createUser } = useUserManagement();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<CreateUserFormValues> = (data) => {
    createUser(data).finally(() => {
      refetch();
      onClose();
      methods.reset();
      methods.setValue("phone", "+998");
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New User</ModalHeader>
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
              <FormControl className="mt-3">
                <FormLabel>Confirm Password</FormLabel>
                <PasswordInput
                  name="confirm_password"
                  error={errors.confirm_password}
                />
              </FormControl>
              <div className="flex justify-end mt-3 gap-4">
                <Button colorScheme="blue" mr={3} type="submit">
                  Create
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
