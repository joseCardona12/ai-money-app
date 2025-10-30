"use client";

import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface IFormFieldTextareaProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  placeholder: string;
  isOptional?: boolean;
  className?: string;
  rows?: number;
}

export default function FormFieldTextarea<T extends FieldValues>({
  label,
  name,
  control,
  error,
  placeholder,
  isOptional = false,
  className,
  rows = 3,
}: IFormFieldTextareaProps<T>): React.ReactNode {
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
          <textarea
            {...field}
            id={label.toLowerCase()}
            placeholder={placeholder}
            rows={rows}
            className={`w-full px-3 py-2 border border-[var(--color-gray-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)] focus:border-transparent resize-none ${className}`}
            style={{ backgroundColor: "var(--color-white)" }}
          />
        )}
      />
      {error && (
        <span className="text-sm text-red-500">{error.message}</span>
      )}
    </div>
  );
}
