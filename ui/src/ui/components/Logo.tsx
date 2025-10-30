interface ILogoProps {
  text: string;
}
export default function Logo({ text }: ILogoProps): React.ReactNode {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-[var(--color-blue)] w-7 h-7 rounded-full"></div>
      <h2 className="font-bold" style={{ color: "var(--color-text-black)" }}>
        {text}
      </h2>
    </div>
  );
}
