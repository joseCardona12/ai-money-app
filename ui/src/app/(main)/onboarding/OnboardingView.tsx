"use client";
import Logo from "@/ui/components/Logo";
import OnboardingLeft from "./components/OnboardingLeft";
import OnboardingProgress from "./components/OnboardingProgress";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function OnboardingView(): React.ReactNode {
  return (
    <ProtectedRoute>
      <main className="w-full h-[100vh] flex">
        <section className="w-[50%] bg-[var(--color-blue-light)] h-[100vh] flex justify-center">
          <div className="w-[60%] flex flex-col gap-4 justify-center items-center">
            <OnboardingLeft />
          </div>
        </section>
        <section className="w-[50%] bg-[var(--color-gray)] h-[100vh] flex justify-center items-center">
          <div className="w-[60%] h-full flex flex-col justify-center py-8">
            <div className="flex flex-col gap-4">
              <Logo text="ai money" />
              <OnboardingProgress />
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}
