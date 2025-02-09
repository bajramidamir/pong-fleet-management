import React, { useState } from "react";

const AddOrderButton = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return <div className="my-8"></div>;
};

export default AddOrderButton;
