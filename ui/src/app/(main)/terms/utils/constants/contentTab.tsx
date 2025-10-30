import { IContentTab } from "@/interfaces/contentTab";

export const CURRENT_CONTENT_TAB: IContentTab[] = [
  {
    active: true,
    icon: <span>📋</span>,
    tab_key: "terms",
    text: "Terms of Service",
  },
  {
    active: false,
    icon: <span>🔒</span>,
    tab_key: "privacy",
    text: "Privacy Policy",
  },
];
