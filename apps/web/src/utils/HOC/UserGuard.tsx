"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";

export default function withAdminRedirect(Component: any) {
  return function IsAuth(props: any) {
    const user = useAppSelector((state) => state.user);
    const auth = user.id;

    useEffect(() => {
      if (!auth || auth !== 2) {
        return redirect("/admin");
      }
    }, [auth]);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
