interface ILineOrProps {
  text: string;
}
export default function LineOr({ text }: ILineOrProps): React.ReactNode {
  return (
    <div className="flex items-center gap-2">
      <div className="w-full h-[1px] bg-[var(--color-gray-border)]"></div>
      <span className="text-[.7rem] text-[var(--color-text-gray)] w-full">
        {text}
      </span>
      <div className="w-full h-[1px] bg-[var(--color-gray-border)]"></div>
    </div>
  );
}
