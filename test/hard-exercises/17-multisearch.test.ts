import { multiSearch } from '../../src/hard-exercises/17-multisearch';

describe('multiSearch', () => {
  const big = 'mississippi';
  const smalls = ['is', 'ppi', 'hi', 'sis', 'i', 'ssippi'];

  test('finds all occurrences for multiple small strings', () => {
    const expected = {
      is: [1, 4],
      ppi: [8],
      hi: [],
      sis: [3],
      i: [1, 4, 7, 10],
      ssippi: [5],
    };
    expect(multiSearch(big, smalls)).toEqual(expected);
  });

  test('returns empty arrays when smalls are not found', () => {
    expect(multiSearch('abcdef', ['x', 'y', 'z'])).toEqual({
      x: [],
      y: [],
      z: [],
    });
  });

  test('handles empty big string', () => {
    expect(multiSearch('', ['a', 'b'])).toEqual({
      a: [],
      b: [],
    });
  });

  test('handles empty small strings array', () => {
    expect(multiSearch('abc', [])).toEqual({});
  });

  test('handles small string equal to big string', () => {
    expect(multiSearch('hello', ['hello'])).toEqual({ hello: [0] });
  });
});
