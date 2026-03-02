// 14.03. Close All Requests
//
// Building #11 is being removed. Write a query to close all requests from
// apartments in this building. Adapted: implement as a TypeScript function
// that updates request statuses in-memory.
//
// Approach:
//   1. Find all apartments belonging to the specified building.
//   2. Collect their apartment ids into a set for O(1) lookup.
//   3. Iterate through all requests and set status to 'Closed' for any
//      request whose apartmentId is in the set.
//   4. Return the updated requests array.
//   This mirrors: UPDATE Requests SET status = 'Closed'
//   WHERE apartmentId IN (SELECT id FROM Apartments WHERE buildingId = 11)
//
// Example:
//   Building 11 has apartments [201, 202]. Request for apt 201 with
//   status 'Open' becomes 'Closed'.
//
// Constraints:
//   - Requests for apartments in other buildings remain unchanged.
//   - Already-closed requests remain closed.
//   - Returns a new array (does not mutate the input).

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

export function closeAllRequests(
  buildingId: number,
  apartments: Apartment[],
  requests: Request[]
): Request[] {
  // Find all apartment ids belonging to the target building
  const targetApartmentIds = new Set<number>();
  for (const apt of apartments) {
    if (apt.buildingId === buildingId) {
      targetApartmentIds.add(apt.id);
    }
  }

  // Close all requests for those apartments (return new array)
  return requests.map((request) => {
    if (targetApartmentIds.has(request.apartmentId)) {
      return { ...request, status: 'Closed' as const };
    }
    return { ...request };
  });
}
