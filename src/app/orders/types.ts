interface Trip {
  id: number;
  vehicleId: number;
  userId: number;
  startDate: string;
  endDate: string;
  startLocation: string;
  endLocation: string;
  driverName: string;
  passengerCount: number;
  status: "Evidentiran" | "Potvrdjen" | "Odbijen" | "Zavrsen";
  vehicle: {
    id: number;
    make: string;
    model: string;
    chassisNumber: string;
    engineNumber: string;
    enginePowerKw: number;
    enginePowerHp: number;
    fuelType: string;
    year: number;
  };
  user: {
    id: number;
    username: string;
    role: string;
    firstName: string;
    lastName: string;
  };
}

interface TripItemProps {
  trips: Trip[];
}

interface TripFormData {
  vehicleId: number;
  startDate: string;
  endDate: string;
  startLocation: string;
  endLocation: string;
  passengerCount: number;
}
