import React, { useState } from "react";
import Image from "next/image";
import AddForm from "./AddForm";

const AddOrderButton = ({ onOrderAdded }: { onOrderAdded: () => void }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="my-8">
      <button
        className="flex items-center align-middle gap-2 p-2 bg-purple-400 text-white text-sm md:text-lg rounded-md shadow-md hover:bg-purple-600 transition duration-200"
        onClick={openModal}
      >
        Dodaj nalog{" "}
        <Image
          width={24}
          height={24}
          src="add.svg"
          className="invert"
          alt="Add"
        />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Kreiraj nalog</h2>
              <button
                className="text-gray-500 hover:text-gray-700 transition duration-200"
                onClick={closeModal}
              >
                X
              </button>
            </div>

            <AddForm onOrderAdded={onOrderAdded} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOrderButton;
