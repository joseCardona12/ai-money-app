import useVerifyEmail from "../hooks/useVerifyEmail";
import FormVerifyEmailBody from "./FormVerifyEmailBody";
import FormVerifyEmailFooter from "./FormVerifyEmailFooter";
import FormVerifyEmailHeader from "./FormVerifyEmailHeader";
import VerifyEmailStatusModal from "./VerifyEmailStatusModal";

export default function FormVerifyEmail(): React.ReactNode {
  const {
    control,
    errors,
    handleSubmit,
    handleVerifyEmail,
    isValidToken,
    modal,
  } = useVerifyEmail();

  if (!isValidToken) {
    return (
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-[1.8rem] font-bold text-red-600">
          Invalid Reset Link
        </h1>
        <p className="text-[var(--color-text-gray)] text-sm">
          This password reset link is invalid or has expired. Please request a
          new password reset.
        </p>
        <a
          href="/forgot-password"
          className="text-[var(--color-blue)] text-sm font-medium hover:underline"
        >
          Request New Reset
        </a>
      </div>
    );
  }

  return (
    <>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(handleVerifyEmail)}
      >
        <FormVerifyEmailHeader />
        <FormVerifyEmailBody errors={errors} control={control} />
        <FormVerifyEmailFooter />
      </form>

      <VerifyEmailStatusModal
        isOpen={modal.isOpen}
        status={modal.status}
        message={modal.message}
        onClose={modal.closeModal}
      />
    </>
  );
}
