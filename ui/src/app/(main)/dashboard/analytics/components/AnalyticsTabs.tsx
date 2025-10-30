"use client";
import { IContentTab } from "@/interfaces/contentTab";

interface AnalyticsTabsProps {
  contentTabs: IContentTab[];
  setElement: (value: string) => void;
  setContentTabs: (value: IContentTab[]) => void;
}

export default function AnalyticsTabs({
  contentTabs,
  setElement,
  setContentTabs,
}: AnalyticsTabsProps): React.ReactNode {
  const handleClick = (tabKey: string) => {
    const updatedTabs = contentTabs.map((tab: IContentTab) => ({
      ...tab,
      active: tab.tab_key === tabKey,
    }));
    setContentTabs(updatedTabs);
    setElement(tabKey);
  };

  return (
    <div className="bg-[var(--color-gray-2)] rounded-lg p-1 flex w-fit gap-1">
      {contentTabs.map((item: IContentTab, index: number) => (
        <div
          key={index}
          className={`${
            item.active && "bg-[var(--color-gray)]"
          } rounded-lg px-3 py-1.5 cursor-pointer flex items-center justify-center whitespace-nowrap text-sm`}
          onClick={() => handleClick(item.tab_key)}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}
