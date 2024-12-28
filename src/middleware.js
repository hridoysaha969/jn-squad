import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("access_token")?.value || ""; // No `await` here

  const signInPath = "/sign-in";
  const signUpPath = "/sign-up";
  const homePath = "/";
  const publicPaths = [signInPath, signUpPath];

  // Redirect to sign-in if no token and trying to access protected paths
  if (!token && !publicPaths.includes(url.pathname)) {
    url.pathname = signInPath;
    return NextResponse.redirect(url);
  }

  // Redirect to home if token exists and trying to access public paths
  if (token && publicPaths.includes(url.pathname)) {
    url.pathname = homePath;
    return NextResponse.redirect(url);
  }

  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up", // Exclude static files
  ],
};
