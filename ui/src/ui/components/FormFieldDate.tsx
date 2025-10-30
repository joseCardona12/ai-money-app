"use client";

import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import DatePicker from "./DatePicker";

interface IFormFieldDateProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  placeholder?: string;
  isOptional?: boolean;
  className?: string;
}

export default function FormFieldDate<T extends FieldValues>({
  label,
  name,
  control,
  error,
  placeholder = "Select date",
  isOptional = false,
  className,
}: IFormFieldDateProps<T>): React.ReactNode {
  return (
    <div className="flex flex-col gap-1">
      {!isOptional ? (
        <label
          className="font-medium text-sm text-[var(--color-text-black)]"
          htmlFor={label.toLowerCase()}
        >
          {label}
        </label>
      ) : (
        <div className="flex items-center justify-between">
          <label
            className="font-medium text-sm text-[var(--color-text-black)]"
            htmlFor={label.toLowerCase()}
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
        render={({ field }) => (
          <DatePicker
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            className={className}
            error={error?.message}
          />
        )}
      />
    </div>
  );
}
