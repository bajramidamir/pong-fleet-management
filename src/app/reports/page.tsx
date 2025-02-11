"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader";

const page = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);

    const formData = new FormData(e.currentTarget);
    const vehicleId = formData.get("vehicleId") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicleId, startDate, endDate }),
      });
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error("Error generating report: ", error);
    } finally {
      setIsGenerating(false);
    }
  };

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
      <h1 className="text-5xl font-semibold mb-8">Izvještaji</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4">
          <form
            onSubmit={handleSubmit}
            className="flex gap-4 align-middle items-center"
          >
            <div>
              <label
                htmlFor="vehicle"
                className="text-gray-700 font-medium mb-2 text-sm block"
              >
                Odaberi vozilo
              </label>
              <select
                className="mt-1 p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                name="vehicle"
                id="vehicle"
              >
                <option value="all">Svi automobili</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.make} {vehicle.model}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="vehicle"
                className="text-gray-700 font-medium mb-2 text-sm block"
              >
                Pocetni datum
              </label>
              <input
                type="date"
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                name="startDate"
                id="startDate"
              />
            </div>
            <div>
              <label
                htmlFor="vehicle"
                className="text-gray-700 font-medium mb-2 text-sm block"
              >
                Zavrsni datum
              </label>
              <input
                type="date"
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                name="endDate"
                id="endDate"
              />
            </div>
            <div>
              <label className="mb-2 font-medium text-sm block invisible">
                mali slatki hack (pozicija dugmeta)
              </label>
              <button
                type="submit"
                disabled={isGenerating}
                className="p-2 bg-purple-400 text-white text-lg rounded-md shadow-md transition duration-300 ease-in-out hover:bg-purple-600"
              >
                {isGenerating ? "Generisanje..." : "Generisi izvjestaj"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default page;
