import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Report: React.FC<ReportProps> = ({ reportData, startDate, endDate }) => {
  const pieData = Object.entries(reportData.vehicleCounts || {}).map(
    ([vehicle, count]) => ({
      name: vehicle,
      value: count,
    })
  );

  const colors = ["#A78BFA", "#6B46C1", "#9F7AEA", "#D6BCFA", "#B794F4"];

  return (
    <div className="p-8 space-y-6">
      {reportData.type === "all" ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Izvjestaj svih automobila od {startDate} do {endDate}
          </h2>
          <p className="text-gray-700 mb-4">
            <strong>Ukupan broj naloga:</strong> {reportData.numberOfTrips}
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#A78BFA"
                  label
                  labelLine={false}
                  animationDuration={1000}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#333" }}
                  formatter={(value, name) => [value, `${name}`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 text-gray-700">
            <p className="mb-4">
              <strong>Ucestalost vozila:</strong>
            </p>
            <ul className="list-disc pl-5">
              {Object.entries(reportData.vehicleCounts || {}).map(
                ([vehicle, count]) => (
                  <li key={vehicle} className="text-sm text-gray-600 mb-2">
                    <strong>{vehicle}:</strong> {count}{" "}
                    {count === 1 ? "nalog" : "naloga"}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Izvjestaj za {reportData.vehicle} od {startDate} do {endDate}
          </h2>
          <div className="leading-8">
            <p className="text-gray-500 mb-2">
              <strong>Automobil:</strong> {reportData.vehicle}
            </p>
            <p className="text-gray-500 mb-2">
              <strong>Ukupan broj naloga:</strong> {reportData.numberOfTrips}
            </p>
            <p className="text-gray-500 mb-2">
              <strong>Ukupan broj dana:</strong> {reportData.numberOfDays}
            </p>
            <p className="text-gray-500">
              <strong>Ukupan broj sati:</strong> {reportData.numberOfHours}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
