interface IItemFinancialJourneyProps {
  title: string;
  description: string;
  icon: React.ReactElement;
}
export default function ItemFinancialJourney({
  title,
  description,
  icon,
}: IItemFinancialJourneyProps): React.ReactNode {
  return (
    <div className="flex gap-3">
      <div className="w-5 h-5 flex justify-center items-center bg-[var(--color-blue-light-2)] rounded-full">
        {icon}
      </div>
      <div className="flex flex-col">
        <h5 className="font-bold text-sm">{title}</h5>
        <p className="text-sm text-[var(--color-text-gray)]">{description}</p>
      </div>
    </div>
  );
}
