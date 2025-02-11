"use client";

import Loader from "@/components/Loader";
import VehicleTable from "@/app/vehicles/VehicleTable";
import React, { useState, useEffect } from "react";
import AddVehicleForm from "./AddVehicleButton";
import { useUser } from "@/context/UserContext";

const page = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useUser();

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
    <div className="p-8 max-h-screen overflow-hidden">
      <h1 className="md:text-5xl text-3xl font-semibold">Automobili</h1>
      {user?.role === "user" && (
        <h2 className="text-base text-gray-600 mb-8">
          Samo admin moze dodavati, azurirati i brisati automobile!
        </h2>
      )}
      {user?.role === "admin" && (
        <AddVehicleForm fetchVehicles={fetchVehicles} />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <VehicleTable fetchVehicles={fetchVehicles} vehicles={vehicles} />
      )}
    </div>
  );
};

export default page;
