import { SalesRankTracker } from '../../src/system-design/06-sales-rank';

describe('SalesRankTracker', () => {
  let tracker: SalesRankTracker;

  beforeEach(() => {
    tracker = new SalesRankTracker();
  });

  test('records sales and retrieves count', () => {
    tracker.recordSale('P1', ['Sports']);
    tracker.recordSale('P1', ['Sports']);
    tracker.recordSale('P1', ['Sports']);
    expect(tracker.getSales('P1')).toBe(3);
    expect(tracker.getSales('P_UNKNOWN')).toBe(0);
  });

  test('getTopK returns products sorted by sales descending', () => {
    tracker.recordSale('P1', ['A']);
    tracker.recordSale('P2', ['A']);
    tracker.recordSale('P2', ['A']);
    tracker.recordSale('P3', ['A']);
    tracker.recordSale('P3', ['A']);
    tracker.recordSale('P3', ['A']);

    const top = tracker.getTopK(2);
    expect(top).toHaveLength(2);
    expect(top[0].productId).toBe('P3');
    expect(top[0].sales).toBe(3);
    expect(top[1].productId).toBe('P2');
    expect(top[1].sales).toBe(2);
  });

  test('getTopKByCategory returns products sorted within a category', () => {
    tracker.recordSale('P1', ['Sports', 'Safety']);
    tracker.recordSale('P2', ['Sports']);
    tracker.recordSale('P2', ['Sports']);
    tracker.recordSale('P3', ['Safety']);
    tracker.recordSale('P3', ['Safety']);

    const topSports = tracker.getTopKByCategory('Sports', 2);
    expect(topSports[0].productId).toBe('P2');
    expect(topSports[0].sales).toBe(2);

    const topSafety = tracker.getTopKByCategory('Safety', 2);
    expect(topSafety[0].productId).toBe('P3');
    expect(topSafety[0].sales).toBe(2);
  });

  test('returns empty array for unknown category', () => {
    expect(tracker.getTopKByCategory('Unknown', 5)).toEqual([]);
  });

  test('getRank returns correct overall rank', () => {
    tracker.recordSale('P1', ['A']);
    tracker.recordSale('P2', ['A']);
    tracker.recordSale('P2', ['A']);
    tracker.recordSale('P3', ['A']);
    tracker.recordSale('P3', ['A']);
    tracker.recordSale('P3', ['A']);

    expect(tracker.getRank('P3')).toBe(1); // most sales
    expect(tracker.getRank('P2')).toBe(2);
    expect(tracker.getRank('P1')).toBe(3); // least sales
  });

  test('getCategoryRank returns correct category rank', () => {
    tracker.recordSale('P1', ['Electronics']);
    tracker.recordSale('P2', ['Electronics']);
    tracker.recordSale('P2', ['Electronics']);
    expect(tracker.getCategoryRank('P2', 'Electronics')).toBe(1);
    expect(tracker.getCategoryRank('P1', 'Electronics')).toBe(2);
  });

  test('getRank returns -1 for unknown product', () => {
    expect(tracker.getRank('NOPE')).toBe(-1);
  });

  test('getCategoryRank returns -1 for unknown category or product', () => {
    tracker.recordSale('P1', ['A']);
    expect(tracker.getCategoryRank('P1', 'B')).toBe(-1);
    expect(tracker.getCategoryRank('P999', 'A')).toBe(-1);
  });

  test('product can belong to multiple categories', () => {
    tracker.recordSale('P1', ['Sports', 'Safety', 'Outdoors']);
    const topSports = tracker.getTopKByCategory('Sports', 1);
    const topSafety = tracker.getTopKByCategory('Safety', 1);
    const topOutdoors = tracker.getTopKByCategory('Outdoors', 1);
    expect(topSports[0].productId).toBe('P1');
    expect(topSafety[0].productId).toBe('P1');
    expect(topOutdoors[0].productId).toBe('P1');
  });
});
