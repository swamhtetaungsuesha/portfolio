// middleware.js (in your pages directory)
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value; // Get the cookie

  if (!token) {
    // Redirect to login if no cookie
    const url = req.nextUrl.clone();
    url.pathname = "/login"; // Or wherever your login page is
    return NextResponse.redirect(url);
  }

  // If the cookie exists, let the request continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/secured/:path*"], // Routes to protect
};
