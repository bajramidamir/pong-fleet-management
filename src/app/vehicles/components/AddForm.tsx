export function AddForm({
  formData,
  handleChange,
  handleSubmit,
}: AddFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          value={formData.make}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          value={formData.model}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          value={formData.chassisNumber}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          value={formData.engineNumber}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          value={formData.enginePowerKw}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="enginePowerHp"
          className="block text-sm font-medium text-gray-700"
        >
          Snaga motora (KS)
        </label>
        <input
          type="number"
          name="enginePowerHp"
          id="enginePowerHp"
          value={formData.enginePowerHp}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          value={formData.fuelType}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Odaberite vrstu goriva</option>
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
          type="text"
          name="year"
          id="year"
          value={formData.year}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        Dodaj
      </button>
    </form>
  );
}
