// 07.04. Parking Lot
//
// Design a parking lot using object-oriented principles. The parking lot has
// multiple levels, each level has multiple rows of spots. The parking lot can
// park motorcycles, cars, and buses. A motorcycle can park in any spot. A car
// can park in a single compact spot or a single large spot. A bus can park in
// five consecutive large spots within the same row.
//
// Approach:
//   - VehicleSize enum: Motorcycle, Compact, Large.
//   - Vehicle base class with subclasses Motorcycle, Car, Bus that define
//     how many spots they need and what sizes they can fit into.
//   - ParkingSpot tracks its size, row, level, and whether it is occupied.
//   - Level contains rows of spots and attempts to park a vehicle by finding
//     a suitable contiguous run of spots in a single row.
//   - ParkingLot holds multiple Levels and tries each in order.
//
// Example:
//   const lot = new ParkingLot(2, 3, 10); // 2 levels, 3 rows, 10 spots/row
//   lot.parkVehicle(new Car('ABC-123'));   // true
//   lot.parkVehicle(new Bus('BUS-001'));   // true (needs 5 consecutive large)
//
// Constraints:
//   - Motorcycles fit any spot size.
//   - Cars fit compact or large spots.
//   - Buses require exactly 5 consecutive large spots in the same row.
//   - Spots have a fixed size assigned at construction.

export enum VehicleSize {
  Motorcycle,
  Compact,
  Large,
}

export abstract class Vehicle {
  readonly licensePlate: string;
  abstract readonly size: VehicleSize;
  abstract readonly spotsNeeded: number;
  protected parkingSpots: ParkingSpot[] = [];

  constructor(licensePlate: string) {
    this.licensePlate = licensePlate;
  }

  canFitInSpot(spot: ParkingSpot): boolean {
    return spot.getSize() >= this.size;
  }

  parkInSpots(spots: ParkingSpot[]): void {
    this.parkingSpots = spots;
    for (const spot of spots) {
      spot.park(this);
    }
  }

  leave(): void {
    for (const spot of this.parkingSpots) {
      spot.removeVehicle();
    }
    this.parkingSpots = [];
  }

  isParked(): boolean {
    return this.parkingSpots.length > 0;
  }
}

export class Motorcycle extends Vehicle {
  readonly size = VehicleSize.Motorcycle;
  readonly spotsNeeded = 1;
}

export class Car extends Vehicle {
  readonly size = VehicleSize.Compact;
  readonly spotsNeeded = 1;
}

export class Bus extends Vehicle {
  readonly size = VehicleSize.Large;
  readonly spotsNeeded = 5;

  canFitInSpot(spot: ParkingSpot): boolean {
    return spot.getSize() === VehicleSize.Large;
  }
}

export class ParkingSpot {
  private vehicle?: Vehicle;
  private readonly spotSize: VehicleSize;
  readonly row: number;
  readonly spotNumber: number;

  constructor(size: VehicleSize, row: number, spotNumber: number) {
    this.spotSize = size;
    this.row = row;
    this.spotNumber = spotNumber;
  }

  isAvailable(): boolean {
    return this.vehicle === undefined;
  }

  getSize(): VehicleSize {
    return this.spotSize;
  }

  getVehicle(): Vehicle | undefined {
    return this.vehicle;
  }

  park(vehicle: Vehicle): boolean {
    if (!this.isAvailable() || !vehicle.canFitInSpot(this)) return false;
    this.vehicle = vehicle;
    return true;
  }

  removeVehicle(): void {
    this.vehicle = undefined;
  }
}

export class Level {
  private spots: ParkingSpot[] = [];
  readonly levelNumber: number;
  private readonly numRows: number;
  private readonly spotsPerRow: number;

  constructor(levelNumber: number, numRows: number, spotsPerRow: number) {
    this.levelNumber = levelNumber;
    this.numRows = numRows;
    this.spotsPerRow = spotsPerRow;

    for (let row = 0; row < numRows; row++) {
      for (let s = 0; s < spotsPerRow; s++) {
        // Distribution: first 1/4 motorcycle, next 1/4 compact, rest large
        let size: VehicleSize;
        if (s < Math.floor(spotsPerRow / 4)) {
          size = VehicleSize.Motorcycle;
        } else if (s < Math.floor(spotsPerRow / 2)) {
          size = VehicleSize.Compact;
        } else {
          size = VehicleSize.Large;
        }
        this.spots.push(new ParkingSpot(size, row, s));
      }
    }
  }

  parkVehicle(vehicle: Vehicle): boolean {
    for (let row = 0; row < this.numRows; row++) {
      const start = row * this.spotsPerRow;
      const end = start + this.spotsPerRow;
      const rowSpots = this.spots.slice(start, end);

      if (vehicle.spotsNeeded === 1) {
        // Find single available spot that fits
        for (const spot of rowSpots) {
          if (spot.isAvailable() && vehicle.canFitInSpot(spot)) {
            vehicle.parkInSpots([spot]);
            return true;
          }
        }
      } else {
        // Find consecutive available large spots
        let consecutive: ParkingSpot[] = [];
        for (const spot of rowSpots) {
          if (spot.isAvailable() && vehicle.canFitInSpot(spot)) {
            consecutive.push(spot);
            if (consecutive.length === vehicle.spotsNeeded) {
              vehicle.parkInSpots(consecutive);
              return true;
            }
          } else {
            consecutive = [];
          }
        }
      }
    }
    return false;
  }

  availableSpots(): number {
    return this.spots.filter((s) => s.isAvailable()).length;
  }

  totalSpots(): number {
    return this.spots.length;
  }
}

export class ParkingLot {
  private levels: Level[];

  constructor(numLevels: number, rowsPerLevel: number, spotsPerRow: number) {
    this.levels = [];
    for (let i = 0; i < numLevels; i++) {
      this.levels.push(new Level(i, rowsPerLevel, spotsPerRow));
    }
  }

  parkVehicle(vehicle: Vehicle): boolean {
    for (const level of this.levels) {
      if (level.parkVehicle(vehicle)) return true;
    }
    return false;
  }

  unparkVehicle(vehicle: Vehicle): void {
    vehicle.leave();
  }

  availableSpots(): number {
    return this.levels.reduce((sum, level) => sum + level.availableSpots(), 0);
  }

  totalSpots(): number {
    return this.levels.reduce((sum, level) => sum + level.totalSpots(), 0);
  }

  getLevels(): Level[] {
    return [...this.levels];
  }
}
