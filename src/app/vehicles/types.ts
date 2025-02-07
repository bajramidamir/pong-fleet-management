interface Vehicle {
  id: number;
  make: string;
  model: string;
  chassisNumber: string;
  engineNumber: string;
  enginePowerKw: number;
  enginePowerHp: number;
  fuelType: string;
  year: number;
}

interface VehicleFormData {
  make: string;
  model: string;
  chassisNumber: string;
  engineNumber: string;
  enginePowerKw: number;
  enginePowerHp: number;
  fuelType: string;
  year: number;
}

interface AddVehicleFormProps {
  fetchVehicles: () => void;
}
