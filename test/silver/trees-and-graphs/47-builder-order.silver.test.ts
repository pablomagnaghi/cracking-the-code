import { buildOrder } from '../../../src/trees-and-graphs/07-builder-order';

describe('buildOrder', () => {
  test('returns correct build order for valid input', () => {
    const projects1 = ['a', 'b', 'c', 'd', 'e', 'f'];
    const dependencies1 = [
      ['a', 'd'],
      ['f', 'b'],
      ['b', 'd'],
      ['f', 'a'],
      ['d', 'c'],
    ];
    expect(buildOrder(projects1, dependencies1)).toEqual([
      'e',
      'f',
      'a',
      'b',
      'd',
      'c',
    ]);
  });

  test('throws error for no valid order', () => {
    const projects = ['a', 'b', 'c', 'd', 'e', 'f']; // Include 'f'
    const dependencies = [
      ['a', 'd'],
      ['f', 'b'],
      ['b', 'd'],
      ['f', 'a'],
      ['d', 'c'],
      ['c', 'f'], // This creates a cycle: f → a → d → c → f
    ];
    expect(() => buildOrder(projects, dependencies)).toThrow(
      'No valid build order exists'
    );
  });

  test('returns correct build order for single project', () => {
    const projects = ['a'];
    const dependencies: [string, string][] = [];
    expect(buildOrder(projects, dependencies)).toEqual(['a']);
  });

  test('returns correct build order for empty input', () => {
    const projects: string[] = [];
    const dependencies: [string, string][] = [];
    expect(buildOrder(projects, dependencies)).toEqual([]);
  });
});
