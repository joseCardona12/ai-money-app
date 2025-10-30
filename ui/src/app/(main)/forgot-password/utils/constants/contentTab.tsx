import { IconEmail, IconPhone } from "../../../../../../public/icons";
import { IContentTab } from "@/interfaces/contentTab";

export const CURRENT_CONTENT_TAB: IContentTab[] = [
  {
    active: true,
    icon: <IconEmail />,
    tab_key: "email",
    text: "Email",
  },
  {
    active: false,
    icon: <IconPhone />,
    tab_key: "phone",
    text: "Phone",
  },
];
