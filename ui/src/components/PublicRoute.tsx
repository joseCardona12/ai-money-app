"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onboardingService } from "@/services/onboarding";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({
  children,
}: PublicRouteProps): React.ReactNode {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateAccess = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          // No token, allow access to public route
          setIsLoading(false);
          return;
        }

        // User is authenticated, redirect based on onboarding status
        try {
          const onboardingStatus =
            await onboardingService.checkOnboardingStatus();

          // If user already has onboarding, redirect to dashboard
          if (onboardingStatus.data?.has_onboarding) {
            router.push("/dashboard/home");
          } else {
            // Otherwise, redirect to onboarding
            router.push("/onboarding");
          }
        } catch (error) {
          // If there's an error checking status, redirect to onboarding
          router.push("/onboarding");
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    validateAccess();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}

