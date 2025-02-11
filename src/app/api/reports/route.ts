import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { date, z } from "zod";

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
    const dateFilter = { gte: new Date(startDate), lte: new Date(endDate) }; // greater than or equal, larger than or equal ...

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
            { startDate: dateFilter },
            { endDate: dateFilter },
          ],
        },
      });

      const totalHours = trips.reduce((sum, trip) => {
        const start = new Date(trip.startDate);
        const end = new Date(trip.endDate);
        return sum + (end.getTime() - start.getTime()) / (1000 * 60 * 60); // end - start in ms / hours
      }, 0);

      // TODO unique hours i izvjestaj za sva auta
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
