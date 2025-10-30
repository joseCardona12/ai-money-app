"use client";

import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import Input from "./Input";

interface IFormFieldNumberProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  placeholder: string;
  id?: string;
  isOptional?: boolean;
  className?: string;
  min?: number;
  max?: number;
}

export default function FormFieldNumber<T extends FieldValues>({
  label,
  name,
  control,
  error,
  placeholder,
  id,
  isOptional = false,
  className,
  min,
  max,
}: IFormFieldNumberProps<T>): React.ReactNode {
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
        render={({ field }) => (
          <Input
            {...field}
            id={id ?? label.toLocaleLowerCase()}
            type="number"
            placeholder={placeholder}
            error={error?.message}
            className={className}
            min={min}
            max={max}
            onChange={(e) => {
              const value = e.target.value;
              // Convert to number for form data
              field.onChange(value ? parseFloat(value) : 0);
            }}
            value={
              field.value === undefined || field.value === 0 ? "" : field.value
            }
          />
        )}
      />
    </div>
  );
}
