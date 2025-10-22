import { NextResponse } from "next/server";

export async function middleware(req) {
  const cookieHeader = req.headers.get("cookie");
  const url = req.nextUrl.clone();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-token`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "x-client-type": "web",
        "cookie": cookieHeader || "",
      },
      credentials: "include",
    });

    // Debug en dev
    if (process.env.NODE_ENV === "development") {
      console.log("🔍 Vérification token:", res.status);
    }

    if (res.ok) {
      // Token valide → redirection vers /contact
      url.pathname = "/contact";
      return NextResponse.redirect(url);
    } else {
      // Token invalide → redirection vers /test
      url.pathname = "/test";
      return NextResponse.redirect(url);
    }
  } catch (err) {
    console.error("Erreur middleware verify-token:", err);
    url.pathname = "/test";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/"], // tu peux adapter ça : sur quelles routes le middleware doit agir ?
  runtime: "nodejs",
};
