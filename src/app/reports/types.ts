interface ReportData {
  type: "single" | "all";
  vehicle?: string;
  numberOfTrips?: number;
  numberOfDays?: number;
  numberOfHours?: number;
  vehicleCounts?: Record<string, number>;
}

interface ReportProps {
  reportData: ReportData;
  startDate: string | undefined;
  endDate: string | undefined;
}
