import useVerifyPhone from "../hooks/useVerifyPhone";
import FormVerifyPhoneBody from "./FormVerifyPhoneBody";
import FormVerifyPhoneFooter from "./FormVerifyPhoneFooter";
import FormVerifyPhoneHeader from "./FormVerifyPhoneHeader";

export default function FormVerifyPhone(): React.ReactNode {
  const { control, errors, handleSubmit, handleVerifyPhone } = useVerifyPhone();
  return (
    <form action="" onSubmit={handleSubmit(handleVerifyPhone)}>
      <FormVerifyPhoneHeader />
      <FormVerifyPhoneBody errors={errors} control={control} />
      <FormVerifyPhoneFooter />
    </form>
  );
}
