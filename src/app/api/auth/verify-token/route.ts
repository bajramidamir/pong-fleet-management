import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  // nullish coalescing
  const cookies = req.headers.get("cookie") ?? "";
  const token =
    cookies
      .split("; ")
      .find((cookie) => cookie.startsWith("token="))
      ?.split("=")[1] || null;

  if (!token) {
    return NextResponse.json({ message: "Token not found" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    const { userId, username, role, firstName, lastName } = decoded;

    return NextResponse.json({
      user: { userId, username, role, firstName, lastName },
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
