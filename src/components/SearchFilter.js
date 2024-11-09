import { useState } from "react";

export default function SearchFilter({ onFilterChange }) {
  const [actionType, setActionType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    onFilterChange({ actionType, startDate, endDate });
  };

  const handleClear = () => {
    setActionType("");
    setStartDate("");
    setEndDate("");
    onFilterChange({ actionType: "", startDate: "", endDate: "" });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 p-4 bg-white shadow-md rounded-lg">
      <div className="flex-1 w-full">
        <input
          type="text"
          placeholder="Search by Action Type"
          aria-label="Search by Action Type"
          value={actionType}
          onChange={(e) => setActionType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex-1 w-full">
        <input
          type="date"
          aria-label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex-1 w-full">
        <input
          type="date"
          aria-label="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleFilter}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          Apply Filter
        </button>

        <button
          onClick={handleClear}
          className="px-4 py-2 text-blue-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
