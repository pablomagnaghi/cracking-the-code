import { masterMind, MasterMindResult } from '../../src/moderate-exercises/15-master-mind';

describe('masterMind', () => {
  test('returns correct hits and pseudoHits for mixed input', () => {
    const secret = 'RGBY';
    const guess = 'GGRR';
    const expected: MasterMindResult = { hits: 1, pseudoHits: 1 };
    expect(masterMind(secret, guess)).toEqual(expected);
  });

  test('all hits', () => {
    const secret = 'RGBY';
    const guess = 'RGBY';
    const expected: MasterMindResult = { hits: 4, pseudoHits: 0 };
    expect(masterMind(secret, guess)).toEqual(expected);
  });

  test('no hits, some pseudoHits', () => {
    const secret = 'RGBY';
    const guess = 'YBGR';
    const expected: MasterMindResult = { hits: 0, pseudoHits: 4 };
    expect(masterMind(secret, guess)).toEqual(expected);
  });

  test('no hits, no pseudoHits', () => {
    const secret = 'RGBY';
    const guess = 'WWWW';
    const expected: MasterMindResult = { hits: 0, pseudoHits: 0 };
    expect(masterMind(secret, guess)).toEqual(expected);
  });

  test('handles repeated characters', () => {
    const secret = 'RRRR';
    const guess = 'RRGB';
    const expected: MasterMindResult = { hits: 2, pseudoHits: 0 };
    expect(masterMind(secret, guess)).toEqual(expected);
  });

  test('throws error if lengths differ', () => {
    expect(() => masterMind('RGB', 'RG')).toThrow('Secret and guess must be the same length');
  });
});
