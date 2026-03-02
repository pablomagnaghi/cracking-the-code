import {
  VehicleSize,
  Motorcycle,
  Car,
  Bus,
  ParkingSpot,
  Level,
  ParkingLot,
} from '../../src/object-oriented-design/04-parking-lot';

describe('Parking Lot', () => {
  test('Motorcycle can fit in any spot size', () => {
    const moto = new Motorcycle('M-001');
    const motoSpot = new ParkingSpot(VehicleSize.Motorcycle, 0, 0);
    const compactSpot = new ParkingSpot(VehicleSize.Compact, 0, 1);
    const largeSpot = new ParkingSpot(VehicleSize.Large, 0, 2);

    expect(moto.canFitInSpot(motoSpot)).toBe(true);
    expect(moto.canFitInSpot(compactSpot)).toBe(true);
    expect(moto.canFitInSpot(largeSpot)).toBe(true);
  });

  test('Car can fit in compact or large but not motorcycle spot', () => {
    const car = new Car('C-001');
    const motoSpot = new ParkingSpot(VehicleSize.Motorcycle, 0, 0);
    const compactSpot = new ParkingSpot(VehicleSize.Compact, 0, 1);
    const largeSpot = new ParkingSpot(VehicleSize.Large, 0, 2);

    expect(car.canFitInSpot(motoSpot)).toBe(false);
    expect(car.canFitInSpot(compactSpot)).toBe(true);
    expect(car.canFitInSpot(largeSpot)).toBe(true);
  });

  test('Bus can only fit in large spots', () => {
    const bus = new Bus('B-001');
    const compactSpot = new ParkingSpot(VehicleSize.Compact, 0, 0);
    const largeSpot = new ParkingSpot(VehicleSize.Large, 0, 1);

    expect(bus.canFitInSpot(compactSpot)).toBe(false);
    expect(bus.canFitInSpot(largeSpot)).toBe(true);
    expect(bus.spotsNeeded).toBe(5);
  });

  test('ParkingSpot tracks availability', () => {
    const spot = new ParkingSpot(VehicleSize.Large, 0, 0);
    expect(spot.isAvailable()).toBe(true);

    const car = new Car('C-001');
    spot.park(car);
    expect(spot.isAvailable()).toBe(false);
    expect(spot.getVehicle()).toBe(car);

    spot.removeVehicle();
    expect(spot.isAvailable()).toBe(true);
  });

  test('ParkingLot parks motorcycle and car', () => {
    // 1 level, 1 row, 10 spots (mix of sizes)
    const lot = new ParkingLot(1, 1, 10);
    const totalSpots = lot.totalSpots();
    expect(totalSpots).toBe(10);

    const moto = new Motorcycle('M-001');
    expect(lot.parkVehicle(moto)).toBe(true);
    expect(lot.availableSpots()).toBe(totalSpots - 1);

    const car = new Car('C-001');
    expect(lot.parkVehicle(car)).toBe(true);
    expect(lot.availableSpots()).toBe(totalSpots - 2);
  });

  test('ParkingLot parks bus in 5 consecutive large spots', () => {
    // 1 level, 1 row, 10 spots -> last 5 are large
    const lot = new ParkingLot(1, 1, 10);
    const bus = new Bus('B-001');
    expect(lot.parkVehicle(bus)).toBe(true);
    expect(bus.isParked()).toBe(true);
  });

  test('ParkingLot unparks vehicle and frees spots', () => {
    const lot = new ParkingLot(1, 1, 10);
    const car = new Car('C-001');
    lot.parkVehicle(car);
    const spotsAfterPark = lot.availableSpots();

    lot.unparkVehicle(car);
    expect(lot.availableSpots()).toBe(spotsAfterPark + 1);
    expect(car.isParked()).toBe(false);
  });

  test('ParkingLot uses multiple levels', () => {
    const lot = new ParkingLot(2, 1, 4);
    expect(lot.totalSpots()).toBe(8);

    // Fill first level (4 spots)
    for (let i = 0; i < 4; i++) {
      expect(lot.parkVehicle(new Motorcycle(`M-${i}`))).toBe(true);
    }
    // Next motorcycle should go to level 2
    const moto = new Motorcycle('M-extra');
    expect(lot.parkVehicle(moto)).toBe(true);
    expect(lot.availableSpots()).toBe(3);
  });

  test('ParkingLot returns false when full', () => {
    const lot = new ParkingLot(1, 1, 2);
    lot.parkVehicle(new Motorcycle('M-1'));
    lot.parkVehicle(new Motorcycle('M-2'));
    expect(lot.parkVehicle(new Motorcycle('M-3'))).toBe(false);
  });

  test('Bus cannot park if not enough consecutive large spots', () => {
    // 1 level, 1 row, 4 spots -> only 2 large spots
    const lot = new ParkingLot(1, 1, 4);
    const bus = new Bus('B-001');
    expect(lot.parkVehicle(bus)).toBe(false);
  });
});
