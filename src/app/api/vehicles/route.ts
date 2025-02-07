import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany();
    return NextResponse.json({ vehicles }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Greska pri dobavljanju auta" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data || typeof data !== "object") {
      throw new Error("Invalid request data");
    }

    const newVehicle = await prisma.vehicle.create({
      data: {
        make: data.make,
        model: data.model,
        chassisNumber: data.chassisNumber,
        engineNumber: data.engineNumber,
        enginePowerKw: Number(data.enginePowerKw),
        enginePowerHp: Number(data.enginePowerHp),
        fuelType: data.fuelType,
        year: Number(data.year),
      },
    });
    return NextResponse.json(newVehicle, { status: 200 });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return NextResponse.json(
      {
        error: "Greska pri kreiranju auta",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
