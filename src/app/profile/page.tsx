"use client";

import React from "react";
import Loader from "@/components/Loader";
import { useUser } from "@/context/UserContext";

const ProfilePage: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Informacije o korisnku
        </h1>
        <div className="space-y-4">
          <p>
            <strong>Korisničko ime:</strong> {user.username}
          </p>
          <p>
            <strong>Uloga:</strong> {user.role}
          </p>
          <p>
            <strong>Ime i prezime:</strong> {user.firstName} {user.lastName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
