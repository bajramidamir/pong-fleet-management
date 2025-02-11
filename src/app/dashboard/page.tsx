"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import { useUser } from "@/context/UserContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const page = () => {
  const [stats, setStats] = useState<Stats>();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/dashboard");
      const data = await response.json();
      console.log(data);
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) return <Loader />;

  // Bar chart data for active and inactive users
  const userActivityData = [
    { name: "Aktivni korisnici", value: stats?.activeUsers || 0 },
    { name: "Neaktivni korisnici", value: stats?.inactiveUsers || 0 },
  ];

  // Bar chart data for trips by vehicle
  const tripsByVehicleData = stats?.tripsByVehicle?.map((vehicle) => ({
    name: `${vehicle.vehicleMake} ${vehicle.vehicleModel}`,
    trips: vehicle.tripCount,
  }));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-medium mb-2">
        Dobro dosli, {user?.firstName}!
      </h1>
      <h2 className="text-xl text-gray-600 mb-8">Osnovne statistike</h2>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="p-4 bg-white text-center rounded-md shadow-md">
          <h1 className="text-3xl block font-medium mb-4">Broj automobila</h1>
          <p className="text-2xl text-purple-500">{stats?.totalVehicles}</p>
        </div>
        <div className="p-4 bg-white text-center rounded-md shadow-md">
          <h1 className="text-3xl block font-medium mb-4">
            Broj putnih naloga
          </h1>
          <p className="text-2xl text-purple-500">{stats?.totalTrips}</p>
        </div>
        <div className="p-4 bg-white text-center rounded-md shadow-md">
          <h1 className="text-3xl block font-medium mb-4">
            Broj korisnika sistema
          </h1>
          <p className="text-2xl text-purple-500">{stats?.totalUsers}</p>
        </div>
      </div>

      <div className="p-4 bg-white rounded-md shadow-md mt-8">
        <h2 className="text-2xl font-medium mb-4">
          Aktivni vs Neaktivni korisnici
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userActivityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#A78BFA">
              <Cell fill="#A78BFA" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-white rounded-md shadow-md mt-8">
        <h2 className="text-2xl font-medium mb-4">Putni nalozi po vozilu</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tripsByVehicleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="trips" fill="#F472B6">
              <Cell fill="#F472B6" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default page;
