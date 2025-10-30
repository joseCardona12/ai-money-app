"use client";

import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import Select from "./Select";
import { SelectOption } from "@/interfaces/selectOption";

interface IFormFieldSelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  placeholder: string;
  options: SelectOption[];
  isOptional?: boolean;
  className?: string;
}

export default function FormFieldSelect<T extends FieldValues>({
  label,
  name,
  control,
  error,
  placeholder,
  options,
  isOptional = false,
  className,
}: IFormFieldSelectProps<T>): React.ReactNode {
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
          <Select
            options={options}
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            className={className}
          />
        )}
      />
      {error && (
        <span className="text-sm text-red-500">{error.message}</span>
      )}
    </div>
  );
}
