interface IBarProgressProps {
  totalStep: number;
  step: number;
  setStep: (value: number) => void;
}
export default function BarProgress({
  totalStep,
  step,
}: IBarProgressProps): React.ReactNode {
  const getPercentage: string = `${(step / totalStep) * 100}%`;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm text-[var(--color-text-gray)] ">
        <div>
          <span>Step </span>
          <span>{step} </span>
          <span>of </span>
          <span>{totalStep}</span>
        </div>
        <span>{Math.round((step / totalStep) * 100)}%</span>
      </div>
      <div className="w-full bg-[var(--color-blue-light)] h-[7px] rounded-full">
        <div
          className="bg-[var(--color-blue)] h-[7px] rounded-full"
          style={{
            width: `${getPercentage}`,
          }}
        ></div>
      </div>
    </div>
  );
}
