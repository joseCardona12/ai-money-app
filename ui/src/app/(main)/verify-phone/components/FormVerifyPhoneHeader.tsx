export default function FormVerifyPhoneHeader(): React.ReactNode {
  return (
    <div>
      <div>
        <h1 className="text-[1.8rem] font-bold">Verify your phone</h1>
        <p style={{ color: "var(--color-text-gray)" }} className="text-sm">
          We've sent a 6-digit code to <strong>+57 123 1313</strong>
        </p>
      </div>
    </div>
  );
}
