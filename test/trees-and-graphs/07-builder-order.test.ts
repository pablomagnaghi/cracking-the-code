import { buildOrder } from '../../src/trees-and-graphs/07-builder-order';

describe('buildOrder', () => {
  test('returns valid build order for simple dependencies', () => {
    const projects = ['a', 'b', 'c', 'd', 'e', 'f'];
    const dependencies: [string, string][] = [
      ['a', 'd'],
      ['f', 'b'],
      ['b', 'd'],
      ['f', 'a'],
      ['d', 'c'],
    ];
    const result = buildOrder(projects, dependencies);
    // Lex smallest order is expected
    expect(result).toEqual(['e', 'f', 'a', 'b', 'd', 'c']);
  });

  test('returns projects if no dependencies', () => {
    const projects = ['x', 'y', 'z'];
    const dependencies: [string, string][] = [];
    const result = buildOrder(projects, dependencies);
    // Projects returned sorted because queue starts sorted
    expect(result).toEqual(['x', 'y', 'z']);
  });

  test('throws error when cycle exists', () => {
    const projects = ['a', 'b'];
    const dependencies: [string, string][] = [
      ['a', 'b'],
      ['b', 'a'],
    ];
    expect(() => buildOrder(projects, dependencies)).toThrow('No valid build order exists');
  });

  test('throws error when dependency references unknown project', () => {
    const projects = ['a', 'b'];
    const dependencies: [string, string][] = [
      ['a', 'c'], // 'c' is unknown project
    ];
    expect(() => buildOrder(projects, dependencies)).toThrow(
      'Dependency references unknown project'
    );
  });
});
