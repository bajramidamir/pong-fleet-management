import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const vehicleSchema = z.object({
  make: z.string().nonempty(),
  model: z.string().nonempty(),
  chassisNumber: z.string().nonempty(),
  engineNumber: z.string().nonempty(),
  enginePowerKw: z.coerce.number().nonnegative(),
  enginePowerHp: z.coerce.number().nonnegative(),
  fuelType: z.string().nonempty(),
  year: z.coerce.number().nonnegative(),
});

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
    const {
      make,
      model,
      chassisNumber,
      engineNumber,
      enginePowerKw,
      enginePowerHp,
      fuelType,
      year,
    } = vehicleSchema.parse(data);

    if (!data || typeof data !== "object") {
      throw new Error("Invalid request data");
    }

    const newVehicle = await prisma.vehicle.create({
      data: {
        make: make,
        model: model,
        chassisNumber: chassisNumber,
        engineNumber: engineNumber,
        enginePowerKw: enginePowerKw,
        enginePowerHp: enginePowerHp,
        fuelType: fuelType,
        year: year,
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
