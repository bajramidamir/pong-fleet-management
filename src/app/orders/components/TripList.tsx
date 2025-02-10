"use client";

import Loader from "@/components/Loader";
import Alert from "@/components/Alert";
import React, { useEffect, useState } from "react";
import { TripItem } from "./TripItem";

const TripsPage = ({ refreshTrigger }: { refreshTrigger: boolean }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchTrips();
  }, [refreshTrigger]);

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

  return <TripItem trips={trips} />;
};

export default TripsPage;
