"use client";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { redirect, useRouter } from "next/navigation";

export default function withAuth(Component: any) {
  return function AuthenticatedComponent(props: any) {
    const user = useAppSelector((state) => state.user);
    const isAuthenticated = !!user.id;
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        return redirect("/");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
