import React, { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IMaskInput } from "react-imask";
import cls from "./PhoneInput.module.css";

interface PhoneInputProps {
  name: string;
  className?: string;
  readonly?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = forwardRef(
  ({ name, className, readonly }, ref) => {
    const { control, setValue, trigger, getValues } = useFormContext();
    const defaultValue = getValues(name) || "+998";

    const handleAccept = (value: string) => {
      const cleanValue = value.replaceAll(/[() -]/g, "");

      setValue(name, cleanValue, { shouldValidate: true });
      trigger(name);
    };

    return (
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        disabled={readonly}
        rules={{
          required: "Phone number is required",
          minLength: {
            value: 13,
            message: "Phone number must be 13 characters long",
          },
          maxLength: {
            value: 13,
            message: "Phone number must be 13 characters long",
          },
        }}
        render={({ fieldState: { error } }) => (
          <IMaskInput
            className={`${cls.phoneInput} ${className} ${error && cls.error}`}
            mask="+998 (##) ###-##-##"
            autoComplete="off"
            readOnly={readonly}
            ref={ref}
            radix=","
            defaultValue={defaultValue}
            definitions={{
              "#": /[0-9]/,
            }}
            onAccept={handleAccept}
          />
        )}
      />
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
