import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const roleAccessMap = {
  "/admin/utilisateurs": [4],
  "/admin/articles": [3, 4],
  "/admin/convocations": [2, 4],
  "/admin/equipes": [3, 4],
  "/admin/presences": [2, 4],
};

async function verifyToken(token) {
  try {
    const secretKey = new TextEncoder().encode(process.env.SECRET_KEY_ACCESS_TOKEN);
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch {
    return null;
  }
}

async function attemptRefresh(refreshToken) {
  try {
    const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-client-type": "web" },
      credentials: "include",
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) return null;

    const data = await refreshRes.json();
    return data.token || null;
  } catch {
    return null;
  }
}

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  let payload = token ? await verifyToken(token) : null;

  if (!payload && refreshToken) {
    const newToken = await attemptRefresh(refreshToken);
    if (newToken) {
      const response = NextResponse.next();
      response.cookies.set("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
        maxAge: 15 * 60,
      });
      return response;
    }
  }

  if (pathname.startsWith("/login")) {
    if (payload) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!payload) {
      return NextResponse.redirect(new URL("/", req.url));
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
  runtime: "nodejs",
};
