import Image from "next/image";
import React, { useState } from "react";
import Alert from "@/components/Alert";

interface Vehicle {
  id: number;
  make: string;
  model: string;
  chassisNumber: string;
  engineNumber: string;
  enginePowerKw: number;
  enginePowerHp: number;
  fuelType: string;
  year: number;
}

interface VehicleTableProps {
  vehicles: Vehicle[];
  fetchVehicles: () => void;
}

const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
  fetchVehicles,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedVehicles, setSelectedVehicles] = useState<number[]>([]);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<"Success" | "Danger">(
    "Success"
  );
  const [alertMessage, setAlertMessage] = useState<string>("");

  const isSelected = (id: number) => selectedVehicles.includes(id);

  const toggleSelectVehicle = (id: number) => {
    setSelectedVehicles((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((vehicleId) => vehicleId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = async (idArray: number[]) => {
    try {
      await Promise.all(
        idArray.map(async (id) => {
          const response = await fetch(`/api/vehicles/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error(`Brisanje automobila sa ID ${id} nije uspjelo.`);
          }
        })
      );
      fetchVehicles();
      setSelectedVehicles([]);
    } catch (error) {
      console.error("Greška pri brisanju automobila:", error);
    }
  };

  const handleEditClick = () => {
    if (selectedVehicles.length === 1) {
      const vehicleToEdit = vehicles.find((v) => v.id === selectedVehicles[0]);
      if (vehicleToEdit) {
        setEditVehicle(vehicleToEdit);
        setIsEditing(true);
      }
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editVehicle) return;

    try {
      const response = await fetch(`/api/vehicles/${editVehicle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editVehicle),
      });

      if (!response.ok) {
        throw new Error("Ažuriranje automobila nije uspjelo.");
      }

      setIsEditing(false);
      fetchVehicles();
      setAlertVariant("Success");
      setAlertMessage("Automobil uspješno ažuriran!");
      setShowAlert(true);
    } catch (error) {
      console.error("Greška pri ažuriranju automobila:", error);
      setAlertVariant("Danger");
      setAlertMessage("Greška pri ažuriranju automobila!");
      setShowAlert(true);
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditVehicle((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 col-span-1 overflow-x-auto">
        <div className="mb-4">
          <div className="space-x-2">
            <button
              className={`transition-all duration-300 ease-in-out px-4 py-2 rounded-md text-white ${
                selectedVehicles.length === 1
                  ? "bg-blue-400 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={selectedVehicles.length !== 1}
              onClick={handleEditClick}
            >
              <Image
                width={24}
                height={24}
                alt="Edit"
                src="/edit.svg"
                className="invert"
              />
            </button>
            <button
              className={`transition-all duration-300 ease-in-out px-4 py-2 rounded-md text-white ${
                selectedVehicles.length > 0
                  ? "bg-red-400 hover:bg-red-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={selectedVehicles.length === 0}
              onClick={() => handleDelete(selectedVehicles)}
            >
              <Image
                width={24}
                height={24}
                alt="Delete"
                src="/delete.svg"
                className="invert"
              />
            </button>
            <button
              className="transition-all duration-300 ease-in-out px-4 py-2 rounded-md bg-blue-400 text-white"
              onClick={() => fetchVehicles()}
            >
              <Image
                width={24}
                height={24}
                alt="Refresh"
                src="/refresh.svg"
                className="invert"
              />
            </button>
          </div>
        </div>

        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={
                    selectedVehicles.length === vehicles.length &&
                    vehicles.length > 0
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedVehicles(vehicles.map((v) => v.id));
                    } else {
                      setSelectedVehicles([]);
                    }
                  }}
                />
              </th>
              <th className="py-2 px-4 border-b">Marka</th>
              <th className="py-2 px-4 border-b">Model</th>
              <th className="py-2 px-4 border-b">Broj šasije</th>
              <th className="py-2 px-4 border-b">Broj motora</th>
              <th className="py-2 px-4 border-b">Snaga (kW)</th>
              <th className="py-2 px-4 border-b">Snaga (HP)</th>
              <th className="py-2 px-4 border-b">Vrsta goriva</th>
              <th className="py-2 px-4 border-b">Godina</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={isSelected(vehicle.id)}
                    onChange={() => toggleSelectVehicle(vehicle.id)}
                  />
                </td>
                <td className="py-2 px-4 border-b">{vehicle.make}</td>
                <td className="py-2 px-4 border-b">{vehicle.model}</td>
                <td className="py-2 px-4 border-b">{vehicle.chassisNumber}</td>
                <td className="py-2 px-4 border-b">{vehicle.engineNumber}</td>
                <td className="py-2 px-4 border-b">{vehicle.enginePowerKw}</td>
                <td className="py-2 px-4 border-b">{vehicle.enginePowerHp}</td>
                <td className="py-2 px-4 border-b">{vehicle.fuelType}</td>
                <td className="py-2 px-4 border-b">{vehicle.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && editVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Uredi automobil</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500 hover:text-gray-700 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="make"
                  className="block text-sm font-medium text-gray-700"
                >
                  Marka
                </label>
                <input
                  type="text"
                  name="make"
                  id="make"
                  value={editVehicle.make}
                  onChange={handleEditChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700"
                >
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  value={editVehicle.model}
                  onChange={handleEditChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="chassisNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Broj šasije
                </label>
                <input
                  type="text"
                  name="chassisNumber"
                  id="chassisNumber"
                  value={editVehicle.chassisNumber}
                  onChange={handleEditChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="engineNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Broj motora
                </label>
                <input
                  type="text"
                  name="engineNumber"
                  id="engineNumber"
                  value={editVehicle.engineNumber}
                  onChange={handleEditChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="enginePowerKw"
                  className="block text-sm font-medium text-gray-700"
                >
                  Snaga motora (kW)
                </label>
                <input
                  type="number"
                  name="enginePowerKw"
                  id="enginePowerKw"
                  value={editVehicle.enginePowerKw}
                  onChange={handleEditChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="enginePowerHp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Snaga motora (HP)
                </label>
                <input
                  type="number"
                  name="enginePowerHp"
                  id="enginePowerHp"
                  value={editVehicle.enginePowerHp}
                  onChange={handleEditChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="fuelType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vrsta goriva
                </label>
                <select
                  name="fuelType"
                  id="fuelType"
                  value={editVehicle.fuelType}
                  onChange={handleEditChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Benzin">Benzin</option>
                  <option value="Dizel">Dizel</option>
                  <option value="Plin">Plin</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Godina proizvodnje
                </label>
                <input
                  type="number"
                  name="year"
                  id="year"
                  value={editVehicle.year}
                  onChange={handleEditChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              >
                Spremi promjene
              </button>
            </form>
          </div>
        </div>
      )}

      {showAlert && (
        <Alert
          variant={alertVariant}
          message={alertMessage}
          duration={3000}
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default VehicleTable;
