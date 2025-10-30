interface IBudgetProps {
  text: string;
}
export default function Budget({ text }: IBudgetProps): React.ReactNode {
  return (
    <span className="text-[var(--color-text-gray)] border border-[var(--color-gray-border)] p-1 pl-2 pr-2 rounded-full text-xs">
      {text}
    </span>
  );
}
