interface Stats {
  totalTrips: number;
  totalVehicles: number;
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  tripsByVehicle: {
    vehicleId: string;
    vehicleMake: string;
    vehicleModel: string;
    tripCount: number;
    _count: {
      vehicleId: number;
    };
  }[];
}
