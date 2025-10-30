"use client";
import Logo from "@/ui/components/Logo";
import FormSignUp from "./components/FormSignUp";
import FormSignUpLeft from "./components/FormSignUpLeft";
import PublicRoute from "@/components/PublicRoute";

export default function SignUpView(): React.ReactNode {
  return (
    <PublicRoute>
      <main className="w-full bg-red-300 h-[100vh] flex">
        <section className="w-[50%] bg-[var(--color-blue-light)] h-[100vh] flex justify-center">
          <div className="w-[60%] flex flex-col gap-4 justify-center items-center">
            <FormSignUpLeft />
          </div>
        </section>
        <section className="w-[50%] bg-[var(--color-gray)] h-[100vh] flex justify-center">
          <div className="w-[60%] flex flex-col gap-4 justify-center">
            <Logo text="ai money" />
            <FormSignUp />
          </div>
        </section>
      </main>
    </PublicRoute>
  );
}
