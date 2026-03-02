// 14.02. Open Requests
//
// Write a SQL query to get a list of all buildings and the number of open
// requests (requests with status = 'Open'). Adapted: implement with
// in-memory data structures representing the database tables.
//
// Approach:
//   1. Map each apartment to its building via buildingId.
//   2. Filter requests to only those with status 'Open'.
//   3. For each open request, look up the apartment to find the building.
//   4. Aggregate counts per building.
//   5. Return all buildings with their open request counts (including 0).
//   This mirrors a LEFT JOIN from Buildings to Apartments to Requests
//   with a WHERE/HAVING on status = 'Open'.
//
// Example:
//   Building A has 2 open requests, Building B has 0 -> both returned
//
// Constraints:
//   - Buildings with no open requests should still appear with count 0.
//   - Results are sorted by building id.

export interface Building {
  id: number;
  name: string;
}

export interface Apartment {
  id: number;
  buildingId: number;
}

export interface Request {
  id: number;
  apartmentId: number;
  status: 'Open' | 'Closed';
  description: string;
}

export interface BuildingRequests {
  buildingId: number;
  buildingName: string;
  openRequests: number;
}

export function getOpenRequestsByBuilding(
  buildings: Building[],
  apartments: Apartment[],
  requests: Request[]
): BuildingRequests[] {
  // Map apartment id -> building id
  const apartmentToBuilding = new Map<number, number>();
  for (const apt of apartments) {
    apartmentToBuilding.set(apt.id, apt.buildingId);
  }

  // Count open requests per building
  const openCounts = new Map<number, number>();
  for (const building of buildings) {
    openCounts.set(building.id, 0);
  }

  for (const request of requests) {
    if (request.status === 'Open') {
      const buildingId = apartmentToBuilding.get(request.apartmentId);
      if (buildingId !== undefined && openCounts.has(buildingId)) {
        openCounts.set(buildingId, openCounts.get(buildingId)! + 1);
      }
    }
  }

  // Build result with all buildings
  const result: BuildingRequests[] = buildings.map((building) => ({
    buildingId: building.id,
    buildingName: building.name,
    openRequests: openCounts.get(building.id) ?? 0,
  }));

  return result.sort((a, b) => a.buildingId - b.buildingId);
}
