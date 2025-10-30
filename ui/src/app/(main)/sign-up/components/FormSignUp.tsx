"use client";
import useSignUp from "../hooks/useSignUp";
import FormSignUpBody from "./FormSignUpBody";
import FormSignUpFooter from "./FormSignUpFooter";
import FormSignUpHeader from "./FormSignUpHeader";

export default function FormSignUp(): React.ReactNode {
  const {
    errors,
    control,
    handleSubmit,
    handleSignUp,
    remember,
    setRemember,
    loading,
  } = useSignUp();
  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-6">
      <FormSignUpHeader loading={loading} />
      <FormSignUpBody
        control={control}
        errors={errors}
        setRemember={setRemember}
        remember={remember}
        loading={loading}
      />
      <FormSignUpFooter loading={loading} />
    </form>
  );
}
