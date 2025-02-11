import React, { useState } from "react";
import Alert from "@/components/Alert";
import { EditForm } from "./components/EditForm";
import { Table } from "./components/Table";
import { Toolbar } from "./components/Toolbar";
import { useUser } from "@/context/UserContext";

const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
  fetchVehicles,
}) => {
  const { user } = useUser();
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
          {user?.role === "admin" && (
            <Toolbar
              fetchVehicles={fetchVehicles}
              handleDelete={handleDelete}
              handleEditClick={handleEditClick}
              selectedVehicles={selectedVehicles}
            />
          )}
        </div>

        <Table
          isSelected={isSelected}
          selectedVehicles={selectedVehicles}
          setSelectedVehicles={setSelectedVehicles}
          toggleSelectVehicle={toggleSelectVehicle}
          vehicles={vehicles}
        />
      </div>

      <div>
        {isEditing && editVehicle && (
          <EditForm
            editVehicle={editVehicle}
            handleEditChange={handleEditChange}
            handleEditSubmit={handleEditSubmit}
            setIsEditing={setIsEditing}
          />
        )}
      </div>

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
