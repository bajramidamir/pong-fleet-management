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

export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
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

    const updatedVehicle = await prisma.vehicle.update({
      where: { id: parseInt(id) },
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

    return NextResponse.json(updatedVehicle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Greska pri azuriranju auta" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;

    const deletedVehicle = await prisma.vehicle.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(deletedVehicle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Greska pri brisanju auta" },
      { status: 500 }
    );
  }
}
