"use client";

import Logo from "@/ui/components/Logo";
import FormVerifyEmail from "./components/FormVerifyEmail";
import FormVerifyEmailRight from "./components/FormVerifyEmailRight";
import PublicRoute from "@/components/auth/PublicRoute";

export default function VerifyEmailView(): React.ReactNode {
  return (
    <PublicRoute allowAuthenticated={false}>
      <div>
        <main className="w-full h-[100vh] flex">
          <section className="w-[50%] bg-[var(--color-gray)] h-[100vh] flex justify-center">
            <div className="w-[60%] flex flex-col gap-4 justify-center">
              <Logo text="ai money" />
              <FormVerifyEmail />
            </div>
          </section>
          <section className="w-[50%] bg-[var(--color-blue-light)] h-[100vh] flex justify-center">
            <div className="w-[60%] flex flex-col gap-4 justify-center items-center ">
              <FormVerifyEmailRight />
            </div>
          </section>
        </main>
      </div>
    </PublicRoute>
  );
}
