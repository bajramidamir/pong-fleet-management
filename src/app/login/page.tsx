"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/components/Alert";
import { LoginForm } from "./components/LoginForm";
import Image from "next/image";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);
      router.push("/");
    } catch (error) {
      setAlertMessage("Invalid email or password");
      setShowAlert(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Image
          src="pong.svg"
          width={56}
          height={56}
          alt="Pong"
          className="mx-auto my-4"
        />
        <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>

        {showAlert && (
          <Alert
            variant="Danger"
            message={alertMessage}
            onClose={() => setShowAlert(false)}
          />
        )}

        <LoginForm
          handleSubmit={handleSubmit}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          username={username}
        />
      </div>
    </div>
  );
};

export default LoginPage;
