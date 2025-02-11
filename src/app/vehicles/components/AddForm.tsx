export function AddForm({
  formData,
  handleChange,
  handleSubmit,
}: AddFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="make" className="text-sm font-medium text-gray-800">
          Marka
        </label>
        <input
          type="text"
          name="make"
          id="make"
          value={formData.make}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="model" className="text-sm font-medium text-gray-800">
          Model
        </label>
        <input
          type="text"
          name="model"
          id="model"
          value={formData.model}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="chassisNumber"
          className="text-sm font-medium text-gray-800"
        >
          Broj šasije
        </label>
        <input
          type="text"
          name="chassisNumber"
          id="chassisNumber"
          value={formData.chassisNumber}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="engineNumber"
          className="text-sm font-medium text-gray-800"
        >
          Broj motora
        </label>
        <input
          type="text"
          name="engineNumber"
          id="engineNumber"
          value={formData.engineNumber}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="enginePowerKw"
          className="text-sm font-medium text-gray-800"
        >
          Snaga motora (kW)
        </label>
        <input
          type="number"
          name="enginePowerKw"
          id="enginePowerKw"
          value={formData.enginePowerKw}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="enginePowerHp"
          className="text-sm font-medium text-gray-800"
        >
          Snaga motora (KS)
        </label>
        <input
          type="number"
          name="enginePowerHp"
          id="enginePowerHp"
          value={formData.enginePowerHp}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="fuelType" className="text-sm font-medium text-gray-800">
          Vrsta goriva
        </label>
        <select
          name="fuelType"
          id="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          required
        >
          <option value="">Odaberite vrstu goriva</option>
          <option value="Benzin">Benzin</option>
          <option value="Dizel">Dizel</option>
          <option value="Plin">Plin</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="year" className="text-sm font-medium text-gray-800">
          Godina proizvodnje
        </label>
        <input
          type="number"
          name="year"
          id="year"
          value={formData.year}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-primary text-white bg-purple-400 hover:bg-purple-600 rounded-lg hover:bg-primary-dark transition duration-200 shadow-md"
      >
        Dodaj
      </button>
    </form>
  );
}
