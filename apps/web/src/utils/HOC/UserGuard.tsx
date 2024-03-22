/* eslint-disable react-hooks/exhaustive-deps */
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";

const withUserRedirect = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const UserRedirectWrapper: React.FC<P> = (props) => {
    const roleId = useAppSelector((state) => state.user.roleId);

    useEffect(() => {
      if (roleId && roleId === 1) {
        redirect("/admin");
      }
    }, [roleId, redirect]);

    if (roleId !== 1) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };

  return UserRedirectWrapper;
};

export default withUserRedirect;
