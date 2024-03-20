" use client";

import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { redirect } from "next/navigation";

export default function withAdminRedirect(Component: any) {
  return function IsAuth(props: any) {
    const user = useAppSelector((state) => state.user);
    const auth = user.id;

    useEffect(() => {
      if (!auth || auth !== 1) {
        return redirect("/");
      }
    }, [auth]);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
