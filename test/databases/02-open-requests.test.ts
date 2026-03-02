import {
  getOpenRequestsByBuilding,
  Building,
  Apartment,
  Request,
} from '../../src/databases/02-open-requests';

describe('getOpenRequestsByBuilding', () => {
  const buildings: Building[] = [
    { id: 1, name: 'Sunrise Tower' },
    { id: 2, name: 'Maple Court' },
    { id: 3, name: 'Oak Residences' },
  ];

  const apartments: Apartment[] = [
    { id: 101, buildingId: 1 },
    { id: 102, buildingId: 1 },
    { id: 201, buildingId: 2 },
    { id: 301, buildingId: 3 },
  ];

  test('counts open requests per building correctly', () => {
    const requests: Request[] = [
      { id: 1, apartmentId: 101, status: 'Open', description: 'Leaky faucet' },
      { id: 2, apartmentId: 101, status: 'Open', description: 'Broken window' },
      { id: 3, apartmentId: 102, status: 'Closed', description: 'Paint peeling' },
      { id: 4, apartmentId: 201, status: 'Open', description: 'Door stuck' },
      { id: 5, apartmentId: 301, status: 'Closed', description: 'AC broken' },
    ];
    const result = getOpenRequestsByBuilding(buildings, apartments, requests);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ buildingId: 1, buildingName: 'Sunrise Tower', openRequests: 2 });
    expect(result[1]).toEqual({ buildingId: 2, buildingName: 'Maple Court', openRequests: 1 });
    expect(result[2]).toEqual({ buildingId: 3, buildingName: 'Oak Residences', openRequests: 0 });
  });

  test('returns zero counts when no requests exist', () => {
    const result = getOpenRequestsByBuilding(buildings, apartments, []);
    expect(result).toHaveLength(3);
    expect(result.every((b) => b.openRequests === 0)).toBe(true);
  });

  test('returns zero counts when all requests are closed', () => {
    const requests: Request[] = [
      { id: 1, apartmentId: 101, status: 'Closed', description: 'Fixed' },
      { id: 2, apartmentId: 201, status: 'Closed', description: 'Done' },
    ];
    const result = getOpenRequestsByBuilding(buildings, apartments, requests);
    expect(result.every((b) => b.openRequests === 0)).toBe(true);
  });

  test('includes buildings with no apartments', () => {
    const extraBuilding: Building[] = [
      ...buildings,
      { id: 4, name: 'Empty Tower' },
    ];
    const requests: Request[] = [
      { id: 1, apartmentId: 101, status: 'Open', description: 'Leak' },
    ];
    const result = getOpenRequestsByBuilding(extraBuilding, apartments, requests);
    expect(result).toHaveLength(4);
    const emptyTower = result.find((b) => b.buildingId === 4);
    expect(emptyTower).toBeDefined();
    expect(emptyTower!.openRequests).toBe(0);
  });

  test('results are sorted by building id', () => {
    const reversedBuildings: Building[] = [
      { id: 3, name: 'Oak Residences' },
      { id: 1, name: 'Sunrise Tower' },
      { id: 2, name: 'Maple Court' },
    ];
    const result = getOpenRequestsByBuilding(reversedBuildings, apartments, []);
    expect(result[0].buildingId).toBe(1);
    expect(result[1].buildingId).toBe(2);
    expect(result[2].buildingId).toBe(3);
  });

  test('handles multiple open requests in same apartment', () => {
    const requests: Request[] = [
      { id: 1, apartmentId: 301, status: 'Open', description: 'Issue 1' },
      { id: 2, apartmentId: 301, status: 'Open', description: 'Issue 2' },
      { id: 3, apartmentId: 301, status: 'Open', description: 'Issue 3' },
    ];
    const result = getOpenRequestsByBuilding(buildings, apartments, requests);
    const oak = result.find((b) => b.buildingId === 3);
    expect(oak!.openRequests).toBe(3);
  });
});
