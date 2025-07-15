import { StreamRanker } from '../../src/sorting-and-searching/10-rank-from-strem';

describe('StreamRanker', () => {
  let ranker: StreamRanker;

  beforeEach(() => {
    ranker = new StreamRanker();
    [5, 1, 4, 4, 5, 9, 7, 13, 3].forEach((n) => ranker.track(n));
  });

  test('returns correct rank for existing numbers', () => {
    expect(ranker.getRankOfNumber(1)).toBe(0); // Only 1 is <= 1
    expect(ranker.getRankOfNumber(3)).toBe(1); // 1 and 3 are <= 3
    expect(ranker.getRankOfNumber(4)).toBe(3); // 1, 3, 4, 4
    expect(ranker.getRankOfNumber(5)).toBe(5); // 1, 3, 4, 4, 5, 5
    expect(ranker.getRankOfNumber(9)).toBe(7); // All up to 9
    expect(ranker.getRankOfNumber(13)).toBe(8); // All up to 13
  });

  test('returns 0 for value smaller than any tracked number', () => {
    expect(ranker.getRankOfNumber(0)).toBe(0);
  });

  test('returns total number of values for value larger than all tracked numbers', () => {
    expect(ranker.getRankOfNumber(99)).toBe(9); // 9 total values tracked
  });

  test('returns correct rank for duplicates', () => {
    ranker.track(4);
    expect(ranker.getRankOfNumber(4)).toBe(4); // One more 4 added
  });

  test('works with empty stream', () => {
    const emptyRanker = new StreamRanker();
    expect(emptyRanker.getRankOfNumber(5)).toBe(0);
  });
});
