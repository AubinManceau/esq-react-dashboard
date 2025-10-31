"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import accessMap from "@/lib/adminAccess";

export const useProtectedRoute = () => {
  const { userInfos, clearUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!userInfos?.user?.roles?.length) {
      router.replace("/login");
      return;
    }

    const matchedPath = Object.keys(accessMap).find((key) =>
      pathname.startsWith(key)
    );

    const allowedRoles = matchedPath ? accessMap[matchedPath] : [];
    const isAllowed = userInfos.user.roles.some((r) =>
      allowedRoles.includes(r.roleId)
    );

    if (!isAllowed) {
      const hasAdminAccess = userInfos.user.roles.some((r) =>
        accessMap["/admin"]?.includes(r.roleId)
      );

      if (hasAdminAccess) {
        router.replace("/admin");
      } else {
        clearUser();
        router.replace("/");
      }
    }
  }, [userInfos, pathname, router]);
};
