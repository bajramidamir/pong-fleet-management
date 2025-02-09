"use client";

import Loader from "@/components/Loader";
import VehicleTable from "@/app/vehicles/VehicleTable";
import React, { useState, useEffect } from "react";
import AddVehicleForm from "./AddVehicleButton";

const page = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchVehicles = async () => {
    setIsLoading(true);
    const response = await fetch("/api/vehicles");
    const data = await response.json();
    setVehicles(data.vehicles);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-5xl font-semibold">Automobili</h1>
      <AddVehicleForm fetchVehicles={fetchVehicles} />
      {isLoading ? (
        <Loader />
      ) : (
        <VehicleTable fetchVehicles={fetchVehicles} vehicles={vehicles} />
      )}
    </div>
  );
};

export default page;
