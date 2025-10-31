"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import accessMap from "@/lib/adminAccess";

export const useProtectedRoute = () => {
  const { userInfos } = useAuth();
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
      router.replace("/admin");
    }
  }, [userInfos, pathname, router]);
};
