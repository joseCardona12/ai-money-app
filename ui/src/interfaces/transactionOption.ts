import { ReactElement } from "react";

export interface ITransactionOption {
  id: string;
  text: string;
  icon?: ReactElement;
  onClick: () => void;
  variant?: "default" | "danger";
}
