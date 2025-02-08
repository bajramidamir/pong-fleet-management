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

interface VehicleTableProps {
  vehicles: Vehicle[];
  fetchVehicles: () => void;
}

interface TableProps {
  isSelected: (id: number) => boolean;
  selectedVehicles: number[];
  setSelectedVehicles: React.Dispatch<React.SetStateAction<number[]>>;
  toggleSelectVehicle: (id: number) => void;
  vehicles: Vehicle[];
}

interface EditFormProps {
  editVehicle: [any, React.Dispatch<any>][number];
  handleEditChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleEditSubmit: (e: React.FormEvent<Element>) => Promise<void>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ToolbarProps {
  fetchVehicles: () => void;
  handleDelete: (idArray: number[]) => Promise<void>;
  handleEditClick: () => void;
  selectedVehicles: number[];
}

interface AddFormProps {
  formData: VehicleFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<Element>) => Promise<void>;
}
