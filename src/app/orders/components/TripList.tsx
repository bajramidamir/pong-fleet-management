"use client";

import Loader from "@/components/Loader";
import Alert from "@/components/Alert";
import React, { useEffect, useState } from "react";
import { TripItem } from "./TripItem";

const TripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch trips");
        }
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
        setError("Greska s ucitavanjem putnih naloga!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (isLoading) {
    return (
      <div>
        {" "}
        <Loader />{" "}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-5xl font-semibold mb-4">Putni nalozi</h1>
      <TripItem trips={trips} />
    </div>
  );
};

export default TripsPage;
