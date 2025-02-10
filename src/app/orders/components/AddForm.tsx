import React, { useState, useEffect } from "react";

const AddForm = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [formData, setFormData] = useState<TripFormData>({
    vehicleId: 0,
    startDate: "",
    endDate: "",
    startLocation: "",
    endLocation: "",
    passengerCount: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "vehicleId" || name === "passengerCount"
          ? Number(value)
          : value,
    }));
  };

  const fetchVehicles = async () => {
    const response = await fetch("/api/vehicles");
    const data = await response.json();
    setVehicles(data.vehicles);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="vehicleId">Automobil</label>
        <select
          name="vehicleId"
          id="vehicleId"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.make} {vehicle.model}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          Pocetni datum
        </label>
        <input
          type="datetime-local"
          name="startDate"
          id="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700"
        >
          Zavrsni datum
        </label>
        <input
          type="datetime-local"
          name="endDate"
          id="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="startLocation"
          className="block text-sm font-medium text-gray-700"
        >
          Pocetna lokacija
        </label>
        <input
          type="text"
          name="startLocation"
          id="startLocation"
          value={formData.startLocation}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="endLocation"
          className="block text-sm font-medium text-gray-700"
        >
          Zavrsna lokacija
        </label>
        <input
          type="text"
          name="endLocation"
          id="endLocation"
          value={formData.endLocation}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="passengerCount"
          className="block text-sm font-medium text-gray-700"
        >
          Broj putnika
        </label>
        <input
          type="number"
          name="passengerCount"
          id="passengerCount"
          value={formData.passengerCount}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-200"
      >
        Dodaj
      </button>
    </form>
  );
};

export default AddForm;
