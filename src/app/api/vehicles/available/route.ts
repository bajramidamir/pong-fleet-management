import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const vehiclesNotAssigned = await prisma.vehicle.findMany({
      where: {
        id: {
          notIn: await prisma.trip
            .findMany({
              select: {
                vehicleId: true,
              },
            })
            .then((trips) => trips.map((trip) => trip.vehicleId)),
        },
      },
    });
    return NextResponse.json(vehiclesNotAssigned, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Greška pri preuzimanju nezaduzenih vozila" },
      { status: 500 }
    );
  }
}
