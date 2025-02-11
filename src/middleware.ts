import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = new URL(req.url);

  if (pathname === "/login") {
    return NextResponse.next();
  }

  if (!token) {
    console.log("No token found. Redirecting to login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Token is valid:", decoded);
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
