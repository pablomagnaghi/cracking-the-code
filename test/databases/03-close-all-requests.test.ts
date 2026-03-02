import {
  closeAllRequests,
  Apartment,
  Request,
} from '../../src/databases/03-close-all-requests';

describe('closeAllRequests', () => {
  const apartments: Apartment[] = [
    { id: 101, buildingId: 11 },
    { id: 102, buildingId: 11 },
    { id: 201, buildingId: 22 },
    { id: 301, buildingId: 33 },
  ];

  test('closes open requests for apartments in target building', () => {
    const requests: Request[] = [
      { id: 1, apartmentId: 101, status: 'Open', description: 'Leak' },
      { id: 2, apartmentId: 102, status: 'Open', description: 'Noise' },
      { id: 3, apartmentId: 201, status: 'Open', description: 'Paint' },
    ];
    const result = closeAllRequests(11, apartments, requests);
    expect(result[0].status).toBe('Closed');
    expect(result[1].status).toBe('Closed');
    expect(result[2].status).toBe('Open');
  });

  test('does not mutate the original requests array', () => {
    const requests: Request[] = [
      { id: 1, apartmentId: 101, status: 'Open', description: 'Leak' },
    ];
    closeAllRequests(11, apartments, requests);
    expect(requests[0].status).toBe('Open');
  });

  test('already closed requests remain closed', () => {
    const requests: Request[] = [
      { id: 1, apartmentId: 101, status: 'Closed', description: 'Fixed' },
      { id: 2, apartmentId: 102, status: 'Open', description: 'Leak' },
    ];
    const result = closeAllRequests(11, apartments, requests);
    expect(result[0].status).toBe('Closed');
    expect(result[1].status).toBe('Closed');
  });

  test('returns unchanged requests when building has no apartments', () => {
    const requests: Request[] = [
      { id: 1, apartmentId: 201, status: 'Open', description: 'Issue' },
      { id: 2, apartmentId: 301, status: 'Open', description: 'Issue' },
    ];
    const result = closeAllRequests(99, apartments, requests);
    expect(result[0].status).toBe('Open');
    expect(result[1].status).toBe('Open');
  });

  test('handles empty requests array', () => {
    const result = closeAllRequests(11, apartments, []);
    expect(result).toHaveLength(0);
  });

  test('preserves request descriptions and ids', () => {
    const requests: Request[] = [
      { id: 5, apartmentId: 101, status: 'Open', description: 'Broken pipe' },
    ];
    const result = closeAllRequests(11, apartments, requests);
    expect(result[0].id).toBe(5);
    expect(result[0].description).toBe('Broken pipe');
    expect(result[0].apartmentId).toBe(101);
    expect(result[0].status).toBe('Closed');
  });

  test('only closes requests for the specified building', () => {
    const requests: Request[] = [
      { id: 1, apartmentId: 101, status: 'Open', description: 'A' },
      { id: 2, apartmentId: 201, status: 'Open', description: 'B' },
      { id: 3, apartmentId: 301, status: 'Open', description: 'C' },
    ];
    const result = closeAllRequests(11, apartments, requests);
    const openCount = result.filter((r) => r.status === 'Open').length;
    const closedCount = result.filter((r) => r.status === 'Closed').length;
    expect(closedCount).toBe(1);
    expect(openCount).toBe(2);
  });
});
