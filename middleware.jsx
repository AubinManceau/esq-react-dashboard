import { NextResponse } from "next/server";

const roleAccessMap = {
  "/admin/utilisateurs": [4],
  "/admin/articles": [3, 4],
  "/admin/convocations": [2, 4],
  "/admin/equipes": [3, 4],
  "/admin/presences": [2, 4],
};

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const cookieHeader = req.headers.get("cookie");

  let payload = null;
  let responseFromApi = null;

  try {
    responseFromApi = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-token`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "x-client-type": "web",
        "cookie": cookieHeader || "",
      },
      credentials: "include",
    });

    if (responseFromApi.ok) {
      const data = await responseFromApi.json();
      console.log("Réponse backend verify-token:", data);
      payload = data.data;
    }
  } catch (error) {
    console.error("Erreur middleware verify-token:", error);
  }

  if (pathname.startsWith("/login")) {
    if (payload) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!payload) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const roles = Array.isArray(payload?.roles) ? payload.roles : [];

    if (roles.some(r => r.roleId === 1)) {
      const response = NextResponse.redirect(new URL("/", req.url));
      response.cookies.delete("token");
      response.cookies.delete("refreshToken");
      return response;
    }

    for (const [pathPrefix, allowedRoles] of Object.entries(roleAccessMap)) {
      if (pathname.startsWith(pathPrefix)) {
        const hasAccess = roles.some(r => allowedRoles.includes(r.roleId));
        if (!hasAccess) {
          return NextResponse.redirect(new URL("/admin", req.url));
        }
      }
    }
  }

  const nextResponse = NextResponse.next();
  const setCookieHeaders = responseFromApi?.headers?.get("set-cookie");
  if (setCookieHeaders) {
    nextResponse.headers.set("set-cookie", setCookieHeaders);
  }

  return nextResponse;
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
  runtime: "nodejs",
};
