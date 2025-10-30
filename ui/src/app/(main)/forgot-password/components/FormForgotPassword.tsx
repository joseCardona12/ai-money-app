import useForgotPassword from "../hooks/useForgotPassword";
import FormForgotPasswordBody from "./FormForgotPasswordBody";
import FormForgotPasswordFooter from "./FormForgotPasswordFooter";
import FormForgotPasswordHeader from "./FormForgotPasswordHeader";
import ForgotPasswordStatusModal from "./ForgotPasswordStatusModal";

export default function FormForgotPassword(): React.ReactNode {
  const {
    elementTab,
    setElementTab,
    setContentTabs,
    contentTabs,
    errors,
    control,
    handleSubmit,
    handleForgotPassword,
    modal,
  } = useForgotPassword();
  return (
    <>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(handleForgotPassword)}
      >
        <FormForgotPasswordHeader />
        <FormForgotPasswordBody
          setElementTab={setElementTab}
          setContentTabs={setContentTabs}
          contentTabs={contentTabs}
          elementTab={elementTab}
          errors={errors}
          control={control}
        />
        <FormForgotPasswordFooter tabKey={elementTab} />
      </form>

      <ForgotPasswordStatusModal
        isOpen={modal.isOpen}
        status={modal.status}
        message={modal.message}
        onClose={modal.closeModal}
      />
    </>
  );
}
