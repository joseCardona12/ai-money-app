export type TButtonVariant = "outline" | "primary" | "ghost" | "secondary";
export interface IButtonVariant {
  outline: string;
  primary: string;
  ghost: string;
  secondary: string;
}

export const CURRENT_BUTTON_VARIANT: IButtonVariant = {
  outline:
    "border border-[var(--color-gray-border)] text-[var(--color-text-gray)] hover:bg-[var(--color-gray-hover)] cursor-pointer",
  primary:
    "bg-[var(--color-blue)] text-white cursor-pointer hover:bg-[var(--color-blue-hover)]",
  ghost: "cursor-pointer hover:bg-[var(--color-gray-hover)]",
  secondary: "",
};
