"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onboardingService } from "@/services/onboarding";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

export default function ProtectedRoute({
  children,
  requireOnboarding = false,
}: ProtectedRouteProps): React.ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateAccess = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          // Redirect to login if no token
          router.push("/login");
          setIsLoading(false);
          return;
        }

        // If on dashboard, check onboarding status
        if (pathname.startsWith("/dashboard")) {
          try {
            const onboardingStatus =
              await onboardingService.checkOnboardingStatus();

            // If user doesn't have onboarding, redirect to onboarding
            if (!onboardingStatus.data?.has_onboarding) {
              router.push("/onboarding");
              setIsLoading(false);
              return;
            }
          } catch (error) {
            // If there's an error checking status, redirect to onboarding
            router.push("/onboarding");
            setIsLoading(false);
            return;
          }
        }

        // If on onboarding, check if already has onboarding
        if (pathname.startsWith("/onboarding")) {
          try {
            const onboardingStatus =
              await onboardingService.checkOnboardingStatus();

            // If user already has onboarding, redirect to dashboard
            if (onboardingStatus.data?.has_onboarding) {
              router.push("/dashboard/home");
              setIsLoading(false);
              return;
            }
          } catch (error) {
            // If there's an error, allow to continue with onboarding
          }
        }

        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        router.push("/login");
        setIsLoading(false);
      }
    };

    validateAccess();
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
