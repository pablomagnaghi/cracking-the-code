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

  test('handles single project with no dependencies', () => {
    const projects = ['a'];
    const dependencies: [string, string][] = [];
    expect(buildOrder(projects, dependencies)).toEqual(['a']);
  });

  test('handles linear chain of dependencies', () => {
    const projects = ['a', 'b', 'c', 'd'];
    const dependencies: [string, string][] = [
      ['a', 'b'],
      ['b', 'c'],
      ['c', 'd'],
    ];
    expect(buildOrder(projects, dependencies)).toEqual(['a', 'b', 'c', 'd']);
  });

  test('handles diamond dependency pattern', () => {
    // a -> b, a -> c, b -> d, c -> d
    const projects = ['a', 'b', 'c', 'd'];
    const dependencies: [string, string][] = [
      ['a', 'b'],
      ['a', 'c'],
      ['b', 'd'],
      ['c', 'd'],
    ];
    const result = buildOrder(projects, dependencies);
    expect(result).toEqual(['a', 'b', 'c', 'd']);
  });

  test('throws error for cycle in larger graph', () => {
    const projects = ['a', 'b', 'c', 'd'];
    const dependencies: [string, string][] = [
      ['a', 'b'],
      ['b', 'c'],
      ['c', 'd'],
      ['d', 'b'], // creates cycle b -> c -> d -> b
    ];
    expect(() => buildOrder(projects, dependencies)).toThrow('No valid build order exists');
  });

  test('handles multiple independent dependency chains', () => {
    const projects = ['a', 'b', 'c', 'd', 'e', 'f'];
    const dependencies: [string, string][] = [
      ['a', 'b'], // chain 1: a -> b
      ['c', 'd'], // chain 2: c -> d
      ['e', 'f'], // chain 3: e -> f
    ];
    const result = buildOrder(projects, dependencies);
    // All chains are independent; each parent must come before its child
    expect(result.indexOf('a')).toBeLessThan(result.indexOf('b'));
    expect(result.indexOf('c')).toBeLessThan(result.indexOf('d'));
    expect(result.indexOf('e')).toBeLessThan(result.indexOf('f'));
  });
});
