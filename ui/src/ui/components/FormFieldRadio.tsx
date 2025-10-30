import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface IFormFieldRadioProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  type: string;
  error?: FieldError;
  text: string | React.ReactNode;
  value: string;
}
export default function FormFieldRadio<T extends FieldValues>({
  name,
  control,
  type,
  error,
  text,
  value,
}: IFormFieldRadioProps<T>): React.ReactNode {
  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <label
            htmlFor={`${name}-${value}`}
            className="w-full flex items-center gap-4 border rounded-lg p-4 cursor-pointer transition-colors"
            style={{
              borderColor:
                field.value === value
                  ? "var(--color-blue)"
                  : "var(--color-gray-border)",
              backgroundColor:
                field.value === value
                  ? "var(--color-blue-light)"
                  : "transparent",
            }}
            onMouseEnter={(e) => {
              if (field.value !== value) {
                e.currentTarget.style.backgroundColor =
                  "var(--color-gray-hover)";
              }
            }}
            onMouseLeave={(e) => {
              if (field.value !== value) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <input
              type={type}
              value={value}
              checked={field.value === value}
              onChange={() => field.onChange(value)}
              id={`${name}-${value}`}
              className="w-4 h-4 flex-shrink-0"
              style={{
                accentColor: "var(--color-blue)",
                borderColor: "var(--color-gray-border)",
              }}
            />
            <div
              className="text-sm flex-1 min-w-0"
              style={{ color: "var(--color-text-black)" }}
            >
              {text}
            </div>
          </label>
        )}
      />
      {error && (
        <p className="text-sm mt-1" style={{ color: "var(--color-red)" }}>
          {error.message}
        </p>
      )}
    </div>
  );
}
