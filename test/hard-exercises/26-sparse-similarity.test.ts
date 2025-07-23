import { sparseSimilarity } from '../../src/hard-exercises/26-sparse-similarity';

describe('sparseSimilarity', () => {
  it('returns correct similarity values for intersecting documents', () => {
    const docs = [
      [1, 2, 3], // doc 0
      [2, 3, 4], // doc 1
      [5, 6], // doc 2
      [1, 5], // doc 3
    ];
    const output = sparseSimilarity(docs);
    const expected = ['0,1: 0.5000', '0,3: 0.2500', '2,3: 0.3333'];

    for (const item of expected) {
      expect(output).toContain(item);
    }
    expect(output.length).toBe(expected.length);
  });

  it('returns empty array when no similarity exists', () => {
    const docs = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    expect(sparseSimilarity(docs)).toEqual([]);
  });

  it('handles empty input', () => {
    expect(sparseSimilarity([])).toEqual([]);
  });
});
