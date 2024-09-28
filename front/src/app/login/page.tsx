"use client";
import React from "react";
import cls from "@/ui/login/login.module.css";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { BaseFormValues } from "@/types";
import PhoneInput from "@/ui/login/PhoneInput/PhoneInput";
import PasswordInput from "@/ui/login/PasswordInput/PasswordInput";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/button/button";
import { navigateTo } from "@/lib/navigation";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const methods = useForm<BaseFormValues>();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const { login, isLoading } = useAuth();

  const onSubmit: SubmitHandler<BaseFormValues> = (data) => {
    login(data);
  };

  return (
    <main className={cls.container}>
      <header className={cls.header}>
        <Link href="/">
          <Image src="/images/logo.png" alt="" width={80} height={40} />
        </Link>
      </header>
      <FormProvider {...methods}>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className={cls.form}
        >
          <h2 className={cls.title}>Войдите в XDB</h2>
          <div className={cls.formItem}>
            <label className={cls.label}>Phone Number</label>
            <PhoneInput name="phone" />
          </div>
          <div className={cls.formItem}>
            <label className={cls.label}>Password</label>
            <PasswordInput error={errors.password} />
          </div>
          <Button disabled={isLoading} type="submit">
            Kirish
          </Button>
        </form>
      </FormProvider>
    </main>
  );
};

export default LoginPage;
