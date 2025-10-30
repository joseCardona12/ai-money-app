"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage(): React.ReactNode {
  const router = useRouter();

  useEffect(() => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear cookies
    document.cookie = "token=; path=/; max-age=0";

    // Redirect to home
    router.push("/");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Logging out...</p>
    </div>
  );
}

