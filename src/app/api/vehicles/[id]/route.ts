import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    const updatedVehicle = await prisma.vehicle.update({
      where: { id: parseInt(id) },
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
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

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
