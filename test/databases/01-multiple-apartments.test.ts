import {
  findTenantsWithMultipleApartments,
  Tenant,
  ApartmentRental,
} from '../../src/databases/01-multiple-apartments';

describe('findTenantsWithMultipleApartments', () => {
  const tenants: Tenant[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' },
  ];

  test('returns tenants renting more than one apartment', () => {
    const rentals: ApartmentRental[] = [
      { tenantId: 1, apartmentId: 101 },
      { tenantId: 1, apartmentId: 102 },
      { tenantId: 2, apartmentId: 103 },
      { tenantId: 3, apartmentId: 104 },
      { tenantId: 3, apartmentId: 105 },
      { tenantId: 3, apartmentId: 106 },
    ];
    const result = findTenantsWithMultipleApartments(tenants, rentals);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Alice');
    expect(result[1].name).toBe('Charlie');
  });

  test('returns empty array when no tenant has multiple apartments', () => {
    const rentals: ApartmentRental[] = [
      { tenantId: 1, apartmentId: 101 },
      { tenantId: 2, apartmentId: 102 },
      { tenantId: 3, apartmentId: 103 },
    ];
    const result = findTenantsWithMultipleApartments(tenants, rentals);
    expect(result).toHaveLength(0);
  });

  test('returns empty array when no rentals exist', () => {
    const result = findTenantsWithMultipleApartments(tenants, []);
    expect(result).toHaveLength(0);
  });

  test('handles tenant with exactly two apartments', () => {
    const rentals: ApartmentRental[] = [
      { tenantId: 2, apartmentId: 201 },
      { tenantId: 2, apartmentId: 202 },
    ];
    const result = findTenantsWithMultipleApartments(tenants, rentals);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  test('ignores rentals for unknown tenant ids', () => {
    const rentals: ApartmentRental[] = [
      { tenantId: 99, apartmentId: 301 },
      { tenantId: 99, apartmentId: 302 },
    ];
    const result = findTenantsWithMultipleApartments(tenants, rentals);
    expect(result).toHaveLength(0);
  });

  test('all tenants with multiple apartments are returned sorted by id', () => {
    const rentals: ApartmentRental[] = [
      { tenantId: 4, apartmentId: 401 },
      { tenantId: 4, apartmentId: 402 },
      { tenantId: 2, apartmentId: 201 },
      { tenantId: 2, apartmentId: 202 },
      { tenantId: 1, apartmentId: 101 },
    ];
    const result = findTenantsWithMultipleApartments(tenants, rentals);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(4);
  });
});
