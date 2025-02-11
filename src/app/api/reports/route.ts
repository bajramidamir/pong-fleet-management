import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const reportSchema = z.object({
  vehicleId: z.string().optional(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date))),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date))),
});

export async function POST(req: NextRequest) {
  try {
    const { vehicleId, startDate, endDate } = reportSchema.parse(
      await req.json()
    );

    const startOfDay = (date: Date) => new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = (date: Date) => new Date(date.setHours(23, 59, 59, 999));

    const adjustedStartDate = startOfDay(new Date(startDate));
    const adjustedEndDate = endOfDay(new Date(endDate));

    // report for a single vehicle
    if (vehicleId && vehicleId !== "all") {
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: parseInt(vehicleId) },
      });
      if (!vehicle)
        return NextResponse.json({ error: "Nema auta" }, { status: 404 });

      const trips = await prisma.trip.findMany({
        where: {
          AND: [
            { vehicleId: parseInt(vehicleId) },
            { startDate: { lte: adjustedEndDate } },
            { endDate: { gte: adjustedStartDate } },
          ],
        },
      });

      const totalHours = trips.reduce((sum, trip) => {
        const start = new Date(trip.startDate);
        const end = new Date(trip.endDate);
        return sum + (end.getTime() - start.getTime()) / (1000 * 60 * 60); // end - start in ms / hours
      }, 0);

      const uniqueDays = new Set(
        trips.flatMap((trip) => [
          new Date(trip.startDate).toDateString(),
          new Date(trip.endDate).toDateString(),
        ])
      ).size;

      return NextResponse.json(
        {
          type: "single",
          vehicle: `${vehicle.make} ${vehicle.model}`,
          numberOfTrips: trips.length,
          numberOfDays: uniqueDays,
          numberOfHours: totalHours,
        },
        { status: 200 }
      );
    }

    // report for all vehicles
    const trips = await prisma.trip.findMany({
      where: {
        AND: [
          { startDate: { lte: adjustedEndDate } },
          { endDate: { gte: adjustedStartDate } },
        ],
      },
      include: { vehicle: true },
    });

    // this is ugly.
    const vehicleCounts = trips.reduce<Record<string, number>>((acc, trip) => {
      const name = `${trip.vehicle.make} ${trip.vehicle.model}`;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json(
      { type: "all", vehicleCounts, numberOfTrips: trips.length },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
