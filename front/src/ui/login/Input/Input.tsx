import React from "react";
import cls from "./Input.module.css";
import { FieldError, useFormContext } from "react-hook-form";

interface PasswordInputProps {
  error: FieldError | undefined;
  name?: string;
}

const Input: React.FC<PasswordInputProps> = ({ error, name = "name" }) => {
  const { register } = useFormContext();

  return (
    <div className={cls.passwordBox}>
      <input
        {...register(name, {
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Name must be at least 3 characters long",
          },
        })}
        type="text"
        className={`${cls.input} ${error && cls.error}`}
        placeholder="Name"
      />
    </div>
  );
};
export default Input;
