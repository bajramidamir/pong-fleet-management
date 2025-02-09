import Image from "next/image";

export function Toolbar({
  fetchVehicles,
  handleDelete,
  handleEditClick,
  selectedVehicles,
}: ToolbarProps) {
  return (
    <div className="space-x-2">
      <button
        className={`transition-all duration-300 ease-in-out px-4 py-2 rounded-md text-white ${
          selectedVehicles.length === 1
            ? "bg-blue-400 hover:bg-blue-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={selectedVehicles.length !== 1}
        onClick={handleEditClick}
      >
        <Image
          width={24}
          height={24}
          alt="Edit"
          src="/edit.svg"
          className="invert"
        />
      </button>
      <button
        className={`transition-all duration-300 ease-in-out px-4 py-2 rounded-md text-white ${
          selectedVehicles.length > 0
            ? "bg-red-400 hover:bg-red-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={selectedVehicles.length === 0}
        onClick={() => handleDelete(selectedVehicles)}
      >
        <Image
          width={24}
          height={24}
          alt="Delete"
          src="/delete.svg"
          className="invert"
        />
      </button>
      <button
        className="transition-all duration-300 ease-in-out px-4 py-2 rounded-md bg-purple-400 hover:bg-purple-600 text-white"
        onClick={() => fetchVehicles()}
      >
        <Image
          width={24}
          height={24}
          alt="Refresh"
          src="/refresh.svg"
          className="invert"
        />
      </button>
    </div>
  );
}
