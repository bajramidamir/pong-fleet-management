import React, { useState } from "react";
import Alert from "@/components/Alert";
import { AddForm } from "./components/AddForm";
import Image from "next/image";

const AddVehicleForm: React.FC<AddVehicleFormProps> = ({ fetchVehicles }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<"Success" | "Danger">(
    "Success"
  );
  const [alertMessage, setAlertMessage] = useState<string>("");
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const [formData, setFormData] = useState<VehicleFormData>({
    make: "",
    model: "",
    chassisNumber: "",
    engineNumber: "",
    enginePowerKw: 0,
    enginePowerHp: 0,
    fuelType: "",
    year: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // convert explicitly to number
    if (["enginePowerKw", "enginePowerHp", "year"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === "" ? "" : Number(value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      setFormData({
        make: "",
        model: "",
        chassisNumber: "",
        engineNumber: "",
        enginePowerKw: 0,
        enginePowerHp: 0,
        fuelType: "",
        year: 0,
      });

      closeModal();
      fetchVehicles();
      setAlertVariant("Success");
      setAlertMessage("Uspješno dodan automobil!");
      setShowAlert(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertVariant("Danger");
      setAlertMessage("Greška pri dodavanju automobila!");
      setShowAlert(true);
    }
  };

  return (
    <div className="my-8">
      <button
        className="flex items-center align-middle gap-2 p-2 bg-blue-500 text-white text-lg rounded-md shadow-md hover:bg-blue-600 transition duration-200"
        onClick={openModal}
      >
        Dodaj automobil{" "}
        <Image
          width={24}
          height={24}
          src="add.svg"
          className="invert"
          alt="Add"
        />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Dodaj automobil</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition duration-200"
              >
                X
              </button>
            </div>

            <AddForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
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
    </div>
  );
};

export default AddVehicleForm;
