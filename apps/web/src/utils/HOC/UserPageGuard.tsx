import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { redirect, useRouter } from "next/navigation";

export default function withUserGuard(Component: any) {
  return function GuardedComponent(props: any) {
    const user = useAppSelector((state) => state.user);
    const isAdmin = user.roleId === 1;
    const router = useRouter();

    useEffect(() => {
      if (isAdmin) {
        return redirect("/admin");
      }
    }, [isAdmin, router]);

    if (isAdmin) {
      return null;
    }

    return <Component {...props} />;
  };
}
