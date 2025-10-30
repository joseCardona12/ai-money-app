interface ITitleContentProps {
  title: string;
  description: string;
}
export default function TitleContent({
  title,
  description,
}: ITitleContentProps): React.ReactNode {
  return (
    <div className="mb-6">
      <h1
        className="text-2xl font-semibold"
        style={{ color: "var(--color-text-black)" }}
      >
        {title}
      </h1>
      <p className="text-sm" style={{ color: "var(--color-text-gray)" }}>
        {description}
      </p>
    </div>
  );
}
