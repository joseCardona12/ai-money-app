import { useState } from "react";
import { CURRENT_CONTENT_TAB } from "../utils/constants/contentTab";
import { IContentTab } from "@/interfaces/contentTab";

export default function useTerms() {
  const [elementTab, setElementTab] = useState<string>("terms");
  const [contentTabs, setContentTabs] =
    useState<IContentTab[]>(CURRENT_CONTENT_TAB);

  return {
    elementTab,
    setElementTab,
    contentTabs,
    setContentTabs,
  };
}
