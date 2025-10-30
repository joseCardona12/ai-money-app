import { IContentTab } from "@/interfaces/contentTab";

interface IContentTabProps {
  contentTabs: IContentTab[];
  setElement: (value: string) => void;
  setContentTabs: (value: IContentTab[]) => void;
}
export default function ContentTab({
  contentTabs,
  setElement,
  setContentTabs,
}: IContentTabProps): React.ReactNode {
  const handleClick = (tabKey: string) => {
    const updatedTabs = contentTabs.map((tab: IContentTab) => ({
      ...tab,
      active: tab.tab_key === tabKey,
    }));
    setContentTabs(updatedTabs);
    setElement(tabKey);
  };
  return (
    <div className="bg-[var(--color-gray-2)] rounded-lg p-1 flex w-full gap-1">
      {contentTabs.map((item: IContentTab, index: number) => (
        <div
          key={index}
          className={`${
            item.active && "bg-[var(--color-gray)]"
          } rounded-lg p-2 w-full cursor-pointer flex items-center justify-center gap-2`}
          onClick={() => handleClick(item.tab_key)}
        >
          {item.icon}
          {item.text}
        </div>
      ))}
    </div>
  );
}
