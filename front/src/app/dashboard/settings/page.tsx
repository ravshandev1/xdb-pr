"use client";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/contexts/AuthContext";
import { SettingsFormValues } from "@/types";
import PasswordInput from "@/ui/login/PasswordInput/PasswordInput";
import PhoneInput from "@/ui/login/PhoneInput/PhoneInput";
import { Button, FormControl, FormLabel, Heading } from "@chakra-ui/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const SettingsPage = () => {
  const { user, changePassword } = useAuth();

  const methods = useForm<SettingsFormValues>({
    values: {
      phone: user ? user.phone : "+998",
      password: "",
      new_password: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<SettingsFormValues> = (data) => {
    changePassword(data);
    methods.resetField("new_password");
    methods.resetField("password");
  };

  return (
    <PrivateRoute allowedRoles={["superadmin", "user"]}>
      <main>
        <Heading className="mb-5" as="h1" size="md">
          Change Phone Number and Password
        </Heading>
        <FormProvider {...methods}>
          <form className="max-w-xl" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <PhoneInput readonly={true} className="w-full" name="phone" />
            </FormControl>
            <FormControl className="mt-3">
              <FormLabel>Old Password</FormLabel>
              <PasswordInput error={errors.password} />
            </FormControl>
            <FormControl className="mt-3">
              <FormLabel>New Password</FormLabel>
              <PasswordInput name="new_password" error={errors.new_password} />
            </FormControl>
            <div className="flex justify-end mt-3 gap-4">
              <Button colorScheme="blue" type="submit">
                Save
              </Button>
            </div>
          </form>
        </FormProvider>
      </main>
    </PrivateRoute>
  );
};

export default SettingsPage;
