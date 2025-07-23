import { volumeOfHistogram } from '../../src/hard-exercises/21-volumen-of-histogram';

describe('volumeOfHistogram', () => {
  test('calculates trapped water correctly for example input', () => {
    const heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
    expect(volumeOfHistogram(heights)).toBe(6);
  });

  test('returns 0 for strictly increasing bars', () => {
    expect(volumeOfHistogram([1, 2, 3, 4, 5])).toBe(0);
  });

  test('returns 0 for strictly decreasing bars', () => {
    expect(volumeOfHistogram([5, 4, 3, 2, 1])).toBe(0);
  });

  test('returns 0 for empty input', () => {
    expect(volumeOfHistogram([])).toBe(0);
  });

  test('returns 0 for uniform height bars', () => {
    expect(volumeOfHistogram([3, 3, 3, 3])).toBe(0);
  });

  test('handles single bar', () => {
    expect(volumeOfHistogram([4])).toBe(0);
  });

  test('handles two bars', () => {
    expect(volumeOfHistogram([4, 2])).toBe(0);
  });

  test('handles multiple trapped water sections', () => {
    const heights = [3, 0, 2, 0, 4];
    expect(volumeOfHistogram(heights)).toBe(7);
  });
});
