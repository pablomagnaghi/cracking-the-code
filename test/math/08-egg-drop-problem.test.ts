import { eggDrop } from '../../src/math/08-egg-drop-problem';

describe('Egg Drop Problem', () => {
  test('zero floors requires zero drops', () => {
    expect(eggDrop(1, 0)).toBe(0);
    expect(eggDrop(2, 0)).toBe(0);
  });

  test('one floor requires one drop', () => {
    expect(eggDrop(1, 1)).toBe(1);
    expect(eggDrop(2, 1)).toBe(1);
  });

  test('one egg requires linear drops equal to floors', () => {
    expect(eggDrop(1, 5)).toBe(5);
    expect(eggDrop(1, 10)).toBe(10);
  });

  test('two eggs and 6 floors requires minimum 3 drops', () => {
    expect(eggDrop(2, 6)).toBe(3);
  });

  test('three eggs and 14 floors requires minimum 4 drops', () => {
    expect(eggDrop(3, 14)).toBe(4);
  });

  test('two eggs and 100 floors requires minimum 14 drops', () => {
    expect(eggDrop(2, 100)).toBe(14);
  });

  test('many eggs reduce to binary search (log2 floors)', () => {
    // With enough eggs, optimal strategy is binary search: ceil(log2(n+1))
    // For 100 floors with 10 eggs: ceil(log2(101)) = 7
    expect(eggDrop(10, 100)).toBe(7);
  });

  test('two eggs and 10 floors requires minimum 4 drops', () => {
    expect(eggDrop(2, 10)).toBe(4);
  });

  test('two eggs and 36 floors requires minimum 8 drops', () => {
    expect(eggDrop(2, 36)).toBe(8);
  });

  test('two eggs and 21 floors requires minimum 6 drops', () => {
    expect(eggDrop(2, 21)).toBe(6);
  });

  test('three eggs and 100 floors requires minimum 9 drops', () => {
    expect(eggDrop(3, 100)).toBe(9);
  });
});
