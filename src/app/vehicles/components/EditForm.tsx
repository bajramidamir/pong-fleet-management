export function EditForm({
  editVehicle,
  handleEditChange,
  handleEditSubmit,
  setIsEditing,
}: EditFormProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-2 md:p-4">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-bold">Uredi automobil</h2>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-500 hover:text-gray-700 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleEditSubmit} className="space-y-2 md:space-y-4">
          <div>
            <label
              htmlFor="make"
              className="block text-sm font-medium text-gray-700"
            >
              Marka
            </label>
            <input
              type="text"
              name="make"
              id="make"
              value={editVehicle.make}
              onChange={handleEditChange}
              className="mt-1 p-1 md:p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700"
            >
              Model
            </label>
            <input
              type="text"
              name="model"
              id="model"
              value={editVehicle.model}
              onChange={handleEditChange}
              className="mt-1 p-1 md:p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="chassisNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Broj šasije
            </label>
            <input
              type="text"
              name="chassisNumber"
              id="chassisNumber"
              value={editVehicle.chassisNumber}
              onChange={handleEditChange}
              className="mt-1 p-1 md:p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="engineNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Broj motora
            </label>
            <input
              type="text"
              name="engineNumber"
              id="engineNumber"
              value={editVehicle.engineNumber}
              onChange={handleEditChange}
              className="mt-1 p-1 md:p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="enginePowerKw"
              className="block text-sm font-medium text-gray-700"
            >
              Snaga motora (kW)
            </label>
            <input
              type="number"
              name="enginePowerKw"
              id="enginePowerKw"
              value={editVehicle.enginePowerKw}
              onChange={handleEditChange}
              className="mt-1 p-1 md:p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="enginePowerHp"
              className="block text-sm font-medium text-gray-700"
            >
              Snaga motora (HP)
            </label>
            <input
              type="number"
              name="enginePowerHp"
              id="enginePowerHp"
              value={editVehicle.enginePowerHp}
              onChange={handleEditChange}
              className="mt-1 p-1 md:p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="fuelType"
              className="block text-sm font-medium text-gray-700"
            >
              Vrsta goriva
            </label>
            <select
              name="fuelType"
              id="fuelType"
              value={editVehicle.fuelType}
              onChange={handleEditChange}
              className="mt-1 p-1 md:p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Benzin">Benzin</option>
              <option value="Dizel">Dizel</option>
              <option value="Plin">Plin</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Godina proizvodnje
            </label>
            <input
              type="number"
              name="year"
              id="year"
              value={editVehicle.year}
              onChange={handleEditChange}
              className="mt-1 p-1 md:p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-1 md:p-2 bg-purple-400 text-white rounded-md hover:bg-purple-600 transition duration-200"
          >
            Spremi promjene
          </button>
        </form>
      </div>
    </div>
  );
}
