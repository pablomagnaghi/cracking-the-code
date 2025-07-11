import { hundredLockers } from '../../src/math/09-100-lockers';

describe('hundredLockers', () => {
  it('returns the list of open lockers after 100 passes', () => {
    const openLockers = hundredLockers();

    // Lockers that remain open are perfect squares from 1 to 100
    const expectedOpenLockers = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];

    expect(openLockers).toEqual(expectedOpenLockers);
  });
});
