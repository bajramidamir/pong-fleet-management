"use client";

import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RegisterForm } from "./components/RegisterForm";
import Link from "next/link";

const page = () => {
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setShowAlert(true);
        setAlertMessage("Registracija nije uspjela");
        throw new Error("Registracija nije uspjela");
      }

      router.push("/login");
    } catch (error) {
      console.error("Nepoznata greska:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-2 text-center">
          Registracija
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Treba nam samo par informacija
        </p>
        {showAlert && (
          <Alert
            variant="Danger"
            message={alertMessage}
            onClose={() => setShowAlert(false)}
          />
        )}

        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <p className="mt-4 text-gray-500 hover:underline text-right text-sm">
          <Link href="/login">Već imate nalog? Upišite se!</Link>
        </p>
      </div>
    </div>
  );
};

export default page;
