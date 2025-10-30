export default function FormForgotPasswordHeader(): React.ReactNode {
  return (
    <div>
      <div>
        <h1 className="text-[1.8rem] font-bold">Reset your password</h1>
        <p className="text-[var(--color-text-gray)] text-sm w-90">
          Choose how you'd like to receive your password reset instructions
        </p>
      </div>
    </div>
  );
}
