import Image from "next/image";

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

export function TripItem({ trips }: TripItemProps) {
  const updateStatus = async (
    tripId: number,
    status: "Potvrdjen" | "Odbijen" | "Zavrsen"
  ) => {
    try {
      const response = await fetch(`/api/orders/${tripId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Greska pri azuriranju statusa!");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
      {trips.map((trip) => (
        <div
          key={trip.id}
          className="p-6 border rounded-lg w-full bg-white shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-8">
            Putni nalog #{trip.id} - {trip.vehicle.make} {trip.vehicle.model}
          </h2>
          <div className="text-base/8">
            <p>
              <span className="font-medium">Vozač:</span> {trip.driverName}
            </p>
            <p>
              <span className="font-medium">Datumi:</span>{" "}
              {new Date(trip.startDate).toLocaleString(undefined, dateOptions)}{" "}
              do {new Date(trip.endDate).toLocaleString(undefined, dateOptions)}
            </p>
            <p>
              <span className="font-medium">Lokacije:</span>{" "}
              {trip.startLocation} 🠞 {trip.endLocation}
            </p>
            <p>
              <span className="font-medium">Broj putnika:</span>{" "}
              {trip.passengerCount}
            </p>
            <p>
              <span className="font-medium">Status:</span> {trip.status}
            </p>
          </div>
          <div className="flex items-center align-middle justify-normal mt-4 space-x-2">
            {trip.status === "Evidentiran" && (
              <>
                <button
                  onClick={() => updateStatus(trip.id, "Potvrdjen")}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                >
                  <Image
                    src="check.svg"
                    alt="Check"
                    width={24}
                    height={24}
                    className="invert"
                  />
                </button>
                <button
                  onClick={() => updateStatus(trip.id, "Odbijen")}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                >
                  <Image
                    src="cross.svg"
                    alt="Cross"
                    width={24}
                    height={24}
                    className="invert"
                  />
                </button>
              </>
            )}

            {trip.status === "Potvrdjen" && (
              <button
                onClick={() => updateStatus(trip.id, "Zavrsen")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              >
                <Image
                  src="check.svg"
                  alt="Finish"
                  width={24}
                  height={24}
                  className="invert"
                />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
