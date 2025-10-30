interface IRatingProps {
  title: string;
  description: string;
}
export default function Rating({
  title,
  description,
}: IRatingProps): React.ReactNode {
  return (
    <div>
      <h4 className="font-bold text-[1.4rem]">{title}</h4>
      <p className="text-sm text-[var(--color-text-gray)]">{description}</p>
    </div>
  );
}
