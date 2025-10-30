"use client";
import Logo from "@/ui/components/Logo";
import TermsContent from "./components/TermsContent";
import TermsRight from "./components/TermsRight";

export default function TermsView(): React.ReactNode {
  return (
    <div>
      <main className="w-full h-[100vh] flex">
        <section
          className="w-[50%] h-[100vh] flex justify-center"
          style={{ backgroundColor: "var(--color-gray)" }}
        >
          <div className="w-[80%] flex flex-col gap-4 py-8">
            <Logo text="ai money" />
            <TermsContent />
          </div>
        </section>
        <section
          className="w-[50%] h-[100vh] flex justify-center items-center"
          style={{ backgroundColor: "var(--color-blue-light)" }}
        >
          <div className="w-[60%] flex flex-col gap-4 justify-center items-center">
            <TermsRight />
          </div>
        </section>
      </main>
    </div>
  );
}
