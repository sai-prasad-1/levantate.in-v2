import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { checkLoginRateLimit, clientIpFromHeaders } from "@/lib/auth/admin";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthApi = pathname.startsWith("/api/auth");
  const isAdminRoute = pathname.startsWith("/admin");
  const isLogin = pathname.startsWith("/admin/login");
  const isAuthed = Boolean(req.auth);

  if (isAuthApi && req.method === "POST") {
    const ip = clientIpFromHeaders(req.headers);
    const rate = checkLoginRateLimit(`ip:${ip}`, 20, 15 * 60 * 1000);
    if (!rate.ok) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429 },
      );
    }
  }

  if (isAdminRoute && !isLogin && !isAuthed) {
    const url = new URL("/admin/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (isLogin && isAuthed) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};
