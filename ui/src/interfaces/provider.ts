import { ReactElement } from "react";

export type TProvider = "oauth_google" | "oauth_github" | "oauth_microsoft";
export interface IProvider {
  url: string;
  provider: TProvider;
  icon: ReactElement;
}
