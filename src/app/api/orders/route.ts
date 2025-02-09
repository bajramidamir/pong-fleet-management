import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const tripSchema = z.object({
  vehicleId: z.number(),
  userId: z.number(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date))),
  endDate: z.string().refine((data) => !isNaN(Date.parse(data))),
  startLocation: z.string().nonempty(),
  endLocation: z.string().nonempty(),
  passengerCount: z.coerce.number().nonnegative(),
});

export async function GET() {
  try {
    const trips = await prisma.trip.findMany({
      include: {
        vehicle: true,
        user: {
          select: {
            id: true,
            username: true,
            role: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return NextResponse.json(trips, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = tripSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const driverName = `${user.firstName} ${user.lastName}`;

    const newTrip = await prisma.trip.create({
      data: {
        vehicleId: data.vehicleId,
        userId: data.userId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        startLocation: data.startLocation,
        endLocation: data.endLocation,
        driverName: driverName,
        passengerCount: data.passengerCount,
        status: "Evidentiran",
      },
    });

    return NextResponse.json(newTrip, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
