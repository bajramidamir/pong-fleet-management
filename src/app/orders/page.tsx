"use client";

import React, { useState } from "react";
import TripList from "./components/TripList";
import AddOrderButton from "./components/AddOrderButton";

const page = () => {
  const [refreshTrips, setRefreshTrips] = useState<boolean>(false);

  const handleOrderAdded = () => {
    setRefreshTrips((prev) => !prev);
  };

  return (
    <div className="p-8">
      <h1 className="md:text-5xl text-3xl font-semibold">Putni nalozi</h1>
      <AddOrderButton onOrderAdded={handleOrderAdded} />
      <TripList refreshTrigger={refreshTrips} />
    </div>
  );
};

export default page;
