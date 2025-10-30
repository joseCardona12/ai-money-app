import { ButtonHTMLAttributes } from "react";

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<{ className?: string }>;
  variant?: "default" | "ghost" | "primary";
  size?: "sm" | "md" | "lg";
  className?: string;
  badge?: number | string;
  loading?: boolean;
}

const VARIANTS = {
  default: "hover:bg-gray-50 text-gray-600",
  ghost: "hover:bg-gray-50 text-gray-600",
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
};

const SIZES = {
  sm: "p-1.5",
  md: "p-2",
  lg: "p-3",
};

const ICON_SIZES = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export default function IconButton({
  icon: Icon,
  variant = "default",
  size = "md",
  className = "",
  badge,
  loading = false,
  disabled,
  ...props
}: IIconButtonProps): React.ReactNode {
  return (
    <button
      className={`
        relative rounded-lg transition-colors duration-200  border border-[var(--color-gray-border)]
        ${VARIANTS[variant]} 
        ${SIZES[size]} 
        ${
          disabled || loading
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      <Icon
        className={`
          ${ICON_SIZES[size]} 
          ${loading ? "animate-spin" : ""}
        `}
      />

      {badge && (
        <span
          className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 rounded-full text-xs flex items-center justify-center text-white font-medium"
          style={{ backgroundColor: "var(--color-red)" }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
