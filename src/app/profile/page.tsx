"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { getCookie } from "cookies-next/client";
import jwt from "jsonwebtoken";

interface User {
  username: string;
  role: string;
  firstName: string;
  lastName: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/verify-token", {
          method: "GET",
          credentials: "same-origin",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Error verifying token:", err);
        router.push("/login");
      }
    };

    fetchUserData();
  }, [router]);

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
