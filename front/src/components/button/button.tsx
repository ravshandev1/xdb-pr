import { ReactNode } from "react";
import cls from "./button.module.css";

interface ButtonProps {
  children: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  Icon?: ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className,
  Icon,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${cls.button} ${className}`}
    >
      {Icon ? Icon : ""}
      {children}
    </button>
  );
};

export default Button;
