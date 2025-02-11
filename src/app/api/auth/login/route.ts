import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { setCookie } from "cookies-next/server";

const loginSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const res = new NextResponse();
    const data = await req.json();
    const { username, password } = loginSchema.parse(data);

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return NextResponse.json(
        { error: "Pogresan username ili password" },
        { status: 500 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Pogresan username ili password" },
        { status: 500 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );

    await setCookie("token", token, { res, req });

    return res;
  } catch (error) {
    return NextResponse.json({ error: "Nepoznata greska" }, { status: 500 });
  }
}
