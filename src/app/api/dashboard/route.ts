import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch counts in parallel for better performance
    const [tripCount, vehicleCount, userCount] = await Promise.all([
      prisma.trip.count(),
      prisma.vehicle.count(),
      prisma.user.count(),
    ]);

    const totalTrips = Number(tripCount);
    const totalVehicles = Number(vehicleCount);
    const totalUsers = Number(userCount);

    // Convert raw SQL count result to number explicitly
    const activeUserCount = await prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(DISTINCT "userId") as count
        FROM "Trip"
    `.then((result) => Number(result[0].count));

    // Ensure subtraction uses numbers
    const inactiveUsers = Number(totalUsers) - Number(activeUserCount);

    const tripsByVehicle = await prisma.trip.groupBy({
      by: ["vehicleId"],
      _count: {
        vehicleId: true,
      },
    });

    const vehicleDetails = await prisma.vehicle.findMany({
      where: {
        id: { in: tripsByVehicle.map((trip) => trip.vehicleId) },
      },
      select: {
        id: true,
        make: true,
        model: true,
      },
    });

    const formattedTripsByVehicle = tripsByVehicle.map((trip) => {
      const vehicle = vehicleDetails.find((v) => v.id === trip.vehicleId);
      return {
        vehicleId: trip.vehicleId,
        vehicleMake: vehicle?.make || "Unknown",
        vehicleModel: vehicle?.model || "Unknown",
        tripCount: Number(trip._count.vehicleId), // Ensure this is a number
      };
    });

    const dashboardData = {
      totalTrips,
      totalVehicles,
      totalUsers,
      activeUsers: activeUserCount,
      inactiveUsers,
      tripsByVehicle: formattedTripsByVehicle,
    };

    return NextResponse.json(dashboardData, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
