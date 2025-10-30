"use client";
import Logo from "@/ui/components/Logo";
import FormForgotPassword from "./components/FormForgotPassword";
import FormForgotPasswordRight from "./components/FormForgotPasswordRight";
import PublicRoute from "@/components/auth/PublicRoute";

export default function ForgotPasswordView(): React.ReactNode {
  return (
    <PublicRoute allowAuthenticated={false}>
      <div>
        <main className="w-full bg-red-300 h-[100vh] flex">
          <section className="w-[50%] bg-[var(--color-gray)] h-[100vh] flex justify-center">
            <div className="w-[60%] flex flex-col gap-4 justify-center">
              <Logo text="ai money" />
              <FormForgotPassword />
            </div>
          </section>
          <section className="w-[50%] bg-[var(--color-blue-light)] h-[100vh] flex justify-center">
            <div className="w-[60%] flex flex-col gap-4 justify-center items-center ">
              <FormForgotPasswordRight />
            </div>
          </section>
        </main>
      </div>
    </PublicRoute>
  );
}
