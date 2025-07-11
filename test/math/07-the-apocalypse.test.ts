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
});
