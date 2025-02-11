import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = new URL(req.url);

  if (pathname === "/login") {
    console.log("User is on login page. Skipping middleware.");
    return NextResponse.next();
  }

  if (!token) {
    console.log("No token found. Redirecting to login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    console.log("Token is valid:", payload);
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/vehicles", "/reports", "/profile", "/orders", "/dashboard"],
};
