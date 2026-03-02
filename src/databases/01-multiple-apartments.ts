// 14.01. Multiple Apartments
//
// Write a SQL query to get a list of tenants who are renting more than one
// apartment. Adapted: implement as a TypeScript function that filters
// tenant/apartment rental data using in-memory data structures.
//
// Approach:
//   Count the number of rentals per tenant by grouping ApartmentRental
//   records by tenantId. Then filter for tenants whose count exceeds 1.
//   This mirrors the SQL: SELECT tenantId FROM ApartmentRentals
//   GROUP BY tenantId HAVING COUNT(*) > 1, joined back to the Tenants table.
//
// Example:
//   Tenant Alice rents apartments 101 and 102 -> included in result
//   Tenant Bob rents apartment 103 only -> excluded
//
// Constraints:
//   - Each rental links exactly one tenant to one apartment.
//   - A tenant may appear in multiple rentals.
//   - Returns tenants sorted by id for deterministic output.

export interface Tenant {
  id: number;
  name: string;
}

export interface ApartmentRental {
  tenantId: number;
  apartmentId: number;
}

export function findTenantsWithMultipleApartments(
  tenants: Tenant[],
  rentals: ApartmentRental[]
): Tenant[] {
  const rentalCounts = new Map<number, number>();

  for (const rental of rentals) {
    rentalCounts.set(
      rental.tenantId,
      (rentalCounts.get(rental.tenantId) ?? 0) + 1
    );
  }

  const tenantMap = new Map<number, Tenant>();
  for (const tenant of tenants) {
    tenantMap.set(tenant.id, tenant);
  }

  const result: Tenant[] = [];
  for (const [tenantId, count] of rentalCounts) {
    if (count > 1) {
      const tenant = tenantMap.get(tenantId);
      if (tenant) {
        result.push(tenant);
      }
    }
  }

  return result.sort((a, b) => a.id - b.id);
}
