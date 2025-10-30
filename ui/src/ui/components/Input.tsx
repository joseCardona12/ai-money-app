interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  name?: string;
  error?: string;
  className?: string;
}
export default function Input({
  type,
  placeholder,
  error,
  name,
  className,
  ...props
}: IInputProps): React.ReactNode {
  return (
    <div className="flex flex-col gap-[5px]">
      <input
        type={type}
        className={`border p-2 outline-none rounded-md text-sm shadow-sm/2 focus:shadow-sm ${className}`}
        style={{
          borderColor: error ? "var(--color-red)" : "var(--color-gray-border)",
          color: error ? "var(--color-red)" : "var(--color-text-gray)",
        }}
        placeholder={placeholder}
        name={name}
        {...props}
      />
      {error && (
        <p className="text-sm" style={{ color: "var(--color-red)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
