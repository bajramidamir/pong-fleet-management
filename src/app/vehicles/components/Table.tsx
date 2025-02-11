export function Table({
  isSelected,
  selectedVehicles,
  setSelectedVehicles,
  toggleSelectVehicle,
  vehicles,
}: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-1 px-2 sm:py-2 sm:px-4 border-b">
              <input
                type="checkbox"
                checked={
                  selectedVehicles.length === vehicles.length &&
                  vehicles.length > 0
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedVehicles(vehicles.map((v) => v.id));
                  } else {
                    setSelectedVehicles([]);
                  }
                }}
              />
            </th>
            <th className="py-1 px-2 sm:py-2 sm:px-4 font-medium border-b text-xs sm:text-sm">
              Marka
            </th>
            <th className="py-1 px-2 sm:py-2 sm:px-4 font-medium border-b text-xs sm:text-sm">
              Model
            </th>
            <th className="py-1 px-2 sm:py-2 sm:px-4 font-medium border-b text-xs sm:text-sm">
              Broj šasije
            </th>
            <th className="py-1 px-2 sm:py-2 sm:px-4 font-medium border-b text-xs sm:text-sm">
              Broj motora
            </th>
            <th className="py-1 px-2 sm:py-2 sm:px-4 font-medium border-b text-xs sm:text-sm">
              Snaga (kW)
            </th>
            <th className="py-1 px-2 sm:py-2 sm:px-4 font-medium border-b text-xs sm:text-sm">
              Snaga (HP)
            </th>
            <th className="py-1 px-2 sm:py-2 sm:px-4 font-medium border-b text-xs sm:text-sm">
              Vrsta goriva
            </th>
            <th className="py-1 px-2 sm:py-2 sm:px-4 font-medium border-b text-xs sm:text-sm">
              Godina
            </th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="hover:bg-gray-50">
              <td className="py-1 px-2 sm:py-2 sm:px-4 border-b">
                <input
                  type="checkbox"
                  checked={isSelected(vehicle.id)}
                  onChange={() => toggleSelectVehicle(vehicle.id)}
                />
              </td>
              <td className="py-1 px-2 sm:py-2 sm:px-4 border-b text-xs sm:text-sm">
                {vehicle.make}
              </td>
              <td className="py-1 px-2 sm:py-2 sm:px-4 border-b text-xs sm:text-sm">
                {vehicle.model}
              </td>
              <td className="py-1 px-2 sm:py-2 sm:px-4 border-b text-xs sm:text-sm">
                {vehicle.chassisNumber}
              </td>
              <td className="py-1 px-2 sm:py-2 sm:px-4 border-b text-xs sm:text-sm">
                {vehicle.engineNumber}
              </td>
              <td className="py-1 px-2 sm:py-2 sm:px-4 border-b text-xs sm:text-sm">
                {vehicle.enginePowerKw}
              </td>
              <td className="py-1 px-2 sm:py-2 sm:px-4 border-b text-xs sm:text-sm">
                {vehicle.enginePowerHp}
              </td>
              <td className="py-1 px-2 sm:py-2 sm:px-4 border-b text-xs sm:text-sm">
                {vehicle.fuelType}
              </td>
              <td className="py-1 px-2 sm:py-2 sm:px-4 border-b text-xs sm:text-sm">
                {vehicle.year}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
