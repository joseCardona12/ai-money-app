import { ReactElement } from "react";

export interface IContentTab {
  icon: ReactElement;
  text: string;
  active: boolean;
  tab_key: string;
}
