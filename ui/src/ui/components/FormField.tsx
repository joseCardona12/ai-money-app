"use client";

import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import Input from "./Input";
import { ReactElement } from "react";

interface IFormFieldProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  placeholder: string;
  id?: string;
  withIcon?: boolean;
  showIcon?: boolean;
  secondType?: string;
  setShowIcon?: (value: boolean) => void;
  icon?: ReactElement;
  secondIcon?: ReactElement;
  isOptional?: boolean;
  className?: string;
}

export default function FormField<T extends FieldValues>({
  label,
  type,
  name,
  control,
  error,
  placeholder,
  id,
  withIcon,
  showIcon,
  secondType,
  setShowIcon,
  icon,
  secondIcon,
  isOptional = false,
  className,
}: IFormFieldProps<T>): React.ReactNode {
  return (
    <div className={`flex flex-col gap-1`}>
      {!isOptional ? (
        <label
          className={`font-medium text-sm`}
          htmlFor={id || label.toLocaleLowerCase()}
        >
          {label}
        </label>
      ) : (
        <div className="flex items-center justify-between">
          <label
            className={`font-medium text-sm`}
            htmlFor={id || label.toLocaleLowerCase()}
          >
            {label}
          </label>
          <span className="text-sm text-[var(--color-text-gray)]">
            Optional
          </span>
        </div>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          withIcon ? (
            <div className={`relative`}>
              <Input
                type={showIcon && secondType ? secondType : type}
                placeholder={placeholder}
                {...field}
                id={id ?? label.toLocaleLowerCase()}
                error={error?.message}
              />
              <span
                className="absolute top-3 right-3 bg-white cursor-pointer text-[var(--color-text-gray)]"
                onClick={() => {
                  setShowIcon?.(!showIcon);
                }}
              >
                {!showIcon ? icon : secondIcon}
              </span>
            </div>
          ) : (
            <Input
              {...field}
              id={id ?? label.toLocaleLowerCase()}
              type={type}
              placeholder={placeholder}
              error={error?.message}
              className={className}
            />
          )
        }
      />
    </div>
  );
}
