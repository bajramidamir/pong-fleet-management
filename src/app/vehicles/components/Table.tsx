export function Table({
  isSelected,
  selectedVehicles,
  setSelectedVehicles,
  toggleSelectVehicle,
  vehicles,
}: TableProps) {
  return (
    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="py-2 px-4 border-b">
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
          <th className="py-2 px-4 font-medium border-b">Marka</th>
          <th className="py-2 px-4 font-medium border-b">Model</th>
          <th className="py-2 px-4 font-medium border-b">Broj šasije</th>
          <th className="py-2 px-4 font-medium border-b">Broj motora</th>
          <th className="py-2 px-4 font-medium border-b">Snaga (kW)</th>
          <th className="py-2 px-4 font-medium border-b">Snaga (HP)</th>
          <th className="py-2 px-4 font-medium border-b">Vrsta goriva</th>
          <th className="py-2 px-4 font-medium border-b">Godina</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle) => (
          <tr key={vehicle.id} className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">
              <input
                type="checkbox"
                checked={isSelected(vehicle.id)}
                onChange={() => toggleSelectVehicle(vehicle.id)}
              />
            </td>
            <td className="py-2 px-4 border-b">{vehicle.make}</td>
            <td className="py-2 px-4 border-b">{vehicle.model}</td>
            <td className="py-2 px-4 border-b">{vehicle.chassisNumber}</td>
            <td className="py-2 px-4 border-b">{vehicle.engineNumber}</td>
            <td className="py-2 px-4 border-b">{vehicle.enginePowerKw}</td>
            <td className="py-2 px-4 border-b">{vehicle.enginePowerHp}</td>
            <td className="py-2 px-4 border-b">{vehicle.fuelType}</td>
            <td className="py-2 px-4 border-b">{vehicle.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
