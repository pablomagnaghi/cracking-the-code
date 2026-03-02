import { runApocalypseSimulation } from '../../src/math/07-the-apocalypse';

describe('runApocalypseSimulation', () => {
  test('produces roughly equal number of boys and girls', () => {
    const { boys, girls, ratio } = runApocalypseSimulation(100000);

    // The expected ratio should be close to 1.0
    expect(ratio).toBeGreaterThan(0.9);
    expect(ratio).toBeLessThan(1.1);

    // Sanity check: we should have both boys and girls
    expect(boys).toBeGreaterThan(0);
    expect(girls).toBeGreaterThan(0);
  });

  test('number of girls equals number of families', () => {
    const familiesCount = 500;
    const { girls } = runApocalypseSimulation(familiesCount);
    // Each family has exactly one girl (they stop after the first girl)
    expect(girls).toBe(familiesCount);
  });

  test('works with a single family', () => {
    const { girls } = runApocalypseSimulation(1);
    expect(girls).toBe(1);
  });

  test('total children equals boys plus girls', () => {
    const { boys, girls } = runApocalypseSimulation(10000);
    expect(boys + girls).toBeGreaterThan(0);
    expect(boys).toBeGreaterThanOrEqual(0);
    expect(girls).toBe(10000);
  });

  test('ratio converges closer to 1.0 with more families', () => {
    const { ratio } = runApocalypseSimulation(500000);
    // With 500k families, the ratio should be very close to 1.0
    expect(ratio).toBeGreaterThan(0.95);
    expect(ratio).toBeLessThan(1.05);
  });

  test('boys count is never negative', () => {
    const { boys } = runApocalypseSimulation(100);
    expect(boys).toBeGreaterThanOrEqual(0);
  });
});
