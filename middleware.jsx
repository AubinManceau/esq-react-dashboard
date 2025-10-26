import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const url = req.nextUrl.clone();

  // Routes publiques (pas besoin de token)
  const publicRoutes = ["/login"];
  const isPublicRoute = publicRoutes.includes(url.pathname);

  // Routes protégées (nécessitent un token)
  const protectedRoutes = ["/admin"];
  const isProtectedRoute = protectedRoutes.some(route => url.pathname.startsWith(route));

  // Si on est sur /login avec un token valide → rediriger vers /admin
  if (isPublicRoute && token) {
    try {
      const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-type": "web",
          "Cookie": `token=${token}; refreshToken=${refreshToken || ""}`
        },
        credentials: "include",
      });

      if (verifyRes.ok) {
        // Token valide → rediriger vers /admin
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    } catch (err) {
      console.error("Erreur vérification token (login):", err);
    }
  }

  // Si on est sur une route protégée sans token → rediriger vers /login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Si on est sur une route protégée avec un token → vérifier sa validité
  if (isProtectedRoute && token) {
    try {
      const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-type": "web",
          "Cookie": `token=${token}; refreshToken=${refreshToken || ""}`
        },
        credentials: "include",
      });

      if (verifyRes.ok) {
        // Token valide ou rafraîchi → récupérer les nouveaux cookies si refresh
        const response = NextResponse.next();
        
        // Copier les cookies de la réponse du backend (si refresh)
        const setCookieHeader = verifyRes.headers.get("set-cookie");
        if (setCookieHeader) {
          // Parser et appliquer les nouveaux cookies
          const cookies = setCookieHeader.split(", ");
          cookies.forEach(cookie => {
            const [nameValue] = cookie.split(";");
            const [name, value] = nameValue.split("=");
            if (name === "token" || name === "refreshToken") {
              response.cookies.set(name, value, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
                path: "/",
                maxAge: name === "token" ? 15 * 60 : 7 * 24 * 60 * 60,
              });
            }
          });
        }
        
        return response;
      } else {
        // Token invalide → nettoyer les cookies et rediriger vers /login
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("token");
        response.cookies.delete("refreshToken");
        return response;
      }
    } catch (err) {
      console.error("Erreur vérification token (admin):", err);
      // En cas d'erreur → nettoyer et rediriger vers /login
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  // Page d'accueil "/" → rediriger selon l'état d'authentification
  if (url.pathname === "/") {
    if (token) {
      try {
        const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-client-type": "web",
            "Cookie": `token=${token}; refreshToken=${refreshToken || ""}`
          },
          credentials: "include",
        });

        if (verifyRes.ok) {
          return NextResponse.redirect(new URL("/admin", req.url));
        }
      } catch (err) {
        console.error("Erreur vérification token (home):", err);
      }
    }
    // Pas de token ou token invalide → rediriger vers /login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/admin/:path*",
  ],
};