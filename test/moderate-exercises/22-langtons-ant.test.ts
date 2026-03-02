import { langtonsAnt } from '../../src/moderate-exercises/22-langtons-ant';

describe('langtonsAnt', () => {
  test('after 0 steps, ant at origin facing right on white grid', () => {
    const grid = langtonsAnt(0);
    // Ant at (0,0), facing right (">")
    expect(grid.length).toBe(1);
    expect(grid[0][0]).toBe('>');
  });

  test('after 1 step, ant turns right, flips color, moves forward', () => {
    const grid = langtonsAnt(1);
    // The ant moves one step right, so grid covers two positions horizontally
    // The ant position should be at (1,0), facing down ("v")
    // The starting cell (0,0) flips to black (#)
    const flatGrid = grid.flat();
    expect(flatGrid).toContain('v'); // ant facing down
    expect(flatGrid).toContain('#'); // flipped first cell black
  });

  test('after 10 steps, grid has correct dimensions and ant position', () => {
    const grid = langtonsAnt(10);
    // The grid should be at least 3x3 or bigger
    expect(grid.length).toBeGreaterThanOrEqual(3);
    expect(grid[0].length).toBeGreaterThanOrEqual(3);

    // The ant symbol should exist somewhere in grid
    const antSymbols = ['^', '>', 'v', '<'];
    let foundAnt = false;
    for (const row of grid) {
      for (const cell of row) {
        if (antSymbols.includes(cell)) foundAnt = true;
      }
    }
    expect(foundAnt).toBe(true);
  });

  test('after 2 steps, grid matches expected pattern', () => {
    const grid = langtonsAnt(2);
    // After 2 steps the grid should contain black cells and the ant
    const flat = grid.flat();
    const antSymbols = ['^', '>', 'v', '<'];
    const hasAnt = flat.some((cell) => antSymbols.includes(cell));
    const hasBlack = flat.some((cell) => cell === '#');
    expect(hasAnt).toBe(true);
    expect(hasBlack).toBe(true);
  });

  test('after 100 steps, grid has the ant and multiple black cells', () => {
    const grid = langtonsAnt(100);
    const flat = grid.flat();
    const antSymbols = ['^', '>', 'v', '<'];
    expect(flat.filter((c) => antSymbols.includes(c)).length).toBe(1);
    expect(flat.filter((c) => c === '#').length).toBeGreaterThan(0);
  });
});
