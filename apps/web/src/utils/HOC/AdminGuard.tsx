" use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";

const withAuthRedirect = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthRedirectWrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const roleID = useAppSelector((state) => state.user.roleId);
    useEffect(() => {
      if (!roleID) {
        router.push("/login");
      } else {
        if (roleID === 1) {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    }, [roleID, router]);

    return <WrappedComponent {...props} />;
  };

  return AuthRedirectWrapper;
};

export default withAuthRedirect;
