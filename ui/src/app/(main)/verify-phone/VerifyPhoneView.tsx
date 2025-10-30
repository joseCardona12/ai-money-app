"use client";
import Logo from "@/ui/components/Logo";
import FormVerifyPhone from "./components/FormVerifyPhone";
import FormVerifyPhoneRight from "./components/FormVerifyPhoneRight";

export default function VerifyPhoneView(): React.ReactNode {
  return (
    <div>
      <main className="w-full h-[100vh] flex">
        <section className="w-[50%] bg-[var(--color-gray)] h-[100vh] flex justify-center">
          <div className="w-[60%] flex flex-col gap-4 justify-center">
            <Logo text="ai money" />
            <FormVerifyPhone />
          </div>
        </section>
        <section className="w-[50%] bg-[var(--color-blue-light)] h-[100vh] flex justify-center">
          <div className="w-[60%] flex flex-col gap-4 justify-center items-center ">
            <FormVerifyPhoneRight />
          </div>
        </section>
      </main>
    </div>
  );
}
