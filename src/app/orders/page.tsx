"use client";

import React from "react";
import TripList from "./components/TripList";
import AddOrderButton from "./components/AddOrderButton";

const page = () => {
  return (
    <div className="p-8">
      <h1 className="text-5xl font-semibold">Putni nalozi</h1>
      <AddOrderButton />
      <TripList />
    </div>
  );
};

export default page;
