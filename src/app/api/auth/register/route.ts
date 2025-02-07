import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  role: z.string().default("user"),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
});

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { username, password, role, firstName, lastName } =
      registerSchema.parse(data);

    if (await prisma.user.findUnique({ where: { username } })) {
      return NextResponse.json(
        { error: "Korisnik vec postoji" },
        { status: 500 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        role: role,
        firstName: firstName,
        lastName: lastName,
      },
    });

    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Nepoznata greska" }, { status: 500 });
  }
}
