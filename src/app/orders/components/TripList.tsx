"use client";

import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";
import { TripItem } from "./TripItem";

const TripsPage = ({ refreshTrigger }: { refreshTrigger: boolean }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | Trip["status"]>(
    "all"
  );

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

  const filteredTrips =
    filterStatus === "all"
      ? trips
      : trips.filter((trip) => trip.status === filterStatus);

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
    <div>
      <div className="mb-4">
        <label htmlFor="filterStatus" className="mr-2">
          Status:
        </label>
        <select
          id="filterStatus"
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as "all" | Trip["status"])
          }
          className="p-2 border border-purple-400 focus:ring ring-purple-500 rounded bg-white"
        >
          <option value="all">Svi</option>
          <option value="Evidentiran">Evidentiran</option>
          <option value="Potvrdjen">Potvrdjen</option>
          <option value="Odbijen">Odbijen</option>
          <option value="Zavrsen">Zavrsen</option>
        </select>
      </div>

      <TripItem trips={filteredTrips} />
    </div>
  );
};

export default TripsPage;
