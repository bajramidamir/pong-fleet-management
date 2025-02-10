const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

export function TripItem({ trips }: TripItemProps) {
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
        </div>
      ))}
    </div>
  );
}
