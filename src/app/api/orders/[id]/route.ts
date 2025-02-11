import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const updateStatusSchema = z.object({
  status: z.enum(["Potvrdjen", "Odbijen", "Zavrsen"]),
});

export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const body = await req.json();
    const { status } = updateStatusSchema.parse(body);

    const updatedTrip = await prisma.trip.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return NextResponse.json(updatedTrip, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating trip status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
