interface ReportData {
  type: "single" | "all";
  vehicle?: string;
  totalTrips?: number;
  totalDays?: number;
  totalHours?: number;
  vehicleCounts?: Record<string, number>;
}
