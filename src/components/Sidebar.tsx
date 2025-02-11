"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const Sidebar = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <div>
      <aside
        className="flex flex-col p-4 z-10 h-screen sticky top-0 left-0 bg-white border-r shadow-sm 
        w-16 md:w-52 transition-all duration-300 ease-in-out"
      >
        <div className="flex flex-col gap-4">
          <ul className="space-y-4 w-full">
            <li className="w-full">
              <Link href="/dashboard" passHref>
                <div className="flex items-center rounded-md gap-4 w-full p-2 transition-all duration-300 ease-in-out hover:bg-purple-100">
                  <Image
                    src="dashboard.svg"
                    width={32}
                    height={32}
                    alt="Dashboard"
                  />
                  <p className="hidden md:block">Dashboard</p>
                </div>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/vehicles" passHref>
                <div className="flex items-center rounded-md gap-4 w-full p-2 transition-all duration-300 ease-in-out hover:bg-purple-100">
                  <Image
                    src="car.svg"
                    width={32}
                    height={32}
                    alt="Automobili"
                  />
                  <p className="hidden md:block">Automobili</p>
                </div>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/orders" passHref>
                <div className="flex items-center rounded-md gap-4 w-full p-2 transition-all duration-300 ease-in-out hover:bg-purple-100">
                  <Image
                    src="order.svg"
                    width={32}
                    height={32}
                    alt="Putni nalozi"
                  />
                  <p className="hidden md:block">Putni nalozi</p>
                </div>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/reports" passHref>
                <div className="flex items-center rounded-md gap-4 w-full p-2 transition-all duration-300 ease-in-out hover:bg-purple-100">
                  <Image
                    src="report.svg"
                    width={32}
                    height={32}
                    alt="Izvještaji"
                  />
                  <p className="hidden md:block">Izvještaji</p>
                </div>
              </Link>
            </li>
            {user && (
              <li className="w-full">
                <button onClick={handleLogout} className="w-full">
                  <div className="flex items-center rounded-md gap-4 w-full p-2 transition-all duration-300 ease-in-out hover:bg-purple-100">
                    <Image
                      src="logout.svg"
                      width={32}
                      height={32}
                      alt="Logout"
                    />
                    <p className="hidden md:block">Logout</p>
                  </div>
                </button>
              </li>
            )}
            <li className="w-full">
              <Link href="/profile" passHref>
                <div className="flex items-center rounded-md gap-4 w-full p-2 transition-all duration-300 ease-in-out hover:bg-purple-100">
                  <Image src="user.svg" width={32} height={32} alt="Profil" />
                  <p className="hidden md:block">Profil</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
