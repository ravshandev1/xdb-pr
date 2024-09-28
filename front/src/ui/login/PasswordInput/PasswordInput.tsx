import React, { useState } from "react";
import { Icon } from "@iconify/react";
import eyeIcon from "@iconify-icons/mdi/eye";
import eyeOffIcon from "@iconify-icons/mdi/eye-off";
import cls from "./PasswordInput.module.css";
import { FieldError, useFormContext } from "react-hook-form";

interface PasswordInputProps {
  error: FieldError | undefined;
  name?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = (
  { error, name = "password" },
  ref
) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register } = useFormContext();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cls.passwordBox}>
      <input
        {...register(name, {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
        })}
        type={showPassword ? "text" : "password"}
        className={`${cls.passwordInput} ${error && cls.error}`}
        placeholder="Password"
      />
      <Icon
        className={cls.icon}
        onClick={togglePasswordVisibility}
        icon={showPassword ? eyeOffIcon : eyeIcon}
        width="24"
        height="24"
      />
    </div>
  );
};
export default PasswordInput;
